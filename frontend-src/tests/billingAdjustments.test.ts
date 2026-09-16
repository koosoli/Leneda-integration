/**
 * Parity tests for the TypeScript billing-adjustment engine.
 *
 * Uses the same fixtures as tests/test_billing_adjustments.py (Python) so the
 * frontend and backend calculations cannot drift apart.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, it, expect } from "vitest";
import {
  computeBillingAdjustments,
  luxembourgDate,
  normalizeAdjustments,
  validateAdjustment,
  GAS_KWH_PER_M3,
  type AdjustmentLine,
} from "../src/utils/billingAdjustments";

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = JSON.parse(
  readFileSync(join(here, "../../tests/fixtures/billing_adjustments.json"), "utf-8"),
) as {
  cases: Array<{
    name: string;
    input: Record<string, unknown> & {
      adjustments: unknown[];
      vat_rate: number;
      gas_vat_rate: number;
      period_start: string;
      period_end: string;
    };
    expected: {
      electricity: SectionExpectation & { solar_correction_gross: number };
      gas: SectionExpectation;
      estimated: boolean;
    };
  }>;
};

interface SectionExpectation {
  applied_gross: number;
  applied_net: number;
  estimated: boolean;
  lines: Array<{
    id: string;
    quantity: number;
    total_gross: number;
    total_net: number;
    applied: boolean;
    estimated: boolean;
  }>;
}

const TOL = 1e-9;

function expectClose(actual: number, expected: number, label: string) {
  expect(
    Math.abs(actual - expected) <= TOL,
    `${label}: expected ${expected}, got ${actual}`,
  ).toBe(true);
}

function expectSection(
  actual: { lines: AdjustmentLine[]; applied_gross: number; applied_net: number; estimated: boolean },
  expected: SectionExpectation,
  label: string,
) {
  expectClose(actual.applied_gross, expected.applied_gross, `${label}.applied_gross`);
  expectClose(actual.applied_net, expected.applied_net, `${label}.applied_net`);
  expect(actual.estimated, `${label}.estimated`).toBe(expected.estimated);
  expect(actual.lines.length, `${label}.lines length`).toBe(expected.lines.length);
  actual.lines.forEach((line, idx) => {
    const exp = expected.lines[idx];
    const lineLabel = `${label}.lines[${exp.id}]`;
    expect(line.id, lineLabel).toBe(exp.id);
    expectClose(line.quantity, exp.quantity, `${lineLabel}.quantity`);
    expectClose(line.total_gross, exp.total_gross, `${lineLabel}.total_gross`);
    expectClose(line.total_net, exp.total_net, `${lineLabel}.total_net`);
    expect(line.applied, lineLabel).toBe(exp.applied);
    expect(line.estimated, lineLabel).toBe(exp.estimated);
  });
}

describe("shared fixture parity", () => {
  for (const fixtureCase of fixtures.cases) {
    it(fixtureCase.name, () => {
      const input = fixtureCase.input;
      const result = computeBillingAdjustments({
        adjustments: input.adjustments,
        vatRate: input.vat_rate,
        gasVatRate: input.gas_vat_rate,
        periodStart: input.period_start,
        periodEnd: input.period_end,
        consumptionItems: input.consumption_items as never,
        productionItems: input.production_items as never,
        fallbackGridImportKwh: input.fallback_grid_import_kwh as number,
        fallbackSelfConsumedKwh: input.fallback_self_consumed_kwh as number,
        gasVolumeM3: input.gas_volume_m3 as number,
        gasEnergyKwh: input.gas_energy_kwh as number,
      });
      expectSection(result.electricity, fixtureCase.expected.electricity, "electricity");
      expectClose(
        result.electricity.solar_correction_gross,
        fixtureCase.expected.electricity.solar_correction_gross,
        "electricity.solar_correction_gross",
      );
      expectSection(result.gas, fixtureCase.expected.gas, "gas");
      expect(result.estimated).toBe(fixtureCase.expected.estimated);
    });
  }
});

describe("invoice-level VAT math", () => {
  it("subtracting the net adjustment before VAT reduces the gross total by exactly the aid", () => {
    const august = fixtures.cases.find((c) => c.name === "august_100kwh_exactly_4_eur")!;
    const result = computeBillingAdjustments({
      adjustments: august.input.adjustments,
      vatRate: august.input.vat_rate,
      gasVatRate: august.input.gas_vat_rate,
      periodStart: august.input.period_start,
      periodEnd: august.input.period_end,
      consumptionItems: august.input.consumption_items as never,
      productionItems: [],
    });
    const vatRate = 0.08;
    const subtotal = 100;
    const totalWithout = subtotal * (1 + vatRate);
    const totalWith = (subtotal - result.electricity.applied_net) * (1 + vatRate);
    expectClose(totalWithout - totalWith, 4.0, "invoice gross reduction");
  });
});

describe("validation", () => {
  const base = {
    id: "x",
    label: "X",
    enabled: true,
    commodity: "electricity",
    basis: "grid_import_kwh",
    amount_gross: 0.04,
    start_date: "2026-08-01",
    end_date: "2026-12-31",
    vat_included: true,
  } as const;

  it("accepts a valid adjustment", () => {
    expect(validateAdjustment(base)).toEqual([]);
  });

  it("rejects negative and malformed amounts", () => {
    expect(validateAdjustment({ ...base, amount_gross: -0.04 }).length).toBeGreaterThan(0);
    expect(validateAdjustment({ ...base, amount_gross: Number.NaN }).length).toBeGreaterThan(0);
  });

  it("rejects invalid and inverted date ranges", () => {
    expect(validateAdjustment({ ...base, start_date: "2026-13-01" }).length).toBeGreaterThan(0);
    expect(validateAdjustment({ ...base, start_date: "2026-02-30" }).length).toBeGreaterThan(0);
    expect(
      validateAdjustment({ ...base, start_date: "2026-12-31", end_date: "2026-08-01" }).length,
    ).toBeGreaterThan(0);
  });

  it("rejects unknown commodities and bases", () => {
    expect(validateAdjustment({ ...base, commodity: "water" as never }).length).toBeGreaterThan(0);
    expect(validateAdjustment({ ...base, basis: "total_consumption_kwh" as never }).length).toBeGreaterThan(0);
  });

  it("invalid adjustments are skipped by the engine", () => {
    const result = computeBillingAdjustments({
      adjustments: [{ ...base, amount_gross: -1 }],
      vatRate: 0.08,
      gasVatRate: 0.08,
      periodStart: "2026-08-01",
      periodEnd: "2026-08-31",
      consumptionItems: [{ value: 100, startedAt: "2026-08-15T10:00:00+02:00" }],
    });
    expect(result.electricity.lines).toEqual([]);
  });
});

describe("timezone and normalization", () => {
  it("uses Europe/Luxembourg calendar dates, not UTC", () => {
    expect(luxembourgDate("2026-12-31T23:30:00+00:00")).toBe("2027-01-01");
    expect(luxembourgDate("2026-12-31T22:30:00+00:00")).toBe("2026-12-31");
    expect(luxembourgDate("2026-08-01T00:00:00+02:00")).toBe("2026-08-01");
    expect(luxembourgDate("garbage")).toBeNull();
  });

  it("normalization never throws on garbage", () => {
    expect(normalizeAdjustments(null)).toEqual([]);
    expect(normalizeAdjustments("junk")).toEqual([]);
    expect(normalizeAdjustments([{ amount_gross: "nope" }, 42])[0].amount_gross).toBe(0);
  });

  it("exposes the documented gas conversion factor", () => {
    expect(GAS_KWH_PER_M3).toBe(11.0);
  });

  it("defaults suspends_compensation to the official electricity preset", () => {
    const preset = {
      id: "lu-electricity-resilienzpak-2026",
      label: "Luxembourg electricity subsidy 2026",
      enabled: true,
      commodity: "electricity",
      basis: "grid_import_kwh",
      amount_gross: 0.04,
      start_date: "2026-08-01",
      end_date: "2026-12-31",
      vat_included: true,
      preset_id: "lu_resilienzpak_electricity_2026",
    };
    expect(normalizeAdjustments([preset])[0].suspends_compensation).toBe(true);
    expect(
      normalizeAdjustments([{ ...preset, id: "custom", preset_id: "" }])[0].suspends_compensation,
    ).toBe(false);
  });
});

describe("compensation suspension and billed totals", () => {
  const preset = {
    id: "lu-electricity-resilienzpak-2026",
    label: "Luxembourg electricity subsidy 2026",
    enabled: true,
    commodity: "electricity",
    basis: "grid_import_kwh",
    amount_gross: 0.04,
    start_date: "2026-08-01",
    end_date: "2026-12-31",
    vat_included: true,
    preset_id: "lu_resilienzpak_electricity_2026",
  };

  it("scales quantities to billed totals and reports suspended kWh", () => {
    const result = computeBillingAdjustments({
      adjustments: [preset],
      vatRate: 0.08,
      gasVatRate: 0.08,
      periodStart: "2026-08-01",
      periodEnd: "2026-08-31",
      consumptionItems: [
        { value: 100, startedAt: "2026-08-15T10:00:00+02:00" },
        { value: 100, startedAt: "2026-08-15T10:15:00+02:00" },
      ],
      productionItems: [{ value: 40, startedAt: "2026-08-15T10:00:00+02:00" }],
      fallbackGridImportKwh: 45,
      fallbackSelfConsumedKwh: 10,
    });
    // Interval grid sums to 40 kWh but the meter billed 45.
    expectClose(result.electricity.lines[0].quantity, 45, "quantity");
    expectClose(result.electricity.suspended_grid_kwh, 45, "suspended_grid_kwh");
    expectClose(result.electricity.suspended_self_kwh, 10, "suspended_self_kwh");
    expectClose(result.electricity.solar_correction_gross, 0.4, "solar_correction_gross");
  });

  it("custom adjustments never suspend the base compensation credit", () => {
    const result = computeBillingAdjustments({
      adjustments: [{ ...preset, id: "custom", preset_id: "" }],
      vatRate: 0.08,
      gasVatRate: 0.08,
      periodStart: "2026-08-01",
      periodEnd: "2026-08-31",
      consumptionItems: [{ value: 100, startedAt: "2026-08-15T10:00:00+02:00" }],
      fallbackGridImportKwh: 25,
      fallbackSelfConsumedKwh: 0,
    });
    expectClose(result.electricity.suspended_grid_kwh, 0, "suspended_grid_kwh");
    expectClose(result.electricity.suspended_self_kwh, 0, "suspended_self_kwh");
  });
});
