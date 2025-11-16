const express = require('express');
const router = express.Router();

/**
 * Matchmaking Analysis
 * POST /api/matchmaking/analyze
 */
router.post('/analyze', async (req, res) => {
  try {
    const { person1Chart, person2Chart } = req.body;
    
    if (!person1Chart || !person2Chart) {
      return res.status(400).json({ 
        error: 'Both person charts are required' 
      });
    }
    
    const compatibility = calculateCompatibility(person1Chart, person2Chart);
    
    res.json({
      success: true,
      compatibility: compatibility
    });
  } catch (error) {
    console.error('Matchmaking error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze compatibility',
      message: error.message 
    });
  }
});

/**
 * Calculate Gun Milan Score
 */
function calculateGunMilan(chart1, chart2) {
  const moon1 = chart1.charts.d1.planets.MOON;
  const moon2 = chart2.charts.d1.planets.MOON;
  
  // Simplified Gun Milan calculation
  // In production, implement full 8-kuta matching system
  let score = 0;
  
  // Varna (1 point)
  score += 1;
  
  // Vashya (2 points)
  score += 1;
  
  // Tara (3 points)
  score += 2;
  
  // Yoni (4 points)
  score += 3;
  
  // Graha Maitri (5 points)
  score += 4;
  
  // Gana (6 points)
  score += 4;
  
  // Bhakoot (7 points)
  score += 5;
  
  // Nadi (8 points)
  score += 6;
  
  return {
    totalScore: score,
    maxScore: 36,
    percentage: (score / 36 * 100).toFixed(1)
  };
}

/**
 * Calculate Compatibility
 */
function calculateCompatibility(chart1, chart2) {
  const gunMilan = calculateGunMilan(chart1, chart2);
  
  // Psychological compatibility
  const psychological = analyzePsychologicalCompatibility(chart1, chart2);
  
  // Emotional compatibility
  const emotional = analyzeEmotionalCompatibility(chart1, chart2);
  
  // Life goals alignment
  const lifeGoals = analyzeLifeGoalsAlignment(chart1, chart2);
  
  // Overall recommendation
  const recommendation = getRecommendation(gunMilan.totalScore);
  
  return {
    gunMilan: gunMilan,
    psychological: psychological,
    emotional: emotional,
    lifeGoals: lifeGoals,
    conflictAreas: identifyConflictAreas(chart1, chart2),
    strengths: identifyStrengths(chart1, chart2),
    recommendation: recommendation,
    detailedAnalysis: getDetailedAnalysis(gunMilan.totalScore)
  };
}

function analyzePsychologicalCompatibility(chart1, chart2) {
  return {
    score: 75,
    description: 'Good psychological compatibility. Both partners understand each other well.',
    factors: [
      'Compatible personality traits',
      'Similar thinking patterns',
      'Mutual respect for differences'
    ]
  };
}

function analyzeEmotionalCompatibility(chart1, chart2) {
  return {
    score: 80,
    description: 'Strong emotional bond. Partners are emotionally supportive.',
    factors: [
      'Similar emotional needs',
      'Good communication of feelings',
      'Supportive during challenges'
    ]
  };
}

function analyzeLifeGoalsAlignment(chart1, chart2) {
  return {
    score: 70,
    description: 'Reasonably aligned life goals with room for individual growth.',
    factors: [
      'Shared vision for future',
      'Compatible career aspirations',
      'Similar family values'
    ]
  };
}

function identifyConflictAreas(chart1, chart2) {
  return [
    {
      area: 'Communication Style',
      severity: 'Low',
      solution: 'Practice active listening and clear expression'
    },
    {
      area: 'Financial Priorities',
      severity: 'Medium',
      solution: 'Regular discussions about money matters and shared goals'
    }
  ];
}

function identifyStrengths(chart1, chart2) {
  return [
    'Strong emotional connection',
    'Mutual respect and understanding',
    'Complementary personalities',
    'Shared values and beliefs'
  ];
}

function getRecommendation(score) {
  if (score >= 28) {
    return {
      level: 'Excellent Match',
      description: 'This is a highly compatible match with great potential for a happy relationship.',
      advice: 'Proceed with confidence. Focus on building communication and trust.'
    };
  } else if (score >= 21) {
    return {
      level: 'Good Match',
      description: 'This is a good match with strong compatibility. Some areas need attention.',
      advice: 'Work on identified conflict areas. Relationship counseling can help strengthen the bond.'
    };
  } else if (score >= 14) {
    return {
      level: 'Average Match',
      description: 'This match needs effort from both partners to succeed.',
      advice: 'Serious commitment and understanding required. Consider pre-marital counseling.'
    };
  } else {
    return {
      level: 'Challenging Match',
      description: 'This match may face significant challenges.',
      advice: 'Careful consideration recommended. Consult with family and astrologer.'
    };
  }
}

function getDetailedAnalysis(score) {
  return {
    overview: `Gun Milan score of ${score}/36 indicates compatibility level.`,
    recommendations: [
      'Perform compatibility rituals as per tradition',
      'Seek blessings from elders',
      'Consider manglik dosha if applicable',
      'Analyze Navamsa charts for deeper insights'
    ],
    remedies: [
      'Perform joint prayers and meditation',
      'Wear recommended gemstones',
      'Visit temples together',
      'Practice understanding and patience'
    ]
  };
}

module.exports = router;
