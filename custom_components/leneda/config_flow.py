"""Config flow for Leneda."""

from __future__ import annotations

import logging

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import selector as sel
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .api import InvalidAuth, LenedaApiClient, LenedaApiError, NoDataError
from .const import (
    CONF_API_KEY,
    CONF_ENERGY_ID,
    CONF_METERING_POINT_1_TYPES,
    CONF_METERING_POINT_ID,
    CONF_REFERENCE_POWER_ENTITY,
    CONF_REFERENCE_POWER_STATIC,
    DOMAIN,
    EXTRA_METER_SLOTS,
    SENSOR_PACK_DEFAULTS,
    SENSOR_PACK_OPTIONS,
)
from .sensor_catalog import (
    SENSOR_DEFINITION_BY_KEY,
    extract_sensor_key_from_unique_id,
    has_explicit_sensor_pack_preferences,
    sensor_enabled_from_preferences,
)

_LOGGER = logging.getLogger(__name__)


def _normalize_user_input(user_input: dict) -> dict:
    """Trim credential and metering-point fields before validation/storage."""
    normalized = dict(user_input)
    normalized[CONF_API_KEY] = (normalized.get(CONF_API_KEY) or "").strip()
    normalized[CONF_ENERGY_ID] = (normalized.get(CONF_ENERGY_ID) or "").strip()
    normalized[CONF_METERING_POINT_ID] = (
        normalized.get(CONF_METERING_POINT_ID) or ""
    ).strip()
    normalized[CONF_METERING_POINT_1_TYPES] = list(
        normalized.get(CONF_METERING_POINT_1_TYPES) or ["consumption"]
    )
    normalized[CONF_REFERENCE_POWER_ENTITY] = (
        normalized.get(CONF_REFERENCE_POWER_ENTITY) or ""
    ).strip()
    normalized[CONF_REFERENCE_POWER_STATIC] = normalized.get(
        CONF_REFERENCE_POWER_STATIC
    )

    for id_key, types_key in EXTRA_METER_SLOTS:
        normalized[id_key] = (normalized.get(id_key) or "").strip()
        normalized[types_key] = list(normalized.get(types_key) or [])

    return normalized


def _has_value(value) -> bool:
    """Return whether a form value should be treated as configured."""
    return value not in (None, "")


def _build_meter_type_selector() -> sel.SelectSelector:
    """Build the shared meter-type selector."""
    return sel.SelectSelector(
        sel.SelectSelectorConfig(
            options=[
                {"value": "consumption", "label": "Power Consumption"},
                {"value": "production", "label": "Power Production"},
                {"value": "gas", "label": "Gas Consumption"},
            ],
            multiple=True,
        ),
    )


def _extract_config_data(user_input: dict) -> dict:
    """Build the persisted config-entry data payload from form input."""
    config_data = {
        CONF_METERING_POINT_ID: user_input[CONF_METERING_POINT_ID],
        CONF_METERING_POINT_1_TYPES: list(user_input[CONF_METERING_POINT_1_TYPES]),
        CONF_API_KEY: user_input[CONF_API_KEY],
        CONF_ENERGY_ID: user_input[CONF_ENERGY_ID],
        CONF_REFERENCE_POWER_ENTITY: user_input.get(CONF_REFERENCE_POWER_ENTITY, ""),
        CONF_REFERENCE_POWER_STATIC: user_input.get(CONF_REFERENCE_POWER_STATIC),
    }

    for id_key, types_key in EXTRA_METER_SLOTS:
        config_data[id_key] = user_input.get(id_key, "")
        config_data[types_key] = list(user_input.get(types_key, []))

    return config_data


def _extract_sensor_pack_options(existing_options: dict, user_input: dict) -> dict:
    """Build the persisted config-entry options payload from form input."""
    options = dict(existing_options)
    for option_key in SENSOR_PACK_OPTIONS:
        options[option_key] = bool(user_input.get(option_key, options.get(option_key, False)))
    return options


def _build_schema(
    defaults: dict | None = None,
    *,
    include_sensor_pack_options: bool = False,
) -> vol.Schema:
    """Build the shared config form schema."""
    defaults = defaults or {}
    meter_type_selector = _build_meter_type_selector()

    schema_fields = {
        vol.Required(
            CONF_METERING_POINT_ID,
            default=defaults.get(CONF_METERING_POINT_ID, ""),
        ): str,
        vol.Required(
            CONF_METERING_POINT_1_TYPES,
            default=defaults.get(CONF_METERING_POINT_1_TYPES, ["consumption"]),
        ): meter_type_selector,
    }
    for id_key, types_key in EXTRA_METER_SLOTS:
        schema_fields[vol.Optional(id_key, default=defaults.get(id_key, ""))] = str
        schema_fields[vol.Optional(types_key, default=defaults.get(types_key, []))] = (
            meter_type_selector
        )

    schema_fields[vol.Required(CONF_API_KEY, default=defaults.get(CONF_API_KEY, ""))] = str
    schema_fields[vol.Required(CONF_ENERGY_ID, default=defaults.get(CONF_ENERGY_ID, ""))] = str

    reference_entity_selector = sel.EntitySelector(
        sel.EntitySelectorConfig(domain="input_number"),
    )
    reference_static_selector = sel.NumberSelector(
        sel.NumberSelectorConfig(
            min=0,
            max=100,
            step=0.1,
            mode="box",
            unit_of_measurement="kW",
        ),
    )

    ref_entity = defaults.get(CONF_REFERENCE_POWER_ENTITY, "")
    ref_static = defaults.get(CONF_REFERENCE_POWER_STATIC)
    if _has_value(ref_entity):
        schema_fields[
            vol.Optional(CONF_REFERENCE_POWER_ENTITY, default=ref_entity)
        ] = reference_entity_selector
    else:
        schema_fields[vol.Optional(CONF_REFERENCE_POWER_ENTITY)] = (
            reference_entity_selector
        )

    if _has_value(ref_static):
        schema_fields[
            vol.Optional(CONF_REFERENCE_POWER_STATIC, default=ref_static)
        ] = reference_static_selector
    else:
        schema_fields[vol.Optional(CONF_REFERENCE_POWER_STATIC)] = (
            reference_static_selector
        )

    if include_sensor_pack_options:
        boolean_selector = sel.BooleanSelector()
        for option_key in SENSOR_PACK_OPTIONS:
            schema_fields[
                vol.Optional(
                    option_key,
                    default=defaults.get(
                        option_key, SENSOR_PACK_DEFAULTS.get(option_key, False)
                    ),
                )
            ] = boolean_selector

    return vol.Schema(schema_fields)


async def _validate_input(hass, user_input: dict) -> dict[str, str]:
    """Validate Leneda credentials and configured metering points."""
    errors: dict[str, str] = {}

    ref_entity = user_input.get(CONF_REFERENCE_POWER_ENTITY)
    ref_static = user_input.get(CONF_REFERENCE_POWER_STATIC)
    if ref_entity and _has_value(ref_static):
        errors["base"] = "ambiguous_reference"
        return errors

    session = async_get_clientsession(hass)
    api_client = LenedaApiClient(
        session,
        user_input[CONF_API_KEY],
        user_input[CONF_ENERGY_ID],
    )

    try:
        await api_client.test_credentials(user_input[CONF_METERING_POINT_ID])

        for idx, (id_key, _types_key) in enumerate(EXTRA_METER_SLOTS, start=2):
            meter_id = user_input.get(id_key, "").strip()
            if not meter_id:
                continue

            try:
                await api_client.test_credentials(meter_id)
            except (InvalidAuth, NoDataError, LenedaApiError):
                errors["base"] = f"invalid_meter_{idx}"
                break
    except InvalidAuth:
        errors["base"] = "invalid_auth"
    except NoDataError:
        errors["base"] = "no_data"
    except LenedaApiError:
        errors["base"] = "cannot_connect"
    except Exception:
        _LOGGER.exception("Unexpected exception during Leneda setup")
        errors["base"] = "unknown"

    return errors


def _sync_sensor_pack_entities(
    hass,
    config_entry: config_entries.ConfigEntry,
    options: dict,
) -> None:
    """Apply sensor-pack preferences to existing entity-registry entries."""
    try:
        registry = er.async_get(hass)

        for entity_entry in er.async_entries_for_config_entry(
            registry, config_entry.entry_id
        ):
            sensor_key = extract_sensor_key_from_unique_id(entity_entry.unique_id)
            if sensor_key is None:
                continue

            definition = SENSOR_DEFINITION_BY_KEY.get(sensor_key)
            if definition is None or definition.pack is None:
                continue

            should_enable = sensor_enabled_from_preferences(options, definition)

            if should_enable:
                if entity_entry.disabled_by == er.RegistryEntryDisabler.INTEGRATION:
                    registry.async_update_entity(entity_entry.entity_id, disabled_by=None)
                continue

            if entity_entry.disabled_by is None:
                registry.async_update_entity(
                    entity_entry.entity_id,
                    disabled_by=er.RegistryEntryDisabler.INTEGRATION,
                )
    except Exception:
        _LOGGER.exception("Could not synchronize Leneda sensor-pack entities")


def _infer_sensor_pack_defaults(
    hass,
    config_entry: config_entries.ConfigEntry,
) -> dict[str, bool]:
    """Infer the current sensor-pack settings for the options form."""
    stored_options = dict(config_entry.options)
    if has_explicit_sensor_pack_preferences(stored_options):
        return {
            option_key: bool(
                stored_options.get(
                    option_key, SENSOR_PACK_DEFAULTS.get(option_key, False)
                )
            )
            for option_key in SENSOR_PACK_OPTIONS
        }

    defaults = {
        option_key: SENSOR_PACK_DEFAULTS.get(option_key, False)
        for option_key in SENSOR_PACK_OPTIONS
    }
    try:
        registry = er.async_get(hass)

        for entity_entry in er.async_entries_for_config_entry(
            registry, config_entry.entry_id
        ):
            sensor_key = extract_sensor_key_from_unique_id(entity_entry.unique_id)
            if sensor_key is None:
                continue

            definition = SENSOR_DEFINITION_BY_KEY.get(sensor_key)
            if definition is None or definition.pack is None:
                continue

            if entity_entry.disabled_by is None:
                defaults[definition.pack] = True
    except Exception:
        _LOGGER.exception("Could not infer Leneda sensor-pack defaults")

    return defaults


class LenedaConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Leneda."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Return the options flow for this handler."""
        return LenedaOptionsFlow(config_entry)

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        _LOGGER.debug("Leneda config flow started.")
        errors = {}
        form_defaults = {}

        if self._async_current_entries():
            return self.async_abort(reason="already_configured")

        if user_input is not None:
            normalized_input = _normalize_user_input(user_input)
            config_data = _extract_config_data(normalized_input)
            form_defaults.update(normalized_input)
            errors = await _validate_input(self.hass, config_data)
            if not errors:
                return self.async_create_entry(title="Leneda", data=config_data)

        return self.async_show_form(
            step_id="user",
            data_schema=_build_schema(form_defaults),
            errors=errors,
        )


class LenedaOptionsFlow(config_entries.OptionsFlowWithConfigEntry):
    """Handle Leneda reconfiguration from the integration options UI."""

    def __init__(self, config_entry):
        """Initialize the options flow."""
        super().__init__(config_entry)

    async def async_step_init(self, user_input=None):
        """Show and process the editable configuration form."""
        errors = {}
        form_defaults = dict(self.config_entry.data)
        form_defaults.update(_infer_sensor_pack_defaults(self.hass, self.config_entry))

        if user_input is not None:
            normalized_input = _normalize_user_input(user_input)
            config_data = _extract_config_data(normalized_input)
            options_data = _extract_sensor_pack_options(
                dict(self.config_entry.options), normalized_input
            )

            form_defaults.update(normalized_input)
            form_defaults.update(options_data)
            errors = await _validate_input(self.hass, config_data)

            if not errors:
                self.hass.config_entries.async_update_entry(
                    self.config_entry,
                    data=config_data,
                    options=options_data,
                )
                _sync_sensor_pack_entities(self.hass, self.config_entry, options_data)
                await self.hass.config_entries.async_reload(self.config_entry.entry_id)
                return self.async_create_entry(title="", data={})

        return self.async_show_form(
            step_id="init",
            data_schema=_build_schema(
                form_defaults,
                include_sensor_pack_options=True,
            ),
            errors=errors,
        )
