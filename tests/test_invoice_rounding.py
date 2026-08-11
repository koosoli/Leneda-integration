"""Invoice-style cent rounding.

Suppliers price every invoice line to the cent and then add the rounded lines
up, charging VAT on that rounded subtotal. Summing raw values instead lands up
to a cent below the real bill.

The end-to-end case is the real SUDenergie "Décompte mensuel 06.2026" invoice
(281,304 kWh, 01.06.2026–30.06.2026): 73,33 EUR HTVA + 5,87 EUR TVA = 79,20 EUR.
Summed raw, the same lines give 73,327029 EUR and a 79,19 EUR total.
"""
from __future__ import annotations

import importlib.util
import sys
import types
from datetime import datetime
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPONENT_DIR = REPO_ROOT / "custom_components" / "leneda"


def _load_financials():
    """Load financials.py with stubs for its Home Assistant-dependent siblings."""
    package_name = "leneda_round_pkg"
    pkg = types.ModuleType(package_name)
    pkg.__path__ = [str(COMPONENT_DIR)]
    sys.modules[package_name] = pkg

    const_stub = types.ModuleType(f"{package_name}.const")
    const_stub.DOMAIN = "leneda"
    sys.modules[f"{package_name}.const"] = const_stub

    storage_stub = types.ModuleType(f"{package_name}.storage")
    storage_stub.get_effective_reference_power = lambda *args, **kwargs: None
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
models = sys.modules["leneda_round_pkg.models"]

# SUDenergie "mäi Stroum" tariff as printed on the June 2026 invoice.
SUDENERGIE_JUNE_2026 = {
    "energy_variable_rate": 0.1125,
    "energy_fixed_fee": 3.50,
    "domiciliation_discount": 1.00,
    "connect_discount": 0.50,
    "compensation_fund_rate": -0.0010,
    "electricity_tax_rate": 0.0010,
    "network_power_ref_rate": 19.61,
    "network_variable_rate": 0.0510,
    "exceedance_rate": 0.0765,
    "network_metering_rate": 5.72,
    "reference_power_kw": 12.0,
    "vat_rate": 0.08,
    "meter_has_gas": False,
    # The subsidy presets start 2026-08-01, after this billing period.
    "billing_adjustments": [],
    "meters": [{"id": "LU-CONSUMPTION", "types": ["consumption"]}],
}

CONSUMPTION_KWH = 281.304
EXCEEDANCE_KWH = 0.05


class _Storage:
    def __init__(self, billing_config):
        self.billing_config = billing_config


class _Hass:
    def __init__(self, billing_config):
        self.data = {"leneda": {"storage": _Storage(billing_config)}}


class _Coordinator:
    entry = None
    production_meters: list[str] = []
    meters: list[tuple[str, list[str]]] = [("LU-CONSUMPTION", ["consumption"])]


def _summary(**overrides):
    """Run the real engine over the June 2026 invoice period."""
    config = models.BillingConfig.from_dict({**SUDENERGIE_JUNE_2026, **overrides})
    data = {
        "c_08_previous_month_consumption": CONSUMPTION_KWH,
        "s_c_rem_last_month": CONSUMPTION_KWH,
        "p_08_previous_month_production": 0.0,
        "p_11_last_month_exported": 0.0,
        "p_14_last_month_self_consumed": 0.0,
        "g_05_last_month_consumption": 0.0,
        "g_14_last_month_volume": 0.0,
        "last_month_power_usage_over_reference": EXCEEDANCE_KWH,
    }
    return financials.calculate_financial_summary(
        _Hass(config),
        _Coordinator(),
        data,
        "last_month",
        datetime(2026, 6, 1),
        datetime(2026, 6, 30, 23, 59, 59),
    )


class TestRoundCents:
    @pytest.mark.parametrize(
        ("value", "expected"),
        [
            (31.64670, 31.65),
            (14.346504, 14.35),
            (-0.281304, -0.28),
            (0.003825, 0.0),
            (73.327029, 73.33),
            # Ties round away from zero, not to even, as billers do.
            (0.285, 0.29),
            (-0.285, -0.29),
            (2.675, 2.68),
        ],
    )
    def test_rounds_half_away_from_zero(self, value, expected):
        assert financials.round_cents(value) == pytest.approx(expected, abs=1e-9)

    @pytest.mark.parametrize("value", [None, float("nan"), float("inf"), "abc"])
    def test_invalid_values_are_zero(self, value):
        assert financials.round_cents(value) == 0.0


class TestSudenergieJune2026:
    """The estimate must reproduce the printed invoice to the cent."""

    def test_matches_printed_total(self):
        summary = _summary()
        # No production in this period, so electricity_total is the bill itself.
        assert summary.electricity_total == pytest.approx(79.20, abs=1e-9)
        assert summary.invoice_estimate == pytest.approx(79.20, abs=1e-9)

    def test_raw_summation_would_have_been_a_cent_low(self):
        """Guard the regression this rounding fixed (79,19 instead of 79,20)."""
        raw_lines = [
            CONSUMPTION_KWH * 0.1125,
            3.50,
            5.72,
            19.61,
            CONSUMPTION_KWH * 0.0510,
            EXCEEDANCE_KWH * 0.0765,
            CONSUMPTION_KWH * -0.0010,
            CONSUMPTION_KWH * 0.0010,
            -1.00,
            -0.50,
        ]
        raw_subtotal = sum(raw_lines)
        assert raw_subtotal == pytest.approx(73.327029, abs=1e-6)
        assert round(raw_subtotal * 1.08, 2) == 79.19
        assert _summary().electricity_total == pytest.approx(79.20, abs=1e-9)

    def test_no_gas_leaves_gas_total_at_zero(self):
        assert _summary().gas_total == pytest.approx(0.0, abs=1e-9)


class TestRoundingIsAppliedPerLine:
    def test_two_lines_each_round_up(self):
        """0.005 + 0.005 bills as 0.02 (two rounded lines), never 0.01."""
        assert financials.round_cents(0.005) * 2 == pytest.approx(0.02, abs=1e-9)
        assert financials.round_cents(0.005 + 0.005) == pytest.approx(0.01, abs=1e-9)
