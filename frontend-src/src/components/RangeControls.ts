/**
 * RangeControls — the period picker shared by Dashboard, Charts and Invoice.
 *
 * One row: preset buttons plus the concrete dates they resolved to, and the
 * From/To inputs only when "Custom" is selected. The presets already say what
 * period is shown, so non-custom ranges get plain text instead of readonly
 * date inputs that look editable but aren't.
 */
import type { AppState } from "./App";

export const RANGES: { id: string; label: string }[] = [
  { id: "yesterday", label: "Yesterday" },
  { id: "this_week", label: "This Week" },
  { id: "last_week", label: "Last Week" },
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
  { id: "this_year", label: "This Year" },
  { id: "last_year", label: "Last Year" },
  { id: "custom", label: "Custom" },
];

/** "2026-08-13T00:00:00+02:00" → "2026-08-13" (the value a date input wants). */
export function toDateInputValue(value?: string): string {
  if (!value) return "";
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

/** Human-readable label for the resolved period, collapsing single-day ranges. */
export function formatPeriodLabel(start?: string, end?: string): string {
  if (!start || !end) return "";
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return "";
  const startText = startDate.toLocaleDateString();
  const endText = endDate.toLocaleDateString();
  return startText === endText ? startText : `${startText} — ${endText}`;
}

export function renderRangeControls(state: AppState): string {
  const periodStartValue = toDateInputValue(state.rangeData?.start ?? state.customStart);
  const periodEndValue = toDateInputValue(state.rangeData?.end ?? state.customEnd);
  const periodLabel = formatPeriodLabel(state.rangeData?.start, state.rangeData?.end);

  return `
    <div class="period-bar">
      <div class="range-selector" role="group" aria-label="Select period">
        ${RANGES.map((range) => `
          <button
            class="range-btn ${range.id === state.range ? "active" : ""}"
            data-range="${range.id}"
            aria-pressed="${range.id === state.range}"
          >${range.label}</button>
        `).join("")}
      </div>
      ${periodLabel ? `<span class="period-bar-dates" title="Period currently shown">${periodLabel}</span>` : ""}
    </div>

    ${state.range === "custom" ? `
      <div class="custom-range-picker">
        <label>
          <span>From</span>
          <input type="date" id="custom-start" value="${state.customStart || periodStartValue}" />
        </label>
        <label>
          <span>To</span>
          <input type="date" id="custom-end" value="${state.customEnd || periodEndValue}" />
        </label>
        <button class="btn btn-primary" id="apply-custom-range">Apply</button>
      </div>
    ` : ""}
  `;
}
