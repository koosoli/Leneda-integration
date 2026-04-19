# Changelog

All notable changes to the **Leneda HACS Integration** will be documented in this file.


## [v2.6.0] - 2026-04-19

### New Features
- **House-Centered Energy Flow:** Reworked the dashboard flow diagram so the house is the central focus, with cleaner source/load placement and an optional gas branch that only appears when a gas meter is configured.
- **Mobile Flow Diagram:** Added a dedicated mobile layout for the dashboard flow so the diagram now renders on phone-sized screens instead of dropping out.

### Improvements
- **Chart Readability:** Updated the dashboard charts so positive and negative bars align vertically, daily/monthly/yearly views label periods more clearly, and positive/negative bar corners match the intended flat-at-zero styling from the reference design.
- **Zoom and Time Resolution:** Improved zoom behavior so deep zooms keep the exact visible sub-day window, allow chart inspection down to 15-minute intervals, and show the corresponding 15-minute timestamps below the bars when zoomed in far enough.
- **Axis Scaling Polish:** Restored tighter `kWh` scaling so the y-axis tracks the actual visible energy values instead of expanding unnecessarily.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.6.0`.


## [v2.5.0] - 2026-04-17

### New Features
- **Dedicated Charts Analysis Page:** Added a new `Charts` tab with a full analysis workspace built from the same 15-minute Leneda data as the dashboard and invoice.
- **Consumption Pattern Heatmap:** Added a weekday-by-hour heatmap that can switch between `Total Usage`, `Net Grid`, and `Solar Production` to spot night load, weekend behavior, and daytime solar shape quickly.
- **Solar Coverage Analytics:** Added daily solar coverage trends, self-consumed-versus-exported solar tracking, and a solar-value trend that combines self-consumption savings, export revenue, and avoided exceedance savings.
- **Reference-Power Deep Dive:** Added reference-power analysis with worst hours, worst days, top exceedance intervals, and direct visibility into exceedance volume and cost.
- **Period Comparison:** Added matched previous-period comparison charts and summary deltas for house usage, net grid usage, solar coverage, and solar value.
- **Tariff-Aware Cost Trends:** Added daily charts for import cost, solar savings, export earnings, and exceedance cost so users can connect load behavior directly to money.
- **Load Duration Curve and Daily Breakdown:** Added a sorted gross-vs-net load duration curve plus a one-glance daily breakdown chart for house usage, grid supply, solar-covered energy, exports, and exceedance markers.

### Improvements
- **Dashboard Graph Clarity:** Added clearer `Total Usage` and `Net Grid` graph modes, kept `Net Grid` as the default view, and made solar exports render below zero so import and export are easier to distinguish visually.
- **Chart Interaction Polish:** Switching graph modes or `kW`/`kWh` no longer jumps the page to the top, and the updated labels make the graph intent easier to understand.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.5.0`.

## [v2.4.0] - 2026-04-17

### New Features
- **Solar Value Breakdown in Invoice:** Expanded the main invoice view to show solar production, autoconsumed energy savings, exported-energy revenue, and a single combined `Total saved / earned thanks to solar` figure for the selected period.
- **Reference-Power Savings from Solar:** Added invoice tracking for exceedance charges avoided when concurrent solar production shaves the net 15-minute load below the configured reference power level.

### Improvements
- **Solar Revenue Card Rollup:** Updated the dedicated solar value card so the panel worth now includes self-consumption savings, avoided reference-power exceedance, and export revenue in one combined solar value summary.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.4.0`.

## [v2.3.0] - 2026-04-16

### Bug Fixes
- **Last Month Exceedance:** Fixed the Home Assistant backend so the `Last Month` preset now computes and returns the cached reference-power exceedance correctly instead of silently omitting the surcharge from invoice estimates.
- **Preset/Custom Invoice Parity:** Custom date ranges that exactly match a preset period now reuse the same preset billing data path, so a manual `2026-03-01` to `2026-03-31` selection matches `Last Month` for billed grid import, exceedance, and invoice totals.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, and dashboard version badge to `v2.3.0`.

## [v2.2.0] - 2026-04-15

### New Features
- **Invoice Period Selector:** Added the full period selector directly to the Invoice tab, including custom date selection and visible preset start/end dates, so invoice checks no longer depend on switching back to the dashboard.
- **Reference Power Level Comparison:** Added a Creos-style comparison table that recalculates the selected period across the standard low-voltage reference power levels and highlights the financially optimal level.

### Improvements
- **Reference Power Terminology:** Updated invoice and settings wording toward Creos terminology, including `reference power level`, `fixed charge`, `volumetric charge`, and `exceedance charge`.
- **Fixed Fee Proration Accuracy:** Monthly fixed charges in the invoice are now prorated day by day across the actual selected period, including custom ranges that span multiple months.
- **Energy Flow Visual Refresh:** Reworked the dashboard energy-flow scene to replace oversized arrows with slimmer layered energy lanes, softer lighting, and cleaner motion so the graphic feels more polished while staying easy to read.
- **Mobile Dashboard Layout:** Improved small-screen handling for dashboard date controls and the flow card, including wrapped range buttons and a compact phone-specific energy-flow summary, so the interface stays readable on phones without label collisions or sideways scrolling.
- **Mobile Invoice Layout:** Reworked invoice, gas, solar, and reference power sections into stacked mobile cards so billing details stay readable on phones without horizontal scrolling.
- **Print-Friendly Invoice Output:** Added a dedicated `Print Invoice` action and print-specific layout rules that hide the app chrome and format the selected invoice view cleanly for paper or PDF export.

## [v2.1.1] - 2026-03-24

### Bug Fixes
- **Preset Period Visibility:** Preset ranges such as `Last Week` and `Last Month` now keep their actual `From` and `To` dates visible in the dashboard and invoice period header so the selected window can be verified directly.
- **Energy Flow Totals:** Fixed preset and live range mapping so `Solar to home`, `Bought from grid`, and `Grid export` use the Leneda-covered and remaining-consumption values instead of being recomputed from incomplete fallback math.
- **Solar-Shaved Exceedance:** Corrected exceedance calculations to use net house load per interval after concurrent solar production is deducted, matching the intended power-shaving behavior.
- **Missing Data State:** Failed API fetches now clear stale totals and show `Missing Data` instead of leaving old consumption values visible.
- **Config Number Recovery:** Blank numeric billing settings are normalized back to defaults so supplier, network, and exceedance fields do not stay empty after an incomplete save.

### Improvements
- **Default Graph Unit:** The dashboard now opens in `kWh` view by default instead of `kW`.
- **Local Dev Parity:** The localhost dev API now returns preset period dates and the same range breakdown fields used by Home Assistant, making local verification match the integration behavior more closely.

## [v2.1.0] - 2026-03-24

### Bug Fixes
- **Energy Flow Mapping:** Aligned dashboard energy-flow calculations with invoice and billing data so `consumption` reflects energy bought from the grid and market export remains `exported - shared`.
- **Solar-to-Home Totals:** Fixed solar-to-home reporting so direct self-consumption is calculated from on-site production while energy received through community sharing is included in the displayed home-supplied total.
- **Self-Sufficiency Accuracy:** Recalculated self-sufficiency from the full mix of home energy sources, combining bought-from-grid energy with direct and community-supplied solar usage.

### Improvements
- **Dashboard Terminology:** Renamed `Daily Consumption` to `Period Consumption` and `Grid import` to `Bought from grid` to match non-daily views and billing terminology.
- **Legend Clarity:** Updated the energy-flow legend to clearly show that community-received energy is included in `Solar to home`.

## [v2.0.5] - 2026-03-09

### Bug Fixes
- **Import Hotfix:** Restored the missing `get_effective_reference_power` helper so Home Assistant can import the Leneda integration successfully again.
- **Reference Power Consistency:** Exceedance calculations now use the same effective reference-power source as the dashboard config and API.
- **Timeseries API Stability:** Fixed the dashboard timeseries endpoint so it resolves meter routes correctly instead of failing with `routes is not defined`.
- **Weekly Range Guard:** Fixed Monday and month-boundary date ranges that could send `start > end` requests to Leneda and break dashboard loading with API 400/500 errors.

### Improvements
- **Repo Consolidation:** Removed the duplicate local codebase so the Git repository is the single source of truth for ongoing work.

## [v2.0.4] - 2026-03-08

### New Features
- **Light/Dark Theme Toggle:** Added a persistent theme switch for the entire dashboard, including charts and the energy-flow scene.
- **Scheduled Tariff Windows:** Added configurable time-of-use supplier pricing windows by day group and time range.
- **Scheduled Reference Windows:** Added alternate reference-power windows for contracts with different reference values at different times.
- **Monthly Contract Discount:** Added a prorated `Connect Discount` field that is shown explicitly on the invoice and applied before VAT.

### Bug Fixes
- **Reference Power Exceedance Sync:** Manual and scheduled reference-power settings now drive exceedance calculations consistently in the backend and invoice views.
- **Settings Scroll Position:** Adding or removing tariff/reference windows no longer jumps the Settings page back to the top.
- **Local Dev Launcher:** The frontend dev batch file now targets `http://localhost:5175/`, avoids accidental port changes, and restores the browser-open workflow for local testing.
- **Multi-Entry Meter Loss:** Fixed a Home Assistant bug where separate Leneda entries could make the dashboard/API show only one configured meter set instead of combining electricity and gas.

### Improvements
- **Energy Flow Visuals:** Reworked the dashboard energy-flow graphic for clearer grid, solar, home, and community routing with more readable visual emphasis.
- **Manual Local Testing Docs:** Added README instructions for running the dashboard locally without batch files.

## [v2.0.3] - 2026-02-12

### Build & Deployment
- **Build Automation:** Added `build-dashboard.bat` to automate the process of building the frontend and syncing it to the Home Assistant integration directory.
- **Version Sync:** Unified versioning across `manifest.json`, `package.json`, and the Dashboard UI.

## [v2.0.2] - 2026-02-12

### Mobile Responsiveness Overhaul
- **Responsive Navigation:** Replaced the desktop-only navigation bar with a mobile-friendly hamburger menu for screens smaller than 768px.
- **Scrollable Time Selector:** The range selector now supports horizontal touch scrolling, preventing the entire page from panning.
- **Adaptive Modules:** Optimized the dashboard layout for small screens, stacking stat cards, energy flow, and key metrics vertically for better legibility.
- **Touch-Optimized UI:** Increased spacing and touch targets across the dashboard for a premium mobile experience.

## [v2.0.1] - 2026-02-11

### New Features
- **Per-Panel Energy Chart:** Visualize individual solar production sources with a new stacked bar chart. Now featuring distinct, high-contrast Lime/Teal/Emerald colors (#BEF527) for clear differentiation.
- **Multi-Meter Sensor Support:** Sensors are now correctly grouped under their respective physical meter devices (Consumption, Production, Gas) in Home Assistant.
- **Solar-Adjusted Exceedance:** Exceedance calculations now correctly subtract concurrent solar production from consumption at 15-minute intervals. `Overage = max(0, (Consumption - Solar) - Reference)`.

### Bug Fixes
- **Feed-In Tariff Persistence:** Fixed a critical issue where configured feed-in tariffs were not saving correctly due to a field name collision.
- **Year Range Logic:** "This Year" and "Last Year" buttons now work correctly in both HA and local dev (fixed missing logic cases).
- **Average Feed-In Rate:** Hardened calculation logic to prevent NaN values when sensors are unavailable.
- **Local Development:** Added support for multi-meter visualization and proper year ranges in the local dev environment.

## [v2.0.0] - 2026-02-10

### Major Rewrites
- **Complete Overhaul**: The integration has been rewritten from the ground up for better performance, stability, and maintainability.
- **New Frontend Architecture**: Introduced a dedicated `frontend-src` directory using modern web technologies (Vite, TypeScript, standard web components) replaces the old dashboard logic.
- **Standalone Mode**: Added a `standalone` server for easier development and testing of the dashboard outside of Home Assistant.

### New Features
- **Avant-Garde Dashboard**: A completely new, high-performance visualization dashboard featuring:
- Glassmorphism UI design.
- Real-time animated energy flow.
- Interactive, zoomable charts.
- Comprehensive statistical breakdown (Self-sufficiency, Peak Power, etc.).
- **Device Consolidation**: Logic to automatically group multiple physical meters into single logical devices in Home Assistant.
- **Energy Community Support**: First-class support for tracking shared energy production and community consumption.
- **Robust Error Handling**: Improved resilience against API outages; the integration now gracefully handles connection drops without losing sensor state.

### Infrastructure
- **CI/CD Pipelines**: Added GitHub Actions for:
- Automated Releases (`release.yaml`).
- GitHub Pages deployment (`deploy_pages.yaml`).
- **Documentation**:
- Redrafted `README.md` with clearer instructions and visual badges.
- Added `SETUP_GUIDE.md` for developers.

### Removed
- Legacy "Basic" dashboard implementation.
- Redundant helper scripts from the `Old-workingbutbasic` version.
