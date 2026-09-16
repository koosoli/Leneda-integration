/**
 * Tests for the gas volume-to-energy helper (issue #92).
 *
 * Twin of the logic in custom_components/leneda/financials.py — both must
 * treat metered energy as authoritative and derive from volume otherwise.
 */
import { describe, it, expect } from "vitest";
import { effectiveGasEnergyKwh, DEFAULT_GAS_KWH_PER_M3 } from "../src/utils/gas";

describe("effectiveGasEnergyKwh", () => {
  it("prefers metered energy over volume", () => {
    expect(effectiveGasEnergyKwh(8.085, 0.735, 11)).toEqual({
      energyKwh: 8.085,
      estimated: false,
    });
  });

  it("derives energy from volume with the default factor", () => {
    expect(DEFAULT_GAS_KWH_PER_M3).toBe(11.0);
    expect(effectiveGasEnergyKwh(0, 0.735)).toEqual({
      energyKwh: 0.735 * 11.0,
      estimated: true,
    });
  });

  it("honours a custom conversion factor", () => {
    expect(effectiveGasEnergyKwh(0, 0.735, 10)).toEqual({
      energyKwh: 7.35,
      estimated: true,
    });
  });

  it("falls back to the default for missing or invalid factors", () => {
    for (const bad of [0, -3, Number.NaN, null, undefined]) {
      expect(effectiveGasEnergyKwh(0, 1, bad as number)).toEqual({
        energyKwh: 11.0,
        estimated: true,
      });
    }
  });

  it("returns zero without estimation when nothing was measured", () => {
    expect(effectiveGasEnergyKwh(0, 0, 11)).toEqual({
      energyKwh: 0,
      estimated: false,
    });
  });
});
