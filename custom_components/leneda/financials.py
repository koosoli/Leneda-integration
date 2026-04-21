"""Shared financial calculations for Leneda invoice-style sensors."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any

from .const import DOMAIN
from .models import BillingConfig
from .storage import get_effective_reference_power


FINANCIAL_SENSOR_MAP: dict[str, tuple[str, str]] = {
    "f_yesterday_invoice_estimate": ("yesterday", "invoice_estimate"),
    "f_current_month_invoice_estimate": ("current_month", "invoice_estimate"),
    "f_last_month_invoice_estimate": ("last_month", "invoice_estimate"),
    "f_yesterday_feed_in_revenue": ("yesterday", "feed_in_revenue"),
    "f_current_month_feed_in_revenue": ("current_month", "feed_in_revenue"),
    "f_last_month_feed_in_revenue": ("last_month", "feed_in_revenue"),
    "f_yesterday_self_consumption_savings": ("yesterday", "self_consumption_savings"),
    "f_current_month_self_consumption_savings": ("current_month", "self_consumption_savings"),
    "f_last_month_self_consumption_savings": ("last_month", "self_consumption_savings"),
    "f_yesterday_total_solar_value": ("yesterday", "total_solar_value"),
    "f_current_month_total_solar_value": ("current_month", "total_solar_value"),
    "f_last_month_total_solar_value": ("last_month", "total_solar_value"),
}

PERIOD_DATA_KEYS: dict[str, dict[str, str]] = {
    "yesterday": {
        "consumption": "c_04_yesterday_consumption",
        "production": "p_04_yesterday_production",
        "exported": "p_09_yesterday_exported",
        "self_consumed": "p_12_yesterday_self_consumed",
        "gas_energy": "g_01_yesterday_consumption",
        "gas_volume": "g_10_yesterday_volume",
        "exceedance": "yesterdays_power_usage_over_reference",
    },
    "current_month": {
        "consumption": "c_07_monthly_consumption",
        "production": "p_07_monthly_production",
        "exported": "p_15_monthly_exported",
        "self_consumed": "p_16_monthly_self_consumed",
        "gas_energy": "g_04_monthly_consumption",
        "gas_volume": "g_13_monthly_volume",
        "exceedance": "current_month_power_usage_over_reference",
    },
    "last_month": {
        "consumption": "c_08_previous_month_consumption",
        "production": "p_08_previous_month_production",
        "exported": "p_11_last_month_exported",
        "self_consumed": "p_14_last_month_self_consumed",
        "gas_energy": "g_05_last_month_consumption",
        "gas_volume": "g_14_last_month_volume",
        "exceedance": "last_month_power_usage_over_reference",
    },
}


@dataclass(frozen=True)
class WindowedUsage:
    """Detailed pricing and exceedance breakdown for one period."""

    energy_cost: float
    exceedance_kwh: float
    gross_exceedance_kwh: float
    avoided_exceedance_kwh: float
    peak_power_kw: float


@dataclass(frozen=True)
class FinancialSummary:
    """Calculated financial totals for one invoice period."""

    invoice_estimate: float
    electricity_total: float
    gas_total: float
    feed_in_revenue: float
    self_consumption_savings: float
    total_solar_value: float
    avoided_exceedance_savings: float
    self_use_vs_export_value: float
    billed_consumption_kwh: float
    self_consumed_kwh: float
    exported_kwh: float
    exceedance_kwh: float
    peak_power_kw: float
    period_days: int
    proration_factor: float


def get_billing_config(hass) -> BillingConfig:
    """Return the active billing configuration."""
    storage = hass.data.get(DOMAIN, {}).get("storage")
    if storage and getattr(storage, "billing_config", None):
        return storage.billing_config
    return BillingConfig()


def get_currency(hass) -> str:
    """Return the configured billing currency."""
    return get_billing_config(hass).currency or "EUR"


def _matches_day_group(dt: datetime, day_group: str) -> bool:
    """Return True when the datetime matches the configured day group."""
    if day_group == "weekdays":
        return dt.weekday() < 5
    if day_group == "weekends":
        return dt.weekday() >= 5
    return True


def _time_to_minutes(value: str) -> int:
    """Convert HH:MM to minutes since midnight."""
    try:
        hour, minute = value.split(":", 1)
        return int(hour) * 60 + int(minute)
    except (AttributeError, TypeError, ValueError):
        return 0


def _matches_window(dt: datetime, day_group: str, start_time: str, end_time: str) -> bool:
    """Check whether a datetime falls within a configured time window."""
    if not _matches_day_group(dt, day_group):
        return False

    now_minutes = dt.hour * 60 + dt.minute
    start_minutes = _time_to_minutes(start_time)
    end_minutes = _time_to_minutes(end_time)

    if start_minutes == end_minutes:
        return True
    if start_minutes < end_minutes:
        return start_minutes <= now_minutes < end_minutes
    return now_minutes >= start_minutes or now_minutes < end_minutes


def _find_matching_window(dt: datetime, windows: list[dict[str, Any]], field: str) -> Any:
    """Return the configured field value for a matching window."""
    for window in windows:
        if not isinstance(window, dict):
            continue
        if _matches_window(
            dt,
            window.get("day_group", "all"),
            window.get("start_time", "00:00"),
            window.get("end_time", "00:00"),
        ):
            return window.get(field)
    return None


def calculate_windowed_usage(
    items: list[dict[str, Any]],
    base_rate: float,
    base_reference_power: float,
    rate_windows: list[dict[str, Any]],
    reference_windows: list[dict[str, Any]],
    production_items: list[dict[str, Any]] | None = None,
) -> WindowedUsage:
    """Mirror the frontend's windowed invoice calculation."""
    energy_cost = 0.0
    exceedance_kwh = 0.0
    gross_exceedance_kwh = 0.0
    peak_power_kw = 0.0
    production_by_ts: dict[str, float] = {}

    for item in production_items or []:
        try:
            timestamp = str(item.get("startedAt") or "")
            production_by_ts[timestamp] = production_by_ts.get(timestamp, 0.0) + float(item.get("value") or 0.0)
        except (TypeError, ValueError):
            continue

    for item in items:
        try:
            kw = float(item.get("value") or 0.0)
            timestamp = str(item.get("startedAt") or "")
            parsed_ts = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
        except (TypeError, ValueError):
            continue

        kwh = kw * 0.25
        solar_kw = production_by_ts.get(timestamp, 0.0)
        net_kw = max(0.0, kw - solar_kw)
        applied_rate = _find_matching_window(parsed_ts, rate_windows, "rate")
        applied_reference = _find_matching_window(
            parsed_ts, reference_windows, "reference_power_kw"
        )
        effective_rate = float(applied_rate) if applied_rate not in (None, "") else base_rate
        effective_reference = (
            float(applied_reference)
            if applied_reference not in (None, "")
            else base_reference_power
        )

        energy_cost += kwh * effective_rate
        peak_power_kw = max(peak_power_kw, net_kw)
        if kw > effective_reference:
            gross_exceedance_kwh += (kw - effective_reference) * 0.25
        if net_kw > effective_reference:
            exceedance_kwh += (net_kw - effective_reference) * 0.25

    return WindowedUsage(
        energy_cost=energy_cost,
        exceedance_kwh=exceedance_kwh,
        gross_exceedance_kwh=gross_exceedance_kwh,
        avoided_exceedance_kwh=max(0.0, gross_exceedance_kwh - exceedance_kwh),
        peak_power_kw=peak_power_kw,
    )


def period_proration(start_dt: datetime, end_dt: datetime) -> tuple[int, float]:
    """Return the invoice proration for a date span."""
    start_date = start_dt.date()
    end_date = end_dt.date()
    if end_date < start_date:
        start_date, end_date = end_date, start_date

    factor = 0.0
    days = 0
    cursor = start_date
    while cursor <= end_date:
        next_month = (cursor.replace(day=28) + timedelta(days=4)).replace(day=1)
        month_days = (next_month - timedelta(days=1)).day
        factor += 1 / month_days
        days += 1
        cursor += timedelta(days=1)
    return days, factor


def _resolve_feed_in_rate(hass, billing_config: BillingConfig, meter_id: str) -> float:
    """Resolve the effective feed-in rate for one production meter."""
    for rate_entry in billing_config.feed_in_rates or []:
        if not isinstance(rate_entry, dict) or rate_entry.get("meter_id") != meter_id:
            continue

        fallback_rate = float(rate_entry.get("tariff") or billing_config.feed_in_tariff or 0.0)
        if rate_entry.get("mode") != "sensor":
            return fallback_rate

        sensor_entity = str(rate_entry.get("sensor_entity") or "").strip()
        if not sensor_entity:
            return fallback_rate

        sensor_state = hass.states.get(sensor_entity)
        if not sensor_state or sensor_state.state in ("unknown", "unavailable"):
            return fallback_rate

        try:
            return float(sensor_state.state)
        except (TypeError, ValueError):
            return fallback_rate

    return float(billing_config.feed_in_tariff or 0.0)


def _avg_feed_in_rate(hass, billing_config: BillingConfig, production_meter_ids: list[str]) -> float:
    """Return the average effective feed-in rate across all production meters."""
    if not production_meter_ids:
        return float(billing_config.feed_in_tariff or 0.0)

    valid_rates = [
        rate
        for rate in (
            _resolve_feed_in_rate(hass, billing_config, meter_id)
            for meter_id in production_meter_ids
        )
        if rate > 0
    ]
    if not valid_rates:
        return float(billing_config.feed_in_tariff or 0.0)
    return sum(valid_rates) / len(valid_rates)


def calculate_financial_summary(
    hass,
    coordinator,
    data: dict[str, Any],
    period_key: str,
    start_dt: datetime,
    end_dt: datetime,
    consumption_items: list[dict[str, Any]] | None = None,
    production_items: list[dict[str, Any]] | None = None,
) -> FinancialSummary:
    """Calculate invoice-style money metrics for one preset period."""
    keys = PERIOD_DATA_KEYS[period_key]
    billing_config = get_billing_config(hass)
    production_meter_ids = [
        meter_id
        for meter_id, meter_types in getattr(coordinator, "meters", [])
        if "production" in (meter_types or [])
    ]

    consumption = float(data.get(keys["consumption"], 0) or 0)
    production = float(data.get(keys["production"], 0) or 0)
    sold_to_market = max(0.0, float(data.get(keys["exported"], 0) or 0))
    self_consumed = float(data.get(keys["self_consumed"], 0) or 0)
    solar_to_home = max(0.0, self_consumed if self_consumed > 0 else production - sold_to_market)
    billed_consumption = max(0.0, consumption - solar_to_home)
    exceedance_kwh = float(data.get(keys["exceedance"], 0) or 0)
    gas_energy = float(data.get(keys["gas_energy"], 0) or 0)
    gas_volume = float(data.get(keys["gas_volume"], 0) or 0)
    has_gas = gas_energy > 0 or gas_volume > 0
    rate_windows = list(billing_config.consumption_rate_windows or [])
    reference_windows = list(billing_config.reference_power_windows or [])
    ref_power = get_effective_reference_power(hass, coordinator.entry)
    if ref_power is None:
        ref_power = float(billing_config.reference_power_kw or 5.0)

    windowed_usage = None
    if consumption_items:
        windowed_usage = calculate_windowed_usage(
            consumption_items,
            float(billing_config.energy_variable_rate or 0.0),
            float(ref_power or 5.0),
            rate_windows,
            reference_windows,
            production_items or [],
        )

    uses_tariff_windows = (
        bool(rate_windows)
        and windowed_usage is not None
        and abs(billed_consumption - consumption) < 0.01
    )
    effective_exceedance_kwh = (
        windowed_usage.exceedance_kwh if windowed_usage is not None else exceedance_kwh
    )
    effective_peak_power = (
        windowed_usage.peak_power_kw if windowed_usage is not None else 0.0
    )
    days, pro_factor = period_proration(start_dt, end_dt)

    energy_cost = (
        windowed_usage.energy_cost
        if uses_tariff_windows and windowed_usage is not None
        else billed_consumption * float(billing_config.energy_variable_rate or 0.0)
    )
    network_variable_cost = billed_consumption * float(billing_config.network_variable_rate or 0.0)
    exceedance_cost = effective_exceedance_kwh * float(billing_config.exceedance_rate or 0.0)
    meter_fees_total = sum(
        float(fee.get("fee") or 0.0)
        for fee in (billing_config.meter_monthly_fees or [])
        if isinstance(fee, dict)
    ) * pro_factor

    subtotal_costs = (
        float(billing_config.energy_fixed_fee or 0.0) * pro_factor
        + energy_cost
        + float(billing_config.network_metering_rate or 0.0) * pro_factor
        + float(billing_config.network_power_ref_rate or 0.0) * pro_factor
        + network_variable_cost
        + exceedance_cost
        + meter_fees_total
        + billed_consumption * float(billing_config.compensation_fund_rate or 0.0)
        + billed_consumption * float(billing_config.electricity_tax_rate or 0.0)
        - max(0.0, float(billing_config.connect_discount or 0.0)) * pro_factor
    )
    total_costs = subtotal_costs * (1 + float(billing_config.vat_rate or 0.0))

    avg_feed_in_rate = _avg_feed_in_rate(hass, billing_config, production_meter_ids)
    feed_in_revenue = sold_to_market * avg_feed_in_rate

    self_consumed_savings_base = solar_to_home * (
        float(billing_config.energy_variable_rate or 0.0)
        + float(billing_config.network_variable_rate or 0.0)
        + float(billing_config.electricity_tax_rate or 0.0)
        + float(billing_config.compensation_fund_rate or 0.0)
    )
    total_self_consumed_savings = self_consumed_savings_base * (1 + float(billing_config.vat_rate or 0.0))
    self_use_vs_export_value = total_self_consumed_savings - (solar_to_home * avg_feed_in_rate)

    avoided_exceedance_kwh = (
        max(0.0, windowed_usage.avoided_exceedance_kwh)
        if windowed_usage is not None
        else 0.0
    )
    total_avoided_exceedance_savings = (
        avoided_exceedance_kwh
        * float(billing_config.exceedance_rate or 0.0)
        * (1 + float(billing_config.vat_rate or 0.0))
    )
    total_solar_value = (
        total_self_consumed_savings
        + total_avoided_exceedance_savings
        + feed_in_revenue
    )

    gas_subtotal = (
        float(billing_config.gas_fixed_fee or 0.0) * pro_factor
        + gas_energy * float(billing_config.gas_variable_rate or 0.0)
        + float(billing_config.gas_network_fee or 0.0) * pro_factor
        + gas_energy * float(billing_config.gas_network_variable_rate or 0.0)
        + gas_energy * float(billing_config.gas_tax_rate or 0.0)
    )
    gas_total = gas_subtotal * (1 + float(billing_config.gas_vat_rate or 0.0)) if has_gas else 0.0
    electricity_total = total_costs - feed_in_revenue

    return FinancialSummary(
        invoice_estimate=round(electricity_total + gas_total, 2),
        electricity_total=round(electricity_total, 2),
        gas_total=round(gas_total, 2),
        feed_in_revenue=round(feed_in_revenue, 2),
        self_consumption_savings=round(total_self_consumed_savings, 2),
        total_solar_value=round(total_solar_value, 2),
        avoided_exceedance_savings=round(total_avoided_exceedance_savings, 2),
        self_use_vs_export_value=round(self_use_vs_export_value, 2),
        billed_consumption_kwh=round(billed_consumption, 4),
        self_consumed_kwh=round(solar_to_home, 4),
        exported_kwh=round(sold_to_market, 4),
        exceedance_kwh=round(effective_exceedance_kwh, 4),
        peak_power_kw=round(effective_peak_power, 2),
        period_days=days,
        proration_factor=round(pro_factor, 4),
    )


def build_financial_sensor_payloads(
    hass,
    coordinator,
    data: dict[str, Any],
    period_inputs: dict[str, dict[str, Any]],
) -> tuple[dict[str, float], dict[str, dict[str, Any]]]:
    """Build Home Assistant sensor values and attributes for all financial sensors."""
    values: dict[str, float] = {}
    attributes: dict[str, dict[str, Any]] = {}
    currency = get_currency(hass)
    summaries: dict[str, FinancialSummary] = {}

    for period_key, period_input in period_inputs.items():
        summaries[period_key] = calculate_financial_summary(
            hass,
            coordinator,
            data,
            period_key,
            period_input["start"],
            period_input["end"],
            period_input.get("consumption_items"),
            period_input.get("production_items"),
        )

    for sensor_key, (period_key, metric_name) in FINANCIAL_SENSOR_MAP.items():
        summary = summaries[period_key]
        metric_value = float(getattr(summary, metric_name))
        values[sensor_key] = metric_value
        attributes[sensor_key] = {
            "currency": currency,
            "period": period_key,
            "electricity_total": summary.electricity_total,
            "gas_total": summary.gas_total,
            "feed_in_revenue": summary.feed_in_revenue,
            "self_consumption_savings": summary.self_consumption_savings,
            "total_solar_value": summary.total_solar_value,
            "avoided_exceedance_savings": summary.avoided_exceedance_savings,
            "self_use_vs_export_value": summary.self_use_vs_export_value,
            "billed_consumption_kwh": summary.billed_consumption_kwh,
            "self_consumed_kwh": summary.self_consumed_kwh,
            "exported_kwh": summary.exported_kwh,
            "exceedance_kwh": summary.exceedance_kwh,
            "peak_power_kw": summary.peak_power_kw,
            "period_days": summary.period_days,
            "proration_factor": summary.proration_factor,
        }

    return values, attributes
