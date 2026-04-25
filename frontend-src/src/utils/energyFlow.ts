import type { TimeseriesResponse } from "../api/leneda";

export interface EnergyFlowPoint {
  timestamp: number;
  iso: string;
  consumptionKw: number;
  productionKw: number;
  solarToHomeKw: number;
  gridImportKw: number;
  solarExportKw: number;
}

interface EnergyFlowOptions {
  gridImport?: TimeseriesResponse | null;
  marketExport?: TimeseriesResponse | null;
}

interface FlowAccumulator {
  iso: string;
  consumptionKw: number;
  productionKw: number;
  gridImportKw: number;
  solarExportKw: number;
}

function createAccumulator(iso = ""): FlowAccumulator {
  return {
    iso,
    consumptionKw: 0,
    productionKw: 0,
    gridImportKw: 0,
    solarExportKw: 0,
  };
}

function addSeries(
  pointMap: Map<number, FlowAccumulator>,
  response: TimeseriesResponse | null | undefined,
  field: keyof Pick<FlowAccumulator, "consumptionKw" | "productionKw" | "gridImportKw" | "solarExportKw">,
): void {
  for (const item of response?.items ?? []) {
    const timestamp = new Date(item.startedAt).getTime();
    if (!Number.isFinite(timestamp)) continue;

    const existing = pointMap.get(timestamp) ?? createAccumulator(item.startedAt);
    existing[field] += Math.max(0, Number(item.value) || 0);
    if (!existing.iso) existing.iso = item.startedAt;
    pointMap.set(timestamp, existing);
  }
}

export function buildEnergyFlowPoints(
  consumption: TimeseriesResponse,
  production: TimeseriesResponse,
  options: EnergyFlowOptions = {},
): EnergyFlowPoint[] {
  const pointMap = new Map<number, FlowAccumulator>();
  const hasGridImport = Boolean(options.gridImport?.items?.length);
  const hasMarketExport = Boolean(options.marketExport?.items?.length);

  addSeries(pointMap, consumption, "consumptionKw");
  addSeries(pointMap, production, "productionKw");
  addSeries(pointMap, options.gridImport, "gridImportKw");
  addSeries(pointMap, options.marketExport, "solarExportKw");

  return [...pointMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([timestamp, values]) => {
      const consumptionKw = Math.max(0, values.consumptionKw);
      const productionKw = Math.max(0, values.productionKw);
      const fallbackSolarToHomeKw = Math.max(0, Math.min(consumptionKw, productionKw));
      const gridImportKw = hasGridImport
        ? Math.max(0, values.gridImportKw)
        : Math.max(0, consumptionKw - fallbackSolarToHomeKw);
      const solarToHomeKw = Math.max(0, consumptionKw - gridImportKw);
      const solarExportKw = hasMarketExport
        ? Math.max(0, values.solarExportKw)
        : Math.max(0, productionKw - fallbackSolarToHomeKw);

      return {
        timestamp,
        iso: values.iso || new Date(timestamp).toISOString(),
        consumptionKw,
        productionKw,
        solarToHomeKw,
        gridImportKw,
        solarExportKw,
      };
    });
}
