const moment = require('moment');

/**
 * Muhurta Service
 * Finds auspicious timings for important life events
 */
class MuhurtaService {
  constructor() {
    this.activities = {
      MARRIAGE: 'Marriage Ceremony',
      TRAVEL: 'Starting Journey',
      BUSINESS: 'Business Launch',
      HOUSE: 'House Purchase/Moving',
      EDUCATION: 'Starting Education',
      JOB: 'Job Joining',
      VEHICLE: 'Vehicle Purchase',
      INVESTMENT: 'Financial Investment'
    };
    
    // Tithis (Lunar days)
    this.tithis = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ];
    
    // Nakshatras favorable for different activities
    this.favorableNakshatras = {
      MARRIAGE: ['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      TRAVEL: ['Ashwini', 'Punarvasu', 'Pushya', 'Hasta', 'Anuradha'],
      BUSINESS: ['Ashwini', 'Rohini', 'Mrigashira', 'Pushya', 'Uttara Phalguni'],
      HOUSE: ['Rohini', 'Mrigashira', 'Uttara Phalguni', 'Hasta', 'Revati'],
      EDUCATION: ['Ashwini', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra'],
      JOB: ['Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta'],
      VEHICLE: ['Ashwini', 'Pushya', 'Hasta', 'Shravana', 'Dhanishta'],
      INVESTMENT: ['Rohini', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Uttara Ashadha']
    };
    
    // Days of week favorable for activities
    this.favorableDays = {
      MARRIAGE: ['Wednesday', 'Thursday', 'Friday'],
      TRAVEL: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      BUSINESS: ['Wednesday', 'Thursday', 'Friday'],
      HOUSE: ['Wednesday', 'Friday'],
      EDUCATION: ['Wednesday', 'Thursday'],
      JOB: ['Monday', 'Wednesday', 'Thursday'],
      VEHICLE: ['Wednesday', 'Friday'],
      INVESTMENT: ['Wednesday', 'Thursday', 'Friday']
    };
  }

  /**
   * Calculate Panchang for a given date
   */
  calculatePanchang(date) {
    const momentDate = moment(date);
    
    // This is a simplified Panchang calculation
    // In production, use proper astronomical calculations
    return {
      date: momentDate.format('YYYY-MM-DD'),
      dayOfWeek: momentDate.format('dddd'),
      tithi: this.getTithiForDate(momentDate),
      nakshatra: this.getNakshatraForDate(momentDate),
      yoga: this.getYogaForDate(momentDate),
      karana: this.getKaranaForDate(momentDate),
      sunrise: '06:00',
      sunset: '18:00',
      moonrise: '19:30',
      moonset: '07:30'
    };
  }

  /**
   * Find auspicious dates for a specific activity
   */
  async findAuspiciousDates(activity, startDate, daysToSearch = 90) {
    const auspiciousDates = [];
    const start = moment(startDate);
    
    for (let i = 0; i < daysToSearch; i++) {
      const currentDate = moment(start).add(i, 'days');
      const panchang = this.calculatePanchang(currentDate);
      const score = this.calculateAuspiciousness(activity, panchang, currentDate);
      
      if (score >= 70) { // Threshold for auspicious
        auspiciousDates.push({
          date: currentDate.format('YYYY-MM-DD'),
          dayOfWeek: panchang.dayOfWeek,
          score: score,
          tithi: panchang.tithi,
          nakshatra: panchang.nakshatra,
          recommendation: this.getRecommendation(score),
          auspiciousTimes: this.getAuspiciousTimes(currentDate, activity)
        });
      }
    }
    
    // Sort by score (highest first)
    auspiciousDates.sort((a, b) => b.score - a.score);
    
    return {
      activity: this.activities[activity],
      searchPeriod: {
        start: start.format('YYYY-MM-DD'),
        end: moment(start).add(daysToSearch - 1, 'days').format('YYYY-MM-DD')
      },
      topDates: auspiciousDates.slice(0, 10),
      totalAuspiciousDays: auspiciousDates.length
    };
  }

  /**
   * Find best date for an activity
   */
  async findBestDate(activity, preferredMonth = null) {
    const startDate = preferredMonth ? 
      moment(preferredMonth, 'YYYY-MM').startOf('month') : 
      moment();
    
    const results = await this.findAuspiciousDates(activity, startDate.format('YYYY-MM-DD'), 90);
    
    if (results.topDates.length > 0) {
      return {
        activity: this.activities[activity],
        bestDate: results.topDates[0],
        alternativeDates: results.topDates.slice(1, 4),
        recommendation: this.getDetailedRecommendation(results.topDates[0], activity)
      };
    }
    
    return {
      activity: this.activities[activity],
      message: 'No highly auspicious dates found in the search period. Consider consulting an astrologer.'
    };
  }

  /**
   * Get auspicious times for a specific date
   */
  getAuspiciousTimes(date, activity) {
    // This is simplified - in production, calculate actual Muhurta based on sunrise/sunset
    const times = [
      { start: '06:00', end: '07:30', period: 'Brahma Muhurta', suitability: 'Excellent' },
      { start: '08:00', end: '09:30', period: 'Morning', suitability: 'Very Good' },
      { start: '10:30', end: '12:00', period: 'Late Morning', suitability: 'Good' },
      { start: '16:00', end: '17:30', period: 'Evening', suitability: 'Very Good' }
    ];
    
    return times;
  }

  /**
   * Calculate auspiciousness score
   */
  calculateAuspiciousness(activity, panchang, date) {
    let score = 50; // Base score
    
    // Check day of week
    if (this.favorableDays[activity] && 
        this.favorableDays[activity].includes(panchang.dayOfWeek)) {
      score += 20;
    }
    
    // Check Nakshatra
    if (this.favorableNakshatras[activity] && 
        this.favorableNakshatras[activity].includes(panchang.nakshatra)) {
      score += 30;
    }
    
    // Avoid certain tithis
    const unfavorableTithis = ['Ashtami', 'Chaturdashi', 'Amavasya'];
    if (unfavorableTithis.includes(panchang.tithi)) {
      score -= 20;
    }
    
    // Additional factors (simplified)
    const dayOfMonth = date.date();
    if ([5, 10, 15, 20, 25].includes(dayOfMonth)) {
      score += 10; // Panchak dates
    }
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get recommendation based on score
   */
  getRecommendation(score) {
    if (score >= 90) return 'Highly Auspicious';
    if (score >= 80) return 'Very Auspicious';
    if (score >= 70) return 'Auspicious';
    if (score >= 60) return 'Moderately Favorable';
    return 'Not Recommended';
  }

  /**
   * Get detailed recommendation
   */
  getDetailedRecommendation(dateInfo, activity) {
    return {
      summary: `${dateInfo.date} is an excellent day for ${this.activities[activity]}`,
      reasons: [
        `The day falls on ${dateInfo.dayOfWeek}, which is favorable`,
        `Nakshatra ${dateInfo.nakshatra} supports this activity`,
        `Auspiciousness score: ${dateInfo.score}/100`
      ],
      bestTime: dateInfo.auspiciousTimes[0],
      preparations: this.getPreparations(activity),
      rituals: this.getRituals(activity)
    };
  }

  /**
   * Get preparations for activity
   */
  getPreparations(activity) {
    const preparations = {
      MARRIAGE: [
        'Perform Ganesh puja before ceremony',
        'Arrange all ritual items in advance',
        'Ensure proper venue setup'
      ],
      TRAVEL: [
        'Check vehicle condition',
        'Plan route in advance',
        'Keep travel essentials ready'
      ],
      BUSINESS: [
        'Complete all legal documentation',
        'Perform Lakshmi puja',
        'Invite auspicious guests'
      ],
      HOUSE: [
        'Clean and purify the space',
        'Perform Vastu puja',
        'Light lamp in northeast corner'
      ],
      JOB: [
        'Wear appropriate attire',
        'Carry necessary documents',
        'Maintain positive mindset'
      ]
    };
    
    return preparations[activity] || ['General preparations apply'];
  }

  /**
   * Get recommended rituals
   */
  getRituals(activity) {
    return [
      'Light a lamp before starting',
      'Offer prayers to your chosen deity',
      'Maintain positive thoughts and environment',
      'Seek blessings from elders'
    ];
  }

  /**
   * Get Tithi for date (simplified)
   */
  getTithiForDate(date) {
    const dayOfMonth = date.date();
    const index = (dayOfMonth - 1) % 15;
    return this.tithis[index];
  }

  /**
   * Get Nakshatra for date (simplified)
   */
  getNakshatraForDate(date) {
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    
    const dayOfYear = date.dayOfYear();
    const index = Math.floor((dayOfYear * 27) / 365) % 27;
    return nakshatras[index];
  }

  /**
   * Get Yoga for date (simplified)
   */
  getYogaForDate(date) {
    const yogas = ['Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana'];
    const index = date.date() % yogas.length;
    return yogas[index];
  }

  /**
   * Get Karana for date (simplified)
   */
  getKaranaForDate(date) {
    const karanas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja'];
    const index = date.date() % karanas.length;
    return karanas[index];
  }

  /**
   * Get today's Panchang
   */
  async getTodayPanchang() {
    return this.calculatePanchang(new Date());
  }
}

module.exports = new MuhurtaService();
