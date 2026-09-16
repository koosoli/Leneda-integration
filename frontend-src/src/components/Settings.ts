/**
 * Settings — Billing-rate configuration form + credential management.
 *
 * In standalone mode: shows API credential fields (key, energy ID)
 *   plus up to 3 metering points — each with type checkboxes
 *   (Consumption / Solar production / Grid export / Gas).
 * In HA mode: shows the meter config read-only from Home Assistant and
 *   a note that credentials are managed via HA Integrations page.
 * Billing configuration is always visible in both modes.
 */
import type {
  BillingConfig,
  Credentials,
  MeterConfig,
  FeedInRate,
  MeterMonthlyFee,
  ConsumptionRateWindow,
  ReferencePowerWindow,
  DayGroup,
  MeterType,
} from "../api/leneda";
import type { BillingAdjustment } from "../utils/billingAdjustments";
import { LU_ELECTRICITY_PRESET_ID, normalizeAdjustments } from "../utils/billingAdjustments";
import { resolveSolarSystemName } from "../utils/solarAllocation";

interface Field {
  key: keyof BillingConfig;
  label: string;
  step: string;
  unit: string;
  type: "number" | "text";
}

interface FieldGroup {
  title: string;
  icon: string;
  fields: Field[];
}

const DAY_GROUP_OPTIONS: Array<{ value: DayGroup; label: string }> = [
  { value: "all", label: "Every day" },
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
];

const FIELD_GROUPS: FieldGroup[] = [
  {
    title: "Energy Supplier",
    icon: "⚡",
    fields: [
      { key: "energy_fixed_fee", label: "Fixed Fee", step: "0.01", unit: "EUR/mo", type: "number" },
      { key: "energy_variable_rate", label: "Variable Rate", step: "0.00001", unit: "EUR/kWh", type: "number" },
    ],
  },
  {
    title: "Network Operator",
    icon: "🔌",
    fields: [
      { key: "network_metering_rate", label: "Metering Fee", step: "0.01", unit: "EUR/mo", type: "number" },
      { key: "network_power_ref_rate", label: "Reference Power Fixed Charge", step: "0.01", unit: "EUR/mo", type: "number" },
      { key: "network_variable_rate", label: "Variable Rate", step: "0.0001", unit: "EUR/kWh", type: "number" },
    ],
  },
  {
    title: "Reference Power & Exceedance",
    icon: "📏",
    fields: [
      { key: "reference_power_kw", label: "Reference Power (Referenzwert)", step: "0.1", unit: "kW", type: "number" },
      { key: "exceedance_rate", label: "Exceedance Surcharge", step: "0.0001", unit: "EUR/kWh", type: "number" },
    ],
  },
  {
    title: "Reference Power Windows",
    icon: "⏱️",
    fields: [],
  },
  {
    title: "Time-of-Use Tariffs",
    icon: "🕒",
    fields: [],
  },
  {
    title: "Feed-in / Selling",
    icon: "💶",
    fields: [],  // rendered manually below due to mode toggle
  },
  {
    title: "Gas Billing",
    icon: "🔥",
    fields: [
      { key: "gas_fixed_fee", label: "Supplier Fixed Fee", step: "0.01", unit: "EUR/mo", type: "number" },
      { key: "gas_variable_rate", label: "Supplier Variable Rate", step: "0.0001", unit: "EUR/kWh", type: "number" },
      { key: "gas_network_fee", label: "Network Fixed Fee", step: "0.01", unit: "EUR/mo", type: "number" },
      { key: "gas_network_variable_rate", label: "Network Variable Rate", step: "0.0001", unit: "EUR/kWh", type: "number" },
      { key: "gas_tax_rate", label: "Gas Tax", step: "0.0001", unit: "EUR/kWh", type: "number" },
      { key: "gas_vat_rate", label: "Gas VAT Rate", step: "0.01", unit: "decimal (0.08 = 8%)", type: "number" },
    ],
  },
  {
    title: "Meter Fees",
    icon: "📊",
    fields: [],  // rendered manually — per-meter monthly costs
  },
  {
    title: "Taxes & Levies",
    icon: "🏛️",
    fields: [
      { key: "compensation_fund_rate", label: "Compensation Fund", step: "0.0001", unit: "EUR/kWh", type: "number" },
      { key: "electricity_tax_rate", label: "Electricity Tax", step: "0.0001", unit: "EUR/kWh", type: "number" },
      { key: "vat_rate", label: "VAT Rate", step: "0.01", unit: "decimal (0.08 = 8%)", type: "number" },
    ],
  },
  {
    title: "Discounts",
    icon: "💸",
    fields: [
      { key: "domiciliation_discount", label: "Domiciliation Discount", step: "0.01", unit: "EUR/mo", type: "number" },
      { key: "connect_discount", label: "Electronic Invoice Discount", step: "0.01", unit: "EUR/mo", type: "number" },
    ],
  },
  {
    title: "Government Aid & Billing Adjustments",
    icon: "🏛️",
    fields: [],
  },
  {
    title: "General",
    icon: "⚙️",
    fields: [
      { key: "currency", label: "Currency", step: "", unit: "", type: "text" },
    ],
  },
];

// ── Collapsed/expanded section state ─────────────────────────────
// The settings form re-renders wholesale on every edit (adding a tariff
// window, toggling a preset…), so which sections are open lives here
// instead of in the DOM that gets thrown away.

const openSections = new Set<string>();
let sectionsInitialized = false;

export function setSectionOpen(title: string, open: boolean): void {
  if (open) openSections.add(title);
  else openSections.delete(title);
}

function isSectionOpen(title: string, defaults: Set<string>): boolean {
  if (!sectionsInitialized) {
    sectionsInitialized = true;
    defaults.forEach((t) => openSections.add(t));
  }
  return openSections.has(title);
}

// ── Helpers ──────────────────────────────────────────────────────

const METER_ROLE_ORDER: MeterType[] = ["consumption", "production", "solar_consumption", "export", "export_consumption", "gas"];

const TYPE_LABELS: Record<MeterType, string> = {
  consumption: "Consumption",
  production: "Solar production",
  solar_consumption: "Solar production (consumption-metered)",
  export: "Grid export",
  export_consumption: "Grid export (consumption-metered)",
  gas: "Gas",
};

const TYPE_ICONS: Record<MeterType, string> = {
  consumption: "⚡",
  production: "☀️",
  solar_consumption: "☀️",
  export: "",
  export_consumption: "",
  gas: "🔥",
};

const TYPE_DESCRIPTIONS: Record<MeterType, string> = {
  consumption: "House/grid import meter",
  production: "PV generation, including energy that may be self-consumed",
  solar_consumption: "Solar production measured as consumption",
  export: "Export-only meter for energy sold/sent to the grid",
  export_consumption: "Grid export measured on the consumption register (active consumption OBIS)",
  gas: "Gas consumption meter",
};

function renderMeterTypes(types: MeterType[]): string {
  return types
    .map((t) => {
      const icon = TYPE_ICONS[t];
      const label = TYPE_LABELS[t] ?? t;
      return `<span class="meter-type-badge meter-type-${t}">${icon ? `${icon} ` : ""}${label}</span>`;
    })
    .join(" ");
}

function renderMeterTypeOption(index: number, type: MeterType, meter: MeterConfig): string {
  return `
          <label class="meter-type-cb">
            <input type="checkbox" name="meter_${index}_${type}" ${meter.types.includes(type) ? "checked" : ""} />
            <span class="meter-type-copy">
              <strong>${TYPE_LABELS[type] ?? type}</strong>
              <small>${TYPE_DESCRIPTIONS[type] ?? ""}</small>
            </span>
          </label>
  `;
}

function renderMeterRow(index: number, meter: MeterConfig, readonly: boolean): string {
  const num = index + 1;
  if (readonly) {
    return `
      <div class="meter-card">
        <div class="meter-header">
          <strong>Meter ${num}</strong>
          <code class="meter-id">${meter.id ? "..." + meter.id.slice(-8) : "—"}</code>
        </div>
        <div class="meter-types">${renderMeterTypes(meter.types)}</div>
      </div>
    `;
  }

  // Editable (standalone mode)
  return `
    <div class="meter-card">
      <div class="meter-header">
        <strong>Meter ${num}</strong>
        ${num > 1 ? `<button type="button" class="btn-icon remove-meter-btn" data-meter="${index}" title="Remove meter">&times;</button>` : ""}
      </div>
      <div class="form-row">
        <label for="meter-id-${index}">Metering Point ID</label>
        <div class="input-group">
          <input
            id="meter-id-${index}"
            name="meter_${index}_id"
            type="text"
            value="${meter.id ?? ""}"
            placeholder="e.g. LUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          />
        </div>
      </div>
      <div class="form-row">
        <label>This meter measures</label>
        <div class="meter-type-checkboxes">
          ${METER_ROLE_ORDER.map((type) => renderMeterTypeOption(index, type, meter)).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderDayGroupOptions(selected: DayGroup): string {
  return DAY_GROUP_OPTIONS.map(
    (opt) => `<option value="${opt.value}" ${opt.value === selected ? "selected" : ""}>${opt.label}</option>`,
  ).join("");
}

function renderConsumptionRateWindowRow(index: number, window: ConsumptionRateWindow): string {
  return `
    <div class="meter-card">
      <div class="meter-header">
        <strong>Tariff Window ${index + 1}</strong>
        <button type="button" class="btn-icon remove-consumption-window-btn" data-window="${index}" title="Remove tariff window">&times;</button>
      </div>
      <div class="form-row">
        <label for="consumption-window-${index}-label">Label</label>
        <div class="input-group">
          <input id="consumption-window-${index}-label" name="consumption_window_${index}_label" type="text" value="${window.label ?? ""}" placeholder="e.g. Night / Drive / Weekend" />
        </div>
      </div>
      <div class="form-row">
        <label for="consumption-window-${index}-day-group">Active days</label>
        <div class="input-group">
          <select id="consumption-window-${index}-day-group" name="consumption_window_${index}_day_group">
            ${renderDayGroupOptions(window.day_group ?? "all")}
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>Time window</label>
        <div class="input-group schedule-window-inputs">
          <input name="consumption_window_${index}_start_time" type="time" value="${window.start_time ?? "00:00"}" />
          <span class="input-unit">to</span>
          <input name="consumption_window_${index}_end_time" type="time" value="${window.end_time ?? "06:00"}" />
        </div>
      </div>
      <div class="form-row">
        <label for="consumption-window-${index}-rate">Supplier rate</label>
        <div class="input-group">
          <input id="consumption-window-${index}-rate" name="consumption_window_${index}_rate" type="number" step="0.0001" value="${window.rate ?? 0}" />
          <span class="input-unit">EUR/kWh</span>
        </div>
      </div>
    </div>
  `;
}

function renderReferencePowerWindowRow(index: number, window: ReferencePowerWindow): string {  return `
    <div class="meter-card">
      <div class="meter-header">
        <strong>Reference Window ${index + 1}</strong>
        <button type="button" class="btn-icon remove-reference-window-btn" data-window="${index}" title="Remove reference window">&times;</button>
      </div>
      <div class="form-row">
        <label for="reference-window-${index}-label">Label</label>
        <div class="input-group">
          <input id="reference-window-${index}-label" name="reference_window_${index}_label" type="text" value="${window.label ?? ""}" placeholder="e.g. Evening / Charging hours" />
        </div>
      </div>
      <div class="form-row">
        <label for="reference-window-${index}-day-group">Active days</label>
        <div class="input-group">
          <select id="reference-window-${index}-day-group" name="reference_window_${index}_day_group">
            ${renderDayGroupOptions(window.day_group ?? "all")}
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>Time window</label>
        <div class="input-group schedule-window-inputs">
          <input name="reference_window_${index}_start_time" type="time" value="${window.start_time ?? "17:00"}" />
          <span class="input-unit">to</span>
          <input name="reference_window_${index}_end_time" type="time" value="${window.end_time ?? "00:00"}" />
        </div>
      </div>
      <div class="form-row">
        <label for="reference-window-${index}-power">Reference power</label>
        <div class="input-group">
          <input id="reference-window-${index}-power" name="reference_window_${index}_reference_power_kw" type="number" step="0.1" value="${window.reference_power_kw ?? 5}" />
          <span class="input-unit">kW</span>
        </div>
      </div>
    </div>
  `;
}

function renderAdjustmentRow(index: number, adj: BillingAdjustment): string {
  const isPreset = !!adj.preset_id;
  const isLuElectricity = adj.preset_id === LU_ELECTRICITY_PRESET_ID;
  const showDoubleCountWarning = isLuElectricity && adj.enabled && !adj.tariff_already_includes_adjustment;
  return `
    <div class="meter-card">
      <div class="meter-header">
        <strong>${adj.label || `Adjustment ${index + 1}`}</strong>
        ${isPreset ? '<span class="meter-type-badge meter-type-production">Official preset</span>' : ""}
        <button type="button" class="btn-icon remove-adjustment-btn" data-adjustment="${index}" title="Remove adjustment">&times;</button>
      </div>
      <input type="hidden" name="adjustment_${index}_id" value="${adj.id}" />
      <input type="hidden" name="adjustment_${index}_preset_id" value="${adj.preset_id ?? ""}" />
      <input type="hidden" name="adjustment_${index}_suspends_compensation" value="${adj.suspends_compensation ? "1" : ""}" />
      ${showDoubleCountWarning ? `
      <div class="settings-note settings-note-warning">
        ⚠️ Only enable this if your configured electricity price does <strong>not</strong> already include the government subsidy.
      </div>
      ` : ""}
      ${isLuElectricity && adj.enabled && adj.suspends_compensation ? `
      <div class="settings-note">
        Suppliers bill this subsidy through the compensation line (“Mécanisme de compensation A −0,0371/kWh”), so the base Compensation Fund credit is automatically suspended on subsidised kWh instead of being added on top.
      </div>
      ` : ""}
      <div class="form-row">
        <label class="meter-type-cb">
          <input type="checkbox" name="adjustment_${index}_enabled" ${adj.enabled ? "checked" : ""} />
          <span class="meter-type-copy"><strong>Enabled</strong><small>Apply this adjustment on invoices inside its date range</small></span>
        </label>
      </div>
      <div class="form-row">
        <label for="adjustment-${index}-label">Label</label>
        <div class="input-group">
          <input id="adjustment-${index}-label" name="adjustment_${index}_label" type="text" value="${adj.label ?? ""}" placeholder="e.g. Luxembourg electricity subsidy 2026" />
        </div>
      </div>
      <div class="form-row">
        <label for="adjustment-${index}-commodity">Commodity</label>
        <div class="input-group">
          <select id="adjustment-${index}-commodity" name="adjustment_${index}_commodity">
            <option value="electricity" ${adj.commodity === "electricity" ? "selected" : ""}>Electricity</option>
            <option value="gas" ${adj.commodity === "gas" ? "selected" : ""}>Gas</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label for="adjustment-${index}-basis">Calculation basis</label>
        <div class="input-group">
          <select id="adjustment-${index}-basis" name="adjustment_${index}_basis">
            <option value="grid_import_kwh" ${adj.basis === "grid_import_kwh" ? "selected" : ""}>Grid import (kWh)</option>
            <option value="gas_volume_m3" ${adj.basis === "gas_volume_m3" ? "selected" : ""}>Gas volume (m³)</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label for="adjustment-${index}-amount">Amount per unit</label>
        <div class="input-group">
          <input id="adjustment-${index}-amount" name="adjustment_${index}_amount_gross" type="number" step="0.0001" min="0" value="${adj.amount_gross ?? 0}" />
          <span class="input-unit">EUR/${adj.basis === "gas_volume_m3" ? "m³" : "kWh"}</span>
        </div>
      </div>
      <div class="form-row">
        <label>Valid period (inclusive)</label>
        <div class="input-group schedule-window-inputs">
          <input name="adjustment_${index}_start_date" type="date" value="${adj.start_date ?? ""}" />
          <span class="input-unit">to</span>
          <input name="adjustment_${index}_end_date" type="date" value="${adj.end_date ?? ""}" />
        </div>
      </div>
      <div class="form-row">
        <label class="meter-type-cb">
          <input type="checkbox" name="adjustment_${index}_vat_included" ${adj.vat_included ? "checked" : ""} />
          <span class="meter-type-copy"><strong>Amount includes VAT</strong><small>Official subsidy rates are published including VAT</small></span>
        </label>
      </div>
      <div class="form-row">
        <label class="meter-type-cb">
          <input type="checkbox" name="adjustment_${index}_tariff_already_includes_adjustment" ${adj.tariff_already_includes_adjustment ? "checked" : ""} />
          <span class="meter-type-copy"><strong>My entered tariff already includes this adjustment</strong><small>Prevents double-counting; the adjustment is shown for information only</small></span>
        </label>
      </div>
      <div class="form-row">
        <label for="adjustment-${index}-note">Eligibility note</label>
        <div class="input-group">
          <input id="adjustment-${index}-note" name="adjustment_${index}_eligibility_note" type="text" value="${adj.eligibility_note ?? ""}" placeholder="e.g. Residential customers below 25,000 kWh/year" />
        </div>
      </div>
    </div>
  `;
}

export function renderSettings(
  config: BillingConfig | null,
  mode: "ha" | "standalone" = "ha",
  credentials?: Credentials | null,
): string {
  const isDemoBuild = !!import.meta.env.VITE_DEMO_MODE;
  if (!config && mode === "ha") {
    return `
      <section class="settings-view">
        <div class="card">
          <p class="muted">Loading configuration…</p>
        </div>
      </section>
    `;
  }

  // ── Meters from credentials (standalone) or config (HA) ──
  const meters: MeterConfig[] = mode === "standalone"
    ? (credentials?.meters ?? [{ id: "", types: ["consumption"] }])
    : (config?.meters ?? []);

  // ── Credentials + meters section ──
  let credentialsSection = "";
  if (mode === "standalone") {
    const meterCards = meters.map((m, i) => renderMeterRow(i, m, false)).join("");
    const proxyUrl = credentials?.proxy_url ?? "";
    const hostedNotice = isDemoBuild ? `
      <div class="settings-note settings-note-warning">
        <strong>Hosted mode uses demo data unless a proxy is configured.</strong>
        <p>
          The GitHub Pages dashboard cannot call <code>api.leneda.eu</code> directly because the Leneda API blocks
          browser CORS requests. To see live data here, enter a proxy URL below. The standalone server in this repo
          works as that proxy, for example <code>http://127.0.0.1:5175</code>.
        </p>
      </div>
    ` : "";
    credentialsSection = `
      <div class="section-header">
        <h2>API Connection</h2>
        <span class="muted">${isDemoBuild ? "Configure your Leneda connection, proxy, and metering points" : "Configure your Leneda API credentials and metering points"}</span>
      </div>
      <div class="card" style="margin-bottom: var(--sp-6);">
        <form id="credentials-form">
          ${hostedNotice}
          <div class="form-section">
            <div class="form-section-title">🔑  Leneda API Credentials</div>
            <div class="form-row">
              <label for="cfg-api_key">API Key</label>
              <div class="input-group">
                <input
                  id="cfg-api_key"
                  name="api_key"
                  type="password"
                  value="${credentials?.api_key ?? ""}"
                  placeholder="Enter your Leneda API key"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-energy_id">Energy ID</label>
              <div class="input-group">
                <input
                  id="cfg-energy_id"
                  name="energy_id"
                  type="text"
                  value="${credentials?.energy_id ?? ""}"
                  placeholder="e.g. LU-123-456-789"
                />
              </div>
            </div>
            ${isDemoBuild ? `
            <div class="form-row">
              <label for="cfg-proxy_url">Proxy URL</label>
              <div class="input-group">
                <input
                  id="cfg-proxy_url"
                  name="proxy_url"
                  type="text"
                  value="${proxyUrl}"
                  placeholder="http://127.0.0.1:5175"
                />
              </div>
            </div>
            ` : ""}
          </div>

          <div class="form-section">
            <div class="form-section-title">📊  Metering Points</div>
            <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
              Select what each meter reports. Use Solar production for PV generation, and Grid export only when the meter reports energy sold or sent to the grid.
            </p>
            <div id="meters-container">
              ${meterCards}
            </div>
            ${meters.length < 10 ? `
            <button type="button" id="add-meter-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
              + Add Metering Point
            </button>
            ` : ""}
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Credentials</button>
            <button type="button" id="test-creds-btn" class="btn btn-outline">Test Connection</button>
          </div>
          <div id="creds-status"></div>
        </form>
      </div>
    `;
  } else {
    // HA mode: show meters read-only
    const haMeters = config?.meters ?? [];
    const meterDisplay = haMeters.length > 0
      ? haMeters.map((m, i) => renderMeterRow(i, m, true)).join("")
      : `<p class="muted">No meters configured</p>`;
    credentialsSection = `
      <div class="card" style="margin-bottom: var(--sp-6); padding: var(--sp-4) var(--sp-5);">
        <p class="muted" style="margin: 0 0 var(--sp-3) 0;">🔒 API credentials are managed through Home Assistant &rarr; Settings &rarr; Integrations &rarr; Leneda</p>
        <div class="form-section">
          <div class="form-section-title">📊  Configured Metering Points</div>
          <div id="meters-container">
            ${meterDisplay}
          </div>
        </div>
      </div>
    `;
  }

  const renderFields = (fields: Field[]) =>
    fields.map((f) => {
      const val = config ? ((config as any)[f.key] ?? "") : "";
      return `
        <div class="form-row">
          <label for="cfg-${f.key}">${f.label}</label>
          <div class="input-group">
            <input
              id="cfg-${f.key}"
              name="${f.key}"
              type="${f.type}"
              ${f.type === "number" ? `step="${f.step}"` : ""}
              value="${val}"
            />
            ${f.unit ? `<span class="input-unit">${f.unit}</span>` : ""}
          </div>
        </div>
      `;
    }).join("");

  // ── Feed-in mode section (per-production-meter rendering) ──
  const productionMeters = (config?.meters ?? []).filter((m) => m.types.includes("production") || m.types.includes("solar_consumption"));
  const feedInRates: FeedInRate[] = config?.feed_in_rates ?? [];
  const isHA = mode === "ha";

  function rateFor(meterId: string): FeedInRate {
    return feedInRates.find((r) => r.meter_id === meterId) ?? {
      meter_id: meterId,
      mode: "fixed",
      tariff: config?.feed_in_tariff ?? 0.08,
      sensor_entity: "",
      display_name: "",
      // No default order for new systems — blank means Prorata Modus.
      self_use_priority: null,
    };
  }

  const feedInSection = productionMeters.length === 0
    ? `<p class="muted">No solar production meters configured — add a meter with Solar production above.</p>`
    : productionMeters.map((m, idx) => {
      const r = rateFor(m.id);
      const shortId = m.id ? "…" + m.id.slice(-8) : `Meter ${idx + 1}`;
      const displayName = resolveSolarSystemName(m.id, idx + 1, r.display_name);
      return `
          <div class="feed-in-meter-card" data-meter-idx="${idx}" data-meter-id="${m.id}">
            <div class="feed-in-meter-header">
              <span class="meter-type-badge meter-type-production">☀️ ${displayName}</span>
              <code style="font-size: var(--text-sm);">${shortId}</code>
              <input type="hidden" name="feed_in_rate_${idx}_meter_id" value="${m.id}" />
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${idx}_display_name">System Name</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${idx}_display_name"
                  name="feed_in_rate_${idx}_display_name"
                  type="text"
                  value="${r.display_name ?? ""}"
                  placeholder="${resolveSolarSystemName(m.id, idx + 1)}"
                />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-feed_in_rate_${idx}_priority">Self-use Priority</label>
              <div class="input-group">
                <input
                  id="cfg-feed_in_rate_${idx}_priority"
                  name="feed_in_rate_${idx}_self_use_priority"
                  type="number"
                  min="1"
                  step="1"
                  value="${r.self_use_priority ?? ""}"
                  placeholder="Pro-rata"
                />
                <span class="input-unit">1 = used first at home</span>
              </div>
              <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                Leave blank for <strong>Prorata Modus</strong> — self-consumption is shared between
                the unprioritised systems in proportion to what each one produced in that
                15-minute interval.
              </p>
            </div>
            <div class="form-row">
              <label>Pricing Mode</label>
              <div class="feed-in-mode-toggle">
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${idx}_mode" value="fixed" ${r.mode === "fixed" ? "checked" : ""} />
                  <span class="mode-label">💶 Fixed Tariff</span>
                </label>
                <label class="mode-option">
                  <input type="radio" name="feed_in_rate_${idx}_mode" value="sensor" ${r.mode === "sensor" ? "checked" : ""} />
                  <span class="mode-label">📡 HA Sensor</span>
                </label>
              </div>
            </div>
            <div class="feed-in-fixed-fields" data-rate-idx="${idx}" style="${r.mode === "fixed" ? "" : "display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${idx}_tariff">Feed-in Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${idx}_tariff" name="feed_in_rate_${idx}_tariff" type="number" step="0.0001" value="${r.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
              </div>
            </div>
            <div class="feed-in-sensor-fields" data-rate-idx="${idx}" style="${r.mode === "sensor" ? "" : "display:none"}">
              <div class="form-row">
                <label for="cfg-feed_in_rate_${idx}_sensor">Market Price Sensor</label>
                <div class="input-group sensor-picker-group">
                  <input
                    id="cfg-feed_in_rate_${idx}_sensor"
                    name="feed_in_rate_${idx}_sensor_entity"
                    type="text"
                    value="${r.sensor_entity}"
                    placeholder="${isHA ? "sensor.electricity_price" : "sensor.electricity_price (HA mode only)"}"
                    list="ha-entity-list"
                  />
                  <span class="input-unit">entity_id</span>
                </div>
                ${isHA && idx === 0 ? '<datalist id="ha-entity-list"></datalist>' : ""}
              </div>
              <div class="form-row">
                <label for="cfg-feed_in_rate_${idx}_fallback">Fallback Tariff</label>
                <div class="input-group">
                  <input id="cfg-feed_in_rate_${idx}_fallback" name="feed_in_rate_${idx}_fallback_tariff" type="number" step="0.0001" value="${r.tariff}" />
                  <span class="input-unit">EUR/kWh</span>
                </div>
                <p class="muted" style="font-size: var(--text-xs); margin-top: var(--sp-1);">
                  Used when the sensor is unavailable.
                </p>
              </div>
            </div>
          </div>
        `;
    }).join("");

  const hasGasMeter = (config?.meters ?? []).some((m) => m.types.includes("gas")) || config?.meter_has_gas;
  const consumptionRateWindows: ConsumptionRateWindow[] = config?.consumption_rate_windows ?? [];
  const referencePowerWindows: ReferencePowerWindow[] = config?.reference_power_windows ?? [];

  // ── Per-meter monthly fees section ──
  const allMeters = config?.meters ?? [];
  const meterFees: MeterMonthlyFee[] = config?.meter_monthly_fees ?? [];

  function feeFor(meterId: string): MeterMonthlyFee {
    return meterFees.find((f) => f.meter_id === meterId) ?? {
      meter_id: meterId,
      label: "",
      fee: 0,
    };
  }

  const meterFeesSection = allMeters.length === 0
    ? `<p class="muted">No meters configured.</p>`
    : allMeters.map((m, idx) => {
      const f = feeFor(m.id);
      const shortId = m.id ? "…" + m.id.slice(-8) : `Meter ${idx + 1}`;
      const typeIcons = m.types.map((t: MeterType) => TYPE_ICONS[t] ?? "").join(" ");
      return `
          <div class="meter-fee-card" style="margin-bottom: var(--sp-3); padding: var(--sp-3); border: 1px solid var(--clr-border); border-radius: var(--radius);">
            <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2);">
              <span>${typeIcons}</span>
              <code style="font-size: var(--text-sm);">${shortId}</code>
              <input type="hidden" name="meter_fee_${idx}_meter_id" value="${m.id}" />
            </div>
            <div class="form-row" style="margin-bottom: var(--sp-2);">
              <label for="cfg-meter_fee_${idx}_label">Label</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${idx}_label" name="meter_fee_${idx}_label" type="text" value="${f.label || `Meter ${idx + 1} metering fee`}" placeholder="e.g. Smart meter rental" />
              </div>
            </div>
            <div class="form-row">
              <label for="cfg-meter_fee_${idx}_fee">Monthly Fee</label>
              <div class="input-group">
                <input id="cfg-meter_fee_${idx}_fee" name="meter_fee_${idx}_fee" type="number" step="0.01" value="${f.fee}" />
                <span class="input-unit">EUR/mo</span>
              </div>
            </div>
          </div>
        `;
    }).join("");

  const timeOfUseSection = `
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional supplier-rate windows. Outside these windows, the base <strong>Energy Supplier → Variable Rate</strong> is used.
      Windows can cross midnight by setting an end time earlier than the start time.
    </p>
    <div id="consumption-windows-container">
      ${consumptionRateWindows.length > 0
        ? consumptionRateWindows.map((w, idx) => renderConsumptionRateWindowRow(idx, w)).join("")
        : '<p class="muted">No time-of-use windows configured. Using the flat supplier rate.</p>'}
    </div>
    <button type="button" id="add-consumption-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Tariff Window
    </button>
  `;

  const referenceWindowsSection = `
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Optional reference-power overrides for specific hours. Outside these windows, the base reference power above is used.
    </p>
    <div id="reference-windows-container">
      ${referencePowerWindows.length > 0
        ? referencePowerWindows.map((w, idx) => renderReferencePowerWindowRow(idx, w)).join("")
        : '<p class="muted">No scheduled reference windows configured. Using one reference power all day.</p>'}
    </div>
    <button type="button" id="add-reference-window-btn" class="btn btn-outline" style="margin-top: var(--sp-3);">
      + Add Reference Window
    </button>
  `;

  const adjustments: BillingAdjustment[] = normalizeAdjustments(config?.billing_adjustments);
  const adjustmentsSection = `
    <p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
      Dated per-unit subsidies, rebates, supplier credits or temporary taxes. Amounts are deducted as separate invoice
      lines &mdash; your tariff prices are never modified. Date ranges are inclusive (Europe/Luxembourg).
      Overlapping adjustments stack. If your configured tariff already includes an adjustment, tick
      <strong>My entered tariff already includes this adjustment</strong> to avoid double-counting.
    </p>
    <div id="adjustments-container">
      ${adjustments.length > 0
        ? adjustments.map((adj, idx) => renderAdjustmentRow(idx, adj)).join("")
        : '<p class="muted">No billing adjustments configured.</p>'}
    </div>
    <div style="display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-3);">
      <button type="button" id="add-adjustment-btn" class="btn btn-outline">
        + Add Custom Adjustment
      </button>
      <button type="button" id="restore-adjustment-presets-btn" class="btn btn-outline">
        Restore Official Presets
      </button>
    </div>
  `;

  // Sections people touch when first setting up stay open; the rest are
  // collapsed so the form is scannable instead of a 2000px wall of inputs.
  const DEFAULT_OPEN_SECTIONS = new Set(["Energy Supplier", "Network Operator"]);

  const groups = FIELD_GROUPS.map((g) => {
    // Hide gas billing section when no gas meter is configured
    if (g.title === "Gas Billing" && !hasGasMeter) return "";
    // Hide meter fees if only one meter
    if (g.title === "Meter Fees" && allMeters.length < 2) return "";

    let content: string;
    if (g.title === "Feed-in / Selling") {
      content = feedInSection;
    } else if (g.title === "Time-of-Use Tariffs") {
      content = timeOfUseSection;
    } else if (g.title === "Reference Power Windows") {
      content = referenceWindowsSection;
    } else if (g.title === "Government Aid & Billing Adjustments") {
      content = adjustmentsSection;
    } else if (g.title === "Discounts") {
      content = `<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Positive values are treated as monthly credits. The dashboard prorates them to the selected period and subtracts them before VAT.
      </p>` + renderFields(g.fields);
    } else if (g.title === "Meter Fees") {
      content = `<p class="muted" style="margin: 0 0 var(--sp-3) 0; font-size: 0.85rem;">
        Each metering point has a fixed monthly rental/metering fee. Set the cost per meter below.
      </p>` + meterFeesSection;
    } else {
      content = renderFields(g.fields);
    }

    return `
    <details class="form-section" data-section="${g.title}" ${isSectionOpen(g.title, DEFAULT_OPEN_SECTIONS) ? "open" : ""}>
      <summary class="form-section-title">${g.icon}  ${g.title}</summary>
      ${content}
    </details>
  `;
  }).join("");

  return `
    <section class="settings-view">
      ${credentialsSection}

      <div class="section-header">
        <h2>Billing Configuration</h2>
        <span class="muted">Luxembourg energy billing rates &mdash; adjust values to match your contract</span>
        ${config ? `
        <div class="section-header-actions">
          <button type="button" class="btn btn-ghost" data-sections-toggle="open">Expand all</button>
          <button type="button" class="btn btn-ghost" data-sections-toggle="close">Collapse all</button>
        </div>
        ` : ""}
      </div>

      <div class="card">
        <form id="settings-form">
          ${config ? groups : '<p class="muted">Loading configuration…</p>'}
          ${config ? `
          <div class="form-actions form-actions-sticky">
            <button type="submit" class="btn btn-primary">Save Configuration</button>
            <button type="button" id="reset-config-btn" class="btn btn-outline">Reset to Defaults</button>
            <span id="settings-status" class="form-status" role="status" aria-live="polite"></span>
          </div>
          ` : ""}
        </form>
      </div>
    </section>
  `;
}
