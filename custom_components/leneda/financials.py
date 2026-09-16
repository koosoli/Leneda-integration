"""Shared financial calculations for Leneda invoice-style sensors."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
import math
from typing import Any

from .billing_adjustments import compute_billing_adjustments
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
    "f_yesterday_electricity_subsidy": ("yesterday", "electricity_adjustments_gross"),
    "f_current_month_electricity_subsidy": ("current_month", "electricity_adjustments_gross"),
    "f_last_month_electricity_subsidy": ("last_month", "electricity_adjustments_gross"),
    "f_yesterday_gas_subsidy": ("yesterday", "gas_adjustments_gross"),
    "f_current_month_gas_subsidy": ("current_month", "gas_adjustments_gross"),
    "f_last_month_gas_subsidy": ("last_month", "gas_adjustments_gross"),
}

PERIOD_DATA_KEYS: dict[str, dict[str, str]] = {
    "yesterday": {
        "consumption": "c_04_yesterday_consumption",
        "production": "p_04_yesterday_production",
        "exported": "p_09_yesterday_exported",
        "self_consumed": "p_12_yesterday_self_consumed",
        "remaining_consumption": "s_c_rem_yesterday",
        "gas_energy": "g_01_yesterday_consumption",
        "gas_volume": "g_10_yesterday_volume",
        "exceedance": "yesterdays_power_usage_over_reference",
    },
    "current_month": {
        "consumption": "c_07_monthly_consumption",
        "production": "p_07_monthly_production",
        "exported": "p_15_monthly_exported",
        "self_consumed": "p_16_monthly_self_consumed",
        "remaining_consumption": "s_c_rem_monthly",
        "gas_energy": "g_04_monthly_consumption",
        "gas_volume": "g_13_monthly_volume",
        "exceedance": "current_month_power_usage_over_reference",
    },
    "last_month": {
        "consumption": "c_08_previous_month_consumption",
        "production": "p_08_previous_month_production",
        "exported": "p_11_last_month_exported",
        "self_consumed": "p_14_last_month_self_consumed",
        "remaining_consumption": "s_c_rem_last_month",
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
    # One (label, rate, kwh) entry per applied tariff window. Each is billed as
    # its own invoice line, so each is rounded to cents separately.
    rate_breakdown: tuple = ()


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
    invoice_before_adjustments: float
    electricity_adjustments_gross: float
    gas_adjustments_gross: float
    solar_subsidy_correction: float
    suspended_grid_kwh: float
    suspended_self_kwh: float
    billed_gas_energy_kwh: float
    gas_energy_estimated: bool
    adjustments_estimated: bool
    adjustment_lines: tuple = ()


def round_cents(value: float) -> float:
    """Round a money amount to whole cents, half away from zero.

    Utility invoices price every line to the cent and then sum the rounded
    lines, so the estimate must round the same way to reach the same total
    (e.g. 73.327029 EUR of raw lines bills as 73.33 EUR, not 73.32).
    """
    try:
        numeric = float(value)
        if not math.isfinite(numeric):
            return 0.0
        return float(Decimal(str(numeric)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
    except (InvalidOperation, TypeError, ValueError):
        return 0.0


def get_billing_config(hass) -> BillingConfig:
    """Return the active billing configuration."""
    storage = hass.data.get(DOMAIN, {}).get("storage")
    if storage and getattr(storage, "billing_config", None):
        return storage.billing_config
    return BillingConfig()


def get_currency(hass) -> str:
    """Return the configured billing currency."""
    return get_billing_config(hass).currency or "EUR"


def _production_meter_ids(coordinator) -> list[str]:
    """Return configured production meter ids in user order."""
    configured = [
        str(meter_id).strip()
        for meter_id in getattr(coordinator, "production_meters", []) or []
        if str(meter_id).strip()
    ]
    if configured:
        return configured

    return [
        str(meter_id).strip()
        for meter_id, meter_types in getattr(coordinator, "meters", [])
        if str(meter_id).strip() and "production" in (meter_types or [])
    ]


def _resolve_ordered_feed_in_rates(
    hass,
    billing_config: BillingConfig,
    production_meter_ids: list[str],
) -> list[dict[str, Any]]:
    """Resolve per-meter feed-in rates and self-use priority order."""
    resolved: list[dict[str, Any]] = []

    for idx, meter_id in enumerate(production_meter_ids, start=1):
        rate_entry = next(
            (
                entry
                for entry in (billing_config.feed_in_rates or [])
                if isinstance(entry, dict) and entry.get("meter_id") == meter_id
            ),
            None,
        )
        priority_raw = rate_entry.get("self_use_priority") if rate_entry else None
        # A blank/absent priority means the user did not pick an order — that
        # system is allocated pro-rata to its own production (Prorata Modus).
        if priority_raw is None or priority_raw == "":
            priority = None
        else:
            try:
                priority = max(1, int(float(priority_raw)))
            except (TypeError, ValueError):
                priority = None

        resolved.append(
            {
                "meter_id": meter_id,
                "rate": _resolve_feed_in_rate(hass, billing_config, meter_id),
                "self_use_priority": priority,
                "original_order": idx,
            }
        )

    # Unprioritised systems sort behind prioritised ones and keep their configured order.
    resolved.sort(
        key=lambda item: (
            item["self_use_priority"] is None,
            item["self_use_priority"] or 0,
            item["original_order"],
        )
    )
    return resolved


def _group_into_priority_tiers(
    resolved_rates: list[dict[str, Any]],
) -> list[list[dict[str, Any]]]:
    """Group already-sorted rates into tiers that share the same self-use priority.

    Each tier is served in turn from the remaining house load and its members
    split that tier's self-consumption pro-rata to their own production. A tier
    holding a single system is identical to strict priority allocation, and a
    config with no priorities at all collapses into one pro-rata tier.
    """
    tiers: list[list[dict[str, Any]]] = []
    current_key: object = object()
    for rate in resolved_rates:
        key = rate["self_use_priority"]
        if tiers and key == current_key:
            tiers[-1].append(rate)
            continue
        tiers.append([rate])
        current_key = key
    return tiers


def resolve_allocation_mode(resolved_rates: list[dict[str, Any]]) -> str:
    """Classify the allocation as 'priority', 'prorata' or 'mixed'."""
    if not resolved_rates:
        return "prorata"
    explicit = [rate for rate in resolved_rates if rate["self_use_priority"] is not None]
    if not explicit:
        return "prorata"
    if len(explicit) < len(resolved_rates):
        return "mixed"
    distinct = {rate["self_use_priority"] for rate in explicit}
    return "priority" if len(distinct) == len(explicit) else "mixed"


def _build_value_map(items: list[dict[str, Any]]) -> dict[str, float]:
    """Aggregate Leneda 15-minute items by timestamp."""
    values: dict[str, float] = {}
    for item in items:
        try:
            timestamp = str(item.get("startedAt") or "")
            if not timestamp:
                continue
            values[timestamp] = values.get(timestamp, 0.0) + max(0.0, float(item.get("value") or 0.0))
        except (TypeError, ValueError):
            continue
    return values


def _allocate_priority_solar(
    consumption_items: list[dict[str, Any]],
    per_meter_production_items: dict[str, list[dict[str, Any]]] | None,
    resolved_rates: list[dict[str, Any]],
    official_self_consumed_kwh: float,
    official_exported_kwh: float,
) -> dict[str, float] | None:
    """Allocate self-consumption and export across PV systems.

    Systems with an explicit self-use priority are served in that order;
    systems sharing a priority — including all systems left blank, which is the
    Prorata Modus default — split their tier's self-consumption in proportion
    to what each produced in that 15-minute interval.
    """
    if not consumption_items or not per_meter_production_items or not resolved_rates:
        return None

    house_by_ts = _build_value_map(consumption_items)
    production_by_meter = {
        meter_id: _build_value_map(items)
        for meter_id, items in (per_meter_production_items or {}).items()
    }
    if not any(production_by_meter.get(rate["meter_id"]) for rate in resolved_rates):
        return None

    timestamps = set(house_by_ts.keys())
    for meter_values in production_by_meter.values():
        timestamps.update(meter_values.keys())

    totals: dict[str, dict[str, float]] = {
        rate["meter_id"]: {
            "rate": float(rate["rate"]),
            "self_consumed_kwh": 0.0,
            "exported_kwh": 0.0,
            "produced_kwh": 0.0,
        }
        for rate in resolved_rates
    }

    tiers = _group_into_priority_tiers(resolved_rates)

    for timestamp in sorted(timestamps):
        remaining_house_kw = max(0.0, house_by_ts.get(timestamp, 0.0))
        for tier in tiers:
            tier_solar_kw = [
                max(0.0, production_by_meter.get(rate["meter_id"], {}).get(timestamp, 0.0))
                for rate in tier
            ]
            tier_total_kw = sum(tier_solar_kw)
            if tier_total_kw <= 0:
                continue

            tier_self_used_kw = min(remaining_house_kw, tier_total_kw)
            for rate, solar_kw in zip(tier, tier_solar_kw):
                meter_id = rate["meter_id"]
                # Pro-rata split of this tier's self-consumption by own production
                self_used_kw = tier_self_used_kw * (solar_kw / tier_total_kw)
                totals[meter_id]["produced_kwh"] += solar_kw * 0.25
                totals[meter_id]["self_consumed_kwh"] += self_used_kw * 0.25
                totals[meter_id]["exported_kwh"] += max(0.0, solar_kw - self_used_kw) * 0.25

            remaining_house_kw = max(0.0, remaining_house_kw - tier_self_used_kw)

    raw_self_consumed = sum(item["self_consumed_kwh"] for item in totals.values())
    raw_exported = sum(item["exported_kwh"] for item in totals.values())
    target_self_consumed = max(0.0, float(official_self_consumed_kwh or raw_self_consumed))
    target_exported = max(0.0, float(official_exported_kwh or raw_exported))
    self_scale = target_self_consumed / raw_self_consumed if raw_self_consumed > 0 else 1.0
    export_scale = target_exported / raw_exported if raw_exported > 0 else 1.0

    total_feed_in_revenue = 0.0
    total_self_use_export_equivalent = 0.0
    for meter_totals in totals.values():
        meter_totals["self_consumed_kwh"] *= self_scale
        meter_totals["exported_kwh"] *= export_scale
        total_feed_in_revenue += meter_totals["exported_kwh"] * meter_totals["rate"]
        total_self_use_export_equivalent += meter_totals["self_consumed_kwh"] * meter_totals["rate"]

    return {
        "total_feed_in_revenue": total_feed_in_revenue,
        "total_self_use_export_equivalent": total_self_use_export_equivalent,
        "weighted_export_rate": (
            total_feed_in_revenue / target_exported if target_exported > 0 else 0.0
        ),
        "allocation_mode": resolve_allocation_mode(resolved_rates),
        "per_meter": totals,
    }


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


def _find_matching_window_entry(dt: datetime, windows: list[dict[str, Any]]) -> dict[str, Any] | None:
    """Return the first window configuration matching the datetime."""
    for window in windows:
        if not isinstance(window, dict):
            continue
        if _matches_window(
            dt,
            window.get("day_group", "all"),
            window.get("start_time", "00:00"),
            window.get("end_time", "00:00"),
        ):
            return window
    return None


def _find_matching_window(dt: datetime, windows: list[dict[str, Any]], field: str) -> Any:
    """Return the configured field value for a matching window."""
    window = _find_matching_window_entry(dt, windows)
    return window.get(field) if window is not None else None


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
    breakdown: dict[tuple[str, float], dict[str, Any]] = {}

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
        rate_window = _find_matching_window_entry(parsed_ts, rate_windows)
        applied_rate = rate_window.get("rate") if rate_window is not None else None
        applied_reference = _find_matching_window(
            parsed_ts, reference_windows, "reference_power_kw"
        )
        effective_rate = float(applied_rate) if applied_rate not in (None, "") else base_rate
        applied_label = str((rate_window or {}).get("label") or "").strip() or "Base tariff"
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

        key = (applied_label, effective_rate)
        entry = breakdown.get(key)
        if entry is None:
            breakdown[key] = {"label": applied_label, "rate": effective_rate, "kwh": kwh}
        else:
            entry["kwh"] += kwh

    return WindowedUsage(
        energy_cost=energy_cost,
        exceedance_kwh=exceedance_kwh,
        gross_exceedance_kwh=gross_exceedance_kwh,
        avoided_exceedance_kwh=max(0.0, gross_exceedance_kwh - exceedance_kwh),
        peak_power_kw=peak_power_kw,
        rate_breakdown=tuple(sorted(breakdown.values(), key=lambda entry: entry["label"])),
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
    per_meter_production_items: dict[str, list[dict[str, Any]]] | None = None,
) -> FinancialSummary:
    """Calculate invoice-style money metrics for one preset period."""
    keys = PERIOD_DATA_KEYS[period_key]
    billing_config = get_billing_config(hass)
    production_meter_ids = _production_meter_ids(coordinator)

    consumption = float(data.get(keys["consumption"], 0) or 0)
    production = float(data.get(keys["production"], 0) or 0)
    sold_to_market = max(0.0, float(data.get(keys["exported"], 0) or 0))
    self_consumed = float(data.get(keys["self_consumed"], 0) or 0)
    solar_to_home = max(0.0, self_consumed if self_consumed > 0 else production - sold_to_market)
    remaining_consumption = None
    remaining_consumption_key = keys.get("remaining_consumption")
    if remaining_consumption_key and data.get(remaining_consumption_key) is not None:
        try:
            remaining_consumption = max(0.0, float(data.get(remaining_consumption_key) or 0))
        except (TypeError, ValueError):
            remaining_consumption = None
    billed_consumption = (
        remaining_consumption
        if remaining_consumption is not None
        else max(0.0, consumption - solar_to_home)
    )
    exceedance_kwh = float(data.get(keys["exceedance"], 0) or 0)
    gas_energy = float(data.get(keys["gas_energy"], 0) or 0)
    gas_volume = float(data.get(keys["gas_volume"], 0) or 0)
    has_gas = gas_energy > 0 or gas_volume > 0
    # Volume-only gas meters have no metered kWh channel: bill the variable
    # lines on energy derived from the measured volume with the configured
    # conversion factor instead of billing 0 EUR (issue #92).
    try:
        gas_kwh_per_m3 = float(getattr(billing_config, "gas_kwh_per_m3", 11.0) or 11.0)
    except (TypeError, ValueError):
        gas_kwh_per_m3 = 11.0
    if not math.isfinite(gas_kwh_per_m3) or gas_kwh_per_m3 <= 0:
        gas_kwh_per_m3 = 11.0
    gas_energy_estimated = gas_energy <= 0.0 and gas_volume > 0.0
    billed_gas_energy = gas_energy if gas_energy > 0.0 else gas_volume * gas_kwh_per_m3
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
    meter_fee_lines = [
        float(fee.get("fee") or 0.0) * pro_factor
        for fee in (billing_config.meter_monthly_fees or [])
        if isinstance(fee, dict)
    ]
    meter_fees_total = sum(meter_fee_lines)

    # Dated billing adjustments (e.g. Luxembourg 2026 subsidies) are subtracted
    # as net amounts before VAT so the final gross reduction matches the
    # official per-unit rate exactly. Computed before the invoice lines
    # because a suspending adjustment (the electricity subsidy, which
    # suppliers bill *through* the compensation line) removes the base
    # compensation credit on the same kWh instead of stacking both.
    adjustments = compute_billing_adjustments(
        getattr(billing_config, "billing_adjustments", None),
        vat_rate=float(billing_config.vat_rate or 0.0),
        gas_vat_rate=float(billing_config.gas_vat_rate or 0.0),
        period_start=start_dt.date(),
        period_end=end_dt.date(),
        consumption_items=consumption_items or [],
        production_items=production_items or [],
        fallback_grid_import_kwh=billed_consumption,
        fallback_self_consumed_kwh=solar_to_home,
        gas_volume_m3=gas_volume,
        gas_energy_kwh=gas_energy,
        gas_kwh_per_m3=gas_kwh_per_m3,
    )
    electricity_adj = adjustments["electricity"]
    gas_adj = adjustments["gas"]
    suspended_grid_kwh = min(
        billed_consumption, max(0.0, float(electricity_adj.get("suspended_grid_kwh") or 0.0))
    )
    suspended_self_kwh = min(
        solar_to_home, max(0.0, float(electricity_adj.get("suspended_self_kwh") or 0.0))
    )

    # A utility prices each invoice line to the cent and then adds the rounded
    # lines up, so the subtotal is built the same way here. Summing raw values
    # instead would drift up to a cent away from the supplier's total.
    energy_cost_lines = (
        [float(entry["kwh"]) * float(entry["rate"]) for entry in windowed_usage.rate_breakdown]
        if uses_tariff_windows and windowed_usage is not None and windowed_usage.rate_breakdown
        else [energy_cost]
    )
    invoice_lines = [
        *energy_cost_lines,
        float(billing_config.energy_fixed_fee or 0.0) * pro_factor,
        float(billing_config.network_metering_rate or 0.0) * pro_factor,
        float(billing_config.network_power_ref_rate or 0.0) * pro_factor,
        network_variable_cost,
        exceedance_cost,
        *meter_fee_lines,
        (billed_consumption - suspended_grid_kwh) * float(billing_config.compensation_fund_rate or 0.0),
        billed_consumption * float(billing_config.electricity_tax_rate or 0.0),
        -max(0.0, float(getattr(billing_config, "domiciliation_discount", 0.0) or 0.0)) * pro_factor,
        -max(0.0, float(billing_config.connect_discount or 0.0)) * pro_factor,
    ]
    subtotal_costs = round_cents(sum(round_cents(amount) for amount in invoice_lines))

    # Adjustments are their own invoice line, so they are rounded like one, and
    # VAT is charged on the rounded subtotal exactly as the supplier does.
    subtotal_costs_before_adjustments = subtotal_costs
    subtotal_costs = round_cents(
        subtotal_costs - round_cents(float(electricity_adj["applied_net"]))
    )
    electricity_vat = round_cents(subtotal_costs * float(billing_config.vat_rate or 0.0))
    total_costs = round_cents(subtotal_costs + electricity_vat)

    priority_allocation = _allocate_priority_solar(
        consumption_items or [],
        per_meter_production_items,
        _resolve_ordered_feed_in_rates(hass, billing_config, production_meter_ids),
        solar_to_home,
        sold_to_market,
    )
    avg_feed_in_rate = (
        float(priority_allocation["weighted_export_rate"])
        if priority_allocation is not None
        else _avg_feed_in_rate(hass, billing_config, production_meter_ids)
    )
    feed_in_revenue = (
        float(priority_allocation["total_feed_in_revenue"])
        if priority_allocation is not None
        else sold_to_market * avg_feed_in_rate
    )

    self_consumed_savings_base = solar_to_home * (
        float(billing_config.energy_variable_rate or 0.0)
        + float(billing_config.network_variable_rate or 0.0)
        + float(billing_config.electricity_tax_rate or 0.0)
        + float(billing_config.compensation_fund_rate or 0.0)
    )
    total_self_consumed_savings = self_consumed_savings_base * (1 + float(billing_config.vat_rate or 0.0))
    # A self-consumed solar kWh during a subsidy period avoids a grid import
    # that would itself have received the subsidy, so its economic value is
    # lower by the applicable gross subsidy per kWh.
    solar_subsidy_correction = float(electricity_adj["solar_correction_gross"])
    total_self_consumed_savings = total_self_consumed_savings - solar_subsidy_correction
    # Where the subsidy suspends the base compensation credit, a self-consumed
    # kWh also avoids no base compensation — remove that value as well.
    suspended_compensation_correction = (
        suspended_self_kwh
        * float(billing_config.compensation_fund_rate or 0.0)
        * (1 + float(billing_config.vat_rate or 0.0))
    )
    total_self_consumed_savings = (
        total_self_consumed_savings - suspended_compensation_correction
    )
    self_use_vs_export_value = total_self_consumed_savings - (
        float(priority_allocation["total_self_use_export_equivalent"])
        if priority_allocation is not None
        else solar_to_home * avg_feed_in_rate
    )

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

    # Same per-line cent rounding as the electricity invoice above.
    gas_subtotal = round_cents(
        sum(
            round_cents(amount)
            for amount in (
                float(billing_config.gas_fixed_fee or 0.0) * pro_factor,
                billed_gas_energy * float(billing_config.gas_variable_rate or 0.0),
                float(billing_config.gas_network_fee or 0.0) * pro_factor,
                billed_gas_energy * float(billing_config.gas_network_variable_rate or 0.0),
                billed_gas_energy * float(billing_config.gas_tax_rate or 0.0),
            )
        )
    )
    gas_subtotal = round_cents(gas_subtotal - round_cents(float(gas_adj["applied_net"])))
    gas_vat = round_cents(gas_subtotal * float(billing_config.gas_vat_rate or 0.0))
    gas_total = round_cents(gas_subtotal + gas_vat) if has_gas else 0.0
    electricity_total = total_costs - feed_in_revenue

    adjustment_lines = tuple(
        {
            **line,
            "quantity": round(float(line["quantity"]), 4),
            "total_gross": round(float(line["total_gross"]), 4),
            "total_net": round(float(line["total_net"]), 4),
        }
        for line in (*electricity_adj["lines"], *gas_adj["lines"])
    )

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
        invoice_before_adjustments=round(
            (
                round_cents(
                    subtotal_costs_before_adjustments
                    + round_cents(
                        subtotal_costs_before_adjustments * float(billing_config.vat_rate or 0.0)
                    )
                )
                - feed_in_revenue
            )
            + (gas_total + float(gas_adj["applied_gross"])),
            2,
        ),
        electricity_adjustments_gross=round(float(electricity_adj["applied_gross"]), 2),
        gas_adjustments_gross=round(float(gas_adj["applied_gross"]), 2),
        solar_subsidy_correction=round(solar_subsidy_correction, 2),
        suspended_grid_kwh=round(suspended_grid_kwh, 4),
        suspended_self_kwh=round(suspended_self_kwh, 4),
        billed_gas_energy_kwh=round(billed_gas_energy, 4),
        gas_energy_estimated=bool(gas_energy_estimated),
        adjustments_estimated=bool(adjustments["estimated"]),
        adjustment_lines=adjustment_lines,
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
            period_input.get("per_meter_production_items"),
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
            "invoice_before_adjustments": summary.invoice_before_adjustments,
            "electricity_adjustments_gross": summary.electricity_adjustments_gross,
            "gas_adjustments_gross": summary.gas_adjustments_gross,
            "solar_subsidy_correction": summary.solar_subsidy_correction,
            "suspended_grid_kwh": summary.suspended_grid_kwh,
            "suspended_self_kwh": summary.suspended_self_kwh,
            "billed_gas_energy_kwh": summary.billed_gas_energy_kwh,
            "gas_energy_estimated": summary.gas_energy_estimated,
            "adjustments_estimated": summary.adjustments_estimated,
            "adjustment_lines": list(summary.adjustment_lines),
        }

    return values, attributes
