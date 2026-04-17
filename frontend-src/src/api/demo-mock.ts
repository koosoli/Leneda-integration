/**
 * Browser-side client for the GitHub Pages / demo build.
 *
 * This build cannot call https://api.leneda.eu directly because the Leneda API
 * rejects browser CORS requests from GitHub Pages. Instead, the hosted frontend
 * supports two modes:
 *
 * - no proxy URL: realistic mock data for demos
 * - proxy URL configured: forwards calls to a Leneda-compatible proxy
 *   (for example the standalone server in this repo)
 *
 * This module is ONLY bundled when VITE_DEMO_MODE is set at build time.
 * Normal builds (HA + local dev) tree-shake this entire file away.
 */

import type {
  RangeData,
  CustomRangeData,
  TimeseriesResponse,
  SensorsResponse,
  BillingConfig,
  AppMode,
  Credentials,
  MeterConfig,
  PerMeterTimeseriesResponse,
} from "./leneda";

interface StoredCreds {
  api_key: string;
  energy_id: string;
  meters: Array<{ id: string; types: string[] }>;
  proxy_url?: string;
}

const LS_CREDS = "leneda_demo_creds";
const LS_BILLING = "leneda_demo_billing";

function loadCreds(): StoredCreds | null {
  try {
    const raw = localStorage.getItem(LS_CREDS);
    if (!raw) return null;
    const creds = JSON.parse(raw) as StoredCreds;
    if (creds.api_key && creds.energy_id && creds.meters?.length) return creds;
    if (creds.proxy_url) return creds;
  } catch {
    // Ignore invalid localStorage content.
  }
  return null;
}

function saveCreds(creds: StoredCreds): void {
  try {
    localStorage.setItem(LS_CREDS, JSON.stringify(creds));
  } catch {
    // Ignore storage write failures.
  }
}

function hasRealCreds(): boolean {
  const creds = loadCreds();
  return !!(
    creds &&
    creds.api_key &&
    !creds.api_key.startsWith("\u2022") &&
    creds.energy_id &&
    creds.meters?.length > 0 &&
    creds.meters[0].id
  );
}

function normalizeProxyUrl(value: string | undefined | null): string {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "";
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
  return withScheme.replace(/\/+$/, "").replace(/\/leneda_api$/i, "");
}

function getProxyUrl(): string {
  return normalizeProxyUrl(loadCreds()?.proxy_url);
}

function hasProxyUrl(): boolean {
  return getProxyUrl().length > 0;
}

async function proxyFetch<T>(path: string, init?: RequestInit, proxyUrlOverride?: string): Promise<T> {
  const baseUrl = normalizeProxyUrl(proxyUrlOverride) || getProxyUrl();
  if (!baseUrl) {
    throw new Error("No proxy URL configured");
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      credentials: "omit",
      headers: {
        ...(init?.headers as Record<string, string> | undefined),
      },
    });
  } catch {
    throw new Error(`Could not reach proxy at ${baseUrl}`);
  }

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    let detail = "";
    if (contentType.includes("application/json")) {
      const body = await response.json().catch(() => null) as { error?: string; message?: string } | null;
      detail = String(body?.message ?? body?.error ?? "").trim();
    } else {
      detail = (await response.text().catch(() => "")).trim();
    }
    throw new Error(detail || `Proxy ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

function defaultBilling(): BillingConfig {
  return {
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
    feed_in_rates: [
      { meter_id: "LU0000000000000000000000000DEMO01", mode: "fixed", tariff: 0.08, sensor_entity: "" },
    ],
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
    meter_has_gas: true,
    meter_monthly_fees: [
      { meter_id: "LU0000000000000000000000000DEMO01", label: "Smart meter (elec)", fee: 5.72 },
      { meter_id: "LU0000000000000000000000000DEMO02", label: "Gas meter", fee: 3.5 },
    ],
    meters: [
      { id: "LU0000000000000000000000000DEMO01", types: ["consumption", "production"] },
      { id: "LU0000000000000000000000000DEMO02", types: ["gas"] },
    ],
  } as BillingConfig;
}

function loadBilling(): BillingConfig {
  try {
    const raw = localStorage.getItem(LS_BILLING);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore invalid localStorage content.
  }
  return defaultBilling();
}

function saveBillingToStorage(config: BillingConfig): void {
  try {
    localStorage.setItem(LS_BILLING, JSON.stringify(config));
  } catch {
    // Ignore storage write failures.
  }
}

function jitter(base: number, pct = 0.15): number {
  return +(base * (1 + (Math.random() * 2 - 1) * pct)).toFixed(4);
}

function yesterdayRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

const RANGE_DATA: Record<string, RangeData> = {
  yesterday: { range: "yesterday", consumption: 12.34, production: 8.76, exported: 3.41, self_consumed: 3.55, direct_solar_to_home: 3.55, solar_to_home: 5.65, grid_import: 6.69, shared: 1.8, shared_with_me: 2.1, peak_power_kw: 3.42, exceedance_kwh: 0, gas_energy: 24.5, gas_volume: 2.31, metering_point: "LU0000000000000000000000000DEMO01" },
  this_week: { range: "this_week", consumption: 68.9, production: 45.2, exported: 17.7, self_consumed: 18.1, direct_solar_to_home: 18.1, solar_to_home: 29.3, grid_import: 39.6, shared: 9.4, shared_with_me: 11.2, peak_power_kw: 4.1, exceedance_kwh: 0, gas_energy: 142.3, gas_volume: 13.4, metering_point: "LU0000000000000000000000000DEMO01" },
  last_week: { range: "last_week", consumption: 82.5, production: 52.8, exported: 19.3, self_consumed: 21.2, direct_solar_to_home: 21.2, solar_to_home: 35.8, grid_import: 46.7, shared: 12.3, shared_with_me: 14.6, peak_power_kw: 5.8, exceedance_kwh: 0.82, gas_energy: 168.7, gas_volume: 15.9, metering_point: "LU0000000000000000000000000DEMO01" },
  this_month: { range: "this_month", consumption: 245.6, production: 178.4, exported: 68.7, self_consumed: 71.5, direct_solar_to_home: 71.5, solar_to_home: 115.5, grid_import: 130.1, shared: 38.2, shared_with_me: 44.0, peak_power_kw: 6.2, exceedance_kwh: 3.45, gas_energy: 512.3, gas_volume: 48.3, metering_point: "LU0000000000000000000000000DEMO01" },
  last_month: { range: "last_month", consumption: 310.2, production: 198.7, exported: 76.4, self_consumed: 79.5, direct_solar_to_home: 79.5, solar_to_home: 129.6, grid_import: 180.6, shared: 42.8, shared_with_me: 50.1, peak_power_kw: 5.5, exceedance_kwh: 1.92, gas_energy: 620.1, gas_volume: 58.5, metering_point: "LU0000000000000000000000000DEMO01" },
  this_year: { range: "this_year", consumption: 1845.2, production: 1320.8, exported: 509.4, self_consumed: 528.3, direct_solar_to_home: 528.3, solar_to_home: 858.7, grid_import: 986.5, shared: 283.1, shared_with_me: 330.4, peak_power_kw: 7.1, exceedance_kwh: 12.6, gas_energy: 4210.5, gas_volume: 397.2, metering_point: "LU0000000000000000000000000DEMO01" },
  last_year: { range: "last_year", consumption: 4120.8, production: 3015.6, exported: 1163.5, self_consumed: 1206.2, direct_solar_to_home: 1206.2, solar_to_home: 1960.4, grid_import: 2160.4, shared: 645.9, shared_with_me: 754.2, peak_power_kw: 8.3, exceedance_kwh: 28.4, gas_energy: 9580.2, gas_volume: 903.8, metering_point: "LU0000000000000000000000000DEMO01" },
};

const MOCK_SENSORS: SensorsResponse = {
  metering_point: "LU0000000000000000000000000DEMO01",
  sensors: [
    { key: "c_01_total_consumption", value: 4523.7, name: "Total Consumption", unit: "kWh", peak_timestamp: null },
    { key: "c_04_yesterday_consumption", value: 12.34, name: "Yesterday Consumption", unit: "kWh", peak_timestamp: null },
    { key: "c_05_weekly_consumption", value: 68.9, name: "Weekly Consumption", unit: "kWh", peak_timestamp: null },
    { key: "c_07_monthly_consumption", value: 245.6, name: "Monthly Consumption", unit: "kWh", peak_timestamp: null },
    { key: "c_10_peak_consumption", value: 3.42, name: "Peak Consumption", unit: "kW", peak_timestamp: "2026-02-08T18:30:00Z" },
    { key: "p_01_total_production", value: 3210.5, name: "Total Production", unit: "kWh", peak_timestamp: null },
    { key: "p_04_yesterday_production", value: 8.76, name: "Yesterday Production", unit: "kWh", peak_timestamp: null },
    { key: "p_05_weekly_production", value: 45.2, name: "Weekly Production", unit: "kWh", peak_timestamp: null },
    { key: "p_07_monthly_production", value: 178.4, name: "Monthly Production", unit: "kWh", peak_timestamp: null },
    { key: "p_09_yesterday_exported", value: 5.21, name: "Yesterday Exported", unit: "kWh", peak_timestamp: null },
    { key: "p_12_yesterday_self_consumed", value: 3.55, name: "Yesterday Self-Consumed", unit: "kWh", peak_timestamp: null },
    { key: "g_01_yesterday_consumption", value: 24.5, name: "Gas Yesterday", unit: "kWh", peak_timestamp: null },
    { key: "g_10_yesterday_volume", value: 2.31, name: "Gas Yesterday Volume", unit: "m\u00b3", peak_timestamp: null },
    { key: "g_04_monthly_consumption", value: 512.3, name: "Gas Monthly", unit: "kWh", peak_timestamp: null },
  ],
};

function generateTimeseries(obis: string, baseValue: number, startDate?: Date, endDate?: Date): TimeseriesResponse {
  const { start: defaultStart, end: defaultEnd } = yesterdayRange();
  const start = startDate ?? defaultStart;
  const end = endDate ?? defaultEnd;
  const durationMs = end.getTime() - start.getTime();
  const numIntervals = Math.max(1, Math.min(2000, Math.ceil(durationMs / (15 * 60_000))));

  const items = Array.from({ length: numIntervals }, (_, index) => {
    const timestamp = new Date(start.getTime() + index * 15 * 60_000);
    const hour = timestamp.getHours() + timestamp.getMinutes() / 60;
    let multiplier = 1;
    if (obis.includes(":2.29.0")) {
      multiplier = hour >= 6 && hour <= 20 ? Math.exp(-0.5 * ((hour - 13) / 3) ** 2) : 0;
    } else {
      multiplier = 0.3 + 0.4 * Math.exp(-0.5 * ((hour - 8) / 2) ** 2) + 0.5 * Math.exp(-0.5 * ((hour - 19) / 2) ** 2);
    }
    return {
      value: +(baseValue * multiplier * jitter(1, 0.1)).toFixed(3),
      startedAt: timestamp.toISOString(),
      type: "Measured",
      version: 1,
      calculated: false,
    };
  });

  return { obis, unit: "kW", interval: "PT15M", items };
}

export const demo = {
  async fetchMode(): Promise<AppMode> {
    if (hasProxyUrl()) {
      try {
        return await proxyFetch<AppMode>("/leneda_api/mode");
      } catch {
        return { mode: "standalone", configured: false };
      }
    }
    return { mode: "standalone", configured: false };
  },

  async fetchCredentials(): Promise<Credentials> {
    const proxyUrl = getProxyUrl();
    if (proxyUrl) {
      try {
        const remote = await proxyFetch<Credentials>("/leneda_api/credentials");
        return { ...remote, proxy_url: proxyUrl };
      } catch {
        // Fall back to local draft values if the proxy is offline.
      }
    }

    const creds = loadCreds();
    if (creds) {
      return {
        api_key: creds.api_key ? "\u2022\u2022\u2022\u2022" + creds.api_key.slice(-4) : "",
        energy_id: creds.energy_id,
        meters: creds.meters as MeterConfig[],
        proxy_url: normalizeProxyUrl(creds.proxy_url),
      };
    }

    return {
      api_key: "",
      energy_id: "",
      meters: [{ id: "", types: ["consumption"] }] as MeterConfig[],
      proxy_url: "",
    };
  },

  async saveCredentials(creds: Credentials): Promise<void> {
    const prev = loadCreds() ?? { api_key: "", energy_id: "", meters: [], proxy_url: "" };
    const updated: StoredCreds = {
      api_key: (creds.api_key && !creds.api_key.startsWith("\u2022")) ? creds.api_key : prev.api_key,
      energy_id: creds.energy_id !== undefined ? creds.energy_id : prev.energy_id,
      meters: Array.isArray(creds.meters) ? creds.meters : prev.meters,
      proxy_url: normalizeProxyUrl(creds.proxy_url ?? prev.proxy_url),
    };
    saveCreds(updated);

    if (updated.proxy_url) {
      await proxyFetch<{ status: string }>("/leneda_api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: updated.api_key,
          energy_id: updated.energy_id,
          meters: updated.meters,
        }),
      });
    }
  },

  async testCredentials(creds: Credentials): Promise<{ success: boolean; message: string }> {
    const proxyUrl = normalizeProxyUrl(creds.proxy_url ?? loadCreds()?.proxy_url);
    const testKey = (creds.api_key && !creds.api_key.startsWith("\u2022")) ? creds.api_key : loadCreds()?.api_key ?? "";
    const testEnergyId = creds.energy_id || loadCreds()?.energy_id || "";
    const testMeters = Array.isArray(creds.meters) && creds.meters.length ? creds.meters : loadCreds()?.meters ?? [];
    const firstId = testMeters[0]?.id;

    if (!proxyUrl) {
      return {
        success: false,
        message: "GitHub Pages cannot call the Leneda API directly. Add a proxy URL or use the standalone dashboard / Home Assistant for live data.",
      };
    }

    if (!testKey || !testEnergyId || !firstId) {
      return { success: false, message: "Missing API key, energy ID, or metering point" };
    }

    return proxyFetch<{ success: boolean; message: string }>("/leneda_api/credentials/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: testKey,
        energy_id: testEnergyId,
        meters: testMeters,
      }),
    }, proxyUrl);
  },

  async fetchConfig(): Promise<BillingConfig> {
    if (hasProxyUrl()) {
      return proxyFetch<BillingConfig>("/leneda_api/config");
    }

    const config = loadBilling();
    if (hasRealCreds()) {
      const creds = loadCreds()!;
      (config as BillingConfig & { meters?: MeterConfig[] }).meters = creds.meters.map((meter) => ({
        id: meter.id,
        types: meter.types as MeterConfig["types"],
      }));
      (config as BillingConfig & { meter_has_gas?: boolean }).meter_has_gas = creds.meters.some((meter) => meter.types.includes("gas"));
    }
    return config;
  },

  async saveConfig(partial: Partial<BillingConfig> | Record<string, any>): Promise<void> {
    if (hasProxyUrl()) {
      await proxyFetch<{ status: string }>("/leneda_api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      });
      return;
    }
    const current = loadBilling();
    saveBillingToStorage({ ...current, ...partial } as BillingConfig);
  },

  async resetConfig(): Promise<void> {
    if (hasProxyUrl()) {
      await proxyFetch<{ status: string }>("/leneda_api/config/reset", { method: "POST" });
      return;
    }
    saveBillingToStorage(defaultBilling());
  },

  async fetchRangeData(range: string): Promise<RangeData> {
    if (hasProxyUrl()) {
      return proxyFetch<RangeData>(`/leneda_api/data?range=${encodeURIComponent(range)}`);
    }
    return RANGE_DATA[range] ?? RANGE_DATA.yesterday;
  },

  async fetchCustomData(start: string, end: string): Promise<CustomRangeData> {
    if (hasProxyUrl()) {
      return proxyFetch<CustomRangeData>(
        `/leneda_api/data/custom?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
      );
    }
    return { consumption: 42.5, production: 28.3, peak_power_kw: 5.8, exceedance_kwh: 1.24, start, end };
  },

  async fetchTimeseries(obis: string, start?: string, end?: string): Promise<TimeseriesResponse> {
    if (hasProxyUrl()) {
      let url = `/leneda_api/data/timeseries?obis=${encodeURIComponent(obis)}`;
      if (start) url += `&start=${encodeURIComponent(start)}`;
      if (end) url += `&end=${encodeURIComponent(end)}`;
      return proxyFetch<TimeseriesResponse>(url);
    }
    const base = obis.includes(":2.29.0") ? 4.5 : 2.0;
    return generateTimeseries(obis, base, start ? new Date(start) : undefined, end ? new Date(end) : undefined);
  },

  async fetchPerMeterTimeseries(obis: string, start?: string, end?: string): Promise<PerMeterTimeseriesResponse> {
    if (hasProxyUrl()) {
      let url = `/leneda_api/data/timeseries/per-meter?obis=${encodeURIComponent(obis)}`;
      if (start) url += `&start=${encodeURIComponent(start)}`;
      if (end) url += `&end=${encodeURIComponent(end)}`;
      return proxyFetch<PerMeterTimeseriesResponse>(url);
    }

    const series = generateTimeseries(obis, 4.5, start ? new Date(start) : undefined, end ? new Date(end) : undefined);
    const first = JSON.parse(JSON.stringify(series));
    const second = JSON.parse(JSON.stringify(series));
    first.items.forEach((item: { value: number }) => {
      item.value = +(item.value * 0.6).toFixed(3);
    });
    second.items.forEach((item: { value: number }) => {
      item.value = +(item.value * 0.4).toFixed(3);
    });

    return {
      obis,
      meters: [
        { meter_id: "DEMO_PANEL_1", ...first },
        { meter_id: "DEMO_PANEL_2", ...second },
      ],
    };
  },

  async fetchSensors(): Promise<SensorsResponse> {
    if (hasProxyUrl()) {
      return proxyFetch<SensorsResponse>("/leneda_api/sensors");
    }
    return MOCK_SENSORS;
  },
};
