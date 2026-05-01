#!/usr/bin/env node
/**
 * Leneda Dashboard - Standalone Server
 *
 * Serves the built frontend and exposes a small Leneda-compatible API proxy.
 * This proxy is useful both for the local standalone dashboard and for the
 * hosted GitHub Pages frontend, which cannot call api.leneda.eu directly
 * because of CORS restrictions on the upstream API.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = parseInt(process.env.PORT || "5175", 10);
const CONFIG_FILE = path.join(__dirname, "config.json");
const FRONTEND_DIR = path.join(
  __dirname,
  "..",
  "custom_components",
  "leneda",
  "frontend",
);
const API_BASE = "https://api.leneda.eu";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://koosoli.github.io",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5175",
  "http://127.0.0.1:5175",
];
const ALLOWED_CORS_ORIGINS = (process.env.CORS_ALLOW_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const ALLOWED_CORS_HEADERS = [
  "Content-Type",
  "X-Leneda-Api-Key",
  "X-Leneda-Energy-Id",
  "X-Leneda-Meters",
  "X-Leneda-Reference-Config",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const DEFAULT_BILLING = {
  energy_fixed_fee: 3.5,
  energy_variable_rate: 0.1125,
  network_metering_rate: 5.72,
  network_power_ref_rate: 19.61,
  network_variable_rate: 0.051,
  reference_power_kw: 5.0,
  reference_power_windows: [],
  exceedance_rate: 0.0765,
  feed_in_tariff: 0.08,
  consumption_rate_windows: [],
  feed_in_rates: [],
  gas_fixed_fee: 6.5,
  gas_variable_rate: 0.055,
  gas_network_fee: 4.8,
  gas_network_variable_rate: 0.012,
  gas_tax_rate: 0.001,
  gas_vat_rate: 0.08,
  compensation_fund_rate: -0.001,
  electricity_tax_rate: 0.001,
  connect_discount: 0.5,
  vat_rate: 0.08,
  currency: "EUR",
};

function normalizeMeters(meters) {
  return (Array.isArray(meters) ? meters : [])
    .map((meter) => ({
      id: String(meter?.id || "").trim(),
      types: Array.isArray(meter?.types)
        ? meter.types.map((type) => String(type || "").trim()).filter(Boolean)
        : ["consumption"],
    }))
    .filter((meter) => meter.id);
}

function readHeader(req, name) {
  const value = req.headers[name];
  if (Array.isArray(value)) return String(value[0] || "");
  return String(value || "");
}

function readJsonHeader(req, name) {
  const raw = readHeader(req, name).trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
      if (config.credentials && config.credentials.metering_point && !config.credentials.meters) {
        config.credentials.meters = [{ id: config.credentials.metering_point, types: ["consumption", "production"] }];
        delete config.credentials.metering_point;
        saveConfig(config);
        console.log("Migrated legacy metering_point to meters[]");
      }
      return config;
    }
  } catch (error) {
    console.error("Error loading config.json:", error.message);
  }

  return {
    credentials: { api_key: "", energy_id: "", meters: [{ id: "", types: ["consumption"] }] },
    billing: { ...DEFAULT_BILLING },
  };
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf8");
}

function getBillingConfig(config) {
  return {
    ...DEFAULT_BILLING,
    ...(config.billing || {}),
  };
}

function getEffectiveBillingConfig(req, config) {
  const billing = getBillingConfig(config);
  const referenceOverride = readJsonHeader(req, "x-leneda-reference-config");
  if (!referenceOverride || typeof referenceOverride !== "object") {
    return billing;
  }

  const merged = { ...billing };
  const referencePowerKw = Number(referenceOverride.reference_power_kw);
  if (Number.isFinite(referencePowerKw)) {
    merged.reference_power_kw = referencePowerKw;
  }
  if (Array.isArray(referenceOverride.reference_power_windows)) {
    merged.reference_power_windows = referenceOverride.reference_power_windows;
  }
  return merged;
}

function getEffectiveCredentials(req, fallbackCreds = {}) {
  const apiKey = readHeader(req, "x-leneda-api-key").trim();
  const energyId = readHeader(req, "x-leneda-energy-id").trim();
  const metersHeader = readJsonHeader(req, "x-leneda-meters");
  const hasOverrides = !!apiKey || !!energyId || metersHeader !== null;

  if (hasOverrides) {
    return {
      api_key: apiKey && !apiKey.startsWith("\u2022") ? apiKey : "",
      energy_id: energyId,
      meters: normalizeMeters(metersHeader),
    };
  }

  return {
    api_key: String(fallbackCreds.api_key || "").trim(),
    energy_id: String(fallbackCreds.energy_id || "").trim(),
    meters: normalizeMeters(fallbackCreds.meters),
  };
}

function isConfigured(creds) {
  const meters = normalizeMeters(creds.meters);
  return !!(creds.api_key && creds.energy_id && meters.length > 0 && meters[0].id);
}

function metersOfType(creds, meterType) {
  return normalizeMeters(creds.meters)
    .filter((meter) => Array.isArray(meter.types) && meter.types.includes(meterType))
    .map((meter) => String(meter.id || "").trim())
    .filter(Boolean);
}

function meterForObis(obisCode, creds) {
  const consumptionMeters = billingConsumptionMeters(creds);
  const productionMeters = metersOfType(creds, "production");
  const gasMeters = metersOfType(creds, "gas");

  if (obisCode && obisCode.startsWith("7-") && gasMeters[0]) {
    return gasMeters[0];
  }
  if (
    obisCode &&
    (/^1-1:2\./.test(obisCode) || /^1-1:4\./.test(obisCode) || /^1-65:2\./.test(obisCode)) &&
    productionMeters[0]
  ) {
    return productionMeters[0];
  }
  return consumptionMeters[0] || productionMeters[0] || gasMeters[0] || "";
}

function billingConsumptionMeters(creds) {
  const consumptionMeters = metersOfType(creds, "consumption");
  return consumptionMeters.length > 0 ? [consumptionMeters[0]] : [];
}

function metersForObis(obisCode, creds) {
  if (obisCode.startsWith("7-")) return metersOfType(creds, "gas");
  if (/^1-1:2\./.test(obisCode) || /^1-1:4\./.test(obisCode) || /^1-65:2\./.test(obisCode)) {
    return metersOfType(creds, "production");
  }
  // For supplier-style invoice totals, use the primary billing consumption meter.
  // Auxiliary PV-side consumption meters can add small amounts that do not belong
  // to the household supplier invoice.
  return billingConsumptionMeters(creds);
}

async function lenedaFetch(endpoint, creds) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "X-API-KEY": creds.api_key,
      "X-ENERGY-ID": creds.energy_id,
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Leneda API ${response.status}: ${response.statusText}${body ? ` - ${body}` : ""}`);
  }

  return response.json();
}

function dateRangeFor(range) {
  const now = new Date();
  const toDate = (value) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  switch (range) {
    case "yesterday": {
      const day = new Date(now);
      day.setDate(day.getDate() - 1);
      return { start: toDate(day), end: toDate(day) };
    }
    case "this_week": {
      const start = new Date(now);
      const day = start.getDay() || 7;
      start.setDate(start.getDate() - day + 1);
      return { start: toDate(start), end: toDate(now) };
    }
    case "last_week": {
      const end = new Date(now);
      const day = end.getDay() || 7;
      end.setDate(end.getDate() - day);
      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      return { start: toDate(start), end: toDate(end) };
    }
    case "this_month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { start: toDate(start), end: toDate(now) };
    }
    case "last_month": {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start: toDate(start), end: toDate(end) };
    }
    case "this_year": {
      const start = new Date(now.getFullYear(), 0, 1);
      return { start: toDate(start), end: toDate(now) };
    }
    case "last_year": {
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear() - 1, 11, 31);
      return { start: toDate(start), end: toDate(end) };
    }
    default:
      return dateRangeFor("yesterday");
  }
}

function toDayBoundsIso(startDate, endDate) {
  return {
    startIso: new Date(`${startDate}T00:00:00`).toISOString(),
    endIso: new Date(`${endDate}T23:59:59.999`).toISOString(),
  };
}

function sumAggregatedItems(data) {
  return (data?.aggregatedTimeSeries || []).reduce((total, item) => total + (Number(item?.value) || 0), 0);
}

function round(value, digits = 4) {
  return Number((Number(value) || 0).toFixed(digits));
}

async function fetchAggregatedSum(meterIds, obisCode, startDate, endDate, aggregationLevel, creds) {
  if (!meterIds.length) return 0;

  const results = await Promise.all(
    meterIds.map((meterId) =>
      lenedaFetch(
        `/api/metering-points/${meterId}/time-series/aggregated?obisCode=${encodeURIComponent(obisCode)}&startDate=${startDate}&endDate=${endDate}&aggregationLevel=${aggregationLevel}&transformationMode=Accumulation`,
        creds,
      )
    )
  );

  return results.reduce((total, result) => total + sumAggregatedItems(result), 0);
}

async function fetchMergedTimeseries(meterIds, obisCode, startIso, endIso, creds) {
  if (!meterIds.length) {
    return { unit: "kW", interval: "PT15M", items: [] };
  }

  const results = await Promise.all(
    meterIds.map((meterId) =>
      lenedaFetch(
        `/api/metering-points/${meterId}/time-series?obisCode=${encodeURIComponent(obisCode)}&startDateTime=${encodeURIComponent(startIso)}&endDateTime=${encodeURIComponent(endIso)}`,
        creds,
      )
    )
  );

  const merged = new Map();
  let unit = "kW";
  let interval = "PT15M";

  for (const result of results) {
    unit = result?.unit || unit;
    interval = result?.intervalLength || interval;
    for (const item of result?.items || []) {
      const startedAt = item?.startedAt;
      if (!startedAt) continue;
      merged.set(startedAt, (merged.get(startedAt) || 0) + (Number(item?.value) || 0));
    }
  }

  return {
    unit,
    interval,
    items: Array.from(merged.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([startedAt, value]) => ({
        startedAt,
        value,
        type: "Measured",
        version: 1,
        calculated: false,
      })),
  };
}

function timeToMinutes(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(String(value || ""));
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2]);
}

function matchesDayGroup(date, dayGroup) {
  if (dayGroup === "weekdays") return date.getDay() >= 1 && date.getDay() <= 5;
  if (dayGroup === "weekends") return date.getDay() === 0 || date.getDay() === 6;
  return true;
}

function matchesWindow(date, dayGroup, startTime, endTime) {
  if (!matchesDayGroup(date, dayGroup)) return false;

  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes === endMinutes) return true;
  if (startMinutes < endMinutes) return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  return nowMinutes >= startMinutes || nowMinutes < endMinutes;
}

function getReferencePowerForDate(billingConfig, date) {
  const windows = Array.isArray(billingConfig.reference_power_windows) ? billingConfig.reference_power_windows : [];
  for (const window of windows) {
    if (
      matchesWindow(
        date,
        window?.day_group || "all",
        window?.start_time || "00:00",
        window?.end_time || "00:00",
      )
    ) {
      const windowValue = Number(window?.reference_power_kw);
      if (Number.isFinite(windowValue)) return windowValue;
    }
  }

  return Number(billingConfig.reference_power_kw) || Number(DEFAULT_BILLING.reference_power_kw);
}

async function computePeakAndExceedance(billingConfig, creds, startIso, endIso) {
  const consumptionMeters = billingConsumptionMeters(creds);
  const productionMeters = metersOfType(creds, "production");

  if (!consumptionMeters.length) {
    return { peak_power_kw: 0, exceedance_kwh: 0 };
  }

  const consumption = await fetchMergedTimeseries(consumptionMeters, "1-1:1.29.0", startIso, endIso, creds);
  const production = productionMeters.length
    ? await fetchMergedTimeseries(productionMeters, "1-1:2.29.0", startIso, endIso, creds)
    : { items: [] };

  const productionByTimestamp = new Map(
    production.items.map((item) => [item.startedAt, Number(item.value) || 0]),
  );

  let peakPowerKw = 0;
  let exceedanceKwh = 0;

  for (const item of consumption.items) {
    const consumptionKw = Number(item.value) || 0;
    const solarKw = productionByTimestamp.get(item.startedAt) || 0;
    const netKw = Math.max(0, consumptionKw - solarKw);
    const timestamp = new Date(item.startedAt);
    const referencePowerKw = getReferencePowerForDate(billingConfig, timestamp);

    peakPowerKw = Math.max(peakPowerKw, netKw);
    if (netKw > referencePowerKw) {
      exceedanceKwh += (netKw - referencePowerKw) * 0.25;
    }
  }

  return {
    peak_power_kw: round(peakPowerKw, 2),
    exceedance_kwh: round(exceedanceKwh, 4),
  };
}

async function fetchLiveAggregatedData(billingConfig, creds, startDate, endDate) {
  const aggregationLevel = (new Date(`${endDate}T00:00:00`).getTime() - new Date(`${startDate}T00:00:00`).getTime()) > (35 * 24 * 60 * 60 * 1000)
    ? "Month"
    : "Infinite";
  const consumptionMeters = billingConsumptionMeters(creds);
  const productionMeters = metersOfType(creds, "production");
  const gasMeters = metersOfType(creds, "gas");

  const consumption = await fetchAggregatedSum(consumptionMeters, "1-1:1.29.0", startDate, endDate, aggregationLevel, creds);
  const production = await fetchAggregatedSum(productionMeters, "1-1:2.29.0", startDate, endDate, aggregationLevel, creds);
  const gridImport = await fetchAggregatedSum(consumptionMeters, "1-65:1.29.9", startDate, endDate, aggregationLevel, creds);
  const marketExport = await fetchAggregatedSum(productionMeters, "1-65:2.29.9", startDate, endDate, aggregationLevel, creds);
  const gasEnergy = await fetchAggregatedSum(gasMeters, "7-20:99.33.17", startDate, endDate, aggregationLevel, creds);
  const gasVolume = await fetchAggregatedSum(gasMeters, "7-1:99.23.15", startDate, endDate, aggregationLevel, creds);

  let sharedWithMe = 0;
  let shared = 0;
  for (const layer of ["1", "2", "3", "4"]) {
    sharedWithMe += await fetchAggregatedSum(consumptionMeters, `1-65:1.29.${layer}`, startDate, endDate, aggregationLevel, creds);
    shared += await fetchAggregatedSum(productionMeters, `1-65:2.29.${layer}`, startDate, endDate, aggregationLevel, creds);
  }

  const directSolarToHome = Math.max(0, production - shared - marketExport);
  const solarToHome = Math.max(0, directSolarToHome + sharedWithMe);
  const billedGridImport = Math.max(0, gridImport);
  const { startIso, endIso } = toDayBoundsIso(startDate, endDate);
  const peak = await computePeakAndExceedance(billingConfig, creds, startIso, endIso);

  return {
    consumption: round(consumption),
    production: round(production),
    exported: round(Math.max(0, marketExport)),
    self_consumed: round(directSolarToHome),
    grid_import: round(billedGridImport),
    solar_to_home: round(solarToHome),
    direct_solar_to_home: round(directSolarToHome),
    shared: round(shared),
    shared_with_me: round(sharedWithMe),
    gas_energy: round(gasEnergy),
    gas_volume: round(gasVolume),
    peak_power_kw: peak.peak_power_kw,
    exceedance_kwh: peak.exceedance_kwh,
  };
}

function getAllowedCorsOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return null;
  if (ALLOWED_CORS_ORIGINS.includes("*")) return "*";
  return ALLOWED_CORS_ORIGINS.includes(origin) ? origin : null;
}

function applyCors(req, res) {
  const allowedOrigin = getAllowedCorsOrigin(req);
  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  }
  res.setHeader("Vary", "Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", ALLOWED_CORS_HEADERS.join(", "));
  return allowedOrigin;
}

async function handleApi(req, res, urlPath, searchParams) {
  const config = loadConfig();
  const creds = getEffectiveCredentials(req, config.credentials || {});
  const billingConfig = getEffectiveBillingConfig(req, config);
  const meters = normalizeMeters(creds.meters);

  if (urlPath === "/leneda_api/mode" && req.method === "GET") {
    return jsonResp(res, { mode: "standalone", configured: isConfigured(creds) });
  }

  if (urlPath === "/leneda_api/credentials" && req.method === "GET") {
    return jsonResp(res, {
      api_key: creds.api_key ? "\u2022\u2022\u2022\u2022" + creds.api_key.slice(-4) : "",
      energy_id: creds.energy_id || "",
      meters: meters.map((meter) => ({ id: meter.id || "", types: meter.types || ["consumption"] })),
    });
  }

  if (urlPath === "/leneda_api/credentials" && req.method === "POST") {
    const body = await readBody(req);
    if (!config.credentials) config.credentials = {};
    if (body.api_key && !String(body.api_key).startsWith("\u2022")) {
      config.credentials.api_key = body.api_key;
    }
    if (body.energy_id !== undefined) {
      config.credentials.energy_id = body.energy_id;
    }
    if (body.meters !== undefined) {
      config.credentials.meters = normalizeMeters(body.meters);
    }
    delete config.credentials.metering_point;
    saveConfig(config);
    return jsonResp(res, { status: "ok" });
  }

  if (urlPath === "/leneda_api/credentials/test" && req.method === "POST") {
    const body = await readBody(req);
    const testCreds = {
      api_key: body.api_key && !String(body.api_key).startsWith("\u2022") ? body.api_key : creds.api_key,
      energy_id: body.energy_id || creds.energy_id,
      meters: body.meters ? normalizeMeters(body.meters) : meters,
    };
    const firstMeterId = testCreds.meters?.[0]?.id;

    if (!firstMeterId || !testCreds.api_key || !testCreds.energy_id) {
      return jsonResp(res, { success: false, message: "Missing API key, energy ID, or metering point" });
    }

    try {
      const date = dateRangeFor("yesterday").start;
      await lenedaFetch(
        `/api/metering-points/${firstMeterId}/time-series/aggregated?obisCode=1-1:1.29.0&startDate=${date}&endDate=${date}&aggregationLevel=Infinite&transformationMode=Accumulation`,
        testCreds,
      );
      return jsonResp(res, {
        success: true,
        message: `Connection successful! Tested meter ${String(firstMeterId).slice(-8)}`,
      });
    } catch (error) {
      return jsonResp(res, {
        success: false,
        message: `Connection failed: ${error.message}`,
      });
    }
  }

  if (urlPath === "/leneda_api/config" && req.method === "GET") {
    const hasGas = meters.some((meter) => Array.isArray(meter.types) && meter.types.includes("gas"));
    return jsonResp(res, {
      ...billingConfig,
      meters: meters.map((meter) => ({ id: meter.id || "", types: meter.types || ["consumption"] })),
      meter_has_gas: hasGas,
    });
  }

  if (urlPath === "/leneda_api/config" && req.method === "POST") {
    const body = await readBody(req);
    config.billing = { ...getBillingConfig(config), ...body };
    saveConfig(config);
    return jsonResp(res, { status: "ok" });
  }

  if (urlPath === "/leneda_api/config/reset" && req.method === "POST") {
    config.billing = { ...DEFAULT_BILLING };
    saveConfig(config);
    return jsonResp(res, { status: "ok" });
  }

  if (!isConfigured(creds)) {
    res.statusCode = 401;
    return jsonResp(res, {
      error: "Credentials not configured. Go to Settings to enter your Leneda API credentials.",
    });
  }

  if (urlPath === "/leneda_api/data" && req.method === "GET") {
    const range = searchParams.get("range") || "yesterday";
    const { start, end } = dateRangeFor(range);
    try {
      const liveData = await fetchLiveAggregatedData(billingConfig, creds, start, end);
      return jsonResp(res, {
        range,
        metering_point: meterForObis("1-1:1.29.0", creds),
        start,
        end,
        ...liveData,
      });
    } catch (error) {
      res.statusCode = 500;
      return jsonResp(res, { error: error.message });
    }
  }

  if (urlPath === "/leneda_api/data/custom" && req.method === "GET") {
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    if (!start || !end) {
      res.statusCode = 400;
      return jsonResp(res, { error: "Missing start or end parameter" });
    }

    try {
      const liveData = await fetchLiveAggregatedData(billingConfig, creds, start, end);
      return jsonResp(res, {
        start,
        end,
        metering_point: meterForObis("1-1:1.29.0", creds),
        ...liveData,
      });
    } catch (error) {
      res.statusCode = 500;
      return jsonResp(res, { error: error.message });
    }
  }

  if (urlPath === "/leneda_api/data/timeseries" && req.method === "GET") {
    const obis = searchParams.get("obis") || "1-1:1.29.0";
    const now = new Date();
    const defaultStart = new Date(now);
    defaultStart.setDate(defaultStart.getDate() - 1);
    defaultStart.setHours(0, 0, 0, 0);
    const defaultEnd = new Date(defaultStart);
    defaultEnd.setHours(23, 59, 59, 999);

    const startIso = searchParams.get("start") || defaultStart.toISOString();
    const endIso = searchParams.get("end") || defaultEnd.toISOString();

    try {
      const merged = await fetchMergedTimeseries(metersForObis(obis, creds), obis, startIso, endIso, creds);
      return jsonResp(res, {
        obis,
        unit: merged.unit,
        interval: merged.interval,
        items: merged.items,
      });
    } catch (error) {
      res.statusCode = 500;
      return jsonResp(res, { error: error.message });
    }
  }

  if (urlPath === "/leneda_api/data/timeseries/per-meter" && req.method === "GET") {
    const obis = searchParams.get("obis") || "1-1:2.29.0";
    const now = new Date();
    const defaultStart = new Date(now);
    defaultStart.setDate(defaultStart.getDate() - 1);
    defaultStart.setHours(0, 0, 0, 0);
    const defaultEnd = new Date(defaultStart);
    defaultEnd.setHours(23, 59, 59, 999);

    const startIso = searchParams.get("start") || defaultStart.toISOString();
    const endIso = searchParams.get("end") || defaultEnd.toISOString();
    const meterIds = metersForObis(obis, creds);

    try {
      const meterResults = await Promise.all(
        meterIds.map(async (meterId) => {
          const data = await lenedaFetch(
            `/api/metering-points/${meterId}/time-series?obisCode=${encodeURIComponent(obis)}&startDateTime=${encodeURIComponent(startIso)}&endDateTime=${encodeURIComponent(endIso)}`,
            creds,
          );
          return {
            meter_id: meterId,
            unit: data.unit || "kW",
            interval: data.intervalLength || "PT15M",
            items: data.items || [],
          };
        })
      );

      return jsonResp(res, { obis, meters: meterResults });
    } catch (error) {
      res.statusCode = 500;
      return jsonResp(res, { error: error.message });
    }
  }

  if (urlPath === "/leneda_api/sensors" && req.method === "GET") {
    return jsonResp(res, {
      sensors: [
        {
          key: "standalone_info",
          value: null,
          name: "Running through the standalone/proxy server",
          unit: "",
          peak_timestamp: null,
        },
      ],
      metering_point: meterForObis("1-1:1.29.0", creds),
    });
  }

  res.statusCode = 404;
  return jsonResp(res, { error: "Not found" });
}

function serveStatic(req, res) {
  let filePath = (req.url || "/").split("?")[0];
  const standaloneStaticPrefix = "/leneda-panel/static";

  if (filePath === standaloneStaticPrefix) {
    filePath = "/index.html";
  } else if (filePath.startsWith(`${standaloneStaticPrefix}/`)) {
    filePath = filePath.slice(standaloneStaticPrefix.length);
  }

  if (filePath === "/" || filePath === "") filePath = "/index.html";

  const fullPath = path.join(FRONTEND_DIR, filePath);
  if (!fullPath.startsWith(FRONTEND_DIR)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
    if (path.extname(filePath)) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    const indexPath = path.join(FRONTEND_DIR, "index.html");
    if (fs.existsSync(indexPath)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(fs.readFileSync(indexPath));
      return;
    }
    res.statusCode = 404;
    res.end("Not found - have you built the frontend? Run: cd frontend-src && npm run build");
    return;
  }

  res.setHeader("Content-Type", MIME[path.extname(fullPath)] || "application/octet-stream");
  res.end(fs.readFileSync(fullPath));
}

function jsonResp(res, data) {
  if (!res.headersSent) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = new URL(req.url || "/", `http://localhost:${PORT}`);

  if (parsed.pathname.startsWith("/leneda_api/")) {
    const allowedOrigin = applyCors(req, res);

    if (req.method === "OPTIONS") {
      if (req.headers.origin && !allowedOrigin) {
        res.statusCode = 403;
        res.end("Origin not allowed");
        return;
      }
      res.statusCode = 204;
      res.end();
      return;
    }

    try {
      await handleApi(req, res, parsed.pathname, parsed.searchParams);
    } catch (error) {
      console.error("[API Error]", error);
      res.statusCode = 500;
      jsonResp(res, { error: error.message || "Internal server error" });
    }
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  const config = loadConfig();
  const creds = config.credentials || {};
  const meters = normalizeMeters(creds.meters);

  console.log("");
  console.log("Leneda Energy Dashboard (Standalone)");
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`Configured: ${isConfigured(creds) ? `yes (${meters.length} meter(s))` : "no - open Settings to configure"}`);
  console.log(`CORS origins: ${ALLOWED_CORS_ORIGINS.join(", ")}`);
  console.log("");
});
