/**
 * Dosha Analysis Engine
 * Detects Mangal Dosha, Kaal Sarp Dosha, Sade Sati, and Pitra Dosha
 */

import { PLANET_ORDER } from './constants.js';

/**
 * Mangal Dosha (Manglik) Analysis
 * Mars in 1st, 2nd, 4th, 7th, 8th, or 12th house from Lagna/Moon/Venus
 */
export function analyzeMangalDosha(chartData) {
  const marsHouse = chartData.planets.MARS.house;
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const fromLagna = manglikHouses.includes(marsHouse);

  // From Moon
  const moonRashi = chartData.planets.MOON.rashi;
  const marsRashi = chartData.planets.MARS.rashi;
  let marsFromMoon = marsRashi - moonRashi + 1;
  if (marsFromMoon <= 0) marsFromMoon += 12;
  const fromMoon = manglikHouses.includes(marsFromMoon);

  // From Venus
  const venusRashi = chartData.planets.VENUS.rashi;
  let marsFromVenus = marsRashi - venusRashi + 1;
  if (marsFromVenus <= 0) marsFromVenus += 12;
  const fromVenus = manglikHouses.includes(marsFromVenus);

  const isManglik = fromLagna || fromMoon;
  const severity = (fromLagna ? 1 : 0) + (fromMoon ? 1 : 0) + (fromVenus ? 1 : 0);

  // Check for cancellation conditions
  const cancellations = [];
  // Mars in own sign or exalted
  if (chartData.planets.MARS.dignity.status === 'exalted' || chartData.planets.MARS.dignity.status === 'own') {
    cancellations.push('Mars is in own/exalted sign — reduces Dosha intensity');
  }
  // Jupiter aspects Mars or 7th house
  const jupRashi = chartData.planets.JUPITER.rashi;
  if (jupRashi === marsRashi) {
    cancellations.push('Jupiter conjoins Mars — significantly reduces Dosha');
  }
  // Mars in signs of benefics
  if (['JUPITER', 'VENUS'].includes(chartData.planets.MARS.rashiLord)) {
    cancellations.push('Mars is in a benefic sign — Dosha is mitigated');
  }

  return {
    isManglik,
    fromLagna,
    fromMoon,
    fromVenus,
    marsHouse,
    marsFromMoon,
    marsFromVenus,
    severity: severity === 0 ? 'None' : severity === 1 ? 'Mild' : severity === 2 ? 'Moderate' : 'Strong',
    cancellations,
    description: isManglik
      ? `Mangal Dosha is present. Mars is in the ${marsHouse}${getOrdinal(marsHouse)} house from Lagna. This may affect marriage and partnerships. ${cancellations.length > 0 ? 'However, there are cancellation factors that reduce its effect.' : ''}`
      : 'No Mangal Dosha present. Mars is not in any of the Manglik houses (1, 2, 4, 7, 8, 12) from Lagna or Moon.',
  };
}

/**
 * Kaal Sarp Dosha Analysis
 * All planets between Rahu and Ketu axis
 */
export function analyzeKaalSarpDosha(chartData) {
  const rahuRashi = chartData.planets.RAHU.rashi;
  const ketuRashi = chartData.planets.KETU.rashi;
  const rahuDeg = chartData.planets.RAHU.sidereal;
  const ketuDeg = chartData.planets.KETU.sidereal;

  // Check if all 7 planets (Sun-Saturn) are between Rahu and Ketu
  const otherPlanets = ['SUN', 'MOON', 'MARS', 'MERCURY', 'JUPITER', 'VENUS', 'SATURN'];
  let allOnOneSide = true;
  let direction = null; // 'ascending' (Rahu to Ketu clockwise) or 'descending'

  // Check ascending (Rahu → Ketu going forward)
  let ascCount = 0, descCount = 0;
  for (const key of otherPlanets) {
    const pDeg = chartData.planets[key].sidereal;
    if (isBetween(pDeg, rahuDeg, ketuDeg)) ascCount++;
    else descCount++;
  }

  const isKaalSarp = ascCount === 7 || descCount === 7;
  const isPartial = (ascCount >= 5 || descCount >= 5) && !isKaalSarp;
  direction = ascCount === 7 ? 'ascending' : descCount === 7 ? 'descending' : null;

  // Determine the type (12 types based on Rahu's house)
  const rahuHouse = chartData.planets.RAHU.house;
  const kaalSarpTypes = {
    1: 'Anant', 2: 'Kulik', 3: 'Vasuki', 4: 'Shankhpal',
    5: 'Padma', 6: 'Maha Padma', 7: 'Takshak', 8: 'Karkotak',
    9: 'Shankh', 10: 'Patak', 11: 'Vishdhar', 12: 'Sheshnaag'
  };

  return {
    isPresent: isKaalSarp,
    isPartial,
    type: isKaalSarp ? kaalSarpTypes[rahuHouse] || 'Unknown' : null,
    direction,
    rahuHouse,
    ketuHouse: chartData.planets.KETU.house,
    description: isKaalSarp
      ? `${kaalSarpTypes[rahuHouse]} Kaal Sarp Dosha is present. All planets are hemmed between Rahu (House ${rahuHouse}) and Ketu (House ${chartData.planets.KETU.house}). This can cause delays, obstacles, and karmic lessons in life.`
      : isPartial
        ? 'Partial Kaal Sarp Yoga detected. Most planets are between Rahu-Ketu axis but not all. Effects are milder.'
        : 'No Kaal Sarp Dosha present.',
  };
}

/**
 * Sade Sati Analysis
 * Saturn's 7.5 year transit over natal Moon
 */
export function analyzeSadeSati(chartData) {
  const moonRashi = chartData.planets.MOON.rashi;
  const saturnRashi = chartData.planets.SATURN.rashi;

  let satFromMoon = saturnRashi - moonRashi + 1;
  if (satFromMoon <= 0) satFromMoon += 12;

  const phase = satFromMoon === 12 ? 'Rising (1st phase)' :
    satFromMoon === 1 ? 'Peak (2nd phase)' :
      satFromMoon === 2 ? 'Setting (3rd phase)' : null;

  const isActive = [12, 1, 2].includes(satFromMoon);

  // Small Panoti (Dhaiya)
  const isDhaiya = [4, 8].includes(satFromMoon);

  return {
    isActive,
    phase,
    isDhaiya,
    saturnFromMoon: satFromMoon,
    description: isActive
      ? `Sade Sati is active — ${phase}. Saturn is transiting ${satFromMoon === 12 ? '12th' : satFromMoon === 1 ? 'over' : '2nd'} from natal Moon. This is a period of transformation, discipline, and karmic restructuring lasting approximately 2.5 years per phase.`
      : isDhaiya
        ? `Small Panoti (Dhaiya) is active. Saturn is in the ${satFromMoon}th house from Moon. This brings mild challenges for about 2.5 years.`
        : 'Sade Sati is not currently active. Saturn is not in 12th, 1st, or 2nd from natal Moon.',
  };
}

/**
 * Pitra Dosha Analysis
 * Sun conjunct/afflicted by Rahu/Ketu or malefics in 9th house
 */
export function analyzePitraDosha(chartData) {
  const sunRashi = chartData.planets.SUN.rashi;
  const rahuRashi = chartData.planets.RAHU.rashi;
  const ketuRashi = chartData.planets.KETU.rashi;
  const asc = chartData.ascendant.rashi;

  const indicators = [];

  // Sun conjunct Rahu
  if (sunRashi === rahuRashi) {
    indicators.push('Sun is conjunct Rahu (Grahan Yoga on Sun)');
  }
  // Sun conjunct Ketu
  if (sunRashi === ketuRashi) {
    indicators.push('Sun is conjunct Ketu');
  }
  // Malefics in 9th house
  let sign9 = asc + 8; if (sign9 > 12) sign9 -= 12;
  const maleficsIn9 = ['MARS', 'SATURN', 'RAHU', 'KETU'].filter(m => chartData.planets[m].rashi === sign9);
  if (maleficsIn9.length > 0) {
    indicators.push(`Malefic(s) ${maleficsIn9.join(', ')} in 9th house (Pitru Sthana)`);
  }
  // 9th lord afflicted
  const lord9 = chartData.planets[PLANET_ORDER.find(pl => {
    const r = chartData.planets[pl]?.rashi;
    return false; // simplified
  })] || null;

  return {
    isPresent: indicators.length > 0,
    indicators,
    severity: indicators.length === 0 ? 'None' : indicators.length === 1 ? 'Mild' : 'Strong',
    description: indicators.length > 0
      ? `Pitra Dosha indicators found: ${indicators.join('; ')}. This suggests ancestral karmic debts that may manifest as obstacles in father-related matters, career delays, or lack of progeny.`
      : 'No significant Pitra Dosha indicators found.',
  };
}

// Helper functions
function isBetween(deg, from, to) {
  if (from < to) return deg >= from && deg <= to;
  return deg >= from || deg <= to;
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/**
 * Run all Dosha analyses
 */
export function analyzeAllDoshas(chartData) {
  return {
    mangalDosha: analyzeMangalDosha(chartData),
    kaalSarpDosha: analyzeKaalSarpDosha(chartData),
    sadeSati: analyzeSadeSati(chartData),
    pitraDosha: analyzePitraDosha(chartData),
  };
}
