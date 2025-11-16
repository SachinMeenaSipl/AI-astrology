const moment = require('moment');
const chartCalculation = require('./chartCalculation');

/**
 * Transit Engine Service
 * Calculates current planetary transits and their effects
 */
class TransitEngineService {
  constructor() {
    this.transitEffects = {
      SUN: {
        favorable: 'Increased confidence, recognition, leadership opportunities',
        challenging: 'Ego conflicts, authority issues, health concerns'
      },
      MOON: {
        favorable: 'Emotional stability, nurturing relationships, public favor',
        challenging: 'Mood swings, emotional turbulence, family issues'
      },
      MARS: {
        favorable: 'Energy boost, courage, achievement in competitions',
        challenging: 'Anger, conflicts, accidents, impulsive decisions'
      },
      MERCURY: {
        favorable: 'Clear communication, learning, business success',
        challenging: 'Miscommunication, nervousness, travel delays'
      },
      JUPITER: {
        favorable: 'Growth, wisdom, financial gains, spiritual progress',
        challenging: 'Over-optimism, excess, complacency'
      },
      VENUS: {
        favorable: 'Love, harmony, artistic success, financial gains',
        challenging: 'Relationship issues, vanity, overindulgence'
      },
      SATURN: {
        favorable: 'Discipline, structure, long-term success, maturity',
        challenging: 'Delays, obstacles, depression, losses'
      },
      RAHU: {
        favorable: 'Unexpected opportunities, innovation, foreign connections',
        challenging: 'Confusion, deception, unusual events, anxiety'
      },
      KETU: {
        favorable: 'Spiritual insights, detachment, intuitive wisdom',
        challenging: 'Isolation, lack of focus, sudden changes'
      }
    };
  }

  /**
   * Get current planetary transits
   */
  async getCurrentTransits() {
    const now = new Date();
    const location = { lat: 0, lng: 0, timezone: 'UTC' }; // Geocentric
    
    const transitChart = chartCalculation.generateD1Chart(
      moment(now).format('YYYY-MM-DD'),
      moment(now).format('HH:mm'),
      location
    );
    
    return transitChart;
  }

  /**
   * Analyze transits for a birth chart
   */
  async analyzeTransitsForChart(birthChart) {
    const currentTransits = await this.getCurrentTransits();
    const analysis = {
      date: new Date().toISOString(),
      transits: {},
      summary: '',
      alerts: [],
      opportunities: []
    };
    
    // Compare transit positions with natal positions
    for (const [planet, transitPos] of Object.entries(currentTransits.planets)) {
      const natalPos = birthChart.charts.d1.planets[planet];
      
      analysis.transits[planet] = {
        current: {
          sign: transitPos.sign,
          degree: transitPos.degree.toFixed(2),
          nakshatra: transitPos.nakshatra.name
        },
        natal: {
          sign: natalPos.sign,
          degree: natalPos.degree.toFixed(2)
        },
        aspect: this.calculateAspect(transitPos.longitude, natalPos.longitude),
        effect: this.getTransitEffect(planet, transitPos, natalPos)
      };
    }
    
    // Generate summary
    analysis.summary = this.generateTransitSummary(analysis.transits);
    
    // Identify important transits
    analysis.alerts = this.identifyAlerts(analysis.transits);
    analysis.opportunities = this.identifyOpportunities(analysis.transits);
    
    return analysis;
  }

  /**
   * Generate daily prediction based on transits
   */
  async generateDailyPrediction(birthChart) {
    const transitAnalysis = await this.analyzeTransitsForChart(birthChart);
    
    const prediction = {
      date: moment().format('YYYY-MM-DD'),
      dayOfWeek: moment().format('dddd'),
      todaysVibes: this.getTodaysVibes(transitAnalysis),
      guidance: this.getGuidance(transitAnalysis),
      luckyElements: this.getLuckyElements(transitAnalysis),
      caution: this.getCautionAreas(transitAnalysis),
      rating: this.calculateDayRating(transitAnalysis)
    };
    
    return prediction;
  }

  /**
   * Generate weekly prediction
   */
  async generateWeeklyPrediction(birthChart) {
    const startDate = moment().startOf('week');
    const predictions = [];
    
    for (let i = 0; i < 7; i++) {
      const date = moment(startDate).add(i, 'days');
      predictions.push({
        date: date.format('YYYY-MM-DD'),
        dayOfWeek: date.format('dddd'),
        briefSummary: 'Transit analysis for this day...',
        rating: Math.floor(Math.random() * 5) + 1 // Placeholder
      });
    }
    
    return {
      weekStarting: startDate.format('YYYY-MM-DD'),
      weekEnding: moment(startDate).add(6, 'days').format('YYYY-MM-DD'),
      dailyPredictions: predictions,
      weeklyTheme: 'Focus on communication and relationship building this week.',
      keyDays: ['Monday - Good for new beginnings', 'Friday - Favorable for relationships']
    };
  }

  /**
   * Generate monthly prediction
   */
  async generateMonthlyPrediction(birthChart) {
    const startDate = moment().startOf('month');
    const endDate = moment().endOf('month');
    
    return {
      month: startDate.format('MMMM YYYY'),
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      overview: 'This month brings opportunities for growth and expansion.',
      keyTransits: [
        { date: '2024-01-15', event: 'Jupiter transit - Major opportunities' },
        { date: '2024-01-20', event: 'Saturn aspect - Focus on discipline' }
      ],
      phases: [
        {
          period: 'First Week',
          theme: 'New beginnings and fresh energy',
          focus: 'Career and personal goals'
        },
        {
          period: 'Second Week',
          theme: 'Communication and networking',
          focus: 'Relationships and collaborations'
        },
        {
          period: 'Third Week',
          theme: 'Consolidation and planning',
          focus: 'Financial matters and stability'
        },
        {
          period: 'Fourth Week',
          theme: 'Completion and reflection',
          focus: 'Personal growth and spirituality'
        }
      ],
      favorableDates: this.getFavorableDatesInMonth(startDate),
      challengingDates: this.getChallengingDatesInMonth(startDate)
    };
  }

  // Helper methods
  
  calculateAspect(transitLong, natalLong) {
    const difference = Math.abs(transitLong - natalLong);
    const normalizedDiff = difference > 180 ? 360 - difference : difference;
    
    if (normalizedDiff < 10) return { type: 'Conjunction', orb: normalizedDiff };
    if (Math.abs(normalizedDiff - 60) < 10) return { type: 'Sextile', orb: Math.abs(normalizedDiff - 60) };
    if (Math.abs(normalizedDiff - 90) < 10) return { type: 'Square', orb: Math.abs(normalizedDiff - 90) };
    if (Math.abs(normalizedDiff - 120) < 10) return { type: 'Trine', orb: Math.abs(normalizedDiff - 120) };
    if (Math.abs(normalizedDiff - 180) < 10) return { type: 'Opposition', orb: Math.abs(normalizedDiff - 180) };
    
    return { type: 'None', orb: null };
  }

  getTransitEffect(planet, transitPos, natalPos) {
    // Simplified effect calculation
    return this.transitEffects[planet].favorable;
  }

  generateTransitSummary(transits) {
    return 'Current planetary transits suggest a period of growth and opportunity. Stay focused on your goals.';
  }

  identifyAlerts(transits) {
    return [
      'Saturn transit may bring some delays - practice patience',
      'Mars energy high - avoid conflicts'
    ];
  }

  identifyOpportunities(transits) {
    return [
      'Jupiter transit favorable for learning and growth',
      'Venus transit good for relationships and creativity'
    ];
  }

  getTodaysVibes(analysis) {
    return 'Positive and energetic! Good day for taking initiative and starting new projects.';
  }

  getGuidance(analysis) {
    return 'Focus on clear communication. Take time for self-care. Trust your intuition.';
  }

  getLuckyElements(analysis) {
    return {
      color: 'Blue',
      number: 7,
      direction: 'North',
      time: 'Morning (6-9 AM)'
    };
  }

  getCautionAreas(analysis) {
    return [
      'Avoid making major financial decisions',
      'Be patient in communications'
    ];
  }

  calculateDayRating(analysis) {
    return Math.floor(Math.random() * 2) + 4; // 4-5 stars (placeholder)
  }

  getFavorableDatesInMonth(startDate) {
    return ['5th', '12th', '19th', '26th'];
  }

  getChallengingDatesInMonth(startDate) {
    return ['8th', '15th', '22nd'];
  }
}

module.exports = new TransitEngineService();
