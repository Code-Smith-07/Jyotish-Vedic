/**
 * Vedic Astrology Constants
 * Core reference data for Jyotish calculations
 */

// ============================================================
// PLANETS (NAVAGRAHAS)
// ============================================================
export const PLANETS = {
  SUN: { id: 0, name: 'Sun', sanskrit: 'Surya', symbol: '☉', color: '#f59e0b', nature: 'malefic', gender: 'male', element: 'fire' },
  MOON: { id: 1, name: 'Moon', sanskrit: 'Chandra', symbol: '☽', color: '#e2e8f0', nature: 'benefic', gender: 'female', element: 'water' },
  MARS: { id: 4, name: 'Mars', sanskrit: 'Mangal', symbol: '♂', color: '#ef4444', nature: 'malefic', gender: 'male', element: 'fire' },
  MERCURY: { id: 2, name: 'Mercury', sanskrit: 'Budh', symbol: '☿', color: '#22c55e', nature: 'neutral', gender: 'neutral', element: 'earth' },
  JUPITER: { id: 5, name: 'Jupiter', sanskrit: 'Guru', symbol: '♃', color: '#f59e0b', nature: 'benefic', gender: 'male', element: 'ether' },
  VENUS: { id: 3, name: 'Venus', sanskrit: 'Shukra', symbol: '♀', color: '#ec4899', nature: 'benefic', gender: 'female', element: 'water' },
  SATURN: { id: 6, name: 'Saturn', sanskrit: 'Shani', symbol: '♄', color: '#6366f1', nature: 'malefic', gender: 'neutral', element: 'air' },
  RAHU: { id: 10, name: 'Rahu', sanskrit: 'Rahu', symbol: '☊', color: '#8b5cf6', nature: 'malefic', gender: 'male', element: 'air' },
  KETU: { id: 11, name: 'Ketu', sanskrit: 'Ketu', symbol: '☋', color: '#a3a3a3', nature: 'malefic', gender: 'neutral', element: 'fire' },
};

// Ordered list for iteration
export const PLANET_ORDER = ['SUN', 'MOON', 'MARS', 'MERCURY', 'JUPITER', 'VENUS', 'SATURN', 'RAHU', 'KETU'];

// Ascendant pseudo-planet
export const ASCENDANT = { id: -1, name: 'Ascendant', sanskrit: 'Lagna', symbol: 'Asc', color: '#fb923c' };

// ============================================================
// ZODIAC SIGNS (RASHIS)
// ============================================================
export const RASHIS = [
  { id: 1, name: 'Aries', sanskrit: 'Mesha', symbol: '♈', lord: 'MARS', element: 'fire', quality: 'movable', gender: 'male' },
  { id: 2, name: 'Taurus', sanskrit: 'Vrishabha', symbol: '♉', lord: 'VENUS', element: 'earth', quality: 'fixed', gender: 'female' },
  { id: 3, name: 'Gemini', sanskrit: 'Mithuna', symbol: '♊', lord: 'MERCURY', element: 'air', quality: 'dual', gender: 'male' },
  { id: 4, name: 'Cancer', sanskrit: 'Karka', symbol: '♋', lord: 'MOON', element: 'water', quality: 'movable', gender: 'female' },
  { id: 5, name: 'Leo', sanskrit: 'Simha', symbol: '♌', lord: 'SUN', element: 'fire', quality: 'fixed', gender: 'male' },
  { id: 6, name: 'Virgo', sanskrit: 'Kanya', symbol: '♍', lord: 'MERCURY', element: 'earth', quality: 'dual', gender: 'female' },
  { id: 7, name: 'Libra', sanskrit: 'Tula', symbol: '♎', lord: 'VENUS', element: 'air', quality: 'movable', gender: 'male' },
  { id: 8, name: 'Scorpio', sanskrit: 'Vrischika', symbol: '♏', lord: 'MARS', element: 'water', quality: 'fixed', gender: 'female' },
  { id: 9, name: 'Sagittarius', sanskrit: 'Dhanu', symbol: '♐', lord: 'JUPITER', element: 'fire', quality: 'dual', gender: 'male' },
  { id: 10, name: 'Capricorn', sanskrit: 'Makara', symbol: '♑', lord: 'SATURN', element: 'earth', quality: 'movable', gender: 'female' },
  { id: 11, name: 'Aquarius', sanskrit: 'Kumbha', symbol: '♒', lord: 'SATURN', element: 'air', quality: 'fixed', gender: 'male' },
  { id: 12, name: 'Pisces', sanskrit: 'Meena', symbol: '♓', lord: 'JUPITER', element: 'water', quality: 'dual', gender: 'female' },
];

// ============================================================
// NAKSHATRAS (27 LUNAR MANSIONS)
// ============================================================
export const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', lord: 'KETU', deity: 'Ashwini Kumaras', symbol: 'Horse head', startDeg: 0 },
  { id: 2, name: 'Bharani', lord: 'VENUS', deity: 'Yama', symbol: 'Yoni', startDeg: 13.3333 },
  { id: 3, name: 'Krittika', lord: 'SUN', deity: 'Agni', symbol: 'Razor', startDeg: 26.6667 },
  { id: 4, name: 'Rohini', lord: 'MOON', deity: 'Brahma', symbol: 'Chariot', startDeg: 40 },
  { id: 5, name: 'Mrigashira', lord: 'MARS', deity: 'Soma', symbol: 'Deer head', startDeg: 53.3333 },
  { id: 6, name: 'Ardra', lord: 'RAHU', deity: 'Rudra', symbol: 'Teardrop', startDeg: 66.6667 },
  { id: 7, name: 'Punarvasu', lord: 'JUPITER', deity: 'Aditi', symbol: 'Bow', startDeg: 80 },
  { id: 8, name: 'Pushya', lord: 'SATURN', deity: 'Brihaspati', symbol: 'Flower', startDeg: 93.3333 },
  { id: 9, name: 'Ashlesha', lord: 'MERCURY', deity: 'Naga', symbol: 'Serpent', startDeg: 106.6667 },
  { id: 10, name: 'Magha', lord: 'KETU', deity: 'Pitris', symbol: 'Throne', startDeg: 120 },
  { id: 11, name: 'Purva Phalguni', lord: 'VENUS', deity: 'Bhaga', symbol: 'Hammock', startDeg: 133.3333 },
  { id: 12, name: 'Uttara Phalguni', lord: 'SUN', deity: 'Aryaman', symbol: 'Bed', startDeg: 146.6667 },
  { id: 13, name: 'Hasta', lord: 'MOON', deity: 'Savitar', symbol: 'Hand', startDeg: 160 },
  { id: 14, name: 'Chitra', lord: 'MARS', deity: 'Tvashtar', symbol: 'Pearl', startDeg: 173.3333 },
  { id: 15, name: 'Swati', lord: 'RAHU', deity: 'Vayu', symbol: 'Coral', startDeg: 186.6667 },
  { id: 16, name: 'Vishakha', lord: 'JUPITER', deity: 'Indra-Agni', symbol: 'Arch', startDeg: 200 },
  { id: 17, name: 'Anuradha', lord: 'SATURN', deity: 'Mitra', symbol: 'Lotus', startDeg: 213.3333 },
  { id: 18, name: 'Jyeshtha', lord: 'MERCURY', deity: 'Indra', symbol: 'Earring', startDeg: 226.6667 },
  { id: 19, name: 'Moola', lord: 'KETU', deity: 'Nirrti', symbol: 'Root', startDeg: 240 },
  { id: 20, name: 'Purva Ashadha', lord: 'VENUS', deity: 'Apas', symbol: 'Fan', startDeg: 253.3333 },
  { id: 21, name: 'Uttara Ashadha', lord: 'SUN', deity: 'Vishvadevas', symbol: 'Tusk', startDeg: 266.6667 },
  { id: 22, name: 'Shravana', lord: 'MOON', deity: 'Vishnu', symbol: 'Ear', startDeg: 280 },
  { id: 23, name: 'Dhanishta', lord: 'MARS', deity: 'Vasus', symbol: 'Drum', startDeg: 293.3333 },
  { id: 24, name: 'Shatabhisha', lord: 'RAHU', deity: 'Varuna', symbol: 'Circle', startDeg: 306.6667 },
  { id: 25, name: 'Purva Bhadrapada', lord: 'JUPITER', deity: 'Aja Ekapada', symbol: 'Sword', startDeg: 320 },
  { id: 26, name: 'Uttara Bhadrapada', lord: 'SATURN', deity: 'Ahir Budhnya', symbol: 'Twins', startDeg: 333.3333 },
  { id: 27, name: 'Revati', lord: 'MERCURY', deity: 'Pushan', symbol: 'Fish', startDeg: 346.6667 },
];

// Nakshatra span in degrees
export const NAKSHATRA_SPAN = 13.333333333; // 360/27
export const PADA_SPAN = 3.333333333; // 13.333.../4

// ============================================================
// VIMSHOTTARI DASHA PERIODS (in years)
// ============================================================
export const DASHA_YEARS = {
  KETU: 7,
  VENUS: 20,
  SUN: 6,
  MOON: 10,
  MARS: 7,
  RAHU: 18,
  JUPITER: 16,
  SATURN: 19,
  MERCURY: 17,
};

// Vimshottari Dasha order
export const DASHA_ORDER = ['KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY'];
export const TOTAL_DASHA_YEARS = 120;

// ============================================================
// PLANETARY EXALTATION & DEBILITATION
// ============================================================
export const EXALTATION = {
  SUN: { sign: 1, degree: 10 },     // Aries 10°
  MOON: { sign: 2, degree: 3 },     // Taurus 3°
  MARS: { sign: 10, degree: 28 },   // Capricorn 28°
  MERCURY: { sign: 6, degree: 15 }, // Virgo 15°
  JUPITER: { sign: 4, degree: 5 },  // Cancer 5°
  VENUS: { sign: 12, degree: 27 },  // Pisces 27°
  SATURN: { sign: 7, degree: 20 },  // Libra 20°
};

export const DEBILITATION = {
  SUN: { sign: 7, degree: 10 },     // Libra 10°
  MOON: { sign: 8, degree: 3 },     // Scorpio 3°
  MARS: { sign: 4, degree: 28 },    // Cancer 28°
  MERCURY: { sign: 12, degree: 15 },// Pisces 15°
  JUPITER: { sign: 10, degree: 5 }, // Capricorn 5°
  VENUS: { sign: 6, degree: 27 },   // Virgo 27°
  SATURN: { sign: 1, degree: 20 },  // Aries 20°
};

// Moolatrikona signs and degree ranges
export const MOOLATRIKONA = {
  SUN: { sign: 5, from: 0, to: 20 },     // Leo 0-20°
  MOON: { sign: 2, from: 3, to: 30 },     // Taurus 3-30°
  MARS: { sign: 1, from: 0, to: 12 },     // Aries 0-12°
  MERCURY: { sign: 6, from: 15, to: 20 }, // Virgo 15-20°
  JUPITER: { sign: 9, from: 0, to: 10 },  // Sagittarius 0-10°
  VENUS: { sign: 7, from: 0, to: 15 },    // Libra 0-15°
  SATURN: { sign: 11, from: 0, to: 20 },  // Aquarius 0-20°
};

// Own signs
export const OWN_SIGNS = {
  SUN: [5],
  MOON: [4],
  MARS: [1, 8],
  MERCURY: [3, 6],
  JUPITER: [9, 12],
  VENUS: [2, 7],
  SATURN: [10, 11],
  RAHU: [11],  // Traditional rulership
  KETU: [8],   // Traditional rulership
};

// ============================================================
// PLANETARY ASPECTS (DRISHTI)
// ============================================================
// All planets aspect 7th house. Special aspects:
export const SPECIAL_ASPECTS = {
  MARS: [4, 8],      // Mars aspects 4th and 8th additionally
  JUPITER: [5, 9],   // Jupiter aspects 5th and 9th additionally
  SATURN: [3, 10],   // Saturn aspects 3rd and 10th additionally
  RAHU: [5, 9],      // Same as Jupiter
  KETU: [5, 9],      // Same as Jupiter
};

// ============================================================
// PLANETARY FRIENDSHIP TABLE
// ============================================================
export const NATURAL_FRIENDS = {
  SUN: ['MOON', 'MARS', 'JUPITER'],
  MOON: ['SUN', 'MERCURY'],
  MARS: ['SUN', 'MOON', 'JUPITER'],
  MERCURY: ['SUN', 'VENUS'],
  JUPITER: ['SUN', 'MOON', 'MARS'],
  VENUS: ['MERCURY', 'SATURN'],
  SATURN: ['MERCURY', 'VENUS'],
  RAHU: ['MERCURY', 'VENUS', 'SATURN'],
  KETU: ['MARS', 'JUPITER'],
};

export const NATURAL_ENEMIES = {
  SUN: ['VENUS', 'SATURN'],
  MOON: [],
  MARS: ['MERCURY'],
  MERCURY: ['MOON'],
  JUPITER: ['MERCURY', 'VENUS'],
  VENUS: ['SUN', 'MOON'],
  SATURN: ['SUN', 'MOON', 'MARS'],
  RAHU: ['SUN', 'MOON', 'MARS'],
  KETU: ['VENUS', 'SATURN'],
};

// ============================================================
// COMBUSTION DEGREES (proximity to Sun)
// ============================================================
export const COMBUSTION_DEGREES = {
  MOON: 12,
  MARS: 17,
  MERCURY: 14,  // 12 when retrograde
  JUPITER: 11,
  VENUS: 10,    // 8 when retrograde
  SATURN: 15,
};

// ============================================================
// BHAVA / HOUSE SIGNIFICATIONS
// ============================================================
export const HOUSE_SIGNIFICATIONS = [
  null, // index 0 unused
  { name: '1st House', sanskrit: 'Lagna Bhava', keywords: 'Self, Body, Personality, Health, Appearance' },
  { name: '2nd House', sanskrit: 'Dhana Bhava', keywords: 'Wealth, Family, Speech, Food, Right Eye' },
  { name: '3rd House', sanskrit: 'Sahaja Bhava', keywords: 'Siblings, Courage, Communication, Short Travels' },
  { name: '4th House', sanskrit: 'Sukha Bhava', keywords: 'Mother, Home, Property, Vehicles, Comfort' },
  { name: '5th House', sanskrit: 'Putra Bhava', keywords: 'Children, Education, Intelligence, Romance, Creativity' },
  { name: '6th House', sanskrit: 'Ripu Bhava', keywords: 'Enemies, Disease, Debt, Service, Competition' },
  { name: '7th House', sanskrit: 'Kalatra Bhava', keywords: 'Marriage, Spouse, Partnership, Business' },
  { name: '8th House', sanskrit: 'Ayu Bhava', keywords: 'Longevity, Mystery, Inheritance, Transformation' },
  { name: '9th House', sanskrit: 'Dharma Bhava', keywords: 'Father, Luck, Religion, Higher Learning, Long Travel' },
  { name: '10th House', sanskrit: 'Karma Bhava', keywords: 'Career, Status, Authority, Fame, Actions' },
  { name: '11th House', sanskrit: 'Labha Bhava', keywords: 'Gains, Income, Friends, Wishes, Elder Siblings' },
  { name: '12th House', sanskrit: 'Vyaya Bhava', keywords: 'Loss, Expenses, Foreign, Spirituality, Liberation' },
];

// ============================================================
// TITHI DATA
// ============================================================
export const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
];

export const PAKSHA = { SHUKLA: 'Shukla (Waxing)', KRISHNA: 'Krishna (Waning)' };

// ============================================================
// YOGA (Sun-Moon combination) — 27 Yogas
// ============================================================
export const YOGAS_27 = [
  'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti'
];

// ============================================================
// KARANA — 11 Karanas
// ============================================================
export const KARANAS = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti',
  'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
];

// ============================================================
// VARA (WEEKDAY)
// ============================================================
export const VARAS = [
  { name: 'Sunday', sanskrit: 'Ravivara', lord: 'SUN' },
  { name: 'Monday', sanskrit: 'Somavara', lord: 'MOON' },
  { name: 'Tuesday', sanskrit: 'Mangalavara', lord: 'MARS' },
  { name: 'Wednesday', sanskrit: 'Budhavara', lord: 'MERCURY' },
  { name: 'Thursday', sanskrit: 'Guruvara', lord: 'JUPITER' },
  { name: 'Friday', sanskrit: 'Shukravara', lord: 'VENUS' },
  { name: 'Saturday', sanskrit: 'Shanivara', lord: 'SATURN' },
];

// ============================================================
// AYANAMSA TYPES
// ============================================================
export const AYANAMSA_TYPES = {
  LAHIRI: 1,        // Chitrapaksha — Indian standard
  RAMAN: 3,         // B.V. Raman
  KP: 5,            // Krishnamurti
  YUKTESHWAR: 7,    // Sri Yukteshwar
  TRUE_CHITRAPAKSHA: 27, // True Chitrapaksha
};

// ============================================================
// DIVISIONAL CHART DEFINITIONS
// ============================================================
export const DIVISIONAL_CHARTS = [
  { id: 'D1', name: 'Rashi', division: 1, purpose: 'Main birth chart — overall life' },
  { id: 'D2', name: 'Hora', division: 2, purpose: 'Wealth and financial prospects' },
  { id: 'D3', name: 'Drekkana', division: 3, purpose: 'Siblings, courage, and vitality' },
  { id: 'D4', name: 'Chaturthamsha', division: 4, purpose: 'Fortune and property' },
  { id: 'D7', name: 'Saptamsha', division: 7, purpose: 'Children and progeny' },
  { id: 'D9', name: 'Navamsha', division: 9, purpose: 'Marriage, dharma, and destiny' },
  { id: 'D10', name: 'Dashamsha', division: 10, purpose: 'Career and profession' },
  { id: 'D12', name: 'Dwadashamsha', division: 12, purpose: 'Parents' },
  { id: 'D16', name: 'Shodashamsha', division: 16, purpose: 'Vehicles and comforts' },
  { id: 'D20', name: 'Vimshamsha', division: 20, purpose: 'Spiritual progress' },
  { id: 'D24', name: 'Chaturvimshamsha', division: 24, purpose: 'Education and learning' },
  { id: 'D27', name: 'Saptavimshamsha', division: 27, purpose: 'Strength and stamina' },
  { id: 'D30', name: 'Trimshamsha', division: 30, purpose: 'Misfortunes and evils' },
  { id: 'D40', name: 'Khavedamsha', division: 40, purpose: 'Auspicious effects' },
  { id: 'D45', name: 'Akshavedamsha', division: 45, purpose: 'General indications' },
  { id: 'D60', name: 'Shashtiamsha', division: 60, purpose: 'Past life karma' },
];

// ============================================================
// GEMSTONE RECOMMENDATIONS
// ============================================================
export const GEMSTONES = {
  SUN: { primary: 'Ruby (Manik)', alternative: 'Garnet, Red Spinel' },
  MOON: { primary: 'Pearl (Moti)', alternative: 'Moonstone' },
  MARS: { primary: 'Red Coral (Moonga)', alternative: 'Carnelian' },
  MERCURY: { primary: 'Emerald (Panna)', alternative: 'Green Tourmaline, Peridot' },
  JUPITER: { primary: 'Yellow Sapphire (Pukhraj)', alternative: 'Topaz, Citrine' },
  VENUS: { primary: 'Diamond (Heera)', alternative: 'White Sapphire, Zircon' },
  SATURN: { primary: 'Blue Sapphire (Neelam)', alternative: 'Amethyst, Lapis Lazuli' },
  RAHU: { primary: 'Hessonite (Gomed)', alternative: 'Orange Zircon' },
  KETU: { primary: "Cat's Eye (Lehsunia)", alternative: 'Tiger Eye' },
};
