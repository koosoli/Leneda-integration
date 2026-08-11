/**
 * Invoice-style cent rounding — TypeScript twin of tests/test_invoice_rounding.py.
 *
 * Suppliers price every invoice line to the cent and then add the rounded
 * lines up, charging VAT on that rounded subtotal. The reference case is the
 * real SUDenergie "Décompte mensuel 06.2026" invoice (281,304 kWh):
 * 73,33 EUR HTVA + 5,87 EUR TVA = 79,20 EUR. Summed raw, the same lines give
 * 73,327029 EUR and a 79,19 EUR total.
 */
import { describe, it, expect } from "vitest";
import { roundCents } from "../src/utils/format";

const CONSUMPTION_KWH = 281.304;
const EXCEEDANCE_KWH = 0.05;

/** The lines exactly as printed on the invoice. */
const invoiceLines = [
  CONSUMPTION_KWH * 0.1125, // Consommation électricité
  3.5, // Prime mensuelle
  -1.0, // Réduction domiciliation
  -0.5, // Réduction courrier électronique
  CONSUMPTION_KWH * -0.001, // Mécanisme de compensation A
  CONSUMPTION_KWH * 0.001, // Taxe d'électricité A
  19.61, // Redevance fixe
  CONSUMPTION_KWH * 0.051, // Redevance volumétrique
  EXCEEDANCE_KWH * 0.0765, // Supplément pour le dépassement
  5.72, // Redevance de comptage
];

describe("roundCents", () => {
  it.each([
    [31.6467, 31.65],
    [14.346504, 14.35],
    [-0.281304, -0.28],
    [0.003825, 0.0],
    [73.327029, 73.33],
    // Ties round away from zero, not to even, as billers do.
    [0.285, 0.29],
    [-0.285, -0.29],
    [2.675, 2.68],
  ])("rounds %d to %d", (value, expected) => {
    expect(roundCents(value)).toBeCloseTo(expected, 9);
  });

  it.each([null, undefined, NaN, Infinity])("returns 0 for %s", (value) => {
    expect(roundCents(value as number)).toBe(0);
  });

  it("rounds each line separately, not the sum", () => {
    expect(roundCents(0.005) * 2).toBeCloseTo(0.02, 9);
    expect(roundCents(0.005 + 0.005)).toBeCloseTo(0.01, 9);
  });
});

describe("SUDenergie June 2026 invoice", () => {
  const subtotal = roundCents(invoiceLines.reduce((sum, line) => sum + roundCents(line), 0));
  const vat = roundCents(subtotal * 0.08);
  const total = roundCents(subtotal + vat);

  it("reproduces the printed subtotal, VAT and total", () => {
    expect(subtotal).toBeCloseTo(73.33, 9);
    expect(vat).toBeCloseTo(5.87, 9);
    expect(total).toBeCloseTo(79.2, 9);
  });

  it("guards the regression: raw summation was a cent low", () => {
    const rawSubtotal = invoiceLines.reduce((sum, line) => sum + line, 0);
    expect(rawSubtotal).toBeCloseTo(73.327029, 6);
    expect(roundCents(rawSubtotal * 1.08)).toBeCloseTo(79.19, 9);
    expect(total).toBeCloseTo(79.2, 9);
  });

  it("matches the individual line amounts on the invoice", () => {
    expect(roundCents(invoiceLines[0])).toBeCloseTo(31.65, 9);
    expect(roundCents(invoiceLines[4])).toBeCloseTo(-0.28, 9);
    expect(roundCents(invoiceLines[5])).toBeCloseTo(0.28, 9);
    expect(roundCents(invoiceLines[7])).toBeCloseTo(14.35, 9);
    expect(roundCents(invoiceLines[8])).toBeCloseTo(0.0, 9);
  });
});
