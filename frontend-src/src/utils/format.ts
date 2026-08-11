/**
 * Number and date formatting utilities.
 */

function parseDisplayDate(value: string): Date {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return new Date(value);
}

/**
 * Round a money amount to whole cents, half away from zero.
 *
 * Utility invoices price every line to the cent and then sum the rounded
 * lines, so the estimate must round the same way to land on the same total
 * (e.g. 73.327029 EUR of raw lines bills as 73.33 EUR, not 73.32).
 */
export function roundCents(value: number | null | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  const sign = value < 0 ? -1 : 1;
  // toFixed first so binary representations like 28.499999999999996 still
  // round as the decimal 28.50 a biller would see.
  return (sign * Math.round(Number((Math.abs(value) * 100).toFixed(6)))) / 100;
}

/** Format a number with up to `decimals` decimal places. */
export function fmtNum(value: number | null | undefined, decimals = 2): string {
  if (value == null) return "—";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/** Format energy value with unit. */
export function fmtEnergy(value: number | null | undefined, unit = "kWh"): string {
  return `${fmtNum(value)} ${unit}`;
}

/** Format an ISO timestamp to a short local time string. */
export function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

/** Format an ISO timestamp to a short local date string. */
export function fmtDate(iso: string): string {
  const d = parseDisplayDate(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Format an ISO timestamp to date + time. */
export function fmtDateTime(iso: string): string {
  const d = parseDisplayDate(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Format an ISO timestamp to a very short date (e.g., "Feb 4"). */
export function fmtDateShort(iso: string): string {
  const d = parseDisplayDate(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/** Format an ISO timestamp to a longer local date string. */
export function fmtDateLong(iso: string): string {
  const d = parseDisplayDate(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
