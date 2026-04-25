/**
 * Charts — Chart.js bar chart for energy timeseries visualization.
 *
 * Supports two display modes:
 *  - kW:  Power readings split into house demand covered by solar versus
 *         remaining draw from the grid, with a reference power limit line.
 *  - kWh: Energy view using the same source split, aggregated to the selected
 *         dashboard detail preset.
 *
 * The dashboard owns period navigation through explicit controls. Wheel/pinch
 * zoom is disabled so normal page scrolling never traps the pointer.
 */
import { Chart, registerables, type ChartConfiguration, type ScriptableContext } from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import type { TimeseriesResponse, TimeseriesItem, PerMeterTimeseries } from "../api/leneda";
import type { ChartTimeBucket } from "../utils/chartTime";

// Extend Chart.js plugin options to include our custom referenceLine plugin
declare module "chart.js" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends keyof import("chart.js").ChartTypeRegistry> {
    referenceLine?: {
      value?: number;
      color?: string;
      label?: string;
    };
  }
}

// Register all Chart.js components + zoom plugin
Chart.register(...registerables, zoomPlugin);

// Store chart instance for cleanup
let chartInstance: Chart | null = null;

export interface ChartOptions {
  /** Display unit: "kw" = raw power, "kwh" = energy (auto-aggregated) */
  unit: "kw" | "kwh";
  /** Visual split: house consumption, net grid draw, or per-system PV production. */
  consumptionView?: "house" | "grid" | "solar_systems";
  /** Reference power limit in kW. Drawn as a horizontal line in kW mode. */
  referencePowerKw: number;
  /** Called when the user zooms / pans — receives the visible ISO date range. */
  onZoomChange?: (start: string, end: string) => void;
  /** Per-meter production data for stacked green-shade chart. */
  perMeterProduction?: PerMeterTimeseries[];
  /** Keep the chart focused on an exact sub-range after re-rendering. */
  viewportStartMs?: number;
  viewportEndMs?: number;
  /** Aggregation/detail preset selected in the dashboard. */
  timeBucket?: ChartTimeBucket;
}

/** A single data point with a real timestamp for time-scale. */
interface TimePoint {
  x: number;           // ms timestamp
  y: number;
}

interface FlowBreakdownPoint extends TimePoint {
  consumption: number;
  production: number;
  solarToHome: number;
  gridImport: number;
  solarExport: number;
}

interface SolarSystemSeries {
  meterId: string;
  label: string;
  rawPoints: TimePoint[];
  displayPoints: TimePoint[];
}

/** Build raw 15-min TimePoints (kW) for display. */
function buildRawTimePoints(
  consumptionItems: TimeseriesItem[],
  productionItems: TimeseriesItem[],
): { consumption: TimePoint[]; production: TimePoint[] } {
  const consumption: TimePoint[] = consumptionItems.map((item) => ({
    x: new Date(item.startedAt).getTime(),
    y: item.value,
  }));
  const production: TimePoint[] = productionItems.map((item) => ({
    x: new Date(item.startedAt).getTime(),
    y: item.value,
  }));
  return { consumption, production };
}

function buildFlowBreakdown(
  consumptionPoints: TimePoint[],
  productionPoints: TimePoint[],
): FlowBreakdownPoint[] {
  const pointMap = new Map<number, { consumption: number; production: number }>();

  for (const point of consumptionPoints) {
    const existing = pointMap.get(point.x) ?? { consumption: 0, production: 0 };
    existing.consumption += Math.max(0, point.y);
    pointMap.set(point.x, existing);
  }

  for (const point of productionPoints) {
    const existing = pointMap.get(point.x) ?? { consumption: 0, production: 0 };
    existing.production += Math.max(0, point.y);
    pointMap.set(point.x, existing);
  }

  return [...pointMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([x, values]) => {
      const consumption = Math.max(0, values.consumption);
      const production = Math.max(0, values.production);
      const solarToHome = Math.max(0, Math.min(consumption, production));
      const gridImport = Math.max(0, consumption - solarToHome);
      const solarExport = Math.max(0, production - solarToHome);

      return {
        x,
        y: consumption,
        consumption,
        production,
        solarToHome,
        gridImport,
        solarExport,
      };
    });
}

function scaleFlowBreakdown(
  points: FlowBreakdownPoint[],
  factor: number,
): FlowBreakdownPoint[] {
  return points.map((point) => ({
    ...point,
    y: point.y * factor,
    consumption: point.consumption * factor,
    production: point.production * factor,
    solarToHome: point.solarToHome * factor,
    gridImport: point.gridImport * factor,
    solarExport: point.solarExport * factor,
  }));
}

function scaleTimePoints(points: TimePoint[], factor: number): TimePoint[] {
  return points.map((point) => ({
    x: point.x,
    y: point.y * factor,
  }));
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalDayKey(timestamp: number): string {
  return toLocalDateKey(new Date(timestamp));
}

function localDayKeyToTimestamp(dayKey: string): number {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0).getTime();
}

function toLocalHourKey(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}`;
}

function localHourKeyToTimestamp(hourKey: string): number {
  const [datePart, hourPart] = hourKey.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day, Number(hourPart), 30, 0, 0).getTime();
}

function toLocalMonthKey(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function localMonthKeyToTimestamp(monthKey: string): number {
  const [year, month] = monthKey.split("-").map(Number);
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const next = new Date(year, month, 1, 0, 0, 0, 0);
  return start.getTime() + Math.round((next.getTime() - start.getTime()) / 2);
}

function toLocalWeekKey(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  date.setHours(0, 0, 0, 0);
  return toLocalDateKey(date);
}

function localWeekKeyToTimestamp(weekKey: string): number {
  const [year, month, day] = weekKey.split("-").map(Number);
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  return start.getTime() + Math.round(3.5 * 86_400_000);
}

function toLocalYearKey(timestamp: number): string {
  return String(new Date(timestamp).getFullYear());
}

function localYearKeyToTimestamp(yearKey: string): number {
  const year = Number(yearKey);
  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const next = new Date(year + 1, 0, 1, 0, 0, 0, 0);
  return start.getTime() + Math.round((next.getTime() - start.getTime()) / 2);
}

type AggregatedTimeBucket = Exclude<ChartTimeBucket, "quarter_hour">;

function getBucketAccessors(granularity: AggregatedTimeBucket): {
  getKey: (timestamp: number) => string;
  getTimestamp: (key: string) => number;
} {
  switch (granularity) {
    case "year":
      return { getKey: toLocalYearKey, getTimestamp: localYearKeyToTimestamp };
    case "month":
      return { getKey: toLocalMonthKey, getTimestamp: localMonthKeyToTimestamp };
    case "week":
      return { getKey: toLocalWeekKey, getTimestamp: localWeekKeyToTimestamp };
    case "day":
      return { getKey: toLocalDayKey, getTimestamp: localDayKeyToTimestamp };
    case "hour":
      return { getKey: toLocalHourKey, getTimestamp: localHourKeyToTimestamp };
  }
}

function emptyFlowBucket(): Omit<FlowBreakdownPoint, "x"> {
  return {
    y: 0,
    consumption: 0,
    production: 0,
    solarToHome: 0,
    gridImport: 0,
    solarExport: 0,
  };
}

function aggregateFlowBreakdown(
  points: FlowBreakdownPoint[],
  granularity: AggregatedTimeBucket,
): FlowBreakdownPoint[] {
  const bucketMap = new Map<string, Omit<FlowBreakdownPoint, "x">>();
  const { getKey, getTimestamp } = getBucketAccessors(granularity);

  for (const point of points) {
    const key = getKey(point.x);
    const existing = bucketMap.get(key) ?? emptyFlowBucket();

    existing.y += point.y * 0.25;
    existing.consumption += point.consumption * 0.25;
    existing.production += point.production * 0.25;
    existing.solarToHome += point.solarToHome * 0.25;
    existing.gridImport += point.gridImport * 0.25;
    existing.solarExport += point.solarExport * 0.25;
    bucketMap.set(key, existing);
  }

  return [...bucketMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, values]) => ({
      x: getTimestamp(key),
      ...values,
    }));
}

function emptyFlowAverageBucket(): Omit<FlowBreakdownPoint, "x"> & { samples: number } {
  return {
    ...emptyFlowBucket(),
    samples: 0,
  };
}

function aggregateFlowPowerBreakdown(
  points: FlowBreakdownPoint[],
  granularity: AggregatedTimeBucket,
): FlowBreakdownPoint[] {
  const bucketMap = new Map<string, Omit<FlowBreakdownPoint, "x"> & { samples: number }>();
  const { getKey, getTimestamp } = getBucketAccessors(granularity);

  for (const point of points) {
    const key = getKey(point.x);
    const existing = bucketMap.get(key) ?? emptyFlowAverageBucket();

    existing.y += point.y;
    existing.consumption += point.consumption;
    existing.production += point.production;
    existing.solarToHome += point.solarToHome;
    existing.gridImport += point.gridImport;
    existing.solarExport += point.solarExport;
    existing.samples += 1;
    bucketMap.set(key, existing);
  }

  return [...bucketMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, values]) => {
      const divisor = Math.max(1, values.samples);
      return {
        x: getTimestamp(key),
        y: values.y / divisor,
        consumption: values.consumption / divisor,
        production: values.production / divisor,
        solarToHome: values.solarToHome / divisor,
        gridImport: values.gridImport / divisor,
        solarExport: values.solarExport / divisor,
      };
    });
}

function aggregateTimePoints(points: TimePoint[], granularity: AggregatedTimeBucket): TimePoint[] {
  const bucketMap = new Map<string, number>();
  const { getKey, getTimestamp } = getBucketAccessors(granularity);

  for (const point of points) {
    const key = getKey(point.x);
    bucketMap.set(key, (bucketMap.get(key) ?? 0) + Math.max(0, point.y) * 0.25);
  }

  return [...bucketMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, y]) => ({
      x: getTimestamp(key),
      y,
    }));
}

function aggregatePowerTimePoints(points: TimePoint[], granularity: AggregatedTimeBucket): TimePoint[] {
  const bucketMap = new Map<string, { sum: number; samples: number }>();
  const { getKey, getTimestamp } = getBucketAccessors(granularity);

  for (const point of points) {
    const key = getKey(point.x);
    const existing = bucketMap.get(key) ?? { sum: 0, samples: 0 };
    existing.sum += Math.max(0, point.y);
    existing.samples += 1;
    bucketMap.set(key, existing);
  }

  return [...bucketMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, values]) => ({
      x: getTimestamp(key),
      y: values.sum / Math.max(1, values.samples),
    }));
}

function prepareProductionDisplayPoints(
  points: TimePoint[],
  unit: "kw" | "kwh",
  granularity: ChartTimeBucket,
): TimePoint[] {
  if (unit === "kw") {
    return granularity === "quarter_hour"
      ? points
      : aggregatePowerTimePoints(points, granularity);
  }
  return granularity === "quarter_hour"
    ? scaleTimePoints(points, 0.25)
    : aggregateTimePoints(points, granularity);
}

function buildSolarSystemSeries(
  perMeterProduction: PerMeterTimeseries[] | undefined,
  fallbackProduction: TimePoint[],
  unit: "kw" | "kwh",
  granularity: ChartTimeBucket,
): SolarSystemSeries[] {
  const series = (perMeterProduction ?? [])
    .map((meter, idx) => {
      const pointMap = new Map<number, number>();
      for (const item of meter.items ?? []) {
        const timestamp = new Date(item.startedAt).getTime();
        if (!Number.isFinite(timestamp)) continue;
        pointMap.set(timestamp, (pointMap.get(timestamp) ?? 0) + Math.max(0, Number(item.value) || 0));
      }

      const rawPoints = [...pointMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([x, y]) => ({ x, y }));

      return {
        meterId: meter.meter_id,
        label: meter.meter_id ? `PV ...${meter.meter_id.slice(-8)}` : `PV ${idx + 1}`,
        rawPoints,
        displayPoints: prepareProductionDisplayPoints(rawPoints, unit, granularity),
      };
    })
    .filter((meter) => meter.rawPoints.some((point) => point.y > 0.0001));

  if (series.length > 0) return series;

  return [{
    meterId: "total-production",
    label: "Total PV",
    rawPoints: fallbackProduction,
    displayPoints: prepareProductionDisplayPoints(fallbackProduction, unit, granularity),
  }];
}

function getSymmetricAxisBound(value: number): number {
  if (value <= 0) return 1;

  const step =
    value <= 3 ? 0.5
      : value <= 8 ? 1
        : value <= 20 ? 2
          : value <= 50 ? 5
            : 10;

  return Math.ceil(value / step) * step;
}

/**
 * Inline Chart.js plugin that draws a horizontal reference-power line.
 */
const referenceLinePlugin = {
  id: "referenceLine",
  afterDraw(chart: Chart, _args: unknown, opts: { value?: number; color?: string; label?: string }) {
    const refValue = opts.value;
    if (!refValue || refValue <= 0) return;

    const yScale = chart.scales.y;
    if (!yScale) return;

    const yPixel = yScale.getPixelForValue(refValue);
    const { ctx, chartArea } = chart;

    ctx.save();
    ctx.setLineDash([8, 4]);
    ctx.strokeStyle = opts.color ?? "#d29922";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chartArea.left, yPixel);
    ctx.lineTo(chartArea.right, yPixel);
    ctx.stroke();
    ctx.setLineDash([]);

    const labelText = opts.label ?? `Reference ${refValue} kW`;
    ctx.fillStyle = opts.color ?? "#d29922";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText(labelText, chartArea.right - 4, yPixel - 4);
    ctx.restore();
  },
};

/** Helper: extract the current visible x-axis range from the chart. */
function getVisibleRange(chart: Chart): { start: string; end: string } | null {
  const xScale = chart.scales.x;
  if (!xScale) return null;
  const minMs = xScale.min;
  const maxMs = xScale.max;
  if (typeof minMs !== "number" || typeof maxMs !== "number") return null;
  return {
    start: new Date(minMs).toISOString(),
    end: new Date(maxMs).toISOString(),
  };
}

/** Debounce helper to avoid spamming data fetches during smooth zoom. */
let zoomDebounce: ReturnType<typeof setTimeout> | null = null;

function emitZoomChange(chart: Chart, cb?: (start: string, end: string) => void): void {
  if (!cb) return;
  if (zoomDebounce) clearTimeout(zoomDebounce);
  zoomDebounce = setTimeout(() => {
    const range = getVisibleRange(chart);
    if (range) cb(range.start, range.end);
  }, 400);
}

function getAutoTimeBucket(spanMs: number): ChartTimeBucket {
  const spanDays = spanMs / 86_400_000;
  if (spanDays <= 1.25) return "quarter_hour";
  if (spanDays <= 7) return "hour";
  if (spanDays <= 45) return "day";
  if (spanDays <= 180) return "week";
  if (spanDays <= 900) return "month";
  return "year";
}

export function renderEnergyChart(
  canvas: HTMLCanvasElement,
  consumption: TimeseriesResponse,
  production: TimeseriesResponse,
  options: ChartOptions = { unit: "kwh", referencePowerKw: 0 },
): void {
  // Destroy previous chart if it exists
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const {
    unit,
    referencePowerKw,
    onZoomChange,
    consumptionView = "grid",
    perMeterProduction,
    viewportStartMs,
    viewportEndMs,
    timeBucket,
  } = options;
  const rawPoints = buildRawTimePoints(consumption.items, production.items);
  const rawFlowBreakdown = buildFlowBreakdown(rawPoints.consumption, rawPoints.production);
  const rawTimestamps = rawFlowBreakdown.map((point) => point.x);
  const rawSpanMs = rawTimestamps.length > 1 ? Math.max(...rawTimestamps) - Math.min(...rawTimestamps) : 0;
  const selectedTimeBucket = timeBucket ?? getAutoTimeBucket(rawSpanMs);
  const flowBreakdown =
    unit === "kw"
      ? selectedTimeBucket === "quarter_hour"
        ? rawFlowBreakdown
        : aggregateFlowPowerBreakdown(rawFlowBreakdown, selectedTimeBucket)
      : selectedTimeBucket === "quarter_hour"
        ? scaleFlowBreakdown(rawFlowBreakdown, 0.25)
        : aggregateFlowBreakdown(rawFlowBreakdown, selectedTimeBucket);
  const yLabel = unit === "kwh" ? "kWh" : "kW";

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const flowBreakdownByTs = new Map(flowBreakdown.map((point) => [point.x, point]));
  const consumptionPoints: TimePoint[] = flowBreakdown.map((point) => ({
    x: point.x,
    y: point.consumption,
  }));
  const solarToHomePoints: TimePoint[] = flowBreakdown.map((point) => ({ x: point.x, y: point.solarToHome }));
  const gridImportPoints: TimePoint[] = flowBreakdown.map((point) => ({ x: point.x, y: point.gridImport }));
  const solarExportPoints: TimePoint[] = flowBreakdown.map((point) => ({ x: point.x, y: point.solarExport }));
  const solarExportDisplayPoints: TimePoint[] = flowBreakdown.map((point) => ({
    x: point.x,
    y: -point.solarExport,
  }));

  const css = getComputedStyle(document.documentElement);
  const clrMuted = css.getPropertyValue("--clr-muted").trim() || "#8b949e";
  const clrText = css.getPropertyValue("--clr-text").trim() || "#e6edf3";
  const clrTextSecondary = css.getPropertyValue("--clr-text-secondary").trim() || "#b1bac4";
  const clrBorder = css.getPropertyValue("--clr-border").trim() || "#30363d";
  const clrOverlay = css.getPropertyValue("--clr-overlay").trim() || "rgba(13, 17, 23, 0.95)";

  const isPowerView = unit === "kw";
  const isSolarSystemsView = consumptionView === "solar_systems";
  const isGridView = consumptionView === "grid";
  const showRefLine = unit === "kw" && referencePowerKw > 0 && isGridView;
  const hasSolarExport = !isSolarSystemsView && solarExportPoints.some((point) => point.y > 0.0001);
  const solarSystemSeries = isSolarSystemsView
    ? buildSolarSystemSeries(perMeterProduction, rawPoints.production, unit, selectedTimeBucket)
    : [];
  const solarSystemStackTotals = new Map<number, number>();
  for (const series of solarSystemSeries) {
    for (const point of series.displayPoints) {
      solarSystemStackTotals.set(point.x, (solarSystemStackTotals.get(point.x) ?? 0) + Math.max(0, point.y));
    }
  }
  const maxSolarSystemStack = Math.max(0, ...solarSystemStackTotals.values());
  const maxPositiveValue = Math.max(
    showRefLine ? referencePowerKw : 0,
    ...consumptionPoints.map((point) => point.y),
    ...gridImportPoints.map((point) => point.y),
    ...solarToHomePoints.map((point) => point.y),
    maxSolarSystemStack,
    0,
  );
  const maxNegativeValue = Math.max(...solarExportPoints.map((point) => point.y), 0);
  const symmetricAxisBound = hasSolarExport
    ? getSymmetricAxisBound(Math.max(maxPositiveValue, maxNegativeValue))
    : undefined;

  // Remaining grid draw is what matters for reference-power exceedance.
  const gridImportColors = gridImportPoints.map((p) =>
    showRefLine && p.y > referencePowerKw
      ? "rgba(248, 81, 73, 1)"
      : "rgba(248, 81, 73, 0.55)"
  );
  const gridImportBorderColors = gridImportPoints.map((p) =>
    showRefLine && p.y > referencePowerKw ? "#ff3b30" : "#f85149"
  );

  // Determine time unit for display based on the explicit detail preset.
  const timestamps = flowBreakdown.map((p) => p.x);
  const chartTimestamps = isSolarSystemsView && solarSystemSeries.length
    ? [...new Set([...timestamps, ...solarSystemSeries.flatMap((series) => series.displayPoints.map((point) => point.x))])].sort((a, b) => a - b)
    : timestamps;
  const spanMs = timestamps.length > 1 ? Math.max(...timestamps) - Math.min(...timestamps) : 0;
  const spanDays = spanMs / 86_400_000;
  const timeUnit =
    selectedTimeBucket === "year" ? "year"
      : selectedTimeBucket === "month" ? "month"
        : selectedTimeBucket === "week" ? "week"
          : selectedTimeBucket === "day" ? "day"
            : selectedTimeBucket === "hour" ? "hour"
              : "minute";
  const barPercentage = isPowerView
    ? (spanDays > 7 ? 0.85 : 0.65)
    : selectedTimeBucket === "quarter_hour"
      ? (spanDays > 1 ? 0.72 : 0.62)
      : 0.82;
  const showEveryPeriodTick = timestamps.length > 1 && timestamps.length <= (timeUnit === "minute" ? 40 : 36);
  const useDataTicks =
    unit === "kwh" ||
    timeUnit === "day" ||
    timeUnit === "week" ||
    timeUnit === "month" ||
    timeUnit === "year";
  const energyBarRadius = unit === "kwh" ? 4 : 2;
  const energyBalanceStack = "energy-balance";
  const roundedTopCorners = {
    topLeft: energyBarRadius,
    topRight: energyBarRadius,
    bottomLeft: 0,
    bottomRight: 0,
  };
  const roundedBottomCorners = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: energyBarRadius,
    bottomRight: energyBarRadius,
  };
  const positiveBarRadius = (ctx: ScriptableContext<"bar">) => {
    const raw = ctx.raw as TimePoint | undefined;
    return (raw?.y ?? 0) > 0 ? roundedTopCorners : 0;
  };
  const solarStackBarRadius = (ctx: ScriptableContext<"bar">) => {
    const raw = ctx.raw as TimePoint | undefined;
    if ((raw?.y ?? 0) <= 0) return 0;
    return (gridImportPoints[ctx.dataIndex]?.y ?? 0) > 0 ? 0 : roundedTopCorners;
  };
  const negativeBarRadius = (ctx: ScriptableContext<"bar">) => {
    const raw = ctx.raw as TimePoint | undefined;
    return (raw?.y ?? 0) < 0 ? roundedBottomCorners : 0;
  };
  const solarPalette = [
    { bg: "rgba(63, 185, 80, 0.72)", border: "#3fb950" },
    { bg: "rgba(210, 153, 34, 0.72)", border: "#d29922" },
    { bg: "rgba(57, 197, 207, 0.66)", border: "#39c5cf" },
    { bg: "rgba(255, 123, 114, 0.62)", border: "#ff7b72" },
    { bg: "rgba(88, 166, 255, 0.62)", border: "#58a6ff" },
  ];
  const solarSystemBarDatasets = solarSystemSeries.map((series, idx) => {
    const color = solarPalette[idx % solarPalette.length];
    return {
      label: `${series.label} (${yLabel})`,
      data: series.displayPoints as any,
      backgroundColor: color.bg,
      borderColor: color.border,
      borderWidth: 1,
      borderRadius: positiveBarRadius,
      borderSkipped: false,
      barPercentage,
      grouped: false,
      stack: "solar-systems",
      order: idx + 1,
    };
  });
  const datasets = isSolarSystemsView
    ? solarSystemBarDatasets
    : isGridView
    ? [
        {
          label: `Covered by Solar (${yLabel})`,
          data: solarToHomePoints as any,
        backgroundColor: "rgba(63, 185, 80, 0.70)",
        borderColor: "#3fb950",
        borderWidth: 1,
        borderRadius: solarStackBarRadius,
        borderSkipped: false,
        barPercentage,
        grouped: false,
        stack: energyBalanceStack,
        order: 1,
      },
      {
        label: `From Grid (${yLabel})`,
        data: gridImportPoints as any,
        backgroundColor: gridImportColors,
        borderColor: gridImportBorderColors,
        borderWidth: 1,
        borderRadius: positiveBarRadius,
        borderSkipped: false,
        barPercentage,
        grouped: false,
        stack: energyBalanceStack,
        order: 2,
      },
      ...(hasSolarExport
        ? [{
          label: `Solar Exported (${yLabel})`,
          data: solarExportDisplayPoints as any,
          backgroundColor: "rgba(88, 166, 255, 0.60)",
          borderColor: "#58a6ff",
          borderWidth: 1,
          borderRadius: negativeBarRadius,
          borderSkipped: false,
          barPercentage,
          grouped: false,
          stack: energyBalanceStack,
          order: 3,
        }]
        : []),
    ]
    : [
        {
          label: `House Consumption (${yLabel})`,
          data: consumptionPoints as any,
        backgroundColor: "rgba(248, 81, 73, 0.45)",
        borderColor: "#f85149",
        borderWidth: 1,
        borderRadius: positiveBarRadius,
        borderSkipped: false,
        barPercentage,
        grouped: false,
        order: 1,
      },
      {
        label: `Covered by Solar (${yLabel})`,
        data: solarToHomePoints as any,
        backgroundColor: "rgba(63, 185, 80, 0.85)",
        borderColor: "#3fb950",
        borderWidth: 1,
        borderRadius: positiveBarRadius,
        borderSkipped: false,
        barPercentage: Math.max(0.42, barPercentage - 0.14),
        grouped: false,
        order: 2,
      },
      ...(hasSolarExport
        ? [{
          label: `Solar Exported (${yLabel})`,
          data: solarExportDisplayPoints as any,
          backgroundColor: "rgba(88, 166, 255, 0.60)",
          borderColor: "#58a6ff",
          borderWidth: 1,
          borderRadius: negativeBarRadius,
          borderSkipped: false,
          barPercentage,
          grouped: false,
          stack: "solar-export",
          order: 3,
        }]
        : []),
    ];

  const config: ChartConfiguration<"bar"> = {
    type: "bar",
    data: {
      datasets: datasets as any,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: clrMuted,
            usePointStyle: true,
            pointStyle: "rectRounded",
            padding: 16,
            font: { size: 12 },
            generateLabels(chart: Chart) {
              const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
              if (showRefLine) {
                original.push({
                  text: `Reference Limit (${referencePowerKw} kW)`,
                  fillStyle: "transparent",
                  strokeStyle: "#d29922",
                  lineWidth: 2,
                  lineDash: [6, 3],
                  pointStyle: "line",
                  hidden: false,
                  index: original.length,
                });
                original.push({
                  text: "Over Reference",
                  fillStyle: "rgba(248, 81, 73, 1)",
                  strokeStyle: "#ff3b30",
                  lineWidth: 1,
                  pointStyle: "rectRounded",
                  hidden: false,
                  index: original.length,
                });
              }
              return original;
            },
          },
        },
        tooltip: {
          backgroundColor: clrOverlay,
          titleColor: clrText,
          bodyColor: clrTextSecondary,
          borderColor: clrBorder,
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title(items: any[]) {
              if (!items.length) return "";
              const raw = items[0].raw as TimePoint;
              const d = new Date(raw.x);
              return timeUnit === "year"
                ? d.toLocaleDateString(undefined, { year: "numeric" })
                : timeUnit === "month"
                ? d.toLocaleDateString(undefined, { month: "long", year: "numeric" })
                : timeUnit === "week"
                  ? `Week of ${d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
                : timeUnit === "day"
                  ? d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                  : d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
            },
            label(tooltipCtx: any) {
              const rawValue = tooltipCtx.parsed.y ?? 0;
              const isExportDataset = tooltipCtx.dataset.label?.startsWith("Solar Exported");
              const val = (isExportDataset ? Math.abs(rawValue) : rawValue).toFixed(2);
              const line = `${tooltipCtx.dataset.label}: ${val} ${yLabel}`;
              if (
                showRefLine &&
                tooltipCtx.dataset.label?.startsWith("From Grid") &&
                rawValue > referencePowerKw
              ) {
                const over = (rawValue - referencePowerKw).toFixed(2);
                return `${line}  ⚠️ +${over} kW over limit`;
              }
              return line;
            },
            footer(items: any[]) {
              if (!items.length) return "";
              const raw = items[0].raw as TimePoint;

              if (isSolarSystemsView) {
                const totalProduction = items.reduce(
                  (sum: number, item: any) => sum + Math.max(0, item.parsed.y ?? 0),
                  0,
                );
                const point = flowBreakdownByTs.get(raw.x);
                const footer = [`PV systems total: ${totalProduction.toFixed(2)} ${yLabel}`];
                if (point) {
                  footer.push(`Covered by solar: ${point.solarToHome.toFixed(2)} ${yLabel}`);
                  footer.push(`Solar exported: ${point.solarExport.toFixed(2)} ${yLabel}`);
                }
                return footer;
              }

              const point = flowBreakdownByTs.get(raw.x);
              if (!point) return "";

              const footer: string[] = [
                `House total: ${point.consumption.toFixed(2)} ${yLabel}`,
                `Covered by solar: ${point.solarToHome.toFixed(2)} ${yLabel}`,
                `From grid: ${point.gridImport.toFixed(2)} ${yLabel}`,
                `Solar total: ${point.production.toFixed(2)} ${yLabel}`,
              ];

              if (point.solarExport > 0.0001) {
                footer.push(`Solar exported: ${point.solarExport.toFixed(2)} ${yLabel}`);
              }

              if (point.consumption > 0) {
                footer.push(`Solar-covered share: ${((point.solarToHome / point.consumption) * 100).toFixed(0)}%`);
              }

              if (showRefLine && point.gridImport > referencePowerKw) {
                footer.push(`Over reference: ${(point.gridImport - referencePowerKw).toFixed(2)} kW`);
              }

              return footer;
            },
          },
        },
        referenceLine: showRefLine
          ? { value: referencePowerKw, color: "#d29922", label: `Reference ${referencePowerKw} kW` }
          : { value: 0 },
        zoom: {
          pan: {
            enabled: false,
            mode: "x",
            onPanComplete({ chart }: { chart: Chart }) {
              emitZoomChange(chart, onZoomChange);
            },
          },
          zoom: {
            wheel: { enabled: false },
            pinch: { enabled: false },
            drag: {
              enabled: false,
            },
            mode: "x",
            onZoomComplete({ chart }: { chart: Chart }) {
              emitZoomChange(chart, onZoomChange);
              // Show the reset button
              const btn = canvas.closest(".chart-card")?.querySelector(".reset-zoom-btn") as HTMLElement | null;
              if (btn) btn.style.display = "";
            },
          },
          limits: {
            x: {
              max: chartTimestamps.length ? Math.max(...chartTimestamps) + 3_600_000 : undefined,
              min: chartTimestamps.length ? Math.min(...chartTimestamps) - 3_600_000 : undefined,
              minRange: 15 * 60 * 1000,
            },
          },
        },
      },
      scales: {
        x: {
          type: "time",
          bounds: useDataTicks ? "data" : "ticks",
          min: Number.isFinite(viewportStartMs) ? viewportStartMs : undefined,
          max: Number.isFinite(viewportEndMs) ? viewportEndMs : undefined,
          time: {
            unit: timeUnit,
            displayFormats: {
              minute: "HH:mm",
              hour: "HH:mm",
              day: "MMM d",
              week: "MMM d",
              month: "MMM yyyy",
              year: "yyyy",
            },
            tooltipFormat: "PPp",
          },
          ticks: {
            color: clrMuted,
            source: useDataTicks ? "data" : "auto",
            autoSkip: !showEveryPeriodTick,
            maxTicksLimit: showEveryPeriodTick ? undefined : 14,
            font: { size: showEveryPeriodTick ? (timeUnit === "minute" ? 8 : 9) : 10 },
            minRotation: showEveryPeriodTick ? 0 : undefined,
            maxRotation: showEveryPeriodTick ? 0 : 45,
            callback(value: string | number, index: number) {
              const date = new Date(Number(value));
              if (Number.isNaN(date.getTime())) return "";

              if (!showEveryPeriodTick) {
                return timeUnit === "year"
                  ? String(date.getFullYear())
                  : timeUnit === "month"
                  ? date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
                  : timeUnit === "hour" || timeUnit === "minute"
                  ? date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
                  : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
              }

              if (timeUnit === "year") {
                return String(date.getFullYear());
              }

              if (timeUnit === "month") {
                const monthLabel = date.toLocaleDateString(undefined, { month: "short" });
                const yearLabel = String(date.getFullYear());
                return index === 0 || date.getMonth() === 0
                  ? [monthLabel, yearLabel]
                  : monthLabel;
              }

              if (timeUnit === "week") {
                const weekLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
                return index === 0 || date.getDate() <= 7
                  ? [weekLabel, String(date.getFullYear())]
                  : weekLabel;
              }

              if (timeUnit === "hour" || timeUnit === "minute") {
                const timeLabel = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                const dayLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
                const isDayBoundary = timeUnit === "minute"
                  ? date.getHours() === 0 && date.getMinutes() === 0
                  : date.getHours() === 0;
                return index === 0 || isDayBoundary
                  ? [dayLabel, timeLabel]
                  : timeLabel;
              }

              const dayLabel = String(date.getDate());
              const monthLabel = date.toLocaleDateString(undefined, { month: "short" });
              return index === 0 || date.getDate() === 1
                ? [monthLabel, dayLabel]
                : dayLabel;
            },
          },
          grid: { color: clrBorder },
          // Keep bars centred on their time tick for the denser interval view.
          offset: true,
          stacked: isGridView || isSolarSystemsView,
        },
        y: {
          beginAtZero: !symmetricAxisBound,
          min: symmetricAxisBound ? -symmetricAxisBound : undefined,
          max: symmetricAxisBound ? symmetricAxisBound : undefined,
          stacked: isGridView || isSolarSystemsView,
          ticks: {
            color: clrMuted,
            font: { size: 10 },
            callback(value: string | number) { return `${value} ${yLabel}`; },
          },
          grid: { color: clrBorder },
        },
      },
    },
    plugins: [referenceLinePlugin as any],
  };

  chartInstance = new Chart(ctx, config);
}

/** Reset the chart zoom back to the original range. */
export function resetChartZoom(): void {
  if (chartInstance) {
    chartInstance.resetZoom();
  }
}
