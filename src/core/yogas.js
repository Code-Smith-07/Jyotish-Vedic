/**
 * Yoga Detection Engine
 * Identifies important planetary combinations (Yogas) in a chart
 */

import { PLANET_ORDER, RASHIS, SPECIAL_ASPECTS } from './constants.js';

/**
 * Check if two signs are in kendra (1,4,7,10) relationship
 */
function isKendra(sign1, sign2) {
  let diff = Math.abs(sign1 - sign2);
  if (diff > 6) diff = 12 - diff;
  return [0, 3, 6, 9].includes(diff);
}

function isTrikona(sign1, sign2) {
  let diff = Math.abs(sign1 - sign2);
  if (diff > 6) diff = 12 - diff;
  return [0, 4, 8].includes(diff);
}

function getHouseDiff(from, to) {
  let d = to - from;
  if (d <= 0) d += 12;
  return d;
}

/**
 * Detect all Yogas in a chart
 */
export function detectYogas(chartData) {
  const yogas = [];
  const p = chartData.planets;
  const asc = chartData.ascendant.rashi;

  // === PANCHA MAHAPURUSHA YOGAS ===
  // Mars in own/exalted sign in Kendra from Lagna
  const kendraHouses = [1, 4, 7, 10];

  if (p.MARS && (p.MARS.dignity.status === 'exalted' || p.MARS.dignity.status === 'own') && kendraHouses.includes(p.MARS.house)) {
    yogas.push({ name: 'Ruchaka Yoga', planet: 'Mars', type: 'Pancha Mahapurusha', impact: 'positive',
      description: 'Mars in own/exalted sign in Kendra. Gives courage, authority, leadership, and success in military/sports/law enforcement.' });
  }
  if (p.MERCURY && (p.MERCURY.dignity.status === 'exalted' || p.MERCURY.dignity.status === 'own') && kendraHouses.includes(p.MERCURY.house)) {
    yogas.push({ name: 'Bhadra Yoga', planet: 'Mercury', type: 'Pancha Mahapurusha', impact: 'positive',
      description: 'Mercury in own/exalted sign in Kendra. Gives intelligence, eloquence, business acumen, and diplomatic skills.' });
  }
  if (p.JUPITER && (p.JUPITER.dignity.status === 'exalted' || p.JUPITER.dignity.status === 'own') && kendraHouses.includes(p.JUPITER.house)) {
    yogas.push({ name: 'Hamsa Yoga', planet: 'Jupiter', type: 'Pancha Mahapurusha', impact: 'positive',
      description: 'Jupiter in own/exalted sign in Kendra. Gives wisdom, spirituality, righteous nature, and divine blessings.' });
  }
  if (p.VENUS && (p.VENUS.dignity.status === 'exalted' || p.VENUS.dignity.status === 'own') && kendraHouses.includes(p.VENUS.house)) {
    yogas.push({ name: 'Malavya Yoga', planet: 'Venus', type: 'Pancha Mahapurusha', impact: 'positive',
      description: 'Venus in own/exalted sign in Kendra. Gives beauty, luxury, artistic talent, wealth, and marital happiness.' });
  }
  if (p.SATURN && (p.SATURN.dignity.status === 'exalted' || p.SATURN.dignity.status === 'own') && kendraHouses.includes(p.SATURN.house)) {
    yogas.push({ name: 'Shasha Yoga', planet: 'Saturn', type: 'Pancha Mahapurusha', impact: 'positive',
      description: 'Saturn in own/exalted sign in Kendra. Gives authority, discipline, political power, and command over people.' });
  }

  // === GAJA KESARI YOGA ===
  if (isKendra(p.MOON.rashi, p.JUPITER.rashi)) {
    yogas.push({ name: 'Gaja Kesari Yoga', planet: 'Moon-Jupiter', type: 'Wealth & Fame', impact: 'positive',
      description: 'Moon and Jupiter in mutual Kendra. Gives wisdom, wealth, fame, and virtuous nature. The native is respected in society.' });
  }

  // === CHANDRA-MANGAL YOGA ===
  if (p.MOON.rashi === p.MARS.rashi) {
    yogas.push({ name: 'Chandra-Mangal Yoga', planet: 'Moon-Mars', type: 'Wealth', impact: 'positive',
      description: 'Moon and Mars conjunction. Gives financial prosperity and earning capacity. The native is skilled in business.' });
  }

  // === BUDHA-ADITYA YOGA ===
  if (p.SUN.rashi === p.MERCURY.rashi && !p.MERCURY.combust) {
    yogas.push({ name: 'Budha-Aditya Yoga', planet: 'Sun-Mercury', type: 'Intelligence', impact: 'positive',
      description: 'Sun and Mercury conjunction (Mercury not combust). Gives sharp intellect, analytical mind, and communication skills.' });
  }

  // === RAJA YOGAS ===
  // Lord of Kendra + Lord of Trikona conjunction or mutual aspect
  const trikonaHouses = [1, 5, 9];
  for (const kh of kendraHouses) {
    let kendraSign = asc + kh - 1;
    if (kendraSign > 12) kendraSign -= 12;
    const kendraLord = RASHIS[kendraSign - 1].lord;
    for (const th of trikonaHouses) {
      let trikonaSign = asc + th - 1;
      if (trikonaSign > 12) trikonaSign -= 12;
      const trikonaLord = RASHIS[trikonaSign - 1].lord;
      if (kendraLord !== trikonaLord && p[kendraLord] && p[trikonaLord]) {
        if (p[kendraLord].rashi === p[trikonaLord].rashi) {
          yogas.push({ name: 'Raja Yoga', planet: `${kendraLord}-${trikonaLord}`, type: 'Raja Yoga', impact: 'positive',
            description: `Lord of ${kh}th house (${kendraLord}) conjoins lord of ${th}th house (${trikonaLord}). Gives power, authority, and rise in life.` });
        }
      }
    }
  }

  // === DHANA YOGA ===
  // Lord of 2nd and 11th in conjunction or mutual aspect
  let sign2 = asc + 1; if (sign2 > 12) sign2 -= 12;
  let sign11 = asc + 10; if (sign11 > 12) sign11 -= 12;
  const lord2 = RASHIS[sign2 - 1].lord;
  const lord11 = RASHIS[sign11 - 1].lord;
  if (lord2 !== lord11 && p[lord2] && p[lord11] && p[lord2].rashi === p[lord11].rashi) {
    yogas.push({ name: 'Dhana Yoga', planet: `${lord2}-${lord11}`, type: 'Wealth', impact: 'positive',
      description: 'Lords of 2nd and 11th house conjoined. Gives significant wealth accumulation and financial prosperity.' });
  }

  // === VIPARITA RAJA YOGA ===
  // Lords of 6, 8, 12 in 6, 8, or 12
  const dusthanaHouses = [6, 8, 12];
  const dusthanaOccupied = [];
  for (const dh of dusthanaHouses) {
    let ds = asc + dh - 1; if (ds > 12) ds -= 12;
    const lord = RASHIS[ds - 1].lord;
    if (p[lord] && dusthanaHouses.includes(p[lord].house)) {
      dusthanaOccupied.push(lord);
    }
  }
  if (dusthanaOccupied.length >= 2) {
    yogas.push({ name: 'Viparita Raja Yoga', planet: dusthanaOccupied.join('-'), type: 'Raja Yoga', impact: 'positive',
      description: 'Lords of dusthana houses (6/8/12) placed in other dusthana houses. Gives unexpected rise through adverse circumstances.' });
  }

  // === NEECHA BHANGA RAJA YOGA ===
  for (const key of PLANET_ORDER) {
    if (p[key] && p[key].dignity.status === 'debilitated') {
      const debSign = p[key].rashi;
      const signLord = RASHIS[debSign - 1].lord;
      if (p[signLord] && kendraHouses.includes(p[signLord].house)) {
        yogas.push({ name: 'Neecha Bhanga Raja Yoga', planet: key, type: 'Raja Yoga', impact: 'positive',
          description: `${key} is debilitated but its dispositor ${signLord} is in Kendra. Cancellation of debilitation — transforms weakness into strength.` });
      }
    }
  }

  // === ADHI YOGA ===
  // Benefics (Jupiter, Venus, Mercury) in 6th, 7th, 8th from Moon
  const moonRashi = p.MOON.rashi;
  const beneficsFrom6to8 = ['JUPITER', 'VENUS', 'MERCURY'].filter(b => {
    const hFromMoon = getHouseDiff(moonRashi, p[b].rashi);
    return [6, 7, 8].includes(hFromMoon);
  });
  if (beneficsFrom6to8.length >= 2) {
    yogas.push({ name: 'Adhi Yoga', planet: beneficsFrom6to8.join('-'), type: 'Power', impact: 'positive',
      description: 'Two or more benefics in 6th/7th/8th from Moon. Gives leadership, command, and political power.' });
  }

  // === SUNAPHA, ANAPHA, DURUDHARA YOGAS ===
  const planetsExceptSunNodes = ['MARS', 'MERCURY', 'JUPITER', 'VENUS', 'SATURN'];
  const h2FromMoon = planetsExceptSunNodes.filter(pl => getHouseDiff(moonRashi, p[pl].rashi) === 2);
  const h12FromMoon = planetsExceptSunNodes.filter(pl => getHouseDiff(moonRashi, p[pl].rashi) === 12);

  if (h2FromMoon.length > 0 && h12FromMoon.length === 0) {
    yogas.push({ name: 'Sunapha Yoga', planet: h2FromMoon.join(','), type: 'Lunar', impact: 'positive',
      description: 'Planets in 2nd from Moon (none in 12th). Gives self-made wealth, intelligence, and fame.' });
  }
  if (h12FromMoon.length > 0 && h2FromMoon.length === 0) {
    yogas.push({ name: 'Anapha Yoga', planet: h12FromMoon.join(','), type: 'Lunar', impact: 'positive',
      description: 'Planets in 12th from Moon (none in 2nd). Gives good health, power, and comfortable life.' });
  }
  if (h2FromMoon.length > 0 && h12FromMoon.length > 0) {
    yogas.push({ name: 'Durudhara Yoga', planet: [...h2FromMoon, ...h12FromMoon].join(','), type: 'Lunar', impact: 'positive',
      description: 'Planets on both sides of Moon (2nd and 12th). Gives wealth, vehicles, loyal servants, and generous nature.' });
  }

  // === KEMADRUMA YOGA (negative) ===
  if (h2FromMoon.length === 0 && h12FromMoon.length === 0 && !isKendra(moonRashi, asc)) {
    yogas.push({ name: 'Kemadruma Yoga', planet: 'Moon', type: 'Lunar', impact: 'negative',
      description: 'No planets in 2nd or 12th from Moon. Can indicate poverty, loneliness, and struggles — unless cancelled by other factors.' });
  }

  return yogas;
}
