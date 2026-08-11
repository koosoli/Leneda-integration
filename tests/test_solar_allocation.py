"""Tests for per-PV-system self-use allocation in financials.py.

Mirrors frontend-src/tests/solarAllocation.test.ts so the Python and
TypeScript allocators cannot drift apart. financials.py is loaded by file path
with stub sibling modules so the tests run without Home Assistant installed.
"""
from __future__ import annotations

import importlib.util
import sys
import types
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPONENT_DIR = REPO_ROOT / "custom_components" / "leneda"
TOL = 1e-9

METER_A = "LU-A"
METER_B = "LU-B"
TS = "2026-01-15T11:00:00Z"


def _load_financials():
    """Load financials.py with stubs for its Home Assistant-dependent siblings."""
    package_name = "leneda_fin_pkg"
    pkg = types.ModuleType(package_name)
    pkg.__path__ = [str(COMPONENT_DIR)]
    sys.modules[package_name] = pkg

    const_stub = types.ModuleType(f"{package_name}.const")
    const_stub.DOMAIN = "leneda"
    sys.modules[f"{package_name}.const"] = const_stub

    storage_stub = types.ModuleType(f"{package_name}.storage")
    storage_stub.get_effective_reference_power = lambda *args, **kwargs: 0.0
    sys.modules[f"{package_name}.storage"] = storage_stub

    for name in ("billing_adjustments", "models"):
        spec = importlib.util.spec_from_file_location(
            f"{package_name}.{name}", COMPONENT_DIR / f"{name}.py"
        )
        module = importlib.util.module_from_spec(spec)
        sys.modules[f"{package_name}.{name}"] = module
        spec.loader.exec_module(module)

    spec = importlib.util.spec_from_file_location(
        f"{package_name}.financials", COMPONENT_DIR / "financials.py"
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules[f"{package_name}.financials"] = module
    spec.loader.exec_module(module)
    return module


financials = _load_financials()
models = sys.modules["leneda_fin_pkg.models"]

# One 15-minute interval: 4 kW house load, 4 kW from A, 12 kW from B.
CONSUMPTION = [{"startedAt": TS, "value": 4}]
PRODUCTION = {
    METER_A: [{"startedAt": TS, "value": 4}],
    METER_B: [{"startedAt": TS, "value": 12}],
}


def _rates(priority_a, priority_b) -> list[dict]:
    return [
        {"meter_id": METER_A, "rate": 0.10, "self_use_priority": priority_a, "original_order": 1},
        {"meter_id": METER_B, "rate": 0.20, "self_use_priority": priority_b, "original_order": 2},
    ]


def _sorted_rates(priority_a, priority_b) -> list[dict]:
    """Apply the same ordering the resolver applies before allocating."""
    resolved = _rates(priority_a, priority_b)
    resolved.sort(
        key=lambda item: (
            item["self_use_priority"] is None,
            item["self_use_priority"] or 0,
            item["original_order"],
        )
    )
    return resolved


def _engine(priority_a, priority_b) -> dict:
    """Run the real engine entry point with no official-total rescaling."""
    return financials._allocate_priority_solar(
        CONSUMPTION,
        PRODUCTION,
        _sorted_rates(priority_a, priority_b),
        0.0,
        0.0,
    )


def _allocate_totals(priority_a, priority_b) -> dict[str, dict[str, float]]:
    """Per-meter kWh totals as produced by the engine."""
    return _engine(priority_a, priority_b)["per_meter"]


class TestTierAllocation:
    def test_strict_priority_order(self):
        totals = _allocate_totals(1, 2)
        assert totals[METER_A]["self_consumed_kwh"] == pytest.approx(1.0, abs=TOL)
        assert totals[METER_A]["exported_kwh"] == pytest.approx(0.0, abs=TOL)
        assert totals[METER_B]["self_consumed_kwh"] == pytest.approx(0.0, abs=TOL)
        assert totals[METER_B]["exported_kwh"] == pytest.approx(3.0, abs=TOL)

    def test_configured_order_wins(self):
        totals = _allocate_totals(2, 1)
        assert totals[METER_B]["self_consumed_kwh"] == pytest.approx(1.0, abs=TOL)
        assert totals[METER_A]["self_consumed_kwh"] == pytest.approx(0.0, abs=TOL)

    def test_prorata_when_no_priority(self):
        totals = _allocate_totals(None, None)
        # 4 kW self-used, shared 4:12 → A 1 kW, B 3 kW (×0.25 h)
        assert totals[METER_A]["self_consumed_kwh"] == pytest.approx(0.25, abs=TOL)
        assert totals[METER_A]["exported_kwh"] == pytest.approx(0.75, abs=TOL)
        assert totals[METER_B]["self_consumed_kwh"] == pytest.approx(0.75, abs=TOL)
        assert totals[METER_B]["exported_kwh"] == pytest.approx(2.25, abs=TOL)

    def test_shared_priority_splits_prorata(self):
        totals = _allocate_totals(1, 1)
        assert totals[METER_A]["self_consumed_kwh"] == pytest.approx(0.25, abs=TOL)
        assert totals[METER_B]["self_consumed_kwh"] == pytest.approx(0.75, abs=TOL)

    def test_prioritised_served_before_unprioritised(self):
        totals = _allocate_totals(None, 1)
        assert totals[METER_B]["self_consumed_kwh"] == pytest.approx(1.0, abs=TOL)
        assert totals[METER_A]["self_consumed_kwh"] == pytest.approx(0.0, abs=TOL)
        assert totals[METER_A]["exported_kwh"] == pytest.approx(1.0, abs=TOL)

    @pytest.mark.parametrize("priorities", [(1, 2), (None, None), (None, 1), (1, 1)])
    def test_energy_is_conserved(self, priorities):
        totals = _allocate_totals(*priorities)
        produced = sum(item["produced_kwh"] for item in totals.values())
        allocated = sum(
            item["self_consumed_kwh"] + item["exported_kwh"] for item in totals.values()
        )
        assert produced == pytest.approx(4.0, abs=TOL)
        assert allocated == pytest.approx(produced, abs=TOL)


class TestEngineRevenue:
    def test_prorata_uses_each_systems_own_tariff(self):
        result = _engine(None, None)
        # A: 0.75 kWh × 0.10 + B: 2.25 kWh × 0.20
        assert result["total_feed_in_revenue"] == pytest.approx(0.075 + 0.45, abs=TOL)
        assert result["allocation_mode"] == "prorata"

    def test_priority_mode_reported(self):
        assert _engine(1, 2)["allocation_mode"] == "priority"

    def test_mixed_mode_reported(self):
        assert _engine(None, 1)["allocation_mode"] == "mixed"
        assert _engine(1, 1)["allocation_mode"] == "mixed"


class TestConfigMigration:
    def test_blank_priority_is_preserved_as_none(self):
        config = models.BillingConfig.from_dict(
            {
                "feed_in_rates": [
                    {"meter_id": METER_A, "mode": "fixed", "tariff": 0.1},
                    {"meter_id": METER_B, "mode": "fixed", "tariff": 0.2, "self_use_priority": ""},
                ]
            }
        )
        assert [r["self_use_priority"] for r in config.feed_in_rates] == [None, None]

    def test_explicit_priority_is_kept(self):
        config = models.BillingConfig.from_dict(
            {
                "feed_in_rates": [
                    {"meter_id": METER_A, "mode": "fixed", "tariff": 0.1, "self_use_priority": 2},
                    {"meter_id": METER_B, "mode": "fixed", "tariff": 0.2, "self_use_priority": "1"},
                ]
            }
        )
        assert [r["self_use_priority"] for r in config.feed_in_rates] == [2, 1]
