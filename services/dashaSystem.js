const moment = require('moment');

/**
 * Dasha System Service
 * Calculates Vimshottari Dasha periods (Mahadasha, Antardasha, Pratyantar Dasha)
 */
class DashaSystemService {
  constructor() {
    // Vimshottari Dasha periods in years
    this.dashaPeriods = {
      KETU: 7,
      VENUS: 20,
      SUN: 6,
      MOON: 10,
      MARS: 7,
      RAHU: 18,
      JUPITER: 16,
      SATURN: 19,
      MERCURY: 17
    };
    
    // Dasha sequence
    this.dashaSequence = ['KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY'];
    
    // Total cycle = 120 years
    this.totalCycle = 120;
  }

  /**
   * Get starting Mahadasha based on Moon's Nakshatra
   */
  getStartingMahadasha(moonNakshatra) {
    // Each Nakshatra is ruled by a planet in sequence
    const nakshatraLords = [
      'KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY',
      'KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY',
      'KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY'
    ];
    
    const nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
    
    const index = nakshatras.indexOf(moonNakshatra);
    return nakshatraLords[index];
  }

  /**
   * Calculate balance of first Mahadasha at birth
   */
  calculateBalanceOfDasha(moonLongitude, dateOfBirth) {
    // Each Nakshatra is 13°20' = 13.333333°
    const nakshatraSpan = 13.333333;
    const nakshatraIndex = Math.floor(moonLongitude / nakshatraSpan);
    const traversedInNakshatra = moonLongitude - (nakshatraIndex * nakshatraSpan);
    const remainingInNakshatra = nakshatraSpan - traversedInNakshatra;
    
    // Calculate which Dasha lord
    const lord = this.dashaSequence[nakshatraIndex % 9];
    const totalPeriod = this.dashaPeriods[lord];
    
    // Balance = (Remaining portion / Total Nakshatra) * Total Dasha Period
    const balance = (remainingInNakshatra / nakshatraSpan) * totalPeriod;
    
    return {
      lord: lord,
      balanceYears: balance,
      startDate: moment(dateOfBirth)
    };
  }

  /**
   * Generate full Mahadasha timeline from birth
   */
  generateMahadashaTimeline(birthChart, dateOfBirth) {
    const moonPosition = birthChart.charts.d1.planets.MOON;
    const balance = this.calculateBalanceOfDasha(moonPosition.longitude, dateOfBirth);
    
    const timeline = [];
    let currentDate = moment(dateOfBirth);
    let currentDashaIndex = this.dashaSequence.indexOf(balance.lord);
    
    // First Mahadasha (balance period)
    const firstEndDate = moment(currentDate).add(balance.balanceYears, 'years');
    timeline.push({
      planet: balance.lord,
      startDate: currentDate.format('YYYY-MM-DD'),
      endDate: firstEndDate.format('YYYY-MM-DD'),
      durationYears: balance.balanceYears,
      isBalance: true
    });
    
    currentDate = firstEndDate;
    
    // Generate remaining Mahadashas
    for (let i = 1; i < 9; i++) {
      currentDashaIndex = (currentDashaIndex + 1) % 9;
      const planet = this.dashaSequence[currentDashaIndex];
      const duration = this.dashaPeriods[planet];
      const endDate = moment(currentDate).add(duration, 'years');
      
      timeline.push({
        planet: planet,
        startDate: currentDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        durationYears: duration,
        isBalance: false
      });
      
      currentDate = endDate;
    }
    
    return timeline;
  }

  /**
   * Calculate Antardasha (sub-periods) for a Mahadasha
   */
  calculateAntardasha(mahadashaPlanet, mahadashaStartDate, mahadashaDuration) {
    const antardashas = [];
    let currentDate = moment(mahadashaStartDate);
    const mahadashaIndex = this.dashaSequence.indexOf(mahadashaPlanet);
    
    for (let i = 0; i < 9; i++) {
      const antardashaIndex = (mahadashaIndex + i) % 9;
      const planet = this.dashaSequence[antardashaIndex];
      
      // Antardasha duration = (Mahadasha Period × Antardasha Period) / 120
      const duration = (this.dashaPeriods[mahadashaPlanet] * this.dashaPeriods[planet]) / this.totalCycle;
      const endDate = moment(currentDate).add(duration, 'years');
      
      antardashas.push({
        planet: planet,
        startDate: currentDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        durationYears: duration,
        durationMonths: duration * 12
      });
      
      currentDate = endDate;
    }
    
    return antardashas;
  }

  /**
   * Get current running Dasha
   */
  getCurrentDasha(timeline, currentDate = new Date()) {
    const now = moment(currentDate);
    
    for (const dasha of timeline) {
      const start = moment(dasha.startDate);
      const end = moment(dasha.endDate);
      
      if (now.isBetween(start, end, null, '[]')) {
        // Calculate current Antardasha
        const antardashas = this.calculateAntardasha(
          dasha.planet,
          dasha.startDate,
          dasha.durationYears
        );
        
        let currentAntardasha = null;
        for (const antardasha of antardashas) {
          const antStart = moment(antardasha.startDate);
          const antEnd = moment(antardasha.endDate);
          
          if (now.isBetween(antStart, antEnd, null, '[]')) {
            currentAntardasha = antardasha;
            break;
          }
        }
        
        return {
          mahadasha: dasha,
          antardasha: currentAntardasha,
          allAntardashas: antardashas
        };
      }
    }
    
    return null;
  }

  /**
   * Get upcoming Dasha periods (next 6 months)
   */
  getUpcomingDashas(timeline, monthsAhead = 6) {
    const now = moment();
    const futureDate = moment().add(monthsAhead, 'months');
    const upcoming = [];
    
    for (const dasha of timeline) {
      const start = moment(dasha.startDate);
      const end = moment(dasha.endDate);
      
      // Check if this Dasha overlaps with our time range
      if (start.isBefore(futureDate) && end.isAfter(now)) {
        upcoming.push(dasha);
      }
    }
    
    return upcoming;
  }

  /**
   * Analyze Dasha impact
   */
  analyzeDashaImpact(dasha, birthChart) {
    const planet = dasha.planet;
    const planetPosition = birthChart.charts.d1.planets[planet];
    
    return {
      planet: planet,
      period: dasha,
      sign: planetPosition.sign,
      house: this.getHousePosition(planetPosition.longitude, birthChart.charts.d1.houses),
      nakshatra: planetPosition.nakshatra,
      retrograde: planetPosition.retrograde,
      strength: this.calculatePlanetStrength(planet, planetPosition, birthChart)
    };
  }

  /**
   * Get house position for a planet
   */
  getHousePosition(longitude, houses) {
    const ascendant = houses.ascendant;
    
    for (let i = 0; i < houses.houses.length; i++) {
      const currentHouse = houses.houses[i];
      const nextHouse = houses.houses[(i + 1) % 12];
      
      if (longitude >= currentHouse && longitude < nextHouse) {
        return i + 1;
      }
    }
    
    return 1; // Default to first house
  }

  /**
   * Calculate basic planet strength (simplified)
   */
  calculatePlanetStrength(planet, position, birthChart) {
    // This is a simplified strength calculation
    // In real implementation, would include: dignity, aspects, house position, etc.
    let strength = 50; // Base strength
    
    // Own sign (exaltation would be better)
    const ownSigns = {
      SUN: ['Leo'],
      MOON: ['Cancer'],
      MARS: ['Aries', 'Scorpio'],
      MERCURY: ['Gemini', 'Virgo'],
      JUPITER: ['Sagittarius', 'Pisces'],
      VENUS: ['Taurus', 'Libra'],
      SATURN: ['Capricorn', 'Aquarius']
    };
    
    if (ownSigns[planet] && ownSigns[planet].includes(position.sign)) {
      strength += 20;
    }
    
    // Retrograde planets are considered stronger
    if (position.retrograde) {
      strength += 10;
    }
    
    return Math.min(strength, 100);
  }

  /**
   * Generate complete Dasha report
   */
  async generateDashaReport(birthChart, dateOfBirth) {
    const timeline = this.generateMahadashaTimeline(birthChart, dateOfBirth);
    const current = this.getCurrentDasha(timeline);
    const upcoming = this.getUpcomingDashas(timeline);
    
    return {
      timeline: timeline,
      current: current ? {
        mahadasha: this.analyzeDashaImpact(current.mahadasha, birthChart),
        antardasha: current.antardasha ? this.analyzeDashaImpact(
          { planet: current.antardasha.planet, ...current.antardasha },
          birthChart
        ) : null
      } : null,
      upcoming: upcoming.slice(0, 3), // Next 3 periods
      generatedAt: new Date().toISOString()
    };
  }
}

module.exports = new DashaSystemService();
