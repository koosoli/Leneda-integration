"""Regression tests for issue #93.

Gas API requests must not run when no gas meter is configured.

Covers:
1. Consumption-only meter: no gas API requests.
2. Explicit gas meter: gas API requests still run.
3. Legacy meter_has_gas=True: gas API requests still run.
4. Advanced gas sensor-pack disabled: does not suppress core gas fetching.
"""
from __future__ import annotations

import sys
import types
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import pytest

REPO_ROOT = Path(__file__).resolve().parents[1]
COMPONENT_DIR = REPO_ROOT / "custom_components" / "leneda"


def _load_coordinator_package():
    """Load coordinator via a stub package to avoid custom_components __init__."""
    import importlib.util

    package_name = "leneda_gas_pkg"
    if package_name in sys.modules:
        return sys.modules[f"{package_name}.coordinator"], sys.modules[f"{package_name}.const"]

    pkg = types.ModuleType(package_name)
    pkg.__path__ = [str(COMPONENT_DIR)]
    sys.modules[package_name] = pkg
    for mod_name in (
        "const",
        "billing_adjustments",
        "models",
        "storage",
        "financials",
        "api",
        "coordinator",
    ):
        spec = importlib.util.spec_from_file_location(
            f"{package_name}.{mod_name}", COMPONENT_DIR / f"{mod_name}.py"
        )
        module = importlib.util.module_from_spec(spec)
        sys.modules[f"{package_name}.{mod_name}"] = module
        spec.loader.exec_module(module)
    return sys.modules[f"{package_name}.coordinator"], sys.modules[f"{package_name}.const"]


_coordinator_mod, _const_mod = _load_coordinator_package()
LenedaDataUpdateCoordinator = _coordinator_mod.LenedaDataUpdateCoordinator
CONF_METERING_POINT_1_TYPES = _const_mod.CONF_METERING_POINT_1_TYPES
CONF_METERING_POINT_2 = _const_mod.CONF_METERING_POINT_2
CONF_METERING_POINT_2_TYPES = _const_mod.CONF_METERING_POINT_2_TYPES
CONF_METER_HAS_GAS = _const_mod.CONF_METER_HAS_GAS
OPT_ENABLE_ADVANCED_GAS_SENSORS = _const_mod.OPT_ENABLE_ADVANCED_GAS_SENSORS


def _make_entry(data: dict, options: dict | None = None):
    return SimpleNamespace(data=data, options=options or {})


def _make_hass():
    hass = MagicMock()
    hass.data = {}
    states = MagicMock()
    states.get.return_value = None
    hass.states = states
    return hass


class _RecordingApiClient:
    """Fake Leneda API client recording OBIS codes requested."""

    def __init__(self):
        self.metering_calls: list[tuple[str, str]] = []
        self.aggregated_calls: list[tuple[str, str]] = []

    async def async_get_metering_data(self, metering_point_id, obis_code, start_date, end_date):
        self.metering_calls.append((metering_point_id, obis_code))
        return {"meteringPointCode": metering_point_id, "obisCode": obis_code, "items": []}

    async def async_get_aggregated_metering_data(
        self, metering_point_id, obis_code, start_date, end_date, aggregation_level="Infinite"
    ):
        self.aggregated_calls.append((metering_point_id, obis_code))
        return {"aggregatedTimeSeries": []}


def _make_coordinator(entry_data: dict, entry_options: dict | None = None):
    hass = _make_hass()
    api = _RecordingApiClient()
    entry = _make_entry(entry_data, entry_options)
    coord = LenedaDataUpdateCoordinator(hass, api, "LU-PRIMARY", entry)
    return coord, api


def _gas_metering_calls(api: _RecordingApiClient):
    return [c for c in api.metering_calls if c[1].startswith("7-")]


@pytest.mark.asyncio
async def test_consumption_only_makes_no_gas_requests():
    coord, api = _make_coordinator(
        {"metering_point_id": "LU-PRIMARY", CONF_METERING_POINT_1_TYPES: ["consumption"]}
    )
    assert coord.has_gas is False
    await coord._async_update_data()
    assert _gas_metering_calls(api) == []
    assert all(not code.startswith("7-") for _, code in api.aggregated_calls)


@pytest.mark.asyncio
async def test_explicit_gas_meter_still_fetches_gas():
    coord, api = _make_coordinator(
        {
            "metering_point_id": "LU-PRIMARY",
            CONF_METERING_POINT_1_TYPES: ["consumption"],
            CONF_METERING_POINT_2: "LU-GAS",
            CONF_METERING_POINT_2_TYPES: ["gas"],
        }
    )
    assert coord.has_gas is True
    assert coord.gas_meter == "LU-GAS"
    await coord._async_update_data()
    gas_calls = _gas_metering_calls(api)
    # 15 detailed gas definitions (energy + volume + std volume x 5 periods)
    assert len(gas_calls) == 15
    assert all(mid == "LU-GAS" for mid, _ in gas_calls)


@pytest.mark.asyncio
async def test_legacy_meter_has_gas_still_fetches_gas():
    coord, api = _make_coordinator(
        {
            "metering_point_id": "LU-PRIMARY",
            CONF_METERING_POINT_1_TYPES: ["consumption"],
            CONF_METER_HAS_GAS: True,
        }
    )
    assert coord.has_gas is True
    await coord._async_update_data()
    assert len(_gas_metering_calls(api)) == 15


@pytest.mark.asyncio
async def test_advanced_gas_pack_disabled_does_not_suppress_core_gas():
    coord, api = _make_coordinator(
        {
            "metering_point_id": "LU-PRIMARY",
            CONF_METERING_POINT_1_TYPES: ["consumption"],
            CONF_METERING_POINT_2: "LU-GAS",
            CONF_METERING_POINT_2_TYPES: ["gas"],
        },
        entry_options={OPT_ENABLE_ADVANCED_GAS_SENSORS: False},
    )
    assert coord.has_gas is True
    await coord._async_update_data()
    # Core gas fetching is based on has_gas, not on the sensor-pack toggle.
    assert len(_gas_metering_calls(api)) == 15
