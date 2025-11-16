const swisseph = require('swisseph');
const moment = require('moment-timezone');

/**
 * Chart Calculation Service
 * Handles all Vedic astrology chart calculations using Swiss Ephemeris
 */
class ChartCalculationService {
  constructor() {
    // Initialize Swiss Ephemeris
    swisseph.swe_set_ephe_path(__dirname + '/../ephemeris');
    
    // Zodiac signs
    this.signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    
    // Planets
    this.planets = {
      SUN: swisseph.SE_SUN,
      MOON: swisseph.SE_MOON,
      MERCURY: swisseph.SE_MERCURY,
      VENUS: swisseph.SE_VENUS,
      MARS: swisseph.SE_MARS,
      JUPITER: swisseph.SE_JUPITER,
      SATURN: swisseph.SE_SATURN,
      RAHU: swisseph.SE_MEAN_NODE,
      KETU: swisseph.SE_MEAN_NODE // Ketu is 180° opposite to Rahu
    };
    
    // Nakshatras
    this.nakshatras = [
      'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
      'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
      'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
      'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
      'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];
  }

  /**
   * Calculate Julian Day from date and time
   */
  calculateJulianDay(date, time, timezone) {
    const datetime = moment.tz(`${date} ${time}`, timezone);
    const year = datetime.year();
    const month = datetime.month() + 1;
    const day = datetime.date();
    const hour = datetime.hour() + datetime.minute() / 60.0 + datetime.second() / 3600.0;
    
    const result = swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL);
    return result;
  }

  /**
   * Calculate planet positions
   */
  calculatePlanetPositions(julianDay) {
    const positions = {};
    
    for (const [name, planetId] of Object.entries(this.planets)) {
      const result = swisseph.swe_calc_ut(julianDay, planetId, swisseph.SEFLG_SWIEPH);
      
      if (result.flag !== swisseph.ERR) {
        let longitude = result.longitude;
        
        // For Ketu, add 180 degrees to Rahu
        if (name === 'KETU') {
          longitude = (longitude + 180) % 360;
        }
        
        // Apply Ayanamsa for Vedic astrology
        const ayanamsa = swisseph.swe_get_ayanamsa_ut(julianDay);
        const vedicLongitude = (longitude - ayanamsa + 360) % 360;
        
        positions[name] = {
          longitude: vedicLongitude,
          sign: this.signs[Math.floor(vedicLongitude / 30)],
          signIndex: Math.floor(vedicLongitude / 30),
          degree: vedicLongitude % 30,
          nakshatra: this.getNakshatra(vedicLongitude),
          retrograde: name !== 'SUN' && name !== 'MOON' && result.longitudeSpeed < 0
        };
      }
    }
    
    return positions;
  }

  /**
   * Get Nakshatra from longitude
   */
  getNakshatra(longitude) {
    const nakshatraIndex = Math.floor(longitude / 13.333333);
    const nakshatraLord = nakshatraIndex % 27;
    const pada = Math.floor((longitude % 13.333333) / 3.333333) + 1;
    
    return {
      name: this.nakshatras[nakshatraLord],
      pada: pada,
      lord: this.getNakshatraLord(nakshatraLord)
    };
  }

  /**
   * Get Nakshatra lord
   */
  getNakshatraLord(index) {
    const lords = ['KETU', 'VENUS', 'SUN', 'MOON', 'MARS', 'RAHU', 'JUPITER', 'SATURN', 'MERCURY'];
    return lords[index % 9];
  }

  /**
   * Calculate house cusps and Ascendant
   */
  calculateHouses(julianDay, latitude, longitude) {
    const result = swisseph.swe_houses(
      julianDay,
      latitude,
      longitude,
      'P' // Placidus house system
    );
    
    if (result.flag !== swisseph.ERR) {
      const ayanamsa = swisseph.swe_get_ayanamsa_ut(julianDay);
      
      return {
        ascendant: (result.ascendant - ayanamsa + 360) % 360,
        mc: (result.mc - ayanamsa + 360) % 360,
        houses: result.house.map(h => (h - ayanamsa + 360) % 360)
      };
    }
    
    return null;
  }

  /**
   * Generate D1 (Rasi) chart
   */
  generateD1Chart(dateOfBirth, timeOfBirth, location) {
    try {
      const julianDay = this.calculateJulianDay(
        dateOfBirth,
        timeOfBirth,
        location.timezone || 'Asia/Kolkata'
      );
      
      const planets = this.calculatePlanetPositions(julianDay);
      const houses = this.calculateHouses(julianDay, location.lat, location.lng);
      
      return {
        type: 'D1',
        name: 'Rasi Chart',
        planets: planets,
        houses: houses,
        ascendant: houses.ascendant,
        ascendantSign: this.signs[Math.floor(houses.ascendant / 30)],
        julianDay: julianDay
      };
    } catch (error) {
      throw new Error(`Chart calculation failed: ${error.message}`);
    }
  }

  /**
   * Generate D9 (Navamsa) chart
   */
  generateD9Chart(d1Chart) {
    const navamsaPlanets = {};
    
    for (const [name, position] of Object.entries(d1Chart.planets)) {
      const navamsaLongitude = (position.longitude * 9) % 360;
      
      navamsaPlanets[name] = {
        longitude: navamsaLongitude,
        sign: this.signs[Math.floor(navamsaLongitude / 30)],
        signIndex: Math.floor(navamsaLongitude / 30),
        degree: navamsaLongitude % 30
      };
    }
    
    return {
      type: 'D9',
      name: 'Navamsa Chart',
      planets: navamsaPlanets
    };
  }

  /**
   * Generate complete birth chart
   */
  async generateBirthChart(birthData) {
    const { dateOfBirth, timeOfBirth, placeOfBirth, language = 'en', system = 'vedic' } = birthData;
    
    const d1Chart = this.generateD1Chart(dateOfBirth, timeOfBirth, placeOfBirth);
    const d9Chart = this.generateD9Chart(d1Chart);
    
    return {
      id: `chart_${Date.now()}`,
      birthData: {
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
        language,
        system
      },
      charts: {
        d1: d1Chart,
        d9: d9Chart
      },
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new ChartCalculationService();
