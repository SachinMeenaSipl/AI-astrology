/**
 * Panchang Utilities
 * Helper functions for Vedic calendar calculations
 */

/**
 * Get Tithi name from index
 */
function getTithiName(index) {
  const tithis = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
  ];
  return tithis[index % 15];
}

/**
 * Get Nakshatra name from index
 */
function getNakshatraName(index) {
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  return nakshatras[index % 27];
}

/**
 * Get day of week in Sanskrit
 */
function getSanskritDayName(dayIndex) {
  const days = [
    'Ravivara',    // Sunday
    'Somavara',    // Monday
    'Mangalavara', // Tuesday
    'Budhavara',   // Wednesday
    'Guruvara',    // Thursday
    'Shukravara',  // Friday
    'Shanivara'    // Saturday
  ];
  return days[dayIndex];
}

/**
 * Check if date is auspicious for general activities
 */
function isGenerallyAuspicious(tithi, nakshatra, dayOfWeek) {
  // Avoid certain tithis
  const inauspiciousTithis = ['Ashtami', 'Chaturdashi', 'Amavasya'];
  if (inauspiciousTithis.includes(tithi)) {
    return false;
  }
  
  // Avoid certain days for specific activities
  const inauspiciousDays = ['Saturday']; // For starting new ventures
  if (inauspiciousDays.includes(dayOfWeek)) {
    return false;
  }
  
  return true;
}

/**
 * Get Nakshatra lord
 */
function getNakshatraLord(nakshatraName) {
  const lords = {
    'Ashwini': 'Ketu',
    'Bharani': 'Venus',
    'Krittika': 'Sun',
    'Rohini': 'Moon',
    'Mrigashira': 'Mars',
    'Ardra': 'Rahu',
    'Punarvasu': 'Jupiter',
    'Pushya': 'Saturn',
    'Ashlesha': 'Mercury',
    'Magha': 'Ketu',
    'Purva Phalguni': 'Venus',
    'Uttara Phalguni': 'Sun',
    'Hasta': 'Moon',
    'Chitra': 'Mars',
    'Swati': 'Rahu',
    'Vishakha': 'Jupiter',
    'Anuradha': 'Saturn',
    'Jyeshtha': 'Mercury',
    'Mula': 'Ketu',
    'Purva Ashadha': 'Venus',
    'Uttara Ashadha': 'Sun',
    'Shravana': 'Moon',
    'Dhanishta': 'Mars',
    'Shatabhisha': 'Rahu',
    'Purva Bhadrapada': 'Jupiter',
    'Uttara Bhadrapada': 'Saturn',
    'Revati': 'Mercury'
  };
  return lords[nakshatraName] || 'Unknown';
}

/**
 * Calculate Vara (weekday) strength
 */
function getVaraStrength(dayOfWeek) {
  const strength = {
    'Sunday': 85,    // Sun's day - good for authority
    'Monday': 80,    // Moon's day - good for emotions
    'Tuesday': 75,   // Mars day - good for action
    'Wednesday': 90, // Mercury day - good for communication
    'Thursday': 95,  // Jupiter day - most auspicious
    'Friday': 85,    // Venus day - good for arts
    'Saturday': 60   // Saturn day - for hard work
  };
  return strength[dayOfWeek] || 70;
}

/**
 * Get Rashi (zodiac sign) name from index
 */
function getRashiName(index) {
  const rashis = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)',
    'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
    'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)',
    'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];
  return rashis[index % 12];
}

module.exports = {
  getTithiName,
  getNakshatraName,
  getSanskritDayName,
  isGenerallyAuspicious,
  getNakshatraLord,
  getVaraStrength,
  getRashiName
};
