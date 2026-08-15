/**
 * Battery sizing simulation.
 *
 * Answers "would a home battery have paid off over this period?" by replaying
 * the measured 15-minute intervals: surplus that was actually exported charges
 * the battery, and energy that was actually imported is served from it first.
 *
 * This is deliberately a floor, not a sales figure. It models only round-trip
 * losses — no inverter power limit, no degradation, no tariff arbitrage, no
 * charging from the grid. A real battery with a power limit does slightly
 * worse; one that also arbitrages tariffs does better.
 */

export interface BatteryInterval {
  /** Energy exported to the grid in this interval (kWh) — what could charge. */
  exportKwh: number;
  /** Energy imported from the grid in this interval (kWh) — what could discharge. */
  gridKwh: number;
  /** Import price for this interval, incl. VAT (currency/kWh). */
  importRate: number;
  /** Feed-in price for this interval (currency/kWh) — the revenue given up by storing. */
  feedInRate: number;
}

export interface BatteryResult {
  capacityKwh: number;
  /** Grid import avoided by discharging (kWh). */
  selfConsumedKwh: number;
  /** Surplus diverted into the battery instead of being exported (kWh). */
  storedKwh: number;
  /** Value of the avoided import. */
  importSavings: number;
  /** Feed-in revenue given up by storing rather than exporting. */
  lostExportRevenue: number;
  /** importSavings - lostExportRevenue. */
  netBenefit: number;
  /** Full charge-discharge equivalents over the period. */
  equivalentCycles: number;
  /** Share of the original grid import that the battery covered (0-100). */
  gridImportCoveredPct: number;
}

export interface BatteryOptions {
  /** Round-trip efficiency, 0-1. Split evenly across charge and discharge. */
  roundTripEfficiency?: number;
  /** Usable fraction of nameplate capacity (depth of discharge). */
  usableFraction?: number;
}

/**
 * Replay the period against a battery of `capacityKwh`.
 *
 * Charging is limited by what was genuinely surplus (already exported), so the
 * simulation can never claim energy that was not there.
 */
export function simulateBattery(
  intervals: BatteryInterval[],
  capacityKwh: number,
  options: BatteryOptions = {},
): BatteryResult {
  const roundTrip = options.roundTripEfficiency ?? 0.9;
  const usableFraction = options.usableFraction ?? 0.9;
  const legEfficiency = Math.sqrt(Math.max(0, Math.min(1, roundTrip)));
  const usable = Math.max(0, capacityKwh * usableFraction);

  let soc = 0;
  let selfConsumedKwh = 0;
  let storedKwh = 0;
  let importSavings = 0;
  let lostExportRevenue = 0;
  let originalGridKwh = 0;

  for (const interval of intervals) {
    const surplus = Math.max(0, interval.exportKwh);
    const demand = Math.max(0, interval.gridKwh);
    originalGridKwh += demand;

    // Charge from surplus that would otherwise have left the house.
    if (surplus > 0 && soc < usable) {
      const roomForInput = (usable - soc) / legEfficiency;
      const taken = Math.min(surplus, roomForInput);
      soc += taken * legEfficiency;
      storedKwh += taken;
      lostExportRevenue += taken * interval.feedInRate;
    }

    // Discharge to cover what was actually bought from the grid.
    if (demand > 0 && soc > 0) {
      const delivered = Math.min(demand, soc * legEfficiency);
      soc -= delivered / legEfficiency;
      selfConsumedKwh += delivered;
      importSavings += delivered * interval.importRate;
    }
  }

  return {
    capacityKwh,
    selfConsumedKwh,
    storedKwh,
    importSavings,
    lostExportRevenue,
    netBenefit: importSavings - lostExportRevenue,
    equivalentCycles: usable > 0 ? (storedKwh * legEfficiency) / usable : 0,
    gridImportCoveredPct: originalGridKwh > 0 ? (selfConsumedKwh / originalGridKwh) * 100 : 0,
  };
}

/**
 * The always-on floor of the house load, in kW.
 *
 * Uses a low percentile rather than the minimum so a single dropout or a
 * meter gap cannot define the baseline.
 */
export function estimateBaseloadKw(houseKwSeries: number[], percentile = 0.05): number {
  const values = houseKwSeries.filter((v) => Number.isFinite(v) && v >= 0).sort((a, b) => a - b);
  if (values.length === 0) return 0;
  const index = Math.max(0, Math.min(values.length - 1, Math.floor(values.length * percentile)));
  return values[index];
}

/** Scale a value measured over `days` to a 365-day year. */
export function annualise(value: number, days: number): number {
  if (!Number.isFinite(days) || days <= 0) return 0;
  return (value * 365) / days;
}
