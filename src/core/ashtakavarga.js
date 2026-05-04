/**
 * Ashtakavarga Calculator
 * Calculates Bindhu (benefic point) tables for all planets
 */

import { PLANET_ORDER, RASHIS } from './constants.js';

/**
 * Ashtakavarga benefic point rules
 * For each planet, from each reference point (7 planets + Lagna),
 * benefic points are given in specific houses
 */
const ASHTAKAVARGA_RULES = {
  SUN: {
    SUN: [1, 2, 4, 7, 8, 9, 10, 11],
    MOON: [3, 6, 10, 11],
    MARS: [1, 2, 4, 7, 8, 9, 10, 11],
    MERCURY: [3, 5, 6, 9, 10, 11, 12],
    JUPITER: [5, 6, 9, 11],
    VENUS: [6, 7, 12],
    SATURN: [1, 2, 4, 7, 8, 9, 10, 11],
    ASC: [3, 4, 6, 10, 11, 12],
  },
  MOON: {
    SUN: [3, 6, 7, 8, 10, 11],
    MOON: [1, 3, 6, 7, 10, 11],
    MARS: [2, 3, 5, 6, 9, 10, 11],
    MERCURY: [1, 3, 4, 5, 7, 8, 10, 11],
    JUPITER: [1, 4, 7, 8, 10, 11, 12],
    VENUS: [3, 4, 5, 7, 9, 10, 11],
    SATURN: [3, 5, 6, 11],
    ASC: [3, 6, 10, 11],
  },
  MARS: {
    SUN: [3, 5, 6, 10, 11],
    MOON: [3, 6, 11],
    MARS: [1, 2, 4, 7, 8, 10, 11],
    MERCURY: [3, 5, 6, 11],
    JUPITER: [6, 10, 11, 12],
    VENUS: [6, 8, 11, 12],
    SATURN: [1, 4, 7, 8, 9, 10, 11],
    ASC: [1, 3, 6, 10, 11],
  },
  MERCURY: {
    SUN: [5, 6, 9, 11, 12],
    MOON: [2, 4, 6, 8, 10, 11],
    MARS: [1, 2, 4, 7, 8, 9, 10, 11],
    MERCURY: [1, 3, 5, 6, 9, 10, 11, 12],
    JUPITER: [6, 8, 11, 12],
    VENUS: [1, 2, 3, 4, 5, 8, 9, 11],
    SATURN: [1, 2, 4, 7, 8, 9, 10, 11],
    ASC: [1, 2, 4, 6, 8, 10, 11],
  },
  JUPITER: {
    SUN: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    MOON: [2, 5, 7, 9, 11],
    MARS: [1, 2, 4, 7, 8, 10, 11],
    MERCURY: [1, 2, 4, 5, 6, 9, 10, 11],
    JUPITER: [1, 2, 3, 4, 7, 8, 10, 11],
    VENUS: [2, 5, 6, 9, 10, 11],
    SATURN: [3, 5, 6, 12],
    ASC: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  VENUS: {
    SUN: [8, 11, 12],
    MOON: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    MARS: [3, 4, 6, 8, 9, 11, 12],
    MERCURY: [3, 5, 6, 9, 11],
    JUPITER: [5, 8, 9, 10, 11],
    VENUS: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    SATURN: [3, 4, 5, 8, 9, 10, 11],
    ASC: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  SATURN: {
    SUN: [1, 2, 4, 7, 8, 10, 11],
    MOON: [3, 6, 11],
    MARS: [3, 5, 6, 10, 11, 12],
    MERCURY: [6, 8, 9, 10, 11, 12],
    JUPITER: [5, 6, 11, 12],
    VENUS: [6, 11, 12],
    SATURN: [3, 5, 6, 11],
    ASC: [1, 3, 4, 6, 10, 11],
  },
};

/**
 * Calculate Ashtakavarga table for a specific planet
 */
export function calculatePlanetAshtakavarga(targetPlanet, chartData) {
  const rules = ASHTAKAVARGA_RULES[targetPlanet];
  if (!rules) return null;

  const bindhus = new Array(12).fill(0);

  for (const [refPlanet, houses] of Object.entries(rules)) {
    let refRashi;
    if (refPlanet === 'ASC') {
      refRashi = chartData.ascendant.rashi;
    } else {
      refRashi = chartData.planets[refPlanet].rashi;
    }
    for (const h of houses) {
      let sign = refRashi + h - 1;
      if (sign > 12) sign -= 12;
      bindhus[sign - 1]++;
    }
  }

  return bindhus;
}

/**
 * Calculate Sarvashtakavarga (combined strength of all planets)
 */
export function calculateSarvashtakavarga(chartData) {
  const sarva = new Array(12).fill(0);
  const planetTables = {};

  const planets = ['SUN', 'MOON', 'MARS', 'MERCURY', 'JUPITER', 'VENUS', 'SATURN'];
  for (const planet of planets) {
    const bindhus = calculatePlanetAshtakavarga(planet, chartData);
    planetTables[planet] = bindhus;
    for (let i = 0; i < 12; i++) {
      sarva[i] += bindhus[i];
    }
  }

  return { sarvashtakavarga: sarva, planetTables, total: sarva.reduce((a, b) => a + b, 0) };
}
