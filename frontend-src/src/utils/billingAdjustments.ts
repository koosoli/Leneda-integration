/**
 * Dated billing-adjustment engine (subsidies, rebates, temporary taxes).
 *
 * Twin of custom_components/leneda/billing_adjustments.py — both must stay
 * arithmetically identical (same operations in the same order, IEEE-754
 * doubles). Shared parity fixtures live in tests/fixtures/.
 *
 * Concepts:
 * - An adjustment is a dated per-unit gross amount (e.g. 0.04 EUR/kWh aid).
 * - Date ranges are inclusive calendar dates in Europe/Luxembourg.
 * - VAT-inclusive gross amounts are converted with net = gross / (1 + vat)
 *   and subtracted before VAT is recalculated, so the final invoice reduction
 *   equals exactly eligible_quantity × amount_gross.
 * - Valid overlapping adjustments stack.
 */

export const GAS_KWH_PER_M3 = 11.0;

export type AdjustmentCommodity = "electricity" | "gas";
export type AdjustmentBasis = "grid_import_kwh" | "gas_volume_m3";

export interface BillingAdjustment {
  id: string;
  label: string;
  enabled: boolean;
  commodity: AdjustmentCommodity;
  basis: AdjustmentBasis;
  /** Per-unit amount including VAT when vat_included is true. */
  amount_gross: number;
  /** Inclusive calendar dates, YYYY-MM-DD, Europe/Luxembourg. */
  start_date: string;
  end_date: string;
  vat_included: boolean;
  preset_id?: string;
  eligibility_note?: string;
  /** Set when the configured tariff already reflects this adjustment. */
  tariff_already_includes_adjustment?: boolean;
}

export interface AdjustmentLine {
  id: string;
  label: string;
  commodity: AdjustmentCommodity;
  basis: AdjustmentBasis;
  unit: "kWh" | "m3";
  quantity: number;
  amount_gross: number;
  total_gross: number;
  total_net: number;
  vat_included: boolean;
  applied: boolean;
  estimated: boolean;
  preset_id: string;
  eligibility_note: string;
}

export interface CommodityAdjustmentResult {
  lines: AdjustmentLine[];
  applied_gross: number;
  applied_net: number;
  estimated: boolean;
}

export interface BillingAdjustmentResult {
  electricity: CommodityAdjustmentResult & { solar_correction_gross: number };
  gas: CommodityAdjustmentResult;
  estimated: boolean;
}

export interface IntervalItem {
  value: number;
  startedAt: string;
}

export const LU_ELECTRICITY_PRESET_ID = "lu_resilienzpak_electricity_2026";
export const LU_GAS_PRESET_ID = "lu_resilienzpak_gas_2026";

/** Official Luxembourg Resilienzpak 2026 household subsidies. */
export const LUXEMBOURG_PRESETS: BillingAdjustment[] = [
  {
    id: "lu-electricity-resilienzpak-2026",
    label: "Luxembourg electricity subsidy 2026",
    enabled: true,
    commodity: "electricity",
    basis: "grid_import_kwh",
    amount_gross: 0.04,
    start_date: "2026-08-01",
    end_date: "2026-12-31",
    vat_included: true,
    preset_id: LU_ELECTRICITY_PRESET_ID,
    eligibility_note: "Residential customers below 25,000 kWh/year; applies to grid import only.",
    tariff_already_includes_adjustment: false,
  },
  {
    id: "lu-gas-resilienzpak-2026",
    label: "Luxembourg gas subsidy 2026",
    enabled: true,
    commodity: "gas",
    basis: "gas_volume_m3",
    amount_gross: 0.15,
    start_date: "2026-08-01",
    end_date: "2026-12-31",
    vat_included: true,
    preset_id: LU_GAS_PRESET_ID,
    eligibility_note: "Eligible residential gas consumption.",
    tariff_already_includes_adjustment: false,
  },
];

export function defaultAdjustments(enabled = true): BillingAdjustment[] {
  return LUXEMBOURG_PRESETS.map((preset) => ({ ...preset, enabled }));
}

const VALID_COMMODITIES: AdjustmentCommodity[] = ["electricity", "gas"];
const VALID_BASES: AdjustmentBasis[] = ["grid_import_kwh", "gas_volume_m3"];

export function validateAdjustment(raw: Partial<BillingAdjustment>): string[] {
  const errors: string[] = [];
  if (!VALID_COMMODITIES.includes(raw.commodity as AdjustmentCommodity)) {
    errors.push(`invalid commodity: ${String(raw.commodity)}`);
  }
  if (!VALID_BASES.includes(raw.basis as AdjustmentBasis)) {
    errors.push(`invalid basis: ${String(raw.basis)}`);
  }
  const amount = Number(raw.amount_gross);
  if (!isFinite(amount)) {
    errors.push("amount_gross must be a number");
  } else if (amount < 0) {
    errors.push("amount_gross must not be negative");
  }
  const start = parseIsoDate(raw.start_date);
  const end = parseIsoDate(raw.end_date);
  if (!start) errors.push("start_date must be YYYY-MM-DD");
  if (!end) errors.push("end_date must be YYYY-MM-DD");
  if (start && end && end < start) errors.push("end_date must not be before start_date");
  return errors;
}

export function normalizeAdjustment(raw: Partial<BillingAdjustment>, index = 0): BillingAdjustment {
  let amount = Number(raw.amount_gross);
  if (!isFinite(amount)) amount = 0;
  return {
    id: raw.id ? String(raw.id).trim() : `custom-${index + 1}`,
    label: raw.label && String(raw.label).trim() ? String(raw.label).trim() : "Billing adjustment",
    enabled: raw.enabled !== false,
    commodity: VALID_COMMODITIES.includes(raw.commodity as AdjustmentCommodity)
      ? (raw.commodity as AdjustmentCommodity)
      : "electricity",
    basis: VALID_BASES.includes(raw.basis as AdjustmentBasis)
      ? (raw.basis as AdjustmentBasis)
      : "grid_import_kwh",
    amount_gross: amount,
    start_date: String(raw.start_date ?? "").slice(0, 10),
    end_date: String(raw.end_date ?? "").slice(0, 10),
    vat_included: raw.vat_included !== false,
    preset_id: raw.preset_id ? String(raw.preset_id).trim() : "",
    eligibility_note: raw.eligibility_note ? String(raw.eligibility_note).trim() : "",
    tariff_already_includes_adjustment: !!raw.tariff_already_includes_adjustment,
  };
}

export function normalizeAdjustments(rawList: unknown): BillingAdjustment[] {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .filter((entry): entry is Partial<BillingAdjustment> => !!entry && typeof entry === "object")
    .map((entry, index) => normalizeAdjustment(entry, index));
}

function parseIsoDate(value?: string): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}/.test(value)) return null;
  const date = value.slice(0, 10);
  const [y, m, d] = date.split("-").map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  // Reject impossible calendar dates (e.g. 2026-02-30) like date.fromisoformat.
  const probe = new Date(Date.UTC(y, m - 1, d));
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== m - 1 || probe.getUTCDate() !== d) {
    return null;
  }
  return date;
}

const luxDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Luxembourg",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Return the Europe/Luxembourg calendar date (YYYY-MM-DD) of an ISO timestamp. */
export function luxembourgDate(timestamp: string): string | null {
  const dt = new Date(timestamp);
  if (Number.isNaN(dt.getTime())) return null;
  return luxDateFormatter.format(dt);
}

function covers(adj: BillingAdjustment, luxDate: string): boolean {
  return !!adj.start_date && !!adj.end_date && adj.start_date <= luxDate && luxDate <= adj.end_date;
}

function isActive(adj: BillingAdjustment): boolean {
  return adj.enabled && validateAdjustment(adj).length === 0;
}

export function isApplied(adj: BillingAdjustment): boolean {
  return isActive(adj) && !adj.tariff_already_includes_adjustment;
}

function dayNumber(isoDate: string): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

function overlapDays(adj: BillingAdjustment, periodStart: string, periodEnd: string): number {
  const start = parseIsoDate(adj.start_date);
  const end = parseIsoDate(adj.end_date);
  if (!start || !end) return 0;
  const overlapStart = start > periodStart ? start : periodStart;
  const overlapEnd = end < periodEnd ? end : periodEnd;
  const days = dayNumber(overlapEnd) - dayNumber(overlapStart) + 1;
  return days > 0 ? days : 0;
}

function makeLine(
  adj: BillingAdjustment,
  quantity: number,
  unit: "kWh" | "m3",
  vatRate: number,
  applied: boolean,
  estimated: boolean,
): AdjustmentLine {
  const totalGross = quantity * adj.amount_gross;
  const totalNet = adj.vat_included ? totalGross / (1 + vatRate) : totalGross;
  return {
    id: adj.id,
    label: adj.label,
    commodity: adj.commodity,
    basis: adj.basis,
    unit,
    quantity,
    amount_gross: adj.amount_gross,
    total_gross: totalGross,
    total_net: totalNet,
    vat_included: adj.vat_included,
    applied,
    estimated,
    preset_id: adj.preset_id ?? "",
    eligibility_note: adj.eligibility_note ?? "",
  };
}

function electricityLines(
  adjustments: BillingAdjustment[],
  consumptionItems: IntervalItem[] | null | undefined,
  productionItems: IntervalItem[] | null | undefined,
  fallbackGridImportKwh: number,
  fallbackSelfConsumedKwh: number,
  periodStart: string,
  periodEnd: string,
  vatRate: number,
): { lines: AdjustmentLine[]; solarCorrectionGross: number; estimatedAny: boolean } {
  const electricity = adjustments.filter(
    (adj) => adj.commodity === "electricity" && adj.basis === "grid_import_kwh" && isActive(adj),
  );
  if (electricity.length === 0) return { lines: [], solarCorrectionGross: 0, estimatedAny: false };

  const lines: AdjustmentLine[] = [];
  let solarCorrectionGross = 0;
  let estimatedAny = false;

  if (consumptionItems && consumptionItems.length > 0) {
    const eligibleKwh = new Map<string, number>(electricity.map((adj) => [adj.id, 0]));
    const eligibleSelfKwh = new Map<string, number>(electricity.map((adj) => [adj.id, 0]));
    const productionByTs = new Map<string, number>();
    for (const item of productionItems ?? []) {
      const ts = String(item.startedAt ?? "");
      productionByTs.set(ts, (productionByTs.get(ts) ?? 0) + (Number(item.value) || 0));
    }

    for (const item of consumptionItems) {
      const kw = Number(item.value) || 0;
      const ts = String(item.startedAt ?? "");
      const luxDate = luxembourgDate(ts);
      if (luxDate === null) continue;
      const solarKw = productionByTs.get(ts) ?? 0;
      const gridKwh = Math.max(0, kw - solarKw) * 0.25;
      const selfKwh = Math.min(kw, solarKw) * 0.25;
      for (const adj of electricity) {
        if (covers(adj, luxDate)) {
          eligibleKwh.set(adj.id, eligibleKwh.get(adj.id)! + gridKwh);
          eligibleSelfKwh.set(adj.id, eligibleSelfKwh.get(adj.id)! + selfKwh);
        }
      }
    }

    for (const adj of electricity) {
      const applied = isApplied(adj);
      lines.push(makeLine(adj, eligibleKwh.get(adj.id)!, "kWh", vatRate, applied, false));
      if (applied) solarCorrectionGross += eligibleSelfKwh.get(adj.id)! * adj.amount_gross;
    }
    return { lines, solarCorrectionGross, estimatedAny };
  }

  // Fallback without interval data: prorate by calendar day overlap and flag
  // the result as estimated when the period must be split.
  const periodDays = Math.max(1, dayNumber(periodEnd) - dayNumber(periodStart) + 1);
  for (const adj of electricity) {
    const overlap = overlapDays(adj, periodStart, periodEnd);
    const share = overlap / periodDays;
    const estimated = overlap > 0 && overlap < periodDays;
    estimatedAny = estimatedAny || estimated;
    const applied = isApplied(adj);
    lines.push(
      makeLine(adj, Math.max(0, fallbackGridImportKwh) * share, "kWh", vatRate, applied, estimated),
    );
    if (applied) {
      solarCorrectionGross += Math.max(0, fallbackSelfConsumedKwh) * share * adj.amount_gross;
    }
  }
  return { lines, solarCorrectionGross, estimatedAny };
}

function gasLines(
  adjustments: BillingAdjustment[],
  gasVolumeM3: number,
  gasEnergyKwh: number,
  periodStart: string,
  periodEnd: string,
  vatRate: number,
): { lines: AdjustmentLine[]; estimatedAny: boolean } {
  const gas = adjustments.filter(
    (adj) => adj.commodity === "gas" && adj.basis === "gas_volume_m3" && isActive(adj),
  );
  if (gas.length === 0) return { lines: [], estimatedAny: false };

  let estimatedAny = false;
  let volume = Math.max(0, gasVolumeM3 || 0);
  if (volume <= 0 && gasEnergyKwh > 0) {
    volume = gasEnergyKwh / GAS_KWH_PER_M3;
    estimatedAny = true;
  }

  const periodDays = Math.max(1, dayNumber(periodEnd) - dayNumber(periodStart) + 1);
  const lines: AdjustmentLine[] = [];
  for (const adj of gas) {
    const overlap = overlapDays(adj, periodStart, periodEnd);
    const share = overlap / periodDays;
    const estimated = estimatedAny || (overlap > 0 && overlap < periodDays);
    lines.push(makeLine(adj, volume * share, "m3", vatRate, isApplied(adj), estimated));
    if (estimated) estimatedAny = true;
  }
  return { lines, estimatedAny };
}

export interface ComputeBillingAdjustmentsInput {
  adjustments: unknown;
  vatRate: number;
  gasVatRate: number;
  /** Inclusive period calendar dates, YYYY-MM-DD. */
  periodStart: string;
  periodEnd: string;
  consumptionItems?: IntervalItem[] | null;
  productionItems?: IntervalItem[] | null;
  fallbackGridImportKwh?: number;
  fallbackSelfConsumedKwh?: number;
  gasVolumeM3?: number;
  gasEnergyKwh?: number;
}

export function computeBillingAdjustments(
  input: ComputeBillingAdjustmentsInput,
): BillingAdjustmentResult {
  const normalized = normalizeAdjustments(input.adjustments);

  const electricity = electricityLines(
    normalized,
    input.consumptionItems,
    input.productionItems,
    input.fallbackGridImportKwh ?? 0,
    input.fallbackSelfConsumedKwh ?? 0,
    input.periodStart,
    input.periodEnd,
    input.vatRate || 0,
  );
  const gas = gasLines(
    normalized,
    input.gasVolumeM3 ?? 0,
    input.gasEnergyKwh ?? 0,
    input.periodStart,
    input.periodEnd,
    input.gasVatRate || 0,
  );

  const totals = (lines: AdjustmentLine[]) => {
    let gross = 0;
    let net = 0;
    for (const line of lines) {
      if (line.applied) {
        gross += line.total_gross;
        net += line.total_net;
      }
    }
    return { gross, net };
  };
  const elecTotals = totals(electricity.lines);
  const gasTotals = totals(gas.lines);

  return {
    electricity: {
      lines: electricity.lines,
      applied_gross: elecTotals.gross,
      applied_net: elecTotals.net,
      solar_correction_gross: electricity.solarCorrectionGross,
      estimated: electricity.estimatedAny,
    },
    gas: {
      lines: gas.lines,
      applied_gross: gasTotals.gross,
      applied_net: gasTotals.net,
      estimated: gas.estimatedAny,
    },
    estimated: electricity.estimatedAny || gas.estimatedAny,
  };
}
