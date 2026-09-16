# Changelog

All notable changes to the **Leneda HACS Integration** will be documented in this file.


## [Unreleased]

### Bug Fixes
- **Electricity subsidy double-counted with compensation credit:** the August 2026 SUDenergie bill showed the Resilienzpak subsidy *through* the compensation line (“Mécanisme de compensation A −0,0371/kWh” = −€0.04/kWh incl. VAT), while the app stacked the −€0.001 base credit on top of the separate subsidy line (81,73 € estimated vs. 82,19 € billed). The electricity preset now suspends the base Compensation Fund credit on subsidised kWh via a new `suspends_compensation` flag (auto-applied to stored presets), and the estimate reproduces the printed bill within 2 cents (supplier 4-decimal rate rounding).
- **Subsidy quantity reconciled to billed import:** the eligible subsidy quantity was recomputed from 15-minute intervals (384,552 kWh) and could diverge from the billed grid import (382,759 kWh). Intervals now only split the period; quantities scale to the official meter totals. Covered by the SUDenergie 08.2026 regression test and shared Python/TypeScript parity fixtures.


## [v2.18.0] - 2026-08-15

### New Features
- **Charts Page Sections:** The analysis page was one 5,200px scroll of ten cards with no way to navigate it. It is now five sections — Overview, Patterns, Solar & Battery, Costs, Peaks — each one or two screens, with the range picker shared across them.
- **What Stood Out:** A findings card at the top of Overview reads the period's 15-minute data and reports what actually happened: the most expensive day and its share of the total, the always-on baseload, whether reference power was exceeded and at what hour, how much of your own solar you kept, the costliest hour of the day to buy in, and what storage would have added. Every line is measured, not extrapolated, except where the text says otherwise.
- **Always-On Baseload:** A new card showing the floor your house load never drops below, taken as the 5th percentile of all intervals so a single dropout cannot define it, with its share of total usage and what it costs over a year. Cutting baseload pays back every hour of every day, so it is usually the cheapest saving available.
- **Battery Sizing:** Replays the measured intervals against 5, 10 and 15 kWh batteries — surplus that was genuinely exported charges the battery, energy that was genuinely imported discharges it — and reports grid import covered, equivalent cycles, and net value after the feed-in revenue given up by storing rather than exporting. Deliberately a floor: round-trip losses and 90% usable capacity only, no inverter power limit, no degradation, no tariff arbitrage. Covered by unit tests in `frontend-src/tests/batterySim.test.ts`.
- **Stat Sparklines:** The summary stats carry a daily trend line when the period spans more than two days.

### Changes
- **Comparison Data Fetched On Demand:** The period-comparison card issues four extra API calls. They previously fired on every range change on the Charts tab whether or not anything used them; they now fire only when the Costs section is open.
- **Rebuilt Energy-Flow Diagram:** The scene was redrawn from scratch as its own component (`EnergyFlowScene.ts`). Every satellite — grid, solar, community, gas — is now one node whose badge and text are placed by a single helper, so an icon can no longer land on its own label. Nodes sit in reserved bands that do not intersect the house, links start and end on node boundaries instead of inside the house, and the house keeps its figures inside its body so the column beneath it stays clear. The scene carries its own aspect ratio rather than being forced into a fixed pixel height, and gets taller when a gas meter exists instead of packing gas into occupied space.
- **New Flow Animation:** Moving SMIL particles with blur filters were replaced by a dim route plus travelling dashes, so apparent speed no longer depends on path length, the effect stops properly under reduced-motion, and the whole diagram is drawn from theme tokens — the old white rails and screen-blended halos only ever looked right in dark mode. Each link's dashes are drawn with a gradient running source → destination, so a flow fades in at its origin and arrives at full strength, and picks up a colour-matched bloom in dark mode only (on a light panel a glow reads as smudge). Links with no energy show a faint track instead of an invisible one. Each link carries an SVG `<title>`, so hovering any path names the flow and its value.
- **Distinct Community Colour:** Grid export, community-sent and community-received all drew in the same blue, because `--clr-export` and `--clr-primary` are the same value in both themes. A `--clr-community` token (violet) now gives the energy community its own hue in the diagram, the legend and the mobile bars, leaving blue to mean grid export. The palette now reads: red in from the grid, blue out to the grid, green solar, violet community, amber gas.
- **Richer Scene Detail:** Node badges are built from concentric discs of their own hue so each icon sits in a pool of colour; the house gained gradient roof and body fills, a ridge line, and a real four-cell PV array on the roof instead of a plain bar; the coverage ring got a gradient arc over a soft glow. The panel carries a faint dot grid for texture. The scene's entrance animation is now a fade rather than a slide-and-scale, because it replays on every range change and the movement read as a jump.
- **Simpler Mobile Diagram:** The mobile scene drops per-node value text — those figures are repeated in the list directly below it — leaving icons, links and the solar-coverage ring. It went from a fixed 500px to roughly 215px on a 375px-wide phone.
- **Decluttered Dashboard:** The Energy Flow card repeated numbers that were already on the stat cards directly above it — the two large "Period Consumption" / "Solar Production" panels and the summary chip row have been removed. Key Metrics no longer repeats "Self-Consumed" either; it shows "Bought from Grid" instead, a figure that previously appeared only in the flow legend.
- **One Period Picker Everywhere:** Dashboard, Charts and Invoice each carried their own copy of the range selector, the date bar and the picker. They now share a single `RangeControls` component: preset buttons plus the resolved dates on one line. Non-custom periods no longer render read-only date inputs that look editable.
- **Clearer Chart Controls:** The chart header mixed unit (kW/kWh) and view (Total Usage/Net Grid/PV Systems) in one five-button strip and printed the visible period twice. The controls are now labelled groups — Period, Detail, Unit, View — and the period is shown once.
- **Explained Stat Cards:** Each dashboard stat card carries a one-line plain-language description, so "Consumption" versus "Self-Consumed" no longer needs guessing.
- **Collapsible Settings:** Billing configuration sections are collapsible, with Energy Supplier and Network Operator open by default and Expand/Collapse all buttons. Save and Reset sit in a sticky bar that stays reachable, and report success or failure inline instead of via a browser `alert()`. Open sections survive edits that re-render the form.
- **Sensor Filter:** The Sensors tab has a filter box that narrows the tables as you type.
- **Reduced Motion:** The animated flow particles and transitions are disabled when the operating system requests reduced motion.

### Bug Fixes
- **Gas Node Overlaid the House:** With a gas meter configured, the gas label was drawn at the exact coordinates of the house's "Home usage" caption, and the gas icon overlapped its own label and spilled outside the scene frame. On the mobile scene the gas icon and its label overlapped as well. Gas now occupies a reserved band of its own. A dev harness at `frontend-src/dev/scene-check.html` renders every variant — desktop and mobile, with and without gas, at small and large values — and reports overlapping or out-of-frame elements, so this class of bug is now checkable without a gas meter in the dev credentials.
- **Solar Icon Overlapped Its Label:** Even without gas, the sun icon was drawn 28px inside the bottom of the "Solar" label card, because icon and label positions were tuned independently.
- **Unstyled Stat Cards:** "Exported" and "Self-Consumed" were emitted with `class="stat-card.export"` / `class="stat-card.self-consumed"` — a literal dot inside the class name — so both cards rendered without the card background, accent bar and icon colour.
- **Malformed Dashboard Markup:** The dashboard template closed one `</div>` too many and a `</section>` that was never opened.
- **Dead GitHub Link:** The navbar linked to the old `Leneda-HACS-integration` repository name.
- **Hardcoded Version:** The dashboard version was a hardcoded string in a floating overlay. It is now injected from `package.json` at build time and shown in the navbar.


## [v2.17.1] - 2026-08-11

### New Features
- **Prorata Modus for Solar Self-Use:** The self-use priority field is now optional. When a PV system is left without a priority, its self-consumption and export are no longer forced into an invented order — instead each unprioritised system is allocated a share of the house load proportional to what it produced in that same 15-minute interval. Configs with no priority at all therefore run fully pro-rata, which is the fairest default when several systems feed the same house.
- **Mixed Allocation:** Priorities and pro-rata can be combined. Systems with an explicit priority are served first (1 = consumed first at home); systems that share a priority — or have none — split their tier's self-consumption pro-rata. A tier with one system behaves exactly like the previous strict-priority allocation, so existing configurations are unchanged.
- **Allocation Method Shown in the UI:** The invoice and the per-system value breakdown state which method produced the split, and each system is labelled "Self-use priority N" or "Pro-rata self-use".

### Bug Fixes
- **Invoice Total Off by One Cent:** The estimate summed every invoice line at full precision and applied VAT to that raw subtotal, while suppliers price each line to the cent and charge VAT on the sum of the rounded lines. On a real SUDenergie June 2026 bill this produced 79,19 EUR against the printed 79,20 EUR. Every line, the subtotal, the adjustment line, VAT and the total are now rounded exactly as a biller does, in both the dashboard and the Home Assistant sensors, so the displayed lines also add up to the displayed subtotal. Gas invoices and the reference-power comparison use the same rounding.

### Changes
- Very old configurations migrated from the single legacy feed-in mode no longer receive an arbitrary 1..N priority; they now use Prorata Modus. Configurations that already carry explicit priorities keep them and are calculated exactly as before.
- Python and TypeScript allocators are covered by mirrored test suites (`tests/test_solar_allocation.py`, `frontend-src/tests/solarAllocation.test.ts`) so the invoice sensors and the dashboard cannot drift apart. The same applies to the invoice rounding (`tests/test_invoice_rounding.py`, `frontend-src/tests/invoiceRounding.test.ts`), which reproduces a real supplier invoice to the cent.


## [v2.16.3] - 2026-08-06

### Bug Fixes
- **Existing Installation Startup Failure:** Reverted the Leneda Home Assistant Store major-version bump from 1 to 2. Home Assistant requires a Store migration callback for that major change; without one, existing `.storage/leneda.storage` files caused setup to abort before the Leneda sidebar panel could register. Billing adjustments still migrate safely through `BillingConfig.from_dict()`.


## [v2.16.2] - 2026-08-06

### Bug Fixes
- **Missing Sidebar Panel During Setup Failure:** The Leneda sidebar panel, dashboard HTTP views, and diagnostics endpoints were registered only after the first Leneda API refresh succeeded. A temporary API failure therefore made the entire Leneda menu disappear. They now register before the first refresh so the dashboard remains available for Settings and diagnostics.


## [v2.16.1] - 2026-08-06

### Bug Fixes
- **Startup Crash on Systems Without tzdata:** `ZoneInfo("Europe/Luxembourg")` was evaluated at import time in the billing-adjustment engine, which prevented the whole integration (and its sidebar panel) from loading on installations lacking IANA timezone data (e.g. some Windows core installs). The timezone now resolves defensively with an equivalent built-in Luxembourg CET/CEST fallback (identical results, covered by tests).


## [v2.16.0] - 2026-08-06

### New Features
- **Government Aid & Billing Adjustments:** Generic dated billing-adjustment system (Settings → Government Aid & Billing Adjustments) with official Luxembourg Resilienzpak 2026 presets: €0.04/kWh incl. VAT on grid-imported electricity and €0.15/m³ incl. VAT on gas, valid 2026-08-01 through 2026-12-31 (inclusive, Europe/Luxembourg). Adjustments are computed from 15-minute intervals as separate invoice lines — tariffs are never modified — converted to net amounts before VAT so the final reduction matches the official gross rate exactly. Supports custom adjustments, enable/disable, "tariff already includes this adjustment" protection against double-counting, and preset restore. Overlapping adjustments stack.
- **Solar Savings Correction:** During a subsidy period, self-consumed solar avoids subsidised grid imports, so its tracked value is reduced by the applicable subsidy in a timestamp-aware way.
- **New Financial Sensors:** Electricity and gas subsidy sensors (yesterday / current month / last month) with per-adjustment detail, eligible quantities, and estimated flags in the attributes.
- **Data Quality Flags:** Adjustment results are marked estimated when interval data is missing, a period must be split by calendar days, or gas volume is derived from gas energy.

### Improvements
- **Storage Migration:** Billing storage bumped to version 2. Existing configurations receive the Luxembourg presets disabled (visible and reviewable in Settings) so subsidies are never silently double-counted; new configurations get them enabled.
- **Calculation Parity:** The adjustment engine exists as twin Python/TypeScript implementations validated against shared JSON fixtures (pytest + Vitest).
- **License:** Added GPL-3.0 LICENSE file (fixes HACS validation).
- **Version Sync:** Bumped the integration, frontend package, and dashboard version badge to `v2.16.0`.


## [v2.15.0] - 2026-06-23

### Bug Fixes
- **Multi-System Export Route Fix:** Corrected `_get_meter_routes` in `http_api.py` so all configured production and export meters are included in custom/year range queries instead of only the first one. Previously, when no dedicated export meter was explicitly registered in the route map, the fallback only appended `preferred.export_meter` (the first meter) rather than iterating `preferred.export_meters`, causing Solar 2's grid export to be silently omitted. This resulted in an inflated self-consumption figure, an underreported feed-in revenue, and an incorrect Net Electricity Position for multi-solar setups over long periods.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, and dashboard version badge to `v2.15.0`.


## [v2.14.0] - 2026-06-19

### Features
- **Export Consumption Meter Role:** Added `export_consumption` ("Grid export, consumption-metered") meter type for grid-export meters that report export data on the active-consumption register (`1-1:1.29.0`) instead of the standard export register (`1-65:2.29.9`). This enables correct self-consumption calculation when the export meter only exposes consumption-side OBIS codes.

### Bug Fixes
- **Sharing-Layer OBIS Safety:** Removed overly broad sharing-layer OBIS translations (`1-65:2.29.1`–`1-65:2.29.4`) from `export_consumption` to prevent potential 4× overcounting if energy community sharing is ever combined with a consumption-metered export meter.

### Improvements
- **Standalone Server Parity:** Added `productionMeterIds()`, `exportMeterIds()`, and `getObisForMeterId()` helpers to `server.js` so the standalone proxy fully supports `solar_consumption` and `export_consumption` OBIS translation on all API calls.
- **Version Sync:** Bumped the integration, frontend package, and dashboard version badge to `v2.14.0`.


## [v2.13.0] - 2026-06-19

### Features
- **Solar Consumption Meter Role:** Added support for solar production meters wired in a consumption perspective (using active consumption OBIS codes `1-1:1.29.0` / `1-1:3.29.0` instead of production codes `1-1:2.29.0` / `1-1:4.29.0`). Added a new `solar_consumption` meter type in the configuration flow and settings, with dynamic OBIS code translation in the coordinator and API.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.13.0`.


## [v2.12.0] - 2026-06-16

### Bug Fixes
- **Dashboard Solar Self-Use:** Prioritized the calculated `solar_to_home` / `self_consumed` value in the dashboard so setups with separate production and grid-export meters show used solar/battery energy as `production - export`.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.12.0`.


## [v2.11.0] - 2026-06-13

### Bug Fixes
- **Export Meter Role:** Added a dedicated `Grid Export / Sold to Grid` meter role so export-only Leneda metering points no longer inflate raw solar production totals.
- **Grid Import Fallback:** Prevented missing or zero remaining-consumption data from collapsing invoice `Bought from grid` to `0 kWh` when no solar/community coverage exists.

### Improvements
- **SUDenergie Discounts:** Added a domiciliation discount setting alongside the electronic invoice discount so SUDenergie monthly bills with `-1 EUR/mo` and `-0.50 EUR/mo` credits can be matched.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.11.0`.

## [v2.10.3] - 2026-05-01

### Bug Fixes
- **Per-System Self-Use Hotfix:** Corrected the invoice's per-system `Kept on-site` allocation so it follows the real 15-minute PV/house overlap and export balance instead of collapsing to underreported aggregate self-use totals.
- **Standalone Aggregation Alignment:** Corrected the standalone proxy's year/custom solar aggregation so direct self-use, shared energy, and market export no longer get conflated in long-range invoice calculations.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.10.3`.


## [v2.10.2] - 2026-05-01

### Bug Fixes
- **Per-System Solar Coverage Shading:** Split the dashboard `Net Grid` solar-covered bars into per-PV-system green shades so multi-system solar contribution is visible directly in the main graph instead of only in the separate `PV Systems` view.
- **Solar Self-Use / Export Reconciliation:** Corrected priority-based solar allocation so invoice and analysis per-system self-use and export stay physically consistent with actual production for the selected period instead of independently over-scaling self-use and export totals.
- **Standalone Year / Custom Solar Totals:** Corrected the standalone proxy's live aggregated range path so `this_year`, `last_year`, and long custom ranges now keep direct self-use, community sharing, and market export separate instead of treating received shared energy as all self-consumed solar.
- **Per-System Self-Use Recovery:** Stopped underreported aggregate self-use values from collapsing the invoice's per-system `Kept on-site` allocation when the 15-minute production/consumption overlap and export balance show higher real self-use.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.10.2`.


## [v2.10.1] - 2026-04-28

### Bug Fixes
- **Solar Coverage Alignment:** Aligned the dashboard self-sufficiency display with the same official solar-coverage calculation used in Charts, so dashboard coverage now matches Leneda's billed grid-import path when available.
- **Per-System Production Totals:** Added produced `kWh` to the Charts per-system solar value breakdown so each PV system now shows total generation alongside self-used and exported energy.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.10.1`.


## [v2.10.0] - 2026-04-27

### New Features
- **Named Solar Systems:** Added optional per-production-meter solar system names in Settings, with fallback labels like `Solar 1 (12345678)` when no custom name is configured.
- **Per-System Solar Value in Charts:** Added a per-system solar value breakdown to the Charts analysis view so each solar system now shows self-used energy, exported energy, self-use value, export value, and total tracked value.

### Improvements
- **Solar Label Consistency:** Reused the same resolved solar-system labels in the Invoice per-system solar sections so Charts and Invoice refer to each system consistently.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.10.0`.


## [v2.9.3] - 2026-04-25

### Bug Fixes
- **Grid Import Alignment:** Switched yesterday, weekly, and current-month grid import back to Leneda's official remaining-consumption channel so open-period import values now match the platform instead of being reconstructed from solar coverage.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.9.3`.


## [v2.9.2] - 2026-04-25

### Bug Fixes
- **Solar Summary Alignment:** Corrected the Charts summary cards and invoice solar wording so hotfix follow-up work now keeps chart-level solar coverage, self-use, export value, and invoice solar sections aligned to the same official range totals without changing the supplier bill estimate path.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.9.2`.


## [v2.9.1] - 2026-04-25

### Bug Fixes
- **Chart/Invoice Solar Alignment:** Corrected the solar-flow breakdown so the dashboard chart, Charts analysis workspace, and invoice page now use the same Leneda grid-import, export, direct self-use, and shared-energy split instead of mixing authoritative billing data with fallback reconstruction.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.9.1`.


## [v2.9.0] - 2026-04-25

### New Features
- **Per-System Solar Financial Breakdown:** Added a per-PV-system self-use vs export table in the invoice so each solar system shows produced, self-consumed, exported, tariff, export revenue, and self-use financial advantage.
- **Dashboard PV Systems Graph:** Added a `PV Systems` dashboard graph mode that stacks each configured solar production meter, making multi-system production performance easier to compare visually.
- **Dashboard Time Detail Controls:** Added explicit `Year`, `Month`, `Week`, `Day`, `Hour`, and `15 min` graph presets with unavailable resolutions disabled automatically, plus previous/next period arrows and a clear current-period label above the dashboard chart.
- **Expanded Charts Analysis Workspace:** Added an intraday weekday-versus-weekend profile, hourly tariff-opportunity analysis, peak-interval anatomy, daily net energy value tracking, extra exceedance heatmap modes, and switchable `Previous Period` / `Last Year` comparison views on the Charts page.

### Improvements
- **Invoice Wording Clarity:** Split supplier bill estimate, feed-in revenue, total solar value, and net electricity position labels so solar savings are easier to interpret and not mistaken for supplier bill line items.
- **Preset Per-Meter Refresh:** Preset range changes now refresh per-meter PV production data too, keeping the dashboard graph and invoice allocation aligned with custom ranges.
- **Billing Meter Precision:** Kept invoice energy quantities at three decimal places and aligned standalone grid-import calculations with the primary billing consumption meter.
- **Dashboard kW/kWh Consistency:** Kept `kW` on interval bars, restored the full 15-minute detail view for short periods, and aligned `kW` and `kWh` around the same time-detail controls instead of separate interaction patterns.
- **Chart Interaction Cleanup:** Removed mouse-wheel and pinch zoom from the dashboard graph so page scrolling is no longer trapped, and moved time navigation to the new explicit chart controls.
- **Flow and Chart Readability:** Added clearer dashboard chart hints, period status, and infographic summary copy so the active view, flow meaning, and energy direction are easier to understand at a glance.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.9.0`.


## [v2.8.0] - 2026-04-24

### New Features
- **Feed-in Row kWh Display:** Added exported `kWh` alongside each feed-in revenue row so multi-system invoices show the energy allocation and tariff together at a glance.
- **Home Assistant Reconfiguration:** Added an editable integration configuration flow so meters, credentials, and reference power can be changed from `Configure` without deleting and re-adding the integration.
- **Home Assistant Sensor Packs:** Reduced the default Home Assistant sensor set for new installs and added optional sensor-pack toggles in `Configure` so weekly, peak, community, advanced gas, and financial sensors can be enabled only when wanted.
- **Financial Home Assistant Sensors:** Added an optional financial sensor pack with invoice estimate, feed-in revenue, self-consumption savings, and total solar value for yesterday, current month, and last month.

### Improvements
- **Options Flow Stability:** Improved Home Assistant `Configure` flow compatibility and hardened entity-registry handling so the options flow opens more reliably.
- **Priority-Based Solar Allocation:** Reworked self-use vs export and per-system feed-in allocation so multiple PV systems now use per-meter 15-minute production plus configurable self-use priority instead of averaging export tariffs.
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.8.0`.


## [v2.7.0] - 2026-04-21

### New Features
- **Self-Use vs Export Value:** Added a dedicated solar metric that shows how much more or less self-consumed PV was worth compared with selling the same energy back to the grid.

### Improvements
- **Version Sync:** Bumped the integration, frontend package, frontend lockfile, and dashboard version badge to `v2.7.0`.


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
