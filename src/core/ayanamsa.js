/**
 * Ayanamsa Calculations
 * Convert tropical to sidereal positions
 */

import { AYANAMSA_TYPES } from './constants.js';

/**
 * Calculate Lahiri (Chitrapaksha) ayanamsa for a given Julian Day
 * Based on the precession formula from the Indian Astronomical Ephemeris
 */
export function getLahiriAyanamsa(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  // Lahiri ayanamsa formula (IAE standard)
  // Reference: Ayanamsa at J2000.0 = 23.853° (23°51'11")
  const ayanamsa = 23.85 + 0.01396 * (jd - 2451545.0) / 365.25;
  // More accurate calculation
  const precession = 50.27972324 * T + 0.0222226 * T * T + 0.0000117 * T * T * T;
  return 23.85 + (precession - 50.27972324 * ((jd - 2451545.0) / 36525.0)) / 3600 +
    0.01396 * ((jd - 2451545.0) / 365.25 - T * 100);
}

/**
 * More precise Lahiri ayanamsa using Newcomb's precession
 */
export function getAyanamsa(jd, type = AYANAMSA_TYPES.LAHIRI) {
  const T = (jd - 2451545.0) / 36525.0;
  
  switch (type) {
    case AYANAMSA_TYPES.LAHIRI: {
      // Lahiri ayanamsa: Spica at 0° Libra
      // At J1900.0 = 22°27'37.7" (22.46047°)
      // Precession rate ≈ 50.29" per year
      const T1900 = (jd - 2415020.0) / 36525.0;
      const prec = 50.2564 + 0.0222 * T1900;
      return 22.46047 + (prec * T1900 * 100) / 3600;
    }
    case AYANAMSA_TYPES.RAMAN: {
      // B.V. Raman ayanamsa
      const T1900 = (jd - 2415020.0) / 36525.0;
      return 22.3608 + (50.2388 * T1900 * 100) / 3600;
    }
    case AYANAMSA_TYPES.KP: {
      // KP (Krishnamurti) ayanamsa
      const T1900 = (jd - 2415020.0) / 36525.0;
      return 22.362 + (50.2564 * T1900 * 100) / 3600;
    }
    case AYANAMSA_TYPES.YUKTESHWAR: {
      // Sri Yukteshwar ayanamsa  
      const T1900 = (jd - 2415020.0) / 36525.0;
      return 21.1722 + (50.27 * T1900 * 100) / 3600;
    }
    default:
      return getAyanamsa(jd, AYANAMSA_TYPES.LAHIRI);
  }
}

/**
 * Convert tropical longitude to sidereal longitude
 */
export function tropicalToSidereal(tropicalLon, jd, ayanamsaType = AYANAMSA_TYPES.LAHIRI) {
  const ayanamsa = getAyanamsa(jd, ayanamsaType);
  let sidereal = tropicalLon - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  if (sidereal >= 360) sidereal -= 360;
  return sidereal;
}

/**
 * Get the current ayanamsa value (for display)
 */
export function getAyanamsaValue(jd, type = AYANAMSA_TYPES.LAHIRI) {
  const ayan = getAyanamsa(jd, type);
  const deg = Math.floor(ayan);
  const min = Math.floor((ayan - deg) * 60);
  const sec = Math.round(((ayan - deg) * 60 - min) * 60);
  return { decimal: ayan, degrees: deg, minutes: min, seconds: sec };
}
