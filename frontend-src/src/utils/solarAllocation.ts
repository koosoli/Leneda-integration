import type {
  BillingConfig,
  FeedInRate,
  PerMeterTimeseries,
  TimeseriesResponse,
} from "../api/leneda";

/** How self-consumption is split between PV systems in the same 15-min interval. */
export type SolarAllocationMode = "priority" | "prorata" | "mixed";

export interface ResolvedFeedInRate {
  meterId: string;
  shortId: string;
  displayName: string;
  rate: number;
  label: string;
  mode: string;
  /** null when the user left the priority blank — that system is allocated pro-rata. */
  selfUsePriority: number | null;
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
  allocationMode: SolarAllocationMode;
}

interface AllocationTargets {
  selfConsumedKwh: number;
  exportedKwh: number;
}

function finiteOr(value: number | undefined | null, fallback: number): number {
  return Number.isFinite(value) ? Number(value) : fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function resolveAllocationTargets(
  meters: SolarAllocationMeter[],
  officialSelfConsumedKwh?: number,
  officialExportedKwh?: number,
): AllocationTargets {
  const rawProduced = meters.reduce((sum, meter) => sum + meter.producedKwh, 0);
  const rawSelfConsumed = meters.reduce((sum, meter) => sum + meter.selfConsumedKwh, 0);
  const rawExported = meters.reduce((sum, meter) => sum + meter.exportedKwh, 0);
  const requestedSelfConsumed = finiteOr(officialSelfConsumedKwh, rawSelfConsumed);
  const requestedExported = finiteOr(officialExportedKwh, rawExported);
  const combinedRequested = Math.max(0, requestedSelfConsumed) + Math.max(0, requestedExported);
  const inferredSelfConsumedFromExport = Math.max(0, rawProduced - Math.max(0, requestedExported));

  if (rawProduced <= 0) {
    return { selfConsumedKwh: 0, exportedKwh: 0 };
  }

  if (combinedRequested <= rawProduced + 1e-6) {
    return {
      selfConsumedKwh: clamp(
        Math.max(Math.max(0, requestedSelfConsumed), inferredSelfConsumedFromExport),
        0,
        rawProduced,
      ),
      exportedKwh: clamp(Math.max(0, requestedExported), 0, rawProduced),
    };
  }

  const requestedSelfShare = combinedRequested > 0 ? Math.max(0, requestedSelfConsumed) / combinedRequested : 0;
  const maxSelfConsumed = Math.min(rawProduced, Math.max(0, requestedSelfConsumed));
  const scaledSelfConsumed = clamp(rawProduced * requestedSelfShare, 0, maxSelfConsumed);

  return {
    selfConsumedKwh: scaledSelfConsumed,
    exportedKwh: Math.max(0, rawProduced - scaledSelfConsumed),
  };
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
  const productionMeters = (config.meters ?? []).filter((meter) => meter.types.includes("production") || meter.types.includes("solar_consumption"));
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
      // A blank/absent priority means "no explicit order" — those systems are
      // allocated pro-rata to their own production (Prorata Modus).
      const rawPriority = rateConfig?.self_use_priority;
      const selfUsePriority =
        rawPriority == null || rawPriority === ("" as unknown) || !Number.isFinite(Number(rawPriority))
          ? null
          : Math.max(1, Math.round(Number(rawPriority)));
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
    .map((rate, order) => ({ rate, order }))
    .sort((a, b) => {
      // Unprioritised systems always sort behind prioritised ones; ties keep
      // their configured order and are later split pro-rata.
      const aKey = a.rate.selfUsePriority ?? Number.POSITIVE_INFINITY;
      const bKey = b.rate.selfUsePriority ?? Number.POSITIVE_INFINITY;
      if (aKey !== bKey) return aKey - bKey;
      return a.order - b.order;
    })
    .map((entry) => entry.rate);
}

/** Short per-system label describing how its self-consumption was allocated. */
export function selfUsePriorityLabel(priority: number | null): string {
  return priority == null ? "Pro-rata self-use" : `Self-use priority ${priority}`;
}

/** One-line explanation of the allocation method, shown under the breakdowns. */
export function allocationModeExplanation(mode: SolarAllocationMode): string {
  if (mode === "prorata") {
    return "Prorata Modus: no self-use priority is configured, so each PV system's self-consumption and export are shared in proportion to what it produced in each 15-minute interval.";
  }
  if (mode === "mixed") {
    return "Per-system self-consumption and export are allocated from each PV system's 15-minute production: systems with a self-use priority are served first (1 = consumed first at home), and systems sharing or missing a priority split the rest pro-rata to their own production.";
  }
  return "Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home).";
}

/** Classify how the resolved systems will be allocated, for labelling in the UI. */
export function resolveAllocationMode(rates: ResolvedFeedInRate[]): SolarAllocationMode {
  if (!rates.length) return "prorata";
  const explicit = rates.filter((rate) => rate.selfUsePriority != null);
  if (explicit.length === 0) return "prorata";
  if (explicit.length < rates.length) return "mixed";
  const distinct = new Set(explicit.map((rate) => rate.selfUsePriority));
  return distinct.size === explicit.length ? "priority" : "mixed";
}

/**
 * Group systems that share the same self-use tier.
 *
 * Each tier is served in order from the remaining house load; systems inside a
 * tier split that tier's self-consumption pro-rata to their own production. A
 * tier with a single system therefore behaves exactly like strict priority
 * allocation, and configs without any priority collapse to one pro-rata tier.
 */
function groupIntoTiers<T extends ResolvedFeedInRate>(rates: T[]): T[][] {
  const tiers: T[][] = [];
  let currentKey: number | null | undefined = undefined;
  for (const rate of rates) {
    const key = rate.selfUsePriority;
    if (tiers.length > 0 && key === currentKey) {
      tiers[tiers.length - 1].push(rate);
      continue;
    }
    tiers.push([rate]);
    currentKey = key;
  }
  return tiers;
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

  const tiers = groupIntoTiers(meters);

  for (const timestamp of [...allTimestamps].sort()) {
    let remainingHouseKw = Math.max(0, houseByTimestamp.get(timestamp) ?? 0);
    for (const tier of tiers) {
      const tierSolarKw = tier.map((meter) =>
        Math.max(0, productionByMeter.get(meter.meterId)?.get(timestamp) ?? 0),
      );
      const tierTotalKw = tierSolarKw.reduce((sum, kw) => sum + kw, 0);
      if (tierTotalKw <= 0) continue;

      const tierSelfConsumedKw = Math.min(remainingHouseKw, tierTotalKw);
      tier.forEach((meter, tierIdx) => {
        const meterIdx = meterIndexById.get(meter.meterId);
        if (meterIdx == null) return;

        const solarKw = tierSolarKw[tierIdx];
        // Pro-rata split of this tier's self-consumption by own production
        const selfConsumedKw = tierSelfConsumedKw * (solarKw / tierTotalKw);

        meters[meterIdx].producedKwh += solarKw * 0.25;
        meters[meterIdx].selfConsumedKwh += selfConsumedKw * 0.25;
        meters[meterIdx].exportedKwh += Math.max(0, solarKw - selfConsumedKw) * 0.25;
      });

      remainingHouseKw = Math.max(0, remainingHouseKw - tierSelfConsumedKw);
    }
  }

  const rawSelfConsumed = meters.reduce((sum, meter) => sum + meter.selfConsumedKwh, 0);
  const rawExported = meters.reduce((sum, meter) => sum + meter.exportedKwh, 0);
  const targets = resolveAllocationTargets(meters, officialSelfConsumedKwh, officialExportedKwh);
  const targetSelfConsumed = targets.selfConsumedKwh;
  const targetExported = targets.exportedKwh;
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
    allocationMode: resolveAllocationMode(resolvedRates),
  };
}
