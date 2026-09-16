/**
 * Gas volume-to-energy helpers (issue #92).
 *
 * Volume-only gas meters expose no metered kWh channel. Billing then runs on
 * energy derived from the measured volume with the configured conversion
 * factor (default ~11 kWh/m³ for Luxembourg) instead of billing 0 EUR.
 *
 * Twin of the logic in custom_components/leneda/financials.py — both must
 * stay arithmetically identical.
 */

export const DEFAULT_GAS_KWH_PER_M3 = 11.0;

export interface EffectiveGasEnergy {
  /** kWh to bill: metered energy, or volume × factor when no energy exists. */
  energyKwh: number;
  /** True when the value was derived from volume (show it as estimated). */
  estimated: boolean;
}

/** Resolve the billable gas energy for one period. */
export function effectiveGasEnergyKwh(
  gasEnergyKwh: number,
  gasVolumeM3: number,
  kwhPerM3?: number | null,
): EffectiveGasEnergy {
  let factor = Number(kwhPerM3);
  if (!isFinite(factor) || factor <= 0) factor = DEFAULT_GAS_KWH_PER_M3;
  const energy = Math.max(0, gasEnergyKwh || 0);
  const volume = Math.max(0, gasVolumeM3 || 0);
  if (energy > 0) return { energyKwh: energy, estimated: false };
  if (volume > 0) return { energyKwh: volume * factor, estimated: true };
  return { energyKwh: 0, estimated: false };
}
