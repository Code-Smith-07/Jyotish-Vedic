/**
 * Planetary Position Calculator
 * Combines high-precision ephemeris + ayanamsa + nakshatra + dignity analysis
 */

import { getAllPlanetPositions, dateToJD } from './ephemeris.js';
import { tropicalToSidereal, getAyanamsa } from './ayanamsa.js';
import { PLANETS, PLANET_ORDER, RASHIS, NAKSHATRAS, NAKSHATRA_SPAN, PADA_SPAN,
  EXALTATION, DEBILITATION, MOOLATRIKONA, OWN_SIGNS, COMBUSTION_DEGREES,
  AYANAMSA_TYPES } from './constants.js';

/**
 * Get the rashi (sign) number (1-12) from sidereal longitude
 */
export function getRashi(siderealLon) {
  return Math.floor(siderealLon / 30) + 1;
}

/**
 * Get degree within the rashi (0-30)
 */
export function getDegreeInSign(siderealLon) {
  return siderealLon % 30;
}

/**
 * Get nakshatra info from sidereal longitude
 */
export function getNakshatra(siderealLon) {
  const nkIndex = Math.floor(siderealLon / NAKSHATRA_SPAN);
  const nakshatra = NAKSHATRAS[nkIndex];
  const degInNak = siderealLon - (nkIndex * NAKSHATRA_SPAN);
  const pada = Math.floor(degInNak / PADA_SPAN) + 1;
  return {
    ...nakshatra,
    pada: Math.min(pada, 4),
    degreeInNakshatra: degInNak,
  };
}

/**
 * Format degrees to DMS (degrees, minutes, seconds)
 */
export function formatDMS(decimal) {
  const d = Math.floor(decimal);
  const m = Math.floor((decimal - d) * 60);
  const s = Math.round(((decimal - d) * 60 - m) * 60);
  return { degrees: d, minutes: m, seconds: s, display: `${d}°${m}'${s}"` };
}

/**
 * Get planetary dignity (exalted, debilitated, own sign, moolatrikona, friend, enemy)
 */
export function getPlanetDignity(planetKey, siderealLon) {
  const sign = getRashi(siderealLon);
  const degInSign = getDegreeInSign(siderealLon);

  // Check exaltation
  if (EXALTATION[planetKey] && EXALTATION[planetKey].sign === sign) {
    return { status: 'exalted', label: 'Exalted (Uchcha)', color: '#22c55e' };
  }
  // Check debilitation
  if (DEBILITATION[planetKey] && DEBILITATION[planetKey].sign === sign) {
    return { status: 'debilitated', label: 'Debilitated (Neecha)', color: '#ef4444' };
  }
  // Check moolatrikona
  if (MOOLATRIKONA[planetKey]) {
    const mt = MOOLATRIKONA[planetKey];
    if (mt.sign === sign && degInSign >= mt.from && degInSign <= mt.to) {
      return { status: 'moolatrikona', label: 'Moolatrikona', color: '#f59e0b' };
    }
  }
  // Check own sign
  if (OWN_SIGNS[planetKey] && OWN_SIGNS[planetKey].includes(sign)) {
    return { status: 'own', label: 'Own Sign (Swakshetra)', color: '#3b82f6' };
  }
  return { status: 'neutral', label: 'Neutral', color: '#94a3b8' };
}

/**
 * Check if a planet is combust (too close to Sun)
 */
export function isCombust(planetKey, planetLon, sunLon) {
  if (planetKey === 'SUN' || planetKey === 'RAHU' || planetKey === 'KETU') return false;
  const limit = COMBUSTION_DEGREES[planetKey];
  if (!limit) return false;
  let diff = Math.abs(planetLon - sunLon);
  if (diff > 180) diff = 360 - diff;
  return diff <= limit;
}

/**
 * Main function: Calculate all planetary positions for a birth chart
 * Uses astronomy-engine for NASA-grade accuracy
 */
export function calculatePlanetaryPositions(birthDate, latitude, longitude, timezone, ayanamsaType = AYANAMSA_TYPES.LAHIRI) {
  // Convert birth date to UTC
  const utcDate = new Date(birthDate.getTime() - timezone * 3600000);
  const jd = dateToJD(utcDate);

  // Get all positions from astronomy-engine
  const { positions, ascendantTropical, observer } = getAllPlanetPositions(utcDate, latitude, longitude);

  // Get ayanamsa
  const ayanamsa = getAyanamsa(jd, ayanamsaType);

  // Convert ascendant to sidereal
  const ascSidereal = tropicalToSidereal(ascendantTropical, jd, ayanamsaType);

  // Build planetary data
  const planets = {};
  for (const key of PLANET_ORDER) {
    const pos = positions[key];
    const tropLon = pos.tropical;
    const sidLon = tropicalToSidereal(tropLon, jd, ayanamsaType);
    const rashi = getRashi(sidLon);
    const degInSign = getDegreeInSign(sidLon);
    const nakshatra = getNakshatra(sidLon);
    const retrograde = pos.retrograde;
    const dignity = getPlanetDignity(key, sidLon);
    const sunSid = tropicalToSidereal(positions.SUN.tropical, jd, ayanamsaType);
    const combust = isCombust(key, sidLon, sunSid);
    const house = getHouseNumber(rashi, getRashi(ascSidereal));

    planets[key] = {
      key,
      ...PLANETS[key],
      tropical: tropLon,
      sidereal: sidLon,
      rashi,
      rashiName: RASHIS[rashi - 1].name,
      rashiSanskrit: RASHIS[rashi - 1].sanskrit,
      rashiLord: RASHIS[rashi - 1].lord,
      degreeInSign: degInSign,
      dms: formatDMS(degInSign),
      fullDms: formatDMS(sidLon),
      nakshatra,
      retrograde,
      combust,
      dignity,
      house,
    };
  }

  // Ascendant info
  const ascRashi = getRashi(ascSidereal);
  const ascendant = {
    sidereal: ascSidereal,
    rashi: ascRashi,
    rashiName: RASHIS[ascRashi - 1].name,
    rashiSanskrit: RASHIS[ascRashi - 1].sanskrit,
    degreeInSign: getDegreeInSign(ascSidereal),
    dms: formatDMS(getDegreeInSign(ascSidereal)),
    nakshatra: getNakshatra(ascSidereal),
  };

  return {
    planets,
    ascendant,
    ayanamsa,
    julianDay: jd,
    birthData: { date: birthDate, latitude, longitude, timezone },
  };
}

/**
 * Get house number for a planet (Whole Sign system)
 * House 1 = Ascendant's rashi
 */
function getHouseNumber(planetRashi, ascRashi) {
  let house = planetRashi - ascRashi + 1;
  if (house <= 0) house += 12;
  return house;
}

/**
 * Get all planets in each house
 */
export function getPlanetsInHouses(chartData) {
  const houses = {};
  for (let i = 1; i <= 12; i++) houses[i] = [];
  for (const key of PLANET_ORDER) {
    const planet = chartData.planets[key];
    houses[planet.house].push(planet);
  }
  return houses;
}

/**
 * Get the sign (rashi) for each house (Whole Sign)
 */
export function getHouseSigns(ascRashi) {
  const signs = {};
  for (let i = 1; i <= 12; i++) {
    let signNum = ascRashi + i - 1;
    if (signNum > 12) signNum -= 12;
    signs[i] = RASHIS[signNum - 1];
  }
  return signs;
}
