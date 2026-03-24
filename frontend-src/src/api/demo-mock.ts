/**
 * Browser-side standalone client for GitHub Pages / Demo mode.
 *
 * Mirrors the logic of dev/dev-server-plugin.ts but runs entirely in the
 * browser (no Node.js APIs).
 *
 * - Credentials are stored in localStorage.
 * - When real credentials are saved via Settings → fetches live data
 *   directly from https://api.leneda.eu
 * - When no credentials → returns realistic mock data for demo purposes.
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

// ═══════════════════════════════════════════════════════════════
//  Credential storage (localStorage)
// ═══════════════════════════════════════════════════════════════

interface StoredCreds {
  api_key: string;
  energy_id: string;
  meters: Array<{ id: string; types: string[] }>;
}

const LS_CREDS = "leneda_demo_creds";
const LS_BILLING = "leneda_demo_billing";

function loadCreds(): StoredCreds | null {
  try {
    const s = localStorage.getItem(LS_CREDS);
    if (s) {
      const c = JSON.parse(s) as StoredCreds;
      if (c.api_key && c.energy_id && c.meters?.length) return c;
    }
  } catch { /* ignore */ }
  return null;
}

function saveCreds(creds: StoredCreds): void {
  try { localStorage.setItem(LS_CREDS, JSON.stringify(creds)); } catch { /* */ }
}

function hasRealCreds(): boolean {
  const c = loadCreds();
  return !!(
    c &&
    c.api_key &&
    !c.api_key.startsWith("\u2022") &&
    c.energy_id &&
    c.meters?.length > 0 &&
    c.meters[0].id
  );
}

// ═══════════════════════════════════════════════════════════════
//  Billing config storage (localStorage)
// ═══════════════════════════════════════════════════════════════

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
    const s = localStorage.getItem(LS_BILLING);
    if (s) return JSON.parse(s);
  } catch { /* ignore */ }
  return defaultBilling();
}

function saveBillingToStorage(cfg: BillingConfig): void {
  try { localStorage.setItem(LS_BILLING, JSON.stringify(cfg)); } catch { /* */ }
}

// ═══════════════════════════════════════════════════════════════
//  MOCK data (when no real credentials)
// ═══════════════════════════════════════════════════════════════

function jitter(base: number, pct = 0.15): number {
  return +(base * (1 + (Math.random() * 2 - 1) * pct)).toFixed(4);
}

function yesterdayRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now); start.setDate(start.getDate() - 1); start.setHours(0, 0, 0, 0);
  const end = new Date(start); end.setHours(23, 59, 59, 999);
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
  const { start: defStart, end: defEnd } = yesterdayRange();
  const start = startDate ?? defStart;
  const end = endDate ?? defEnd;
  const durationMs = end.getTime() - start.getTime();
  const numIntervals = Math.max(1, Math.min(2000, Math.ceil(durationMs / (15 * 60_000))));

  const items = Array.from({ length: numIntervals }, (_, i) => {
    const ts = new Date(start.getTime() + i * 15 * 60_000);
    const hour = ts.getHours() + ts.getMinutes() / 60;
    let multiplier = 1;
    if (obis.includes(":2.29.0")) {
      multiplier = hour >= 6 && hour <= 20 ? Math.exp(-0.5 * ((hour - 13) / 3) ** 2) : 0;
    } else {
      multiplier = 0.3 + 0.4 * Math.exp(-0.5 * ((hour - 8) / 2) ** 2) + 0.5 * Math.exp(-0.5 * ((hour - 19) / 2) ** 2);
    }
    return { value: +(baseValue * multiplier * jitter(1, 0.1)).toFixed(3), startedAt: ts.toISOString(), type: "Measured", version: 1, calculated: false };
  });

  return { obis, unit: "kW", interval: "PT15M", items };
}

// ═══════════════════════════════════════════════════════════════
//  Exported demo object — used by leneda.ts when IS_DEMO is true
// ═══════════════════════════════════════════════════════════════

export const demo = {
  // ── Mode ──────────────────────────────────────────────────────
  async fetchMode(): Promise<AppMode> {
    return { mode: "standalone", configured: hasRealCreds() };
  },

  // ── Credentials ───────────────────────────────────────────────
  async fetchCredentials(): Promise<Credentials> {
    const c = loadCreds();
    if (c) {
      return {
        api_key: c.api_key ? "\u2022\u2022\u2022\u2022" + c.api_key.slice(-4) : "",
        energy_id: c.energy_id,
        meters: c.meters as MeterConfig[],
      };
    }
    return { api_key: "", energy_id: "", meters: [{ id: "", types: ["consumption"] }] as MeterConfig[] };
  },

  async saveCredentials(creds: Credentials): Promise<void> {
    const prev = loadCreds() ?? { api_key: "", energy_id: "", meters: [] };
    const updated: StoredCreds = {
      api_key: (creds.api_key && !creds.api_key.startsWith("\u2022")) ? creds.api_key : prev.api_key,
      energy_id: creds.energy_id !== undefined ? creds.energy_id : prev.energy_id,
      meters: Array.isArray(creds.meters) ? creds.meters : prev.meters,
    };
    saveCreds(updated);
  },

  async testCredentials(creds: Credentials): Promise<{ success: boolean; message: string }> {
    const testKey = (creds.api_key && !creds.api_key.startsWith("\u2022")) ? creds.api_key : loadCreds()?.api_key ?? "";
    const testEnergyId = creds.energy_id || loadCreds()?.energy_id || "";
    const testMeters = Array.isArray(creds.meters) && creds.meters.length ? creds.meters : loadCreds()?.meters ?? [];
    const firstId = testMeters[0]?.id;

    if (!testKey || !testEnergyId || !firstId) {
      return { success: false, message: "Missing API key, energy ID, or metering point" };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Connection successful! Tested meter …${firstId.slice(-8)} (Demo Mode)` });
      }, 800);
    });
  },

  // ── Config ────────────────────────────────────────────────────
  async fetchConfig(): Promise<BillingConfig> {
    const cfg = loadBilling();
    // Overlay real meters into config if credentials are saved
    if (hasRealCreds()) {
      const c = loadCreds()!;
      (cfg as any).meters = c.meters.map((m) => ({ id: m.id, types: m.types }));
      (cfg as any).meter_has_gas = c.meters.some((m) => m.types.includes("gas"));
    }
    return cfg;
  },

  async saveConfig(partial: Partial<BillingConfig> | Record<string, any>): Promise<void> {
    const cur = loadBilling();
    saveBillingToStorage({ ...cur, ...partial } as BillingConfig);
  },

  async resetConfig(): Promise<void> {
    saveBillingToStorage(defaultBilling());
  },

  // ── Data (strictly mock) ────────────────
  async fetchRangeData(range: string): Promise<RangeData> {
    return RANGE_DATA[range] ?? RANGE_DATA.yesterday;
  },

  async fetchCustomData(start: string, end: string): Promise<CustomRangeData> {
    return { consumption: 42.5, production: 28.3, peak_power_kw: 5.8, exceedance_kwh: 1.24, start, end };
  },

  async fetchTimeseries(obis: string, start?: string, end?: string): Promise<TimeseriesResponse> {
    const base = obis.includes(":2.29.0") ? 4.5 : 2.0;
    return generateTimeseries(obis, base, start ? new Date(start) : undefined, end ? new Date(end) : undefined);
  },

  async fetchPerMeterTimeseries(obis: string, start?: string, end?: string): Promise<PerMeterTimeseriesResponse> {
    // Static mock: split the single mock timeseries into two fake meters
    const t = generateTimeseries(obis, 4.5, start ? new Date(start) : undefined, end ? new Date(end) : undefined);
    const m1 = JSON.parse(JSON.stringify(t));
    const m2 = JSON.parse(JSON.stringify(t));
    m1.items.forEach((it: any) => it.value = +(it.value * 0.6).toFixed(3));
    m2.items.forEach((it: any) => it.value = +(it.value * 0.4).toFixed(3));

    return {
      obis,
      meters: [
        { meter_id: "DEMO_PANEL_1", ...m1 },
        { meter_id: "DEMO_PANEL_2", ...m2 },
      ],
    };
  },

  async fetchSensors(): Promise<SensorsResponse> {
    return MOCK_SENSORS;
  },
};
