"""HTTP REST API for the Leneda dashboard.

Provides JSON endpoints consumed by the Vite frontend running inside the HA iframe panel.
All endpoints require Home Assistant authentication (session cookie from iframe).

Endpoints:
  GET  /api/leneda/data?range=yesterday|this_week|last_week|this_month|last_month
  GET  /api/leneda/data/custom?start=YYYY-MM-DD&end=YYYY-MM-DD
  GET  /api/leneda/data/timeseries?obis=1-1:1.29.0&start=ISO&end=ISO
  GET  /api/leneda/sensors
  GET  /api/leneda/config
  POST /api/leneda/config
  POST /api/leneda/config/reset
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import DOMAIN, CONF_API_KEY, CONF_ENERGY_ID, CONF_METER_HAS_GAS, CONF_METERING_POINT_ID, CONF_METERING_POINT_1_TYPES, CONF_REFERENCE_POWER_ENTITY, CONF_REFERENCE_POWER_STATIC, EXTRA_METER_SLOTS, OBIS_CODES
from .models import BillingConfig
from .storage import get_effective_reference_power

_LOGGER = logging.getLogger(__name__)


PRESET_RANGE_MAPPING: dict[str, dict[str, str | None]] = {
    "yesterday": {
        "consumption": "c_04_yesterday_consumption",
        "production": "p_04_yesterday_production",
        "exported": "p_09_yesterday_exported",
        "self_consumed": "p_12_yesterday_self_consumed",
        "shared": "s_sent_yesterday",
        "shared_with_me": "s_received_yesterday",
        "gas_energy": "g_01_yesterday_consumption",
        "gas_volume": "g_10_yesterday_volume",
        "exceedance": "yesterdays_power_usage_over_reference",
    },
    "this_week": {
        "consumption": "c_05_weekly_consumption",
        "production": "p_05_weekly_production",
        "exported": "p_17_weekly_exported",
        "self_consumed": "p_18_weekly_self_consumed",
        "shared": "s_sent_weekly",
        "shared_with_me": "s_received_weekly",
        "gas_energy": "g_02_weekly_consumption",
        "gas_volume": "g_11_weekly_volume",
        "exceedance": None,
    },
    "last_week": {
        "consumption": "c_06_last_week_consumption",
        "production": "p_06_last_week_production",
        "exported": "p_10_last_week_exported",
        "self_consumed": "p_13_last_week_self_consumed",
        "shared": "s_sent_last_week",
        "shared_with_me": "s_received_last_week",
        "gas_energy": "g_03_last_week_consumption",
        "gas_volume": "g_12_last_week_volume",
        "exceedance": None,
    },
    "this_month": {
        "consumption": "c_07_monthly_consumption",
        "production": "p_07_monthly_production",
        "exported": "p_15_monthly_exported",
        "self_consumed": "p_16_monthly_self_consumed",
        "shared": "s_sent_monthly",
        "shared_with_me": "s_received_monthly",
        "gas_energy": "g_04_monthly_consumption",
        "gas_volume": "g_13_monthly_volume",
        "exceedance": "current_month_power_usage_over_reference",
    },
    "last_month": {
        "consumption": "c_08_previous_month_consumption",
        "production": "p_08_previous_month_production",
        "exported": "p_11_last_month_exported",
        "self_consumed": "p_14_last_month_self_consumed",
        "shared": "s_sent_last_month",
        "shared_with_me": "s_received_last_month",
        "gas_energy": "g_05_last_month_consumption",
        "gas_volume": "g_14_last_month_volume",
        "exceedance": "last_month_power_usage_over_reference",
    },
}

PRESET_REMAINING_CONSUMPTION_KEYS: dict[str, str | None] = {
    "yesterday": None,
    "this_week": None,
    "last_week": None,
    "this_month": None,
    "last_month": "s_c_rem_last_month",
}


class LenedaModeView(HomeAssistantView):
    """Return deployment mode so the frontend knows to hide credential UI."""

    url = "/leneda_api/mode"
    name = "api:leneda:mode"
    requires_auth = False  # Must respond even before auth for mode detection

    async def get(self, request: web.Request) -> web.Response:
        return self.json({"mode": "ha", "configured": True})


def _get_first_coordinator(hass: HomeAssistant):
    """Return the first active coordinator, or None."""
    for key, val in hass.data.get(DOMAIN, {}).items():
        if key not in ("storage", "views_registered") and hasattr(val, "data"):
            return val
    return None


def _get_coordinators(hass: HomeAssistant) -> list[Any]:
    """Return all active Leneda coordinators."""
    return [
        val
        for key, val in hass.data.get(DOMAIN, {}).items()
        if key not in ("storage", "views_registered") and hasattr(val, "data")
    ]


def _get_preferred_coordinator(hass: HomeAssistant, meter_type: str | None = None) -> Any | None:
    """Return a coordinator that has the requested meter type, or the first one."""
    coordinators = _get_coordinators(hass)
    if not coordinators:
        return None
    if meter_type is None:
        return coordinators[0]

    for coordinator in coordinators:
        for _mid, types in getattr(coordinator, "meters", []):
            if meter_type in (types or []):
                return coordinator
    return coordinators[0]


def _iter_entry_meters(entry: Any) -> list[dict[str, Any]]:
    """Extract all configured meters from a config entry."""
    meters: list[dict[str, Any]] = []
    m1_id = (entry.data.get(CONF_METERING_POINT_ID) or "").strip()
    m1_types = entry.data.get(CONF_METERING_POINT_1_TYPES, ["consumption"])
    if m1_id:
        meters.append({"id": m1_id, "types": m1_types})

    for id_key, types_key in EXTRA_METER_SLOTS:
        mid = (entry.data.get(id_key) or "").strip()
        mtypes = entry.data.get(types_key, [])
        if mid:
            meters.append({"id": mid, "types": mtypes})
    return meters


def _get_meter_routes(hass: HomeAssistant) -> dict[str, list[dict[str, Any]]]:
    """Build a de-duplicated map of meter routes across all coordinators."""
    routes: dict[str, list[dict[str, Any]]] = {
        "consumption": [],
        "production": [],
        "gas": [],
    }
    seen: set[tuple[str, str]] = set()

    for coordinator in _get_coordinators(hass):
        for mid, types in getattr(coordinator, "meters", []):
            meter_id = (mid or "").strip()
            if not meter_id:
                continue
            for meter_type in (types or []):
                if meter_type not in routes:
                    continue
                key = (meter_type, meter_id)
                if key in seen:
                    continue
                seen.add(key)
                routes[meter_type].append(
                    {
                        "meter_id": meter_id,
                        "api_client": coordinator.api_client,
                        "coordinator": coordinator,
                    }
                )

    preferred = _get_preferred_coordinator(hass)
    if preferred:
        if not routes["consumption"] and getattr(preferred, "consumption_meter", ""):
            routes["consumption"].append(
                {
                    "meter_id": preferred.consumption_meter,
                    "api_client": preferred.api_client,
                    "coordinator": preferred,
                }
            )
        if not routes["production"] and getattr(preferred, "production_meter", ""):
            routes["production"].append(
                {
                    "meter_id": preferred.production_meter,
                    "api_client": preferred.api_client,
                    "coordinator": preferred,
                }
            )
        if not routes["gas"] and getattr(preferred, "has_gas", False) and getattr(preferred, "gas_meter", ""):
            routes["gas"].append(
                {
                    "meter_id": preferred.gas_meter,
                    "api_client": preferred.api_client,
                    "coordinator": preferred,
                }
            )

    return routes


def _routes_for_obis(hass: HomeAssistant, obis: str) -> list[dict[str, Any]]:
    """Return all meter routes that can serve a given OBIS code."""
    routes = _get_meter_routes(hass)
    if obis.startswith("7-"):
        return routes["gas"]
    if obis.startswith("1-1:2.") or obis.startswith("1-1:4.") or obis.startswith("1-65:2."):
        return routes["production"]
    return routes["consumption"]


def _sum_aggregated_timeseries(result: dict[str, Any]) -> float:
    """Sum a Leneda aggregatedTimeSeries payload."""
    return sum(
        item.get("value", 0) or 0
        for item in result.get("aggregatedTimeSeries", [])
        if item.get("value") is not None
    )


def _combine_cached_data(coordinators: list[Any]) -> dict[str, Any]:
    """Combine cached coordinator payloads across multiple entries."""
    combined: dict[str, Any] = {}
    for coordinator in coordinators:
        data = getattr(coordinator, "data", None) or {}
        for key, value in data.items():
            if value is None:
                continue
            if key.endswith("_peak_timestamp"):
                combined.setdefault(key, value)
                continue
            if isinstance(value, (int, float)):
                if ":" in key:
                    combined[key] = max(float(combined.get(key, 0) or 0), float(value))
                else:
                    combined[key] = float(combined.get(key, 0) or 0) + float(value)
                continue
            combined[key] = value
    return combined


def _nonzero_or_fallback(value: Any, fallback: float) -> float:
    """Prefer the live value unless it collapsed to zero while cache has data."""
    try:
        numeric = float(value or 0)
    except (TypeError, ValueError):
        return fallback
    return numeric if abs(numeric) > 1e-9 or abs(fallback) <= 1e-9 else fallback


def _build_cached_preset_data(cd: dict[str, Any], range_type: str) -> dict[str, Any] | None:
    """Build preset-range data from coordinator cache, including derived flow fields."""
    keys = PRESET_RANGE_MAPPING.get(range_type)
    if not keys:
        return None

    consumption = float(cd.get(keys["consumption"], 0) or 0)
    production = float(cd.get(keys["production"], 0) or 0)
    covered_by_production = float(cd.get(keys.get("shared_with_me"), 0) or 0) if keys.get("shared_with_me") else 0.0
    shared_with_me = covered_by_production
    solar_to_home = max(0.0, covered_by_production)
    direct_solar_to_home = solar_to_home
    remaining_consumption_key = PRESET_REMAINING_CONSUMPTION_KEYS.get(range_type)
    remaining_consumption = (
        float(cd.get(remaining_consumption_key, 0) or 0) if remaining_consumption_key else 0.0
    )
    grid_import = remaining_consumption if remaining_consumption > 0 else max(0.0, consumption - solar_to_home)
    market_export = max(0.0, production - solar_to_home)
    shared = 0.0

    return {
        "consumption": round(consumption, 4),
        "production": round(production, 4),
        "exported": round(market_export, 4),
        "self_consumed": round(solar_to_home, 4),
        "grid_import": round(grid_import, 4),
        "solar_to_home": round(solar_to_home, 4),
        "direct_solar_to_home": round(direct_solar_to_home, 4),
        "shared": round(shared, 4),
        "shared_with_me": round(shared_with_me, 4),
        "gas_energy": round(float(cd.get(keys["gas_energy"], 0) or 0), 4),
        "gas_volume": round(float(cd.get(keys["gas_volume"], 0) or 0), 4),
        "peak_power_kw": float(cd.get("1-1:1.29.0", 0) or 0),
        "exceedance_kwh": round(float(cd.get(keys["exceedance"], 0) or 0), 4) if keys.get("exceedance") else 0.0,
    }


def _merge_live_with_cached_preset(live_data: dict[str, Any], cached_data: dict[str, Any]) -> dict[str, Any]:
    """Keep live totals, but fall back to cached preset flow values when live zeros are wrong."""
    merged = dict(cached_data)
    for key in (
        "consumption",
        "production",
        "exported",
        "self_consumed",
        "grid_import",
        "solar_to_home",
        "direct_solar_to_home",
        "shared",
        "shared_with_me",
        "gas_energy",
        "gas_volume",
        "peak_power_kw",
        "exceedance_kwh",
    ):
        merged[key] = round(_nonzero_or_fallback(live_data.get(key), float(cached_data.get(key, 0) or 0)), 4)
    return merged


def _time_to_minutes(value: str) -> int:
    """Convert HH:MM to minutes since midnight."""
    try:
        hour, minute = value.split(":", 1)
        return int(hour) * 60 + int(minute)
    except (AttributeError, TypeError, ValueError):
        return 0


def _matches_day_group(dt: datetime, day_group: str) -> bool:
    """Return True when the datetime matches the configured day group."""
    if day_group == "weekdays":
        return dt.weekday() < 5
    if day_group == "weekends":
        return dt.weekday() >= 5
    return True


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


def _get_reference_power_for_dt(hass: HomeAssistant, entry: Any, dt: datetime) -> float | None:
    """Return the scheduled reference power for a timestamp, or the base reference."""
    base_ref = get_effective_reference_power(hass, entry)
    storage = hass.data.get(DOMAIN, {}).get("storage")
    if not storage:
        return base_ref

    windows = getattr(storage.billing_config, "reference_power_windows", []) or []
    for window in windows:
        if not isinstance(window, dict):
            continue
        if _matches_window(
            dt,
            window.get("day_group", "all"),
            window.get("start_time", "00:00"),
            window.get("end_time", "00:00"),
        ):
            try:
                return float(window.get("reference_power_kw"))
            except (TypeError, ValueError):
                return base_ref
    return base_ref


def _has_reference_power_windows(hass: HomeAssistant) -> bool:
    """Return True if any scheduled reference windows are configured."""
    storage = hass.data.get(DOMAIN, {}).get("storage")
    if not storage:
        return False
    windows = getattr(storage.billing_config, "reference_power_windows", []) or []
    return any(isinstance(window, dict) for window in windows)


async def _fetch_peak_and_exceedance(coordinator, start_dt: datetime, end_dt: datetime) -> dict[str, float]:
    """Compute peak power and exceedance using the active reference-power schedule."""
    peak_power_kw = 0.0
    exceedance_kwh = 0.0

    try:
        c_meter = coordinator._meter_for_obis("1-1:1.29.0")
        ts_data = await coordinator.api_client.async_get_metering_data(
            c_meter, "1-1:1.29.0", start_dt, end_dt
        )
        items = ts_data.get("items", []) if isinstance(ts_data, dict) else []

        # Solar acts like power shaving: only net house demand counts toward exceedance.
        prod_by_ts: dict[str, float] = {}
        production_routes = _get_meter_routes(coordinator.hass).get("production", [])
        if production_routes:
            import asyncio as _aio

            prod_results = await _aio.gather(*[
                route["api_client"].async_get_metering_data(
                    route["meter_id"], "1-1:2.29.0", start_dt, end_dt
                )
                for route in production_routes
            ], return_exceptions=True)

            for result in prod_results:
                if not isinstance(result, dict):
                    continue
                for item in result.get("items", []):
                    try:
                        ts = item["startedAt"]
                        prod_by_ts[ts] = prod_by_ts.get(ts, 0.0) + float(item["value"])
                    except (TypeError, ValueError, KeyError):
                        continue

        for item in items:
            try:
                consumption_kw = float(item["value"])
                solar_kw = prod_by_ts.get(item.get("startedAt", ""), 0.0)
                net_kw = max(0.0, consumption_kw - solar_kw)
                if net_kw > peak_power_kw:
                    peak_power_kw = net_kw

                started_at = item.get("startedAt")
                item_dt = datetime.fromisoformat(started_at.replace("Z", "+00:00")) if started_at else start_dt
                ref_power = _get_reference_power_for_dt(coordinator.hass, coordinator.entry, item_dt)
                if ref_power is not None and net_kw > ref_power:
                    exceedance_kwh += (net_kw - ref_power) * 0.25
            except (ValueError, TypeError, KeyError):
                continue
    except Exception:
        pass

    return {
        "peak_power_kw": round(peak_power_kw, 2),
        "exceedance_kwh": round(exceedance_kwh, 4),
    }


# ─── Data endpoints ──────────────────────────────────────────────

class LenedaDataView(HomeAssistantView):
    """Aggregated energy data for a predefined time range."""

    url = "/leneda_api/data"
    name = "api:leneda:data"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        range_type = request.query.get("range", "yesterday")
        coordinator = _get_first_coordinator(hass)

        if not coordinator or not coordinator.data:
            return self.json({"error": "no_data"}, status_code=503)

        cd = coordinator.data

        # Determine bounds using Home Assistant's time utilities
        from homeassistant.util import dt as dt_util
        now = dt_util.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        
        s, e = None, None
        if range_type == "yesterday":
            s = today_start - timedelta(days=1)
            e = today_start - timedelta(seconds=1)
        elif range_type == "this_week":
            s = today_start - timedelta(days=now.weekday())
            e = now
        elif range_type == "last_week":
            mon_this_week = today_start - timedelta(days=now.weekday())
            s = mon_this_week - timedelta(days=7)
            e = mon_this_week - timedelta(seconds=1)
        elif range_type == "this_month":
            s = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            e = now
        elif range_type == "last_month":
            first_this_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            e = first_this_month - timedelta(seconds=1)
            s = e.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        elif range_type == "this_year":
            s = now.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
            e = now
        elif range_type == "last_year":
            try:
                s = now.replace(year=now.year-1, month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
                e = now.replace(year=now.year-1, month=12, day=31, hour=23, minute=59, second=59, microsecond=0)
            except ValueError: # Leap year edge case
                s = (now - timedelta(days=366)).replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
                e = s.replace(month=12, day=31, hour=23, minute=59, second=59, microsecond=0)

        # Initialize response
        response = {
            "range": range_type,
            "metering_point": coordinator.metering_point_id,
            "start": s.isoformat() if s else None,
            "end": e.isoformat() if e else None,
        }

        if range_type in PRESET_RANGE_MAPPING:
            cached_data = _build_cached_preset_data(cd, range_type)
            if not cached_data:
                return self.json({"error": f"Unsupported range: {range_type}"}, status_code=400)
            response.update(cached_data)
        elif range_type in ("this_year", "last_year"):
            try:
                live_data = await _fetch_live_aggregated_data(hass, s, e)
                response.update(live_data)
            except Exception as exc:
                _LOGGER.error("Error fetching live aggregated data for %s: %s", range_type, exc)
                return self.json({"error": str(exc)}, status_code=500)
        else:
            # Fallback for unknown ranges (should not happen with standard UI)
            return self.json({"error": f"Unsupported range: {range_type}"}, status_code=400)

        return self.json(response)


class LenedaCustomDataView(HomeAssistantView):
    """Aggregated data for a custom date range."""

    url = "/leneda_api/data/custom"
    name = "api:leneda:data:custom"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        obis = request.query.get("obis", "1-1:1.29.0")
        start_str = request.query.get("start")
        end_str = request.query.get("end")

        if not start_str or not end_str:
            return self.json({"error": "Missing start or end"}, status_code=400)

        try:
            start_dt = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
            end_dt = datetime.fromisoformat(end_str.replace("Z", "+00:00"))
        except ValueError:
            return self.json({"error": "Invalid date format"}, status_code=400)

        coordinator = _get_preferred_coordinator(hass, "consumption") or _get_first_coordinator(hass)
        routes = _routes_for_obis(hass, obis)
        if not coordinator or not routes:
            return self.json({"error": "no_data"}, status_code=503)

        try:
            live_data = await _fetch_live_aggregated_data(hass, start_dt, end_dt)
            response = {
                "start": start_str,
                "end": end_str,
                **live_data
            }
            return self.json(response)
        except Exception as exc:
            _LOGGER.error("Error fetching custom range data: %s", exc)
            return self.json({"error": str(exc)}, status_code=500)

async def _fetch_live_aggregated_data(hass: HomeAssistant, start_dt, end_dt):
    """Fetch and sum aggregated data for any arbitrary date range."""
    import asyncio as _aio

    # Use Month aggregation for ranges longer than 35 days to avoid Infinite issues
    agg_level = "Infinite"
    if (end_dt - start_dt).days > 35:
        agg_level = "Month"

    async def _fetch_sum(routes: list[dict[str, Any]], obis: str) -> float:
        if not routes:
            return 0.0
        results = await _aio.gather(*[
            route["api_client"].async_get_aggregated_metering_data(
                route["meter_id"], obis, start_dt, end_dt, agg_level
            )
            for route in routes
        ], return_exceptions=True)
        total = 0.0
        for result in results:
            if isinstance(result, dict):
                total += _sum_aggregated_timeseries(result)
            elif isinstance(result, Exception):
                _LOGGER.error("Error fetching aggregated data for %s: %s", obis, result)
        return total

    consumption_routes = _get_meter_routes(hass)["consumption"]
    production_routes = _get_meter_routes(hass)["production"]
    gas_routes = _get_meter_routes(hass)["gas"]

    # Shared layers (1-4)
    SHARING_LAYERS = ["1", "2", "3", "4"]

    c_val = await _fetch_sum(consumption_routes, "1-1:1.29.0")
    p_val = await _fetch_sum(production_routes, "1-1:2.29.0")
    grid_import_val = await _fetch_sum(consumption_routes, "1-65:1.29.9")
    gas_energy = await _fetch_sum(gas_routes, "7-20:99.33.17")
    gas_volume = await _fetch_sum(gas_routes, "7-1:99.23.15")

    swm_val = 0.0
    for layer in SHARING_LAYERS:
        swm_val += await _fetch_sum(consumption_routes, f"1-65:1.29.{layer}")

    solar_to_home = max(0.0, swm_val)
    direct_solar_to_home = solar_to_home
    billed_grid_import = grid_import_val if grid_import_val > 0 else max(0, c_val - solar_to_home)
    market_export = max(0.0, p_val - solar_to_home)

    peak_coordinator = _get_preferred_coordinator(hass, "consumption") or _get_first_coordinator(hass)
    peak_exceedance = await _fetch_peak_and_exceedance(peak_coordinator, start_dt, end_dt) if peak_coordinator else {
        "peak_power_kw": 0.0,
        "exceedance_kwh": 0.0,
    }

    return {
        "consumption": round(c_val, 4),
        "production": round(p_val, 4),
        "exported": round(market_export, 4),
        "self_consumed": round(solar_to_home, 4),
        "grid_import": round(billed_grid_import, 4),
        "solar_to_home": round(solar_to_home, 4),
        "direct_solar_to_home": round(direct_solar_to_home, 4),
        "shared": 0.0,
        "shared_with_me": round(swm_val, 4),
        "gas_energy": round(gas_energy, 4),
        "gas_volume": round(gas_volume, 4),
        **peak_exceedance,
    }


class LenedaTimeseriesView(HomeAssistantView):
    """Raw 15-min timeseries data for charts."""

    url = "/leneda_api/data/timeseries"
    name = "api:leneda:data:timeseries"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        obis = request.query.get("obis", "1-1:1.29.0")
        start_str = request.query.get("start")
        end_str = request.query.get("end")
        routes = _routes_for_obis(hass, obis)

        coordinator = _get_first_coordinator(hass)
        if not coordinator or not routes:
            return self.json({"error": "no_data"}, status_code=503)

        # Default: yesterday
        from homeassistant.util import dt as dt_util
        import asyncio as _aio

        now = dt_util.utcnow()
        if start_str and end_str:
            try:
                start_dt = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
                end_dt = datetime.fromisoformat(end_str.replace("Z", "+00:00"))
            except ValueError:
                return self.json({"error": "Invalid date format"}, status_code=400)
        else:
            start_dt = now.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)
            end_dt = start_dt.replace(hour=23, minute=59, second=59)

        if end_dt < start_dt:
            return self.json({"error": "Invalid date range"}, status_code=400)

        try:
            all_results = await _aio.gather(*[
                route["api_client"].async_get_metering_data(route["meter_id"], obis, start_dt, end_dt)
                for route in routes
            ], return_exceptions=True)

            merged: dict[str, float] = {}
            unit = "kW"
            interval = "PT15M"
            for result in all_results:
                if isinstance(result, dict):
                    unit = result.get("unit", unit) or unit
                    interval = result.get("intervalLength", interval) or interval
                    for item in result.get("items", []):
                        ts = item.get("startedAt", "")
                        merged[ts] = merged.get(ts, 0) + (item.get("value", 0) or 0)
                elif isinstance(result, Exception):
                    _LOGGER.error("Error fetching timeseries for %s: %s", obis, result)

            items = [{"value": v, "startedAt": k, "type": "measured", "version": 1, "calculated": False}
                     for k, v in sorted(merged.items())]
            return self.json({
                "obis": obis,
                "unit": unit,
                "interval": interval,
                "items": items,
            })
        except Exception as e:
            _LOGGER.error("Error fetching timeseries: %s", e)
            return self.json({"error": str(e)}, status_code=500)


class LenedaPerMeterTimeseriesView(HomeAssistantView):
    """Per-meter 15-min production timeseries for stacked chart visualisation."""

    url = "/leneda_api/data/timeseries/per-meter"
    name = "api:leneda:data:timeseries:per_meter"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        obis = request.query.get("obis", "1-1:2.29.0")
        start_str = request.query.get("start")
        end_str = request.query.get("end")

        coordinator = _get_preferred_coordinator(hass, "production") or _get_first_coordinator(hass)
        routes = _get_meter_routes(hass)["production"]
        if not coordinator or not routes:
            return self.json({"error": "no_data"}, status_code=503)

        from homeassistant.util import dt as dt_util
        import asyncio as _aio

        now = dt_util.utcnow()
        if start_str and end_str:
            try:
                start_dt = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
                end_dt = datetime.fromisoformat(end_str.replace("Z", "+00:00"))
            except ValueError:
                return self.json({"error": "Invalid date format"}, status_code=400)
        else:
            start_dt = now.replace(hour=0, minute=0, second=0, microsecond=0) - timedelta(days=1)
            end_dt = start_dt.replace(hour=23, minute=59, second=59)

        try:
            all_results = await _aio.gather(*[
                route["api_client"].async_get_metering_data(route["meter_id"], obis, start_dt, end_dt)
                for route in routes
            ], return_exceptions=True)

            meters_data = []
            for route, result in zip(routes, all_results):
                mid = route["meter_id"]
                if isinstance(result, dict):
                    meters_data.append({
                        "meter_id": mid,
                        "unit": result.get("unit", "kW"),
                        "interval": result.get("intervalLength", "PT15M"),
                        "items": result.get("items", []),
                    })
                elif isinstance(result, Exception):
                    _LOGGER.error("Error fetching per-meter timeseries for %s: %s", mid, result)
                    meters_data.append({"meter_id": mid, "unit": "kW", "interval": "PT15M", "items": []})

            return self.json({"obis": obis, "meters": meters_data})
        except Exception as e:
            _LOGGER.error("Error fetching per-meter timeseries: %s", e)
            return self.json({"error": str(e)}, status_code=500)


# ─── Sensor overview ─────────────────────────────────────────────

class LenedaSensorsView(HomeAssistantView):
    """All current sensor values + metadata."""

    url = "/leneda_api/sensors"
    name = "api:leneda:sensors"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        coordinator = _get_preferred_coordinator(hass, "consumption") or _get_first_coordinator(hass)
        coordinators = _get_coordinators(hass)

        if not coordinator or not coordinators or not any(getattr(c, "data", None) for c in coordinators):
            return self.json({"sensors": []})

        data = _combine_cached_data(coordinators)
        sensors = []
        for key, value in data.items():
            if key.endswith("_peak_timestamp"):
                continue
            meta = OBIS_CODES.get(key, {})
            sensors.append({
                "key": key,
                "value": value,
                "name": meta.get("name", key),
                "unit": meta.get("unit", "kWh"),
                "peak_timestamp": data.get(f"{key}_peak_timestamp"),
            })

        return self.json({
            "sensors": sensors,
            "metering_point": coordinator.metering_point_id if len(coordinators) == 1 else "multiple",
        })


# ─── Config endpoints ────────────────────────────────────────────

class LenedaConfigView(HomeAssistantView):
    """Get/set billing configuration."""

    url = "/leneda_api/config"
    name = "api:leneda:config"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        storage = hass.data.get(DOMAIN, {}).get("storage")
        if not storage:
            return self.json({})

        config_dict = storage.billing_config.to_dict()
        entry = None

        # Merge HA entry credentials (read-only) so the dashboard knows the meter config
        entries = hass.config_entries.async_entries(DOMAIN)
        if entries:
            entry = entries[0]
            meters: list[dict[str, Any]] = []
            seen: set[str] = set()
            all_types: list[str] = []
            for current_entry in entries:
                for meter in _iter_entry_meters(current_entry):
                    meter_id = meter["id"]
                    if meter_id in seen:
                        continue
                    seen.add(meter_id)
                    meters.append(meter)
                    all_types.extend(meter.get("types", []))
            config_dict["meters"] = meters
            config_dict["ha_meter_id"] = meters[0]["id"] if meters else ""  # backward compat
            # Derive meter_has_gas from type config
            config_dict["meter_has_gas"] = "gas" in all_types or any(
                current_entry.data.get(CONF_METER_HAS_GAS, False) for current_entry in entries
            )

        effective_reference_power = get_effective_reference_power(hass, entry)
        if effective_reference_power is not None:
            config_dict["reference_power_kw"] = effective_reference_power

        # Resolve feed-in sensor values for each per-meter rate entry
        feed_in_rates = config_dict.get("feed_in_rates", [])
        if isinstance(feed_in_rates, list):
            for rate_entry in feed_in_rates:
                if not isinstance(rate_entry, dict):
                    continue
                if rate_entry.get("mode") == "sensor":
                    entity_id = rate_entry.get("sensor_entity", "")
                    if entity_id:
                        state = hass.states.get(entity_id)
                        if state and state.state not in ("unknown", "unavailable"):
                            try:
                                rate_entry["sensor_value"] = float(state.state)
                            except (ValueError, TypeError):
                                rate_entry["sensor_value"] = None
                        else:
                            rate_entry["sensor_value"] = None
                    else:
                        rate_entry["sensor_value"] = None
            config_dict["feed_in_rates"] = feed_in_rates

        return self.json(config_dict)

    async def post(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        storage = hass.data.get(DOMAIN, {}).get("storage")
        if not storage:
            return self.json({"error": "Storage not initialized"}, status_code=500)

        try:
            data = await request.json()
            config = BillingConfig.from_dict(data)
            storage.billing_config = config
            await storage.async_save()
            return self.json({"status": "ok"})
        except Exception as e:
            _LOGGER.error("Error updating config: %s", e)
            return self.json({"error": str(e)}, status_code=400)


class LenedaConfigResetView(HomeAssistantView):
    """Reset billing config to defaults."""

    url = "/leneda_api/config/reset"
    name = "api:leneda:config:reset"
    requires_auth = True

    async def post(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        storage = hass.data.get(DOMAIN, {}).get("storage")
        if not storage:
            return self.json({"error": "Storage not initialized"}, status_code=500)

        storage.billing_config = BillingConfig()
        await storage.async_save()
        return self.json({"status": "ok"})


class LenedaHAEntitiesView(HomeAssistantView):
    """List HA sensor entities for the feed-in sensor picker.

    Returns only sensor.* entities with a numeric state and a unit
    that suggests an energy price (EUR/kWh, ct/kWh, etc.).
    Falls back to all sensor entities if no price sensors are found.
    """

    url = "/leneda_api/ha-entities"
    name = "api:leneda:ha-entities"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass: HomeAssistant = request.app["hass"]
        price_keywords = {"eur/kwh", "ct/kwh", "€/kwh", "eur/mwh", "ct/mwh"}
        all_sensors: list[str] = []
        price_sensors: list[str] = []

        for entity_id, state in hass.states.async_all("sensor"):
            all_sensors.append(entity_id.entity_id)
            unit = (state.attributes.get("unit_of_measurement") or "").lower()
            if unit in price_keywords or "price" in entity_id.entity_id or "tariff" in entity_id.entity_id or "cost" in entity_id.entity_id:
                price_sensors.append(entity_id.entity_id)

        # Return price-related sensors first; if none found, return all sensors
        entities = price_sensors if price_sensors else all_sensors
        entities.sort()
        return self.json({"entities": entities})


# ─── Registration helper ─────────────────────────────────────────

def async_register_api_views(hass: HomeAssistant) -> None:
    """Register all REST API views."""
    views = [
        LenedaModeView(),
        LenedaDataView(),
        LenedaCustomDataView(),
        LenedaTimeseriesView(),
        LenedaPerMeterTimeseriesView(),
        LenedaSensorsView(),
        LenedaConfigView(),
        LenedaConfigResetView(),
        LenedaHAEntitiesView(),
    ]
    for view in views:
        hass.http.register_view(view)
    _LOGGER.info("Registered %d Leneda API views", len(views))
