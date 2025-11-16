const express = require('express');
const router = express.Router();
const transitEngine = require('../services/transitEngine');

/**
 * Get Daily Prediction
 * GET /api/predictions/daily
 */
router.get('/daily', async (req, res) => {
  try {
    const { chart } = req.body;
    
    if (!chart) {
      return res.status(400).json({ 
        error: 'Chart data is required' 
      });
    }
    
    const prediction = await transitEngine.generateDailyPrediction(chart);
    
    res.json({
      success: true,
      prediction: prediction
    });
  } catch (error) {
    console.error('Daily prediction error:', error);
    res.status(500).json({ 
      error: 'Failed to generate daily prediction',
      message: error.message 
    });
  }
});

/**
 * Get Weekly Prediction
 * GET /api/predictions/weekly
 */
router.get('/weekly', async (req, res) => {
  try {
    const { chart } = req.body;
    
    if (!chart) {
      return res.status(400).json({ 
        error: 'Chart data is required' 
      });
    }
    
    const prediction = await transitEngine.generateWeeklyPrediction(chart);
    
    res.json({
      success: true,
      prediction: prediction
    });
  } catch (error) {
    console.error('Weekly prediction error:', error);
    res.status(500).json({ 
      error: 'Failed to generate weekly prediction',
      message: error.message 
    });
  }
});

/**
 * Get Monthly Prediction
 * GET /api/predictions/monthly
 */
router.get('/monthly', async (req, res) => {
  try {
    const { chart } = req.body;
    
    if (!chart) {
      return res.status(400).json({ 
        error: 'Chart data is required' 
      });
    }
    
    const prediction = await transitEngine.generateMonthlyPrediction(chart);
    
    res.json({
      success: true,
      prediction: prediction
    });
  } catch (error) {
    console.error('Monthly prediction error:', error);
    res.status(500).json({ 
      error: 'Failed to generate monthly prediction',
      message: error.message 
    });
  }
});

/**
 * Get Current Transits
 * GET /api/predictions/transits
 */
router.get('/transits', async (req, res) => {
  try {
    const transits = await transitEngine.getCurrentTransits();
    
    res.json({
      success: true,
      transits: transits
    });
  } catch (error) {
    console.error('Transit error:', error);
    res.status(500).json({ 
      error: 'Failed to get current transits',
      message: error.message 
    });
  }
});

/**
 * Analyze Transits for Chart
 * POST /api/predictions/analyze-transits
 */
router.post('/analyze-transits', async (req, res) => {
  try {
    const { chart } = req.body;
    
    if (!chart) {
      return res.status(400).json({ 
        error: 'Chart data is required' 
      });
    }
    
    const analysis = await transitEngine.analyzeTransitsForChart(chart);
    
    res.json({
      success: true,
      analysis: analysis
    });
  } catch (error) {
    console.error('Transit analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze transits',
      message: error.message 
    });
  }
});

module.exports = router;
