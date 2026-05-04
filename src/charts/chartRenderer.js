/**
 * North Indian Chart (Diamond) SVG Renderer
 * Creates traditional North Indian style Kundli chart
 */

import { RASHIS, PLANET_ORDER } from '../core/constants.js';

const CHART_SIZE = 400;
const HALF = CHART_SIZE / 2;
const PADDING = 2;

/**
 * House positions in the North Indian diamond layout
 * Each house is a polygon defined by coordinates
 * Houses go: 12(top-left), 1(top-center), 2(top-right), 3(right-top),
 * 4(right-center), 5(right-bottom), 6(bottom-right), 7(bottom-center),
 * 8(bottom-left), 9(left-bottom), 10(left-center), 11(left-top)
 */
const HOUSE_PATHS = {
  1:  `${HALF},${PADDING} ${CHART_SIZE-PADDING},${HALF} ${HALF},${HALF}`, // Top triangle (Lagna)
  2:  `${CHART_SIZE-PADDING},${PADDING} ${CHART_SIZE-PADDING},${HALF} ${HALF},${PADDING}`, // Top-right
  3:  `${CHART_SIZE-PADDING},${PADDING} ${CHART_SIZE-PADDING},${HALF} ${HALF},${HALF}`, // Right-top (adjusted)
  4:  `${CHART_SIZE-PADDING},${HALF} ${CHART_SIZE-PADDING},${CHART_SIZE-PADDING} ${HALF},${HALF}`, // Right
  5:  `${CHART_SIZE-PADDING},${CHART_SIZE-PADDING} ${HALF},${CHART_SIZE-PADDING} ${HALF},${HALF}`, // Right-bottom
  6:  `${CHART_SIZE-PADDING},${CHART_SIZE-PADDING} ${HALF},${CHART_SIZE-PADDING} ${HALF},${HALF}`, // Bottom-right
  7:  `${HALF},${CHART_SIZE-PADDING} ${PADDING},${HALF} ${HALF},${HALF}`, // Bottom (7th house)
  8:  `${PADDING},${CHART_SIZE-PADDING} ${PADDING},${HALF} ${HALF},${CHART_SIZE-PADDING}`, // Bottom-left
  9:  `${PADDING},${CHART_SIZE-PADDING} ${PADDING},${HALF} ${HALF},${HALF}`, // Left-bottom
  10: `${PADDING},${HALF} ${PADDING},${PADDING} ${HALF},${HALF}`, // Left
  11: `${PADDING},${PADDING} ${HALF},${PADDING} ${HALF},${HALF}`, // Left-top
  12: `${PADDING},${PADDING} ${HALF},${PADDING} ${HALF},${HALF}`, // Top-left
};

// Proper North Indian house coordinates (diamond layout)
const HOUSE_POLYGONS = [
  null, // index 0 unused
  // House 1 (top center - Lagna)
  [[HALF, PADDING], [CHART_SIZE - PADDING, HALF], [HALF, HALF], [PADDING, HALF]],
  // This doesn't work well as triangles. Let me use the standard layout:
];

/**
 * Generate North Indian style SVG chart
 */
export function generateNorthIndianChart(chartData, options = {}) {
  const {
    size = 400,
    title = 'Rashi Chart (D-1)',
    showDegrees = false,
    highlightHouse = null,
    divisionData = null,
  } = options;

  const S = size;
  const H = S / 2;
  const Q = S / 4;

  // Build house data
  const ascRashi = divisionData ? divisionData.ascendant : chartData.ascendant.rashi;
  const planets = divisionData ? divisionData.planets : chartData.planets;

  // Map planets to houses
  const housePlanets = {};
  for (let i = 1; i <= 12; i++) housePlanets[i] = [];

  for (const key of PLANET_ORDER) {
    const p = planets[key];
    if (!p) continue;
    const house = divisionData ? p.house : p.house;
    if (!housePlanets[house]) housePlanets[house] = [];
    housePlanets[house].push({
      key,
      symbol: p.symbol,
      name: p.name?.substring(0, 2) || key.substring(0, 2),
      color: p.color || '#f1f5f9',
      retrograde: p.retrograde,
      degree: showDegrees && p.degreeInSign !== undefined ? Math.floor(p.degreeInSign) + '°' : '',
    });
  }

  // North Indian diamond layout - house label positions (center of each house region)
  const houseCenters = {
    1:  [H, Q],           // Top center
    2:  [H + Q, Q/2 + 8],    // Top right
    3:  [H + Q + Q/2, Q + 8],// Right upper
    4:  [H + Q, H],          // Right center
    5:  [H + Q + Q/2, H + Q - 8], // Right lower
    6:  [H + Q, H + Q + Q/2 - 8], // Bottom right
    7:  [H, H + Q],          // Bottom center
    8:  [Q, H + Q + Q/2 - 8],     // Bottom left
    9:  [Q/2, H + Q - 8],         // Left lower
    10: [Q, H],               // Left center
    11: [Q/2, Q + 8],         // Left upper
    12: [Q, Q/2 + 8],         // Top left
  };

  // Build SVG
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S + 40}" width="${S}" height="${S + 40}" class="kundli-chart north-indian">`;

  // Title
  svg += `<text x="${H}" y="18" text-anchor="middle" fill="var(--accent-gold, #f59e0b)" font-size="14" font-weight="600" font-family="Outfit, sans-serif">${title}</text>`;

  // Chart background
  const offsetY = 30;
  svg += `<g transform="translate(0, ${offsetY})">`;

  // Outer square
  svg += `<rect x="1" y="1" width="${S-2}" height="${S-2}" fill="var(--bg-secondary, #111827)" stroke="var(--accent-gold, #f59e0b)" stroke-width="1.5" rx="4"/>`;

  // Diamond lines
  // Diagonal lines from corners to center
  svg += `<line x1="0" y1="0" x2="${H}" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="0.8" opacity="0.6"/>`;
  svg += `<line x1="${S}" y1="0" x2="${H}" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="0.8" opacity="0.6"/>`;
  svg += `<line x1="0" y1="${S}" x2="${H}" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="0.8" opacity="0.6"/>`;
  svg += `<line x1="${S}" y1="${S}" x2="${H}" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="0.8" opacity="0.6"/>`;

  // Cross lines (horizontal and vertical through center)
  svg += `<line x1="0" y1="${H}" x2="${S}" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="0.8" opacity="0.6"/>`;
  svg += `<line x1="${H}" y1="0" x2="${H}" y2="${S}" stroke="var(--accent-gold, #f59e0b)" stroke-width="0.8" opacity="0.6"/>`;

  // Inner diamond
  svg += `<line x1="${H}" y1="0" x2="${S}" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="1"/>`;
  svg += `<line x1="${S}" y1="${H}" x2="${H}" y2="${S}" stroke="var(--accent-gold, #f59e0b)" stroke-width="1"/>`;
  svg += `<line x1="${H}" y1="${S}" x2="0" y2="${H}" stroke="var(--accent-gold, #f59e0b)" stroke-width="1"/>`;
  svg += `<line x1="0" y1="${H}" x2="${H}" y2="0" stroke="var(--accent-gold, #f59e0b)" stroke-width="1"/>`;

  // Highlight active house
  if (highlightHouse) {
    const [cx, cy] = houseCenters[highlightHouse];
    svg += `<circle cx="${cx}" cy="${cy}" r="30" fill="var(--accent-gold, #f59e0b)" opacity="0.1"/>`;
  }

  // Rashi numbers in houses
  for (let h = 1; h <= 12; h++) {
    let signNum = ascRashi + h - 1;
    if (signNum > 12) signNum -= 12;
    const [cx, cy] = houseCenters[h];
    // Sign number (small, in corner)
    svg += `<text x="${cx}" y="${cy - 15}" text-anchor="middle" fill="var(--text-muted, #64748b)" font-size="10" font-family="Inter, sans-serif">${signNum}</text>`;
  }

  // Lagna marker
  const [lx, ly] = houseCenters[1];
  svg += `<text x="${lx}" y="${ly - 28}" text-anchor="middle" fill="var(--accent-saffron, #fb923c)" font-size="9" font-weight="600" font-family="Inter, sans-serif">Asc</text>`;

  // Planet placements
  for (let h = 1; h <= 12; h++) {
    const pList = housePlanets[h];
    if (pList.length === 0) continue;
    const [cx, cy] = houseCenters[h];

    pList.forEach((p, i) => {
      const offset = (i - (pList.length - 1) / 2) * 14;
      const py = cy + offset + 2;
      let label = p.name;
      if (p.retrograde) label += '(R)';
      if (p.degree) label += ' ' + p.degree;

      svg += `<text x="${cx}" y="${py}" text-anchor="middle" fill="${p.color}" font-size="11" font-weight="500" font-family="Inter, sans-serif" class="planet-label" data-planet="${p.key}">${label}</text>`;
    });
  }

  svg += '</g></svg>';
  return svg;
}

/**
 * Generate South Indian style SVG chart
 */
export function generateSouthIndianChart(chartData, options = {}) {
  const {
    size = 400,
    title = 'Rashi Chart (D-1)',
    showDegrees = false,
    divisionData = null,
  } = options;

  const S = size;
  const cellSize = S / 4;
  const ascRashi = divisionData ? divisionData.ascendant : chartData.ascendant.rashi;
  const planets = divisionData ? divisionData.planets : chartData.planets;

  // South Indian: Fixed signs in positions
  // Pisces(12) | Aries(1) | Taurus(2) | Gemini(3)
  // Aqua(11)   |                       | Cancer(4)
  // Capri(10)  |                       | Leo(5)
  // Sag(9)     | Scorpio(8)| Libra(7)  | Virgo(6)
  const signPositions = {
    12: [0, 0], 1: [1, 0], 2: [2, 0], 3: [3, 0],
    11: [0, 1], 4: [3, 1],
    10: [0, 2], 5: [3, 2],
    9: [0, 3], 8: [1, 3], 7: [2, 3], 6: [3, 3],
  };

  // Map planets to signs
  const signPlanets = {};
  for (let i = 1; i <= 12; i++) signPlanets[i] = [];
  for (const key of PLANET_ORDER) {
    const p = planets[key];
    if (!p) continue;
    const rashi = divisionData ? p.sign : p.rashi;
    signPlanets[rashi].push({
      key,
      symbol: p.symbol,
      name: p.name?.substring(0, 2) || key.substring(0, 2),
      color: p.color || '#f1f5f9',
      retrograde: p.retrograde,
    });
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S + 40}" width="${S}" height="${S + 40}" class="kundli-chart south-indian">`;
  svg += `<text x="${S/2}" y="18" text-anchor="middle" fill="var(--accent-gold, #f59e0b)" font-size="14" font-weight="600" font-family="Outfit, sans-serif">${title}</text>`;

  const offsetY = 30;
  svg += `<g transform="translate(0, ${offsetY})">`;

  // Draw grid
  for (let i = 0; i <= 4; i++) {
    svg += `<line x1="${i * cellSize}" y1="0" x2="${i * cellSize}" y2="${S}" stroke="var(--accent-gold, #f59e0b)" stroke-width="1" opacity="0.7"/>`;
    svg += `<line x1="0" y1="${i * cellSize}" x2="${S}" y2="${i * cellSize}" stroke="var(--accent-gold, #f59e0b)" stroke-width="1" opacity="0.7"/>`;
  }

  // Center empty area
  svg += `<rect x="${cellSize}" y="${cellSize}" width="${cellSize * 2}" height="${cellSize * 2}" fill="var(--bg-secondary, #111827)"/>`;
  svg += `<rect x="${cellSize}" y="${cellSize}" width="${cellSize * 2}" height="${cellSize * 2}" fill="none" stroke="var(--accent-gold, #f59e0b)" stroke-width="1" opacity="0.7"/>`;

  // Center label
  svg += `<text x="${S/2}" y="${S/2}" text-anchor="middle" dominant-baseline="middle" fill="var(--accent-gold, #f59e0b)" font-size="13" font-weight="600" font-family="Outfit, sans-serif">${title.replace('Chart (', '').replace(')', '')}</text>`;

  // Sign labels and planets
  for (let sign = 1; sign <= 12; sign++) {
    const pos = signPositions[sign];
    if (!pos) continue;
    const x = pos[0] * cellSize;
    const y = pos[1] * cellSize;

    // Background highlight for ascendant sign
    if (sign === ascRashi) {
      svg += `<rect x="${x + 1}" y="${y + 1}" width="${cellSize - 2}" height="${cellSize - 2}" fill="var(--accent-gold, #f59e0b)" opacity="0.08"/>`;
      // Diagonal line marking ascendant
      svg += `<line x1="${x}" y1="${y}" x2="${x + 15}" y2="${y + 15}" stroke="var(--accent-saffron, #fb923c)" stroke-width="2"/>`;
    }

    // Sign name
    svg += `<text x="${x + 5}" y="${y + 14}" fill="var(--text-muted, #64748b)" font-size="9" font-family="Inter, sans-serif">${RASHIS[sign - 1].sanskrit.substring(0, 4)}</text>`;

    // Planets
    const pList = signPlanets[sign];
    pList.forEach((p, i) => {
      const px = x + 8 + (i % 3) * 30;
      const py = y + 35 + Math.floor(i / 3) * 16;
      let label = p.name;
      if (p.retrograde) label += 'ᴿ';
      svg += `<text x="${px}" y="${py}" fill="${p.color}" font-size="11" font-weight="500" font-family="Inter, sans-serif">${label}</text>`;
    });
  }

  svg += '</g></svg>';
  return svg;
}
