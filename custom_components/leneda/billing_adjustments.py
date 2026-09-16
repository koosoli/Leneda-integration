"""Dated billing-adjustment engine (subsidies, rebates, temporary taxes).

Pure, Home Assistant-free module so it can be unit-tested and kept in parity
with the frontend twin in frontend-src/src/utils/billingAdjustments.ts.

Both implementations must stay arithmetically identical (same operations in
the same order, IEEE-754 doubles) — shared fixtures live in
tests/fixtures/billing_adjustments.json.

Concepts:
- An adjustment is a dated per-unit gross amount (e.g. -0.04 EUR/kWh state aid).
- Date ranges are inclusive calendar dates in Europe/Luxembourg
  (internally equivalent to a half-open range [start, day_after_end)).
- The engine works on net amounts: a VAT-inclusive gross adjustment is
  converted with net = gross / (1 + vat_rate) and subtracted before VAT is
  recalculated, so the final invoice reduction equals exactly
  eligible_quantity x amount_gross.
- Valid overlapping adjustments stack; there is no exclusive flag yet.
"""
from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

try:
    _LUX_TZ: ZoneInfo | None = ZoneInfo("Europe/Luxembourg")
except ZoneInfoNotFoundError:  # systems without tzdata (e.g. Windows core installs)
    _LUX_TZ = None


def _last_sunday(year: int, month: int) -> date:
    """Return the last Sunday of a month (for EU DST rules)."""
    if month == 12:
        candidate = date(year, 12, 31)
    else:
        candidate = date(year, month + 1, 1) - timedelta(days=1)
    return candidate - timedelta(days=(candidate.weekday() + 1) % 7)


def _luxembourg_offset_hours(utc_dt: datetime) -> int:
    """Europe/Luxembourg offset without tzdata: +2 CEST, +1 CET.

    DST runs from the last Sunday of March 01:00 UTC to the last Sunday of
    October 01:00 UTC.
    """
    dst_start = datetime.combine(
        _last_sunday(utc_dt.year, 3), datetime.min.time(), tzinfo=timezone.utc
    ) + timedelta(hours=1)
    dst_end = datetime.combine(
        _last_sunday(utc_dt.year, 10), datetime.min.time(), tzinfo=timezone.utc
    ) + timedelta(hours=1)
    return 2 if dst_start <= utc_dt < dst_end else 1

# Approximate Luxembourg gas conversion used only when no metered m3 exists.
GAS_KWH_PER_M3 = 11.0

ADJUSTMENT_SCHEMA_VERSION = 1

COMMODITY_ELECTRICITY = "electricity"
COMMODITY_GAS = "gas"
BASIS_GRID_IMPORT_KWH = "grid_import_kwh"
BASIS_GAS_VOLUME_M3 = "gas_volume_m3"

_VALID_COMMODITIES = {COMMODITY_ELECTRICITY, COMMODITY_GAS}
_VALID_BASES = {BASIS_GRID_IMPORT_KWH, BASIS_GAS_VOLUME_M3}

LU_ELECTRICITY_PRESET_ID = "lu_resilienzpak_electricity_2026"
LU_GAS_PRESET_ID = "lu_resilienzpak_gas_2026"

#: Official Luxembourg Resilienzpak 2026 household subsidies.
#:
#: The electricity subsidy is channelled through the compensation mechanism:
#: suppliers bill it as "Mécanisme de compensation A -0,0371 EUR/kWh"
#: (= -0,04 EUR/kWh incl. VAT) instead of the base compensation credit, so
#: the base compensation must not be stacked on top for subsidised kWh
#: (see suspends_compensation).
LUXEMBOURG_PRESETS: list[dict[str, Any]] = [
    {
        "id": "lu-electricity-resilienzpak-2026",
        "label": "Luxembourg electricity subsidy 2026",
        "commodity": COMMODITY_ELECTRICITY,
        "basis": BASIS_GRID_IMPORT_KWH,
        "amount_gross": 0.04,
        "start_date": "2026-08-01",
        "end_date": "2026-12-31",
        "vat_included": True,
        "preset_id": LU_ELECTRICITY_PRESET_ID,
        "eligibility_note": "Residential customers below 25,000 kWh/year; applies to grid import only. Suppliers show this as 'Mécanisme de compensation A -0,0371/kWh'.",
        "suspends_compensation": True,
    },
    {
        "id": "lu-gas-resilienzpak-2026",
        "label": "Luxembourg gas subsidy 2026",
        "commodity": COMMODITY_GAS,
        "basis": BASIS_GAS_VOLUME_M3,
        "amount_gross": 0.15,
        "start_date": "2026-08-01",
        "end_date": "2026-12-31",
        "vat_included": True,
        "preset_id": LU_GAS_PRESET_ID,
        "eligibility_note": "Eligible residential gas consumption.",
        "suspends_compensation": False,
    },
]


def default_adjustments(enabled: bool = True) -> list[dict[str, Any]]:
    """Return the built-in Luxembourg presets, enabled or review-disabled."""
    presets: list[dict[str, Any]] = []
    for preset in LUXEMBOURG_PRESETS:
        entry = dict(preset)
        entry["enabled"] = enabled
        entry["tariff_already_includes_adjustment"] = False
        presets.append(entry)
    return presets


def _parse_iso_date(value: Any) -> date | None:
    """Parse a YYYY-MM-DD calendar date."""
    if not isinstance(value, str):
        return None
    try:
        return date.fromisoformat(value.strip()[:10])
    except ValueError:
        return None


def validate_adjustment(raw: Any) -> list[str]:
    """Return a list of validation errors for one adjustment config entry."""
    errors: list[str] = []
    if not isinstance(raw, dict):
        return ["adjustment must be an object"]

    commodity = raw.get("commodity")
    if commodity not in _VALID_COMMODITIES:
        errors.append(f"invalid commodity: {commodity!r}")
    basis = raw.get("basis")
    if basis not in _VALID_BASES:
        errors.append(f"invalid basis: {basis!r}")
    if commodity == COMMODITY_ELECTRICITY and basis not in (None, BASIS_GRID_IMPORT_KWH):
        errors.append("electricity adjustments must use the grid_import_kwh basis")
    if commodity == COMMODITY_GAS and basis not in (None, BASIS_GAS_VOLUME_M3):
        errors.append("gas adjustments must use the gas_volume_m3 basis")

    try:
        amount = float(raw.get("amount_gross"))
    except (TypeError, ValueError):
        errors.append("amount_gross must be a number")
    else:
        if amount != amount:  # NaN
            errors.append("amount_gross must not be NaN")
        elif amount < 0:
            errors.append("amount_gross must not be negative")

    start = _parse_iso_date(raw.get("start_date"))
    end = _parse_iso_date(raw.get("end_date"))
    if start is None:
        errors.append("start_date must be YYYY-MM-DD")
    if end is None:
        errors.append("end_date must be YYYY-MM-DD")
    if start is not None and end is not None and end < start:
        errors.append("end_date must not be before start_date")

    return errors


def normalize_adjustment(raw: dict[str, Any], index: int = 0) -> dict[str, Any]:
    """Return a canonical adjustment dict with defaults filled in."""
    try:
        amount = float(raw.get("amount_gross"))
    except (TypeError, ValueError):
        amount = 0.0
    if amount != amount:  # NaN — kept so validation can reject non-finite input
        amount = 0.0

    label = raw.get("label")
    preset_id = raw.get("preset_id")
    adj_id = raw.get("id")
    if "suspends_compensation" in raw:
        suspends_compensation = bool(raw.get("suspends_compensation"))
    else:
        # Stored official presets predate the flag: they carry the official
        # semantics (no stacking with the base compensation credit).
        suspends_compensation = str(preset_id or "") == LU_ELECTRICITY_PRESET_ID
    return {
        "id": str(adj_id).strip() if adj_id else f"custom-{index + 1}",
        "label": str(label).strip() if isinstance(label, str) and label.strip() else "Billing adjustment",
        "enabled": bool(raw.get("enabled", True)),
        "commodity": raw.get("commodity") if raw.get("commodity") in _VALID_COMMODITIES else COMMODITY_ELECTRICITY,
        "basis": raw.get("basis") if raw.get("basis") in _VALID_BASES else BASIS_GRID_IMPORT_KWH,
        "amount_gross": amount,
        "start_date": str(raw.get("start_date") or "")[:10],
        "end_date": str(raw.get("end_date") or "")[:10],
        "vat_included": bool(raw.get("vat_included", True)),
        "preset_id": str(preset_id).strip() if preset_id else "",
        "eligibility_note": str(raw.get("eligibility_note") or "").strip(),
        "tariff_already_includes_adjustment": bool(raw.get("tariff_already_includes_adjustment", False)),
        "suspends_compensation": suspends_compensation,
    }


def normalize_adjustments(raw_list: Any) -> list[dict[str, Any]]:
    """Normalize a stored adjustment list, dropping non-dict entries."""
    if not isinstance(raw_list, list):
        return []
    return [
        normalize_adjustment(entry, index)
        for index, entry in enumerate(raw_list)
        if isinstance(entry, dict)
    ]


def luxembourg_date(timestamp: Any) -> str | None:
    """Return the Europe/Luxembourg calendar date (YYYY-MM-DD) of an ISO timestamp."""
    if isinstance(timestamp, datetime):
        dt = timestamp
    elif isinstance(timestamp, str):
        try:
            dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
        except ValueError:
            return None
    else:
        return None
    if _LUX_TZ is not None:
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=_LUX_TZ)
        return dt.astimezone(_LUX_TZ).date().isoformat()
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    utc_dt = dt.astimezone(timezone.utc)
    local_dt = utc_dt + timedelta(hours=_luxembourg_offset_hours(utc_dt))
    return local_dt.date().isoformat()


def _covers(adj: dict[str, Any], lux_date: str) -> bool:
    """Return True when the adjustment covers a Luxembourg calendar date."""
    start = adj.get("start_date") or ""
    end = adj.get("end_date") or ""
    return bool(start) and bool(end) and start <= lux_date <= end


def _active(adj: dict[str, Any]) -> bool:
    """Return True for usable adjustments (enabled, valid dates, valid amount)."""
    if not adj.get("enabled"):
        return False
    if validate_adjustment(adj):
        return False
    return True


def applied(adj: dict[str, Any]) -> bool:
    """Return True when the adjustment reduces the invoice as a separate line."""
    return _active(adj) and not adj.get("tariff_already_includes_adjustment")


def _overlap_days(adj: dict[str, Any], period_start: date, period_end: date) -> int:
    """Calendar days shared between the adjustment window and the period."""
    start = _parse_iso_date(adj.get("start_date"))
    end = _parse_iso_date(adj.get("end_date"))
    if start is None or end is None:
        return 0
    overlap_start = max(period_start, start)
    overlap_end = min(period_end, end)
    if overlap_end < overlap_start:
        return 0
    return (overlap_end - overlap_start).days + 1


def _make_line(
    adj: dict[str, Any],
    quantity: float,
    unit: str,
    vat_rate: float,
    is_applied: bool,
    estimated: bool,
) -> dict[str, Any]:
    """Build one invoice adjustment line.

    Monetary math must stay identical to the TypeScript twin:
    gross first, then net = gross / (1 + vat) for VAT-inclusive amounts.
    """
    total_gross = quantity * float(adj["amount_gross"])
    if adj.get("vat_included", True):
        total_net = total_gross / (1 + vat_rate)
    else:
        total_net = total_gross
    return {
        "id": adj["id"],
        "label": adj["label"],
        "commodity": adj["commodity"],
        "basis": adj["basis"],
        "unit": unit,
        "quantity": quantity,
        "amount_gross": float(adj["amount_gross"]),
        "total_gross": total_gross,
        "total_net": total_net,
        "vat_included": bool(adj.get("vat_included", True)),
        "applied": is_applied,
        "estimated": estimated,
        "preset_id": adj.get("preset_id") or "",
        "eligibility_note": adj.get("eligibility_note") or "",
    }


def _electricity_lines(
    adjustments: list[dict[str, Any]],
    consumption_items: list[dict[str, Any]] | None,
    production_items: list[dict[str, Any]] | None,
    fallback_grid_import_kwh: float,
    fallback_self_consumed_kwh: float,
    period_start: date,
    period_end: date,
    vat_rate: float,
) -> tuple[list[dict[str, Any]], float, float, float, bool]:
    """Compute electricity adjustment lines.

    Returns (lines, solar_correction_gross, suspended_grid_kwh,
    suspended_self_kwh, estimated_any).
    Grid import per 15-min interval = max(0, house kW - solar kW) * 0.25,
    the same netting convention as the windowed tariff calculation.

    Interval data is only used to split the period: when authoritative
    period totals are available (the billed grid import / self-consumption
    from the official meters), eligible quantities are scaled to those
    totals so meter skew between the interval streams cannot inflate or
    shrink the subsidy (e.g. 384,552 kWh recomputed vs. 382,759 kWh billed
    for SUDenergie 08.2026). Without totals the interval sums are used
    directly.

    Adjustments flagged suspends_compensation (the official electricity
    subsidy, which suppliers bill *through* the compensation line) report
    their eligible quantities separately so callers can skip the base
    compensation credit on those kWh instead of stacking both.
    """
    electricity = [
        adj
        for adj in adjustments
        if adj.get("commodity") == COMMODITY_ELECTRICITY
        and adj.get("basis") == BASIS_GRID_IMPORT_KWH
        and _active(adj)
    ]
    if not electricity:
        return [], 0.0, 0.0, 0.0, False

    lines: list[dict[str, Any]] = []
    solar_correction_gross = 0.0
    suspended_grid_kwh = 0.0
    suspended_self_kwh = 0.0
    estimated_any = False

    billed_grid = max(0.0, float(fallback_grid_import_kwh or 0.0))
    billed_self = max(0.0, float(fallback_self_consumed_kwh or 0.0))

    if consumption_items:
        covered_grid = {adj["id"]: 0.0 for adj in electricity}
        covered_self = {adj["id"]: 0.0 for adj in electricity}
        total_grid = 0.0
        total_self = 0.0
        production_by_ts: dict[str, float] = {}
        for item in production_items or []:
            try:
                ts = str(item.get("startedAt") or "")
                production_by_ts[ts] = production_by_ts.get(ts, 0.0) + float(item.get("value") or 0.0)
            except (TypeError, ValueError):
                continue

        for item in consumption_items:
            try:
                kw = float(item.get("value") or 0.0)
                lux_date = luxembourg_date(str(item.get("startedAt") or ""))
            except (TypeError, ValueError):
                continue
            if lux_date is None:
                continue
            solar_kw = production_by_ts.get(str(item.get("startedAt") or ""), 0.0)
            grid_kwh = max(0.0, kw - solar_kw) * 0.25
            self_kwh = min(kw, solar_kw) * 0.25
            total_grid += grid_kwh
            total_self += self_kwh
            for adj in electricity:
                if _covers(adj, lux_date):
                    covered_grid[adj["id"]] += grid_kwh
                    covered_self[adj["id"]] += self_kwh

        period_days = max(1, (period_end - period_start).days + 1)
        for adj in electricity:
            if total_grid > 0.0 and billed_grid > 0.0:
                quantity = billed_grid * (covered_grid[adj["id"]] / total_grid)
                self_qty = (
                    billed_self * (covered_self[adj["id"]] / total_self)
                    if total_self > 0.0 and billed_self > 0.0
                    else covered_self[adj["id"]]
                )
            elif billed_grid > 0.0:
                # Intervals carry no grid import but the meter billed some:
                # fall back to calendar-day proration for this period.
                overlap = _overlap_days(adj, period_start, period_end)
                share = overlap / period_days
                estimated_any = estimated_any or (0 < overlap < period_days)
                quantity = billed_grid * share
                self_qty = billed_self * share
            else:
                quantity = covered_grid[adj["id"]]
                self_qty = covered_self[adj["id"]]
            is_applied = applied(adj)
            lines.append(
                _make_line(adj, quantity, "kWh", vat_rate, is_applied, False)
            )
            if is_applied:
                solar_correction_gross += self_qty * float(adj["amount_gross"])
            if is_applied and adj.get("suspends_compensation"):
                suspended_grid_kwh += quantity
                suspended_self_kwh += self_qty
        return lines, solar_correction_gross, suspended_grid_kwh, suspended_self_kwh, estimated_any

    # Fallback without interval data: prorate the period totals by calendar
    # day overlap and flag the result as estimated when the period must be split.
    period_days = max(1, (period_end - period_start).days + 1)
    for adj in electricity:
        overlap = _overlap_days(adj, period_start, period_end)
        share = overlap / period_days
        estimated = 0 < overlap < period_days
        estimated_any = estimated_any or estimated
        is_applied = applied(adj)
        quantity = billed_grid * share
        self_qty = billed_self * share
        lines.append(
            _make_line(
                adj,
                quantity,
                "kWh",
                vat_rate,
                is_applied,
                estimated,
            )
        )
        if is_applied:
            solar_correction_gross += self_qty * float(adj["amount_gross"])
        if is_applied and adj.get("suspends_compensation"):
            suspended_grid_kwh += quantity
            suspended_self_kwh += self_qty
    return lines, solar_correction_gross, suspended_grid_kwh, suspended_self_kwh, estimated_any


def _gas_lines(
    adjustments: list[dict[str, Any]],
    gas_volume_m3: float,
    gas_energy_kwh: float,
    period_start: date,
    period_end: date,
    vat_rate: float,
    gas_kwh_per_m3: float = GAS_KWH_PER_M3,
) -> tuple[list[dict[str, Any]], bool]:
    """Compute gas adjustment lines from period volume.

    Gas interval data is not available, so partial periods are prorated by
    calendar days and flagged estimated. Volume is never silently treated as
    kWh: when only energy exists it is converted with the configured
    volume-to-energy factor and flagged estimated.
    """
    gas = [
        adj
        for adj in adjustments
        if adj.get("commodity") == COMMODITY_GAS
        and adj.get("basis") == BASIS_GAS_VOLUME_M3
        and _active(adj)
    ]
    if not gas:
        return [], False

    estimated_any = False
    volume = max(0.0, float(gas_volume_m3 or 0.0))
    try:
        factor = float(gas_kwh_per_m3 or GAS_KWH_PER_M3)
    except (TypeError, ValueError):
        factor = GAS_KWH_PER_M3
    if factor != factor or factor <= 0:  # NaN or non-positive guard
        factor = GAS_KWH_PER_M3
    if volume <= 0.0 and gas_energy_kwh > 0:
        volume = float(gas_energy_kwh) / factor
        estimated_any = True

    period_days = max(1, (period_end - period_start).days + 1)
    lines: list[dict[str, Any]] = []
    for adj in gas:
        overlap = _overlap_days(adj, period_start, period_end)
        share = overlap / period_days
        estimated = estimated_any or (0 < overlap < period_days)
        lines.append(
            _make_line(adj, volume * share, "m3", vat_rate, applied(adj), estimated)
        )
        if estimated:
            estimated_any = True
    return lines, estimated_any


def compute_billing_adjustments(
    adjustments: list[dict[str, Any]] | None,
    *,
    vat_rate: float,
    gas_vat_rate: float,
    period_start: date,
    period_end: date,
    consumption_items: list[dict[str, Any]] | None = None,
    production_items: list[dict[str, Any]] | None = None,
    fallback_grid_import_kwh: float = 0.0,
    fallback_self_consumed_kwh: float = 0.0,
    gas_volume_m3: float = 0.0,
    gas_energy_kwh: float = 0.0,
    gas_kwh_per_m3: float = GAS_KWH_PER_M3,
) -> dict[str, Any]:
    """Compute all billing-adjustment lines for one invoice period.

    Returns a dict with per-commodity lines plus the applied net totals that
    must be subtracted from the pre-VAT subtotals, and the gross solar
    self-consumption correction for the subsidy period.
    """
    normalized = normalize_adjustments(adjustments or [])

    electricity_lines, solar_correction_gross, suspended_grid_kwh, suspended_self_kwh, elec_estimated = _electricity_lines(
        normalized,
        consumption_items,
        production_items,
        fallback_grid_import_kwh,
        fallback_self_consumed_kwh,
        period_start,
        period_end,
        float(vat_rate or 0.0),
    )
    gas_lines, gas_estimated = _gas_lines(
        normalized,
        gas_volume_m3,
        gas_energy_kwh,
        period_start,
        period_end,
        float(gas_vat_rate or 0.0),
        gas_kwh_per_m3,
    )

    def _totals(lines: list[dict[str, Any]]) -> tuple[float, float]:
        gross = sum(line["total_gross"] for line in lines if line["applied"])
        net = sum(line["total_net"] for line in lines if line["applied"])
        return gross, net

    elec_gross, elec_net = _totals(electricity_lines)
    gas_gross, gas_net = _totals(gas_lines)

    return {
        "schema_version": ADJUSTMENT_SCHEMA_VERSION,
        "electricity": {
            "lines": electricity_lines,
            "applied_gross": elec_gross,
            "applied_net": elec_net,
            "solar_correction_gross": solar_correction_gross,
            "suspended_grid_kwh": suspended_grid_kwh,
            "suspended_self_kwh": suspended_self_kwh,
            "estimated": elec_estimated,
        },
        "gas": {
            "lines": gas_lines,
            "applied_gross": gas_gross,
            "applied_net": gas_net,
            "estimated": gas_estimated,
        },
        "estimated": elec_estimated or gas_estimated,
    }
