/**
 * Validation Utilities
 * Common validation functions for user input
 */

/**
 * Validate date format (YYYY-MM-DD)
 */
function validateDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

/**
 * Validate time format (HH:MM)
 */
function validateTime(timeString) {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
}

/**
 * Validate latitude (-90 to 90)
 */
function validateLatitude(lat) {
  const latitude = parseFloat(lat);
  return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
}

/**
 * Validate longitude (-180 to 180)
 */
function validateLongitude(lng) {
  const longitude = parseFloat(lng);
  return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
}

/**
 * Validate birth data object
 */
function validateBirthData(birthData) {
  const errors = [];
  
  if (!birthData.dateOfBirth || !validateDate(birthData.dateOfBirth)) {
    errors.push('Invalid date of birth');
  }
  
  if (!birthData.timeOfBirth || !validateTime(birthData.timeOfBirth)) {
    errors.push('Invalid time of birth');
  }
  
  if (!birthData.placeOfBirth) {
    errors.push('Place of birth is required');
  } else {
    if (!validateLatitude(birthData.placeOfBirth.lat)) {
      errors.push('Invalid latitude');
    }
    if (!validateLongitude(birthData.placeOfBirth.lng)) {
      errors.push('Invalid longitude');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Sanitize string input
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

/**
 * Validate email format
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (basic)
 */
function validatePhone(phone) {
  const regex = /^[\d\s\-\+\(\)]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

module.exports = {
  validateDate,
  validateTime,
  validateLatitude,
  validateLongitude,
  validateBirthData,
  sanitizeString,
  validateEmail,
  validatePhone
};
