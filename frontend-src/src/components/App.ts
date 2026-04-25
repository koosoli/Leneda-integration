/**
 * LenedaApp — Root application component.
 *
 * Manages tab navigation and delegates rendering to child components.
 */
import {
  fetchRangeData,
  fetchSensors,
  fetchConfig,
  fetchHAEntities,
  fetchMode,
  fetchCredentials,
  fetchTimeseries,
  fetchPerMeterTimeseries,
  type RangeData,
  type TimeRange,
  type SensorsResponse,
  type TimeseriesResponse,
  type PerMeterTimeseriesResponse,
  type BillingConfig,
  type Credentials,
  type MeterConfig,
} from "../api/leneda";
import { renderDashboard } from "./Dashboard";
import { renderAnalysis } from "./Analysis";
import { renderSensors } from "./Sensors";
import { renderInvoice } from "./Invoice";
import { renderSettings } from "./Settings";
import { renderNavBar } from "./NavBar";
import {
  getChartSpanMs,
  getShiftedChartRange,
  getRecommendedChartTimeBucket,
  isChartTimeBucketEnabled,
  type ChartTimeBucket,
} from "../utils/chartTime";

// ── localStorage credential helpers (persist across reloads, never in git) ──

const CREDS_STORAGE_KEY = "leneda_credentials";
const THEME_STORAGE_KEY = "leneda_theme";

function loadLocalCredentials(): Credentials | null {
  try {
    const raw = localStorage.getItem(CREDS_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Credentials;
  } catch { /* corrupt data — ignore */ }
  return null;
}

function saveLocalCredentials(creds: Credentials): void {
  try {
    localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify(creds));
  } catch { /* storage full or private mode — ignore */ }
}

export type ThemeMode = "dark" | "light";

function getPreferredTheme(): ThemeMode {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "dark" || raw === "light") return raw;
  } catch { /* ignore */ }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function saveTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch { /* ignore */ }
}

export type Tab = "dashboard" | "charts" | "sensors" | "invoice" | "settings";
export type AnalysisComparisonMode = "previous" | "last_year";
export type AnalysisHeatmapMetric =
  | "house"
  | "grid"
  | "solar"
  | "exceedance_kwh"
  | "exceedance_frequency";
export type AnalysisProfileMetric = "house" | "grid" | "solar";

export interface AnalysisComparisonData {
  key: string;
  mode: AnalysisComparisonMode;
  start: string;
  end: string;
  consumptionTimeseries: TimeseriesResponse | null;
  productionTimeseries: TimeseriesResponse | null;
  gridImportTimeseries: TimeseriesResponse | null;
  marketExportTimeseries: TimeseriesResponse | null;
}

export interface AppState {
  tab: Tab;
  range: TimeRange;
  customStart: string;
  customEnd: string;
  chartViewportStart: string | null;
  chartViewportEnd: string | null;
  chartUnit: "kw" | "kwh";
  chartTimeBucket: ChartTimeBucket;
  chartConsumptionView: "house" | "grid" | "solar_systems";
  analysisHeatmapMetric: AnalysisHeatmapMetric;
  analysisProfileMetric: AnalysisProfileMetric;
  analysisComparisonMode: AnalysisComparisonMode;
  analysisComparison: AnalysisComparisonData | null;
  analysisComparisonLoading: boolean;
  rangeData: RangeData | null;
  consumptionTimeseries: TimeseriesResponse | null;
  productionTimeseries: TimeseriesResponse | null;
  gridImportTimeseries: TimeseriesResponse | null;
  marketExportTimeseries: TimeseriesResponse | null;
  perMeterProductionTimeseries: PerMeterTimeseriesResponse | null;
  sensors: SensorsResponse | null;
  config: BillingConfig | null;
  loading: boolean;
  error: string | null;
  mode: "ha" | "standalone";
  credentials: Credentials | null;
  isMenuOpen: boolean;
  theme: ThemeMode;
}

function parseDateInputValue(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function formatLocalDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalOffsetIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0");
  const offsetRemainder = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetRemainder}`;
}

function sameLocalDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getPresetRangeBounds(range: Exclude<TimeRange, "custom">, now = new Date()): { start: Date; end: Date } {
  switch (range) {
    case "yesterday": {
      const d = new Date(now);
      d.setDate(d.getDate() - 1);
      d.setHours(0, 0, 0, 0);
      const end = new Date(d);
      end.setHours(23, 59, 59, 999);
      return { start: d, end };
    }
    case "this_week": {
      const d = new Date(now);
      const day = d.getDay() || 7;
      d.setDate(d.getDate() - day + 1);
      d.setHours(0, 0, 0, 0);
      return { start: d, end: now };
    }
    case "last_week": {
      const d = new Date(now);
      const day = d.getDay() || 7;
      const end = new Date(d);
      end.setDate(d.getDate() - day);
      end.setHours(23, 59, 59, 999);
      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case "this_month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { start, end: now };
    }
    case "last_month": {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      return { start, end };
    }
    case "this_year": {
      const start = new Date(now.getFullYear(), 0, 1);
      return { start, end: now };
    }
    case "last_year": {
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
      return { start, end };
    }
  }
}

function matchPresetRange(startValue: string, endValue: string, now = new Date()): Exclude<TimeRange, "custom"> | null {
  const start = parseDateInputValue(startValue);
  const end = parseDateInputValue(endValue);
  if (!start || !end) return null;

  const presetRanges: Array<Exclude<TimeRange, "custom">> = [
    "yesterday",
    "this_week",
    "last_week",
    "this_month",
    "last_month",
    "this_year",
    "last_year",
  ];

  for (const range of presetRanges) {
    const bounds = getPresetRangeBounds(range, now);
    if (sameLocalDate(start, bounds.start) && sameLocalDate(end, bounds.end)) {
      return range;
    }
  }

  return null;
}

export class LenedaApp {
  private root: HTMLElement;
  private state: AppState = {
    tab: "dashboard",
    range: "yesterday",
    customStart: "",
    customEnd: "",
    chartViewportStart: null,
    chartViewportEnd: null,
    chartUnit: "kwh",
    chartTimeBucket: "quarter_hour",
    chartConsumptionView: "grid",
    analysisHeatmapMetric: "grid",
    analysisProfileMetric: "house",
    analysisComparisonMode: "previous",
    analysisComparison: null,
    analysisComparisonLoading: false,
    rangeData: null,
    consumptionTimeseries: null,
    productionTimeseries: null,
    gridImportTimeseries: null,
    marketExportTimeseries: null,
    perMeterProductionTimeseries: null,
    sensors: null,
    config: null,
    loading: true,
    error: null,
    mode: "ha",
    credentials: null,
    isMenuOpen: false,
    theme: getPreferredTheme(),
  };

  /** Pre-zoom state — restored when user clicks "Reset Zoom" */
  private preZoomRange: TimeRange | null = null;
  private preZoomCustomStart = "";
  private preZoomCustomEnd = "";

  constructor(root: HTMLElement) {
    this.root = root;
  }

  async mount(): Promise<void> {
    this.applyTheme();
    this.render();

    // Detect deployment mode first
    const modeInfo = await fetchMode();
    this.state.mode = modeInfo.mode;

    if (modeInfo.mode === "standalone") {
      // Load credentials from browser localStorage (instant, reliable)
      const localCreds = loadLocalCredentials();
      if (localCreds) {
        this.state.credentials = localCreds;
      }

      // In demo mode (GitHub Pages), always proceed to dashboard —
      // demo-mock.ts returns mock data when no credentials are saved.
      const isDemo = !!import.meta.env.VITE_DEMO_MODE;

      if (!isDemo && !modeInfo.configured && !localCreds) {
        // Not configured — send user to Settings to enter credentials
        this.state.tab = "settings";
        this.state.loading = false;
        // Clear the global error so the settings form stays visible for first-time setup.
        this.state.error = null;
        this.render();
        return;
      }

      // If we have local creds but server says not configured, push them to server
      if (!modeInfo.configured && localCreds) {
        try {
          const { saveCredentials: save } = await import("../api/leneda");
          await save(localCreds);
        } catch { /* best effort */ }
      }

      // If no local creds, try fetching from server as fallback
      if (!localCreds) {
        try {
          this.state.credentials = await fetchCredentials();
        } catch { /* ignore */ }
      }
    }

    await this.loadData();
  }

  private toDisplayError(error: unknown, fallback = "Failed to load data"): string {
    const message = error instanceof Error ? error.message : String(error ?? "").trim();
    const normalized = message.toLowerCase();
    if (
      normalized.includes("missing data") ||
      normalized.includes("no_data") ||
      normalized.includes("no data")
    ) {
      return "Missing data";
    }
    return message || fallback;
  }

  private clearRangeStateWithError(error: unknown, fallback = "Failed to load data"): void {
    this.state.rangeData = null;
    this.state.consumptionTimeseries = null;
    this.state.productionTimeseries = null;
    this.state.gridImportTimeseries = null;
    this.state.marketExportTimeseries = null;
    this.state.perMeterProductionTimeseries = null;
    this.clearChartViewport();
    this.state.analysisComparison = null;
    this.state.analysisComparisonLoading = false;
    this.state.error = this.toDisplayError(error, fallback);
  }

  private async fetchPerMeterProductionForRange(
    config: BillingConfig | null,
    start: string,
    end: string,
  ): Promise<PerMeterTimeseriesResponse | null> {
    const productionMeters = (config?.meters ?? []).filter((meter) => meter.types.includes("production"));
    if (productionMeters.length <= 1) {
      return null;
    }

    try {
      const perMeter = await fetchPerMeterTimeseries("1-1:2.29.0", start, end);
      return perMeter.meters?.length ? perMeter : null;
    } catch (error) {
      console.warn("Per-meter production fetch failed:", error);
      return null;
    }
  }

  private async fetchEnergyFlowTimeseries(
    start: string,
    end: string,
  ): Promise<{
    consumptionTimeseries: TimeseriesResponse;
    productionTimeseries: TimeseriesResponse;
    gridImportTimeseries: TimeseriesResponse;
    marketExportTimeseries: TimeseriesResponse;
  }> {
    const [
      consumptionTimeseries,
      productionTimeseries,
      gridImportTimeseries,
      marketExportTimeseries,
    ] = await Promise.all([
      fetchTimeseries("1-1:1.29.0", start, end),
      fetchTimeseries("1-1:2.29.0", start, end),
      fetchTimeseries("1-65:1.29.9", start, end),
      fetchTimeseries("1-65:2.29.9", start, end),
    ]);

    return {
      consumptionTimeseries,
      productionTimeseries,
      gridImportTimeseries,
      marketExportTimeseries,
    };
  }

  private resetAnalysisComparison(): void {
    this.state.analysisComparison = null;
    this.state.analysisComparisonLoading = false;
  }

  private clearChartViewport(): void {
    this.state.chartViewportStart = null;
    this.state.chartViewportEnd = null;
  }

  private normalizeChartTimeBucket(): void {
    const { start, end } = this.getDateRangeISO();
    const nextBucket = getRecommendedChartTimeBucket(
      getChartSpanMs(start, end),
      this.state.chartTimeBucket,
    );
    if (nextBucket !== this.state.chartTimeBucket) {
      this.state.chartTimeBucket = nextBucket;
    }
  }

  private getCurrentRangeKey(): string {
    const { start, end } = this.getDateRangeISO();
    return `${start}|${end}`;
  }

  private shiftIsoByYears(value: string, yearDelta: number): string {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return value;
    const shifted = new Date(date);
    shifted.setUTCFullYear(shifted.getUTCFullYear() + yearDelta);
    return shifted.toISOString();
  }

  private getComparisonRangeISO(
    currentStartIso: string,
    currentEndIso: string,
    mode: AnalysisComparisonMode,
  ): { start: string; end: string } {
    if (mode === "last_year") {
      return {
        start: this.shiftIsoByYears(currentStartIso, -1),
        end: this.shiftIsoByYears(currentEndIso, -1),
      };
    }

    const currentStartMs = new Date(currentStartIso).getTime();
    const currentEndMs = new Date(currentEndIso).getTime();
    const durationMs = Math.max(0, currentEndMs - currentStartMs);
    const previousEndMs = currentStartMs - 1;
    const previousStartMs = previousEndMs - durationMs;

    return {
      start: new Date(previousStartMs).toISOString(),
      end: new Date(previousEndMs).toISOString(),
    };
  }

  private async loadAnalysisComparison(force = false): Promise<void> {
    if (!this.state.consumptionTimeseries || !this.state.productionTimeseries) return;

    const { start, end } = this.getDateRangeISO();
    const mode = this.state.analysisComparisonMode;
    const key = `${start}|${end}|${mode}`;
    if (!force) {
      if (this.state.analysisComparisonLoading) return;
      if (this.state.analysisComparison?.key === key) return;
    }

    const comparisonRange = this.getComparisonRangeISO(start, end, mode);
    this.state.analysisComparisonLoading = true;
    if (this.state.tab === "charts") {
      this.renderPreserveMainScroll();
    }

    try {
      const {
        consumptionTimeseries: comparisonConsumption,
        productionTimeseries: comparisonProduction,
        gridImportTimeseries: comparisonGridImport,
        marketExportTimeseries: comparisonMarketExport,
      } = await this.fetchEnergyFlowTimeseries(comparisonRange.start, comparisonRange.end);

      if (key !== this.getCurrentRangeKey()) return;

      this.state.analysisComparison = {
        key,
        mode,
        start: comparisonRange.start,
        end: comparisonRange.end,
        consumptionTimeseries: comparisonConsumption,
        productionTimeseries: comparisonProduction,
        gridImportTimeseries: comparisonGridImport,
        marketExportTimeseries: comparisonMarketExport,
      };
    } catch (error) {
      console.warn("Comparison data fetch failed:", error);
      if (key === this.getCurrentRangeKey()) {
        this.state.analysisComparison = null;
      }
    } finally {
      if (key === this.getCurrentRangeKey()) {
        this.state.analysisComparisonLoading = false;
        if (this.state.tab === "charts") {
          this.renderPreserveMainScroll();
        }
      }
    }
  }

  private async loadData(): Promise<void> {
    this.state.loading = true;
    this.state.error = null;
    this.state.rangeData = null; // Clear stale data before fetching
    this.clearChartViewport();
    this.resetAnalysisComparison();
    this.render();

    try {
      const [rangeData, sensors, config] = await Promise.all([
        fetchRangeData(this.state.range),
        fetchSensors(),
        fetchConfig(),
      ]);
      const { start, end } = this.getDateRangeISO();
      const [energyFlowTimeseries, perMeterProductionTimeseries] = await Promise.all([
        this.fetchEnergyFlowTimeseries(start, end),
        this.fetchPerMeterProductionForRange(config, start, end),
      ]);
      this.state.rangeData = rangeData;
      this.state.consumptionTimeseries = energyFlowTimeseries.consumptionTimeseries;
      this.state.productionTimeseries = energyFlowTimeseries.productionTimeseries;
      this.state.gridImportTimeseries = energyFlowTimeseries.gridImportTimeseries;
      this.state.marketExportTimeseries = energyFlowTimeseries.marketExportTimeseries;
      this.state.perMeterProductionTimeseries = perMeterProductionTimeseries;
      this.state.sensors = sensors;
      this.state.config = config;
    } catch (e) {
      this.clearRangeStateWithError(e, "Failed to load data");
    } finally {
      this.state.loading = false;
      this.render();
      if (this.state.tab === "charts" && this.state.rangeData) {
        void this.loadAnalysisComparison();
      }
    }
  }

  private async changeRange(range: TimeRange): Promise<void> {
    this.preZoomRange = null;
    this.clearChartViewport();
    this.state.range = range;
    this.resetAnalysisComparison();

    if (range === "custom") {
      // Set default dates (last 7 days) if not already set
      if (!this.state.customStart || !this.state.customEnd) {
        const end = new Date();
        end.setDate(end.getDate() - 1);
        const start = new Date(end);
        start.setDate(start.getDate() - 6);
        this.state.customStart = formatLocalDateInput(start);
        this.state.customEnd = formatLocalDateInput(end);
      }
      // Just show the picker — don't fetch until Apply is clicked
      this.render();
      return;
    }

    this.state.error = null;
    this.state.loading = true;
    this.render();
    try {
      const { start, end } = this.getDateRangeISO();
      const [rangeData, energyFlowTimeseries, perMeterProductionTimeseries] = await Promise.all([
        fetchRangeData(range),
        this.fetchEnergyFlowTimeseries(start, end),
        this.fetchPerMeterProductionForRange(this.state.config, start, end),
      ]);
      this.state.rangeData = rangeData;
      this.state.consumptionTimeseries = energyFlowTimeseries.consumptionTimeseries;
      this.state.productionTimeseries = energyFlowTimeseries.productionTimeseries;
      this.state.gridImportTimeseries = energyFlowTimeseries.gridImportTimeseries;
      this.state.marketExportTimeseries = energyFlowTimeseries.marketExportTimeseries;
      this.state.perMeterProductionTimeseries = perMeterProductionTimeseries;
    } catch (e) {
      this.clearRangeStateWithError(e, "Missing data");
    } finally {
      this.state.loading = false;
      this.render();
      if (this.state.tab === "charts" && this.state.rangeData) {
        void this.loadAnalysisComparison();
      }
    }
  }

  private async applyCustomRange(): Promise<void> {
    this.preZoomRange = null;
    this.clearChartViewport();
    const { customStart, customEnd } = this.state;
    if (!customStart || !customEnd) return;

    this.state.error = null;
    this.state.loading = true;
    this.resetAnalysisComparison();
    this.render();

    try {
      const matchedPreset = matchPresetRange(customStart, customEnd);
      const dataPromise = matchedPreset
        ? fetchRangeData(matchedPreset)
        : import("../api/leneda").then(({ fetchCustomData }) => fetchCustomData(customStart, customEnd));
      const config = this.state.config;
      const startIso = toLocalOffsetIso(new Date(customStart + "T00:00:00"));
      const endIso = toLocalOffsetIso(new Date(customEnd + "T23:59:59.999"));
      const [data, energyFlowTimeseries, perMeterProductionTimeseries] = await Promise.all([
        dataPromise,
        this.fetchEnergyFlowTimeseries(startIso, endIso),
        this.fetchPerMeterProductionForRange(config, startIso, endIso),
      ]);
      this.state.rangeData = {
        range: "custom",
        consumption: data.consumption,
        production: data.production,
        exported: data.exported ?? 0,
        self_consumed: data.self_consumed ?? 0,
        grid_import: data.grid_import,
        solar_to_home: data.solar_to_home,
        direct_solar_to_home: data.direct_solar_to_home,
        shared: data.shared,
        shared_with_me: data.shared_with_me,
        gas_energy: data.gas_energy ?? 0,
        gas_volume: data.gas_volume ?? 0,
        peak_power_kw: data.peak_power_kw ?? 0,
        exceedance_kwh: data.exceedance_kwh ?? 0,
        metering_point: data.metering_point ?? "",
        start: data.start ?? customStart,
        end: data.end ?? customEnd,
      };
      this.state.consumptionTimeseries = energyFlowTimeseries.consumptionTimeseries;
      this.state.productionTimeseries = energyFlowTimeseries.productionTimeseries;
      this.state.gridImportTimeseries = energyFlowTimeseries.gridImportTimeseries;
      this.state.marketExportTimeseries = energyFlowTimeseries.marketExportTimeseries;
      this.state.perMeterProductionTimeseries = perMeterProductionTimeseries;
    } catch (e) {
      this.clearRangeStateWithError(e, "Missing data");
    } finally {
      this.state.loading = false;
      this.render();
      if (this.state.tab === "charts" && this.state.rangeData) {
        void this.loadAnalysisComparison();
      }
    }
  }

  private async shiftChartPeriod(direction: -1 | 1): Promise<void> {
    const { start, end } = this.getDateRangeISO();
    const nextRange = getShiftedChartRange(start, end, this.state.chartTimeBucket, direction);
    if (!nextRange) return;
    await this.handleChartZoomChange(
      toLocalOffsetIso(nextRange.start),
      toLocalOffsetIso(nextRange.end),
    );
  }

  private changeTab(tab: Tab): void {
    this.state.tab = tab;
    this.render();

    // Lazy-load data for specific tabs
    if ((tab === "dashboard" || tab === "charts") && !this.state.rangeData && !this.state.loading) {
      this.loadData();
    }
    if (tab === "charts" && this.state.rangeData) {
      void this.loadAnalysisComparison();
    }
    if (tab === "sensors" && !this.state.sensors) {
      fetchSensors().then((s) => {
        this.state.sensors = s;
        this.render();
      });
    }
    if (tab === "settings" && !this.state.config) {
      fetchConfig().then((c) => {
        this.state.config = c;
        this.render();
      });
    }

    // Close mobile menu on tab change
    this.state.isMenuOpen = false;
  }

  private toggleMenu(): void {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.render();
  }

  private applyTheme(): void {
    document.documentElement.dataset.theme = this.state.theme;
  }

  private setTheme(theme: ThemeMode): void {
    if (theme === this.state.theme) return;
    this.state.theme = theme;
    saveTheme(theme);
    this.applyTheme();
    this.render();
  }

  private toggleTheme(): void {
    this.setTheme(this.state.theme === "dark" ? "light" : "dark");
  }

  private printInvoice(): void {
    const previousTitle = document.title;
    const rangeSuffix = this.state.rangeData?.start && this.state.rangeData?.end
      ? `${this.state.rangeData.start.slice(0, 10)}_to_${this.state.rangeData.end.slice(0, 10)}`
      : this.state.range;
    const nextTitle = `Leneda-invoice-${rangeSuffix}`.replace(/[^a-z0-9_-]+/gi, "-");
    let restored = false;

    const restoreTitle = (): void => {
      if (restored) return;
      restored = true;
      document.title = previousTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };

    document.title = nextTitle;
    window.addEventListener("afterprint", restoreTitle, { once: true });
    window.print();
    window.setTimeout(restoreTitle, 1000);
  }

  private getMainContentScrollTop(): number {
    const main = this.root.querySelector(".main-content") as HTMLElement | null;
    if (main) return main.scrollTop;
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  private restoreMainContentScrollTop(scrollTop: number): void {
    requestAnimationFrame(() => {
      const main = this.root.querySelector(".main-content") as HTMLElement | null;
      if (main) {
        main.scrollTop = scrollTop;
      } else {
        window.scrollTo({ top: scrollTop });
      }
    });
  }

  private renderPreserveMainScroll(): void {
    const scrollTop = this.getMainContentScrollTop();
    this.render();
    this.restoreMainContentScrollTop(scrollTop);
  }

  private getDataSourceLabel(): string {
    if (this.state.mode === "ha") return "Home Assistant";
    if (!!import.meta.env.VITE_DEMO_MODE) {
      return (this.state.credentials?.proxy_url ?? "").trim() ? "Proxy Mode" : "Demo Data";
    }
    return "Standalone";
  }

  private getHostedDataNoticeHtml(): string {
    const isDemoBuild = !!import.meta.env.VITE_DEMO_MODE;
    const hasProxy = (this.state.credentials?.proxy_url ?? "").trim().length > 0;
    if (!isDemoBuild || hasProxy) return "";

    return `
      <section class="app-notice app-notice-info">
        <strong>Demo Data</strong>
        <p>This hosted dashboard is showing demo data. For live data, use Home Assistant, the standalone app, or connect a proxy in Settings.</p>
      </section>
    `;
  }

  private render(): void {
    const { tab, loading, error, theme } = this.state;
    const dataSourceLabel = this.getDataSourceLabel();
    const hostedDataNotice = this.getHostedDataNoticeHtml();

    // ── Skeleton while loading ──
    if (loading && !this.state.rangeData) {
      this.root.innerHTML = `
        <div class="app-shell">
          ${renderNavBar(tab, (_t) => { }, false, theme, dataSourceLabel)}
          <main class="main-content">
            ${hostedDataNotice}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading Leneda data…</p>
            </div>
          </main>
        </div>
      `;
      this.attachNavListeners();
      return;
    }

    // ── Error state ──
    if (error && !this.state.rangeData) {
      const missingData = error.toLowerCase().includes("missing data");
      this.root.innerHTML = `
        <div class="app-shell">
          ${renderNavBar(tab, (_t) => { }, false, theme, dataSourceLabel)}
          <main class="main-content">
            ${hostedDataNotice}
            <div class="error-state">
              <h2>${missingData ? "Missing Data" : "Connection Error"}</h2>
              <p>${missingData ? "The selected period could not be loaded because data is missing." : error}</p>
              <button class="btn btn-primary" id="retry-btn">Retry</button>
            </div>
          </main>
        </div>
      `;
      this.attachNavListeners();
      this.root.querySelector("#retry-btn")?.addEventListener("click", () => this.loadData());
      return;
    }

    // ── Normal render ──
    if (this.state.rangeData) {
      this.normalizeChartTimeBucket();
    }

    let tabContent = "";
    switch (tab) {
      case "dashboard":
        tabContent = renderDashboard(this.state);
        break;
      case "charts":
        tabContent = renderAnalysis(this.state);
        break;
      case "sensors":
        tabContent = renderSensors(this.state.sensors);
        break;
      case "invoice":
        tabContent = renderInvoice(this.state);
        break;
      case "settings":
        tabContent = renderSettings(this.state.config, this.state.mode, this.state.credentials);
        break;
    }

    this.root.innerHTML = `
      <div class="app-shell">
        ${renderNavBar(tab, (t) => this.changeTab(t), this.state.isMenuOpen, theme, dataSourceLabel)}
        <main class="main-content">
          ${hostedDataNotice}
          ${loading ? '<div class="loading-bar"></div>' : ""}
          ${tabContent}
        </main>
      </div>
    `;

    // ── Attach event listeners ──
    this.attachNavListeners();
    this.attachDashboardListeners();
    this.attachAnalysisListeners();
    this.attachInvoiceListeners();
    this.attachSettingsListeners();
  }

  private attachNavListeners(): void {
    // Mobile menu toggle
    this.root.querySelector(".menu-toggle")?.addEventListener("click", () => {
      this.toggleMenu();
    });

    this.root.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      this.toggleTheme();
    });

    this.root.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = (btn as HTMLElement).dataset.tab as Tab;
        this.changeTab(tab);
      });
    });
  }

  private attachDashboardListeners(skipChart = false): void {
    // Range selector buttons
    this.root.querySelectorAll("[data-range]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const range = (btn as HTMLElement).dataset.range as TimeRange;
        this.changeRange(range);
      });
    });

    // Custom range: date inputs + apply button
    const startInput = this.root.querySelector("#custom-start") as HTMLInputElement | null;
    const endInput = this.root.querySelector("#custom-end") as HTMLInputElement | null;
    if (startInput) startInput.addEventListener("change", () => { this.state.customStart = startInput.value; });
    if (endInput) endInput.addEventListener("change", () => { this.state.customEnd = endInput.value; });

    const applyBtn = this.root.querySelector("#apply-custom-range");
    applyBtn?.addEventListener("click", () => this.applyCustomRange());

    // Chart unit toggle (kW / kWh)
    this.root.querySelectorAll("[data-chart-unit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const unit = (btn as HTMLElement).dataset.chartUnit as "kw" | "kwh";
        if (unit !== this.state.chartUnit) {
          this.state.chartUnit = unit;
          this.renderPreserveMainScroll();
        }
      });
    });

    this.root.querySelectorAll("[data-chart-bucket]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bucket = (btn as HTMLElement).dataset.chartBucket as ChartTimeBucket;
        const { start, end } = this.getDateRangeISO();
        if (!isChartTimeBucketEnabled(bucket, getChartSpanMs(start, end))) return;
        if (bucket !== this.state.chartTimeBucket) {
          this.state.chartTimeBucket = bucket;
          this.renderPreserveMainScroll();
        }
      });
    });

    this.root.querySelectorAll("[data-chart-period-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const direction = (btn as HTMLElement).dataset.chartPeriodNav === "next" ? 1 : -1;
        void this.shiftChartPeriod(direction);
      });
    });

    this.root.querySelectorAll("[data-chart-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = (btn as HTMLElement).dataset.chartView as "house" | "grid" | "solar_systems";
        if (view !== this.state.chartConsumptionView) {
          this.state.chartConsumptionView = view;
          this.renderPreserveMainScroll();
        }
      });
    });

    // Initialize chart if canvas is present (skip during partial zoom updates)
    if (!skipChart) {
      const canvas = this.root.querySelector("#energy-chart") as HTMLCanvasElement | null;
      if (canvas && this.state.rangeData) {
        this.initChart(canvas);
      }
    }

    // Reset zoom button — restores the range that was active before zooming
    const resetZoomBtn = this.root.querySelector(".reset-zoom-btn");
    resetZoomBtn?.addEventListener("click", async () => {
      const { resetChartZoom } = await import("./Charts");
      resetChartZoom();
      (resetZoomBtn as HTMLElement).style.display = "none";
      this.clearChartViewport();

      if (this.preZoomRange !== null) {
        const origRange = this.preZoomRange;
        this.state.customStart = this.preZoomCustomStart;
        this.state.customEnd = this.preZoomCustomEnd;
        this.preZoomRange = null;
        this.preZoomCustomStart = "";
        this.preZoomCustomEnd = "";

        if (origRange === "custom") {
          this.state.range = "custom";
          this.applyCustomRange();
        } else {
          this.changeRange(origRange);
        }
      } else {
        this.changeRange(this.state.range === "custom" ? "yesterday" : this.state.range);
      }
    });
  }

  private attachAnalysisListeners(): void {
    this.root.querySelectorAll("[data-analysis-heatmap]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const metric = (btn as HTMLElement).dataset.analysisHeatmap as AnalysisHeatmapMetric;
        if (metric !== this.state.analysisHeatmapMetric) {
          this.state.analysisHeatmapMetric = metric;
          this.renderPreserveMainScroll();
        }
      });
    });

    this.root.querySelectorAll("[data-analysis-profile]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const metric = (btn as HTMLElement).dataset.analysisProfile as AnalysisProfileMetric;
        if (metric !== this.state.analysisProfileMetric) {
          this.state.analysisProfileMetric = metric;
          this.renderPreserveMainScroll();
        }
      });
    });

    this.root.querySelectorAll("[data-analysis-comparison-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = (btn as HTMLElement).dataset.analysisComparisonMode as AnalysisComparisonMode;
        if (mode !== this.state.analysisComparisonMode) {
          this.state.analysisComparisonMode = mode;
          this.state.analysisComparison = null;
          void this.loadAnalysisComparison(true);
        }
      });
    });
  }

  private attachInvoiceListeners(): void {
    this.root.querySelector("#print-invoice-btn")?.addEventListener("click", () => {
      this.printInvoice();
    });
  }

  private attachSettingsListeners(): void {
    // ── Credentials form (standalone mode only) ──
    const credsForm = this.root.querySelector("#credentials-form") as HTMLFormElement | null;
    if (credsForm) {

      // ── Add / Remove meter buttons ──
      const addMeterBtn = this.root.querySelector("#add-meter-btn");
      addMeterBtn?.addEventListener("click", () => {
        // Collect current form state so typed values aren't lost on re-render
        const fd = new FormData(credsForm);
        const meters = collectMetersFromForm(fd);
        if (meters.length < 10) {
          meters.push({ id: "", types: ["consumption"] });
          const updated: Credentials = {
            api_key: (fd.get("api_key") as string) || this.state.credentials?.api_key || "",
            energy_id: (fd.get("energy_id") as string) || this.state.credentials?.energy_id || "",
            meters,
            proxy_url: (fd.get("proxy_url") as string) || this.state.credentials?.proxy_url || "",
          };
          this.state.credentials = updated;
          saveLocalCredentials(updated);
          this.renderPreserveMainScroll();
        }
      });

      this.root.querySelectorAll(".remove-meter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt((btn as HTMLElement).dataset.meter ?? "0", 10);
          // Collect current form state so typed values aren't lost on re-render
          const fd = new FormData(credsForm);
          const meters = collectMetersFromForm(fd);
          meters.splice(idx, 1);
          const updated: Credentials = {
            api_key: (fd.get("api_key") as string) || this.state.credentials?.api_key || "",
            energy_id: (fd.get("energy_id") as string) || this.state.credentials?.energy_id || "",
            meters,
            proxy_url: (fd.get("proxy_url") as string) || this.state.credentials?.proxy_url || "",
          };
          this.state.credentials = updated;
          saveLocalCredentials(updated);
          this.renderPreserveMainScroll();
        });
      });

      /** Collect meters array from form fields */
      const collectMetersFromForm = (fd: FormData): MeterConfig[] => {
        const meters: MeterConfig[] = [];
        for (let i = 0; i < 10; i++) {
          const id = fd.get(`meter_${i}_id`) as string | null;
          if (id === null) break; // no more meters in form
          const types: MeterConfig["types"] = [];
          if ((credsForm.querySelector(`[name="meter_${i}_consumption"]`) as HTMLInputElement)?.checked) types.push("consumption");
          if ((credsForm.querySelector(`[name="meter_${i}_production"]`) as HTMLInputElement)?.checked) types.push("production");
          if ((credsForm.querySelector(`[name="meter_${i}_gas"]`) as HTMLInputElement)?.checked) types.push("gas");
          meters.push({ id: id.trim(), types });
        }
        return meters;
      };

      credsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = new FormData(credsForm);
        const creds: Credentials = {
          api_key: fd.get("api_key") as string,
          energy_id: fd.get("energy_id") as string,
          meters: collectMetersFromForm(fd),
          proxy_url: fd.get("proxy_url") as string,
        };
        const statusEl = this.root.querySelector("#creds-status");
        try {
          // Save to localStorage (browser-side persistence)
          saveLocalCredentials(creds);
          // Also push to server (for API proxying in standalone mode)
          const { saveCredentials: save } = await import("../api/leneda");
          await save(creds);
          if (statusEl) statusEl.innerHTML = '<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ Credentials saved. Reloading data…</p>';
          // Update state from localStorage (source of truth — unmasked)
          this.state.credentials = creds;
          this.state.error = null;
          const isDemoBuild = !!import.meta.env.VITE_DEMO_MODE;
          const proxyUrl = (creds.proxy_url ?? "").trim();
          if (isDemoBuild && !proxyUrl) {
            if (statusEl) {
              statusEl.innerHTML = '<p style="color: var(--clr-warning); padding: var(--sp-3) 0;">Live credentials were saved locally, but GitHub Pages still needs a proxy URL to show live data. Until then this hosted dashboard will stay on demo data.</p>';
            }
            return;
          }
          await this.loadData();
        } catch (err) {
          if (statusEl) statusEl.innerHTML = `<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Save failed: ${err instanceof Error ? err.message : err}</p>`;
        }
      });

      const testBtn = this.root.querySelector("#test-creds-btn");
      testBtn?.addEventListener("click", async () => {
        const fd = new FormData(credsForm);
        const creds: Credentials = {
          api_key: fd.get("api_key") as string,
          energy_id: fd.get("energy_id") as string,
          meters: collectMetersFromForm(fd),
          proxy_url: fd.get("proxy_url") as string,
        };
        const statusEl = this.root.querySelector("#creds-status");
        if (statusEl) statusEl.innerHTML = '<p style="color: var(--clr-muted); padding: var(--sp-3) 0;">Testing connection…</p>';
        try {
          const { testCredentials: test } = await import("../api/leneda");
          const result = await test(creds);
          if (statusEl) {
            statusEl.innerHTML = result.success
              ? `<p style="color: var(--clr-production); padding: var(--sp-3) 0;">✓ ${result.message}</p>`
              : `<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ ${result.message}</p>`;
          }
        } catch (err) {
          if (statusEl) statusEl.innerHTML = `<p style="color: var(--clr-danger); padding: var(--sp-3) 0;">✗ Test failed: ${err instanceof Error ? err.message : err}</p>`;
        }
      });
    }

    // ── Billing config form ──
    const form = this.root.querySelector("#settings-form") as HTMLFormElement | null;
    if (!form) return;

    const collectConsumptionWindowsFromForm = (fd: FormData) => {
      const windows = [];
      for (let i = 0; i < 24; i++) {
        const label = fd.get(`consumption_window_${i}_label`) as string | null;
        const dayGroup = fd.get(`consumption_window_${i}_day_group`) as string | null;
        const startTime = fd.get(`consumption_window_${i}_start_time`) as string | null;
        const endTime = fd.get(`consumption_window_${i}_end_time`) as string | null;
        const rate = fd.get(`consumption_window_${i}_rate`) as string | null;
        if (label === null && dayGroup === null && startTime === null && endTime === null && rate === null) break;
        windows.push({
          label: (label ?? "").trim() || `Window ${i + 1}`,
          day_group: (dayGroup ?? "all"),
          start_time: startTime ?? "00:00",
          end_time: endTime ?? "06:00",
          rate: parseFloat(rate ?? "0") || 0,
        });
      }
      return windows;
    };

    const collectReferenceWindowsFromForm = (fd: FormData) => {
      const windows = [];
      for (let i = 0; i < 24; i++) {
        const label = fd.get(`reference_window_${i}_label`) as string | null;
        const dayGroup = fd.get(`reference_window_${i}_day_group`) as string | null;
        const startTime = fd.get(`reference_window_${i}_start_time`) as string | null;
        const endTime = fd.get(`reference_window_${i}_end_time`) as string | null;
        const refPower = fd.get(`reference_window_${i}_reference_power_kw`) as string | null;
        if (label === null && dayGroup === null && startTime === null && endTime === null && refPower === null) break;
        windows.push({
          label: (label ?? "").trim() || `Reference ${i + 1}`,
          day_group: (dayGroup ?? "all"),
          start_time: startTime ?? "17:00",
          end_time: endTime ?? "00:00",
          reference_power_kw: parseFloat(refPower ?? "0") || 0,
        });
      }
      return windows;
    };

    const buildConfigPayload = (): Record<string, number | string | boolean | unknown[]> => {
      const fd = new FormData(form);
      const data: Record<string, number | string | boolean | unknown[]> = {};

      // Collect all checkboxes first (unchecked ones aren't in FormData)
      form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((cb) => {
        data[cb.name] = cb.checked;
      });

      // Collect per-meter feed-in rates
      const feedInRates: Array<{
        meter_id: string;
        mode: string;
        tariff: number;
        sensor_entity: string;
        self_use_priority: number;
      }> = [];
      const ratePattern = /^feed_in_rate_(\d+)_(.+)$/;
      const rateMap: Record<string, Record<string, string>> = {};

      // Collect per-meter monthly fees
      const meterFees: Array<{ meter_id: string; label: string; fee: number }> = [];
      const feePattern = /^meter_fee_(\d+)_(.+)$/;
      const feeMap: Record<string, Record<string, string>> = {};

      for (const [key, val] of fd.entries()) {
        if (key.startsWith("consumption_window_") || key.startsWith("reference_window_")) {
          continue;
        }
        const m = key.match(ratePattern);
        if (m) {
          const idx = m[1];
          const field = m[2];
          if (!rateMap[idx]) rateMap[idx] = {};
          rateMap[idx][field] = val as string;
          continue;
        }
        const mf = key.match(feePattern);
        if (mf) {
          const idx = mf[1];
          const field = mf[2];
          if (!feeMap[idx]) feeMap[idx] = {};
          feeMap[idx][field] = val as string;
          continue;
        }
        if (data[key] !== undefined && typeof data[key] === "boolean") continue;
        const rawValue = val as string;
        const fieldEl = form.elements.namedItem(key);
        if (rawValue === "" && fieldEl instanceof HTMLInputElement && fieldEl.type === "number") {
          const currentValue = this.state.config?.[key as keyof BillingConfig];
          if (typeof currentValue === "number" && isFinite(currentValue)) {
            data[key] = currentValue;
          }
          continue;
        }
        const num = parseFloat(rawValue);
        data[key] = isNaN(num) ? rawValue : num;
      }

      for (const idx of Object.keys(rateMap).sort()) {
        const rm = rateMap[idx];
        const mode = rm.mode ?? "fixed";
        const effectiveTariffStr = mode === "sensor" ? (rm.fallback_tariff ?? rm.tariff) : rm.tariff;
        feedInRates.push({
          meter_id: rm.meter_id ?? "",
          mode: mode,
          tariff: parseFloat(effectiveTariffStr ?? "0.08") || 0.08,
          sensor_entity: rm.sensor_entity ?? "",
          self_use_priority: Math.max(1, parseInt(rm.self_use_priority ?? `${Number(idx) + 1}`, 10) || Number(idx) + 1),
        });
      }
      if (feedInRates.length > 0) data.feed_in_rates = feedInRates;

      for (const idx of Object.keys(feeMap).sort()) {
        const fm = feeMap[idx];
        meterFees.push({
          meter_id: fm.meter_id ?? "",
          label: fm.label ?? "",
          fee: parseFloat(fm.fee ?? "0") || 0,
        });
      }
      if (meterFees.length > 0) data.meter_monthly_fees = meterFees;

      data.consumption_rate_windows = collectConsumptionWindowsFromForm(fd);
      data.reference_power_windows = collectReferenceWindowsFromForm(fd);

      return data;
    };

    const applyDraftConfigToState = (mutate: (draft: Record<string, number | string | boolean | unknown[]>) => void) => {
      if (!this.state.config) return;
      const draft = buildConfigPayload();
      mutate(draft);
      this.state.config = { ...this.state.config, ...draft } as BillingConfig;
      this.renderPreserveMainScroll();
    };

    this.root.querySelector("#add-consumption-window-btn")?.addEventListener("click", () => {
      applyDraftConfigToState((draft) => {
        const windows = Array.isArray(draft.consumption_rate_windows)
          ? [...draft.consumption_rate_windows as Array<Record<string, unknown>>]
          : [];
        windows.push({
          label: `Window ${windows.length + 1}`,
          day_group: "weekdays",
          start_time: "17:00",
          end_time: "00:00",
          rate: this.state.config?.energy_variable_rate ?? 0.1125,
        });
        draft.consumption_rate_windows = windows;
      });
    });

    this.root.querySelectorAll(".remove-consumption-window-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt((btn as HTMLElement).dataset.window ?? "0", 10);
        applyDraftConfigToState((draft) => {
          const windows = Array.isArray(draft.consumption_rate_windows)
            ? [...draft.consumption_rate_windows as Array<Record<string, unknown>>]
            : [];
          windows.splice(idx, 1);
          draft.consumption_rate_windows = windows;
        });
      });
    });

    this.root.querySelector("#add-reference-window-btn")?.addEventListener("click", () => {
      applyDraftConfigToState((draft) => {
        const windows = Array.isArray(draft.reference_power_windows)
          ? [...draft.reference_power_windows as Array<Record<string, unknown>>]
          : [];
        windows.push({
          label: `Reference ${windows.length + 1}`,
          day_group: "weekdays",
          start_time: "17:00",
          end_time: "00:00",
          reference_power_kw: this.state.config?.reference_power_kw ?? 5,
        });
        draft.reference_power_windows = windows;
      });
    });

    this.root.querySelectorAll(".remove-reference-window-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt((btn as HTMLElement).dataset.window ?? "0", 10);
        applyDraftConfigToState((draft) => {
          const windows = Array.isArray(draft.reference_power_windows)
            ? [...draft.reference_power_windows as Array<Record<string, unknown>>]
            : [];
          windows.splice(idx, 1);
          draft.reference_power_windows = windows;
        });
      });
    });

    // ── Per-meter feed-in mode toggles (show/hide fixed vs sensor fields) ──
    form.querySelectorAll<HTMLInputElement>('input[type="radio"][name^="feed_in_rate_"][name$="_mode"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        // Extract the index from name like "feed_in_rate_0_mode"
        const match = radio.name.match(/feed_in_rate_(\d+)_mode/);
        if (!match) return;
        const idx = match[1];
        const fixedEl = form.querySelector(`.feed-in-fixed-fields[data-rate-idx="${idx}"]`) as HTMLElement | null;
        const sensorEl = form.querySelector(`.feed-in-sensor-fields[data-rate-idx="${idx}"]`) as HTMLElement | null;
        if (fixedEl) fixedEl.style.display = radio.value === "fixed" ? "" : "none";
        if (sensorEl) sensorEl.style.display = radio.value === "sensor" ? "" : "none";
      });
    });

    // ── HA entity datalist population (shared for all meter sensor pickers) ──
    if (this.state.mode === "ha") {
      const datalist = this.root.querySelector("#ha-entity-list") as HTMLDataListElement | null;
      if (datalist) {
        fetchHAEntities()
          .then(({ entities }) => {
            datalist.innerHTML = entities
              .map((e: string) => `<option value="${e}"></option>`)
              .join("");
          })
          .catch(() => { /* ignore — datalist just stays empty */ });
      }
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = buildConfigPayload();

      try {
        const { saveConfig: save } = await import("../api/leneda");
        await save(data);
        this.state.config = await fetchConfig();
        this.render();
      } catch (err) {
        alert("Failed to save: " + (err instanceof Error ? err.message : err));
      }
    });

    const resetBtn = this.root.querySelector("#reset-config-btn");
    resetBtn?.addEventListener("click", async () => {
      if (!confirm("Reset all billing rates to defaults?")) return;
      try {
        const { resetConfig: reset } = await import("../api/leneda");
        await reset();
        this.state.config = await fetchConfig();
        this.render();
      } catch (err) {
        alert("Failed to reset: " + (err instanceof Error ? err.message : err));
      }
    });
  }

  private async initChart(canvas: HTMLCanvasElement): Promise<void> {
    try {
      const { renderEnergyChart } = await import("./Charts");
      const { start, end } = this.getDateRangeISO();
      const viewportStartMs = this.state.chartViewportStart
        ? new Date(this.state.chartViewportStart).getTime()
        : undefined;
      const viewportEndMs = this.state.chartViewportEnd
        ? new Date(this.state.chartViewportEnd).getTime()
        : undefined;

      let consumption = this.state.consumptionTimeseries;
      let production = this.state.productionTimeseries;
      let gridImport = this.state.gridImportTimeseries;
      let marketExport = this.state.marketExportTimeseries;
      if (!consumption || !production || !gridImport || !marketExport) {
        const energyFlowTimeseries = await this.fetchEnergyFlowTimeseries(start, end);
        consumption = energyFlowTimeseries.consumptionTimeseries;
        production = energyFlowTimeseries.productionTimeseries;
        gridImport = energyFlowTimeseries.gridImportTimeseries;
        marketExport = energyFlowTimeseries.marketExportTimeseries;
        this.state.consumptionTimeseries = consumption;
        this.state.productionTimeseries = production;
        this.state.gridImportTimeseries = gridImport;
        this.state.marketExportTimeseries = marketExport;
      }

      const referencePowerKw = this.state.config?.reference_power_kw ?? 0;

      // Check if multiple production meters exist — if so, fetch per-meter data
      const productionMeters = (this.state.config?.meters ?? []).filter(
        (m) => m.types.includes("production"),
      );
      let perMeterProduction = undefined;
      if (this.state.perMeterProductionTimeseries?.meters?.length) {
        perMeterProduction = this.state.perMeterProductionTimeseries.meters;
      } else if (productionMeters.length > 1) {
        try {
          const perMeterResp = await fetchPerMeterTimeseries("1-1:2.29.0", start, end);
          if (perMeterResp.meters && perMeterResp.meters.length > 1) {
            perMeterProduction = perMeterResp.meters;
            this.state.perMeterProductionTimeseries = perMeterResp;
          }
        } catch (e) {
          console.warn("Per-meter timeseries fetch failed, using merged view:", e);
        }
      }

      renderEnergyChart(canvas, consumption, production, {
        unit: this.state.chartUnit,
        consumptionView: this.state.chartConsumptionView,
        referencePowerKw,
        gridImportTimeseries: gridImport,
        marketExportTimeseries: marketExport,
        perMeterProduction,
        viewportStartMs,
        viewportEndMs,
        timeBucket: this.state.chartTimeBucket,
        onZoomChange: (zoomStart: string, zoomEnd: string) => {
          this.handleChartZoomChange(zoomStart, zoomEnd);
        },
      });
    } catch (e) {
      console.error("Chart init failed:", e);
    }
  }

  /**
   * Called when the user zooms/pans the chart.
   * Switches to "custom" range, fetches data for the visible period,
   * and updates the entire dashboard (except the chart canvas) so
   * key metrics, flow diagram, stat cards, and invoice all reflect the zoom.
   */
  private async handleChartZoomChange(start: string, end: string): Promise<void> {
    try {
      // Save the original range on first zoom so Reset Zoom can restore it
      if (this.preZoomRange === null) {
        this.preZoomRange = this.state.range;
        this.preZoomCustomStart = this.state.customStart;
        this.preZoomCustomEnd = this.state.customEnd;
      }

      this.state.error = null;
      this.state.loading = true;
      this.renderPreserveMainScroll();

      const { fetchCustomData } = await import("../api/leneda");
      const startDate = start.slice(0, 10);
      const endDate = end.slice(0, 10);
      this.resetAnalysisComparison();
      const data = await fetchCustomData(start, end);
      const [energyFlowTimeseries, perMeterProductionTimeseries] = await Promise.all([
        this.fetchEnergyFlowTimeseries(start, end),
        this.fetchPerMeterProductionForRange(this.state.config, start, end),
      ]);

      // Keep the date picker values stable, but preserve the exact chart viewport separately.
      this.state.range = "custom";
      this.state.customStart = startDate;
      this.state.customEnd = endDate;
      this.state.chartViewportStart = start;
      this.state.chartViewportEnd = end;
      this.state.rangeData = {
        range: "custom",
        consumption: data.consumption,
        production: data.production,
        exported: data.exported ?? 0,
        self_consumed: data.self_consumed ?? 0,
        gas_energy: data.gas_energy ?? 0,
        gas_volume: data.gas_volume ?? 0,
        grid_import: data.grid_import,
        solar_to_home: data.solar_to_home,
        direct_solar_to_home: data.direct_solar_to_home,
        shared: data.shared,
        shared_with_me: data.shared_with_me,
        peak_power_kw: data.peak_power_kw ?? 0,
        exceedance_kwh: data.exceedance_kwh ?? 0,
        metering_point: data.metering_point ?? "",
        start: data.start,
        end: data.end,
      };
      this.state.consumptionTimeseries = energyFlowTimeseries.consumptionTimeseries;
      this.state.productionTimeseries = energyFlowTimeseries.productionTimeseries;
      this.state.gridImportTimeseries = energyFlowTimeseries.gridImportTimeseries;
      this.state.marketExportTimeseries = energyFlowTimeseries.marketExportTimeseries;
      this.state.perMeterProductionTimeseries = perMeterProductionTimeseries;
      this.state.loading = false;

      // Full re-render so the chart can rebuild with a finer aggregation for the zoomed period.
      this.renderPreserveMainScroll();
    } catch (e) {
      console.error("Zoom data fetch failed:", e);
      this.state.loading = false;
      this.clearRangeStateWithError(e, "Missing data");
      this.render();
    }
  }

  /**
   * Compute ISO start/end date strings for the currently selected range.
   */
  private getDateRangeISO(): { start: string; end: string } {
    if (this.state.chartViewportStart && this.state.chartViewportEnd) {
      return {
        start: this.state.chartViewportStart,
        end: this.state.chartViewportEnd,
      };
    }

    const now = new Date();
    const fmt = (d: Date) => toLocalOffsetIso(d);

    switch (this.state.range) {
      case "custom": {
        const s = new Date(this.state.customStart + "T00:00:00");
        const e = new Date(this.state.customEnd + "T23:59:59.999");
        return { start: fmt(s), end: fmt(e) };
      }
      case "yesterday": {
        const d = new Date(now);
        d.setDate(d.getDate() - 1);
        d.setHours(0, 0, 0, 0);
        const end = new Date(d);
        end.setHours(23, 59, 59, 999);
        return { start: fmt(d), end: fmt(end) };
      }
      case "this_week": {
        const d = new Date(now);
        const day = d.getDay() || 7; // Mon=1
        d.setDate(d.getDate() - day + 1);
        d.setHours(0, 0, 0, 0);
        return { start: fmt(d), end: fmt(now) };
      }
      case "last_week": {
        const d = new Date(now);
        const day = d.getDay() || 7;
        const endLW = new Date(d);
        endLW.setDate(d.getDate() - day);
        endLW.setHours(23, 59, 59, 999);
        const startLW = new Date(endLW);
        startLW.setDate(endLW.getDate() - 6);
        startLW.setHours(0, 0, 0, 0);
        return { start: fmt(startLW), end: fmt(endLW) };
      }
      case "this_month": {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        return { start: fmt(start), end: fmt(now) };
      }
      case "last_month": {
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        return { start: fmt(start), end: fmt(end) };
      }
      case "this_year": {
        const start = new Date(now.getFullYear(), 0, 1);
        return { start: fmt(start), end: fmt(now) };
      }
      case "last_year": {
        const start = new Date(now.getFullYear() - 1, 0, 1);
        const end = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
        return { start: fmt(start), end: fmt(end) };
      }
      default: {
        // Fallback to yesterday
        const d = new Date(now);
        d.setDate(d.getDate() - 1);
        d.setHours(0, 0, 0, 0);
        const end = new Date(d);
        end.setHours(23, 59, 59, 999);
        return { start: fmt(d), end: fmt(end) };
      }
    }
  }
}
