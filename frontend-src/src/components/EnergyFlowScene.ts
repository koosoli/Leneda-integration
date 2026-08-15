/**
 * EnergyFlowScene — the animated energy-flow diagram on the Dashboard.
 *
 * Layout rules that keep the scene readable at any data volume:
 *   - Every satellite (grid, solar, community, gas) is one node: a round
 *     badge plus its text, positioned by a single helper. Icon and label
 *     can therefore never overlap each other.
 *   - Nodes occupy reserved bands that do not intersect the house, and the
 *     house keeps its figures *inside* its body, so the corridor below
 *     it stays free for the gas link.
 *   - The scene grows taller when a gas meter exists instead of squeezing
 *     gas into the space the house caption already uses.
 *   - Links start and end on node boundaries, never inside a shape.
 *
 * The coordinates below are verified by dev/scene-check.html, which renders
 * every variant and reports overlapping or out-of-frame elements. Change a
 * number here, re-run that page.
 *
 * Motion is a CSS dash animation rather than SMIL particles: constant
 * apparent speed regardless of path length, and it honours
 * prefers-reduced-motion for free.
 */
import { fmtNum } from "../utils/format";

export interface EnergyFlowSceneData {
  production: number;
  directSolarToHome: number;
  solarToHome: number;
  boughtFromGrid: number;
  soldToMarket: number;
  shared: number;
  sharedWithMe: number;
  communityExchange: number;
  totalHomeEnergy: number;
  selfSufficiency: number;
  gasEnergy: number;
  gasVolume: number;
  hasGas: boolean;
}

export type SceneVariant = "desktop" | "mobile";

/** Stroke-based glyphs drawn in a 24×24 box, centred on (12, 12). */
const GLYPHS = {
  grid: `
    <path d="M12 2.8V21.2" />
    <path d="M5.6 7H18.4" />
    <path d="M7.6 11.6H16.4" />
    <path d="M9.6 16.2H14.4" />
  `,
  solar: `
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.6V5.1" />
    <path d="M12 18.9V21.4" />
    <path d="M2.6 12H5.1" />
    <path d="M18.9 12H21.4" />
    <path d="M5.4 5.4L7.1 7.1" />
    <path d="M16.9 16.9L18.6 18.6" />
    <path d="M16.9 7.1L18.6 5.4" />
    <path d="M5.4 18.6L7.1 16.9" />
  `,
  community: `
    <path d="M2.8 21H21.2" />
    <path d="M4.4 21V10.2H10.6V21" />
    <path d="M13.4 21V6.2H19.6V21" />
    <path d="M6.4 13.4H8.6" />
    <path d="M6.4 17H8.6" />
    <path d="M15.4 9.6H17.6" />
    <path d="M15.4 13.4H17.6" />
    <path d="M15.4 17H17.6" />
  `,
  gas: `
    <path d="M12 2.9C15.1 6.6 16.6 9.4 16.6 11.9C16.6 15.2 14.5 17.9 12 17.9C9.5 17.9 7.4 15.2 7.4 11.9C7.4 9.4 8.9 6.6 12 2.9Z" />
    <path d="M12 10.4C13.3 12.1 13.9 13.4 13.9 14.5C13.9 16 13 17.1 12 17.1C11 17.1 10.1 16 10.1 14.5C10.1 13.4 10.7 12.1 12 10.4Z" fill="currentColor" stroke="none" opacity="0.8" />
  `,
} as const;

type GlyphKey = keyof typeof GLYPHS;

interface Point {
  x: number;
  y: number;
}

interface NodeOptions {
  x: number;
  y: number;
  r: number;
  glyph: GlyphKey;
  color: string;
  kicker: string;
  value?: string;
  detail?: string;
  /** Where the text sits relative to the badge. */
  text: "below" | "right" | "none";
  /** Font scale for the text block (mobile uses smaller type). */
  compact?: boolean;
  prefix: string;
}

/**
 * A node badge is built from concentric discs — a wide aura, a tighter halo,
 * the plate itself and an accent wash — so the icon sits in a pool of its own
 * colour instead of on a flat circle.
 */
function renderNode(options: NodeOptions): string {
  const { x, y, r, glyph, color, kicker, value, detail, text, compact = false, prefix } = options;
  const glyphScale = (r * 1.24) / 24;

  const badge = `
    <g class="scene-node-badge" transform="translate(${x}, ${y})" color="${color}">
      <circle r="${r + 18}" class="scene-node-aura" fill="${color}" />
      <circle r="${r + 7}" class="scene-node-halo" fill="${color}" />
      <circle r="${r}" class="scene-node-plate" fill="url(#${prefix}-plate)" stroke="${color}" />
      <circle r="${r - 1}" class="scene-node-wash" fill="${color}" />
      <g class="scene-node-glyph" transform="scale(${glyphScale.toFixed(3)}) translate(-12, -12)">
        ${GLYPHS[glyph]}
      </g>
    </g>
  `;

  if (text === "none") return badge;

  const kickerSize = compact ? 9 : 11;
  // Clearance below the badge has to cover the outgoing link's bow plus its
  // stroke, which is at its widest when that flow dominates the period.
  const gap = compact ? 18 : 28;

  if (text === "right") {
    const left = x + r + 20;
    return `
      ${badge}
      <g class="scene-node-text" text-anchor="start">
        <text x="${left}" y="${y - 12}" class="scene-node-kicker">${kicker}</text>
        ${value ? `<text x="${left}" y="${y + 10}" class="scene-node-value">${value}</text>` : ""}
        ${detail ? `<text x="${left}" y="${y + 28}" class="scene-node-detail">${detail}</text>` : ""}
      </g>
    `;
  }

  const top = y + r + gap;
  return `
    ${badge}
    <g class="scene-node-text" text-anchor="middle">
      <text x="${x}" y="${top}" class="scene-node-kicker" style="font-size:${kickerSize}px">${kicker}</text>
      ${value ? `<text x="${x}" y="${top + (compact ? 18 : 22)}" class="scene-node-value">${value}</text>` : ""}
      ${detail ? `<text x="${x}" y="${top + (compact ? 34 : 40)}" class="scene-node-detail">${detail}</text>` : ""}
    </g>
  `;
}

interface LinkOptions {
  id: string;
  path: string;
  /** Endpoints, used to orient the stroke gradient along the direction of travel. */
  from: Point;
  to: Point;
  value: number;
  max: number;
  color: string;
  /** Animate the dashes backwards (energy arriving rather than leaving). */
  reverse?: boolean;
  label: string;
}

function renderLink(options: LinkOptions): string {
  const { id, path, from, to, value, max, color, reverse = false, label } = options;
  const share = max > 0 ? Math.min(1, value / max) : 0;
  const width = value > 0 ? 3.2 + share * 6 : 2;
  const idle = value <= 0;
  // Busier links move faster, within a narrow band so nothing looks frantic.
  const duration = (2.6 - share * 1.3).toFixed(2);
  // The gradient runs source → destination, so every link fades in from its
  // origin and arrives at full strength.
  const [gs, ge] = reverse ? [to, from] : [from, to];

  return `
    <g class="flow-link${idle ? " flow-link-idle" : ""}" color="${color}">
      <title>${label}</title>
      <linearGradient
        id="${id}"
        gradientUnits="userSpaceOnUse"
        x1="${gs.x}" y1="${gs.y}" x2="${ge.x}" y2="${ge.y}"
      >
        <stop offset="0%" stop-color="${color}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="${color}" stop-opacity="1" />
      </linearGradient>
      <path
        class="flow-track"
        d="${path}"
        stroke-width="${(width + 3).toFixed(1)}"
        fill="none"
      />
      ${idle ? "" : `
      <path
        class="flow-pulse"
        d="${path}"
        stroke="url(#${id})"
        stroke-width="${width.toFixed(1)}"
        style="animation-duration:${duration}s${reverse ? ";animation-direction:reverse" : ""}"
        fill="none"
      />`}
    </g>
  `;
}

interface HouseOptions {
  cx: number;
  /** Roof apex, eaves line and floor — the three horizontals of the shape. */
  apexY: number;
  eavesY: number;
  baseY: number;
  halfWidth: number;
  ringY: number;
  ringR: number;
  coverage: number;
  usageLabel?: string;
  usageValue?: string;
  prefix: string;
}

function renderHouse(options: HouseOptions): string {
  const {
    cx, apexY, eavesY, baseY, halfWidth, ringY, ringR,
    coverage, usageLabel, usageValue, prefix,
  } = options;

  const left = cx - halfWidth;
  const right = cx + halfWidth;
  const overhang = Math.round(halfWidth * 0.09);
  const slope = (eavesY - apexY) / halfWidth;

  // Panel band laid along the right roof slope. The 0.16..0.70 inset keeps
  // the band (and its rounded ends) inside the roof triangle at any size.
  const panelStart = { x: cx + halfWidth * 0.16, y: apexY + halfWidth * 0.16 * slope + 9 };
  const panelEnd = { x: cx + halfWidth * 0.7, y: apexY + halfWidth * 0.7 * slope + 9 };
  const panelLength = Math.hypot(panelEnd.x - panelStart.x, panelEnd.y - panelStart.y);
  const panelAngle = (Math.atan2(panelEnd.y - panelStart.y, panelEnd.x - panelStart.x) * 180) / Math.PI;
  const panelThickness = Math.max(6, halfWidth * 0.1);
  const panelCells = 4;

  const ringCircumference = 2 * Math.PI * (ringR - 5);
  const covered = Math.min(100, Math.max(0, coverage));

  return `
    <g class="elite-house">
      <ellipse cx="${cx}" cy="${baseY + 10}" rx="${halfWidth * 1.5}" ry="${Math.max(10, halfWidth * 0.16)}" fill="url(#${prefix}-house-shadow)" />

      <path
        class="house-roof"
        d="M ${left - overhang} ${eavesY + 2} L ${cx} ${apexY} L ${right + overhang} ${eavesY + 2} Z"
        fill="url(#${prefix}-roof)"
      />
      <path
        class="house-body"
        d="M ${left} ${eavesY} H ${right} V ${baseY} H ${left} Z"
        fill="url(#${prefix}-body)"
      />
      <path class="house-ridge" d="M ${cx} ${apexY + 3} L ${cx} ${eavesY}" />

      <g class="house-panels" transform="translate(${panelStart.x.toFixed(1)}, ${panelStart.y.toFixed(1)}) rotate(${panelAngle.toFixed(2)})">
        <rect
          x="0" y="${(-panelThickness / 2).toFixed(1)}"
          width="${panelLength.toFixed(1)}" height="${panelThickness.toFixed(1)}"
          rx="2"
          fill="var(--clr-production)"
        />
        ${Array.from({ length: panelCells - 1 }, (_, i) => {
    const px = ((i + 1) * panelLength) / panelCells;
    return `<path d="M ${px.toFixed(1)} ${(-panelThickness / 2).toFixed(1)} V ${(panelThickness / 2).toFixed(1)}" class="house-panel-divider" />`;
  }).join("")}
      </g>

      <g class="house-ring" transform="translate(${cx}, ${ringY})">
        <circle r="${ringR + 12}" class="house-ring-glow" fill="url(#${prefix}-ring-glow)" />
        <circle r="${ringR}" class="house-ring-plate" fill="url(#${prefix}-plate)" />
        <circle
          class="house-ring-track"
          r="${ringR - 5}"
          fill="none"
          stroke-width="4.5"
        />
        <circle
          class="house-ring-value"
          r="${ringR - 5}"
          fill="none"
          stroke="url(#${prefix}-ring-arc)"
          stroke-width="4.5"
          stroke-linecap="round"
          stroke-dasharray="${ringCircumference.toFixed(1)}"
          stroke-dashoffset="${(ringCircumference * (1 - covered / 100)).toFixed(1)}"
          transform="rotate(-90)"
        />
        <text y="${ringR > 32 ? -6 : -5}" text-anchor="middle" class="house-ring-kicker">SOLAR</text>
        <text y="${ringR > 32 ? 15 : 14}" text-anchor="middle" class="house-ring-value-text">${fmtNum(covered, 0)}%</text>
      </g>

      ${usageLabel && usageValue ? `
      <text x="${cx}" y="${baseY - 30}" text-anchor="middle" class="house-total-label">${usageLabel}</text>
      <text x="${cx}" y="${baseY - 10}" text-anchor="middle" class="house-total-value">${usageValue}</text>
      ` : ""}
    </g>
  `;
}

function renderDefs(prefix: string): string {
  return `
    <defs>
      <!-- Dot grid: gives the panel a faint technical texture up close and
           reads as flat tone from a normal viewing distance. -->
      <pattern id="${prefix}-grid" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="1.4" cy="1.4" r="1.1" class="scene-grid-dot" />
      </pattern>

      <linearGradient id="${prefix}-shell" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" />
        <stop offset="100%" stop-color="var(--clr-surface)" />
      </linearGradient>
      <linearGradient id="${prefix}-plate" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" />
        <stop offset="100%" stop-color="var(--clr-surface)" />
      </linearGradient>
      <linearGradient id="${prefix}-roof" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-hover)" />
        <stop offset="100%" stop-color="var(--clr-surface-alt)" />
      </linearGradient>
      <linearGradient id="${prefix}-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-surface-alt)" />
        <stop offset="100%" stop-color="var(--clr-surface)" />
      </linearGradient>
      <linearGradient id="${prefix}-ring-arc" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.55" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="1" />
      </linearGradient>

      <radialGradient id="${prefix}-house-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.18" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${prefix}-ring-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--clr-production)" stop-opacity="0.22" />
        <stop offset="100%" stop-color="var(--clr-production)" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${prefix}-scene-glow" cx="50%" cy="40%" r="62%">
        <stop offset="0%" stop-color="var(--clr-primary)" stop-opacity="0.09" />
        <stop offset="100%" stop-color="var(--clr-primary)" stop-opacity="0" />
      </radialGradient>
    </defs>
  `;
}

/** The layered backdrop: plate, dot grid, then a soft glow behind the house. */
function renderShell(prefix: string, x: number, y: number, w: number, h: number, rx: number): string {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="scene-shell" fill="url(#${prefix}-shell)" />
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="url(#${prefix}-grid)" />
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="url(#${prefix}-scene-glow)" />
  `;
}

/* ── Desktop composition ───────────────────────────────────────────
   Bands (viewBox 900 wide):
     y  42..124  solar badge + its text to the right
     y 186..386  house, with grid and community either side
     y 250..402  grid / community badges and their captions
     y 456..614  gas (only when a gas meter exists)
   The house keeps its figures inside the body, so the column below it
   is free for the gas link.                                          */
function renderDesktop(data: EnergyFlowSceneData, max: number): string {
  const { hasGas } = data;
  const height = hasGas ? 640 : 430;
  const prefix = "flowd";

  const houseTop = 186;
  const houseBase = 386;
  const houseHalf = 108;
  const houseLeft = 450 - houseHalf;
  const houseRight = 450 + houseHalf;

  return `
    <svg
      class="elite-main-svg"
      viewBox="0 0 900 ${height}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${renderDefs(prefix)}
      ${renderShell(prefix, 16, 16, 868, height - 32, 30)}

      ${renderHouse({
    cx: 450,
    apexY: houseTop,
    eavesY: 256,
    baseY: houseBase,
    halfWidth: houseHalf,
    ringY: 296,
    ringR: 34,
    coverage: data.selfSufficiency,
    usageLabel: "Home usage",
    usageValue: `${fmtNum(data.totalHomeEnergy)} kWh`,
    prefix,
  })}

      ${renderNode({
    prefix, x: 450, y: 82, r: 40, glyph: "solar", color: "var(--clr-production)",
    text: "right",
    kicker: "Solar",
    value: `${fmtNum(data.production)} kWh`,
    detail: `${fmtNum(data.solarToHome)} kWh used at home`,
  })}

      ${renderNode({
    prefix, x: 110, y: 290, r: 40, glyph: "grid", color: "var(--clr-consumption)",
    text: "below",
    kicker: "Grid",
    value: `${fmtNum(data.boughtFromGrid + data.soldToMarket)} kWh`,
    detail: `In ${fmtNum(data.boughtFromGrid)} · out ${fmtNum(data.soldToMarket)}`,
  })}

      ${renderNode({
    prefix, x: 790, y: 290, r: 40, glyph: "community", color: "var(--clr-community)",
    text: "below",
    kicker: "Community",
    value: `${fmtNum(data.communityExchange)} kWh`,
    detail: `Sent ${fmtNum(data.shared)} · got ${fmtNum(data.sharedWithMe)}`,
  })}

      ${hasGas ? renderNode({
    prefix, x: 450, y: 494, r: 38, glyph: "gas", color: "var(--clr-gas)",
    text: "below",
    kicker: "Gas",
    value: data.gasVolume > 0
      ? `${fmtNum(data.gasEnergy)} kWh · ${fmtNum(data.gasVolume)} m³`
      : `${fmtNum(data.gasEnergy)} kWh`,
  }) : ""}

      ${renderLink({
    id: `${prefix}-solar`,
    path: `M 450 130 L 450 ${houseTop - 4}`,
    from: { x: 450, y: 130 }, to: { x: 450, y: houseTop - 4 },
    value: data.directSolarToHome, max,
    color: "var(--clr-production)",
    label: `Solar to home: ${fmtNum(data.directSolarToHome)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-import`,
    path: `M 158 274 C 220 266, 280 266, ${houseLeft - 4} 274`,
    from: { x: 158, y: 274 }, to: { x: houseLeft - 4, y: 274 },
    value: data.boughtFromGrid, max,
    color: "var(--clr-consumption)",
    label: `Bought from the grid: ${fmtNum(data.boughtFromGrid)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-export`,
    path: `M ${houseLeft - 4} 330 C 280 338, 220 338, 158 330`,
    from: { x: houseLeft - 4, y: 330 }, to: { x: 158, y: 330 },
    value: data.soldToMarket, max,
    color: "var(--clr-export)",
    label: `Exported to the grid: ${fmtNum(data.soldToMarket)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-shared`,
    path: `M ${houseRight + 4} 274 C 620 266, 680 266, 742 274`,
    from: { x: houseRight + 4, y: 274 }, to: { x: 742, y: 274 },
    value: data.shared, max,
    color: "var(--clr-community)",
    label: `Shared with the community: ${fmtNum(data.shared)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-received`,
    path: `M 742 330 C 680 338, 620 338, ${houseRight + 4} 330`,
    from: { x: 742, y: 330 }, to: { x: houseRight + 4, y: 330 },
    value: data.sharedWithMe, max,
    color: "var(--clr-community)",
    reverse: true,
    label: `Received from the community: ${fmtNum(data.sharedWithMe)} kWh`,
  })}

      ${hasGas ? renderLink({
    id: `${prefix}-gas`,
    path: `M 450 452 L 450 ${houseBase + 6}`,
    from: { x: 450, y: 452 }, to: { x: 450, y: houseBase + 6 },
    value: Math.min(data.gasEnergy, max), max,
    color: "var(--clr-gas)",
    reverse: true,
    label: `Gas to the house: ${fmtNum(data.gasEnergy)} kWh`,
  }) : ""}
    </svg>
  `;
}

/* ── Mobile composition ────────────────────────────────────────────
   No value text: the figures are repeated in the list directly under
   the scene, so the small canvas only has to carry the shape of the
   flow and the solar-coverage ring.                                  */
function renderMobile(data: EnergyFlowSceneData, max: number): string {
  const { hasGas } = data;
  const height = hasGas ? 430 : 330;
  const prefix = "flowm";

  const houseTop = 148;
  const houseBase = 288;
  const houseHalf = 70;
  const houseLeft = 210 - houseHalf;
  const houseRight = 210 + houseHalf;

  return `
    <svg
      class="elite-main-svg"
      viewBox="0 0 420 ${height}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Energy flow between the grid, your solar panels, the energy community and your home for the selected period"
    >
      ${renderDefs(prefix)}
      ${renderShell(prefix, 12, 12, 396, height - 24, 26)}

      ${renderHouse({
    cx: 210,
    apexY: houseTop,
    eavesY: 196,
    baseY: houseBase,
    halfWidth: houseHalf,
    ringY: 238,
    ringR: 30,
    coverage: data.selfSufficiency,
    prefix,
  })}

      ${renderNode({
    prefix, x: 210, y: 60, r: 28, glyph: "solar", color: "var(--clr-production)",
    text: "none", kicker: "Solar", compact: true,
  })}

      ${renderNode({
    prefix, x: 56, y: 220, r: 26, glyph: "grid", color: "var(--clr-consumption)",
    text: "below", kicker: "Grid", compact: true,
  })}

      ${renderNode({
    prefix, x: 364, y: 220, r: 26, glyph: "community", color: "var(--clr-community)",
    text: "below", kicker: "Community", compact: true,
  })}

      ${hasGas ? renderNode({
    prefix, x: 210, y: 372, r: 26, glyph: "gas", color: "var(--clr-gas)",
    text: "none", kicker: "Gas", compact: true,
  }) : ""}

      ${renderLink({
    id: `${prefix}-solar`,
    path: `M 210 94 L 210 ${houseTop - 4}`,
    from: { x: 210, y: 94 }, to: { x: 210, y: houseTop - 4 },
    value: data.directSolarToHome, max,
    color: "var(--clr-production)",
    label: `Solar to home: ${fmtNum(data.directSolarToHome)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-import`,
    path: `M 86 206 C 104 200, 120 200, ${houseLeft - 4} 206`,
    from: { x: 86, y: 206 }, to: { x: houseLeft - 4, y: 206 },
    value: data.boughtFromGrid, max,
    color: "var(--clr-consumption)",
    label: `Bought from the grid: ${fmtNum(data.boughtFromGrid)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-export`,
    path: `M ${houseLeft - 4} 240 C 120 246, 104 246, 86 240`,
    from: { x: houseLeft - 4, y: 240 }, to: { x: 86, y: 240 },
    value: data.soldToMarket, max,
    color: "var(--clr-export)",
    label: `Exported to the grid: ${fmtNum(data.soldToMarket)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-shared`,
    path: `M ${houseRight + 4} 206 C 300 200, 318 200, 334 206`,
    from: { x: houseRight + 4, y: 206 }, to: { x: 334, y: 206 },
    value: data.shared, max,
    color: "var(--clr-community)",
    label: `Shared with the community: ${fmtNum(data.shared)} kWh`,
  })}

      ${renderLink({
    id: `${prefix}-received`,
    path: `M 334 240 C 318 246, 300 246, ${houseRight + 4} 240`,
    from: { x: 334, y: 240 }, to: { x: houseRight + 4, y: 240 },
    value: data.sharedWithMe, max,
    color: "var(--clr-community)",
    reverse: true,
    label: `Received from the community: ${fmtNum(data.sharedWithMe)} kWh`,
  })}

      ${hasGas ? renderLink({
    id: `${prefix}-gas`,
    path: `M 210 342 L 210 ${houseBase + 6}`,
    from: { x: 210, y: 342 }, to: { x: 210, y: houseBase + 6 },
    value: Math.min(data.gasEnergy, max), max,
    color: "var(--clr-gas)",
    reverse: true,
    label: `Gas to the house: ${fmtNum(data.gasEnergy)} kWh`,
  }) : ""}
    </svg>
  `;
}

export function renderEnergyFlowScene(data: EnergyFlowSceneData, variant: SceneVariant): string {
  const max = Math.max(
    data.totalHomeEnergy,
    data.production,
    data.boughtFromGrid,
    data.soldToMarket,
    data.shared,
    data.sharedWithMe,
    data.directSolarToHome,
    1,
  );

  return `
    <div class="elite-scene elite-scene-${variant}">
      ${variant === "desktop" ? renderDesktop(data, max) : renderMobile(data, max)}
    </div>
  `;
}
