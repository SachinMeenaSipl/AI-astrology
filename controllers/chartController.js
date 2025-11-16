const express = require('express');
const router = express.Router();
const chartCalculation = require('../services/chartCalculation');
const aiInterpretation = require('../services/aiInterpretation');
const dashaSystem = require('../services/dashaSystem');

/**
 * Generate Birth Chart
 * POST /api/chart/generate
 */
router.post('/generate', async (req, res) => {
  try {
    const { dateOfBirth, timeOfBirth, placeOfBirth, language, system } = req.body;
    
    // Validate input
    if (!dateOfBirth || !timeOfBirth || !placeOfBirth) {
      return res.status(400).json({ 
        error: 'Missing required fields: dateOfBirth, timeOfBirth, placeOfBirth' 
      });
    }
    
    // Generate chart
    const chart = await chartCalculation.generateBirthChart({
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      language: language || 'en',
      system: system || 'vedic'
    });
    
    res.json({
      success: true,
      chart: chart
    });
  } catch (error) {
    console.error('Chart generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate chart',
      message: error.message 
    });
  }
});

/**
 * Get AI Interpretation
 * POST /api/chart/interpret
 */
router.post('/interpret', async (req, res) => {
  try {
    const { chart, type } = req.body;
    
    if (!chart) {
      return res.status(400).json({ error: 'Chart data is required' });
    }
    
    const interpretation = await aiInterpretation.generateComprehensiveAnalysis(
      chart,
      type || 'all'
    );
    
    res.json({
      success: true,
      interpretation: interpretation
    });
  } catch (error) {
    console.error('Interpretation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate interpretation',
      message: error.message 
    });
  }
});

/**
 * Get Dasha Timeline
 * POST /api/chart/dasha
 */
router.post('/dasha', async (req, res) => {
  try {
    const { chart, dateOfBirth } = req.body;
    
    if (!chart || !dateOfBirth) {
      return res.status(400).json({ 
        error: 'Chart and dateOfBirth are required' 
      });
    }
    
    const dashaReport = await dashaSystem.generateDashaReport(chart, dateOfBirth);
    
    res.json({
      success: true,
      dashaReport: dashaReport
    });
  } catch (error) {
    console.error('Dasha calculation error:', error);
    res.status(500).json({ 
      error: 'Failed to calculate Dasha',
      message: error.message 
    });
  }
});

/**
 * Get Current Dasha
 * POST /api/chart/dasha/current
 */
router.post('/dasha/current', async (req, res) => {
  try {
    const { chart, dateOfBirth } = req.body;
    
    const timeline = dashaSystem.generateMahadashaTimeline(chart, dateOfBirth);
    const current = dashaSystem.getCurrentDasha(timeline);
    
    res.json({
      success: true,
      current: current
    });
  } catch (error) {
    console.error('Current Dasha error:', error);
    res.status(500).json({ 
      error: 'Failed to get current Dasha',
      message: error.message 
    });
  }
});

/**
 * Quick Chart Info
 * GET /api/chart/info/:chartId
 */
router.get('/info/:chartId', async (req, res) => {
  try {
    // In production, fetch from database
    res.json({
      success: true,
      message: 'Chart info endpoint - implement database integration'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch chart info',
      message: error.message 
    });
  }
});

module.exports = router;
