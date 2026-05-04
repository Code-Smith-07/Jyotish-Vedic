/**
 * Divisional Chart (Varga) Calculator
 * Calculates D1 through D60 divisional charts
 */

import { RASHIS } from './constants.js';

/**
 * Calculate divisional chart sign for a given sidereal longitude
 * Returns the rashi number (1-12) in the divisional chart
 */

// D1 - Rashi (main chart) - same as natal
export function calcD1(siderealLon) {
  return Math.floor(siderealLon / 30) + 1;
}

// D2 - Hora (wealth)
export function calcD2(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  if (deg < 15) {
    // First hora: odd signs → Leo, even signs → Cancer
    return sign % 2 !== 0 ? 5 : 4;
  } else {
    // Second hora: odd signs → Cancer, even signs → Leo
    return sign % 2 !== 0 ? 4 : 5;
  }
}

// D3 - Drekkana (siblings/courage)
export function calcD3(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const drekkana = Math.floor(deg / 10); // 0, 1, 2
  const offsets = [0, 4, 8]; // 1st, 5th, 9th from sign
  let result = sign + offsets[drekkana];
  if (result > 12) result -= 12;
  return result;
}

// D4 - Chaturthamsha (fortune/property)
export function calcD4(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const quarter = Math.floor(deg / 7.5); // 0, 1, 2, 3
  let result = sign + quarter * 3;
  while (result > 12) result -= 12;
  return result;
}

// D7 - Saptamsha (children)
export function calcD7(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / (30 / 7)); // 0-6
  let startSign = sign % 2 !== 0 ? sign : sign + 6;
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D9 - Navamsha (marriage/dharma) - Most important divisional chart
export function calcD9(siderealLon) {
  const totalParts = Math.floor(siderealLon / (30 / 9)); // 108 navamshas total
  const navamshaInSign = totalParts % 12;
  // Fire signs start from Aries, Earth from Cap, Air from Libra, Water from Cancer
  const sign = Math.floor(siderealLon / 30) + 1;
  const element = RASHIS[sign - 1].element;
  let startSign;
  switch (element) {
    case 'fire': startSign = 1; break;   // Aries
    case 'earth': startSign = 10; break; // Capricorn
    case 'air': startSign = 7; break;    // Libra
    case 'water': startSign = 4; break;  // Cancer
    default: startSign = 1;
  }
  const partInSign = Math.floor((siderealLon % 30) / (30 / 9));
  let result = startSign + partInSign;
  while (result > 12) result -= 12;
  return result;
}

// D10 - Dashamsha (career)
export function calcD10(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / 3); // 0-9
  let startSign = sign % 2 !== 0 ? sign : sign + 9;
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D12 - Dwadashamsha (parents)
export function calcD12(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / 2.5); // 0-11
  let result = sign + part;
  while (result > 12) result -= 12;
  return result;
}

// D16 - Shodashamsha (vehicles/comforts)
export function calcD16(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / (30 / 16));
  const element = RASHIS[sign - 1].element;
  let startSign;
  switch (element) {
    case 'fire': startSign = 1; break;
    case 'earth': startSign = 5; break;
    case 'air': startSign = 9; break;
    case 'water': startSign = 1; break;
    default: startSign = 1;
  }
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D20 - Vimshamsha (spiritual progress)
export function calcD20(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / 1.5); // 0-19
  const element = RASHIS[sign - 1].element;
  let startSign;
  switch (element) {
    case 'fire': startSign = 1; break;
    case 'earth': startSign = 9; break;
    case 'air': startSign = 5; break;
    case 'water': startSign = 1; break;
    default: startSign = 1;
  }
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D24 - Chaturvimshamsha (education)
export function calcD24(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / 1.25); // 0-23
  let startSign = sign % 2 !== 0 ? 5 : 4; // Leo for odd, Cancer for even
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D27 - Saptavimshamsha (strength)
export function calcD27(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / (30 / 27));
  const element = RASHIS[sign - 1].element;
  let startSign;
  switch (element) {
    case 'fire': startSign = 1; break;
    case 'earth': startSign = 4; break;
    case 'air': startSign = 7; break;
    case 'water': startSign = 10; break;
    default: startSign = 1;
  }
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D30 - Trimshamsha (misfortunes)
export function calcD30(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const isOdd = sign % 2 !== 0;
  if (isOdd) {
    if (deg < 5) return 1;       // Mars (Aries)
    if (deg < 10) return 11;     // Saturn (Aquarius)
    if (deg < 18) return 9;      // Jupiter (Sagittarius)
    if (deg < 25) return 3;      // Mercury (Gemini)
    return 7;                     // Venus (Libra)
  } else {
    if (deg < 5) return 2;       // Venus (Taurus)
    if (deg < 12) return 6;      // Mercury (Virgo)
    if (deg < 20) return 12;     // Jupiter (Pisces)
    if (deg < 25) return 10;     // Saturn (Capricorn)
    return 8;                     // Mars (Scorpio)
  }
}

// D40 - Khavedamsha (auspicious effects)
export function calcD40(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / 0.75);
  let startSign = sign % 2 !== 0 ? 1 : 7; // Aries for odd, Libra for even
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D45 - Akshavedamsha (general indications)
export function calcD45(siderealLon) {
  const sign = Math.floor(siderealLon / 30) + 1;
  const deg = siderealLon % 30;
  const part = Math.floor(deg / (30 / 45));
  const element = RASHIS[sign - 1].element;
  let startSign;
  switch (element) {
    case 'fire': startSign = 1; break;
    case 'earth': startSign = 5; break;
    case 'air': startSign = 1; break;
    case 'water': startSign = 5; break;
    default: startSign = 1;
  }
  let result = startSign + part;
  while (result > 12) result -= 12;
  return result;
}

// D60 - Shashtiamsha (past life karma)
export function calcD60(siderealLon) {
  const deg = siderealLon % 30;
  const part = Math.floor(deg / 0.5); // 0-59
  let result = (part % 12) + 1;
  return result;
}

/**
 * Calculate all divisional chart positions for a single planet
 */
export function getAllDivisionalPositions(siderealLon) {
  return {
    D1: calcD1(siderealLon),
    D2: calcD2(siderealLon),
    D3: calcD3(siderealLon),
    D4: calcD4(siderealLon),
    D7: calcD7(siderealLon),
    D9: calcD9(siderealLon),
    D10: calcD10(siderealLon),
    D12: calcD12(siderealLon),
    D16: calcD16(siderealLon),
    D20: calcD20(siderealLon),
    D24: calcD24(siderealLon),
    D27: calcD27(siderealLon),
    D30: calcD30(siderealLon),
    D40: calcD40(siderealLon),
    D45: calcD45(siderealLon),
    D60: calcD60(siderealLon),
  };
}

/**
 * Build a complete divisional chart for all planets
 */
export function buildDivisionalChart(chartData, division) {
  const calcFn = {
    D1: calcD1, D2: calcD2, D3: calcD3, D4: calcD4, D7: calcD7,
    D9: calcD9, D10: calcD10, D12: calcD12, D16: calcD16,
    D20: calcD20, D24: calcD24, D27: calcD27, D30: calcD30,
    D40: calcD40, D45: calcD45, D60: calcD60,
  }[division];

  if (!calcFn) return null;

  const result = { division, ascendant: null, planets: {} };

  // Ascendant in divisional chart
  result.ascendant = calcFn(chartData.ascendant.sidereal);

  // Each planet
  for (const [key, planet] of Object.entries(chartData.planets)) {
    const divSign = calcFn(planet.sidereal);
    let house = divSign - result.ascendant + 1;
    if (house <= 0) house += 12;
    result.planets[key] = {
      key,
      name: planet.name,
      sanskrit: planet.sanskrit,
      symbol: planet.symbol,
      color: planet.color,
      sign: divSign,
      signName: RASHIS[divSign - 1].name,
      signSanskrit: RASHIS[divSign - 1].sanskrit,
      house,
      retrograde: planet.retrograde,
    };
  }

  return result;
}
