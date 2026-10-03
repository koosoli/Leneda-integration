"""Hourly electricity statistics for the HA Energy dashboard (issues #92/#94).

Period sensors (yesterday / current month, ...) update once per day, so the
native Energy dashboard renders a full day as a single hourly spike. The Leneda
API already exposes real hourly resolution via the aggregated endpoint
(``aggregation_level="Hour"``), so we mirror those hours into Home Assistant
long-term statistics with ``async_add_external_statistics``.

Design notes:
- One external statistic per consumption meter:
  ``leneda:<sanitised_meter_id>_hourly_consumption`` (source ``leneda``).
- ``state`` is that hour's consumption, ``sum`` is the cumulative total HA
  needs for energy accounting. The live entity state class is untouched.
- Backfill defaults to 31 days on first setup; later refreshes import only
  missing *completed* hours (the hour containing ``now`` is skipped).
- All Home Assistant recorder imports are lazy so unit tests and installs
  without recorder keep working; failures are logged, never raised.
- Existing daily/weekly/monthly sensors are unchanged.
"""
from __future__ import annotations

import logging
import re
from datetime import datetime, timedelta
from typing import Any

_LOGGER = logging.getLogger(__name__)

DOMAIN_SOURCE = "leneda"
CONSUMPTION_OBIS = "1-1:1.29.0"
DEFAULT_BACKFILL_DAYS = 31

_SANITIZE_RE = re.compile(r"[^a-z0-9_]")


def hourly_statistic_id(meter_id: str) -> str:
    """Return the stable external statistic id for a consumption meter."""
    cleaned = _SANITIZE_RE.sub("_", (meter_id or "").strip().lower())
    cleaned = cleaned.strip("_") or "meter"
    return f"{DOMAIN_SOURCE}:{cleaned}_hourly_consumption"


def hourly_statistic_metadata(meter_id: str, name: str | None = None) -> dict[str, Any]:
    """Return StatisticMetaData for hourly consumption."""
    return {
        "source": DOMAIN_SOURCE,
        "statistic_id": hourly_statistic_id(meter_id),
        "unit_of_measurement": "kWh",
        "has_mean": False,
        "has_sum": True,
        "name": name or f"Leneda hourly consumption (...{(meter_id or '')[-7:]})",
    }


def _parse_dt(value: Any) -> datetime | None:
    """Parse a Leneda timestamp into an aware datetime, or None."""
    if not isinstance(value, str) or not value:
        return None
    try:
        text = value.strip()
        if text.endswith("Z"):
            text = text[:-1] + "+00:00"
        return datetime.fromisoformat(text)
    except (ValueError, TypeError):
        return None


def _floor_to_hour(value: datetime) -> datetime:
    """Floor an aware datetime to the hour boundary."""
    return value.replace(minute=0, second=0, microsecond=0)


def extract_hourly_values(payload: dict[str, Any]) -> list[tuple[datetime, float]]:
    """Extract (start, kWh) pairs from an aggregated Hour payload.

    Accepts both ``aggregatedTimeSeries`` (aggregated endpoint) and ``items``
    (raw time-series endpoint). Timestamp keys tried in order:
    ``startedAt``, ``start``, ``startDateTime``, ``timestamp``.
    Entries without a parseable timestamp or numeric value are skipped.
    """
    if not isinstance(payload, dict):
        return []
    series = payload.get("aggregatedTimeSeries")
    if not isinstance(series, list):
        series = payload.get("items")
    if not isinstance(series, list):
        return []

    values: list[tuple[datetime, float]] = []
    for entry in series:
        if not isinstance(entry, dict):
            continue
        raw_ts = (
            entry.get("startedAt")
            or entry.get("start")
            or entry.get("startDateTime")
            or entry.get("timestamp")
        )
        start = _parse_dt(raw_ts)
        if start is None:
            continue
        if start.tzinfo is None:
            # Leneda timestamps are UTC; assume UTC when naive.
            from datetime import timezone

            start = start.replace(tzinfo=timezone.utc)
        try:
            kwh = float(entry.get("value", 0) or 0)
        except (TypeError, ValueError):
            continue
        if kwh < 0:
            # Defensive: consumption cannot be negative; clamp small noise.
            kwh = 0.0
        values.append((_floor_to_hour(start), round(kwh, 6)))
    values.sort(key=lambda item: item[0])
    return values


def build_hourly_statistics(
    hourly_values: list[tuple[datetime, float]],
    start_sum: float = 0.0,
    *,
    exclude_after: datetime | None = None,
) -> list[dict[str, Any]]:
    """Build StatisticData entries with a running cumulative ``sum``.

    - ``hourly_values`` may be unsorted; output is sorted by hour.
    - Hours at/after ``exclude_after`` (floored to the hour) are skipped so
      the currently incomplete hour is never imported.
    - Duplicate hours keep the last value (Leneda corrections overwrite).
    """
    merged: dict[datetime, float] = {}
    for start, kwh in hourly_values:
        merged[_floor_to_hour(start)] = kwh
    ordered = sorted(merged.items())

    cutoff: datetime | None = None
    if exclude_after is not None:
        cutoff = _floor_to_hour(exclude_after)

    running = float(start_sum or 0.0)
    statistics: list[dict[str, Any]] = []
    for start, kwh in ordered:
        if cutoff is not None and start >= cutoff:
            continue
        running += float(kwh)
        statistics.append({"start": start, "state": float(kwh), "sum": round(running, 6)})
    return statistics


async def _get_previous_sum(hass: Any, statistic_id: str) -> tuple[datetime | None, float]:
    """Return (latest start, cumulative sum) from recorder, or (None, 0.0)."""
    try:
        from homeassistant.components.recorder.statistics import get_last_statistics
    except Exception as err:  # recorder not installed / import path changed
        _LOGGER.debug("Leneda statistics: recorder unavailable (%s)", err)
        return None, 0.0
    try:
        last = await hass.async_add_executor_job(
            get_last_statistics, hass, 1, statistic_id, True
        )
    except Exception as err:
        _LOGGER.debug("Leneda statistics: get_last_statistics failed (%s)", err)
        return None, 0.0
    try:
        rows = (last or {}).get(statistic_id)
        if not rows:
            return None, 0.0
        latest = rows[-1]
        prev_sum = float(latest.get("sum") or 0.0)
        # get_last_statistics returns epoch seconds for start/end.
        raw_start = latest.get("start")
        latest_start: datetime | None = None
        if isinstance(raw_start, (int, float)):
            from datetime import timezone as _tz

            latest_start = datetime.fromtimestamp(float(raw_start), tz=_tz.utc).astimezone()
        elif isinstance(raw_start, str):
            latest_start = _parse_dt(raw_start)
        elif isinstance(raw_start, datetime):
            latest_start = raw_start
        return latest_start, prev_sum
    except Exception as err:
        _LOGGER.debug("Leneda statistics: could not read previous sum (%s)", err)
        return None, 0.0


async def async_import_hourly_consumption(
    hass: Any,
    api_client: Any,
    meter_id: str,
    *,
    backfill_days: int = DEFAULT_BACKFILL_DAYS,
    now: datetime | None = None,
) -> int:
    """Fetch hourly consumption and mirror it into HA external statistics.

    Returns the number of hourly rows imported (0 when recorder is missing,
    nothing is new, or the fetch fails). Never raises: errors are logged.
    """
    try:
        from homeassistant.components.recorder.statistics import async_add_external_statistics
    except Exception as err:
        _LOGGER.debug("Leneda statistics: recorder unavailable, skipping import (%s)", err)
        return 0

    try:
        from homeassistant.util import dt as dt_util

        current = now or dt_util.utcnow()
        if current.tzinfo is None:
            from datetime import timezone as _tz

            current = current.replace(tzinfo=_tz.utc)
    except Exception:
        from datetime import timezone as _tz

        current = now or datetime.now(tz=_tz.utc)

    statistic_id = hourly_statistic_id(meter_id)
    latest_start, prev_sum = await _get_previous_sum(hass, statistic_id)

    if latest_start is not None:
        fetch_start = _floor_to_hour(latest_start) + timedelta(hours=1)
    else:
        fetch_start = _floor_to_hour(current) - timedelta(days=max(1, int(backfill_days or DEFAULT_BACKFILL_DAYS)))
    fetch_end = current

    if fetch_end <= fetch_start:
        return 0

    try:
        payload = await api_client.async_get_aggregated_metering_data(
            meter_id, CONSUMPTION_OBIS, fetch_start, fetch_end, "Hour"
        )
    except Exception as err:
        _LOGGER.debug("Leneda statistics: hourly fetch failed for %s (%s)", meter_id, err)
        return 0

    hourly_values = extract_hourly_values(payload if isinstance(payload, dict) else {})
    if not hourly_values:
        return 0

    statistics = build_hourly_statistics(hourly_values, start_sum=prev_sum, exclude_after=current)
    if not statistics:
        return 0

    # Skip hours already stored (incremental refresh).
    if latest_start is not None:
        cutoff = _floor_to_hour(latest_start)
        statistics = [row for row in statistics if row["start"] > cutoff]
    if not statistics:
        return 0

    try:
        metadata = hourly_statistic_metadata(meter_id)
        async_add_external_statistics(hass, metadata, statistics)
    except Exception as err:
        _LOGGER.warning("Leneda statistics: import failed for %s (%s)", meter_id, err)
        return 0

    _LOGGER.debug(
        "Leneda statistics: imported %d hourly rows for %s", len(statistics), statistic_id
    )
    return len(statistics)


async def async_setup_hourly_statistics(hass: Any, coordinator: Any) -> None:
    """Backfill once, then keep external statistics current on refreshes."""
    meter_id = getattr(coordinator, "consumption_meter", "") or getattr(
        coordinator, "metering_point_id", ""
    )
    if not meter_id:
        return

    await async_import_hourly_consumption(hass, coordinator.api_client, meter_id)

    # Incremental updates after each successful coordinator refresh.
    listener_installed = False
    try:
        def _on_refresh() -> None:
            hass.async_create_task(
                async_import_hourly_consumption(hass, coordinator.api_client, meter_id)
            )

        coordinator.async_add_listener(_on_refresh)
        listener_installed = True
    except Exception as err:
        _LOGGER.debug("Leneda statistics: listener not installed (%s)", err)

    if not listener_installed:
        _LOGGER.debug("Leneda statistics: one-shot backfill done for %s", meter_id)
