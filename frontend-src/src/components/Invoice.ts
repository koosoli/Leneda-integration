/**
 * Invoice — Energy cost calculator using Luxembourg billing model.
 *
 * Includes:
 * - Standard consumption costs (fixed + variable)
 * - Network costs (metering, reference power, variable)
 * - Reference power exceedance surcharge (Referenzwert)
 * - Feed-in revenue (money earned from selling exported energy)
 * - Compensation fund, electricity tax, VAT
 */
import type { AppState } from "./App";
import { RANGES } from "./Dashboard";
import type {
  MeterMonthlyFee,
  DayGroup,
  ConsumptionRateWindow,
  ReferencePowerWindow,
  TimeseriesItem,
} from "../api/leneda";
import { fmtDate, fmtNum } from "../utils/format";
import {
  calculatePrioritySolarAllocation,
  resolveProductionFeedInRates,
} from "../utils/solarAllocation";

const CREOS_REFERENCE_POWER_LEVELS: ReadonlyArray<{
  kw: number;
  fixedMonthlyFee: number;
  existingContractsOnly?: boolean;
}> = [
  { kw: 3, fixedMonthlyFee: 7.42 },
  { kw: 7, fixedMonthlyFee: 12.84 },
  { kw: 12, fixedMonthlyFee: 19.61 },
  { kw: 17, fixedMonthlyFee: 26.39 },
  { kw: 27, fixedMonthlyFee: 39.94 },
  { kw: 43, fixedMonthlyFee: 61.62 },
  { kw: 70, fixedMonthlyFee: 98.20 },
  { kw: 100, fixedMonthlyFee: 138.85 },
  { kw: 150, fixedMonthlyFee: 206.60, existingContractsOnly: true },
  { kw: 200, fixedMonthlyFee: 274.35, existingContractsOnly: true },
];

function parseDateOnly(value?: string): Date | null {
  if (!value) return null;

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function toDateInputValue(value?: string): string {
  if (!value) return "";
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

/**
 * Compute the number of days in the viewed period and a proration factor
 * so fixed monthly costs (energy_fixed_fee, network_metering_rate,
 * network_power_ref_rate) are scaled to the period length.
 */
function periodProration(
  range: string,
  customStart?: string,
  customEnd?: string,
  rangeStart?: string,
  rangeEnd?: string,
): { days: number; factor: number; label: string } {
  const now = new Date();
  const parsedStart = parseDateOnly(rangeStart);
  const parsedEnd = parseDateOnly(rangeEnd);

  let start = parsedStart;
  let end = parsedEnd;

  if (!start || !end) {
    switch (range) {
      case "yesterday": {
        const d = new Date(now);
        d.setDate(d.getDate() - 1);
        start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        end = new Date(start);
        break;
      }
      case "this_week": {
        const d = new Date(now);
        const day = d.getDay() || 7;
        start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 1);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      }
      case "last_week": {
        const d = new Date(now);
        const day = d.getDay() || 7;
        const mondayThisWeek = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 1);
        start = new Date(mondayThisWeek.getFullYear(), mondayThisWeek.getMonth(), mondayThisWeek.getDate() - 7);
        end = new Date(mondayThisWeek.getFullYear(), mondayThisWeek.getMonth(), mondayThisWeek.getDate() - 1);
        break;
      }
      case "this_month": {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      }
      case "last_month": {
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      }
      case "this_year": {
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      }
      case "last_year": {
        start = new Date(now.getFullYear() - 1, 0, 1);
        end = new Date(now.getFullYear() - 1, 11, 31);
        break;
      }
      case "custom": {
        start = parseDateOnly(customStart) ?? new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = parseDateOnly(customEnd) ?? new Date(start);
        break;
      }
      default: {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        end = new Date(start);
        break;
      }
    }
  }

  if (end < start) {
    const swap = start;
    start = end;
    end = swap;
  }

  let days = 0;
  let factor = 0;
  const cursor = new Date(start);

  while (cursor <= end) {
    const monthDays = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    factor += 1 / monthDays;
    days += 1;
    cursor.setDate(cursor.getDate() + 1);
  }

  const fullMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === 1 &&
    end.getDate() === new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();

  return {
    days,
    factor,
    label: fullMonth ? "full month" : `${days} day${days === 1 ? "" : "s"}`,
  };
}

function matchesDayGroup(day: number, dayGroup: DayGroup): boolean {
  if (dayGroup === "all") return true;
  if (dayGroup === "weekdays") return day >= 1 && day <= 5;
  return day === 0 || day === 6;
}

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map((part) => parseInt(part, 10) || 0);
  return hours * 60 + minutes;
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

function calculateWindowedUsage(
  items: TimeseriesItem[],
  baseRate: number,
  baseReferencePower: number,
  rateWindows: ConsumptionRateWindow[],
  referenceWindows: ReferencePowerWindow[],
  productionItems: TimeseriesItem[] = [],
): {
  energyCost: number;
  exceedanceKwh: number;
  grossExceedanceKwh: number;
  avoidedExceedanceKwh: number;
  peakPowerKw: number;
  grossPeakPowerKw: number;
  rateBreakdown: Array<{ label: string; rate: number; kwh: number }>;
} {
  const breakdown = new Map<string, { label: string; rate: number; kwh: number }>();
  let energyCost = 0;
  let exceedanceKwh = 0;
  let grossExceedanceKwh = 0;
  let peakPowerKw = 0;
  let grossPeakPowerKw = 0;
  const productionByTs = new Map<string, number>();

  for (const item of productionItems) {
    const solarKw = Number(item.value) || 0;
    productionByTs.set(item.startedAt, (productionByTs.get(item.startedAt) ?? 0) + solarKw);
  }

  for (const item of items) {
    const kw = Number(item.value) || 0;
    const kwh = kw * 0.25;
    const solarKw = productionByTs.get(item.startedAt) ?? 0;
    const netKw = Math.max(0, kw - solarKw);
    const timestamp = new Date(item.startedAt);
    if (Number.isNaN(timestamp.getTime())) continue;

    const rateWindow = findConsumptionWindow(timestamp, rateWindows);
    const referenceWindow = findReferenceWindow(timestamp, referenceWindows);
    const appliedRate = rateWindow?.rate ?? baseRate;
    const appliedLabel = rateWindow?.label?.trim() || "Base tariff";
    const appliedReference = referenceWindow?.reference_power_kw ?? baseReferencePower;

    energyCost += kwh * appliedRate;
    grossPeakPowerKw = Math.max(grossPeakPowerKw, kw);
    peakPowerKw = Math.max(peakPowerKw, netKw);
    if (kw > appliedReference) {
      grossExceedanceKwh += (kw - appliedReference) * 0.25;
    }
    if (netKw > appliedReference) {
      exceedanceKwh += (netKw - appliedReference) * 0.25;
    }

    const key = `${appliedLabel}__${appliedRate}`;
    const existing = breakdown.get(key);
    if (existing) {
      existing.kwh += kwh;
    } else {
      breakdown.set(key, { label: appliedLabel, rate: appliedRate, kwh });
    }
  }

  return {
    energyCost,
    exceedanceKwh,
    grossExceedanceKwh,
    avoidedExceedanceKwh: Math.max(0, grossExceedanceKwh - exceedanceKwh),
    peakPowerKw,
    grossPeakPowerKw,
    rateBreakdown: Array.from(breakdown.values()).sort((a, b) => a.label.localeCompare(b.label)),
  };
}

export function renderInvoice(state: AppState): string {
  const config = state.config;
  const d = state.rangeData;

  if (!config || !d) {
    return `
      <section class="invoice-view">
        <div class="card">
          <p class="muted">Loading billing configuration…</p>
        </div>
      </section>
    `;
  }

  // ── Values from data ──
  const consumption = d.consumption || 0;
  const production = d.production || 0;
  const exported = d.exported || 0;
  const soldToMarket = Math.max(0, exported);
  const solarToHome = Math.max(
    0,
    d.solar_to_home ??
      d.direct_solar_to_home ??
      (d.self_consumed && d.self_consumed > 0 ? d.self_consumed : production - soldToMarket),
  );
  const billedConsumption = Math.max(0, d.grid_import ?? (consumption - solarToHome));
  const peakPower = d.peak_power_kw || 0;
  const refPower = config.reference_power_kw || 5;
  // Cumulative kWh consumed above reference power (sum of 15-min overage × 0.25 h)
  const exceedanceKwh = d.exceedance_kwh || 0;
  const gasEnergy = d.gas_energy || 0;
  const gasVolume = d.gas_volume || 0;
  const hasGas = gasEnergy > 0 || gasVolume > 0;
  const rateWindows = config.consumption_rate_windows ?? [];
  const referenceWindows = config.reference_power_windows ?? [];
  const windowedUsage = state.consumptionTimeseries
    ? calculateWindowedUsage(
      state.consumptionTimeseries.items,
      config.energy_variable_rate,
      refPower,
      rateWindows,
      referenceWindows,
      state.productionTimeseries?.items ?? [],
    )
    : null;
  const usesTariffWindows =
    rateWindows.length > 0 &&
    !!windowedUsage &&
    Math.abs(billedConsumption - consumption) < 0.01;
  const usesReferenceWindows = referenceWindows.length > 0 && !!windowedUsage;
  const effectivePeakPower = windowedUsage ? windowedUsage.peakPowerKw : peakPower;
  const effectiveExceedanceKwh = windowedUsage ? windowedUsage.exceedanceKwh : exceedanceKwh;
  const periodStartValue = toDateInputValue(d.start ?? state.customStart);
  const periodEndValue = toDateInputValue(d.end ?? state.customEnd);

  // ── Period proration ──
  // Fixed monthly fees are scaled to the viewed period length.
  const { days: periodDays, factor: proFactor, label: proLabel } = periodProration(
    state.range, state.customStart, state.customEnd, d.start, d.end,
  );
  const proratedFixedFee = config.energy_fixed_fee * proFactor;
  const proratedMetering = config.network_metering_rate * proFactor;
  const proratedPowerRef = config.network_power_ref_rate * proFactor;

  // ── Cost calculation (Luxembourg model) ──

  // 1. Energy supplier costs
  const energyCost = usesTariffWindows
    ? windowedUsage!.energyCost
    : billedConsumption * config.energy_variable_rate;

  // 2. Network costs
  const networkVariableCost = billedConsumption * config.network_variable_rate;

  // 3. Reference power exceedance (Referenzwert / Dépassement)
  //    exceedance_kwh is the total energy consumed above the reference power
  //    across all 15-min intervals, computed by the backend coordinator.
  const exceedanceCost = effectiveExceedanceKwh * config.exceedance_rate;

  // 3b. Per-meter monthly fees (extra metering points)
  const meterFees: MeterMonthlyFee[] = config.meter_monthly_fees ?? [];
  const meterFeesTotal = meterFees.reduce((s, f) => s + (f.fee || 0), 0) * proFactor;

  // 4. Taxes & levies
  const compensationCredit = billedConsumption * config.compensation_fund_rate;
  const electricityTax = billedConsumption * config.electricity_tax_rate;
  const connectDiscount = Math.max(0, config.connect_discount ?? 0) * proFactor;

  // 5. Subtotal (costs) — fixed fees are prorated
  const subtotalCosts =
    proratedFixedFee +
    energyCost +
    proratedMetering +
    proratedPowerRef +
    networkVariableCost +
    exceedanceCost +
    meterFeesTotal +
    compensationCredit +
    electricityTax -
    connectDiscount;

  const vat = subtotalCosts * config.vat_rate;
  const totalCosts = subtotalCosts + vat;

  // 6. Feed-in revenue (per-production-meter rates)
  //    When per-meter 15-minute production is available, self-use/export is
  //    allocated by the configured PV self-use priority.
  const resolvedRates = resolveProductionFeedInRates(config);

  const prioritySolarAllocation = calculatePrioritySolarAllocation(
    config,
    state.consumptionTimeseries,
    state.perMeterProductionTimeseries?.meters ?? null,
    solarToHome,
    soldToMarket,
  );

  // Effective average feed-in rate — filter out invalid entries before averaging
  const validRates = resolvedRates.filter((r) => isFinite(r.rate) && r.rate > 0);
  const hasMultipleRates = resolvedRates.length > 1;
  const avgFeedInRate = prioritySolarAllocation
    ? prioritySolarAllocation.weightedExportRate
    : validRates.length > 0
      ? validRates.reduce((sum, r) => sum + r.rate, 0) / validRates.length
      : config.feed_in_tariff;
  const feedInRevenue = prioritySolarAllocation
    ? prioritySolarAllocation.totalFeedInRevenue
    : soldToMarket * avgFeedInRate;
  const allocatedExportKwhPerMeter = hasMultipleRates && resolvedRates.length > 0
    ? soldToMarket / resolvedRates.length
    : soldToMarket;
  const feedInRows = prioritySolarAllocation
    ? prioritySolarAllocation.meters
    : resolvedRates.map((r) => ({
      ...r,
      producedKwh: 0,
      exportedKwh: allocatedExportKwhPerMeter,
      revenue: allocatedExportKwhPerMeter * r.rate,
      selfConsumedKwh: 0,
      exportEquivalentForSelfUse: 0,
    }));
  const usesPrioritySolarAllocation = !!prioritySolarAllocation;

  // ── Solar Revenue Tracking ──
  // Total value generated by production: self-consumed savings + avoided exceedance + feed-in revenue
  const selfConsumed = solarToHome;
  const selfConsumedSavings = selfConsumed * (config.energy_variable_rate + config.network_variable_rate + config.electricity_tax_rate + config.compensation_fund_rate);
  const selfConsumedSavingsVat = selfConsumedSavings * config.vat_rate;
  const totalSelfConsumedSavings = selfConsumedSavings + selfConsumedSavingsVat;
  const selfConsumptionExportEquivalent = prioritySolarAllocation
    ? prioritySolarAllocation.totalSelfUseExportEquivalent
    : selfConsumed * avgFeedInRate;
  const selfConsumptionAdvantage = totalSelfConsumedSavings - selfConsumptionExportEquivalent;
  const avoidedExceedanceKwh = Math.max(0, windowedUsage?.avoidedExceedanceKwh ?? 0);
  const avoidedExceedanceCost = avoidedExceedanceKwh * config.exceedance_rate;
  const avoidedExceedanceVat = avoidedExceedanceCost * config.vat_rate;
  const totalAvoidedExceedanceSavings = avoidedExceedanceCost + avoidedExceedanceVat;
  const hasAvoidedExceedanceSavings = avoidedExceedanceKwh > 0.0001;
  const totalSolarValue = totalSelfConsumedSavings + totalAvoidedExceedanceSavings + feedInRevenue;

  // 7. Net amount
  const netTotal = totalCosts - feedInRevenue;

  // ── Gas cost calculation ──
  const gasFixedFee = (config.gas_fixed_fee ?? 6.50) * proFactor;
  const gasVariableCost = gasEnergy * (config.gas_variable_rate ?? 0.0550);
  const gasNetworkFee = (config.gas_network_fee ?? 4.80) * proFactor;
  const gasNetworkVariableCost = gasEnergy * (config.gas_network_variable_rate ?? 0.0120);
  const gasTax = gasEnergy * (config.gas_tax_rate ?? 0.0010);
  const gasSubtotal = gasFixedFee + gasVariableCost + gasNetworkFee + gasNetworkVariableCost + gasTax;
  const gasVat = gasSubtotal * (config.gas_vat_rate ?? 0.08);
  const gasTotalCosts = gasSubtotal + gasVat;

  const currency = config.currency || "EUR";
  const fmt = (v: number) => `${fmtNum(v, 2)} ${currency}`;
  const fmtSigned = (v: number) => `${v > 0 ? "+" : v < 0 ? "-" : ""}${fmtNum(Math.abs(v), 2)} ${currency}`;
  const fmtKwh = (v: number) => fmtNum(v, 3);
  const fmtVolume = (v: number) => fmtNum(v, 3);
  const selfUseVsExportDetail = usesPrioritySolarAllocation
    ? `Compared with exporting the same ${fmtKwh(selfConsumed)} kWh using the configured PV self-use priority and each system's own feed-in tariff`
    : `Compared with selling the same ${fmtKwh(selfConsumed)} kWh at ${fmtNum(avgFeedInRate, 4)} ${currency}/kWh`;
  const currentReferenceLevel = CREOS_REFERENCE_POWER_LEVELS.find(
    (level) => Math.abs(level.kw - refPower) < 0.05,
  );
  const baseSubtotalWithoutReferencePower = subtotalCosts - proratedPowerRef - exceedanceCost;
  const referencePowerComparison = windowedUsage
    ? CREOS_REFERENCE_POWER_LEVELS.map((level) => {
      const simulatedUsage = calculateWindowedUsage(
        state.consumptionTimeseries!.items,
        config.energy_variable_rate,
        level.kw,
        rateWindows,
        referenceWindows,
        state.productionTimeseries?.items ?? [],
      );
      const fixedCharge = level.fixedMonthlyFee * proFactor;
      const comparisonExceedanceCharge = simulatedUsage.exceedanceKwh * config.exceedance_rate;
      const simulatedSubtotal = baseSubtotalWithoutReferencePower + fixedCharge + comparisonExceedanceCharge;
      const total = simulatedSubtotal * (1 + config.vat_rate);

      return {
        ...level,
        fixedCharge,
        exceedanceKwh: simulatedUsage.exceedanceKwh,
        exceedanceCharge: comparisonExceedanceCharge,
        total,
        deltaVsCurrent: total - totalCosts,
      };
    })
    : [];
  const optimalReferenceLevel = referencePowerComparison.reduce<typeof referencePowerComparison[number] | null>(
    (best, level) => {
      if (!best || level.total < best.total) return level;
      return best;
    },
    null,
  );
  const formatDeltaVsCurrent = (value: number): string => {
    if (Math.abs(value) < 0.005) return "Current total";
    return `${value > 0 ? "+" : "-"}${fmt(Math.abs(value))}`;
  };
  const rangeLabel = d.start && d.end
    ? `${fmtDate(d.start)} — ${fmtDate(d.end)}`
    : state.range.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // ── Exceedance warning ──
  const exceedanceWarning = effectiveExceedanceKwh > 0
    ? `<div class="card exceedance-warning">
        <strong>⚠️ Reference Power Exceeded</strong>
        <p>Peak load: <strong>${fmtNum(effectivePeakPower, 1)} kW</strong> &mdash; ${usesReferenceWindows ? "Reference power windows active" : `Reference power level: ${fmtNum(refPower, 1)} kW`}</p>
        <p>Exceedance volume: <strong>${fmtKwh(effectiveExceedanceKwh)} kWh</strong></p>
        <p class="muted">Exceedance charge: ${fmt(exceedanceCost)}</p>
      </div>`
    : "";

  const energyRateRows = usesTariffWindows
    ? windowedUsage!.rateBreakdown.map((entry) => `
            <tr>
              <td>${entry.label} (${fmtKwh(entry.kwh)} kWh)</td>
              <td style="text-align: right;">${fmtNum(entry.rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(entry.kwh * entry.rate)}</td>
            </tr>
          `).join("")
    : `
            <tr>
              <td>Supplier rate (${fmtKwh(billedConsumption)} kWh bought from grid)</td>
              <td style="text-align: right;">${fmtNum(config.energy_variable_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(energyCost)}</td>
            </tr>
          `;

  const referenceModeNote = usesReferenceWindows
    ? `Reference power windows active (${referenceWindows.length})`
    : `${fmtNum(refPower, 1)} kW`;

  const tariffModeNote = usesTariffWindows
    ? `Time-of-use windows active (${rateWindows.length})`
    : `${fmtNum(config.energy_variable_rate, 4)} ${currency}/kWh`;
  const referencePowerComparisonRows = referencePowerComparison.map((level) => {
    const isOptimal = !!optimalReferenceLevel && level.kw === optimalReferenceLevel.kw;
    const isCurrent = !!currentReferenceLevel && level.kw === currentReferenceLevel.kw;
    const deltaClass =
      level.deltaVsCurrent < -0.005
        ? "comparison-delta-savings"
        : level.deltaVsCurrent > 0.005
          ? "comparison-delta-extra"
          : "";

    return `
            <tr class="${isOptimal ? "reference-power-best-row" : ""}${isCurrent ? " reference-power-current-row" : ""}">
              <td>
                <div class="reference-level-cell">
                  <span class="reference-level-kw">${fmtNum(level.kw, 0)} kW</span>
                  ${isOptimal ? '<span class="reference-level-badge best">Financially optimal</span>' : ""}
                  ${isCurrent ? '<span class="reference-level-badge current">Current</span>' : ""}
                  ${level.existingContractsOnly ? '<span class="reference-level-badge legacy">Existing contracts</span>' : ""}
                </div>
              </td>
              <td style="text-align: right;">${fmt(level.fixedCharge)}</td>
              <td style="text-align: right;">${fmt(level.exceedanceCharge)}</td>
              <td style="text-align: right;"><strong>${fmt(level.total)}</strong></td>
              <td class="${deltaClass}" style="text-align: right;">${formatDeltaVsCurrent(level.deltaVsCurrent)}</td>
            </tr>
          `;
  }).join("");
  const referencePowerComparisonCard = referencePowerComparison.length > 0
    ? `
      <div class="card reference-power-card">
        <div class="reference-power-card-header">
          <div>
            <h3 class="card-title"><span class="title-icon">📏</span> Reference Power Level Comparison</h3>
            <p class="muted reference-power-card-copy">
              Creos determines the financially optimal reference power level from the 15-minute load curve.
              This comparison recomputes the fixed charge and exceedance charge for each standard reference power level
              while keeping the other invoice items unchanged.
              ${usesReferenceWindows
                ? "Configured reference power windows stay active in this comparison."
                : "One reference power level is applied to the full selected period."}
              ${!currentReferenceLevel
                ? `Your current configuration uses ${fmtNum(refPower, 1)} kW, which is outside the standard Creos low-voltage reference power levels.`
                : ""}
            </p>
          </div>
          ${optimalReferenceLevel
            ? `<div class="reference-power-optimum">
                <span class="reference-level-badge best">Financially optimal: ${fmtNum(optimalReferenceLevel.kw, 0)} kW</span>
              </div>`
            : ""}
        </div>
        <table class="invoice-table reference-power-table">
          <thead>
            <tr>
              <th>Reference power level</th>
              <th style="text-align: right;">Fixed charge</th>
              <th style="text-align: right;">Exceedance charge</th>
              <th style="text-align: right;">Estimated total</th>
              <th style="text-align: right;">Difference vs current</th>
            </tr>
          </thead>
          <tbody>
            ${referencePowerComparisonRows}
          </tbody>
        </table>
      </div>
    `
    : `
      <div class="card reference-power-card">
        <p class="muted">Reference power level comparison requires 15-minute load-curve data for the selected period.</p>
      </div>
    `;
  const rangeSelectorMarkup = `
      <div class="range-selector">
        ${RANGES.map((range) => `
          <button
            class="range-btn ${range.id === state.range ? "active" : ""}"
            data-range="${range.id}"
          >${range.label}</button>
        `).join("")}
      </div>
    `;
  const rangeInfoMarkup = d.start && d.end
    ? (() => {
      const start = new Date(d.start);
      const end = new Date(d.end);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "";
      return `
        <div class="range-info-bar">
          Period: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}
        </div>
      `;
    })()
    : "";
  const rangePickerMarkup = state.range === "custom"
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
      : "";

  return `
    <section class="invoice-view">
      ${rangeSelectorMarkup}
      ${rangeInfoMarkup}
      ${rangePickerMarkup}

      <div class="section-header invoice-section-header">
        <div class="invoice-header-top">
          <div>
            <h2>Invoice Estimate &mdash; ${rangeLabel}</h2>
            <p class="muted invoice-print-note">Print-friendly view for the currently selected period.</p>
          </div>
          <button class="btn btn-outline invoice-print-btn" id="print-invoice-btn" type="button">Print Invoice</button>
        </div>
        <div class="invoice-summary-badges">
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">⚡ ${fmtKwh(consumption)} kWh home usage</span>
          <span class="badge" style="background: var(--clr-consumption-muted); color: var(--clr-consumption);">🔌 ${fmtKwh(billedConsumption)} kWh bought from grid</span>
          <span class="badge" style="background: var(--clr-production-muted); color: var(--clr-production);">☀️ ${fmtKwh(production)} kWh produced</span>
          ${soldToMarket > 0 ? `<span class="badge" style="background: var(--clr-export-muted); color: var(--clr-export);">📤 ${fmtKwh(soldToMarket)} kWh exported</span>` : ""}
          ${hasGas ? `<span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${fmtKwh(gasEnergy)} kWh gas (${fmtVolume(gasVolume)} m³)</span>` : ""}
        </div>
      </div>

      ${exceedanceWarning}

      <div class="card invoice-card">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align: right;">Rate / Detail</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-label"><td colspan="3">Energy Supplier</td></tr>
            <tr>
              <td>Fixed Fee <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">${fmtNum(config.energy_fixed_fee, 2)} ${currency}/mo</td>
              <td style="text-align: right;">${fmt(proratedFixedFee)}</td>
            </tr>
            ${energyRateRows}

            <tr class="section-label"><td colspan="3">Network Operator</td></tr>
            <tr>
              <td>Metering <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">${fmtNum(config.network_metering_rate, 2)} ${currency}/mo</td>
              <td style="text-align: right;">${fmt(proratedMetering)}</td>
            </tr>
            <tr>
              <td>Reference power level (${referenceModeNote}) <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">${fmtNum(config.network_power_ref_rate, 2)} ${currency}/mo</td>
              <td style="text-align: right;">${fmt(proratedPowerRef)}</td>
            </tr>
            <tr>
              <td>Volumetric charge (${fmtKwh(billedConsumption)} kWh bought from grid)</td>
              <td style="text-align: right;">${fmtNum(config.network_variable_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(networkVariableCost)}</td>
            </tr>
            <tr class="${effectiveExceedanceKwh > 0 ? "exceedance-row" : ""}">
              <td>Exceedance charge (${fmtKwh(effectiveExceedanceKwh)} kWh above the reference power level)</td>
              <td style="text-align: right;">${fmtNum(config.exceedance_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(exceedanceCost)}</td>
            </tr>

            ${meterFees.filter((f) => f.fee > 0).length > 0 ? `
            <tr class="section-label"><td colspan="3">Extra Meter Fees</td></tr>
            ${meterFees.filter((f) => f.fee > 0).map((f) => `
            <tr>
              <td>${f.label || ("…" + f.meter_id.slice(-8))} <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">${fmtNum(f.fee, 2)} ${currency}/mo</td>
              <td style="text-align: right;">${fmt(f.fee * proFactor)}</td>
            </tr>
            `).join("")}
            ` : ""}

            <tr class="section-label"><td colspan="3">Taxes & Levies</td></tr>
            <tr>
              <td>Compensation Fund</td>
              <td style="text-align: right;">${fmtNum(config.compensation_fund_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(compensationCredit)}</td>
            </tr>
            <tr>
              <td>Electricity Tax</td>
              <td style="text-align: right;">${fmtNum(config.electricity_tax_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(electricityTax)}</td>
            </tr>
            ${connectDiscount > 0 ? `
            <tr class="section-label"><td colspan="3">Discounts</td></tr>
            <tr>
              <td>Monthly Discount <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">-${fmtNum(Math.max(0, config.connect_discount ?? 0), 2)} ${currency}/mo</td>
              <td style="text-align: right;">-${fmt(connectDiscount)}</td>
            </tr>
            ` : ""}

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${fmt(subtotalCosts)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${fmtNum(config.vat_rate * 100, 0)}%</td>
              <td style="text-align: right;">${fmt(vat)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Costs</strong></td>
              <td style="text-align: right;"><strong>${fmt(totalCosts)}</strong></td>
            </tr>

            ${production > 0 ? `
            <tr class="section-label revenue-section"><td colspan="3">Solar Savings & Feed-in Revenue</td></tr>
            <tr class="revenue-row">
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${fmtKwh(production)} kWh</td>
            </tr>
            <tr class="revenue-row">
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${fmtKwh(selfConsumed)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${fmt(totalSelfConsumedSavings)} saved</td>
            </tr>
            <tr class="revenue-row">
              <td>Export sold</td>
              <td style="text-align: right;">${fmtKwh(soldToMarket)} kWh sent to grid</td>
              <td style="text-align: right;">${fmt(feedInRevenue)} earned</td>
            </tr>
            ${hasAvoidedExceedanceSavings ? `
            <tr class="revenue-row">
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${fmtKwh(avoidedExceedanceKwh)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${fmt(totalAvoidedExceedanceSavings)} saved</td>
            </tr>
            ` : ""}
            ${soldToMarket > 0 ? `
            <tr class="section-label"><td colspan="3">Credit Calculation</td></tr>
            ${feedInRows.map((r) => `
            <tr class="revenue-row">
              <td>Exported (${hasMultipleRates ? r.shortId : fmtKwh(r.exportedKwh) + " kWh"})</td>
              <td style="text-align: right;">${fmtKwh(r.exportedKwh)} kWh<br/>${r.label}<br/>${fmtNum(r.rate, 4)} ${currency}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${fmt(r.revenue)}</td>
            </tr>
            `).join("")}
            ${hasMultipleRates ? `
            <tr class="revenue-row">
              <td><em>Total feed-in (${fmtKwh(soldToMarket)} kWh, avg rate)</em></td>
              <td style="text-align: right;">${fmtNum(avgFeedInRate, 4)} ${currency}/kWh</td>
              <td class="revenue-amount" style="text-align: right;">-${fmt(feedInRevenue)}</td>
            </tr>
            ` : ""}
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${fmt(totalSolarValue)}</strong></td>
            </tr>
            <tr class="net-total-row">
              <td colspan="2"><strong>Net Balance</strong></td>
              <td style="text-align: right;"><strong>${fmt(netTotal)}</strong></td>
            </tr>
            ` : ""}
            ${soldToMarket <= 0 ? `
            <tr class="solar-total-row">
              <td colspan="2"><strong>Total saved / earned thanks to solar</strong></td>
              <td style="text-align: right;"><strong>${fmt(totalSolarValue)}</strong></td>
            </tr>
            ` : ""}
            ` : ""}
          </tbody>
        </table>
      </div>

      ${referencePowerComparisonCard}

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          This estimate uses your configured billing rates for the selected period.
          Variable electricity charges are applied to energy bought from the grid (${fmtKwh(billedConsumption)} kWh), not total home usage.
          Supplier pricing: ${tariffModeNote}.
          Fixed monthly charges are prorated across the viewed period (${periodDays} days, ${proLabel}, equivalent to ${fmtNum(proFactor, 2)} monthly charges).
          Peak load (${fmtNum(effectivePeakPower, 1)} kW) is compared against ${usesReferenceWindows ? "your configured reference power windows" : `your reference power level (${fmtNum(refPower, 1)} kW)`} &mdash;
          every kWh above the reference power level is billed with an exceedance charge of ${fmtNum(config.exceedance_rate, 4)} ${currency}/kWh.
          Adjust rates in Settings.
        </p>
      </div>

      ${hasGas ? `
      <!-- Gas Cost Estimate -->
      <div class="card invoice-card gas-invoice-card">
        <h3 class="card-title"><span class="title-icon">🔥</span> Gas Cost Estimate &mdash; ${rangeLabel}</h3>
        <div style="display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-bottom: var(--sp-4);">
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">🔥 ${fmtKwh(gasEnergy)} kWh</span>
          <span class="badge" style="background: rgba(255,160,50,0.12); color: #f5a623;">📐 ${fmtVolume(gasVolume)} m³</span>
        </div>
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align: right;">Rate / Detail</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-label"><td colspan="3">Gas Supplier</td></tr>
            <tr>
              <td>Fixed Fee <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">${fmtNum(config.gas_fixed_fee ?? 6.50, 2)} ${currency}/mo</td>
              <td style="text-align: right;">${fmt(gasFixedFee)}</td>
            </tr>
            <tr>
              <td>Energy (${fmtKwh(gasEnergy)} kWh)</td>
              <td style="text-align: right;">${fmtNum(config.gas_variable_rate ?? 0.0550, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(gasVariableCost)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Network</td></tr>
            <tr>
              <td>Network Fee <span class="muted">(${proLabel})</span></td>
              <td style="text-align: right;">${fmtNum(config.gas_network_fee ?? 4.80, 2)} ${currency}/mo</td>
              <td style="text-align: right;">${fmt(gasNetworkFee)}</td>
            </tr>
            <tr>
              <td>Network Variable (${fmtKwh(gasEnergy)} kWh)</td>
              <td style="text-align: right;">${fmtNum(config.gas_network_variable_rate ?? 0.0120, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(gasNetworkVariableCost)}</td>
            </tr>

            <tr class="section-label"><td colspan="3">Gas Tax</td></tr>
            <tr>
              <td>Gas Tax (${fmtKwh(gasEnergy)} kWh)</td>
              <td style="text-align: right;">${fmtNum(config.gas_tax_rate ?? 0.0010, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(gasTax)}</td>
            </tr>

            <tr class="subtotal-row">
              <td colspan="2">Subtotal (excl. VAT)</td>
              <td style="text-align: right;"><strong>${fmt(gasSubtotal)}</strong></td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align: right;">${fmtNum((config.gas_vat_rate ?? 0.08) * 100, 0)}%</td>
              <td style="text-align: right;">${fmt(gasVat)}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total Gas Costs</strong></td>
              <td style="text-align: right;"><strong>${fmt(gasTotalCosts)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card invoice-footer">
        <p class="muted" style="line-height: var(--lh-relaxed);">
          <strong>Combined Energy Total: ${fmt(netTotal + gasTotalCosts)}</strong>
          (Electricity: ${fmt(netTotal)} + Gas: ${fmt(gasTotalCosts)})
        </p>
      </div>
      ` : ""}

      ${production > 0 ? `
      <!-- Solar Revenue Tracking -->
      <div class="card solar-revenue-card">
        <h3 class="card-title"><span class="title-icon">☀️</span> Solar Panel Revenue &mdash; ${rangeLabel}</h3>
        <div class="solar-revenue-summary">
          <div class="solar-stat solar-stat-primary">
            <div class="solar-stat-value">${fmt(totalSolarValue)}</div>
            <div class="solar-stat-label">Total Solar Value</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${fmtKwh(production)} kWh</div>
            <div class="solar-stat-label">Solar produced</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${fmt(totalSelfConsumedSavings)}</div>
            <div class="solar-stat-label">Saved by autoconsuming ${fmtKwh(selfConsumed)} kWh</div>
          </div>
          <div class="solar-stat">
            <div class="solar-stat-value">${fmtSigned(selfConsumptionAdvantage)}</div>
            <div class="solar-stat-label">Extra value from using it yourself instead of selling it</div>
          </div>
          ${hasAvoidedExceedanceSavings ? `
          <div class="solar-stat">
            <div class="solar-stat-value">${fmt(totalAvoidedExceedanceSavings)}</div>
            <div class="solar-stat-label">Saved by staying under the reference power</div>
          </div>
          ` : ""}
          <div class="solar-stat">
            <div class="solar-stat-value">${fmt(feedInRevenue)}</div>
            <div class="solar-stat-label">Earned by selling ${fmtKwh(soldToMarket)} kWh</div>
          </div>
        </div>

        <table class="invoice-table solar-table">
          <thead>
            <tr>
              <th>Component</th>
              <th style="text-align: right;">Detail</th>
              <th style="text-align: right;">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr class="section-label"><td colspan="3">Production Overview</td></tr>
            <tr>
              <td>Solar produced</td>
              <td style="text-align: right;">Total generation during this period</td>
              <td style="text-align: right;">${fmtKwh(production)} kWh</td>
            </tr>
            <tr>
              <td>Autoconsumed / used at home</td>
              <td style="text-align: right;">${fmtKwh(selfConsumed)} kWh avoided grid purchases</td>
              <td style="text-align: right;">${fmt(totalSelfConsumedSavings)} saved</td>
            </tr>
            <tr>
              <td>Extra vs exporting instead</td>
              <td style="text-align: right;">${selfUseVsExportDetail}</td>
              <td style="text-align: right;">${fmtSigned(selfConsumptionAdvantage)}</td>
            </tr>
            <tr>
              <td>Export sold</td>
              <td style="text-align: right;">${fmtKwh(soldToMarket)} kWh sent to grid</td>
              <td style="text-align: right;">${fmt(feedInRevenue)} earned</td>
            </tr>
            ${hasAvoidedExceedanceSavings ? `
            <tr>
              <td>Reference exceedance avoided</td>
              <td style="text-align: right;">${fmtKwh(avoidedExceedanceKwh)} kWh above the reference stayed covered by solar</td>
              <td style="text-align: right;">${fmt(totalAvoidedExceedanceSavings)} saved</td>
            </tr>
            ` : ""}

            <tr class="section-label"><td colspan="3">Self-Consumption Savings</td></tr>
            <tr>
              <td>Energy not bought (${fmtKwh(selfConsumed)} kWh)</td>
              <td style="text-align: right;">${fmtNum(config.energy_variable_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(selfConsumed * config.energy_variable_rate)}</td>
            </tr>
            <tr>
              <td>Network fees avoided</td>
              <td style="text-align: right;">${fmtNum(config.network_variable_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(selfConsumed * config.network_variable_rate)}</td>
            </tr>
            <tr>
              <td>Taxes & levies avoided</td>
              <td style="text-align: right;">${fmtNum(config.electricity_tax_rate + config.compensation_fund_rate, 4)} ${currency}/kWh</td>
              <td style="text-align: right;">${fmt(selfConsumed * (config.electricity_tax_rate + config.compensation_fund_rate))}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${fmtNum(config.vat_rate * 100, 0)}%</td>
              <td style="text-align: right;">${fmt(selfConsumedSavingsVat)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Self-Consumption Savings</strong></td>
              <td style="text-align: right;"><strong>${fmt(totalSelfConsumedSavings)}</strong></td>
            </tr>

            ${hasAvoidedExceedanceSavings ? `
            <tr class="section-label"><td colspan="3">Reference Power Savings</td></tr>
            <tr>
              <td>Exceedance avoided</td>
              <td style="text-align: right;">${fmtKwh(avoidedExceedanceKwh)} kWh above the reference power level</td>
              <td style="text-align: right;">${fmt(avoidedExceedanceCost)}</td>
            </tr>
            <tr>
              <td>VAT saved</td>
              <td style="text-align: right;">${fmtNum(config.vat_rate * 100, 0)}%</td>
              <td style="text-align: right;">${fmt(avoidedExceedanceVat)}</td>
            </tr>
            <tr class="subtotal-row">
              <td colspan="2"><strong>Reference Power Savings</strong></td>
              <td style="text-align: right;"><strong>${fmt(totalAvoidedExceedanceSavings)}</strong></td>
            </tr>
            ` : ""}

            ${soldToMarket > 0 ? `
            <tr class="section-label"><td colspan="3">Feed-in Revenue</td></tr>
            ${feedInRows.map((r) => `
            <tr>
              <td>Sold to grid ${hasMultipleRates ? `(${r.shortId})` : `(${fmtKwh(r.exportedKwh)} kWh)`}</td>
              <td style="text-align: right;">${fmtKwh(r.exportedKwh)} kWh<br/>${r.label}<br/>${fmtNum(r.rate, 4)} ${currency}/kWh${usesPrioritySolarAllocation && hasMultipleRates ? `<br/>Self-use priority ${r.selfUsePriority}` : ""}</td>
              <td style="text-align: right;">${fmt(r.revenue)}</td>
            </tr>
            `).join("")}
            ${hasMultipleRates ? `
            <tr class="subtotal-row">
              <td colspan="2"><strong>Total Feed-in Revenue</strong></td>
              <td style="text-align: right;"><strong>${fmt(feedInRevenue)}</strong></td>
            </tr>
            ` : ""}
            ` : ""}

            <tr class="total-row solar-total-row">
              <td colspan="2"><strong>💰 Total Solar Panel Value</strong></td>
              <td style="text-align: right;"><strong>${fmt(totalSolarValue)}</strong></td>
            </tr>
          </tbody>
        </table>

        <p class="muted" style="margin-top: var(--sp-3); font-size: var(--text-xs); line-height: var(--lh-relaxed);">
          Self-consumption savings = energy you produced and used yourself instead of buying from the grid.
          Extra vs exporting instead = how much more or less those self-consumed kWh were worth compared with selling them at the feed-in rate.
          These savings are informational here and already reflected in the main invoice because only grid-imported energy is billed.
          Reference-power savings = exceedance charges avoided because solar reduced the net load seen against your reference power during the same 15-minute interval.
          Feed-in revenue = money earned by selling surplus production.
          ${resolvedRates.some((r) => r.mode === "sensor") ? "Market price sourced from Home Assistant sensor." : "Using fixed feed-in tariff — configure a market price sensor in Settings for real-time rates."}
          ${usesPrioritySolarAllocation ? "Per-system self-consumption and export are allocated from each PV system's 15-minute production using the configured self-use priority (1 = consumed first at home)." : hasMultipleRates ? "Displayed per-meter feed-in kWh are currently equal-split estimates because per-meter production data was not available for this view." : ""}
        </p>
      </div>
      ` : ""}
    </section>
  `;
}
