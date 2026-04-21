"""Sensor platform for Leneda energy meters."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    CONF_METERING_POINT_ID,
    CONF_REFERENCE_POWER_ENTITY,
    CONF_REFERENCE_POWER_STATIC,
    DOMAIN,
    GAS_OBIS_CODES,
    OBIS_CODES,
)
from .coordinator import LenedaDataUpdateCoordinator
from .financials import get_currency
from .sensor_catalog import get_sensor_definitions, sensor_enabled_by_default

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Leneda sensors from a config entry."""
    coordinator: LenedaDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    metering_point_id = entry.data[CONF_METERING_POINT_ID]

    meter_has_gas = coordinator.has_gas
    has_reference_power = bool(
        coordinator.entry.data.get(CONF_REFERENCE_POWER_ENTITY)
    ) or coordinator.entry.data.get(CONF_REFERENCE_POWER_STATIC) is not None

    _LOGGER.debug(
        "Setting up Leneda sensors for metering point %s (gas=%s, reference=%s)",
        metering_point_id,
        meter_has_gas,
        has_reference_power,
    )

    sensor_definitions = get_sensor_definitions(meter_has_gas, has_reference_power)

    consumption_meter_id = coordinator.consumption_meter
    production_meter_id = coordinator.production_meter
    gas_meter_id = coordinator.gas_meter

    def _meter_id_for_sensor(key: str, sensor_type: str) -> str:
        """Return the correct metering point ID for a given sensor key."""
        if sensor_type == "obis":
            return coordinator._meter_for_obis(key)
        if key.startswith("c_"):
            return consumption_meter_id
        if key.startswith(("p_", "s_")):
            return production_meter_id
        if key.startswith(("g_", "7-")):
            return gas_meter_id
        if key.startswith("f_"):
            return consumption_meter_id
        if "power_usage_over_reference" in key:
            return consumption_meter_id
        return metering_point_id

    sensors: list[SensorEntity] = []
    _LOGGER.debug("Creating sensors in the following order:")
    for definition in sensor_definitions:
        key = definition.key
        name = definition.name
        sensor_type = definition.sensor_type
        meter_id = _meter_id_for_sensor(key, sensor_type)
        enabled_default = sensor_enabled_by_default(entry, definition)

        _LOGGER.debug(
            "  - Key: %s, Name: %s, Type: %s, Meter: ...%s, Enabled by default: %s",
            key,
            name,
            sensor_type,
            meter_id[-8:],
            enabled_default,
        )

        if sensor_type == "energy":
            unit = "kWh"
            device_class = SensorDeviceClass.ENERGY
            icon = "mdi:chart-bar"
            if key.startswith("g_"):
                icon = "mdi:fire"
            sensors.append(
                LenedaEnergySensor(
                    coordinator,
                    meter_id,
                    key,
                    name,
                    unit,
                    device_class,
                    icon,
                    enabled_default,
                )
            )
        elif sensor_type == "gas_volume":
            sensors.append(
                LenedaEnergySensor(
                    coordinator,
                    meter_id,
                    key,
                    name,
                    "m³",
                    SensorDeviceClass.GAS,
                    "mdi:fire",
                    enabled_default,
                )
            )
        elif sensor_type == "gas_std_volume":
            sensors.append(
                LenedaEnergySensor(
                    coordinator,
                    meter_id,
                    key,
                    name,
                    "Nm³",
                    SensorDeviceClass.GAS,
                    "mdi:fire",
                    enabled_default,
                )
            )
        elif sensor_type == "obis" and key in OBIS_CODES:
            details = OBIS_CODES[key].copy()
            details["name"] = name
            sensors.append(
                LenedaSensor(
                    coordinator,
                    meter_id,
                    key,
                    details,
                    enabled_default,
                )
            )
        elif sensor_type == "financial":
            sensors.append(
                LenedaFinancialSensor(
                    coordinator,
                    meter_id,
                    key,
                    name,
                    enabled_default,
                )
            )

    _LOGGER.debug("Adding %d entities.", len(sensors))
    async_add_entities(sensors)


class LenedaSensor(CoordinatorEntity[LenedaDataUpdateCoordinator], SensorEntity):
    """Representation of a Leneda sensor."""

    _attr_has_entity_name = True
    _attr_suggested_display_precision = 2
    _attr_entity_registry_enabled_default = True

    def __init__(
        self,
        coordinator: LenedaDataUpdateCoordinator,
        metering_point_id: str,
        obis_code: str,
        details: dict,
        enabled_default: bool,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator)
        self._obis_code = obis_code
        self._attr_name = details["name"]
        self._attr_unique_id = f"{metering_point_id}_{obis_code}_v3"
        self._attr_native_unit_of_measurement = details["unit"]
        self._attr_entity_registry_enabled_default = enabled_default

        if self._obis_code == "7-20:99.33.17":
            self._attr_device_class = SensorDeviceClass.ENERGY
            self._attr_icon = "mdi:fire"
            self._attr_state_class = SensorStateClass.TOTAL_INCREASING
        elif self._obis_code in GAS_OBIS_CODES:
            self._attr_device_class = SensorDeviceClass.GAS
            self._attr_icon = "mdi:fire"
            self._attr_state_class = SensorStateClass.TOTAL_INCREASING
        else:
            self._attr_icon = "mdi:flash"
            if details["unit"] == "kW":
                self._attr_device_class = SensorDeviceClass.POWER
                self._attr_state_class = SensorStateClass.MEASUREMENT
            elif details["unit"] == "kWh":
                self._attr_device_class = SensorDeviceClass.ENERGY
                self._attr_state_class = SensorStateClass.TOTAL_INCREASING
            elif details["unit"] == "kvar":
                self._attr_device_class = SensorDeviceClass.REACTIVE_POWER
                self._attr_state_class = SensorStateClass.MEASUREMENT
            else:
                self._attr_state_class = SensorStateClass.MEASUREMENT

        base_meter_id = self._get_base_meter_id(metering_point_id)
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, base_meter_id)},
            name=f"Leneda (...{base_meter_id[-7:]})",
            manufacturer="Leneda",
            model="Smart Meter",
            sw_version=coordinator.version,
        )

    def _get_base_meter_id(self, metering_point_id: str) -> str:
        """Extract base meter ID for device consolidation."""
        if len(metering_point_id) >= 34 and metering_point_id.startswith("LU"):
            if "779999999" in metering_point_id:
                return metering_point_id.replace("779999999", "079999999")
            if "079999999" in metering_point_id:
                return metering_point_id
        return metering_point_id

    @property
    def native_value(self) -> float | None:
        """Return the state of the sensor."""
        if self.coordinator.data:
            value = self.coordinator.data.get(self._obis_code)
            if value is None or value == 0:
                value = self._get_consolidated_value()
            return value
        return None

    def _get_consolidated_value(self) -> float | None:
        """Get consolidated value from related metering points."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get(self._obis_code)

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return super().available and self.coordinator.data is not None

    @property
    def extra_state_attributes(self) -> dict[str, str] | None:
        """Return the state attributes."""
        if self.coordinator.data:
            peak_timestamp = self.coordinator.data.get(f"{self._obis_code}_peak_timestamp")
            if peak_timestamp:
                return {"peak_timestamp": peak_timestamp}
        return None


class LenedaEnergySensor(CoordinatorEntity[LenedaDataUpdateCoordinator], SensorEntity):
    """Representation of a Leneda energy sensor for aggregated data."""

    _attr_has_entity_name = True
    _attr_state_class = SensorStateClass.TOTAL_INCREASING
    _attr_suggested_display_precision = 2
    _attr_entity_registry_enabled_default = True

    def __init__(
        self,
        coordinator: LenedaDataUpdateCoordinator,
        metering_point_id: str,
        sensor_key: str,
        name: str,
        unit: str,
        device_class: SensorDeviceClass,
        icon: str,
        enabled_default: bool,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator)
        self._key = sensor_key
        self._attr_name = name
        self._attr_unique_id = f"{metering_point_id}_{sensor_key}_v3"
        self._attr_native_unit_of_measurement = unit
        self._attr_device_class = device_class
        self._attr_icon = icon
        self._attr_entity_registry_enabled_default = enabled_default

        base_meter_id = self._get_base_meter_id(metering_point_id)
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, base_meter_id)},
            name=f"Leneda (...{base_meter_id[-7:]})",
            manufacturer="Leneda",
            model="Smart Meter",
            sw_version=coordinator.version,
        )

    def _get_base_meter_id(self, metering_point_id: str) -> str:
        """Extract base meter ID for device consolidation."""
        if len(metering_point_id) >= 34 and metering_point_id.startswith("LU"):
            if "779999999" in metering_point_id:
                return metering_point_id.replace("779999999", "079999999")
            if "079999999" in metering_point_id:
                return metering_point_id
        return metering_point_id

    @property
    def native_value(self) -> float | None:
        """Return the state of the sensor."""
        if self.coordinator.data:
            return self.coordinator.data.get(self._key)
        return None

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return super().available and self.coordinator.data is not None


class LenedaFinancialSensor(CoordinatorEntity[LenedaDataUpdateCoordinator], SensorEntity):
    """Representation of a Leneda monetary sensor."""

    _attr_has_entity_name = True
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_suggested_display_precision = 2
    _attr_device_class = SensorDeviceClass.MONETARY
    _attr_icon = "mdi:cash-multiple"
    _attr_entity_registry_enabled_default = True

    def __init__(
        self,
        coordinator: LenedaDataUpdateCoordinator,
        metering_point_id: str,
        sensor_key: str,
        name: str,
        enabled_default: bool,
    ) -> None:
        """Initialize the financial sensor."""
        super().__init__(coordinator)
        self._key = sensor_key
        self._attr_name = name
        self._attr_unique_id = f"{metering_point_id}_{sensor_key}_v3"
        self._attr_entity_registry_enabled_default = enabled_default

        base_meter_id = self._get_base_meter_id(metering_point_id)
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, base_meter_id)},
            name=f"Leneda (...{base_meter_id[-7:]})",
            manufacturer="Leneda",
            model="Smart Meter",
            sw_version=coordinator.version,
        )

    def _get_base_meter_id(self, metering_point_id: str) -> str:
        """Extract base meter ID for device consolidation."""
        if len(metering_point_id) >= 34 and metering_point_id.startswith("LU"):
            if "779999999" in metering_point_id:
                return metering_point_id.replace("779999999", "079999999")
            if "079999999" in metering_point_id:
                return metering_point_id
        return metering_point_id

    @property
    def native_unit_of_measurement(self) -> str | None:
        """Return the active billing currency."""
        return get_currency(self.coordinator.hass)

    @property
    def native_value(self) -> float | None:
        """Return the financial sensor value."""
        return self.coordinator.financial_sensor_values.get(self._key)

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra calculation details."""
        return self.coordinator.financial_sensor_attributes.get(self._key)

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return super().available and self.coordinator.data is not None
