/**
 * Dashboard — Main energy overview with stat cards, range selector, chart + flow.
 *
 * The flow scene is designed around four anchors:
 *   - Grid on the left
 *   - Solar above the house
 *   - House in the center
 *   - Energy community on the right
 */
import type { AppState } from "./App";
import { RANGES, renderRangeControls } from "./RangeControls";
import { renderEnergyFlowScene, type EnergyFlowSceneData } from "./EnergyFlowScene";
import { fmtNum, fmtDate } from "../utils/format";
import {
  CHART_TIME_BUCKETS,
  formatChartPeriodLabel,
  getChartSpanMs,
  getShiftedChartRange,
  getChartTimeBucketOption,
  isChartTimeBucketEnabled,
} from "../utils/chartTime";

export { RANGES } from "./RangeControls";

type DashboardUiIcon =
  | "consumption"
  | "production"
  | "export"
  | "self_consumed"
  | "flow"
  | "metrics"
  | "profile"
  | "warning"
  | "ok";

function dashboardUiIcon(icon: DashboardUiIcon): string {
  const svg = (body: string) => `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${body}
    </svg>
  `;

  switch (icon) {
    case "consumption":
      return svg(`
        <path d="M13 2L6 13H11L10 22L18 10H13Z" />
      `);
    case "production":
      return svg(`
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2V4.5" />
        <path d="M12 19.5V22" />
        <path d="M2 12H4.5" />
        <path d="M19.5 12H22" />
        <path d="M4.93 4.93L6.7 6.7" />
        <path d="M17.3 17.3L19.07 19.07" />
        <path d="M17.3 6.7L19.07 4.93" />
        <path d="M4.93 19.07L6.7 17.3" />
      `);
    case "export":
      return svg(`
        <path d="M6 18H18" />
        <path d="M12 6V16" />
        <path d="M8 10L12 6L16 10" />
      `);
    case "self_consumed":
      return svg(`
        <path d="M4 11.5L12 5L20 11.5" />
        <path d="M6.5 10.5V19H17.5V10.5" />
        <path d="M10.5 19V14H13.5V19" />
      `);
    case "flow":
      return svg(`
        <path d="M8 7H17L14.5 4.5" />
        <path d="M17 7L14.5 9.5" />
        <path d="M16 17H7L9.5 19.5" />
        <path d="M7 17L9.5 14.5" />
        <path d="M7 17C5.5 15.8 4.5 14 4.5 12C4.5 10.7 4.9 9.5 5.6 8.5" />
        <path d="M17 7C18.5 8.2 19.5 10 19.5 12C19.5 13.3 19.1 14.5 18.4 15.5" />
      `);
    case "metrics":
      return svg(`
        <path d="M5 19V11" />
        <path d="M12 19V7" />
        <path d="M19 19V4" />
        <path d="M3 19H21" />
      `);
    case "profile":
      return svg(`
        <path d="M4 19V5" />
        <path d="M4 19H20" />
        <path d="M7 15L11 11L14 13L19 8" />
        <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
      `);
    case "warning":
      return svg(`
        <path d="M12 4L20 19H4L12 4Z" />
        <path d="M12 9V13" />
        <path d="M12 16H12.01" />
      `);
    case "ok":
      return svg(`
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12.5L11 15L15.5 9.5" />
      `);
  }
}

export function renderDashboard(state: AppState): string {
  const d = state.rangeData;

  const consumption = d?.consumption ?? 0;
  const production = d?.production ?? 0;
  const exported = d?.exported ?? 0;
  const reportedSelfConsumed = d?.self_consumed ?? 0;
  const gasEnergy = d?.gas_energy ?? 0;
  const gasVolume = d?.gas_volume ?? 0;
  const peakPower = d?.peak_power_kw ?? 0;

  const sharedWithMe = d?.shared_with_me ?? 0;
  const shared = d?.shared ?? 0;
  const soldToMarket = Math.max(0, exported);
  const derivedSolarCoverage = d?.grid_import != null ? Math.max(0, consumption - d.grid_import) : undefined;
  const solarToHome = Math.max(
    0,
    d?.solar_to_home ??
      d?.direct_solar_to_home ??
      (reportedSelfConsumed > 0 ? reportedSelfConsumed : production - soldToMarket),
    derivedSolarCoverage ?? 0,
  );
  const directSolarToHome = Math.max(
    0,
    d?.direct_solar_to_home ?? Math.max(0, solarToHome - sharedWithMe),
  );
  const selfConsumed = solarToHome;
  const boughtFromGrid = Math.max(0, d?.grid_import ?? (consumption - solarToHome));
  const totalHomeEnergy = consumption > 0 ? consumption : boughtFromGrid + solarToHome;
  const hasGasMeter = Boolean(
    state.config?.meter_has_gas ||
      (state.config?.meters ?? []).some((meter) => meter.types.includes("gas")),
  );
  const communityExchange = shared + sharedWithMe;

  // Self-sufficiency
  const selfSufficiency =
    totalHomeEnergy > 0 ? Math.min(100, (solarToHome / totalHomeEnergy) * 100) : 0;

  const maxFlowValue = Math.max(
    totalHomeEnergy,
    production,
    boughtFromGrid,
    soldToMarket,
    shared,
    sharedWithMe,
    directSolarToHome,
    1,
  );
  const gasFlowVisualValue = hasGasMeter ? Math.min(Math.max(0, gasEnergy), maxFlowValue) : 0;

  /** Bar widths in the mobile flow list, relative to the biggest flow. */
  const mobileFlowPercent = (value: number): number =>
    value > 0 ? Math.max(18, Math.round((value / maxFlowValue) * 100)) : 0;

  const sceneData: EnergyFlowSceneData = {
    production,
    directSolarToHome,
    solarToHome,
    boughtFromGrid,
    soldToMarket,
    shared,
    sharedWithMe,
    communityExchange,
    totalHomeEnergy,
    selfSufficiency,
    gasEnergy,
    gasVolume,
    hasGas: hasGasMeter,
  };

  // Chart title — dynamic based on selected range
  const rangeLabel =
    d?.start && d?.end
      ? `${fmtDate(d.start)} — ${fmtDate(d.end)}`
      : state.range === "custom" && state.customStart && state.customEnd
      ? `${fmtDate(state.customStart + "T00:00:00")} — ${fmtDate(state.customEnd + "T00:00:00")}`
      : RANGES.find((r) => r.id === state.range)?.label ?? "Yesterday";
  const chartItems = state.consumptionTimeseries?.items?.length
    ? state.consumptionTimeseries.items
    : state.productionTimeseries?.items ?? [];
  const chartPeriodStart = state.chartViewportStart ?? chartItems[0]?.startedAt ?? d?.start;
  const chartPeriodEnd =
    state.chartViewportEnd ?? chartItems[chartItems.length - 1]?.startedAt ?? d?.end;
  const chartSpanMs = getChartSpanMs(chartPeriodStart, chartPeriodEnd);
  const activeBucket = getChartTimeBucketOption(state.chartTimeBucket);
  const chartPeriodLabel = formatChartPeriodLabel(chartPeriodStart, chartPeriodEnd);
  const nextChartRange = getShiftedChartRange(
    chartPeriodStart,
    chartPeriodEnd,
    state.chartTimeBucket,
    1,
  );
  const now = new Date();
  const disableNextPeriod =
    !nextChartRange ||
    nextChartRange.start.getTime() > now.getTime();
  const chartBucketControls = CHART_TIME_BUCKETS.map((bucket) => {
    const enabled = isChartTimeBucketEnabled(bucket.id, chartSpanMs);
    const isActive = bucket.id === state.chartTimeBucket;
    const disabledReason = bucket.id === "quarter_hour"
      ? "15-minute detail would be too dense for this selected period"
      : `${bucket.label} detail does not add useful resolution for this selected period`;

    return `
            <button
              class="unit-btn chart-bucket-btn ${isActive ? "active" : ""}"
              data-chart-bucket="${bucket.id}"
              title="${enabled ? `Show ${bucket.label.toLowerCase()} detail` : disabledReason}"
              ${enabled ? "" : "disabled aria-disabled=\"true\""}
            >${bucket.label}</button>
          `;
  }).join("");
  const chartUnitHint = state.chartUnit === "kw"
    ? "kW uses the same detail presets as kWh, but keeps power values in interval bars so short spikes and dips stay visible."
    : "kWh keeps the aggregated period bars for totals.";
  const chartHint = state.chartConsumptionView === "house"
    ? "Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero. Use the detail presets and arrows above the graph to move through time."
    : state.chartConsumptionView === "solar_systems"
      ? "PV Systems stacks each configured solar production meter so you can compare panel-system output like the Home Assistant Energy dashboard."
      : "Net Grid focuses on what still came from the grid after solar, with exports shown below zero. The reference limit in kW mode applies here.";
  const chartHintCopy = `${chartHint} ${chartUnitHint}`;
  const exceedanceIcon = (d?.exceedance_kwh ?? 0) > 0
    ? dashboardUiIcon("warning")
    : dashboardUiIcon("ok");

  const statCard = (options: {
    modifier: string;
    icon: DashboardUiIcon;
    label: string;
    value: string;
    unit: string;
    hint: string;
  }): string => `
        <div class="stat-card ${options.modifier}">
          <div class="stat-icon">${dashboardUiIcon(options.icon)}</div>
          <div class="stat-body">
            <div class="stat-label">${options.label}</div>
            <div class="stat-value">${options.value} <span class="stat-unit">${options.unit}</span></div>
            <p class="stat-hint">${options.hint}</p>
          </div>
        </div>
  `;

  return `
    <div class="dashboard">
      ${renderRangeControls(state)}

      <!-- Stat Cards -->
      <div class="stats-grid">
        ${statCard({
      modifier: "consumption",
      icon: "consumption",
      label: "Consumption",
      value: fmtNum(consumption),
      unit: "kWh",
      hint: "Everything the house used",
    })}
        ${statCard({
      modifier: "production",
      icon: "production",
      label: "Production",
      value: fmtNum(production),
      unit: "kWh",
      hint: "Total generated by your panels",
    })}
        ${statCard({
      modifier: "export",
      icon: "export",
      label: "Exported",
      value: fmtNum(exported),
      unit: "kWh",
      hint: "Surplus sold back to the grid",
    })}
        ${statCard({
      modifier: "self-consumed",
      icon: "self_consumed",
      label: "Self-Consumed",
      value: fmtNum(selfConsumed),
      unit: "kWh",
      hint: "Solar used at home instead of bought",
    })}
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">${dashboardUiIcon("flow")}</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <p class="flow-scene-caption">
              Thicker paths carry more energy. Colours are explained below the diagram.
            </p>

            ${renderEnergyFlowScene(sceneData, "desktop")}
            ${renderEnergyFlowScene(sceneData, "mobile")}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${fmtNum(totalHomeEnergy)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${fmtNum(selfSufficiency, 0)}% of home usage solar-covered${peakPower > 0 ? ` · Peak ${fmtNum(peakPower, 2)} kW` : ""}
                </span>
              </div>

              <div class="mobile-flow-list">
                <div class="mobile-flow-item solar">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Solar to home</span>
                    <strong>${fmtNum(solarToHome)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${mobileFlowPercent(solarToHome)}%;"></span></div>
                  <p>Energy used inside the house${sharedWithMe > 0 ? ", including received community energy" : ""}.</p>
                </div>

                <div class="mobile-flow-item import">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Bought from grid</span>
                    <strong>${fmtNum(boughtFromGrid)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${mobileFlowPercent(boughtFromGrid)}%;"></span></div>
                  <p>Electricity purchased from the grid for the selected period.</p>
                </div>

                <div class="mobile-flow-item export">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Grid export</span>
                    <strong>${fmtNum(soldToMarket)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${mobileFlowPercent(soldToMarket)}%;"></span></div>
                  <p>Surplus energy sent back to the market.</p>
                </div>

                <div class="mobile-flow-item community">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Community exchange</span>
                    <strong>${fmtNum(communityExchange)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${mobileFlowPercent(communityExchange)}%;"></span></div>
                  <p>Sent ${fmtNum(shared)} kWh · received ${fmtNum(sharedWithMe)} kWh.</p>
                </div>
                ${hasGasMeter ? `
                <div class="mobile-flow-item gas">
                  <div class="mobile-flow-item-top">
                    <span class="mobile-flow-item-label">Gas to house</span>
                    <strong>${fmtNum(gasEnergy)} kWh</strong>
                  </div>
                  <div class="mobile-flow-bar"><span style="width: ${mobileFlowPercent(gasFlowVisualValue || maxFlowValue)}%;"></span></div>
                  <p>${gasVolume > 0 ? `${fmtNum(gasVolume)} m3 measured for the same period.` : "Gas meter is configured for this home."}</p>
                </div>
                ` : ""}
              </div>
            </div>

            <div class="flow-legend">
              <div class="flow-legend-item solar">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Solar to home</strong>
                  <span>${fmtNum(solarToHome)} kWh directly supplied inside the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${fmtNum(boughtFromGrid)} kWh still needed from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${fmtNum(soldToMarket)} kWh sent back to the market or grid</span>
                </span>
              </div>
              <div class="flow-legend-item community">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Community exchange</strong>
                  <span>${fmtNum(shared)} kWh sent · ${fmtNum(sharedWithMe)} kWh received${sharedWithMe > 0 ? " (included in solar to home)" : ""}</span>
                </span>
              </div>
              ${hasGasMeter ? `
              <div class="flow-legend-item gas">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Gas to house</strong>
                  <span>${fmtNum(gasEnergy)} kWh${gasVolume > 0 ? ` / ${fmtNum(gasVolume)} m3` : ""}</span>
                </span>
              </div>
              ` : ""}
            </div>
          </div>
      </div>

      <!-- Key Metrics (right of flow) -->
      <div class="card metrics-card">
        <h3 class="card-title"><span class="title-icon">${dashboardUiIcon("metrics")}</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Solar Coverage</span>
              <span class="metric-value">${fmtNum(selfSufficiency, 1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${selfSufficiency}%"></div>
            </div>
            <p class="metric-sub">Share of home usage covered by solar</p>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Bought from Grid</span>
              <span class="metric-value">${fmtNum(boughtFromGrid)} kWh</span>
            </div>
          </div>
          ${peakPower > 0 ? `
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Peak Power</span>
              <span class="metric-value">${fmtNum(peakPower, 2)} kW</span>
            </div>
          </div>
          ` : ""}
          <div class="metric ${(d?.exceedance_kwh ?? 0) > 0 ? "metric-warning" : "metric-ok"}">
            <div class="metric-header">
              <span class="metric-label"><span class="metric-status-icon">${exceedanceIcon}</span> Exceedance</span>
              <span class="metric-value">${fmtNum(d?.exceedance_kwh ?? 0, 2)} kWh</span>
            </div>
          </div>
          ${gasEnergy > 0 || gasVolume > 0 ? `
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Energy</span>
              <span class="metric-value">${fmtNum(gasEnergy)} kWh</span>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Gas Volume</span>
              <span class="metric-value">${fmtNum(gasVolume)} m³</span>
            </div>
          </div>
          ` : ""}
        </div>
      </div>
      </div>

      <!-- Chart -->
      <div class="card chart-card">
        <div class="chart-header">
          <h3 class="card-title"><span class="title-icon">${dashboardUiIcon("profile")}</span> Energy Profile — ${rangeLabel}</h3>

          <div class="chart-control-stack">
            <div class="chart-control-group chart-control-group-wide">
              <span class="chart-control-label">Period</span>
              <div class="chart-period-controls" role="group" aria-label="Move chart period">
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="prev"
                  title="Previous ${activeBucket.stepLabel}"
                  aria-label="Previous ${activeBucket.stepLabel}"
                >&larr;</button>
                <span class="chart-period-pill">${chartPeriodLabel}</span>
                <button
                  class="chart-nav-btn"
                  data-chart-period-nav="next"
                  title="Next ${activeBucket.stepLabel}"
                  aria-label="Next ${activeBucket.stepLabel}"
                  ${disableNextPeriod ? "disabled aria-disabled=\"true\"" : ""}
                >&rarr;</button>
              </div>
            </div>

            <div class="chart-control-group">
              <span class="chart-control-label">Detail</span>
              <div class="chart-bucket-toggle" role="group" aria-label="Chart detail presets">
                ${chartBucketControls}
              </div>
            </div>

            <div class="chart-control-group">
              <span class="chart-control-label">Unit</span>
              <div class="chart-unit-toggle" role="group" aria-label="Chart unit">
                <button
                  class="unit-btn ${state.chartUnit === "kw" ? "active" : ""}"
                  data-chart-unit="kw"
                  title="Show power (kW) — see when you exceed the reference limit"
                >kW</button>
                <button
                  class="unit-btn ${state.chartUnit === "kwh" ? "active" : ""}"
                  data-chart-unit="kwh"
                  title="Show energy consumed (kWh)"
                >kWh</button>
              </div>
            </div>

            <div class="chart-control-group">
              <span class="chart-control-label">View</span>
              <div class="chart-unit-toggle" role="group" aria-label="Chart view">
                <button
                  class="unit-btn ${state.chartConsumptionView === "house" ? "active" : ""}"
                  data-chart-view="house"
                  title="Show the full house consumption with the solar-covered share overlaid"
                >Total Usage</button>
                <button
                  class="unit-btn ${state.chartConsumptionView === "grid" ? "active" : ""}"
                  data-chart-view="grid"
                  title="Show the net draw from the grid after solar"
                >Net Grid</button>
                <button
                  class="unit-btn ${state.chartConsumptionView === "solar_systems" ? "active" : ""}"
                  data-chart-view="solar_systems"
                  title="Show each configured solar production meter as a stacked PV performance chart"
                >PV Systems</button>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="energy-chart"></canvas>
        </div>
        <p class="muted chart-hint">${chartHintCopy}</p>
      </div>
    </div>
  `;
}
