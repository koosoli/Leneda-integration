import type { AppState } from "./App";
import { RANGES } from "./Dashboard";
import type {
  BillingConfig,
  ConsumptionRateWindow,
  DayGroup,
  FeedInRate,
  ReferencePowerWindow,
  TimeseriesResponse,
} from "../api/leneda";
import { fmtDate, fmtDateTime, fmtNum } from "../utils/format";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_LABELS = {
  house: "Total Usage",
  grid: "Net Grid",
  solar: "Solar Production",
} as const;

interface IntervalPoint {
  timestamp: number;
  iso: string;
  date: Date;
  houseKw: number;
  solarKw: number;
  solarToHomeKw: number;
  gridKw: number;
  exportKw: number;
  referenceKw: number;
  overKw: number;
  avoidedOverKw: number;
  importRateWithVat: number;
  feedInRate: number;
  exceedanceRateWithVat: number;
}

interface DailyBucket {
  key: string;
  label: string;
  fullDate: string;
  houseKwh: number;
  solarKwh: number;
  solarToHomeKwh: number;
  gridKwh: number;
  exportKwh: number;
  exceedanceKwh: number;
  avoidedExceedanceKwh: number;
  importCost: number;
  solarSavings: number;
  exportRevenue: number;
  exceedanceCost: number;
  avoidedExceedanceValue: number;
  solarValue: number;
  coveragePct: number;
  selfConsumedPct: number;
  peakGridKw: number;
  peakHouseKw: number;
  exceedanceIntervals: number;
}

interface AnalyticsTotals {
  houseKwh: number;
  solarKwh: number;
  solarToHomeKwh: number;
  gridKwh: number;
  exportKwh: number;
  exceedanceKwh: number;
  avoidedExceedanceKwh: number;
  importCost: number;
  solarSavings: number;
  exportRevenue: number;
  exceedanceCost: number;
  avoidedExceedanceValue: number;
  solarValue: number;
  coveragePct: number;
  selfConsumedPct: number;
  peakGridKw: number;
  peakHouseKw: number;
  exceedanceIntervals: number;
}

interface AnalyticsBundle {
  daily: DailyBucket[];
  totals: AnalyticsTotals;
  topExceedances: IntervalPoint[];
  hourlyExceedanceKwh: number[];
  heatmapValues: Record<"house" | "grid" | "solar", number[][]>;
  loadDurationGrossKw: number[];
  loadDurationNetKw: number[];
  worstDays: DailyBucket[];
}

interface LineSeries {
  label: string;
  color: string;
  values: number[];
  dashed?: boolean;
}

function toDateInputValue(value?: string): string {
  if (!value) return "";
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

function localDayKey(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDayKeyToDate(dayKey: string): Date {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function maxOr(values: number[], fallback = 0): number {
  return values.length ? Math.max(...values) : fallback;
}

function minOr(values: number[], fallback = 0): number {
  return values.length ? Math.min(...values) : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatCurrency(value: number, currency: string): string {
  return `${fmtNum(value, 2)} ${currency}`;
}

function formatDelta(value: number, decimals = 1): string {
  if (Math.abs(value) < 0.005) return "0";
  return `${value > 0 ? "+" : ""}${fmtNum(value, decimals)}`;
}

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map((part) => parseInt(part, 10) || 0);
  return hours * 60 + minutes;
}

function matchesDayGroup(day: number, dayGroup: DayGroup): boolean {
  if (dayGroup === "all") return true;
  if (dayGroup === "weekdays") return day >= 1 && day <= 5;
  return day === 0 || day === 6;
}

function matchesWindow(date: Date, dayGroup: DayGroup, startTime: string, endTime: string): boolean {
  if (!matchesDayGroup(date.getDay(), dayGroup)) return false;

  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);

  if (startMinutes === endMinutes) return true;
  if (startMinutes < endMinutes) {
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }
  return nowMinutes >= startMinutes || nowMinutes < endMinutes;
}

function findConsumptionWindow(
  date: Date,
  windows: ConsumptionRateWindow[],
): ConsumptionRateWindow | undefined {
  return windows.find((window) =>
    matchesWindow(date, window.day_group, window.start_time, window.end_time),
  );
}

function findReferenceWindow(
  date: Date,
  windows: ReferencePowerWindow[],
): ReferencePowerWindow | undefined {
  return windows.find((window) =>
    matchesWindow(date, window.day_group, window.start_time, window.end_time),
  );
}

function resolveAverageFeedInRate(config: BillingConfig): number {
  const productionMeters = (config.meters ?? []).filter((meter) => meter.types.includes("production"));
  const feedInRates: FeedInRate[] = config.feed_in_rates ?? [];

  if (!productionMeters.length) return config.feed_in_tariff ?? 0;

  const resolvedRates = productionMeters.map((meter) => {
    const rateConfig = feedInRates.find((rate) => rate.meter_id === meter.id);
    if (!rateConfig) return config.feed_in_tariff ?? 0;

    const sensorOk =
      rateConfig.mode === "sensor" &&
      rateConfig.sensor_value != null &&
      Number.isFinite(rateConfig.sensor_value);

    if (sensorOk) return rateConfig.sensor_value ?? 0;
    if (Number.isFinite(rateConfig.tariff)) return rateConfig.tariff;
    return config.feed_in_tariff ?? 0;
  }).filter((value) => Number.isFinite(value) && value >= 0);

  if (!resolvedRates.length) return config.feed_in_tariff ?? 0;
  return resolvedRates.reduce((sum, value) => sum + value, 0) / resolvedRates.length;
}

function buildIntervalPoints(
  consumption: TimeseriesResponse,
  production: TimeseriesResponse,
  config: BillingConfig,
): IntervalPoint[] {
  const pointMap = new Map<number, { houseKw: number; solarKw: number; iso: string }>();

  for (const item of consumption.items) {
    const timestamp = new Date(item.startedAt).getTime();
    if (!Number.isFinite(timestamp)) continue;
    const existing = pointMap.get(timestamp) ?? { houseKw: 0, solarKw: 0, iso: item.startedAt };
    existing.houseKw += Math.max(0, Number(item.value) || 0);
    existing.iso = item.startedAt;
    pointMap.set(timestamp, existing);
  }

  for (const item of production.items) {
    const timestamp = new Date(item.startedAt).getTime();
    if (!Number.isFinite(timestamp)) continue;
    const existing = pointMap.get(timestamp) ?? { houseKw: 0, solarKw: 0, iso: item.startedAt };
    existing.solarKw += Math.max(0, Number(item.value) || 0);
    existing.iso = existing.iso || item.startedAt;
    pointMap.set(timestamp, existing);
  }

  const rateWindows = config.consumption_rate_windows ?? [];
  const referenceWindows = config.reference_power_windows ?? [];
  const defaultReferenceKw = config.reference_power_kw ?? 0;
  const avgFeedInRate = resolveAverageFeedInRate(config);
  const exceedanceRateWithVat = (config.exceedance_rate ?? 0) * (1 + (config.vat_rate ?? 0));

  return [...pointMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([timestamp, point]) => {
      const date = new Date(timestamp);
      const houseKw = Math.max(0, point.houseKw);
      const solarKw = Math.max(0, point.solarKw);
      const solarToHomeKw = Math.max(0, Math.min(houseKw, solarKw));
      const gridKw = Math.max(0, houseKw - solarToHomeKw);
      const exportKw = Math.max(0, solarKw - solarToHomeKw);
      const referenceKw = findReferenceWindow(date, referenceWindows)?.reference_power_kw ?? defaultReferenceKw;
      const grossOverKw = Math.max(0, houseKw - referenceKw);
      const overKw = Math.max(0, gridKw - referenceKw);
      const avoidedOverKw = Math.max(0, grossOverKw - overKw);
      const supplierRate = findConsumptionWindow(date, rateWindows)?.rate ?? (config.energy_variable_rate ?? 0);
      const importRateWithVat =
        (
          supplierRate +
          (config.network_variable_rate ?? 0) +
          (config.electricity_tax_rate ?? 0) +
          (config.compensation_fund_rate ?? 0)
        ) * (1 + (config.vat_rate ?? 0));

      return {
        timestamp,
        iso: point.iso,
        date,
        houseKw,
        solarKw,
        solarToHomeKw,
        gridKw,
        exportKw,
        referenceKw,
        overKw,
        avoidedOverKw,
        importRateWithVat,
        feedInRate: avgFeedInRate,
        exceedanceRateWithVat,
      };
    });
}

function buildAnalytics(
  consumption: TimeseriesResponse,
  production: TimeseriesResponse,
  config: BillingConfig,
): AnalyticsBundle {
  const points = buildIntervalPoints(consumption, production, config);
  const dailyMap = new Map<string, DailyBucket>();
  const hourlyExceedanceKwh = Array.from({ length: 24 }, () => 0);
  const heatmapAccumulators = {
    house: Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => ({ sum: 0, count: 0 }))),
    grid: Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => ({ sum: 0, count: 0 }))),
    solar: Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => ({ sum: 0, count: 0 }))),
  };

  const totals: AnalyticsTotals = {
    houseKwh: 0,
    solarKwh: 0,
    solarToHomeKwh: 0,
    gridKwh: 0,
    exportKwh: 0,
    exceedanceKwh: 0,
    avoidedExceedanceKwh: 0,
    importCost: 0,
    solarSavings: 0,
    exportRevenue: 0,
    exceedanceCost: 0,
    avoidedExceedanceValue: 0,
    solarValue: 0,
    coveragePct: 0,
    selfConsumedPct: 0,
    peakGridKw: 0,
    peakHouseKw: 0,
    exceedanceIntervals: 0,
  };

  for (const point of points) {
    const kwhFactor = 0.25;
    const dayKey = localDayKey(point.timestamp);
    const bucket = dailyMap.get(dayKey) ?? (() => {
      const date = localDayKeyToDate(dayKey);
      return {
        key: dayKey,
        label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        fullDate: date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
        houseKwh: 0,
        solarKwh: 0,
        solarToHomeKwh: 0,
        gridKwh: 0,
        exportKwh: 0,
        exceedanceKwh: 0,
        avoidedExceedanceKwh: 0,
        importCost: 0,
        solarSavings: 0,
        exportRevenue: 0,
        exceedanceCost: 0,
        avoidedExceedanceValue: 0,
        solarValue: 0,
        coveragePct: 0,
        selfConsumedPct: 0,
        peakGridKw: 0,
        peakHouseKw: 0,
        exceedanceIntervals: 0,
      };
    })();

    const houseKwh = point.houseKw * kwhFactor;
    const solarKwh = point.solarKw * kwhFactor;
    const solarToHomeKwh = point.solarToHomeKw * kwhFactor;
    const gridKwh = point.gridKw * kwhFactor;
    const exportKwh = point.exportKw * kwhFactor;
    const exceedanceKwh = point.overKw * kwhFactor;
    const avoidedExceedanceKwh = point.avoidedOverKw * kwhFactor;
    const importCost = gridKwh * point.importRateWithVat;
    const solarSavings = solarToHomeKwh * point.importRateWithVat;
    const exportRevenue = exportKwh * point.feedInRate;
    const exceedanceCost = exceedanceKwh * point.exceedanceRateWithVat;
    const avoidedExceedanceValue = avoidedExceedanceKwh * point.exceedanceRateWithVat;

    bucket.houseKwh += houseKwh;
    bucket.solarKwh += solarKwh;
    bucket.solarToHomeKwh += solarToHomeKwh;
    bucket.gridKwh += gridKwh;
    bucket.exportKwh += exportKwh;
    bucket.exceedanceKwh += exceedanceKwh;
    bucket.avoidedExceedanceKwh += avoidedExceedanceKwh;
    bucket.importCost += importCost;
    bucket.solarSavings += solarSavings;
    bucket.exportRevenue += exportRevenue;
    bucket.exceedanceCost += exceedanceCost;
    bucket.avoidedExceedanceValue += avoidedExceedanceValue;
    bucket.peakGridKw = Math.max(bucket.peakGridKw, point.gridKw);
    bucket.peakHouseKw = Math.max(bucket.peakHouseKw, point.houseKw);
    bucket.exceedanceIntervals += point.overKw > 0 ? 1 : 0;
    dailyMap.set(dayKey, bucket);

    totals.houseKwh += houseKwh;
    totals.solarKwh += solarKwh;
    totals.solarToHomeKwh += solarToHomeKwh;
    totals.gridKwh += gridKwh;
    totals.exportKwh += exportKwh;
    totals.exceedanceKwh += exceedanceKwh;
    totals.avoidedExceedanceKwh += avoidedExceedanceKwh;
    totals.importCost += importCost;
    totals.solarSavings += solarSavings;
    totals.exportRevenue += exportRevenue;
    totals.exceedanceCost += exceedanceCost;
    totals.avoidedExceedanceValue += avoidedExceedanceValue;
    totals.peakGridKw = Math.max(totals.peakGridKw, point.gridKw);
    totals.peakHouseKw = Math.max(totals.peakHouseKw, point.houseKw);
    totals.exceedanceIntervals += point.overKw > 0 ? 1 : 0;

    const weekdayIndex = (point.date.getDay() + 6) % 7;
    const hour = point.date.getHours();
    heatmapAccumulators.house[weekdayIndex][hour].sum += point.houseKw;
    heatmapAccumulators.house[weekdayIndex][hour].count += 1;
    heatmapAccumulators.grid[weekdayIndex][hour].sum += point.gridKw;
    heatmapAccumulators.grid[weekdayIndex][hour].count += 1;
    heatmapAccumulators.solar[weekdayIndex][hour].sum += point.solarKw;
    heatmapAccumulators.solar[weekdayIndex][hour].count += 1;
    hourlyExceedanceKwh[hour] += exceedanceKwh;
  }

  const daily = [...dailyMap.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((bucket) => {
      bucket.coveragePct = bucket.houseKwh > 0 ? (bucket.solarToHomeKwh / bucket.houseKwh) * 100 : 0;
      bucket.selfConsumedPct = bucket.solarKwh > 0 ? (bucket.solarToHomeKwh / bucket.solarKwh) * 100 : 0;
      bucket.solarValue = bucket.solarSavings + bucket.exportRevenue + bucket.avoidedExceedanceValue;
      return bucket;
    });

  totals.coveragePct = totals.houseKwh > 0 ? (totals.solarToHomeKwh / totals.houseKwh) * 100 : 0;
  totals.selfConsumedPct = totals.solarKwh > 0 ? (totals.solarToHomeKwh / totals.solarKwh) * 100 : 0;
  totals.solarValue = totals.solarSavings + totals.exportRevenue + totals.avoidedExceedanceValue;

  const heatmapValues = {
    house: heatmapAccumulators.house.map((row) => row.map((cell) => (cell.count ? cell.sum / cell.count : 0))),
    grid: heatmapAccumulators.grid.map((row) => row.map((cell) => (cell.count ? cell.sum / cell.count : 0))),
    solar: heatmapAccumulators.solar.map((row) => row.map((cell) => (cell.count ? cell.sum / cell.count : 0))),
  };

  const topExceedances = points
    .filter((point) => point.overKw > 0)
    .sort((a, b) => b.overKw - a.overKw || b.timestamp - a.timestamp)
    .slice(0, 8);

  const worstDays = [...daily]
    .filter((day) => day.exceedanceKwh > 0)
    .sort((a, b) => b.exceedanceKwh - a.exceedanceKwh)
    .slice(0, 6);

  return {
    daily,
    totals,
    topExceedances,
    hourlyExceedanceKwh,
    heatmapValues,
    loadDurationGrossKw: points.map((point) => point.houseKw).sort((a, b) => b - a),
    loadDurationNetKw: points.map((point) => point.gridKw).sort((a, b) => b - a),
    worstDays,
  };
}

function rangeLabel(state: AppState): string {
  if (state.rangeData?.start && state.rangeData?.end) {
    return `${fmtDate(state.rangeData.start)} - ${fmtDate(state.rangeData.end)}`;
  }
  return RANGES.find((range) => range.id === state.range)?.label ?? "Selected Period";
}

function rangeSubtitle(state: AppState): string {
  if (state.rangeData?.start && state.rangeData?.end) {
    return `${new Date(state.rangeData.start).toLocaleDateString()} - ${new Date(state.rangeData.end).toLocaleDateString()}`;
  }
  if (state.range === "custom" && state.customStart && state.customEnd) {
    return `${state.customStart} - ${state.customEnd}`;
  }
  return "Based on the currently selected range.";
}

function comparisonLabel(state: AppState): string {
  if (!state.analysisComparison) return "Previous matched period";
  return `Previous matched period: ${new Date(state.analysisComparison.start).toLocaleDateString()} - ${new Date(state.analysisComparison.end).toLocaleDateString()}`;
}

function renderLineChart(options: {
  title?: string;
  series: LineSeries[];
  labels: string[];
  minValue?: number;
  maxValue?: number;
  referenceValue?: number;
  referenceLabel?: string;
  valueFormatter?: (value: number) => string;
}): string {
  const series = options.series.filter((entry) => entry.values.length > 0);
  if (!series.length) {
    return `<div class="analysis-empty">No chart data available for this period.</div>`;
  }

  const pointCount = Math.max(...series.map((entry) => entry.values.length));
  const width = Math.max(720, pointCount * 24 + 92);
  const height = 244;
  const padLeft = 50;
  const padRight = 20;
  const padTop = 18;
  const padBottom = 30;
  const allValues = series.flatMap((entry) => entry.values);
  if (options.referenceValue != null) allValues.push(options.referenceValue);

  let minValue = options.minValue ?? minOr(allValues, 0);
  let maxValue = options.maxValue ?? maxOr(allValues, 1);
  if (minValue === maxValue) {
    maxValue += 1;
    minValue = Math.min(0, minValue - 1);
  }
  if (options.minValue == null) minValue = Math.min(0, minValue);

  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const xForIndex = (index: number, length: number): number =>
    length <= 1 ? padLeft + plotWidth / 2 : padLeft + (index * plotWidth) / (length - 1);
  const yForValue = (value: number): number =>
    padTop + ((maxValue - value) / (maxValue - minValue)) * plotHeight;
  const valueFormatter = options.valueFormatter ?? ((value: number) => fmtNum(value, 1));
  const tickValues = Array.from({ length: 4 }, (_, index) => minValue + ((maxValue - minValue) / 3) * index);
  const labelIndexes = [0, Math.floor((pointCount - 1) / 2), pointCount - 1].filter((value, index, array) => array.indexOf(value) === index);

  const gridMarkup = tickValues.map((value) => {
    const y = yForValue(value);
    return `
      <line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${(width - padRight).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-grid" />
      <text x="${padLeft - 8}" y="${(y + 4).toFixed(1)}" class="analysis-svg-tick">${valueFormatter(value)}</text>
    `;
  }).join("");

  const referenceMarkup = options.referenceValue != null
    ? (() => {
      const y = yForValue(options.referenceValue);
      return `
        <line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${(width - padRight).toFixed(1)}" y2="${y.toFixed(1)}" class="analysis-svg-reference" />
        ${options.referenceLabel
          ? `<text x="${width - padRight}" y="${(y - 8).toFixed(1)}" class="analysis-svg-reference-label">${options.referenceLabel}</text>`
          : ""}
      `;
    })()
    : "";

  const seriesMarkup = series.map((entry) => {
    const path = entry.values.map((value, index) => {
      const x = xForIndex(index, entry.values.length);
      const y = yForValue(value);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");

    const circles = entry.values.length <= 40
      ? entry.values.map((value, index) => {
        const x = xForIndex(index, entry.values.length);
        const y = yForValue(value);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="${entry.color}" />`;
      }).join("")
      : "";

    return `
      <path d="${path}" fill="none" stroke="${entry.color}" stroke-width="2.5" ${entry.dashed ? 'stroke-dasharray="6 4"' : ""} />
      ${circles}
    `;
  }).join("");

  const xLabelMarkup = labelIndexes.map((index) => {
    const x = xForIndex(index, pointCount);
    const label = options.labels[index] ?? `Point ${index + 1}`;
    return `<text x="${x.toFixed(1)}" y="${height - 8}" text-anchor="middle" class="analysis-svg-x-label">${label}</text>`;
  }).join("");

  return `
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.title ?? "Line chart"}">
        ${gridMarkup}
        ${referenceMarkup}
        ${seriesMarkup}
        ${xLabelMarkup}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      ${series.map((entry) => `
        <span class="analysis-legend-item">
          <span class="analysis-legend-swatch" style="background:${entry.color};"></span>
          <span>${entry.label}</span>
        </span>
      `).join("")}
      ${options.referenceLabel
        ? `
          <span class="analysis-legend-item">
            <span class="analysis-legend-swatch analysis-legend-swatch-dashed"></span>
            <span>${options.referenceLabel}</span>
          </span>
        `
        : ""}
    </div>
  `;
}

function renderDailyFlowChart(daily: DailyBucket[]): string {
  if (!daily.length) {
    return `<div class="analysis-empty">No daily energy data available.</div>`;
  }

  const width = Math.max(760, daily.length * 28 + 84);
  const height = 250;
  const padLeft = 52;
  const padRight = 16;
  const padTop = 18;
  const padBottom = 34;
  const maxPositive = maxOr(daily.map((day) => day.houseKwh), 1);
  const maxNegative = maxOr(daily.map((day) => day.exportKwh), 0);
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const positiveHeight = maxNegative > 0 ? plotHeight * 0.72 : plotHeight;
  const negativeHeight = maxNegative > 0 ? plotHeight - positiveHeight : 0;
  const baseline = padTop + positiveHeight;
  const step = plotWidth / daily.length;
  const barWidth = Math.max(8, Math.min(18, step * 0.62));
  const labelStep = Math.max(1, Math.ceil(daily.length / 10));

  const bars = daily.map((day, index) => {
    const x = padLeft + index * step + (step - barWidth) / 2;
    const solarHeight = (day.solarToHomeKwh / maxPositive) * positiveHeight;
    const gridHeight = (day.gridKwh / maxPositive) * positiveHeight;
    const exportHeight = maxNegative > 0 ? (day.exportKwh / maxNegative) * negativeHeight : 0;
    const markerY = baseline - solarHeight - gridHeight - 8;

    return `
      <g>
        <rect x="${x.toFixed(1)}" y="${(baseline - solarHeight).toFixed(1)}" width="${barWidth.toFixed(1)}" height="${solarHeight.toFixed(1)}" rx="3" fill="rgba(63, 185, 80, 0.85)" />
        <rect x="${x.toFixed(1)}" y="${(baseline - solarHeight - gridHeight).toFixed(1)}" width="${barWidth.toFixed(1)}" height="${gridHeight.toFixed(1)}" rx="3" fill="rgba(248, 81, 73, 0.55)" />
        ${exportHeight > 0
          ? `<rect x="${x.toFixed(1)}" y="${baseline.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${exportHeight.toFixed(1)}" rx="3" fill="rgba(88, 166, 255, 0.75)" />`
          : ""}
        ${day.exceedanceKwh > 0
          ? `<circle cx="${(x + barWidth / 2).toFixed(1)}" cy="${markerY.toFixed(1)}" r="3.2" fill="#d29922" />`
          : ""}
      </g>
    `;
  }).join("");

  const labelMarkup = daily.map((day, index) => {
    if (index % labelStep !== 0 && index !== daily.length - 1) return "";
    const x = padLeft + index * step + step / 2;
    return `<text x="${x.toFixed(1)}" y="${height - 10}" text-anchor="middle" class="analysis-svg-x-label">${day.label}</text>`;
  }).join("");

  return `
    <div class="analysis-chart-scroller">
      <svg class="analysis-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Daily energy breakdown">
        <line x1="${padLeft}" y1="${baseline.toFixed(1)}" x2="${(width - padRight).toFixed(1)}" y2="${baseline.toFixed(1)}" class="analysis-svg-axis" />
        <text x="${padLeft - 8}" y="${(padTop + 4).toFixed(1)}" class="analysis-svg-tick">${fmtNum(maxPositive, 0)} kWh</text>
        ${maxNegative > 0
          ? `<text x="${padLeft - 8}" y="${(height - padBottom + 4).toFixed(1)}" class="analysis-svg-tick">-${fmtNum(maxNegative, 0)} kWh</text>`
          : ""}
        ${bars}
        ${labelMarkup}
      </svg>
    </div>
    <div class="analysis-chart-legend">
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span><span>Covered by solar</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(248, 81, 73, 0.55);"></span><span>From grid</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span><span>Exported</span></span>
      <span class="analysis-legend-item"><span class="analysis-legend-swatch" style="background:#d29922;"></span><span>Exceedance on that day</span></span>
    </div>
  `;
}

function heatmapColor(metric: "house" | "grid" | "solar", intensity: number): string {
  const clamped = clamp(intensity, 0, 1);
  if (metric === "solar") return `rgba(63, 185, 80, ${0.12 + clamped * 0.82})`;
  if (metric === "grid") return `rgba(210, 153, 34, ${0.12 + clamped * 0.82})`;
  return `rgba(248, 81, 73, ${0.12 + clamped * 0.82})`;
}

function renderHeatmap(matrix: number[][], metric: "house" | "grid" | "solar"): string {
  const values = matrix.flat();
  const maxValue = maxOr(values, 1);
  const minValue = minOr(values, 0);

  return `
    <div class="analysis-heatmap">
      <div class="analysis-heatmap-hours">
        <span class="analysis-heatmap-corner"></span>
        ${Array.from({ length: 24 }, (_, hour) => `
          <span class="analysis-heatmap-hour ${hour % 2 === 1 ? "analysis-heatmap-hour-faded" : ""}">${String(hour).padStart(2, "0")}</span>
        `).join("")}
      </div>
      ${matrix.map((row, weekdayIndex) => `
        <div class="analysis-heatmap-row">
          <span class="analysis-heatmap-day">${WEEKDAY_LABELS[weekdayIndex]}</span>
          ${row.map((value, hour) => {
            const normalized = maxValue === minValue ? 0 : (value - minValue) / (maxValue - minValue);
            return `
              <span
                class="analysis-heatmap-cell"
                style="background:${heatmapColor(metric, normalized)};"
                title="${WEEKDAY_LABELS[weekdayIndex]} ${String(hour).padStart(2, "0")}:00 - ${fmtNum(value, 2)} kW average"
              >${value > 0.05 ? fmtNum(value, 1) : ""}</span>
            `;
          }).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

function renderProgressBars(
  items: Array<{ label: string; value: number; meta: string; colorClass?: string }>,
): string {
  const maxValue = maxOr(items.map((item) => item.value), 1);
  if (!items.length) {
    return `<div class="analysis-empty">No standout patterns in this period.</div>`;
  }

  return `
    <div class="analysis-progress-list">
      ${items.map((item) => `
        <div class="analysis-progress-item">
          <div class="analysis-progress-header">
            <span>${item.label}</span>
            <strong>${item.meta}</strong>
          </div>
          <div class="analysis-progress-track">
            <span class="analysis-progress-fill ${item.colorClass ?? ""}" style="width:${(item.value / maxValue) * 100}%;"></span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderRangeControls(state: AppState): string {
  const periodStartValue = toDateInputValue(state.rangeData?.start ?? state.customStart);
  const periodEndValue = toDateInputValue(state.rangeData?.end ?? state.customEnd);

  return `
    <div class="range-selector">
      ${RANGES.map((range) => `
        <button
          class="range-btn ${range.id === state.range ? "active" : ""}"
          data-range="${range.id}"
        >${range.label}</button>
      `).join("")}
    </div>
    ${state.rangeData?.start && state.rangeData?.end
      ? `
        <div class="range-info-bar">
          Period: ${new Date(state.rangeData.start).toLocaleDateString()} - ${new Date(state.rangeData.end).toLocaleDateString()}
        </div>
      `
      : ""}
    ${state.range === "custom"
      ? `
        <div class="custom-range-picker">
          <label>
            <span>From</span>
            <input type="date" id="custom-start" value="${state.customStart ?? ""}" />
          </label>
          <label>
            <span>To</span>
            <input type="date" id="custom-end" value="${state.customEnd ?? ""}" />
          </label>
          <button class="btn btn-primary" id="apply-custom-range">Apply</button>
        </div>
      `
      : (periodStartValue && periodEndValue)
        ? `
          <div class="custom-range-picker period-preview">
            <span class="period-preview-label">Viewed period</span>
            <label>
              <span>From</span>
              <input type="date" value="${periodStartValue}" readonly aria-label="Preset period start" />
            </label>
            <label>
              <span>To</span>
              <input type="date" value="${periodEndValue}" readonly aria-label="Preset period end" />
            </label>
          </div>
        `
        : ""}
  `;
}

function renderSummaryStats(analytics: AnalyticsBundle, currency: string): string {
  return `
    <div class="analysis-stat-grid">
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Solar Coverage</span>
        <strong class="analysis-stat-value">${fmtNum(analytics.totals.coveragePct, 1)}%</strong>
        <span class="analysis-stat-meta">${fmtNum(analytics.totals.solarToHomeKwh)} kWh of ${fmtNum(analytics.totals.houseKwh)} kWh usage</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Self-Consumed Solar</span>
        <strong class="analysis-stat-value">${fmtNum(analytics.totals.selfConsumedPct, 1)}%</strong>
        <span class="analysis-stat-meta">${fmtNum(analytics.totals.solarToHomeKwh)} kWh kept at home, ${fmtNum(analytics.totals.exportKwh)} kWh exported</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Total Solar Value</span>
        <strong class="analysis-stat-value">${formatCurrency(analytics.totals.solarValue, currency)}</strong>
        <span class="analysis-stat-meta">Savings plus export revenue plus avoided exceedance charges</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Peak Net Grid</span>
        <strong class="analysis-stat-value">${fmtNum(analytics.totals.peakGridKw, 2)} kW</strong>
        <span class="analysis-stat-meta">Compared with ${fmtNum(analytics.totals.peakHouseKw, 2)} kW gross house load</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Exceedance Intervals</span>
        <strong class="analysis-stat-value">${fmtNum(analytics.totals.exceedanceIntervals, 0)}</strong>
        <span class="analysis-stat-meta">${fmtNum(analytics.totals.exceedanceKwh, 2)} kWh above the reference limit</span>
      </div>
      <div class="analysis-stat-card">
        <span class="analysis-stat-label">Variable Import Cost</span>
        <strong class="analysis-stat-value">${formatCurrency(analytics.totals.importCost, currency)}</strong>
        <span class="analysis-stat-meta">Energy-only import charges from the selected period</span>
      </div>
    </div>
  `;
}

function renderDailyBreakdownCard(analytics: AnalyticsBundle): string {
  return `
    <div class="card analysis-card analysis-card-full">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Daily Breakdown</h3>
          <p class="analysis-card-copy">House usage is split into solar-covered energy, grid energy, and exported surplus. A gold marker flags days with any reference-power exceedance.</p>
        </div>
      </div>
      ${renderDailyFlowChart(analytics.daily)}
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Daily exceedance volume</h4>
        ${renderLineChart({
          title: "Daily exceedance volume",
          series: [{ label: "Exceedance", color: "#d29922", values: analytics.daily.map((day) => day.exceedanceKwh) }],
          labels: analytics.daily.map((day) => day.label),
          valueFormatter: (value) => `${fmtNum(value, 2)} kWh`,
        })}
      </div>
    </div>
  `;
}

function renderHeatmapCard(state: AppState, analytics: AnalyticsBundle): string {
  return `
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Consumption Pattern Heatmap</h3>
          <p class="analysis-card-copy">Average hourly power by weekday. Use the switch to inspect total house usage, remaining grid draw, or solar production.</p>
        </div>
        <div class="chart-unit-toggle">
          <button class="unit-btn ${state.analysisHeatmapMetric === "house" ? "active" : ""}" data-analysis-heatmap="house">${HEATMAP_LABELS.house}</button>
          <button class="unit-btn ${state.analysisHeatmapMetric === "grid" ? "active" : ""}" data-analysis-heatmap="grid">${HEATMAP_LABELS.grid}</button>
          <button class="unit-btn ${state.analysisHeatmapMetric === "solar" ? "active" : ""}" data-analysis-heatmap="solar">${HEATMAP_LABELS.solar}</button>
        </div>
      </div>
      ${renderHeatmap(analytics.heatmapValues[state.analysisHeatmapMetric], state.analysisHeatmapMetric)}
      <p class="analysis-note">Each cell shows the average kW seen in that weekday/hour slot over the selected period.</p>
    </div>
  `;
}

function renderSolarCoverageCard(analytics: AnalyticsBundle, currency: string): string {
  const solarHomeShare = analytics.totals.solarKwh > 0
    ? (analytics.totals.solarToHomeKwh / analytics.totals.solarKwh) * 100
    : 0;
  const solarExportShare = analytics.totals.solarKwh > 0
    ? (analytics.totals.exportKwh / analytics.totals.solarKwh) * 100
    : 0;

  return `
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Solar Coverage Analysis</h3>
          <p class="analysis-card-copy">How much of the house was covered by solar, how much solar stayed on-site, and how solar translated into money over time.</p>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Coverage of house usage</span>
          <strong>${fmtNum(analytics.totals.coveragePct, 1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Self-consumed solar</span>
          <strong>${fmtNum(analytics.totals.selfConsumedPct, 1)}%</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Solar value</span>
          <strong>${formatCurrency(analytics.totals.solarValue, currency)}</strong>
        </div>
      </div>
      <div class="analysis-share-bar">
        <span class="analysis-share-segment analysis-share-segment-home" style="width:${solarHomeShare}%;"></span>
        <span class="analysis-share-segment analysis-share-segment-export" style="width:${solarExportShare}%;"></span>
      </div>
      <div class="analysis-share-legend">
        <span><span class="analysis-legend-swatch" style="background:rgba(63, 185, 80, 0.85);"></span>Self-consumed: ${fmtNum(analytics.totals.solarToHomeKwh)} kWh</span>
        <span><span class="analysis-legend-swatch" style="background:rgba(88, 166, 255, 0.75);"></span>Exported: ${fmtNum(analytics.totals.exportKwh)} kWh</span>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Coverage of house usage by day</h4>
        ${renderLineChart({
          title: "Daily solar coverage",
          series: [{ label: "Coverage", color: "#3fb950", values: analytics.daily.map((day) => day.coveragePct) }],
          labels: analytics.daily.map((day) => day.label),
          maxValue: 100,
          minValue: 0,
          valueFormatter: (value) => `${fmtNum(value, 0)}%`,
        })}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day</h4>
        ${renderLineChart({
          title: "Daily solar value",
          series: [{ label: "Solar value", color: "#58a6ff", values: analytics.daily.map((day) => day.solarValue) }],
          labels: analytics.daily.map((day) => day.label),
          valueFormatter: (value) => formatCurrency(value, currency),
        })}
      </div>
    </div>
  `;
}

function renderReferenceCard(analytics: AnalyticsBundle, currency: string): string {
  const worstHours = analytics.hourlyExceedanceKwh
    .map((value, hour) => ({ label: `${String(hour).padStart(2, "0")}:00`, value, meta: `${fmtNum(value, 2)} kWh`, colorClass: "analysis-progress-fill-warn" }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return `
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Reference Power and Peak Analysis</h3>
          <p class="analysis-card-copy">Where the reference limit was exceeded, how often it happened, and which hours or days were the main contributors.</p>
        </div>
      </div>
      <div class="analysis-inline-metrics">
        <div>
          <span class="analysis-inline-label">Exceeded intervals</span>
          <strong>${fmtNum(analytics.totals.exceedanceIntervals, 0)}</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Total exceedance</span>
          <strong>${fmtNum(analytics.totals.exceedanceKwh, 2)} kWh</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Peak over reference</span>
          <strong>${fmtNum(maxOr(analytics.topExceedances.map((point) => point.overKw), 0), 2)} kW</strong>
        </div>
        <div>
          <span class="analysis-inline-label">Exceedance cost</span>
          <strong>${formatCurrency(analytics.totals.exceedanceCost, currency)}</strong>
        </div>
      </div>
      <div class="analysis-subgrid">
        <div>
          <h4 class="analysis-subtitle">Worst hours</h4>
          ${renderProgressBars(worstHours)}
        </div>
        <div>
          <h4 class="analysis-subtitle">Worst days</h4>
          ${renderProgressBars(
            analytics.worstDays.map((day) => ({
              label: day.fullDate,
              value: day.exceedanceKwh,
              meta: `${fmtNum(day.exceedanceKwh, 2)} kWh`,
              colorClass: "analysis-progress-fill-warn",
            })),
          )}
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Top exceedance intervals</h4>
        ${analytics.topExceedances.length
          ? `
            <div class="analysis-table-wrap">
              <table class="analysis-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Net grid</th>
                    <th>Reference</th>
                    <th>Over</th>
                    <th>Solar then</th>
                  </tr>
                </thead>
                <tbody>
                  ${analytics.topExceedances.map((point) => `
                    <tr>
                      <td>${fmtDateTime(point.iso)}</td>
                      <td>${fmtNum(point.gridKw, 2)} kW</td>
                      <td>${fmtNum(point.referenceKw, 2)} kW</td>
                      <td>${fmtNum(point.overKw, 2)} kW</td>
                      <td>${fmtNum(point.solarKw, 2)} kW</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `
          : `<div class="analysis-empty">No reference exceedance was recorded in this period.</div>`}
      </div>
    </div>
  `;
}

function renderComparisonCard(
  current: AnalyticsBundle,
  state: AppState,
  config: BillingConfig,
): string {
  if (state.analysisComparisonLoading) {
    return `
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">${comparisonLabel(state)}</p>
          </div>
        </div>
        <div class="analysis-empty">Loading comparison period...</div>
      </div>
    `;
  }

  if (!state.analysisComparison?.consumptionTimeseries || !state.analysisComparison?.productionTimeseries) {
    return `
      <div class="card analysis-card">
        <div class="analysis-card-header">
          <div>
            <h3 class="card-title">Period Comparison</h3>
            <p class="analysis-card-copy">A matched previous period is shown here when enough historic data is available.</p>
          </div>
        </div>
        <div class="analysis-empty">Comparison data is unavailable for the selected range.</div>
      </div>
    `;
  }

  const previous = buildAnalytics(
    state.analysisComparison.consumptionTimeseries,
    state.analysisComparison.productionTimeseries,
    config,
  );
  const maxLength = Math.max(current.daily.length, previous.daily.length, 1);
  const dayIndexLabels = Array.from({ length: maxLength }, (_, index) => `D${index + 1}`);

  return `
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Period Comparison</h3>
          <p class="analysis-card-copy">${comparisonLabel(state)}</p>
        </div>
      </div>
      <div class="analysis-compare-grid">
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">House usage</span>
          <strong>${fmtNum(current.totals.houseKwh)} kWh</strong>
          <span class="analysis-compare-delta">${formatDelta(current.totals.houseKwh - previous.totals.houseKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Net grid usage</span>
          <strong>${fmtNum(current.totals.gridKwh)} kWh</strong>
          <span class="analysis-compare-delta">${formatDelta(current.totals.gridKwh - previous.totals.gridKwh)} kWh vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar coverage</span>
          <strong>${fmtNum(current.totals.coveragePct, 1)}%</strong>
          <span class="analysis-compare-delta">${formatDelta(current.totals.coveragePct - previous.totals.coveragePct)} pts vs previous</span>
        </div>
        <div class="analysis-compare-item">
          <span class="analysis-inline-label">Solar value</span>
          <strong>${formatCurrency(current.totals.solarValue, config.currency || "EUR")}</strong>
          <span class="analysis-compare-delta">${formatDelta(current.totals.solarValue - previous.totals.solarValue, 2)} ${config.currency || "EUR"} vs previous</span>
        </div>
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Usage by day index</h4>
        ${renderLineChart({
          title: "Current versus previous usage",
          series: [
            { label: "Current", color: "#f85149", values: current.daily.map((day) => day.houseKwh) },
            { label: "Previous", color: "#58a6ff", values: previous.daily.map((day) => day.houseKwh), dashed: true },
          ],
          labels: dayIndexLabels,
          valueFormatter: (value) => `${fmtNum(value, 1)} kWh`,
        })}
      </div>
      <div class="analysis-subchart">
        <h4 class="analysis-subtitle">Solar value by day index</h4>
        ${renderLineChart({
          title: "Current versus previous solar value",
          series: [
            { label: "Current", color: "#3fb950", values: current.daily.map((day) => day.solarValue) },
            { label: "Previous", color: "#d29922", values: previous.daily.map((day) => day.solarValue), dashed: true },
          ],
          labels: dayIndexLabels,
          valueFormatter: (value) => formatCurrency(value, config.currency || "EUR"),
        })}
      </div>
    </div>
  `;
}

function renderCostCard(analytics: AnalyticsBundle, currency: string): string {
  return `
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Tariff-Aware Cost Trends</h3>
          <p class="analysis-card-copy">Estimated variable import cost, solar savings, export earnings, and exceedance cost by day. Fixed monthly fees are intentionally left out so this stays behavior-driven.</p>
        </div>
      </div>
      ${renderLineChart({
        title: "Daily cost and value trends",
        series: [
          { label: "Import cost", color: "#f85149", values: analytics.daily.map((day) => day.importCost) },
          { label: "Solar savings", color: "#3fb950", values: analytics.daily.map((day) => day.solarSavings) },
          { label: "Export earnings", color: "#58a6ff", values: analytics.daily.map((day) => day.exportRevenue) },
          { label: "Exceedance cost", color: "#d29922", values: analytics.daily.map((day) => day.exceedanceCost) },
        ],
        labels: analytics.daily.map((day) => day.label),
        valueFormatter: (value) => formatCurrency(value, currency),
      })}
      <div class="analysis-cost-totals">
        <span>Import cost: <strong>${formatCurrency(analytics.totals.importCost, currency)}</strong></span>
        <span>Solar savings: <strong>${formatCurrency(analytics.totals.solarSavings, currency)}</strong></span>
        <span>Export earnings: <strong>${formatCurrency(analytics.totals.exportRevenue, currency)}</strong></span>
        <span>Exceedance cost: <strong>${formatCurrency(analytics.totals.exceedanceCost, currency)}</strong></span>
      </div>
    </div>
  `;
}

function renderLoadDurationCard(analytics: AnalyticsBundle, referencePowerKw: number): string {
  const durationLabels = Array.from(
    { length: Math.max(analytics.loadDurationGrossKw.length, analytics.loadDurationNetKw.length, 1) },
    (_, index) => `${index + 1}`,
  );

  return `
    <div class="card analysis-card">
      <div class="analysis-card-header">
        <div>
          <h3 class="card-title">Load Duration Curve</h3>
          <p class="analysis-card-copy">Gross house load and net grid load sorted from highest to lowest interval. This shows how often high demand really occurs and how much solar trims the top end.</p>
        </div>
      </div>
      ${renderLineChart({
        title: "Load duration curve",
        series: [
          { label: "Gross house load", color: "#f85149", values: analytics.loadDurationGrossKw },
          { label: "Net grid load", color: "#58a6ff", values: analytics.loadDurationNetKw },
        ],
        labels: durationLabels,
        referenceValue: referencePowerKw > 0 ? referencePowerKw : undefined,
        referenceLabel: referencePowerKw > 0 ? `Reference ${fmtNum(referencePowerKw, 1)} kW` : undefined,
        valueFormatter: (value) => `${fmtNum(value, 1)} kW`,
      })}
      <p class="analysis-note">Intervals are ordered from highest demand to lowest, so the left side is your hardest-to-handle load.</p>
    </div>
  `;
}

export function renderAnalysis(state: AppState): string {
  const config = state.config;
  const rangeData = state.rangeData;
  const consumptionTimeseries = state.consumptionTimeseries;
  const productionTimeseries = state.productionTimeseries;

  if (!config || !rangeData || !consumptionTimeseries || !productionTimeseries) {
    return `
      <section class="analysis-view">
        <div class="card">
          <p class="muted">Loading analysis data...</p>
        </div>
      </section>
    `;
  }

  const analytics = buildAnalytics(consumptionTimeseries, productionTimeseries, config);
  const currency = config.currency || "EUR";

  return `
    <section class="analysis-view">
      <div class="section-header analysis-section-header">
        <div>
          <span class="badge">Analysis</span>
          <h2>Charts and Optimization</h2>
          <p class="muted">Deeper electricity analysis for ${rangeLabel(state)}. This page is built from the same 15-minute data and billing settings that drive the dashboard and invoice.</p>
        </div>
        <div class="analysis-header-meta">
          <span>${rangeSubtitle(state)}</span>
          <span>${fmtNum(analytics.daily.length, 0)} day${analytics.daily.length === 1 ? "" : "s"} analysed</span>
        </div>
      </div>

      ${renderRangeControls(state)}
      ${renderSummaryStats(analytics, currency)}
      ${renderDailyBreakdownCard(analytics)}

      <div class="analysis-grid">
        ${renderHeatmapCard(state, analytics)}
        ${renderSolarCoverageCard(analytics, currency)}
      </div>

      <div class="analysis-grid">
        ${renderReferenceCard(analytics, currency)}
        ${renderComparisonCard(analytics, state, config)}
      </div>

      <div class="analysis-grid">
        ${renderCostCard(analytics, currency)}
        ${renderLoadDurationCard(analytics, config.reference_power_kw ?? 0)}
      </div>
    </section>
  `;
}
