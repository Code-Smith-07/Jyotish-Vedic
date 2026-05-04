/**
 * Vimshottari Dasha Calculator
 * Calculates Mahadasha, Antardasha, and Pratyantardasha periods
 */

import { DASHA_YEARS, DASHA_ORDER, TOTAL_DASHA_YEARS, NAKSHATRAS, NAKSHATRA_SPAN } from './constants.js';

/**
 * Calculate the starting Dasha lord from Moon's nakshatra
 */
function getDashaLordFromNakshatra(moonSidereal) {
  const nkIndex = Math.floor(moonSidereal / NAKSHATRA_SPAN);
  const nakshatra = NAKSHATRAS[nkIndex];
  return nakshatra.lord; // This is the starting Mahadasha lord
}

/**
 * Calculate the balance of Dasha at birth
 * (How much of the first Mahadasha is remaining at birth)
 */
function getDashaBalance(moonSidereal) {
  const nkIndex = Math.floor(moonSidereal / NAKSHATRA_SPAN);
  const degInNakshatra = moonSidereal - (nkIndex * NAKSHATRA_SPAN);
  const traversed = degInNakshatra / NAKSHATRA_SPAN; // fraction traversed
  const balance = 1 - traversed; // fraction remaining
  return balance;
}

/**
 * Get the index of a planet in the Dasha order
 */
function getDashaIndex(planet) {
  return DASHA_ORDER.indexOf(planet);
}

/**
 * Calculate complete Vimshottari Dasha periods
 * Returns Mahadasha → Antardasha → Pratyantardasha (3 levels)
 */
export function calculateVimshottariDasha(moonSidereal, birthDate) {
  const startLord = getDashaLordFromNakshatra(moonSidereal);
  const balance = getDashaBalance(moonSidereal);
  const startIndex = getDashaIndex(startLord);

  const mahadashas = [];
  let currentDate = new Date(birthDate);

  // First Mahadasha (partial - only remaining balance)
  for (let i = 0; i < 9; i++) {
    const dIndex = (startIndex + i) % 9;
    const lord = DASHA_ORDER[dIndex];
    const totalYears = DASHA_YEARS[lord];
    const years = i === 0 ? totalYears * balance : totalYears;
    const daysInPeriod = years * 365.25;

    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate.getTime() + daysInPeriod * 86400000);

    // Calculate Antardashas within this Mahadasha
    const antardashas = calculateAntardashas(lord, startDate, endDate);

    mahadashas.push({
      lord,
      years: totalYears,
      actualYears: years,
      startDate,
      endDate,
      antardashas,
      isActive: false, // will be set later
    });

    currentDate = endDate;
  }

  // Mark active periods
  const now = new Date();
  markActiveperiods(mahadashas, now);

  return mahadashas;
}

/**
 * Calculate Antardashas (sub-periods) within a Mahadasha
 */
function calculateAntardashas(mahaLord, mahaStart, mahaEnd) {
  const mahaIndex = getDashaIndex(mahaLord);
  const totalDays = (mahaEnd - mahaStart) / 86400000;
  const antardashas = [];
  let currentDate = new Date(mahaStart);

  for (let i = 0; i < 9; i++) {
    const aIndex = (mahaIndex + i) % 9;
    const lord = DASHA_ORDER[aIndex];
    // Antardasha duration = (Maha years × Antar years / 120) applied to actual period
    const proportion = DASHA_YEARS[lord] / TOTAL_DASHA_YEARS;
    const daysInPeriod = totalDays * proportion;

    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate.getTime() + daysInPeriod * 86400000);

    // Calculate Pratyantardashas
    const pratyantardashas = calculatePratyantardashas(lord, startDate, endDate);

    antardashas.push({
      lord,
      startDate,
      endDate,
      pratyantardashas,
      isActive: false,
    });

    currentDate = endDate;
  }

  return antardashas;
}

/**
 * Calculate Pratyantardashas (sub-sub-periods)
 */
function calculatePratyantardashas(antarLord, antarStart, antarEnd) {
  const antarIndex = getDashaIndex(antarLord);
  const totalDays = (antarEnd - antarStart) / 86400000;
  const pratyantardashas = [];
  let currentDate = new Date(antarStart);

  for (let i = 0; i < 9; i++) {
    const pIndex = (antarIndex + i) % 9;
    const lord = DASHA_ORDER[pIndex];
    const proportion = DASHA_YEARS[lord] / TOTAL_DASHA_YEARS;
    const daysInPeriod = totalDays * proportion;

    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate.getTime() + daysInPeriod * 86400000);

    pratyantardashas.push({ lord, startDate, endDate, isActive: false });
    currentDate = endDate;
  }

  return pratyantardashas;
}

/**
 * Mark active Dasha periods based on current date
 */
function markActiveperiods(mahadashas, now) {
  for (const maha of mahadashas) {
    if (now >= maha.startDate && now <= maha.endDate) {
      maha.isActive = true;
      for (const antar of maha.antardashas) {
        if (now >= antar.startDate && now <= antar.endDate) {
          antar.isActive = true;
          for (const prat of antar.pratyantardashas) {
            if (now >= prat.startDate && now <= prat.endDate) {
              prat.isActive = true;
            }
          }
        }
      }
    }
  }
}

/**
 * Get the current active dasha period
 */
export function getCurrentDasha(mahadashas) {
  const now = new Date();
  for (const maha of mahadashas) {
    if (now >= maha.startDate && now <= maha.endDate) {
      for (const antar of maha.antardashas) {
        if (now >= antar.startDate && now <= antar.endDate) {
          for (const prat of antar.pratyantardashas) {
            if (now >= prat.startDate && now <= prat.endDate) {
              return {
                mahadasha: maha.lord,
                antardasha: antar.lord,
                pratyantardasha: prat.lord,
                mahaEnd: maha.endDate,
                antarEnd: antar.endDate,
                pratEnd: prat.endDate,
              };
            }
          }
          return { mahadasha: maha.lord, antardasha: antar.lord, pratyantardasha: null };
        }
      }
      return { mahadasha: maha.lord, antardasha: null, pratyantardasha: null };
    }
  }
  return null;
}

/**
 * Format date for display
 */
export function formatDashaDate(date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
