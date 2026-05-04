/**
 * Prediction Engine
 * Rule-based predictions using classical Vedic astrology texts
 */

import { PLANETS, RASHIS, HOUSE_SIGNIFICATIONS, GEMSTONES, NAKSHATRAS } from './constants.js';

/**
 * Generate house-wise predictions
 */
export function generateHousePredictions(chartData) {
  const predictions = [];
  const asc = chartData.ascendant.rashi;

  for (let house = 1; house <= 12; house++) {
    let signNum = asc + house - 1;
    if (signNum > 12) signNum -= 12;
    const sign = RASHIS[signNum - 1];
    const houseInfo = HOUSE_SIGNIFICATIONS[house];

    // Find planets in this house
    const planetsInHouse = Object.values(chartData.planets).filter(p => p.house === house);
    const planetNames = planetsInHouse.map(p => p.name);

    let interpretation = `**${houseInfo.name}** (${houseInfo.sanskrit}) — Sign: ${sign.name} (${sign.sanskrit}), Lord: ${PLANETS[sign.lord]?.name || sign.lord}\n`;
    interpretation += `*Signifies: ${houseInfo.keywords}*\n\n`;

    if (planetsInHouse.length === 0) {
      interpretation += `No planets occupy this house. Results depend on the house lord ${sign.lord}'s position and aspects received.`;
    } else {
      for (const planet of planetsInHouse) {
        interpretation += getPlanetInHouseText(planet, house, sign);
      }
    }

    predictions.push({
      house,
      sign: sign.name,
      lord: sign.lord,
      planets: planetNames,
      interpretation,
    });
  }

  return predictions;
}

/**
 * Get interpretation text for a planet in a specific house
 */
function getPlanetInHouseText(planet, house, sign) {
  const key = planet.key;
  const dignityText = planet.dignity.status !== 'neutral' ? ` (${planet.dignity.label})` : '';
  const retroText = planet.retrograde ? ' [Retrograde]' : '';

  let text = `• **${planet.name}**${dignityText}${retroText} in ${sign.name}: `;

  const houseTexts = PLANET_HOUSE_PREDICTIONS[key]?.[house];
  if (houseTexts) {
    text += houseTexts;
  } else {
    text += `${planet.name} influences the matters of the ${house}${getOrd(house)} house.`;
  }

  if (planet.dignity.status === 'exalted') {
    text += ' Being exalted, these results are greatly enhanced.';
  } else if (planet.dignity.status === 'debilitated') {
    text += ' Being debilitated, there may be challenges in these areas that require effort to overcome.';
  }

  return text + '\n';
}

/**
 * Planet in house prediction texts (classical interpretations)
 */
const PLANET_HOUSE_PREDICTIONS = {
  SUN: {
    1: 'Strong personality, leadership qualities, good health, and commanding presence. The native is ambitious and self-confident.',
    2: 'Wealth through government or authority. Strong speech but may have family tensions. Right eye may need attention.',
    3: 'Courageous and bold. Good relationship with siblings. Success in communication fields and short travels.',
    4: 'Challenges with domestic peace but gains property. Strong connection to father figure. May change residences.',
    5: 'Intelligent and creative. Success in speculation and investments. Good relationship with children. Strong leadership in education.',
    6: 'Victorious over enemies. Good health and service-oriented. May work in government or healthcare.',
    7: 'Spouse may be dominating or from a prominent family. Business partnerships may be challenging.',
    8: 'Interest in occult and mysticism. Possible inheritance. May face obstacles in career initially but transforms later.',
    9: 'Strong connection with father. Interest in spirituality and higher learning. Fortune through government or authority.',
    10: 'Excellent for career and public image. Rise to positions of authority. Government jobs favored.',
    11: 'Good income and gains. Influential friends and social circle. Wishes and desires are fulfilled.',
    12: 'Spiritual inclinations. Possible expenses on travels. May live abroad. Father relationship needs attention.',
  },
  MOON: {
    1: 'Attractive personality, emotional nature, popular in social circles. Good intuition and adaptability.',
    2: 'Wealthy and eloquent. Good family life. Fond of good food. May have fluctuating finances.',
    3: 'Brave but emotionally driven. Creative communication. Good relationship with siblings, especially sisters.',
    4: 'Happy domestic life. Close to mother. Owns property and vehicles. Emotional contentment.',
    5: 'Intelligent and creative. Emotional connection with children. Success in artistic pursuits and education.',
    6: 'Emotional challenges with health. Service-oriented. May have digestive issues. Overcomes enemies through persistence.',
    7: 'Attractive and charming spouse. Emotional marriage. Good partnerships but may be possessive.',
    8: 'Emotional turbulence. Interest in occult. Possible inheritance from mother. Health needs attention.',
    9: 'Devoted and spiritual. Good fortune and luck. Fond of pilgrimages. Strong moral values.',
    10: 'Popular in career. Public-facing roles suited. Career may involve care-giving or public service.',
    11: 'Good income and gains through social connections. Many friends. Wishes are fulfilled.',
    12: 'Spiritual and introspective. Possible travels abroad. Expenditure may be high. Sleep may be disturbed.',
  },
  MARS: {
    1: 'Strong, athletic body. Courageous and aggressive. Leadership qualities. Possible scars or marks on body.',
    2: 'Sharp and harsh speech. Family disputes possible. Wealth through effort and competition.',
    3: 'Very courageous and adventurous. Good relationship with younger siblings. Success in sports and military.',
    4: 'Property disputes possible. Domestic tension. Strong will. May change residences frequently.',
    5: 'Sharp intellect. Children may be headstrong. Good in competitive academics. Speculative gains.',
    6: 'Victorious over enemies and competition. Good health and immunity. Success in law, military, or surgery.',
    7: 'Mangal Dosha. Spouse may be aggressive. Passionate relationship. Business partnerships need care.',
    8: 'Interest in research and occult. Possible accidents. Inheritance through conflict. Transformative experiences.',
    9: 'Father may be in military/sports. Interest in philosophy through action. Travels for purpose.',
    10: 'Excellent for career in engineering, military, sports, or surgery. Ambitious and hardworking.',
    11: 'Good income through competitive fields. Influential friends. Goals achieved through effort.',
    12: 'Hidden anger. Expenditure on conflicts. May live abroad. Spiritual warrior energy.',
  },
  JUPITER: {
    1: 'Wise, optimistic, and generous personality. Good health and fortune. Natural teacher and guide.',
    2: 'Wealthy and learned. Excellent speech and family values. Knowledge of scriptures.',
    3: 'Moderate courage. Communication through teaching. Harmonious relationship with siblings.',
    4: 'Very fortunate placement. Happy home life. Good education. Property and vehicles. Mother is supportive.',
    5: 'Excellent for children and education. High intelligence. Success in creative and academic pursuits.',
    6: 'Protects from enemies and diseases. Good health. Service through knowledge and healing.',
    7: 'Fortunate marriage. Wise and supportive spouse. Successful business partnerships.',
    8: 'Long life. Interest in spirituality and the occult. May receive inheritance. Transformative wisdom.',
    9: 'Most auspicious placement. Extremely fortunate. Spiritual, learned, and righteous. Travel for pilgrimage.',
    10: 'Successful career in teaching, law, finance, or religion. Respected in society. High position.',
    11: 'Abundant gains and income. Wealthy. Fulfillment of desires. Good influential friends.',
    12: 'Spiritual liberation. Expenditure on charity. May live abroad. Divine protection in adversity.',
  },
  VENUS: {
    1: 'Attractive and charming personality. Love of beauty and arts. Comfortable life.',
    2: 'Very wealthy. Sweet speech. Good family life. Fond of luxuries and fine dining.',
    3: 'Artistic communication. Good relationship with siblings. Success in media and arts.',
    4: 'Luxurious home and vehicles. Close to mother. Beautiful surroundings. Domestic happiness.',
    5: 'Romantic nature. Creative talents. Good relationship with children. Success in entertainment.',
    6: 'Success over enemies through diplomacy. Health is generally good. May work in beauty/fashion industry.',
    7: 'Beautiful and loving spouse. Happy marriage. Successful partnerships. Social charm.',
    8: 'Inheritance possible. Interest in tantric practices. Spouse may bring wealth. Hidden desires.',
    9: 'Fortunate in love and relationships. Artistic/cultural travels. Good moral values with appreciation for beauty.',
    10: 'Career in arts, entertainment, fashion, or luxury goods. Public charm. Success through creativity.',
    11: 'Excellent gains. Wealthy through creative means. Influential and attractive friends.',
    12: 'Expenditure on luxuries and pleasures. Foreign connections. Spiritual love. Bed pleasures.',
  },
  SATURN: {
    1: 'Disciplined and hardworking. Thin body. Serious personality. Success comes through persistent effort.',
    2: 'Financial challenges early in life. Speech may be harsh. Family responsibilities. Wealth comes slowly.',
    3: 'Patient and persistent courage. Younger siblings may face challenges. Hard-working communicator.',
    4: 'Challenges in domestic life. Property matters are slow. Hardworking but happiness comes late.',
    5: 'Delays in children. Traditional education. Conservative thinking. Late success in speculations.',
    6: 'Victory over enemies through perseverance. Good health through discipline. Excellent for service.',
    7: 'Delayed marriage or older spouse. Stable but serious relationship. Business success through patience.',
    8: 'Long life but chronic health issues possible. Transformation through suffering. Research-oriented.',
    9: 'Father may face challenges. Spiritual growth through discipline. Fortune comes late but stable.',
    10: 'Excellent for career advancement. Slow but steady rise. Authority through hard work. Political success.',
    11: 'Good gains but slow accumulation. Fewer but loyal friends. Long-term financial stability.',
    12: 'Spiritual detachment. Expenditure on duties. Foreign residence possible. Liberation through service.',
  },
  RAHU: {
    1: 'Unconventional personality. Ambitious and materialistic. Foreign connections. Out-of-the-box thinking.',
    2: 'Wealth through unconventional means. Foreign food preferences. Speech may be misleading.',
    3: 'Courageous in unconventional ways. Media and technology skills. Adventurous communications.',
    4: 'Foreign residence or unusual home. Mother from different background. Technology in home.',
    5: 'Unconventional education. Speculative gains possible. Children may be unique or rebellious.',
    6: 'Excellent for overcoming enemies. Unusual health remedies. Success in foreign environments.',
    7: 'Spouse may be from different culture. Unconventional marriage. Business with foreigners.',
    8: 'Strong interest in occult and mysticism. Sudden transformations. Hidden wealth possibilities.',
    9: 'Unconventional spiritual path. Father may be foreign-connected. Travel to foreign lands.',
    10: 'Career in technology, foreign trade, or unconventional fields. Sudden career changes.',
    11: 'Gains through foreign connections and technology. Unconventional friend circle. Sudden gains.',
    12: 'Foreign residence likely. Expenditure on foreign goods. Spiritual seeking through unusual paths.',
  },
  KETU: {
    1: 'Spiritual personality. Detached from material world. Psychic abilities. Past life connections.',
    2: 'Detached from family wealth. Speech may be cryptic. Knowledge of ancient wisdom.',
    3: 'Spiritual courage. Intuitive communication. Siblings may be spiritually inclined.',
    4: 'Detached from material comforts. Spiritual home. Mother is spiritually inclined.',
    5: 'Past life knowledge. Spiritual children. Intuitive intelligence. Interest in ancient studies.',
    6: 'Freedom from enemies and diseases through spiritual practices. Unusual healing abilities.',
    7: 'Spiritual partner. Past life connection with spouse. Detachment in relationships.',
    8: 'Deep occult knowledge. Moksha yoga possible. Research into hidden subjects.',
    9: 'Strong spiritual inclination. Past life spiritual merit. Pilgrimage and renunciation.',
    10: 'Career in spiritual/healing fields. Detachment from worldly success. Service-oriented work.',
    11: 'Gains through spiritual means. Unusual friendships. Detachment from material desires.',
    12: 'Excellent for spiritual liberation (Moksha). Deep meditation. Past life karmic completion.',
  },
};

/**
 * Generate personalized recommendations
 */
export function generateRecommendations(chartData) {
  const recommendations = { gemstones: [], colors: [], numbers: [], days: [], mantras: [] };
  const ascLord = RASHIS[chartData.ascendant.rashi - 1].lord;

  // Primary gemstone for Ascendant Lord
  if (GEMSTONES[ascLord]) {
    recommendations.gemstones.push({
      planet: ascLord,
      reason: 'Ascendant Lord',
      ...GEMSTONES[ascLord],
    });
  }

  // Gemstone for weakest planet (debilitated)
  for (const [key, planet] of Object.entries(chartData.planets)) {
    if (planet.dignity?.status === 'debilitated') {
      if (GEMSTONES[key]) {
        recommendations.gemstones.push({
          planet: key,
          reason: 'Debilitated planet — needs strengthening',
          ...GEMSTONES[key],
        });
      }
    }
  }

  // Lucky colors based on ascendant
  const elementColors = {
    fire: ['Red', 'Orange', 'Saffron'],
    earth: ['Green', 'Brown', 'Yellow'],
    air: ['Blue', 'White', 'Light Green'],
    water: ['White', 'Silver', 'Cream'],
  };
  const ascElement = RASHIS[chartData.ascendant.rashi - 1].element;
  recommendations.colors = elementColors[ascElement] || ['White'];

  // Lucky numbers
  const planetNumbers = { SUN: 1, MOON: 2, JUPITER: 3, RAHU: 4, MERCURY: 5, VENUS: 6, KETU: 7, SATURN: 8, MARS: 9 };
  recommendations.numbers = [planetNumbers[ascLord], planetNumbers[chartData.planets.MOON.nakshatra.lord]];

  // Lucky days
  const planetDays = { SUN: 'Sunday', MOON: 'Monday', MARS: 'Tuesday', MERCURY: 'Wednesday', JUPITER: 'Thursday', VENUS: 'Friday', SATURN: 'Saturday' };
  recommendations.days = [planetDays[ascLord]].filter(Boolean);

  return recommendations;
}

function getOrd(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return (s[(v - 20) % 10] || s[v] || s[0]);
}
