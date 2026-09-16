"""Tests for the dated billing-adjustment engine.

Loads custom_components/leneda/billing_adjustments.py directly by file path so
the tests run without a Home Assistant installation, and shares fixtures with
the TypeScript twin (frontend-src/src/utils/billingAdjustments.ts).
"""
from __future__ import annotations

import importlib.util
import json
import sys
import types
from datetime import date
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPONENT_DIR = REPO_ROOT / "custom_components" / "leneda"
FIXTURES = json.loads(
    (REPO_ROOT / "tests" / "fixtures" / "billing_adjustments.json").read_text(encoding="utf-8")
)
TOL = 1e-9


def _load_engine():
    """Load billing_adjustments.py as a standalone module."""
    spec = importlib.util.spec_from_file_location(
        "leneda_billing_adjustments", COMPONENT_DIR / "billing_adjustments.py"
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules["leneda_billing_adjustments"] = module
    spec.loader.exec_module(module)
    return module


engine = _load_engine()


def _load_models():
    """Load models.py with a stub package so its relative import resolves."""
    package_name = "leneda_test_pkg"
    if package_name not in sys.modules:
        pkg = types.ModuleType(package_name)
        pkg.__path__ = [str(COMPONENT_DIR)]
        sys.modules[package_name] = pkg
        spec = importlib.util.spec_from_file_location(
            f"{package_name}.billing_adjustments", COMPONENT_DIR / "billing_adjustments.py"
        )
        mod = importlib.util.module_from_spec(spec)
        sys.modules[f"{package_name}.billing_adjustments"] = mod
        spec.loader.exec_module(mod)
    spec = importlib.util.spec_from_file_location(
        f"{package_name}.models", COMPONENT_DIR / "models.py"
    )
    module = importlib.util.module_from_spec(spec)
    sys.modules[f"{package_name}.models"] = module
    spec.loader.exec_module(module)
    return module


def _run_engine(case_input: dict) -> dict:
    return engine.compute_billing_adjustments(
        case_input["adjustments"],
        vat_rate=case_input["vat_rate"],
        gas_vat_rate=case_input["gas_vat_rate"],
        period_start=date.fromisoformat(case_input["period_start"]),
        period_end=date.fromisoformat(case_input["period_end"]),
        consumption_items=case_input["consumption_items"],
        production_items=case_input["production_items"],
        fallback_grid_import_kwh=case_input["fallback_grid_import_kwh"],
        fallback_self_consumed_kwh=case_input["fallback_self_consumed_kwh"],
        gas_volume_m3=case_input["gas_volume_m3"],
        gas_energy_kwh=case_input["gas_energy_kwh"],
    )


def _assert_close(actual: float, expected: float, label: str) -> None:
    assert abs(float(actual) - float(expected)) <= TOL, (
        f"{label}: expected {expected}, got {actual}"
    )


def _assert_section(actual: dict, expected: dict, label: str, check_solar: bool) -> None:
    _assert_close(actual["applied_gross"], expected["applied_gross"], f"{label}.applied_gross")
    _assert_close(actual["applied_net"], expected["applied_net"], f"{label}.applied_net")
    assert bool(actual["estimated"]) == bool(expected["estimated"]), f"{label}.estimated"
    if check_solar:
        _assert_close(
            actual["solar_correction_gross"],
            expected["solar_correction_gross"],
            f"{label}.solar_correction_gross",
        )
    actual_lines = actual["lines"]
    expected_lines = expected["lines"]
    assert len(actual_lines) == len(expected_lines), f"{label}.lines length"
    for actual_line, expected_line in zip(actual_lines, expected_lines):
        line_label = f"{label}.lines[{expected_line['id']}]"
        assert actual_line["id"] == expected_line["id"], line_label
        _assert_close(actual_line["quantity"], expected_line["quantity"], f"{line_label}.quantity")
        _assert_close(
            actual_line["total_gross"], expected_line["total_gross"], f"{line_label}.total_gross"
        )
        _assert_close(
            actual_line["total_net"], expected_line["total_net"], f"{line_label}.total_net"
        )
        assert bool(actual_line["applied"]) == bool(expected_line["applied"]), line_label
        assert bool(actual_line["estimated"]) == bool(expected_line["estimated"]), line_label


@pytest.mark.parametrize("case", FIXTURES["cases"], ids=[c["name"] for c in FIXTURES["cases"]])
def test_shared_fixture(case: dict) -> None:
    """Engine output must match the shared fixture (parity with TypeScript)."""
    result = _run_engine(case["input"])
    expected = case["expected"]
    _assert_section(result["electricity"], expected["electricity"], f"{case['name']}.electricity", True)
    _assert_section(result["gas"], expected["gas"], f"{case['name']}.gas", False)
    assert bool(result["estimated"]) == bool(expected["estimated"]), f"{case['name']}.estimated"


def test_required_fixtures_present() -> None:
    """Guard against accidentally dropping coverage for the headline scenarios."""
    names = {case["name"] for case in FIXTURES["cases"]}
    assert "august_100kwh_exactly_4_eur" in names
    assert "gas_100m3_exactly_15_eur" in names
    assert "july_august_span_only_august_subsidised" in names


def test_invoice_level_gross_reduction_exact() -> None:
    """Subtracting the net adjustment before VAT reduces the gross total by exactly the aid."""
    result = _run_engine(
        next(c["input"] for c in FIXTURES["cases"] if c["name"] == "august_100kwh_exactly_4_eur")
    )
    vat_rate = 0.08
    subtotal = 100.0
    total_without = subtotal * (1 + vat_rate)
    total_with = (subtotal - result["electricity"]["applied_net"]) * (1 + vat_rate)
    _assert_close(total_without - total_with, 4.0, "invoice gross reduction")


def test_validation_rejects_bad_input() -> None:
    """Negative amounts, invalid date ranges and malformed values are rejected."""
    base = {
        "id": "x",
        "label": "X",
        "enabled": True,
        "commodity": "electricity",
        "basis": "grid_import_kwh",
        "amount_gross": 0.04,
        "start_date": "2026-08-01",
        "end_date": "2026-12-31",
        "vat_included": True,
    }
    assert engine.validate_adjustment(base) == []
    assert engine.validate_adjustment({**base, "amount_gross": -0.04})
    assert engine.validate_adjustment({**base, "amount_gross": "abc"})
    assert engine.validate_adjustment({**base, "start_date": "2026-13-01"})
    assert engine.validate_adjustment({**base, "start_date": "2026-02-30"})
    assert engine.validate_adjustment({**base, "start_date": "2026-12-31", "end_date": "2026-08-01"})
    assert engine.validate_adjustment({**base, "commodity": "water"})
    assert engine.validate_adjustment({**base, "basis": "total_consumption_kwh"})
    assert engine.validate_adjustment("not-a-dict")

    # Invalid adjustments are skipped by the engine instead of crashing it.
    result = engine.compute_billing_adjustments(
        [{**base, "amount_gross": -1}],
        vat_rate=0.08,
        gas_vat_rate=0.08,
        period_start=date(2026, 8, 1),
        period_end=date(2026, 8, 31),
        consumption_items=[{"value": 100, "startedAt": "2026-08-15T10:00:00+02:00"}],
    )
    assert result["electricity"]["lines"] == []


def test_luxembourg_date_timezone() -> None:
    """Date boundaries follow Europe/Luxembourg, not UTC."""
    assert engine.luxembourg_date("2026-12-31T23:30:00+00:00") == "2027-01-01"
    assert engine.luxembourg_date("2026-12-31T22:30:00+00:00") == "2026-12-31"
    assert engine.luxembourg_date("2026-08-01T00:00:00+02:00") == "2026-08-01"
    assert engine.luxembourg_date("garbage") is None


def test_existing_config_migration_adds_disabled_presets() -> None:
    """Stored configs without billing_adjustments migrate to disabled presets."""
    models = _load_models()
    legacy = models.BillingConfig().to_dict()
    legacy.pop("billing_adjustments", None)
    legacy["energy_variable_rate"] = 0.21  # prove existing settings survive

    migrated = models.BillingConfig.from_dict(legacy)
    assert migrated.energy_variable_rate == 0.21
    adjustments = migrated.billing_adjustments
    assert len(adjustments) == 2
    assert all(adj["enabled"] is False for adj in adjustments)
    assert {adj["preset_id"] for adj in adjustments} == {
        "lu_resilienzpak_electricity_2026",
        "lu_resilienzpak_gas_2026",
    }

    # Round-trip: once persisted, the user's choices are kept as-is.
    round_trip = models.BillingConfig.from_dict(migrated.to_dict())
    assert [adj["enabled"] for adj in round_trip.billing_adjustments] == [False, False]


def test_new_config_defaults_have_enabled_presets() -> None:
    """Fresh configurations (new installs / reset) get the presets enabled."""
    models = _load_models()
    fresh = models.BillingConfig()
    assert len(fresh.billing_adjustments) == 2
    assert all(adj["enabled"] is True for adj in fresh.billing_adjustments)


def test_normalize_adjustments_tolerates_garbage() -> None:
    """Normalization never raises on malformed stored data."""
    assert engine.normalize_adjustments(None) == []
    assert engine.normalize_adjustments("junk") == []
    normalized = engine.normalize_adjustments([{"amount_gross": "nope"}, 42, {"amount_gross": -5}])
    assert len(normalized) == 2
    assert normalized[0]["amount_gross"] == 0.0
    # Negative rates are preserved by normalization but rejected by validation,
    # so the engine skips them instead of applying a negative subsidy.
    assert normalized[1]["amount_gross"] == -5.0
    assert engine.validate_adjustment(normalized[1])


def _subsidy_preset(**overrides):
    """Build the official electricity preset with test overrides."""
    base = {
        "id": "lu-electricity-resilienzpak-2026",
        "label": "Luxembourg electricity subsidy 2026",
        "enabled": True,
        "commodity": "electricity",
        "basis": "grid_import_kwh",
        "amount_gross": 0.04,
        "start_date": "2026-08-01",
        "end_date": "2026-12-31",
        "vat_included": True,
        "preset_id": "lu_resilienzpak_electricity_2026",
    }
    return {**base, **overrides}


def test_suspends_compensation_defaults_to_official_preset() -> None:
    """Stored presets without the flag keep the official no-stacking semantics."""
    normalized = engine.normalize_adjustments([_subsidy_preset()])
    assert normalized[0]["suspends_compensation"] is True
    custom = engine.normalize_adjustments(
        [{**_subsidy_preset(), "id": "custom", "preset_id": ""}]
    )
    assert custom[0]["suspends_compensation"] is False
    explicit = engine.normalize_adjustments(
        [_subsidy_preset(suspends_compensation=False)]
    )
    assert explicit[0]["suspends_compensation"] is False


def test_suspended_quantities_follow_billed_totals() -> None:
    """Suspended kWh equal the billed totals for a fully covered period."""
    result = engine.compute_billing_adjustments(
        [_subsidy_preset()],
        vat_rate=0.08,
        gas_vat_rate=0.08,
        period_start=date(2026, 8, 1),
        period_end=date(2026, 8, 31),
        consumption_items=[
            {"value": 100, "startedAt": "2026-08-15T10:00:00+02:00"},
            {"value": 100, "startedAt": "2026-08-15T10:15:00+02:00"},
        ],
        production_items=[
            {"value": 40, "startedAt": "2026-08-15T10:00:00+02:00"},
        ],
        fallback_grid_import_kwh=45.0,
        fallback_self_consumed_kwh=10.0,
    )
    electricity = result["electricity"]
    # Interval grid sums to 40 kWh but the meter billed 45: quantities scale.
    assert electricity["lines"][0]["quantity"] == 45.0
    assert electricity["suspended_grid_kwh"] == 45.0
    assert electricity["suspended_self_kwh"] == 10.0
    # The solar correction uses the scaled self-consumption as well.
    assert electricity["solar_correction_gross"] == 10.0 * 0.04


def test_suspended_quantities_without_stacking_flag() -> None:
    """Custom adjustments never suspend the base compensation credit."""
    result = engine.compute_billing_adjustments(
        [_subsidy_preset(id="custom", preset_id="")],
        vat_rate=0.08,
        gas_vat_rate=0.08,
        period_start=date(2026, 8, 1),
        period_end=date(2026, 8, 31),
        consumption_items=[
            {"value": 100, "startedAt": "2026-08-15T10:00:00+02:00"},
        ],
        fallback_grid_import_kwh=25.0,
        fallback_self_consumed_kwh=0.0,
    )
    assert result["electricity"]["suspended_grid_kwh"] == 0.0
    assert result["electricity"]["suspended_self_kwh"] == 0.0


def test_no_suspension_when_tariff_includes_adjustment() -> None:
    """An informational adjustment changes neither the invoice nor the base
    compensation line: the configured tariff already reflects reality."""
    result = engine.compute_billing_adjustments(
        [_subsidy_preset(tariff_already_includes_adjustment=True)],
        vat_rate=0.08,
        gas_vat_rate=0.08,
        period_start=date(2026, 8, 1),
        period_end=date(2026, 8, 31),
        consumption_items=[
            {"value": 100, "startedAt": "2026-08-15T10:00:00+02:00"},
        ],
        fallback_grid_import_kwh=25.0,
        fallback_self_consumed_kwh=0.0,
    )
    electricity = result["electricity"]
    assert electricity["applied_gross"] == 0.0
    assert electricity["suspended_grid_kwh"] == 0.0
    assert electricity["suspended_self_kwh"] == 0.0
