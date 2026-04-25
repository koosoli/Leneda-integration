/**
 * NavBar — Tab navigation bar component.
 */
import type { Tab, ThemeMode } from "./App";

export function renderNavBar(
  activeTab: Tab,
  _onTabChange: (tab: Tab) => void,
  isMenuOpen = false,
  theme: ThemeMode = "dark",
  dataSourceLabel = "",
): string {
  const icon = (body: string): string => `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${body}
    </svg>
  `;
  const chartsIcon = icon(`
    <path d="M4 19V5" />
    <path d="M4 19H20" />
    <path d="M7 15L11 11L14 13L19 8" />
    <circle cx="7" cy="15" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="11" cy="11" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="8" r="1.25" fill="currentColor" stroke="none" />
  `);
  const dashboardIcon = icon(`
    <path d="M3 11.5L12 4L21 11.5" />
    <path d="M5.5 10.5V20H18.5V10.5" />
    <path d="M9.5 20V14H14.5V20" />
  `);
  const sensorsIcon = icon(`
    <path d="M4 19H20" />
    <path d="M7 19V11" />
    <path d="M12 19V7" />
    <path d="M17 19V4" />
  `);
  const invoiceIcon = icon(`
    <path d="M7 4H17V20L15 18.5L13 20L11 18.5L9 20L7 18.5L5 20V6A2 2 0 0 1 7 4Z" />
    <path d="M9 9H15" />
    <path d="M9 13H15" />
  `);
  const settingsIcon = icon(`
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3V6" />
    <path d="M12 18V21" />
    <path d="M3 12H6" />
    <path d="M18 12H21" />
    <path d="M5.64 5.64L7.76 7.76" />
    <path d="M16.24 16.24L18.36 18.36" />
    <path d="M16.24 7.76L18.36 5.64" />
    <path d="M5.64 18.36L7.76 16.24" />
  `);
  const themeIcon = theme === "dark"
    ? icon(`
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2V4.5" />
        <path d="M12 19.5V22" />
        <path d="M2 12H4.5" />
        <path d="M19.5 12H22" />
        <path d="M4.93 4.93L6.7 6.7" />
        <path d="M17.3 17.3L19.07 19.07" />
        <path d="M17.3 6.7L19.07 4.93" />
        <path d="M4.93 19.07L6.7 17.3" />
      `)
    : icon(`
        <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4A8.5 8.5 0 1 0 20 14.5Z" />
      `);
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "charts", label: "Charts", icon: chartsIcon },
    { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
    { id: "sensors", label: "Sensors", icon: sensorsIcon },
    { id: "invoice", label: "Invoice", icon: invoiceIcon },
    { id: "settings", label: "Settings", icon: settingsIcon },
  ];

  return `
    <header class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-brand">
        <img src="${import.meta.env.BASE_URL}logo.png" srcset="${import.meta.env.BASE_URL}logo@2x.png 2x" alt="Leneda Logo" class="navbar-logo-img" />
        ${dataSourceLabel ? `<span class="navbar-badge">${dataSourceLabel}</span>` : ""}
 
        <button class="menu-toggle ${isMenuOpen ? "open" : ""}" aria-label="Toggle menu" aria-expanded="${isMenuOpen}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="navbar-tabs ${isMenuOpen ? "mobile-open" : ""}" role="tablist">
        ${tabs
      .map(
        (t) => `
          <button
            class="nav-btn ${t.id === activeTab ? "active" : ""}"
            data-tab="${t.id}"
            role="tab"
            aria-selected="${t.id === activeTab}"
            aria-controls="panel-${t.id}"
          >
            <span class="nav-icon" aria-hidden="true">${t.icon}</span>
            <span class="nav-label">${t.label}</span>
          </button>
        `
      )
      .join("")}

        <div class="navbar-actions">
            <button
              class="theme-toggle"
              type="button"
              data-theme-toggle
              title="Switch to ${theme === "dark" ? "light" : "dark"} mode"
              aria-label="Switch to ${theme === "dark" ? "light" : "dark"} mode"
            >
              <span class="theme-toggle-icon" aria-hidden="true">${themeIcon}</span>
              <span class="theme-toggle-label">${theme === "dark" ? "Light" : "Dark"} mode</span>
            </button>

            <a href="https://buymeacoffee.com/koosoli" target="_blank" rel="noopener noreferrer" 
               class="navbar-cta"
            >
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor"><path d="M20,3H4v10c0,2.21,1.79,4,4,4h6c2.21,0,4-1.79,4-4v-3h2c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,8h-2V5h2V8z M18,15H4v-1h14V15z M18,12H4V5h14V12z"/></svg>
              <span>Support Project</span>
            </a>

            <a href="https://github.com/koosoli/Leneda-HACS-integration" target="_blank" rel="noopener noreferrer"
               class="navbar-icon-link"
               title="View Project on GitHub">
              <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
        </div>
      </nav>
    </header>
  `;
}
