/**
 * Nakshatra Phal — Moon Nakshatra personality & life themes
 * Based on classical texts (Brihat Samhita, Phaladeepika)
 */
export const NAKSHATRA_TEXTS = {
  'Ashwini': {
    deity: 'Ashwini Kumaras', symbol: 'Horse Head',
    personality: 'You are swift, energetic, and possess natural healing abilities. Like the celestial physicians after whom this nakshatra is named, you have an instinct for helping others recover from difficulties. You are attractive, intelligent, and always on the move.',
    traits: 'Quick-thinking, adventurous, independent, impatient, pioneering. You initiate projects with enthusiasm and prefer speed over deliberation. Your youthful energy persists throughout life.',
    life: 'Early life may have challenges but you overcome them swiftly. Success comes through initiative and bold action. You may be drawn to medicine, healing, or transportation industries. Foreign travels bring fortune.',
  },
  'Bharani': {
    deity: 'Yama (Lord of Death)', symbol: 'Yoni (Female Organ)',
    personality: 'You carry tremendous creative and transformative energy. Bharani natives are intense, passionate, and unafraid of life\'s difficult transitions. You have a strong moral compass and a sense of duty.',
    traits: 'Creative, resilient, responsible, sensual, determined. You bear heavy burdens with grace. Your artistic nature combines with practical execution. You are fiercely loyal to those you love.',
    life: 'Life involves cycles of endings and new beginnings. You may face significant transformations that ultimately strengthen you. Career success comes through creative or nurturing fields. Wealth accumulates after middle age.',
  },
  'Krittika': {
    deity: 'Agni (Fire God)', symbol: 'Razor/Flame',
    personality: 'You possess a sharp intellect and cutting clarity. Like fire, you purify and illuminate. You are determined, honest to a fault, and have a commanding presence. Your critical eye misses nothing.',
    traits: 'Sharp, ambitious, truthful, aggressive, dignified. You are a perfectionist who demands excellence. Your words carry authority. You can be harsh but are always honest.',
    life: 'Rise in status through determination and hard work. You may face opposition but overcome it through sheer willpower. Government positions and leadership roles favor you. Fame comes through achievements.',
  },
  'Rohini': {
    deity: 'Brahma (Creator)', symbol: 'Ox Cart/Chariot',
    personality: 'You are blessed with charm, beauty, and creative abundance. Rohini is considered the most fertile and productive nakshatra. You attract wealth, comfort, and admiration naturally. Your artistic sensibilities are refined.',
    traits: 'Attractive, materialistic, artistic, sensual, stable. You have excellent taste and a love for luxury. Your persuasive charm wins people over effortlessly. You are productive and goal-oriented.',
    life: 'Material prosperity comes naturally. You enjoy the finer things in life and know how to acquire them. Success in arts, agriculture, fashion, and beauty industries. Marriage brings both joy and complexity.',
  },
  'Mrigashira': {
    deity: 'Soma (Moon God)', symbol: 'Deer Head',
    personality: 'You are gentle, curious, and perpetually seeking. Like the deer, you are alert, quick, and graceful. Your quest for knowledge and new experiences drives you forward. You have a refined, intellectual nature.',
    traits: 'Curious, gentle, restless, intellectual, romantic. You are a seeker who is never fully satisfied. Your mind is always exploring new territories. You are sociable and make friends easily.',
    life: 'Travel and exploration define your journey. You may change careers or locations several times. Success comes through research, writing, or communication. Relationships require patience as you seek the ideal partner.',
  },
  'Ardra': {
    deity: 'Rudra (Storm God)', symbol: 'Teardrop/Diamond',
    personality: 'You carry the transformative power of storms — destruction followed by renewal. Ardra natives are intellectually brilliant, emotionally intense, and capable of profound breakthroughs. You challenge conventions.',
    traits: 'Intelligent, critical, transformative, emotional, powerful. You see through pretense and demand authenticity. Your emotions run deep but you can appear detached. You excel at research and analysis.',
    life: 'Life involves significant upheavals that lead to growth. You may face hardship in early life that fuels later success. Technology, research, and unconventional fields bring prosperity. After struggles, you achieve remarkable success.',
  },
  'Punarvasu': {
    deity: 'Aditi (Mother of Gods)', symbol: 'Bow and Quiver',
    personality: 'You embody renewal, optimism, and the ability to bounce back. No matter what setbacks you face, you return stronger. Your generous spirit and philosophical outlook inspire those around you.',
    traits: 'Optimistic, generous, philosophical, adaptable, wise. You have a natural teaching ability. Your resilience is remarkable. You are content with simple pleasures but capable of achieving great things.',
    life: 'After initial struggles, life improves significantly. You may live in multiple places or return to your birthplace after travels. Teaching, counseling, and spiritual pursuits bring fulfillment. Wealth comes in the latter half of life.',
  },
  'Pushya': {
    deity: 'Brihaspati (Jupiter)', symbol: 'Cow Udder/Lotus',
    personality: 'Considered the most auspicious nakshatra, you are nourishing, wise, and deeply spiritual. You possess a natural ability to nurture growth in others. Your calm wisdom and steady nature make you a pillar of strength.',
    traits: 'Nurturing, wise, charitable, conservative, protective. You are selfless in your care for others. Your judgment is sound and your advice sought by many. You respect tradition and value family.',
    life: 'Steady rise to prominence through wisdom and service. You accumulate wealth through conservative means. Family life is central to your happiness. You may serve as a counselor, teacher, or spiritual guide. Respected in community.',
  },
  'Ashlesha': {
    deity: 'Nagas (Serpent Gods)', symbol: 'Coiled Serpent',
    personality: 'You possess serpentine wisdom — cunning, intuitive, and deeply perceptive. Ashlesha natives have hypnotic charisma and penetrating intelligence. You understand human psychology instinctively.',
    traits: 'Intuitive, strategic, secretive, magnetic, independent. You keep your cards close. Your mind works on multiple levels simultaneously. You can be suspicious but your instincts are usually right.',
    life: 'Success through intelligence and strategic thinking. You may face trust issues in relationships. Occult sciences, research, politics, and psychology are favorable fields. You accumulate hidden wealth and knowledge.',
  },
  'Magha': {
    deity: 'Pitris (Ancestors)', symbol: 'Royal Throne',
    personality: 'You carry regal energy and a strong connection to lineage and tradition. Magha natives are born with authority, pride, and a sense of noblesse oblige. You command respect naturally.',
    traits: 'Royal, proud, generous, traditional, authoritative. You have natural leadership qualities. Your sense of heritage and tradition is strong. You are generous to those below you in station.',
    life: 'Authority and leadership come naturally. You may hold government positions or lead organizations. Family legacy and ancestral property are important themes. Wealth comes through position and authority.',
  },
  'Purva Phalguni': {
    deity: 'Bhaga (God of Delight)', symbol: 'Front Legs of Bed',
    personality: 'You are creative, pleasure-loving, and socially graceful. Life is meant to be enjoyed, and you embody this philosophy. Your artistic talents and warm personality make you the life of every gathering.',
    traits: 'Creative, generous, loving, carefree, artistic. You attract people with your warmth and generosity. You enjoy luxury and comfort. Your creative expression flows naturally in music, art, or performance.',
    life: 'A life blessed with comforts and pleasures. Success in creative fields, entertainment, and hospitality. Love life is active and fulfilling. You may face challenges with discipline but your charm smooths difficulties.',
  },
  'Uttara Phalguni': {
    deity: 'Aryaman (God of Patronage)', symbol: 'Back Legs of Bed',
    personality: 'You combine the pleasure of Purva Phalguni with responsibility and leadership. You are helpful, dependable, and committed to your promises. Others naturally turn to you for guidance and support.',
    traits: 'Helpful, responsible, popular, independent, wise. You form lasting friendships and partnerships. Your word is your bond. You balance enjoyment with duty effectively.',
    life: 'Success through partnerships and social connections. Government favor and institutional support aid your career. Marriage is a significant source of growth. You achieve a comfortable, respected position in society.',
  },
  'Hasta': {
    deity: 'Savitar (Sun God)', symbol: 'Open Hand',
    personality: 'You are skilled, resourceful, and magically dexterous. Hasta natives have "golden hands" — everything you touch improves. You are witty, clever, and possess remarkable manual and mental dexterity.',
    traits: 'Skillful, cunning, humorous, industrious, adaptable. Your hands create magic whether in crafts, healing, or commerce. You are quick-witted and excellent at improvisation.',
    life: 'Success through skills, craftsmanship, and cleverness. You may excel in handicrafts, surgery, writing, or any work requiring precision. International connections bring fortune. Adaptability ensures survival in any circumstance.',
  },
  'Chitra': {
    deity: 'Vishwakarma (Celestial Architect)', symbol: 'Bright Jewel',
    personality: 'You are brilliant, creative, and aesthetically gifted. Like the celestial architect, you design and build beautiful things. Your appearance is striking and you have an eye for beauty in all forms.',
    traits: 'Creative, attractive, dynamic, independent, visionary. You have a magnetic personality. Your creative output is original and impressive. You seek to leave a lasting legacy through your work.',
    life: 'Success in architecture, design, fashion, technology, or any creative field. You may live away from birthplace. Wealth comes through creative enterprise. Relationships are passionate but require compromise.',
  },
  'Swati': {
    deity: 'Vayu (Wind God)', symbol: 'Young Sprout/Coral',
    personality: 'You are independent, flexible, and blessed with a diplomatic nature. Like the wind, you are free-spirited yet gentle. Your ability to adapt to any social situation makes you successful in diverse environments.',
    traits: 'Independent, diplomatic, flexible, learned, humble. You bend but never break. Your business acumen is sharp. You maintain composure in all situations and negotiate with skill.',
    life: 'Self-made success through business acumen and social skills. International trade and foreign connections bring wealth. You may change residences frequently. Financial prosperity increases with age.',
  },
  'Vishakha': {
    deity: 'Indra-Agni', symbol: 'Triumphal Arch/Potter\'s Wheel',
    personality: 'You are single-minded in pursuit of your goals. Vishakha natives possess tremendous determination and competitive fire. Once you set your sights on a target, nothing can deter you.',
    traits: 'Determined, competitive, intelligent, jealous, energetic. Your focus is laser-sharp. You overcome all obstacles through persistence. You can be ruthless in pursuit of objectives.',
    life: 'Major success after sustained effort and competition. Leadership positions come through merit. You may face rivalry but ultimately triumph. Transformation through spiritual growth brings peace in later life.',
  },
  'Anuradha': {
    deity: 'Mitra (God of Friendship)', symbol: 'Lotus/Triumphal Gateway',
    personality: 'You are devoted, organized, and blessed with the ability to build lasting connections. Anuradha natives succeed through cooperation and devotion. You bloom beautifully even in adverse conditions, like a lotus.',
    traits: 'Devoted, organized, friendly, spiritual, resilient. You build strong networks and organizations. Your devotion to causes and people is remarkable. You overcome hardship with grace.',
    life: 'Success through devotion and organizational skills. Foreign residence or extensive travel is likely. You build successful organizations and communities. Spiritual pursuits bring deep fulfillment in mature years.',
  },
  'Jyeshtha': {
    deity: 'Indra (King of Gods)', symbol: 'Circular Amulet/Earring',
    personality: 'You are powerful, protective, and carry the energy of a chief or elder. Jyeshtha natives are natural protectors with a strong sense of duty. You bear great responsibility and possess hidden depths of courage.',
    traits: 'Protective, powerful, responsible, secretive, senior. You take charge in crises. Your courage is tested and proven. You may appear stern but care deeply about those under your protection.',
    life: 'Early hardship builds tremendous character. You rise to positions of authority and protection. Military, police, or administrative roles suit you. Wealth comes through effort and responsibility. Family duty is paramount.',
  },
  'Moola': {
    deity: 'Nirriti (Goddess of Destruction)', symbol: 'Tied Bunch of Roots',
    personality: 'You are a seeker who digs to the root of all matters. Moola natives are investigators, researchers, and truth-seekers. You are not afraid of destruction because you understand that it precedes creation.',
    traits: 'Investigative, philosophical, destructive-creative, proud, sharp. You question everything. Your penetrating intelligence finds the root cause. You may destroy old structures to build better ones.',
    life: 'Life begins with destruction of some kind — loss or upheaval that sets you on your true path. You excel in research, medicine, or spiritual pursuits. Wealth comes after overcoming initial adversity.',
  },
  'Purva Ashadha': {
    deity: 'Apas (Water God)', symbol: 'Elephant Tusk/Fan',
    personality: 'You are invincible, purifying, and filled with vitality. Purva Ashadha natives cannot be defeated — your determination and enthusiasm wear down all opposition. You purify and improve everything you touch.',
    traits: 'Invincible, purifying, energetic, proud, influential. Your conviction is unshakable. You are persuasive and influential. Your energy is contagious and your optimism unbreakable.',
    life: 'Undefeated in your chosen field. You improve and purify whatever you undertake. Success in water-related industries, counseling, or spiritual leadership. Foreign connections bring significant opportunities.',
  },
  'Uttara Ashadha': {
    deity: 'Vishvadevas (Universal Gods)', symbol: 'Elephant Tusk/Small Bed',
    personality: 'You are righteous, universal in outlook, and blessed with final victory. Uttara Ashadha natives achieve lasting success through ethical means. You have a deep sense of duty and cosmic responsibility.',
    traits: 'Righteous, responsible, universal, patient, victorious. Your success is permanent because it is built on dharma. You are respected by all communities. Your patience is legendary.',
    life: 'Gradual but permanent rise to eminence. Government and institutional roles bring success. You may serve in positions of universal benefit. Marriage to a supportive partner enhances your journey. Lasting legacy.',
  },
  'Shravana': {
    deity: 'Vishnu (Preserver)', symbol: 'Ear/Three Footsteps',
    personality: 'You are a keen listener and learner with extraordinary knowledge. Shravana natives absorb wisdom from all sources. Your patience, intelligence, and organizational skills bring you to positions of guidance.',
    traits: 'Learned, patient, organized, generous, wise. You listen before you speak. Your knowledge is vast and practical. You organize and preserve knowledge for others. Travel broadens your already wide perspective.',
    life: 'Success through knowledge, teaching, and communication. Media, publishing, and educational institutions favor you. Foreign travel enhances career. You become a repository of wisdom for your community.',
  },
  'Dhanishta': {
    deity: 'Vasus (Eight Elemental Gods)', symbol: 'Drum/Flute',
    personality: 'You are wealthy in many forms — money, talent, and social connections. Dhanishta natives are musical, generous, and socially prominent. You have natural rhythm and timing in all things.',
    traits: 'Wealthy, musical, generous, ambitious, social. You attract resources effortlessly. Your sense of timing is impeccable. You are generous with your abundance and enjoy celebrating.',
    life: 'Material prosperity and social prominence are your destiny. Music, real estate, and charitable organizations bring success. You accumulate wealth through multiple sources. Leadership in social organizations.',
  },
  'Shatabhisha': {
    deity: 'Varuna (God of Cosmic Waters)', symbol: 'Empty Circle/100 Flowers',
    personality: 'You are a healer, truth-seeker, and keeper of cosmic secrets. Shatabhisha natives are independent, secretive, and possess profound knowledge. You are drawn to the mysteries of existence.',
    traits: 'Healing, independent, secretive, philosophical, stubborn. You guard your privacy fiercely. Your healing abilities extend to both body and mind. You see what others cannot.',
    life: 'Success in medicine, technology, astronomy, and healing arts. You work best independently. Research and solitary pursuits bring breakthroughs. Wealth comes through specialized knowledge.',
  },
  'Purva Bhadrapada': {
    deity: 'Aja Ekapada (One-Footed Goat)', symbol: 'Front of Funeral Cot/Sword',
    personality: 'You are intense, transformative, and spiritually powerful. Purva Bhadrapada natives live between two worlds — material and spiritual. Your passion and intensity can be channeled into tremendous spiritual growth.',
    traits: 'Intense, passionate, philosophical, aggressive, transformative. You swing between extremes. Your spiritual potential is immense. You may appear eccentric but possess deep wisdom.',
    life: 'Life involves dramatic transformations. You may shift from material pursuit to spiritual quest. Success in teaching, writing, or philosophical work. Wealth fluctuates but spiritual growth is constant.',
  },
  'Uttara Bhadrapada': {
    deity: 'Ahir Budhnya (Serpent of the Deep)', symbol: 'Back of Funeral Cot/Twins',
    personality: 'You are wise, controlled, and blessed with deep compassion. Uttara Bhadrapada natives have achieved mastery over their impulses. You possess the wisdom of the depths and the patience of eternity.',
    traits: 'Wise, compassionate, controlled, charitable, eloquent. Your wisdom comes from depth, not breadth. You give generously without expectation. Your speech is measured and impactful.',
    life: 'Gradual attainment of wisdom and wealth. Charitable and spiritual organizations benefit from your involvement. You may be a counselor or spiritual guide. Peaceful, content later years with lasting legacy.',
  },
  'Revati': {
    deity: 'Pushan (God of Journeys)', symbol: 'Fish/Drum',
    personality: 'You are gentle, nurturing, and blessed with the ability to guide others safely through life\'s journey. Revati natives are the final nakshatra — you carry the wisdom of all 26 before you.',
    traits: 'Gentle, creative, spiritual, wealthy, compassionate. You are the protector of travelers and seekers. Your creativity flows in artistic and musical directions. You are deeply spiritual and compassionate.',
    life: 'A blessed life with comfort, creativity, and spiritual fulfillment. Success in arts, spirituality, and travel industry. You may help others find their path. Wealth comes easily and is shared generously. Peaceful end.',
  },
};
