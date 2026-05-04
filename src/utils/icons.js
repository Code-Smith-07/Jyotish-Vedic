/**
 * Custom SVG Icon System
 * Beautiful hand-crafted SVG icons for the Vedic Astrology app
 */

const ICON_SIZE = 20;

function svg(content, size = ICON_SIZE, viewBox = '0 0 24 24') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">${content}</svg>`;
}

function svgFill(content, size = ICON_SIZE, viewBox = '0 0 24 24') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="currentColor" class="icon-svg">${content}</svg>`;
}

export const icons = {

  // OM symbol — large decorative version for header
  om: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 100 100" class="icon-svg om-icon">
    <defs>
      <linearGradient id="om-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f59e0b"/>
        <stop offset="50%" style="stop-color:#fb923c"/>
        <stop offset="100%" style="stop-color:#a855f7"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#om-grad)" stroke-width="1.5" opacity="0.3"/>
    <text x="50" y="68" text-anchor="middle" fill="url(#om-grad)" font-size="52" font-family="serif" font-weight="700">ॐ</text>
  </svg>`,

  // Om small — for buttons
  omSmall: svgFill(`<text x="12" y="18" text-anchor="middle" font-size="18" font-family="serif" font-weight="700">ॐ</text>`, ICON_SIZE),

  // Clipboard / Form
  form: svg(`<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="18" x2="13" y2="18"/>`),

  // Grid / Chart
  chart: svg(`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    <line x1="6.5" y1="3" x2="6.5" y2="10" opacity="0.4"/><line x1="3" y1="6.5" x2="10" y2="6.5" opacity="0.4"/>`),

  // Planet / Globe
  planet: svg(`<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="3.5" ry="9"/>
    <line x1="3" y1="12" x2="21" y2="12"/><path d="M4.5 7.5h15" opacity="0.5"/><path d="M4.5 16.5h15" opacity="0.5"/>`),

  // Clock / Dasha timer
  clock: svg(`<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>`),

  // Diya / Lamp (Panchang)
  diya: svg(`<path d="M12 2c-1 3-4 5-4 8a4 4 0 0 0 8 0c0-3-3-5-4-8z" fill="currentColor" opacity="0.15"/>
    <path d="M12 2c-1 3-4 5-4 8a4 4 0 0 0 8 0c0-3-3-5-4-8z"/>
    <path d="M8 18h8"/><path d="M6 22h12"/><path d="M10 18v4"/><path d="M14 18v4"/>
    <line x1="12" y1="2" x2="12" y2="4" stroke-width="2" opacity="0.6"/>`),

  // Bar chart (Divisional / Vargas)
  barChart: svg(`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/>`),

  // Sparkle / Star (Yogas)
  sparkle: svg(`<path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z"/>
    <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="5" cy="18" r="1" fill="currentColor" opacity="0.3"/>`),

  // Warning triangle (Doshas)
  warning: svg(`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/>`),

  // Crystal ball (Predictions)
  crystal: svg(`<circle cx="12" cy="10" r="7"/><path d="M8.5 16.5C9 18.5 10.5 20 12 20s3-1.5 3.5-3.5"/>
    <path d="M7 20h10"/><circle cx="10" cy="8" r="1" fill="currentColor" opacity="0.3"/>
    <circle cx="14" cy="11" r="0.7" fill="currentColor" opacity="0.2"/>`),

  // Hash / Numbers (Ashtakavarga)
  hash: svg(`<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>`),

  // Diamond / Gem (Remedies)
  gem: svg(`<polygon points="12 2 22 9 17 22 7 22 2 9"/>
    <line x1="12" y1="2" x2="7" y2="22" opacity="0.3"/><line x1="12" y1="2" x2="17" y2="22" opacity="0.3"/>
    <line x1="2" y1="9" x2="22" y2="9" opacity="0.3"/>`),

  // Mars symbol (Mangal Dosha)
  mars: svg(`<circle cx="10" cy="14" r="6"/><line x1="14.5" y1="9.5" x2="21" y2="3"/>
    <line x1="15" y1="3" x2="21" y2="3"/><line x1="21" y1="3" x2="21" y2="9"/>`),

  // Snake (Kaal Sarp)
  snake: svg(`<path d="M4 18c0-4 3-5 5-5s3 2 5 2 4-1 5-3"/>
    <path d="M19 12l2-2-2-2" stroke-width="1.5"/>
    <circle cx="4" cy="18" r="1.5" fill="currentColor" opacity="0.4"/>`),

  // Saturn ring (Sade Sati)
  saturn: svg(`<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-20 12 12)"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.3"/>`),

  // Pray hands (Pitra Dosha)
  pray: svg(`<path d="M12 2v4"/><path d="M8 8l-2 8h12l-2-8"/><path d="M7 22h10"/>
    <path d="M10 16v6"/><path d="M14 16v6"/><circle cx="12" cy="4" r="2"/>`),

  // Clover / Luck
  luck: svg(`<path d="M12 12C9 9 4 9 4 12s5 3 8 6c3-3 8-3 8-6s-5-3-8 0z" fill="currentColor" opacity="0.1"/>
    <path d="M12 12C9 9 4 9 4 12s5 3 8 6c3-3 8-3 8-6s-5-3-8 0z"/>
    <line x1="12" y1="18" x2="12" y2="22"/>`),

  // Book / Reference
  book: svg(`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="9" y1="7" x2="16" y2="7" opacity="0.4"/><line x1="9" y1="11" x2="14" y2="11" opacity="0.4"/>`),

  // Generate / Wand
  generate: svg(`<path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
    <path d="M17.8 11.8L19 13"/><path d="M15 6.2V8"/><path d="M11 13.8L9.7 15"/>
    <path d="M17.8 6.2L19 5"/><path d="m3 21 8.6-8.6"/>
    <circle cx="15" cy="9" r="3" fill="currentColor" opacity="0.15"/><circle cx="15" cy="9" r="3"/>`, ICON_SIZE),

  // Checkmark
  check: svg(`<polyline points="20 6 9 17 4 12"/>`),

  // Cross / Clear  
  clear: svg(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`),

  // Arrow right
  arrowRight: svg(`<polyline points="9 6 15 12 9 18"/>`, 12),

  // Ascendant marker
  ascendant: svg(`<path d="M12 3l8 18H4z" fill="currentColor" opacity="0.1"/><path d="M12 3l8 18H4z"/>`, 14),

  // Download
  download: svg(`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`),

  // Sun
  sun: svg(`<circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`, 14),

  // Moon
  moon: svg(`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`, 14),
};

/**
 * Get an icon by name with optional size and color overrides
 */
export function icon(name, size = null, color = null) {
  let ico = icons[name] || '';
  if (size) ico = ico.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
  if (color) ico = `<span style="color:${color}">${ico}</span>`;
  return ico;
}

export default icons;
