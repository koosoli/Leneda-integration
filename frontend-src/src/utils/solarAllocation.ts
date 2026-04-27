import type {
  BillingConfig,
  FeedInRate,
  PerMeterTimeseries,
  TimeseriesResponse,
} from "../api/leneda";

export interface ResolvedFeedInRate {
  meterId: string;
  shortId: string;
  displayName: string;
  rate: number;
  label: string;
  mode: string;
  selfUsePriority: number;
}

export interface SolarAllocationMeter extends ResolvedFeedInRate {
  producedKwh: number;
  selfConsumedKwh: number;
  exportedKwh: number;
  revenue: number;
  exportEquivalentForSelfUse: number;
}

export interface SolarAllocationResult {
  meters: SolarAllocationMeter[];
  totalFeedInRevenue: number;
  totalSelfUseExportEquivalent: number;
  weightedExportRate: number;
  usedPriorityAllocation: boolean;
}

function finiteOr(value: number | undefined | null, fallback: number): number {
  return Number.isFinite(value) ? Number(value) : fallback;
}

export function defaultSolarSystemName(meterId: string, index: number): string {
  const suffix = meterId ? meterId.slice(-8) : "";
  return suffix ? `Solar ${index} (${suffix})` : `Solar ${index}`;
}

export function resolveSolarSystemName(
  meterId: string,
  index: number,
  configuredName?: string | null,
): string {
  const trimmedName = typeof configuredName === "string" ? configuredName.trim() : "";
  return trimmedName || defaultSolarSystemName(meterId, index);
}

export function resolveProductionFeedInRates(config: BillingConfig): ResolvedFeedInRate[] {
  const productionMeters = (config.meters ?? []).filter((meter) => meter.types.includes("production"));
  const feedInRates: FeedInRate[] = config.feed_in_rates ?? [];
  const currency = config.currency ?? "EUR";

  return productionMeters
    .map((meter, idx) => {
      const rateConfig = feedInRates.find((rate) => rate.meter_id === meter.id);
      const sensorOk =
        rateConfig?.mode === "sensor" &&
        rateConfig.sensor_value != null &&
        Number.isFinite(rateConfig.sensor_value);
      const effectiveRate = sensorOk
        ? rateConfig?.sensor_value ?? 0
        : finiteOr(rateConfig?.tariff, finiteOr(config.feed_in_tariff, 0));
      const selfUsePriority = Math.max(
        1,
        Math.round(finiteOr(rateConfig?.self_use_priority, idx + 1)),
      );
      const displayName = resolveSolarSystemName(meter.id, idx + 1, rateConfig?.display_name);

      return {
        meterId: meter.id,
        shortId: meter.id ? "…" + meter.id.slice(-8) : `Meter ${idx + 1}`,
        displayName,
        rate: effectiveRate,
        label: sensorOk
          ? `Sensor (${effectiveRate.toFixed(4)} ${currency}/kWh)`
          : "Fixed tariff",
        mode: rateConfig?.mode ?? "fixed",
        selfUsePriority,
      };
    })
    .sort((a, b) => {
      if (a.selfUsePriority !== b.selfUsePriority) {
        return a.selfUsePriority - b.selfUsePriority;
      }
      return a.meterId.localeCompare(b.meterId);
    });
}

export function calculatePrioritySolarAllocation(
  config: BillingConfig,
  consumptionTimeseries: TimeseriesResponse | null | undefined,
  perMeterProduction: PerMeterTimeseries[] | null | undefined,
  officialSelfConsumedKwh?: number,
  officialExportedKwh?: number,
): SolarAllocationResult | null {
  if (!consumptionTimeseries || !perMeterProduction?.length) {
    return null;
  }

  const resolvedRates = resolveProductionFeedInRates(config);
  if (!resolvedRates.length) {
    return null;
  }

  const perMeterMap = new Map(perMeterProduction.map((meter) => [meter.meter_id, meter]));
  if (!resolvedRates.some((rate) => perMeterMap.has(rate.meterId))) {
    return null;
  }

  const meters: SolarAllocationMeter[] = resolvedRates.map((rate) => ({
    ...rate,
    producedKwh: 0,
    selfConsumedKwh: 0,
    exportedKwh: 0,
    revenue: 0,
    exportEquivalentForSelfUse: 0,
  }));

  const meterIndexById = new Map(meters.map((meter, idx) => [meter.meterId, idx]));
  const productionByMeter = new Map<string, Map<string, number>>();
  const allTimestamps = new Set<string>();

  for (const item of consumptionTimeseries.items) {
    if (item.startedAt) allTimestamps.add(item.startedAt);
  }

  const houseByTimestamp = new Map<string, number>();
  for (const item of consumptionTimeseries.items) {
    const kw = Math.max(0, Number(item.value) || 0);
    houseByTimestamp.set(item.startedAt, (houseByTimestamp.get(item.startedAt) ?? 0) + kw);
  }

  for (const meter of perMeterProduction) {
    const itemMap = new Map<string, number>();
    for (const item of meter.items ?? []) {
      const kw = Math.max(0, Number(item.value) || 0);
      itemMap.set(item.startedAt, (itemMap.get(item.startedAt) ?? 0) + kw);
      if (item.startedAt) allTimestamps.add(item.startedAt);
    }
    productionByMeter.set(meter.meter_id, itemMap);
  }

  for (const timestamp of [...allTimestamps].sort()) {
    let remainingHouseKw = Math.max(0, houseByTimestamp.get(timestamp) ?? 0);
    for (const meter of meters) {
      const meterIdx = meterIndexById.get(meter.meterId);
      if (meterIdx == null) continue;

      const solarKw = Math.max(0, productionByMeter.get(meter.meterId)?.get(timestamp) ?? 0);
      const solarKwh = solarKw * 0.25;
      const selfConsumedKw = Math.min(remainingHouseKw, solarKw);
      const selfConsumedKwh = selfConsumedKw * 0.25;
      const exportedKwh = Math.max(0, solarKw - selfConsumedKw) * 0.25;

      meters[meterIdx].producedKwh += solarKwh;
      meters[meterIdx].selfConsumedKwh += selfConsumedKwh;
      meters[meterIdx].exportedKwh += exportedKwh;

      remainingHouseKw = Math.max(0, remainingHouseKw - selfConsumedKw);
    }
  }

  const rawSelfConsumed = meters.reduce((sum, meter) => sum + meter.selfConsumedKwh, 0);
  const rawExported = meters.reduce((sum, meter) => sum + meter.exportedKwh, 0);
  const targetSelfConsumed = Math.max(0, officialSelfConsumedKwh ?? rawSelfConsumed);
  const targetExported = Math.max(0, officialExportedKwh ?? rawExported);
  const selfScale = rawSelfConsumed > 0 ? targetSelfConsumed / rawSelfConsumed : 1;
  const exportScale = rawExported > 0 ? targetExported / rawExported : 1;

  for (const meter of meters) {
    meter.selfConsumedKwh *= selfScale;
    meter.exportedKwh *= exportScale;
    meter.revenue = meter.exportedKwh * meter.rate;
    meter.exportEquivalentForSelfUse = meter.selfConsumedKwh * meter.rate;
  }

  const totalFeedInRevenue = meters.reduce((sum, meter) => sum + meter.revenue, 0);
  const totalSelfUseExportEquivalent = meters.reduce(
    (sum, meter) => sum + meter.exportEquivalentForSelfUse,
    0,
  );
  const weightedExportRate = targetExported > 0 ? totalFeedInRevenue / targetExported : 0;

  return {
    meters,
    totalFeedInRevenue,
    totalSelfUseExportEquivalent,
    weightedExportRate,
    usedPriorityAllocation: true,
  };
}
