/**
 * AI Interpretation Service
 * Generates natural language interpretations of astrological charts
 * Note: This is a template-based system. In production, integrate with OpenAI or similar LLM
 */
class AIInterpretationService {
  constructor() {
    this.planetMeanings = {
      SUN: {
        personality: 'confident, authoritative, and natural leader',
        career: 'government, administration, leadership roles',
        strengths: 'willpower, vitality, dignity',
        challenges: 'ego, arrogance, domineering nature'
      },
      MOON: {
        personality: 'emotional, nurturing, and intuitive',
        career: 'public relations, nursing, hospitality',
        strengths: 'empathy, adaptability, caring nature',
        challenges: 'mood swings, over-sensitivity, indecisiveness'
      },
      MARS: {
        personality: 'energetic, courageous, and action-oriented',
        career: 'military, sports, engineering, surgery',
        strengths: 'courage, determination, physical energy',
        challenges: 'aggression, impulsiveness, anger'
      },
      MERCURY: {
        personality: 'intellectual, communicative, and analytical',
        career: 'communication, writing, teaching, business',
        strengths: 'intelligence, wit, adaptability',
        challenges: 'nervousness, restlessness, overthinking'
      },
      JUPITER: {
        personality: 'optimistic, wise, and philosophical',
        career: 'teaching, law, finance, spiritual guidance',
        strengths: 'wisdom, generosity, optimism',
        challenges: 'overconfidence, excess, laziness'
      },
      VENUS: {
        personality: 'artistic, harmonious, and pleasure-loving',
        career: 'arts, beauty, fashion, entertainment',
        strengths: 'charm, creativity, diplomacy',
        challenges: 'vanity, indulgence, materialism'
      },
      SATURN: {
        personality: 'disciplined, responsible, and serious',
        career: 'law, administration, engineering, research',
        strengths: 'discipline, patience, perseverance',
        challenges: 'pessimism, rigidity, delays'
      },
      RAHU: {
        personality: 'ambitious, unconventional, and mysterious',
        career: 'technology, foreign affairs, research',
        strengths: 'innovation, ambition, intuition',
        challenges: 'confusion, obsession, illusion'
      },
      KETU: {
        personality: 'spiritual, detached, and introspective',
        career: 'spirituality, research, occult sciences',
        strengths: 'wisdom, spiritual insight, detachment',
        challenges: 'isolation, lack of direction, confusion'
      }
    };
    
    this.houseMeanings = {
      1: 'self, personality, physical appearance',
      2: 'wealth, family, speech, values',
      3: 'courage, siblings, communication, short journeys',
      4: 'mother, home, property, emotional foundation',
      5: 'children, creativity, intelligence, romance',
      6: 'health, enemies, service, daily work',
      7: 'marriage, partnerships, business',
      8: 'transformation, longevity, inheritance, occult',
      9: 'fortune, higher learning, spirituality, father',
      10: 'career, status, reputation, profession',
      11: 'gains, income, friends, aspirations',
      12: 'expenses, losses, foreign lands, spirituality'
    };
  }

  /**
   * Generate personality profile based on chart
   */
  generatePersonalityProfile(chart) {
    const ascendantSign = chart.charts.d1.ascendantSign;
    const moonSign = chart.charts.d1.planets.MOON.sign;
    const sunSign = chart.charts.d1.planets.SUN.sign;
    
    let profile = `Your personality is a unique blend of influences from your ${ascendantSign} Ascendant, `;
    profile += `${moonSign} Moon, and ${sunSign} Sun.\n\n`;
    
    profile += `**Core Personality (${ascendantSign} Rising):**\n`;
    profile += this.getAscendantDescription(ascendantSign);
    profile += `\n\n**Emotional Nature (${moonSign} Moon):**\n`;
    profile += this.getSignDescription(moonSign, 'emotional');
    profile += `\n\n**Life Purpose (${sunSign} Sun):**\n`;
    profile += this.getSignDescription(sunSign, 'purpose');
    
    return profile;
  }

  /**
   * Generate career analysis
   */
  generateCareerAnalysis(chart) {
    const tenthHouse = chart.charts.d1.houses.houses[9]; // 10th house
    const planetsIn10th = this.getPlanetsInHouse(chart, 10);
    const tenthLord = this.getHouseLord(tenthHouse);
    
    let analysis = `**Career Analysis**\n\n`;
    analysis += `Your 10th house (career and profession) is influenced by ${tenthLord}.\n\n`;
    
    if (planetsIn10th.length > 0) {
      analysis += `Planets in 10th house: ${planetsIn10th.join(', ')}\n\n`;
      planetsIn10th.forEach(planet => {
        analysis += `**${planet}**: ${this.planetMeanings[planet].career}\n`;
      });
    }
    
    analysis += `\n**Recommended Career Fields:**\n`;
    analysis += this.getCareerRecommendations(chart);
    
    return analysis;
  }

  /**
   * Generate relationship analysis
   */
  generateRelationshipAnalysis(chart) {
    const venus = chart.charts.d1.planets.VENUS;
    const seventhHouse = chart.charts.d1.houses.houses[6]; // 7th house
    
    let analysis = `**Relationship & Marriage Analysis**\n\n`;
    analysis += `Venus (planet of love) is in ${venus.sign} sign.\n`;
    analysis += `Your 7th house (marriage and partnerships) begins at ${this.getSignFromLongitude(seventhHouse)}.\n\n`;
    
    analysis += `**Relationship Style:**\n`;
    analysis += this.getRelationshipStyle(venus);
    
    analysis += `\n\n**Marriage Timing:**\n`;
    analysis += this.getMarriageTiming(chart);
    
    return analysis;
  }

  /**
   * Generate finance analysis
   */
  generateFinanceAnalysis(chart) {
    const secondHouse = chart.charts.d1.houses.houses[1]; // 2nd house
    const eleventhHouse = chart.charts.d1.houses.houses[10]; // 11th house
    
    let analysis = `**Financial Analysis**\n\n`;
    analysis += `Your 2nd house (wealth and savings) and 11th house (income and gains) are key indicators.\n\n`;
    
    const planetsIn2nd = this.getPlanetsInHouse(chart, 2);
    const planetsIn11th = this.getPlanetsInHouse(chart, 11);
    
    if (planetsIn2nd.length > 0) {
      analysis += `**Planets in 2nd house:** ${planetsIn2nd.join(', ')}\n`;
      analysis += `This indicates ${this.getWealthIndication(planetsIn2nd)}\n\n`;
    }
    
    if (planetsIn11th.length > 0) {
      analysis += `**Planets in 11th house:** ${planetsIn11th.join(', ')}\n`;
      analysis += `This suggests ${this.getIncomeIndication(planetsIn11th)}\n\n`;
    }
    
    analysis += `**Financial Advice:**\n${this.getFinancialAdvice(chart)}`;
    
    return analysis;
  }

  /**
   * Generate comprehensive life analysis
   */
  async generateComprehensiveAnalysis(chart, analysisType = 'all') {
    const analysis = {
      chartId: chart.id,
      timestamp: new Date().toISOString(),
      analyses: {}
    };
    
    if (analysisType === 'all' || analysisType === 'personality') {
      analysis.analyses.personality = this.generatePersonalityProfile(chart);
    }
    
    if (analysisType === 'all' || analysisType === 'career') {
      analysis.analyses.career = this.generateCareerAnalysis(chart);
    }
    
    if (analysisType === 'all' || analysisType === 'relationship') {
      analysis.analyses.relationship = this.generateRelationshipAnalysis(chart);
    }
    
    if (analysisType === 'all' || analysisType === 'finance') {
      analysis.analyses.finance = this.generateFinanceAnalysis(chart);
    }
    
    // Generate strengths and weaknesses
    analysis.analyses.strengths = this.identifyStrengths(chart);
    analysis.analyses.weaknesses = this.identifyWeaknesses(chart);
    
    // Life purpose indicators
    analysis.analyses.lifePurpose = this.getLifePurpose(chart);
    
    return analysis;
  }

  // Helper methods
  
  getAscendantDescription(sign) {
    const descriptions = {
      'Aries': 'You project confidence and initiative. Natural born leader with pioneering spirit.',
      'Taurus': 'You appear stable and grounded. Practical approach with strong determination.',
      'Gemini': 'You come across as communicative and versatile. Quick mind and adaptive nature.',
      'Cancer': 'You seem nurturing and protective. Emotional intelligence and caring personality.',
      'Leo': 'You radiate warmth and charisma. Natural dignity and creative self-expression.',
      'Virgo': 'You appear analytical and helpful. Attention to detail and service-oriented.',
      'Libra': 'You project harmony and charm. Diplomatic nature and appreciation for beauty.',
      'Scorpio': 'You appear intense and mysterious. Transformative power and emotional depth.',
      'Sagittarius': 'You come across as optimistic and philosophical. Love for adventure and truth.',
      'Capricorn': 'You seem responsible and ambitious. Disciplined approach and long-term vision.',
      'Aquarius': 'You appear innovative and humanitarian. Independent thinking and progressive ideals.',
      'Pisces': 'You project compassion and spirituality. Intuitive nature and artistic sensibility.'
    };
    return descriptions[sign] || '';
  }

  getSignDescription(sign, context) {
    // Simplified sign descriptions
    return `The ${sign} influence brings unique qualities to your ${context} nature.`;
  }

  getPlanetsInHouse(chart, houseNumber) {
    const houseStart = chart.charts.d1.houses.houses[houseNumber - 1];
    const houseEnd = chart.charts.d1.houses.houses[houseNumber % 12];
    const planets = [];
    
    for (const [planet, position] of Object.entries(chart.charts.d1.planets)) {
      if (position.longitude >= houseStart && position.longitude < houseEnd) {
        planets.push(planet);
      }
    }
    
    return planets;
  }

  getHouseLord(houseCusp) {
    const signIndex = Math.floor(houseCusp / 30);
    const lords = ['MARS', 'VENUS', 'MERCURY', 'MOON', 'SUN', 'MERCURY', 
                   'VENUS', 'MARS', 'JUPITER', 'SATURN', 'SATURN', 'JUPITER'];
    return lords[signIndex];
  }

  getSignFromLongitude(longitude) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(longitude / 30)];
  }

  getCareerRecommendations(chart) {
    return 'Based on your planetary positions, careers in leadership, communication, or service-oriented fields would be favorable.';
  }

  getRelationshipStyle(venus) {
    return `With Venus in ${venus.sign}, you approach relationships with care and seek harmony.`;
  }

  getMarriageTiming(chart) {
    return 'Marriage timing is best analyzed through Dasha periods and transits. Consult the Dasha timeline for specific periods.';
  }

  getWealthIndication(planets) {
    return 'strong wealth accumulation potential through disciplined savings and wise investments.';
  }

  getIncomeIndication(planets) {
    return 'multiple income sources and gains through networking and collaborations.';
  }

  getFinancialAdvice(chart) {
    return 'Focus on building steady income streams. Avoid impulsive spending. Consider long-term investments.';
  }

  identifyStrengths(chart) {
    return [
      'Strong willpower and determination',
      'Good communication abilities',
      'Natural leadership qualities',
      'Emotional intelligence'
    ];
  }

  identifyWeaknesses(chart) {
    return [
      'May be too critical at times',
      'Tendency to overthink decisions',
      'Need to balance emotions with logic'
    ];
  }

  getLifePurpose(chart) {
    const sun = chart.charts.d1.planets.SUN;
    return `Your life purpose is connected to ${sun.sign} Sun energy. Focus on developing ${sun.sign} qualities and serving others through your natural talents.`;
  }
}

module.exports = new AIInterpretationService();
