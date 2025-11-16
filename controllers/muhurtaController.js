const express = require('express');
const router = express.Router();
const muhurta = require('../services/muhurta');

/**
 * Find Auspicious Dates
 * POST /api/muhurta/find-dates
 */
router.post('/find-dates', async (req, res) => {
  try {
    const { activity, startDate, daysToSearch } = req.body;
    
    if (!activity) {
      return res.status(400).json({ 
        error: 'Activity type is required',
        availableActivities: Object.keys(muhurta.activities)
      });
    }
    
    const results = await muhurta.findAuspiciousDates(
      activity,
      startDate || new Date(),
      daysToSearch || 90
    );
    
    res.json({
      success: true,
      results: results
    });
  } catch (error) {
    console.error('Muhurta error:', error);
    res.status(500).json({ 
      error: 'Failed to find auspicious dates',
      message: error.message 
    });
  }
});

/**
 * Find Best Date for Activity
 * POST /api/muhurta/best-date
 */
router.post('/best-date', async (req, res) => {
  try {
    const { activity, preferredMonth } = req.body;
    
    if (!activity) {
      return res.status(400).json({ 
        error: 'Activity type is required',
        availableActivities: Object.keys(muhurta.activities)
      });
    }
    
    const result = await muhurta.findBestDate(activity, preferredMonth);
    
    res.json({
      success: true,
      result: result
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to find best date',
      message: error.message 
    });
  }
});

/**
 * Get Today's Panchang
 * GET /api/muhurta/panchang
 */
router.get('/panchang', async (req, res) => {
  try {
    const { date } = req.query;
    
    const panchang = muhurta.calculatePanchang(date || new Date());
    
    res.json({
      success: true,
      panchang: panchang
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to get Panchang',
      message: error.message 
    });
  }
});

/**
 * Get Available Activities
 * GET /api/muhurta/activities
 */
router.get('/activities', (req, res) => {
  res.json({
    success: true,
    activities: muhurta.activities
  });
});

/**
 * Check Date Auspiciousness
 * POST /api/muhurta/check-date
 */
router.post('/check-date', async (req, res) => {
  try {
    const { date, activity } = req.body;
    
    if (!date || !activity) {
      return res.status(400).json({ 
        error: 'Date and activity are required' 
      });
    }
    
    const panchang = muhurta.calculatePanchang(date);
    const score = muhurta.calculateAuspiciousness(activity, panchang, new Date(date));
    
    res.json({
      success: true,
      date: date,
      activity: muhurta.activities[activity],
      auspiciousness: {
        score: score,
        rating: muhurta.getRecommendation(score),
        panchang: panchang
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to check date',
      message: error.message 
    });
  }
});

module.exports = router;
