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
import { fmtNum, fmtDate } from "../utils/format";

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

export function renderDashboard(state: AppState): string {
  const d = state.rangeData;
  const toDateInputValue = (value?: string): string => {
    if (!value) return "";
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : "";
  };

  const consumption = d?.consumption ?? 0;
  const production = d?.production ?? 0;
  const exported = d?.exported ?? 0;
  const reportedSelfConsumed = d?.self_consumed ?? 0;
  const gasEnergy = d?.gas_energy ?? 0;
  const gasVolume = d?.gas_volume ?? 0;
  const peakPower = d?.peak_power_kw ?? 0;
  const periodStartValue = toDateInputValue(d?.start);
  const periodEndValue = toDateInputValue(d?.end);

  // Keep preset-range flow math aligned with the older dashboard behavior the user expects.
  const sharedWithMe = d?.shared_with_me ?? 0;
  const shared = d?.shared ?? 0;
  const soldToMarket = Math.max(0, exported);
  const solarToHome = Math.max(
    0,
    d?.solar_to_home ??
      d?.direct_solar_to_home ??
      (reportedSelfConsumed > 0 ? reportedSelfConsumed : production - soldToMarket),
  );
  const directSolarToHome = Math.max(0, d?.direct_solar_to_home ?? solarToHome);
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

  const flowWidth = (value: number, min = 2.8, max = 8.2): number =>
    value > 0 ? min + (value / maxFlowValue) * (max - min) : 1.8;

  const flowRailWidth = (value: number): number => flowWidth(value) + 1.4;

  const flowHaloWidth = (value: number): number => flowWidth(value) + 5.4;

  const flowOpacity = (value: number, min = 0.28, max = 0.88): number =>
    value > 0 ? min + (value / maxFlowValue) * (max - min) : 0.1;

  const flowHaloOpacity = (value: number, min = 0.09, max = 0.22): number =>
    value > 0 ? min + (value / maxFlowValue) * (max - min) : 0.05;

  const flowDuration = (value: number, fast = 1.6, slow = 3.9): string =>
    `${(value > 0
      ? Math.max(fast, slow - (value / maxFlowValue) * (slow - fast))
      : slow).toFixed(2)}s`;

  const flowRadius = (value: number, min = 3.4, max = 5.8): number =>
    value > 0 ? min + (value / maxFlowValue) * (max - min) : 3;

  const mobileFlowPercent = (value: number): number =>
    value > 0 ? Math.max(18, Math.round((value / maxFlowValue) * 100)) : 0;

  const renderSceneDefs = (prefix: string): string => `
    <defs>
      <filter id="${prefix}-glow-red" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${prefix}-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${prefix}-glow-blue" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${prefix}-glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${prefix}-glow-gas" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <linearGradient id="${prefix}-flow-solar" x1="50%" y1="6%" x2="50%" y2="88%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.28" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${prefix}-flow-grid-in" x1="8%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="var(--clr-consumption)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="var(--clr-consumption)" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="${prefix}-flow-grid-out" x1="100%" y1="44%" x2="4%" y2="76%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.4" />
      </linearGradient>
      <linearGradient id="${prefix}-flow-shared-out" x1="0%" y1="48%" x2="100%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-export)" stop-opacity="0.95" />
        <stop offset="100%" stop-color="var(--clr-export)" stop-opacity="0.45" />
      </linearGradient>
      <linearGradient id="${prefix}-flow-shared-in" x1="100%" y1="48%" x2="0%" y2="48%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="${prefix}-flow-gas" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stop-color="var(--clr-gas)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--clr-gas)" stop-opacity="0.95" />
      </linearGradient>

      <linearGradient id="${prefix}-scene-shell" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <radialGradient id="${prefix}-house-base-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${prefix}-house-core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 166, 255, 0.18)" />
        <stop offset="100%" stop-color="rgba(88, 166, 255, 0)" />
      </radialGradient>
    </defs>
  `;

  const renderNodeLabel = (options: {
    x: number;
    y: number;
    width: number;
    accent: string;
    kicker: string;
    value: string;
    detail?: string;
  }): string => {
    const { x, y, width, accent, kicker, value, detail } = options;
    const height = detail ? 70 : 54;
    const valueY = detail ? 39 : 37;

    return `
      <g class="scene-node-label" transform="translate(${x}, ${y})">
        <rect width="${width}" height="${height}" rx="18" fill="var(--clr-overlay)" stroke="${accent}" />
        <text x="16" y="22" class="scene-node-kicker">${kicker}</text>
        <text x="16" y="${valueY}" class="scene-node-value">${value}</text>
        ${detail ? `<text x="16" y="56" class="scene-node-detail">${detail}</text>` : ""}
      </g>
    `;
  };

  const renderGridIcon = (options: { x: number; y: number; scale?: number; glowId: string }): string => {
    const { x, y, scale = 1, glowId } = options;
    return `
      <g class="scene-tier-icon scene-tier-grid" transform="translate(${x}, ${y}) scale(${scale})">
        <circle cx="0" cy="44" r="48" fill="var(--clr-consumption)" fill-opacity="0.06" />
        <path d="M0 0 V88 M-24 20 H24 M-16 42 H16 M-8 66 H8" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" filter="url(#${glowId})" />
        <path d="M-12 88 L0 60 L12 88" stroke="var(--clr-consumption)" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `;
  };

  const renderSolarIcon = (options: { x: number; y: number; scale?: number; glowId: string }): string => {
    const { x, y, scale = 1, glowId } = options;
    return `
      <g class="scene-tier-icon scene-tier-solar" transform="translate(${x}, ${y}) scale(${scale})">
        <circle cx="0" cy="0" r="26" fill="var(--clr-production)" fill-opacity="0.09" />
        <circle cx="0" cy="0" r="12" fill="var(--clr-production)" fill-opacity="0.9" filter="url(#${glowId})" />
        <path d="M0 -26 V-40 M0 26 V40 M26 0 H40 M-26 0 H-40 M18 -18 L28 -28 M18 18 L28 28 M-18 18 L-28 28 M-18 -18 L-28 -28" stroke="var(--clr-production)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `;
  };

  const renderCommunityIcon = (options: { x: number; y: number; scale?: number; glowId: string }): string => {
    const { x, y, scale = 1, glowId } = options;
    return `
      <g class="scene-tier-icon scene-tier-community" transform="translate(${x}, ${y}) scale(${scale})">
        <circle cx="0" cy="40" r="50" fill="var(--clr-primary)" fill-opacity="0.06" />
        <rect x="-26" y="30" width="22" height="42" rx="6" fill="rgba(88, 166, 255, 0.08)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="6" y="16" width="24" height="56" rx="6" fill="rgba(88, 166, 255, 0.12)" stroke="var(--clr-primary)" stroke-width="2" />
        <rect x="-2" y="4" width="6" height="10" rx="2" fill="var(--clr-primary)" fill-opacity="0.7" />
        <path d="M-14 12 H14 M-10 4 V20 M10 4 V20" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" filter="url(#${glowId})" />
      </g>
    `;
  };

  const renderGasIcon = (options: { x: number; y: number; scale?: number; glowId: string }): string => {
    const { x, y, scale = 1, glowId } = options;
    return `
      <g class="scene-tier-icon scene-tier-gas" transform="translate(${x}, ${y}) scale(${scale})">
        <circle cx="0" cy="38" r="46" fill="var(--clr-gas)" fill-opacity="0.08" />
        <path d="M-26 40 H-8 V72 H26" stroke="var(--clr-gas)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#${glowId})" />
        <path d="M0 4 C18 24 20 40 20 52 C20 70 9 84 0 84 C-9 84 -20 70 -20 52 C-20 38 -10 24 0 4 Z" fill="rgba(210, 153, 34, 0.14)" stroke="var(--clr-gas)" stroke-width="2.2" />
        <path d="M0 24 C9 35 10 44 10 52 C10 61 5 68 0 72 C-5 68 -10 61 -10 52 C-10 44 -8 35 0 24 Z" fill="var(--clr-gas)" fill-opacity="0.85" />
      </g>
    `;
  };

  const renderHouseHub = (options: {
    prefix: string;
    x: number;
    y: number;
    scale?: number;
  }): string => {
    const { prefix, x, y, scale = 1 } = options;

    return `
      <g class="elite-house" transform="translate(${x}, ${y}) scale(${scale})">
        <circle cx="90" cy="122" r="112" fill="url(#${prefix}-house-core-glow)" />
        <circle cx="90" cy="122" r="96" fill="url(#${prefix}-house-base-glow)" opacity="0.28" />
        <circle cx="90" cy="122" r="88" stroke="rgba(88,166,255,0.12)" stroke-width="2" stroke-dasharray="6 10" />
        <g class="house-hub-badge" transform="translate(38, 6)">
          <rect width="104" height="28" rx="14" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" />
          <text x="52" y="18" text-anchor="middle" class="house-core-kicker">House</text>
        </g>
        <path d="M8 96 L90 28 L172 96 V228 H8 Z" fill="var(--clr-surface)" stroke="var(--clr-border)" stroke-width="3" />
        <path d="M26 92 L90 44 L154 92" stroke="var(--clr-production)" stroke-width="4" stroke-linecap="round" stroke-opacity="0.7" />
        <path d="M90 28 V228" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.22" />
        <rect x="30" y="120" width="32" height="42" rx="6" fill="rgba(88,166,255,0.06)" stroke="var(--clr-border)" stroke-width="1.5" />
        <rect x="118" y="120" width="32" height="42" rx="6" fill="rgba(88,166,255,0.06)" stroke="var(--clr-border)" stroke-width="1.5" />
        <rect x="68" y="170" width="44" height="58" rx="6" fill="var(--clr-surface-alt)" stroke="var(--clr-border)" stroke-width="2" />
        <g transform="translate(122, 54) rotate(32)">
          <rect x="0" y="0" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${prefix}-glow-green)" />
          <rect x="0" y="20" width="56" height="14" rx="3" fill="rgba(63, 185, 80, 0.12)" stroke="var(--clr-production)" stroke-width="1.6" filter="url(#${prefix}-glow-green)" />
          <line x1="13" y1="0" x2="13" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="0" x2="30" y2="14" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="13" y1="20" x2="13" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
          <line x1="30" y1="20" x2="30" y2="34" stroke="var(--clr-production)" stroke-width="0.7" stroke-opacity="0.45" />
        </g>
        <g transform="translate(90, 124)">
          <circle r="32" fill="var(--clr-overlay)" stroke="var(--clr-overlay-border)" stroke-width="2" />
          <text text-anchor="middle" y="-4" class="house-core-kicker">Self-Suff.</text>
          <text text-anchor="middle" y="18" class="house-core-value">${fmtNum(selfSufficiency, 0)}%</text>
        </g>
        <text x="90" y="262" text-anchor="middle" class="house-total-label">Home usage</text>
        <text x="90" y="284" text-anchor="middle" class="house-total-value">${fmtNum(totalHomeEnergy)} kWh</text>
      </g>
    `;
  };

  const renderFlow = (options: {
    path: string;
    value: number;
    gradientId: string;
    colorVar: string;
    filterId: string;
    particleClass: string;
    direction?: "forward" | "reverse";
  }): string => {
    const {
      path,
      value,
      gradientId,
      colorVar,
      filterId,
      particleClass,
      direction = "forward",
    } = options;
    const directionKeyPoints = direction === "reverse" ? "1;0" : "0;1";

    return `
      <path
        class="flow-halo ${particleClass}"
        d="${path}"
        stroke="url(#${gradientId})"
        stroke-width="${flowHaloWidth(value).toFixed(1)}"
        stroke-opacity="${flowHaloOpacity(value).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-rail ${particleClass}"
        d="${path}"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="${flowRailWidth(value).toFixed(1)}"
        stroke-opacity="0.42"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="flow-stream ${particleClass}"
        d="${path}"
        stroke="url(#${gradientId})"
        stroke-width="${flowWidth(value).toFixed(1)}"
        stroke-opacity="${flowOpacity(value).toFixed(2)}"
        stroke-linecap="round"
        fill="none"
      />
      ${value > 0 ? `
        <circle
          class="flow-particle ${particleClass}"
          r="${flowRadius(value).toFixed(1)}"
          fill="${colorVar}"
          filter="url(#${filterId})"
        >
          <animateMotion dur="${flowDuration(value)}" repeatCount="indefinite" path="${path}" keyPoints="${directionKeyPoints}" keyTimes="0;1" calcMode="linear" />
        </circle>
        <circle
          class="flow-particle flow-particle-secondary ${particleClass}"
          r="${Math.max(2.4, flowRadius(value) - 1.2).toFixed(1)}"
          fill="${colorVar}"
          fill-opacity="0.75"
          filter="url(#${filterId})"
        >
          <animateMotion dur="${flowDuration(value)}" begin="-${(parseFloat(flowDuration(value)) / 2).toFixed(2)}s" repeatCount="indefinite" path="${path}" keyPoints="${directionKeyPoints}" keyTimes="0;1" calcMode="linear" />
        </circle>
      ` : ""}
    `;
  };

  const renderDesktopScene = (): string => `
    <div class="elite-scene elite-scene-desktop">
      <svg class="elite-main-svg" viewBox="0 0 860 460" fill="none" preserveAspectRatio="xMidYMid meet">
        ${renderSceneDefs("desktop")}
        <rect x="34" y="30" width="792" height="372" rx="34" fill="url(#desktop-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="430" cy="330" rx="278" ry="60" fill="url(#desktop-house-base-glow)" opacity="0.56" />
        <line x1="98" y1="334" x2="762" y2="334" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.45" />

        ${renderNodeLabel({
          x: 58,
          y: 108,
          width: 152,
          accent: "rgba(248, 81, 73, 0.26)",
          kicker: "Grid",
          value: `${fmtNum(boughtFromGrid + soldToMarket)} kWh`,
          detail: soldToMarket > 0 ? `In ${fmtNum(boughtFromGrid)} / out ${fmtNum(soldToMarket)} kWh` : undefined,
        })}

        ${renderNodeLabel({
          x: 356,
          y: 44,
          width: 148,
          accent: "rgba(63, 185, 80, 0.26)",
          kicker: "Solar",
          value: `${fmtNum(production)} kWh`,
          detail: `${fmtNum(solarToHome)} kWh used at home`,
        })}

        ${renderNodeLabel({
          x: 624,
          y: 108,
          width: 184,
          accent: "rgba(88, 166, 255, 0.26)",
          kicker: "Community",
          value: `${fmtNum(communityExchange)} kWh`,
          detail: `Sent ${fmtNum(shared)} / got ${fmtNum(sharedWithMe)} kWh`,
        })}

        ${hasGasMeter
      ? renderNodeLabel({
        x: 350,
        y: 338,
        width: 160,
        accent: "rgba(210, 153, 34, 0.28)",
        kicker: "Gas",
        value: `${fmtNum(gasEnergy)} kWh`,
        detail: gasVolume > 0 ? `${fmtNum(gasVolume)} m3 in period` : "Gas meter active",
      })
      : ""}

        ${renderGridIcon({ x: 132, y: 186, scale: 1.02, glowId: "desktop-glow-red" })}
        ${renderSolarIcon({ x: 430, y: 126, glowId: "desktop-glow-green" })}
        ${renderCommunityIcon({ x: 716, y: 194, glowId: "desktop-glow-cyan" })}
        ${hasGasMeter ? renderGasIcon({ x: 430, y: 352, glowId: "desktop-glow-gas" }) : ""}
        ${renderHouseHub({ prefix: "desktop", x: 340, y: 96, scale: 1.02 })}

        ${renderFlow({
          path: "M 430 152 C 430 182 430 204 430 220",
          value: directSolarToHome,
          gradientId: "desktop-flow-solar",
          colorVar: "var(--clr-production)",
          filterId: "desktop-glow-green",
          particleClass: "flow-solar",
        })}

        ${renderFlow({
          path: "M 176 230 C 246 230 318 230 364 232",
          value: boughtFromGrid,
          gradientId: "desktop-flow-grid-in",
          colorVar: "var(--clr-consumption)",
          filterId: "desktop-glow-red",
          particleClass: "flow-grid-in",
        })}

        ${renderFlow({
          path: "M 496 268 C 430 298 326 314 176 316",
          value: soldToMarket,
          gradientId: "desktop-flow-grid-out",
          colorVar: "var(--clr-export)",
          filterId: "desktop-glow-blue",
          particleClass: "flow-grid-out",
        })}

        ${renderFlow({
          path: "M 500 234 C 566 220 634 220 692 236",
          value: shared,
          gradientId: "desktop-flow-shared-out",
          colorVar: "var(--clr-export)",
          filterId: "desktop-glow-blue",
          particleClass: "flow-shared-out",
        })}

        ${renderFlow({
          path: "M 690 272 C 632 292 566 294 500 278",
          value: sharedWithMe,
          gradientId: "desktop-flow-shared-in",
          colorVar: "var(--clr-primary)",
          filterId: "desktop-glow-cyan",
          particleClass: "flow-shared-in",
          direction: "reverse",
        })}

        ${hasGasMeter
      ? renderFlow({
        path: "M 430 404 C 430 370 430 336 430 302",
        value: gasFlowVisualValue,
        gradientId: "desktop-flow-gas",
        colorVar: "var(--clr-gas)",
        filterId: "desktop-glow-gas",
        particleClass: "flow-gas",
      })
      : ""}
      </svg>
    </div>
  `;

  const renderMobileScene = (): string => `
    <div class="elite-scene elite-scene-mobile">
      <svg class="elite-main-svg" viewBox="0 0 420 560" fill="none" preserveAspectRatio="xMidYMid meet">
        ${renderSceneDefs("mobile")}
        <rect x="20" y="20" width="380" height="520" rx="32" fill="url(#mobile-scene-shell)" stroke="var(--clr-scene-shell-stroke)" />
        <ellipse cx="210" cy="316" rx="136" ry="38" fill="url(#mobile-house-base-glow)" opacity="0.58" />
        <line x1="64" y1="332" x2="356" y2="332" stroke="var(--clr-border)" stroke-width="1" stroke-opacity="0.42" />

        ${renderNodeLabel({
          x: 132,
          y: 40,
          width: 156,
          accent: "rgba(63, 185, 80, 0.26)",
          kicker: "Solar",
          value: `${fmtNum(production)} kWh`,
        })}

        ${renderNodeLabel({
          x: 20,
          y: 194,
          width: 126,
          accent: "rgba(248, 81, 73, 0.26)",
          kicker: "Grid",
          value: `${fmtNum(boughtFromGrid + soldToMarket)} kWh`,
        })}

        ${renderNodeLabel({
          x: 274,
          y: 194,
          width: 126,
          accent: "rgba(88, 166, 255, 0.26)",
          kicker: "Community",
          value: `${fmtNum(communityExchange)} kWh`,
        })}

        ${hasGasMeter
      ? renderNodeLabel({
        x: 122,
        y: 442,
        width: 176,
        accent: "rgba(210, 153, 34, 0.28)",
        kicker: "Gas",
        value: `${fmtNum(gasEnergy)} kWh`,
        detail: gasVolume > 0 ? `${fmtNum(gasVolume)} m3` : "Gas meter active",
      })
      : ""}

        ${renderSolarIcon({ x: 210, y: 126, scale: 0.92, glowId: "mobile-glow-green" })}
        ${renderGridIcon({ x: 76, y: 254, scale: 0.86, glowId: "mobile-glow-red" })}
        ${renderCommunityIcon({ x: 344, y: 260, scale: 0.86, glowId: "mobile-glow-cyan" })}
        ${hasGasMeter ? renderGasIcon({ x: 210, y: 442, scale: 0.9, glowId: "mobile-glow-gas" }) : ""}
        ${renderHouseHub({ prefix: "mobile", x: 118, y: 166, scale: 0.94 })}

        ${renderFlow({
          path: "M 210 152 C 210 188 210 216 210 238",
          value: directSolarToHome,
          gradientId: "mobile-flow-solar",
          colorVar: "var(--clr-production)",
          filterId: "mobile-glow-green",
          particleClass: "flow-solar",
        })}

        ${renderFlow({
          path: "M 104 286 C 138 286 168 286 194 286",
          value: boughtFromGrid,
          gradientId: "mobile-flow-grid-in",
          colorVar: "var(--clr-consumption)",
          filterId: "mobile-glow-red",
          particleClass: "flow-grid-in",
        })}

        ${renderFlow({
          path: "M 226 318 C 194 340 162 348 102 350",
          value: soldToMarket,
          gradientId: "mobile-flow-grid-out",
          colorVar: "var(--clr-export)",
          filterId: "mobile-glow-blue",
          particleClass: "flow-grid-out",
        })}

        ${renderFlow({
          path: "M 226 286 C 262 274 294 274 318 286",
          value: shared,
          gradientId: "mobile-flow-shared-out",
          colorVar: "var(--clr-export)",
          filterId: "mobile-glow-blue",
          particleClass: "flow-shared-out",
        })}

        ${renderFlow({
          path: "M 318 320 C 294 332 262 334 226 322",
          value: sharedWithMe,
          gradientId: "mobile-flow-shared-in",
          colorVar: "var(--clr-primary)",
          filterId: "mobile-glow-cyan",
          particleClass: "flow-shared-in",
          direction: "reverse",
        })}

        ${hasGasMeter
      ? renderFlow({
        path: "M 210 474 C 210 432 210 390 210 344",
        value: gasFlowVisualValue,
        gradientId: "mobile-flow-gas",
        colorVar: "var(--clr-gas)",
        filterId: "mobile-glow-gas",
        particleClass: "flow-gas",
      })
      : ""}
      </svg>
    </div>
  `;

  // Chart title — dynamic based on selected range
  const rangeLabel =
    d?.start && d?.end
      ? `${fmtDate(d.start)} — ${fmtDate(d.end)}`
      : state.range === "custom" && state.customStart && state.customEnd
      ? `${fmtDate(state.customStart + "T00:00:00")} — ${fmtDate(state.customEnd + "T00:00:00")}`
      : RANGES.find((r) => r.id === state.range)?.label ?? "Yesterday";
  const chartHint = state.chartConsumptionView === "house"
    ? "Total Usage shows the full house load, with the solar-covered share highlighted in green and exports below zero · Scroll to zoom · Drag to pan"
    : "Net Grid focuses on what still came from the grid after solar, with exports shown below zero · The reference limit in kW mode applies here · Scroll to zoom · Drag to pan";

  return `
    <div class="dashboard" style="position: relative;">
      <div style="position:fixed;bottom:4px;right:4px;font-size:10px;opacity:0.5;pointer-events:none;z-index:9999;">v:2.8.0</div>

      <!-- Range Selector -->
      <div class="range-selector">
        ${RANGES.map(
    (r) => `
          <button
            class="range-btn ${r.id === state.range ? "active" : ""}"
            data-range="${r.id}"
          >${r.label}</button>
        `,
  ).join("")}
      </div>

      ${(() => {
      if (!d?.start || !d?.end) return "";
      try {
        const s = new Date(d.start);
        const e = new Date(d.end);
        if (isNaN(s.getTime()) || isNaN(e.getTime())) return "";

        return `
            <div class="range-info-bar">
              📅 ${s.toLocaleDateString()} — ${e.toLocaleDateString()}
            </div>
          `;
      } catch {
        return "";
      }
    })()}

      ${state.range === "custom" ? `
      <!-- Custom Date Range Picker -->
      <div class="custom-range-picker">
        <label>
          <span>From</span>
          <input type="date" id="custom-start" value="${state.customStart ?? ""}" />
        </label>
        <label>
          <span>To</span>
          <input type="date" id="custom-end" value="${state.customEnd ?? ""}" />
        </label>
        <button class="btn btn-primary" id="apply-custom-range">Apply</button>
      </div>
      ` : (periodStartValue && periodEndValue) ? `
      <!-- Preset Period Preview -->
      <div class="custom-range-picker period-preview">
        <span class="period-preview-label">Viewed period</span>
        <label>
          <span>From</span>
          <input type="date" value="${periodStartValue}" readonly aria-label="Preset period start" />
        </label>
        <label>
          <span>To</span>
          <input type="date" value="${periodEndValue}" readonly aria-label="Preset period end" />
        </label>
      </div>
      ` : ""}

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card consumption">
          <div class="stat-icon">⚡</div>
          <div class="stat-body">
            <div class="stat-label">Consumption</div>
            <div class="stat-value">${fmtNum(consumption)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card production">
          <div class="stat-icon">☀️</div>
          <div class="stat-body">
            <div class="stat-label">Production</div>
            <div class="stat-value">${fmtNum(production)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.export">
          <div class="stat-icon">📤</div>
          <div class="stat-body">
            <div class="stat-label">Exported</div>
            <div class="stat-value">${fmtNum(exported)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>

        <div class="stat-card.self-consumed">
          <div class="stat-icon">🏠</div>
          <div class="stat-body">
            <div class="stat-label">Self-Consumed</div>
            <div class="stat-value">${fmtNum(selfConsumed)} <span class="stat-unit">kWh</span></div>
          </div>
        </div>
      </div>

      <!-- Energy Flow + Key Metrics side by side -->
      <div class="flow-metrics-row">
        <div class="card flow-card">
          <h3 class="card-title"><span class="title-icon">🔄</span> Energy Flow</h3>

          <div class="leneda-elite-flow">
            <div class="elite-header">
              <div class="glass-module consumption-module">
                <div class="module-info">
                  <span class="module-label">Period Consumption <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-red">${fmtNum(consumption)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg red"></div></div>
              </div>

              <div class="glass-module production-module">
                <div class="module-info">
                  <span class="module-label">Solar Production <span class="info-icon">ⓘ</span></span>
                  <div class="module-value-row">
                    <span class="module-value highlight-green">${fmtNum(production)}</span>
                    <span class="module-unit">kWh</span>
                  </div>
                </div>
                <div class="module-visual"><div class="wave-bg green"></div></div>
              </div>
            </div>

            ${renderDesktopScene()}
            ${renderMobileScene()}

            <div class="mobile-flow-summary">
              <div class="mobile-flow-house">
                <span class="mobile-flow-kicker">House</span>
                <strong class="mobile-flow-house-value">${fmtNum(totalHomeEnergy)} kWh supplied</strong>
                <span class="mobile-flow-house-meta">
                  ${fmtNum(selfSufficiency, 0)}% solar supplied${peakPower > 0 ? ` · Peak ${fmtNum(peakPower, 2)} kW` : ""}
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
                  <span>${fmtNum(solarToHome)} kWh used in the house</span>
                </span>
              </div>
              <div class="flow-legend-item import">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Bought from grid</strong>
                  <span>${fmtNum(boughtFromGrid)} kWh bought from the grid</span>
                </span>
              </div>
              <div class="flow-legend-item export">
                <span class="flow-legend-dot"></span>
                <span class="flow-legend-copy">
                  <strong>Grid export</strong>
                  <span>${fmtNum(soldToMarket)} kWh sent back to the market</span>
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
        <h3 class="card-title"><span class="title-icon">📈</span> Key Metrics</h3>
        <div class="metrics-list">
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Sufficiency</span>
              <span class="metric-value">${fmtNum(selfSufficiency, 1)}%</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" style="width: ${selfSufficiency}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-header">
              <span class="metric-label">Self-Consumed</span>
              <span class="metric-value">${fmtNum(selfConsumed)} kWh</span>
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
              <span class="metric-label">${(d?.exceedance_kwh ?? 0) > 0 ? "⚠️" : "✅"} Exceedance</span>
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
          <h3 class="card-title"><span class="title-icon">📉</span> Energy Profile — ${rangeLabel}</h3>
          <div class="chart-unit-toggle">
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
              class="reset-zoom-btn"
              style="display: none;"
              title="Reset zoom to full period"
            >↩ Reset Zoom</button>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="energy-chart"></canvas>
        </div>
        <p class="muted chart-hint" style="text-align:center; margin-top: var(--sp-2); font-size: var(--text-xs);">
          ${chartHint}
        </p>
      </div>

      </div>

      </div>
    </section>
  `;
}
