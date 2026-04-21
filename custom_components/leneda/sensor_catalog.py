"""Shared Leneda sensor catalog and sensor-pack defaults."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.config_entries import ConfigEntry

from .const import (
    OPT_ENABLE_ADVANCED_GAS_SENSORS,
    OPT_ENABLE_COMMUNITY_SENSORS,
    OPT_ENABLE_FINANCIAL_SENSORS,
    OPT_ENABLE_PEAK_SENSORS,
    OPT_ENABLE_WEEKLY_SENSORS,
    SENSOR_PACK_DEFAULTS,
    SENSOR_PACK_OPTIONS,
)


@dataclass(frozen=True)
class SensorDefinition:
    """Metadata for one exposed Home Assistant sensor."""

    key: str
    name: str
    sensor_type: str
    pack: str | None = None


CORE_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("c_04_yesterday_consumption", "01 - Yesterday's Consumption", "energy"),
    SensorDefinition("c_07_monthly_consumption", "04 - Current Month Consumption", "energy"),
    SensorDefinition("c_08_previous_month_consumption", "05 - Previous Month's Consumption", "energy"),
    SensorDefinition("p_04_yesterday_production", "08 - Yesterday's Production", "energy"),
    SensorDefinition("p_07_monthly_production", "11 - Current Month Production", "energy"),
    SensorDefinition("p_08_previous_month_production", "12 - Previous Month's Production", "energy"),
    SensorDefinition("p_09_yesterday_exported", "25 - Yesterday's Exported Energy", "energy"),
    SensorDefinition("p_12_yesterday_self_consumed", "26 - Yesterday's Locally Used Energy", "energy"),
    SensorDefinition("p_15_monthly_exported", "29 - Current Month's Exported Energy", "energy"),
    SensorDefinition("p_16_monthly_self_consumed", "30 - Current Month's Locally Used Energy", "energy"),
    SensorDefinition("p_11_last_month_exported", "31 - Last Month's Exported Energy", "energy"),
    SensorDefinition("p_14_last_month_self_consumed", "32 - Last Month's Locally Used Energy", "energy"),
)

WEEKLY_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("c_05_weekly_consumption", "02 - Current Week Consumption", "energy", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("c_06_last_week_consumption", "03 - Last Week's Consumption", "energy", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("p_05_weekly_production", "09 - Current Week Production", "energy", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("p_06_last_week_production", "10 - Last Week's Production", "energy", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("p_10_last_week_exported", "27 - Last Week's Exported Energy", "energy", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("p_13_last_week_self_consumed", "28 - Last Week's Locally Used Energy", "energy", OPT_ENABLE_WEEKLY_SENSORS),
)

PEAK_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("1-1:1.29.0", "06 - Yesterday's Peak Active Consumption", "obis", OPT_ENABLE_PEAK_SENSORS),
    SensorDefinition("1-1:3.29.0", "07 - Yesterday's Peak Reactive Consumption", "obis", OPT_ENABLE_PEAK_SENSORS),
    SensorDefinition("1-1:2.29.0", "13 - Yesterday's Peak Active Production", "obis", OPT_ENABLE_PEAK_SENSORS),
    SensorDefinition("1-1:4.29.0", "14 - Yesterday's Peak Reactive Production", "obis", OPT_ENABLE_PEAK_SENSORS),
)

COMMUNITY_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("1-65:1.29.1", "15 - Yesterday's Peak Consumption Covered (L1)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:1.29.3", "16 - Yesterday's Peak Consumption Covered (L2)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:1.29.2", "17 - Yesterday's Peak Consumption Covered (L3)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:1.29.4", "18 - Yesterday's Peak Consumption Covered (L4)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:1.29.9", "19 - Yesterday's Peak Remaining Consumption", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:2.29.1", "20 - Yesterday's Peak Production Shared (L1)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:2.29.3", "21 - Yesterday's Peak Production Shared (L2)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:2.29.2", "22 - Yesterday's Peak Production Shared (L3)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:2.29.4", "23 - Yesterday's Peak Production Shared (L4)", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("1-65:2.29.9", "24 - Yesterday's Peak Remaining Production", "obis", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_c_l1_last_month", "33 - Last Month's Consumption Covered (L1)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_c_l2_last_month", "34 - Last Month's Consumption Covered (L2)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_c_l3_last_month", "35 - Last Month's Consumption Covered (L3)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_c_l4_last_month", "36 - Last Month's Consumption Covered (L4)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_c_rem_last_month", "37 - Last Month's Remaining Consumption", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_p_l1_last_month", "38 - Last Month's Production Shared (L1)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_p_l2_last_month", "39 - Last Month's Production Shared (L2)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_p_l3_last_month", "40 - Last Month's Production Shared (L3)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_p_l4_last_month", "41 - Last Month's Production Shared (L4)", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
    SensorDefinition("s_p_rem_last_month", "42 - Last Month's Remaining Production", "energy", OPT_ENABLE_COMMUNITY_SENSORS),
)

GAS_CORE_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("g_10_yesterday_volume", "43 - GAS - Yesterday's Volume (m³)", "gas_volume"),
    SensorDefinition("g_13_monthly_volume", "46 - GAS - Current Month's Volume (m³)", "gas_volume"),
    SensorDefinition("g_14_last_month_volume", "47 - GAS - Last Month's Volume (m³)", "gas_volume"),
)

ADVANCED_GAS_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("g_11_weekly_volume", "44 - GAS - Current Week's Volume (m³)", "gas_volume", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("g_12_last_week_volume", "45 - GAS - Last Week's Volume (m³)", "gas_volume", OPT_ENABLE_WEEKLY_SENSORS),
    SensorDefinition("g_20_yesterday_std_volume", "48 - GAS - Yesterday's Standard Volume (Nm³)", "gas_std_volume", OPT_ENABLE_ADVANCED_GAS_SENSORS),
    SensorDefinition("g_21_weekly_std_volume", "49 - GAS - Current Week's Standard Volume (Nm³)", "gas_std_volume", OPT_ENABLE_ADVANCED_GAS_SENSORS),
    SensorDefinition("g_22_last_week_std_volume", "50 - GAS - Last Week's Standard Volume (Nm³)", "gas_std_volume", OPT_ENABLE_ADVANCED_GAS_SENSORS),
    SensorDefinition("g_23_monthly_std_volume", "51 - GAS - Current Month's Standard Volume (Nm³)", "gas_std_volume", OPT_ENABLE_ADVANCED_GAS_SENSORS),
    SensorDefinition("g_24_last_month_std_volume", "52 - GAS - Last Month's Standard Volume (Nm³)", "gas_std_volume", OPT_ENABLE_ADVANCED_GAS_SENSORS),
    SensorDefinition("7-1:99.23.15", "53 - GAS - Yesterday's Peak Consumed Volume", "obis", OPT_ENABLE_ADVANCED_GAS_SENSORS),
    SensorDefinition("7-1:99.23.17", "54 - GAS - Yesterday's Peak Consumed Standard Volume", "obis", OPT_ENABLE_ADVANCED_GAS_SENSORS),
)

REFERENCE_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("yesterdays_power_usage_over_reference", "55 - Yesterday's Power Usage Over Reference", "energy"),
    SensorDefinition("current_month_power_usage_over_reference", "56 - Current Month's Power Usage Over Reference", "energy"),
    SensorDefinition("last_month_power_usage_over_reference", "57 - Last Month's Power Usage Over Reference", "energy"),
)

FINANCIAL_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    SensorDefinition("f_yesterday_invoice_estimate", "58 - Estimated Invoice Total (Yesterday)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_current_month_invoice_estimate", "59 - Estimated Invoice Total (Current Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_last_month_invoice_estimate", "60 - Estimated Invoice Total (Last Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_yesterday_feed_in_revenue", "61 - Feed-in Revenue (Yesterday)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_current_month_feed_in_revenue", "62 - Feed-in Revenue (Current Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_last_month_feed_in_revenue", "63 - Feed-in Revenue (Last Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_yesterday_self_consumption_savings", "64 - Self-Consumption Savings (Yesterday)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_current_month_self_consumption_savings", "65 - Self-Consumption Savings (Current Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_last_month_self_consumption_savings", "66 - Self-Consumption Savings (Last Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_yesterday_total_solar_value", "67 - Total Solar Value (Yesterday)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_current_month_total_solar_value", "68 - Total Solar Value (Current Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
    SensorDefinition("f_last_month_total_solar_value", "69 - Total Solar Value (Last Month)", "financial", OPT_ENABLE_FINANCIAL_SENSORS),
)

ALL_SENSOR_DEFINITIONS: tuple[SensorDefinition, ...] = (
    CORE_SENSOR_DEFINITIONS
    + WEEKLY_SENSOR_DEFINITIONS
    + PEAK_SENSOR_DEFINITIONS
    + COMMUNITY_SENSOR_DEFINITIONS
    + GAS_CORE_SENSOR_DEFINITIONS
    + ADVANCED_GAS_SENSOR_DEFINITIONS
    + REFERENCE_SENSOR_DEFINITIONS
    + FINANCIAL_SENSOR_DEFINITIONS
)

SENSOR_DEFINITION_BY_KEY = {definition.key: definition for definition in ALL_SENSOR_DEFINITIONS}
SORTED_SENSOR_KEYS = sorted(SENSOR_DEFINITION_BY_KEY, key=len, reverse=True)


def get_sensor_definitions(has_gas: bool, has_reference: bool) -> list[SensorDefinition]:
    """Return the ordered sensor definitions for the current setup."""
    definitions = list(
        CORE_SENSOR_DEFINITIONS
        + WEEKLY_SENSOR_DEFINITIONS
        + PEAK_SENSOR_DEFINITIONS
        + COMMUNITY_SENSOR_DEFINITIONS
    )
    if has_gas:
        definitions.extend(GAS_CORE_SENSOR_DEFINITIONS)
        definitions.extend(ADVANCED_GAS_SENSOR_DEFINITIONS)
    if has_reference:
        definitions.extend(REFERENCE_SENSOR_DEFINITIONS)
    definitions.extend(FINANCIAL_SENSOR_DEFINITIONS)
    return definitions


def has_explicit_sensor_pack_preferences(options: dict) -> bool:
    """Return whether the config entry has stored sensor-pack preferences."""
    return any(key in options for key in SENSOR_PACK_OPTIONS)


def sensor_enabled_by_default(config_entry: ConfigEntry, definition: SensorDefinition) -> bool:
    """Return the entity-registry default for a sensor definition."""
    if definition.pack is None:
        return True

    options = dict(getattr(config_entry, "options", {}))
    if has_explicit_sensor_pack_preferences(options):
        return bool(options.get(definition.pack, True))

    return SENSOR_PACK_DEFAULTS.get(definition.pack, True)


def sensor_enabled_from_preferences(options: dict, definition: SensorDefinition) -> bool:
    """Return whether a sensor should be enabled for explicit saved preferences."""
    if definition.pack is None:
        return True
    return bool(options.get(definition.pack, True))


def extract_sensor_key_from_unique_id(unique_id: str) -> str | None:
    """Extract the Leneda sensor key from a generated unique_id."""
    if not unique_id.endswith("_v3"):
        return None

    base = unique_id[:-3]
    for key in SORTED_SENSOR_KEYS:
        if base.endswith(f"_{key}"):
            return key

    return None
