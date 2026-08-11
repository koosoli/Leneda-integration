/**
 * Tests for per-PV-system self-use allocation.
 *
 * Covers strict priority order, Prorata Modus (no priority configured) and the
 * mixed case where only some systems carry an explicit priority.
 */
import { describe, it, expect } from "vitest";
import {
  calculatePrioritySolarAllocation,
  resolveAllocationMode,
  resolveProductionFeedInRates,
} from "../src/utils/solarAllocation";
import type { BillingConfig, PerMeterTimeseries, TimeseriesResponse } from "../src/api/leneda";

const METER_A = "LU-A";
const METER_B = "LU-B";
const TS = "2026-01-15T11:00:00Z";

function makeConfig(priorities: Array<number | null | undefined>): BillingConfig {
  return {
    meters: [
      { id: METER_A, types: ["production"] },
      { id: METER_B, types: ["production"] },
    ],
    feed_in_rates: [
      { meter_id: METER_A, mode: "fixed", tariff: 0.1, sensor_entity: "", self_use_priority: priorities[0] },
      { meter_id: METER_B, mode: "fixed", tariff: 0.2, sensor_entity: "", self_use_priority: priorities[1] },
    ],
    feed_in_tariff: 0.08,
    currency: "EUR",
  } as unknown as BillingConfig;
}

/** One 15-minute interval: 4 kW house load, 4 kW from A, 12 kW from B. */
const consumption = {
  items: [{ startedAt: TS, value: 4 }],
} as unknown as TimeseriesResponse;

const perMeterProduction = [
  { meter_id: METER_A, items: [{ startedAt: TS, value: 4 }] },
  { meter_id: METER_B, items: [{ startedAt: TS, value: 12 }] },
] as unknown as PerMeterTimeseries[];

function allocate(config: BillingConfig) {
  const result = calculatePrioritySolarAllocation(config, consumption, perMeterProduction);
  if (!result) throw new Error("expected an allocation result");
  return result;
}

function byMeter(result: ReturnType<typeof allocate>, meterId: string) {
  const meter = result.meters.find((m) => m.meterId === meterId);
  if (!meter) throw new Error(`missing meter ${meterId}`);
  return meter;
}

describe("solar allocation", () => {
  it("serves systems in strict order when priorities are set", () => {
    const result = allocate(makeConfig([1, 2]));

    expect(result.allocationMode).toBe("priority");
    // A (priority 1) covers the whole 4 kW load; B exports everything.
    expect(byMeter(result, METER_A).selfConsumedKwh).toBeCloseTo(1.0, 9);
    expect(byMeter(result, METER_A).exportedKwh).toBeCloseTo(0.0, 9);
    expect(byMeter(result, METER_B).selfConsumedKwh).toBeCloseTo(0.0, 9);
    expect(byMeter(result, METER_B).exportedKwh).toBeCloseTo(3.0, 9);
  });

  it("honours the configured order, not the meter id order", () => {
    const result = allocate(makeConfig([2, 1]));

    // B (priority 1) now covers the load itself.
    expect(byMeter(result, METER_B).selfConsumedKwh).toBeCloseTo(1.0, 9);
    expect(byMeter(result, METER_A).selfConsumedKwh).toBeCloseTo(0.0, 9);
  });

  it("splits pro-rata when no priority is configured (Prorata Modus)", () => {
    const result = allocate(makeConfig([null, null]));

    expect(result.allocationMode).toBe("prorata");
    // 4 kW self-used, shared 4:12 → A 1 kW, B 3 kW (×0.25 h).
    expect(byMeter(result, METER_A).selfConsumedKwh).toBeCloseTo(0.25, 9);
    expect(byMeter(result, METER_A).exportedKwh).toBeCloseTo(0.75, 9);
    expect(byMeter(result, METER_B).selfConsumedKwh).toBeCloseTo(0.75, 9);
    expect(byMeter(result, METER_B).exportedKwh).toBeCloseTo(2.25, 9);
  });

  it("treats an absent priority key the same as null", () => {
    const result = allocate(makeConfig([undefined, undefined]));

    expect(result.allocationMode).toBe("prorata");
    expect(byMeter(result, METER_A).selfConsumedKwh).toBeCloseTo(0.25, 9);
  });

  it("splits pro-rata between systems sharing the same priority", () => {
    const result = allocate(makeConfig([1, 1]));

    expect(result.allocationMode).toBe("mixed");
    expect(byMeter(result, METER_A).selfConsumedKwh).toBeCloseTo(0.25, 9);
    expect(byMeter(result, METER_B).selfConsumedKwh).toBeCloseTo(0.75, 9);
  });

  it("serves prioritised systems before unprioritised ones", () => {
    const result = allocate(makeConfig([null, 1]));

    expect(result.allocationMode).toBe("mixed");
    // B is prioritised and covers the full load on its own.
    expect(byMeter(result, METER_B).selfConsumedKwh).toBeCloseTo(1.0, 9);
    expect(byMeter(result, METER_A).selfConsumedKwh).toBeCloseTo(0.0, 9);
    expect(byMeter(result, METER_A).exportedKwh).toBeCloseTo(1.0, 9);
  });

  it("conserves energy across every mode", () => {
    for (const priorities of [[1, 2], [null, null], [null, 1], [1, 1]]) {
      const result = allocate(makeConfig(priorities));
      const produced = result.meters.reduce((sum, m) => sum + m.producedKwh, 0);
      const allocated = result.meters.reduce(
        (sum, m) => sum + m.selfConsumedKwh + m.exportedKwh,
        0,
      );
      expect(produced).toBeCloseTo(4.0, 9);
      expect(allocated).toBeCloseTo(produced, 9);
    }
  });

  it("prices exports with each system's own tariff under pro-rata", () => {
    const result = allocate(makeConfig([null, null]));

    // A: 0.75 kWh × 0.10 + B: 2.25 kWh × 0.20
    expect(result.totalFeedInRevenue).toBeCloseTo(0.075 + 0.45, 9);
  });

  it("keeps unprioritised systems last when resolving rates", () => {
    const rates = resolveProductionFeedInRates(makeConfig([null, 3]));

    expect(rates.map((r) => r.meterId)).toEqual([METER_B, METER_A]);
    expect(rates[1].selfUsePriority).toBeNull();
    expect(resolveAllocationMode(rates)).toBe("mixed");
  });
});
