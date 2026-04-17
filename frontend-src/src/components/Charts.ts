/**
 * Charts — Chart.js bar chart for energy timeseries visualization.
 *
 * Supports two display modes:
 *  - kW:  Raw 15-min power readings split into house demand covered by solar
 *         versus remaining draw from the grid, with a reference power limit line.
 *  - kWh: Energy view using the same source split, aggregated to daily totals
 *         when the period gets large.
 *
 * Interactive zoom (mouse-wheel / pinch) and pan (drag) on the x-axis.
 * When the visible range changes, an optional onZoomChange callback fires
 * so the app can re-fetch aggregated data for the visible period.
 */
import { Chart, registerables, type ChartConfiguration } from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import type { TimeseriesResponse, TimeseriesItem, PerMeterTimeseries } from "../api/leneda";

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
  /** Visual split: house consumption overlay or explicit grid-draw split. */
  consumptionView?: "house" | "grid";
  /** Reference power limit in kW. Drawn as a horizontal line in kW mode. */
  referencePowerKw: number;
  /** Called when the user zooms / pans — receives the visible ISO date range. */
  onZoomChange?: (start: string, end: string) => void;
  /** Per-meter production data for stacked green-shade chart. */
  perMeterProduction?: PerMeterTimeseries[];
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

function toLocalDayKey(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDayKeyToTimestamp(dayKey: string): number {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0).getTime();
}

function aggregateFlowBreakdownToDaily(
  points: FlowBreakdownPoint[],
): FlowBreakdownPoint[] {
  const dayMap = new Map<string, Omit<FlowBreakdownPoint, "x">>();

  for (const point of points) {
    const day = toLocalDayKey(point.x);
    const existing = dayMap.get(day) ?? {
      y: 0,
      consumption: 0,
      production: 0,
      solarToHome: 0,
      gridImport: 0,
      solarExport: 0,
    };

    existing.y += point.y * 0.25;
    existing.consumption += point.consumption * 0.25;
    existing.production += point.production * 0.25;
    existing.solarToHome += point.solarToHome * 0.25;
    existing.gridImport += point.gridImport * 0.25;
    existing.solarExport += point.solarExport * 0.25;
    dayMap.set(day, existing);
  }

  return [...dayMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([day, values]) => ({
      x: localDayKeyToTimestamp(day),
      ...values,
    }));
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
  } = options;
  const totalPoints = Math.max(consumption.items.length, production.items.length);
  const rawPoints = buildRawTimePoints(consumption.items, production.items);
  const rawFlowBreakdown = buildFlowBreakdown(rawPoints.consumption, rawPoints.production);
  const useDaily = unit === "kwh" && totalPoints > 120;
  const flowBreakdown =
    unit === "kw"
      ? rawFlowBreakdown
      : useDaily
        ? aggregateFlowBreakdownToDaily(rawFlowBreakdown)
        : scaleFlowBreakdown(rawFlowBreakdown, 0.25);
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

  const isGridView = consumptionView === "grid";
  const showRefLine = unit === "kw" && referencePowerKw > 0 && isGridView;
  const hasSolarExport = solarExportPoints.some((point) => point.y > 0.0001);

  // Remaining grid draw is what matters for reference-power exceedance.
  const gridImportColors = gridImportPoints.map((p) =>
    showRefLine && p.y > referencePowerKw
      ? "rgba(248, 81, 73, 1)"
      : "rgba(248, 81, 73, 0.55)"
  );
  const gridImportBorderColors = gridImportPoints.map((p) =>
    showRefLine && p.y > referencePowerKw ? "#ff3b30" : "#f85149"
  );

  // Determine time unit for display based on data span
  const timestamps = flowBreakdown.map((p) => p.x);
  const spanMs = timestamps.length > 1 ? Math.max(...timestamps) - Math.min(...timestamps) : 0;
  const spanDays = spanMs / 86_400_000;
  const timeUnit = useDaily || spanDays > 2 ? "day" : "hour";
  const barPercentage = spanDays > 7 ? 0.85 : 0.65;
  const datasets = isGridView
    ? [
      {
        label: `Covered by Solar (${yLabel})`,
        data: solarToHomePoints as any,
        backgroundColor: "rgba(63, 185, 80, 0.70)",
        borderColor: "#3fb950",
        borderWidth: 1,
        borderRadius: unit === "kwh" ? 4 : 2,
        barPercentage,
        stack: "house-usage",
      },
      {
        label: `From Grid (${yLabel})`,
        data: gridImportPoints as any,
        backgroundColor: gridImportColors,
        borderColor: gridImportBorderColors,
        borderWidth: 1,
        borderRadius: unit === "kwh" ? 4 : 2,
        barPercentage,
        stack: "house-usage",
      },
      ...(hasSolarExport
        ? [{
          label: `Solar Exported (${yLabel})`,
          data: solarExportDisplayPoints as any,
          backgroundColor: "rgba(88, 166, 255, 0.60)",
          borderColor: "#58a6ff",
          borderWidth: 1,
          borderRadius: unit === "kwh" ? 4 : 2,
          barPercentage,
          stack: "solar-export",
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
        borderRadius: unit === "kwh" ? 4 : 2,
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
        borderRadius: unit === "kwh" ? 4 : 2,
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
          borderRadius: unit === "kwh" ? 4 : 2,
          barPercentage: Math.min(0.95, barPercentage + 0.1),
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
            generateLabels(chart) {
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
            title(items) {
              if (!items.length) return "";
              const raw = items[0].raw as TimePoint;
              const d = new Date(raw.x);
              return spanDays > 2
                ? d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                : d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
            },
            label(tooltipCtx) {
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
            footer(items) {
              if (!items.length) return "";
              const raw = items[0].raw as TimePoint;
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
            enabled: true,
            mode: "x",
            onPanComplete({ chart }: { chart: Chart }) {
              emitZoomChange(chart, onZoomChange);
            },
          },
          zoom: {
            wheel: { enabled: true, speed: 0.08 },
            pinch: { enabled: true },
            drag: {
              enabled: false,      // use wheel zoom + drag-to-pan
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
              min: timestamps.length ? Math.min(...timestamps) - 3_600_000 : undefined,
              max: timestamps.length ? Math.max(...timestamps) + 3_600_000 : undefined,
            },
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: timeUnit,
            displayFormats: {
              hour: "HH:mm",
              day: "MMM d",
            },
            tooltipFormat: "PPp",
          },
          ticks: {
            color: clrMuted,
            maxTicksLimit: 14,
            font: { size: 10 },
            maxRotation: 45,
          },
          grid: { color: clrBorder },
          // offset: true keeps bars centred on their time tick
          offset: true,
          stacked: isGridView,
        },
        y: {
          beginAtZero: true,
          stacked: isGridView,
          ticks: {
            color: clrMuted,
            font: { size: 10 },
            callback(value) { return `${value} ${yLabel}`; },
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
