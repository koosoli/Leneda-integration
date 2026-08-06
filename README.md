# Leneda for Home Assistant and Standalone Use

<p align="center">
  <img src="logo/logo@2x.png" alt="Leneda Logo" width="300">
</p>

<p align="center">

![HACS Default](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge&logo=homeassistant)
![Version](https://img.shields.io/github/v/release/koosoli/Leneda-integration?style=for-the-badge&color=blue)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Try_it_now-00C853?style=for-the-badge)](https://koosoli.github.io/Leneda-integration/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20my%20work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/koosoli)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-koosoli-EA4AAA?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/koosoli)

</p>

Leneda is a Home Assistant integration and dashboard for Leneda smart meters in Luxembourg. It combines electricity, solar production, gas, billing logic, reference-power analysis, and solar-value tracking in one interface, and it can also run outside Home Assistant as a standalone web app.

## What It Does

- Connects to the Leneda API and pulls electricity and gas data into Home Assistant.
- Groups configured meters into one coherent Leneda device experience instead of forcing you to assemble everything manually.
- Provides a custom dashboard with Dashboard, Sensors, Invoice, and Settings views.
- Supports Home Assistant mode, standalone local mode, and a hosted demo.

## Features

### Energy Monitoring

- Consumption, production, export, self-consumption, grid import, and gas tracking.
- Support for consumption meters, production meters, gas meters, and mixed setups.
- Aggregated totals across multiple production meters.
- Community-energy visibility for shared energy sent and received.
- Preset periods such as yesterday, this week, last week, this month, last month, this year, and last year.
- Custom date ranges for ad hoc analysis.

### Dashboard and Analysis

- Interactive dashboard with energy overview cards, energy-flow visualization, and range switching.
- Zoomable and pannable charts for detailed inspection of the selected period.
- Optional per-meter solar production charting when multiple production meters exist.
- Automatic recalculation of key metrics and invoice context when the visible chart range changes.
- Light and dark mode support.
- Responsive layouts for desktop and mobile.

### Sensors and Home Assistant Integration

- Home Assistant sensor entities for Leneda data.
- Financial sensors for invoice estimates, feed-in revenue, solar value, and electricity/gas subsidies (yesterday, current month, last month), with per-adjustment detail in the sensor attributes.
- Consolidated Leneda device presentation in Home Assistant.
- Home Assistant panel for the custom dashboard.
- Home Assistant entity selection for sensor-based pricing inputs where applicable.

### Billing and Invoice Logic

- Luxembourg-oriented invoice estimation covering supplier, network, taxes, VAT, discounts, and gas costs.
- Fixed-fee proration across the viewed period.
- Time-of-use supplier tariff windows.
- Reference power configuration and reference-power time windows.
- Exceedance charge calculation from 15-minute load intervals.
- Reference power level comparison to estimate which configured Creos level is financially optimal for the selected period.
- Print-friendly invoice layout for paper or PDF export.
- Dated billing adjustments for government subsidies, rebates, supplier credits, and temporary taxes (see below).

### Government Aid and Billing Adjustments

The integration supports **dated, per-unit billing adjustments** that are applied as separate invoice lines — your configured tariff prices are never modified. Adjustments are valid between an inclusive start and end date (Europe/Luxembourg), and overlapping adjustments stack.

Two official **Luxembourg Resilienzpak 2026** presets are built in:

| Preset | Amount (incl. VAT) | Valid (inclusive) | Applies to |
| --- | --- | --- | --- |
| Luxembourg electricity subsidy 2026 | €0.04 per kWh | 1 Aug 2026 – 31 Dec 2026 | Grid-imported electricity only |
| Luxembourg gas subsidy 2026 | €0.15 per m³ | 1 Aug 2026 – 31 Dec 2026 | Residential gas volume |

Important details:

- The official rates **include VAT**. The engine converts them to net amounts (`gross / (1 + VAT rate)`) before the invoice VAT is recalculated, so the final invoice reduction equals exactly `eligible quantity × official rate` — e.g. 100 eligible kWh = €4.00 and 100 m³ = €15.00.
- The electricity subsidy only applies to **energy imported from the grid**, never to total household consumption, solar production, or exported energy. It applies equally across all time-of-use windows. Legal eligibility (e.g. the 25,000 kWh/year residential cap) cannot be determined with certainty from interval data — treat the displayed amounts as an estimate of the aid for your measured consumption.
- **Solar self-consumption correction:** during the subsidy period, each self-consumed solar kWh avoids a grid import that would itself have been subsidised. The solar savings value is therefore reduced by the applicable subsidy for eligible timestamps only; savings outside the period are unchanged.
- **Avoid double-counting:** if the electricity price you entered in Settings already reflects the subsidy, tick *"My entered tariff already includes this adjustment"* — the adjustment is then shown for information only and not deducted again.
- Invoice lines show the eligible quantity, rate, total, and whether a value is **exact or estimated**. Values are marked estimated when a period must be split without 15-minute interval data (day-based proration), or when gas volume is derived from gas energy (≈11 kWh/m³) because no m³ reading exists.
- You can disable or edit the presets, add custom adjustments (any dates, amount, commodity), delete custom entries, and restore the official presets from **Settings → Government Aid & Billing Adjustments**.
- Existing installations receive the presets **disabled** (visible in Settings for review) to avoid silently changing invoices; new configurations have them enabled.

### Solar and Self-Consumption Value Tracking

- Solar production overview directly in the invoice.
- Self-consumption savings based on avoided grid purchases.
- Feed-in revenue based on exported energy.
- Per-production-meter feed-in pricing with fixed tariff or Home Assistant sensor mode.
- Reference-power savings when solar reduces net load enough to avoid exceedance charges.
- Combined total solar value so the worth of the panels is visible at a glance.

### Settings and Configuration

- Billing configuration directly in the dashboard.
- Reference power, exceedance rate, and reference-power windows.
- Supplier and network tariffs.
- Feed-in pricing per production meter.
- Per-meter monthly fees.
- Gas billing configuration.
- Currency, taxes, levies, and contract discount fields.
- Government aid and billing adjustments with official Luxembourg presets and custom dated adjustments.
- Standalone credential entry and connection testing.

## Product Views

- `Dashboard`: Main overview, flow view, charts, and top-level KPIs.
- `Sensors`: Table view of all fetched sensor values.
- `Invoice`: Electricity and gas invoice estimation, reference-power analysis, solar savings, and print view.
- `Settings`: Billing setup, feed-in pricing, reference power, meter fees, and standalone credentials.

## Screenshots

| Dashboard | Energy Profile |
|:-:|:-:|
| ![Dashboard](screenshots/dashboard.png) | ![Energy Profile Graph](screenshots/energyprofilegraph.png) |

| Invoice Estimate | Cost Settings |
|:-:|:-:|
| ![Invoice Estimate](screenshots/invoiceestimateandexeedancewarning.png) | ![Cost Settings](screenshots/costsettings.png) |

## Installation

### Option 1: HACS

1. Open `HACS` in Home Assistant.
2. Go to `Integrations`.
3. Click the menu in the top-right corner and choose `Custom repositories`.
4. Add `https://github.com/koosoli/Leneda-integration`.
5. Select category `Integration`.
6. Install `Leneda`.
7. Restart Home Assistant.

### Option 2: Manual Home Assistant Installation

1. Download the latest release from the [Releases page](https://github.com/koosoli/Leneda-integration/releases).
2. Copy `custom_components/leneda` into your Home Assistant `config/custom_components/` directory.
3. Restart Home Assistant.

### Option 3: Hosted Demo

Explore the dashboard with demo data at:

[https://koosoli.github.io/Leneda-integration/](https://koosoli.github.io/Leneda-integration/)

The hosted page stays on demo data until a `Proxy URL` is configured in `Settings`.
Once a Leneda-compatible proxy is available, the hosted page can use live data while keeping the entered credentials in the browser and forwarding them to the proxy for each request.

### Option 4: Standalone Local Run

Run the dashboard outside Home Assistant:

```bash
cd frontend-src
npm install
npm run build
cd ../standalone
node server.js
```

The standalone guide is available in [standalone/README.md](standalone/README.md).

### Option 5: Local Frontend Development

```bash
cd frontend-src
npm install
npm run dev -- --host localhost --port 5175 --strictPort --open
```

## Home Assistant Setup

1. In Home Assistant, go to `Settings -> Devices & Services`.
2. Click `Add Integration`.
3. Search for `Leneda`.
4. Enter your Leneda credentials and metering-point information.
5. Optionally configure a reference-power source during integration setup.
6. Open the Leneda dashboard panel and complete billing settings in the `Settings` tab.

### Metering Point Roles

Each configured Leneda metering point can have one or more roles. Choose the role based on what that metering point reports:

| Role | Use it for | Notes |
|---|---|---|
| `Consumption` | House/grid import meter. | This is the meter used for home usage and supplier-billed import. |
| `Solar production` | PV generation, including energy that may be self-consumed. | Use this only for meters that report energy produced by the PV system. |
| `Grid export` | Export-only meter for energy sold or sent to the grid. | Use this when the meter reports energy sent out to the grid, not additional PV generation. |
| `Gas` | Gas consumption meter. | Only needed when gas data is available. |

Common setups:

- One bidirectional electricity meter with production/export data: mark it as `Consumption` and `Solar production`.
- Separate house and PV meters: mark the house meter as `Consumption`, and each raw PV meter as `Solar production`.
- Separate PV production and sold/export meter: mark the raw PV meter as `Solar production`, and the export-only meter as `Grid export`.
- Do not mark an export-only/sold-to-grid meter as `Solar production`, because that makes exported energy look like extra solar generation.

## Standalone Setup

In standalone mode, the `Settings` tab is used for:

- Leneda API credentials
- Energy ID
- Metering point definitions
- Billing configuration

The app includes a connection test flow before saving credentials.

If you want the GitHub Pages build to use live data, run or deploy `standalone/server.js` and enter that server as the `Proxy URL` in the hosted dashboard settings.

## Home Assistant vs Standalone

| Capability | Home Assistant | Standalone |
|---|---|---|
| Leneda dashboard UI | Yes | Yes |
| Home Assistant sensors/entities | Yes | No |
| Sidebar panel | Yes | No |
| Home Assistant entity picker for sensor-based pricing | Yes | No |
| Direct Leneda API credential entry in dashboard | No | Yes |
| Billing configuration | Yes | Yes |
| Invoice and solar value analysis | Yes | Yes |

## Changelog

Release history is tracked in [CHANGELOG.md](CHANGELOG.md).

## Support

If this project saves you time or helps you understand your energy usage better, support is appreciated:

- Buy me a coffee: [buymeacoffee.com/koosoli](https://buymeacoffee.com/koosoli)
- GitHub Sponsors: [github.com/sponsors/koosoli](https://github.com/sponsors/koosoli)

## Credits

Created and maintained by [@koosoli](https://github.com/koosoli).
