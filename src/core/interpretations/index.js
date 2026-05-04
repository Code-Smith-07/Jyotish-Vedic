/**
 * Interpretations Index — Generates a complete report from chart data
 */
import { ASCENDANT_TEXTS } from './ascendant.js';
import { NAKSHATRA_TEXTS } from './nakshatra.js';
import { LIFE_PREDICTIONS } from './lifePredictions.js';
import { DASHA_PHAL } from './dasha.js';
import { PLANETS, RASHIS } from '../constants.js';

/**
 * Generate the full interpretive report for a chart
 */
export function generateFullReport(chartData, dashaData) {
  const asc = chartData.ascendant;
  const moonPlanet = chartData.planets.MOON;
  const sunPlanet = chartData.planets.SUN;

  return {
    ascendant: getAscendantReport(asc),
    nakshatra: getNakshatraReport(moonPlanet),
    lifePredictions: getLifePredictions(moonPlanet),
    dashaPredictions: getDashaPredictions(chartData, dashaData),
    planetaryInsights: getPlanetaryInsights(chartData),
  };
}

function getAscendantReport(asc) {
  const data = ASCENDANT_TEXTS[asc.rashi];
  if (!data) return null;
  return {
    title: `${data.title} — ${data.sign} Ascendant`,
    sign: data.sign,
    ...data,
  };
}

function getNakshatraReport(moonPlanet) {
  const nakName = moonPlanet.nakshatra.name;
  const data = NAKSHATRA_TEXTS[nakName];
  if (!data) return null;
  return {
    title: `${nakName} Nakshatra — ${data.deity}`,
    nakshatra: nakName,
    pada: moonPlanet.nakshatra.pada,
    moonSign: moonPlanet.rashiName,
    ...data,
  };
}

function getLifePredictions(moonPlanet) {
  const data = LIFE_PREDICTIONS[moonPlanet.rashi];
  if (!data) return null;
  return {
    title: `Life Predictions — ${moonPlanet.rashiName} Moon`,
    moonSign: moonPlanet.rashiName,
    moonSanskrit: moonPlanet.rashiSanskrit,
    sections: [
      { title: 'Career & Profession', icon: 'career', text: data.career },
      { title: 'Love & Relationships', icon: 'love', text: data.love },
      { title: 'Finance & Wealth', icon: 'finance', text: data.finance },
      { title: 'Health & Wellness', icon: 'health', text: data.health },
      { title: 'Hobbies & Interests', icon: 'hobbies', text: data.hobbies },
    ],
  };
}

function getDashaPredictions(chartData, dashaData) {
  if (!dashaData) return [];
  const predictions = [];

  for (const maha of dashaData) {
    const planetKey = maha.lord;
    const planet = chartData.planets[planetKey];
    if (!planet) continue;

    const house = planet.house;
    const phalTexts = DASHA_PHAL[planetKey];
    const text = phalTexts ? (phalTexts[house] || '') : '';

    predictions.push({
      lord: planetKey,
      lordName: PLANETS[planetKey]?.name || planetKey,
      lordSanskrit: PLANETS[planetKey]?.sanskrit || '',
      sign: planet.rashiName,
      house,
      years: maha.years,
      startDate: maha.startDate,
      endDate: maha.endDate,
      isActive: maha.isActive,
      prediction: text,
    });
  }
  return predictions;
}

function getPlanetaryInsights(chartData) {
  const insights = [];
  const benefics = ['JUPITER', 'VENUS'];
  const malefics = ['SATURN', 'MARS', 'RAHU', 'KETU'];

  for (const key of Object.keys(chartData.planets)) {
    const p = chartData.planets[key];
    const notes = [];

    if (p.dignity.status === 'exalted') notes.push(`${p.name} is exalted in ${p.rashiName} — this greatly strengthens its positive influence in your ${ordinal(p.house)} house matters.`);
    if (p.dignity.status === 'debilitated') notes.push(`${p.name} is debilitated in ${p.rashiName} — its significations in your ${ordinal(p.house)} house may face challenges. Remedial measures are recommended.`);
    if (p.dignity.status === 'own') notes.push(`${p.name} is in its own sign ${p.rashiName} — comfortable and effective in delivering ${ordinal(p.house)} house results.`);
    if (p.retrograde && key !== 'RAHU' && key !== 'KETU') notes.push(`${p.name} is retrograde — its effects are internalized and may manifest with delays but greater intensity.`);
    if (p.combust) notes.push(`${p.name} is combust (too close to Sun) — its significations may be overshadowed. Extra attention to ${ordinal(p.house)} house matters is advised.`);

    if (notes.length > 0) {
      insights.push({ planet: p.name, sanskrit: p.sanskrit, house: p.house, sign: p.rashiName, notes });
    }
  }
  return insights;
}

function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

export { ASCENDANT_TEXTS, NAKSHATRA_TEXTS, LIFE_PREDICTIONS, DASHA_PHAL };
