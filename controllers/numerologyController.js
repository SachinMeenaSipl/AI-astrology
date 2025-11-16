const express = require('express');
const router = express.Router();
const numerology = require('../services/numerology');

/**
 * Generate Numerology Report
 * POST /api/numerology/report
 */
router.post('/report', async (req, res) => {
  try {
    const { dateOfBirth, fullName } = req.body;
    
    if (!dateOfBirth || !fullName) {
      return res.status(400).json({ 
        error: 'Date of birth and full name are required' 
      });
    }
    
    const report = numerology.generateNumerologyReport(dateOfBirth, fullName);
    
    res.json({
      success: true,
      report: report
    });
  } catch (error) {
    console.error('Numerology report error:', error);
    res.status(500).json({ 
      error: 'Failed to generate numerology report',
      message: error.message 
    });
  }
});

/**
 * Calculate Life Path Number
 * POST /api/numerology/life-path (changed from GET for security)
 */
router.post('/life-path', async (req, res) => {
  try {
    const { dateOfBirth } = req.body;
    
    if (!dateOfBirth) {
      return res.status(400).json({ 
        error: 'Date of birth is required' 
      });
    }
    
    const lifePath = numerology.calculateLifePath(dateOfBirth);
    const meaning = numerology.numberMeanings[lifePath];
    
    res.json({
      success: true,
      lifePath: {
        number: lifePath,
        meaning: meaning
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate life path',
      message: error.message 
    });
  }
});

/**
 * Calculate Personal Year
 * POST /api/numerology/personal-year (changed from GET for security)
 */
router.post('/personal-year', async (req, res) => {
  try {
    const { dateOfBirth } = req.body;
    
    if (!dateOfBirth) {
      return res.status(400).json({ 
        error: 'Date of birth is required' 
      });
    }
    
    const personalYear = numerology.calculatePersonalYear(dateOfBirth);
    
    res.json({
      success: true,
      personalYear: personalYear
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate personal year',
      message: error.message 
    });
  }
});

/**
 * Get Name Compatibility
 * POST /api/numerology/compatibility
 */
router.post('/compatibility', async (req, res) => {
  try {
    const { person1, person2 } = req.body;
    
    if (!person1 || !person2) {
      return res.status(400).json({ 
        error: 'Both person details are required' 
      });
    }
    
    const lifePath1 = numerology.calculateLifePath(person1.dateOfBirth);
    const lifePath2 = numerology.calculateLifePath(person2.dateOfBirth);
    
    const compatible1 = numerology.getCompatibleNumbers(lifePath1);
    const compatible2 = numerology.getCompatibleNumbers(lifePath2);
    
    const isCompatible = compatible1.includes(lifePath2);
    
    res.json({
      success: true,
      compatibility: {
        person1: {
          lifePath: lifePath1,
          name: person1.name
        },
        person2: {
          lifePath: lifePath2,
          name: person2.name
        },
        compatible: isCompatible,
        score: isCompatible ? 85 : 60,
        description: isCompatible ? 
          'Strong numerological compatibility. Natural harmony in energies.' :
          'Moderate compatibility. Mutual understanding and effort required.'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to check compatibility',
      message: error.message 
    });
  }
});

module.exports = router;
