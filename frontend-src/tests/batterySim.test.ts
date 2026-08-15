import { describe, expect, it } from "vitest";
import {
  simulateBattery,
  estimateBaseloadKw,
  annualise,
  type BatteryInterval,
} from "../src/utils/batterySim";

function interval(exportKwh: number, gridKwh: number): BatteryInterval {
  return { exportKwh, gridKwh, importRate: 0.25, feedInRate: 0.08 };
}

describe("simulateBattery", () => {
  it("stores surplus and serves it back to later demand", () => {
    // 4 kWh exported, then 4 kWh imported. A 10 kWh battery should bridge it.
    const result = simulateBattery([interval(4, 0), interval(0, 4)], 10);

    // 90% round trip: 4 kWh in comes back as 3.6 kWh.
    expect(result.storedKwh).toBeCloseTo(4, 5);
    expect(result.selfConsumedKwh).toBeCloseTo(3.6, 5);
    expect(result.importSavings).toBeCloseTo(3.6 * 0.25, 5);
    expect(result.lostExportRevenue).toBeCloseTo(4 * 0.08, 5);
    expect(result.netBenefit).toBeCloseTo(3.6 * 0.25 - 4 * 0.08, 5);
  });

  it("never claims more than the surplus that actually existed", () => {
    // Demand with no preceding export cannot be served.
    const result = simulateBattery([interval(0, 12), interval(0, 12)], 20);

    expect(result.storedKwh).toBe(0);
    expect(result.selfConsumedKwh).toBe(0);
    expect(result.netBenefit).toBe(0);
  });

  it("is bounded by usable capacity, not by nameplate", () => {
    // 50 kWh of surplus into a 10 kWh battery at 90% depth of discharge.
    const result = simulateBattery([interval(50, 0), interval(0, 50)], 10);

    expect(result.storedKwh).toBeLessThanOrEqual(10);
    // 9 kWh usable, filled through one efficiency leg then drained through another.
    expect(result.selfConsumedKwh).toBeCloseTo(9 * Math.sqrt(0.9), 5);
  });

  it("returns a bigger benefit for a bigger battery, up to the surplus available", () => {
    const day: BatteryInterval[] = [
      interval(3, 0), interval(3, 0), interval(3, 0),
      interval(0, 3), interval(0, 3), interval(0, 3),
    ];

    const small = simulateBattery(day, 2);
    const medium = simulateBattery(day, 6);
    const large = simulateBattery(day, 20);

    expect(medium.netBenefit).toBeGreaterThan(small.netBenefit);
    expect(large.netBenefit).toBeGreaterThanOrEqual(medium.netBenefit);
    // 9 kWh of surplus is all there is; a 20 kWh battery cannot exceed it.
    expect(large.storedKwh).toBeLessThanOrEqual(9 + 1e-9);
  });

  it("reports the share of grid import it displaced", () => {
    const result = simulateBattery([interval(10, 0), interval(0, 5)], 10);

    // All 5 kWh of import is covered.
    expect(result.selfConsumedKwh).toBeCloseTo(5, 5);
    expect(result.gridImportCoveredPct).toBeCloseTo(100, 5);
  });

  it("handles an empty period without dividing by zero", () => {
    const result = simulateBattery([], 10);

    expect(result.netBenefit).toBe(0);
    expect(result.equivalentCycles).toBe(0);
    expect(result.gridImportCoveredPct).toBe(0);
  });

  it("treats a zero-capacity battery as a no-op", () => {
    const result = simulateBattery([interval(5, 0), interval(0, 5)], 0);

    expect(result.storedKwh).toBe(0);
    expect(result.selfConsumedKwh).toBe(0);
    expect(result.equivalentCycles).toBe(0);
  });
});

describe("estimateBaseloadKw", () => {
  it("takes a low percentile rather than the raw minimum", () => {
    // One dropout to zero must not define the baseline.
    const series = [0, ...Array.from({ length: 99 }, () => 0.4)];

    expect(estimateBaseloadKw(series)).toBeCloseTo(0.4, 5);
  });

  it("ignores gaps and negative readings", () => {
    const series = [NaN, -1, 0.5, 0.5, 0.5, 0.5];

    expect(estimateBaseloadKw(series)).toBeCloseTo(0.5, 5);
  });

  it("returns zero for an empty series", () => {
    expect(estimateBaseloadKw([])).toBe(0);
  });
});

describe("annualise", () => {
  it("scales a measured period to a year", () => {
    expect(annualise(10, 30)).toBeCloseTo((10 * 365) / 30, 5);
  });

  it("returns zero rather than Infinity for a zero-length period", () => {
    expect(annualise(10, 0)).toBe(0);
  });
});
