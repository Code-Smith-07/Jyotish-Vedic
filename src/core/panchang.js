/**
 * Panchang Calculator
 * Calculates Tithi, Nakshatra, Yoga, Karana, Vara, and auspicious times
 */

import { dateToJD, julianCenturies, sunLongitude, moonLongitude, calcSunrise } from './ephemeris.js';
import { tropicalToSidereal } from './ayanamsa.js';
import { TITHIS, PAKSHA, YOGAS_27, KARANAS, VARAS, AYANAMSA_TYPES } from './constants.js';
import { getNakshatra } from './planets.js';
import * as Astronomy from 'astronomy-engine';

/**
 * Calculate Panchang for a given date and location
 */
export function calculatePanchang(date, latitude, longitude, timezone, ayanamsaType = AYANAMSA_TYPES.LAHIRI) {
  const utcDate = new Date(date.getTime() - timezone * 3600000);
  const jd = dateToJD(utcDate);
  const observer = new Astronomy.Observer(latitude, longitude, 0);

  // Get tropical longitudes using astronomy-engine
  const sunTrop = sunLongitude(utcDate, observer);
  const moonTrop = moonLongitude(utcDate, observer);

  // Convert to sidereal
  const sunSid = tropicalToSidereal(sunTrop, jd, ayanamsaType);
  const moonSid = tropicalToSidereal(moonTrop, jd, ayanamsaType);

  // === TITHI ===
  let moonSunDiff = moonTrop - sunTrop;
  if (moonSunDiff < 0) moonSunDiff += 360;
  const tithiNum = Math.floor(moonSunDiff / 12) + 1;
  const tithiIndex = ((tithiNum - 1) % 15);
  const paksha = tithiNum <= 15 ? PAKSHA.SHUKLA : PAKSHA.KRISHNA;
  const tithi = {
    number: tithiNum,
    name: TITHIS[tithiIndex],
    paksha,
    percentComplete: ((moonSunDiff % 12) / 12) * 100,
  };

  // === NAKSHATRA (Moon's) ===
  const nakshatra = getNakshatra(moonSid);

  // === YOGA (Sun + Moon) ===
  let sunMoonSum = sunSid + moonSid;
  if (sunMoonSum >= 360) sunMoonSum -= 360;
  const yogaNum = Math.floor(sunMoonSum / (360 / 27));
  const yoga = {
    number: yogaNum + 1,
    name: YOGAS_27[yogaNum] || 'Unknown',
  };

  // === KARANA ===
  const karanaNum = Math.floor(moonSunDiff / 6);
  let karanaName;
  if (karanaNum === 0) karanaName = KARANAS[10]; // Kimstughna
  else if (karanaNum >= 57) karanaName = KARANAS[7 + (karanaNum - 57)]; // Fixed karanas
  else karanaName = KARANAS[(karanaNum - 1) % 7];
  const karana = { number: karanaNum + 1, name: karanaName };

  // === VARA (Weekday) ===
  const dayOfWeek = date.getDay();
  const vara = VARAS[dayOfWeek];

  // === SUNRISE / SUNSET (using astronomy-engine) ===
  let sunrise = null, sunset = null;
  const sunTimes = calcSunrise(utcDate, latitude, longitude);
  if (sunTimes) {
    sunrise = sunTimes.sunrise ? new Date(sunTimes.sunrise.getTime() + timezone * 3600000) : null;
    sunset = sunTimes.sunset ? new Date(sunTimes.sunset.getTime() + timezone * 3600000) : null;
  }

  // === RAHU KALAM ===
  const rahuKalam = calculateRahuKalam(dayOfWeek, sunrise, sunset);

  // === GULIKA KALAM ===
  const gulikaKalam = calculateGulikaKalam(dayOfWeek, sunrise, sunset);

  // === YAMAGANDAM ===
  const yamagandam = calculateYamagandam(dayOfWeek, sunrise, sunset);

  // === ABHIJIT MUHURTA ===
  const abhijitMuhurta = calculateAbhijitMuhurta(sunrise, sunset);

  return {
    tithi,
    nakshatra,
    yoga,
    karana,
    vara,
    sunrise,
    sunset,
    rahuKalam,
    gulikaKalam,
    yamagandam,
    abhijitMuhurta,
    sunSidereal: sunSid,
    moonSidereal: moonSid,
  };
}

function calculateRahuKalam(dayOfWeek, sunrise, sunset) {
  if (!sunrise || !sunset) return null;
  const slots = [8, 2, 7, 5, 6, 4, 1];
  const slot = slots[dayOfWeek];
  const duration = (sunset.getTime() - sunrise.getTime()) / 8;
  const start = new Date(sunrise.getTime() + (slot - 1) * duration);
  const end = new Date(start.getTime() + duration);
  return { start, end };
}

function calculateGulikaKalam(dayOfWeek, sunrise, sunset) {
  if (!sunrise || !sunset) return null;
  const slots = [7, 6, 5, 4, 3, 2, 1];
  const slot = slots[dayOfWeek];
  const duration = (sunset.getTime() - sunrise.getTime()) / 8;
  const start = new Date(sunrise.getTime() + (slot - 1) * duration);
  const end = new Date(start.getTime() + duration);
  return { start, end };
}

function calculateYamagandam(dayOfWeek, sunrise, sunset) {
  if (!sunrise || !sunset) return null;
  const slots = [5, 4, 3, 2, 1, 7, 6];
  const slot = slots[dayOfWeek];
  const duration = (sunset.getTime() - sunrise.getTime()) / 8;
  const start = new Date(sunrise.getTime() + (slot - 1) * duration);
  const end = new Date(start.getTime() + duration);
  return { start, end };
}

function calculateAbhijitMuhurta(sunrise, sunset) {
  if (!sunrise || !sunset) return null;
  const dayLength = sunset.getTime() - sunrise.getTime();
  const muhurtaDuration = dayLength / 15;
  const start = new Date(sunrise.getTime() + 7 * muhurtaDuration);
  const end = new Date(start.getTime() + muhurtaDuration);
  return { start, end };
}

/**
 * Format time for display
 */
export function formatPanchangTime(date) {
  if (!date) return 'N/A';
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}
