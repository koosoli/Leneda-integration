"""Tests for hourly external statistics helpers (issues #92 part 3, #94).

Covers the pure conversion logic without a Home Assistant recorder:
- stable statistic id sanitising
- hourly payload extraction (aggregatedTimeSeries + items, Z timestamps)
- cumulative sum building, duplicate-hour overwrite, incomplete-hour exclusion
- async import: backfill window, incremental refresh, recorder-missing skip
"""
from __future__ import annotations

import importlib.util
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPONENT_DIR = REPO_ROOT / "custom_components" / "leneda"


def _load_statistics():
    spec = importlib.util.spec_from_file_location(
        "leneda_statistics_under_test", COMPONENT_DIR / "statistics.py"
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules["leneda_statistics_under_test"] = module
    spec.loader.exec_module(module)
    return module


stats = _load_statistics()


def test_statistic_id_is_stable_and_sanitised():
    assert stats.hourly_statistic_id("LU1234567890ABCDEF") == "leneda:lu1234567890abcdef_hourly_consumption"
    # Same input -> same id (PoC pattern leneda:<meter>_hourly_consumption).
    assert stats.hourly_statistic_id("LU-ABC.DEF") == stats.hourly_statistic_id("LU-ABC.DEF")
    assert ":" in stats.hourly_statistic_id("LU123")
    assert stats.hourly_statistic_id("LU-ABC.DEF").startswith("leneda:")


def test_metadata_shape_for_energy_dashboard():
    meta = stats.hourly_statistic_metadata("LU1234567890ABCDEF")
    assert meta["source"] == "leneda"
    assert meta["unit_of_measurement"] == "kWh"
    assert meta["has_sum"] is True
    assert meta["has_mean"] is False


def test_extract_hourly_values_accepts_both_payload_shapes():
    payload = {
        "aggregatedTimeSeries": [
            {"start": "2026-10-01T19:00:00Z", "value": 0.295},
            {"startedAt": "2026-10-01T20:00:00Z", "value": 0.247},
            {"startDateTime": "2026-10-01T21:00:00Z", "value": 0.256},
            {"timestamp": "2026-10-01T22:00:00Z", "value": 0.241},
            {"startedAt": "not-a-date", "value": 9.99},
            {"startedAt": "2026-10-01T23:00:00Z", "value": None},
        ]
    }
    values = stats.extract_hourly_values(payload)
    # None value -> 0.0, bad timestamp skipped.
    assert [round(v, 3) for _, v in values] == [0.295, 0.247, 0.256, 0.241, 0.0]
    assert values[0][0] == datetime(2026, 10, 1, 19, 0, tzinfo=timezone.utc)

    raw = {"items": [{"startedAt": "2026-10-01T19:00:00Z", "value": 1.5}]}
    assert len(stats.extract_hourly_values(raw)) == 1
    assert stats.extract_hourly_values({}) == []
    assert stats.extract_hourly_values({"aggregatedTimeSeries": "nope"}) == []


def test_build_statistics_cumulative_sum_and_cutoff():
    base = datetime(2026, 10, 1, 19, 0, tzinfo=timezone.utc)
    hourly = [(base + timedelta(hours=i), v) for i, v in enumerate([0.295, 0.247, 0.256])]
    rows = stats.build_hourly_statistics(hourly, start_sum=143.0)
    assert [r["state"] for r in rows] == [0.295, 0.247, 0.256]
    assert rows[-1]["sum"] == pytest.approx(143.0 + 0.295 + 0.247 + 0.256)
    # Monotonic cumulative sum for HA energy accounting.
    sums = [r["sum"] for r in rows]
    assert sums == sorted(sums)

    # Incomplete current hour is excluded.
    rows = stats.build_hourly_statistics(hourly, exclude_after=base + timedelta(hours=2, minutes=30))
    assert [r["start"] for r in rows] == [base, base + timedelta(hours=1)]

    # Duplicate hours: last value wins (Leneda corrections overwrite).
    dupes = [(base, 0.5), (base, 0.7)]
    rows = stats.build_hourly_statistics(dupes, start_sum=10.0)
    assert len(rows) == 1 and rows[0]["state"] == 0.7 and rows[0]["sum"] == pytest.approx(10.7)


@pytest.mark.asyncio
async def test_import_skips_gracefully_without_recorder(monkeypatch):
    """Missing recorder modules must not raise (unit env has no recorder deps)."""
    import builtins

    real_import = builtins.__import__

    def _blocked(name, *args, **kwargs):
        if name.startswith("homeassistant.components.recorder"):
            raise ImportError("no recorder in test env")
        return real_import(name, *args, **kwargs)

    monkeypatch.setattr(builtins, "__import__", _blocked)
    # Ensure fresh import state for the lazy import inside the function.
    for mod in [m for m in list(sys.modules) if "recorder" in m]:
        monkeypatch.delitem(sys.modules, mod, raising=False)

    hass = MagicMock()
    api = MagicMock()
    result = await stats.async_import_hourly_consumption(hass, api, "LU123")
    assert result == 0


@pytest.mark.asyncio
async def test_import_backfills_and_continues_incrementally(monkeypatch):
    """First run fetches ~31 days of Hour data; rerun fetches only new hours."""
    import types as _types

    now = datetime(2026, 10, 2, 0, 30, tzinfo=timezone.utc)
    seen_calls: list[tuple] = []

    async def _fake_hourly(meter_id, obis, start, end, level="Infinite"):
        seen_calls.append((meter_id, obis, start, end, level))
        assert obis == "1-1:1.29.0"
        assert level == "Hour"
        # Two completed hours before `now`.
        return {
            "aggregatedTimeSeries": [
                {"start": "2026-10-01T22:00:00Z", "value": 0.241},
                {"start": "2026-10-01T23:00:00Z", "value": 0.247},
            ]
        }

    api = SimpleNamespace(async_get_aggregated_metering_data=_fake_hourly)
    hass = MagicMock()
    # get_last_statistics is sync DB access; HA calls it via executor job.
    # Mirror that here without needing a real recorder.
    hass.async_add_executor_job = MagicMock(side_effect=lambda fn, *a, **k: fn(*a, **k))

    imported: list[tuple] = []
    fake_parent = _types.ModuleType("homeassistant.components.recorder")
    fake_stats_mod = _types.ModuleType("homeassistant.components.recorder.statistics")
    fake_stats_mod.async_add_external_statistics = lambda h, m, s: imported.append((m, list(s)))
    fake_stats_mod.get_last_statistics = lambda h, n, sid, conv=True, types=None: {}
    fake_parent.statistics = fake_stats_mod
    monkeypatch.setitem(sys.modules, "homeassistant.components.recorder", fake_parent)
    monkeypatch.setitem(sys.modules, "homeassistant.components.recorder.statistics", fake_stats_mod)

    n = await stats.async_import_hourly_consumption(hass, api, "LU123", now=now)
    assert n == 2
    # Backfill window starts ~31 days before the current hour.
    _, _, fetch_start, fetch_end, _ = seen_calls[0]
    assert (fetch_end - fetch_start).days >= 30
    metadata, rows = imported[0]
    assert metadata["statistic_id"] == stats.hourly_statistic_id("LU123")
    assert rows[0]["state"] == pytest.approx(0.241)
    assert rows[1]["sum"] == pytest.approx(0.241 + 0.247)

    # Second run: latest stored hour is 23:00, so fetch starts at 00:00 next day
    # and the incomplete current hour yields nothing new.
    async def _fake_empty(meter_id, obis, start, end, level="Infinite"):
        seen_calls.append((meter_id, obis, start, end, level))
        return {"aggregatedTimeSeries": []}

    api2 = SimpleNamespace(async_get_aggregated_metering_data=_fake_empty)
    fake_stats_mod.get_last_statistics = lambda h, n, sid, conv=True, types=None: {
        sid: [{"start": datetime(2026, 10, 1, 23, 0, tzinfo=timezone.utc).timestamp(), "sum": 143.341}]
    }
    n2 = await stats.async_import_hourly_consumption(hass, api2, "LU123", now=now)
    assert n2 == 0
