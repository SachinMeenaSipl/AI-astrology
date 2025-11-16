const express = require('express');
const router = express.Router();

/**
 * Chat with AI Astrologer
 * POST /api/chat/message
 */
router.post('/message', async (req, res) => {
  try {
    const { userId, message, chartContext } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }
    
    // Generate AI response based on message and chart context
    const response = await generateAIResponse(message, chartContext);
    
    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      message: error.message 
    });
  }
});

/**
 * Get Chat History
 * GET /api/chat/history/:userId
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // In production, fetch from database
    res.json({
      success: true,
      history: [],
      message: 'Implement database integration for chat history'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch chat history',
      message: error.message 
    });
  }
});

/**
 * Generate AI Response
 */
async function generateAIResponse(message, chartContext) {
  // This is a template-based system
  // In production, integrate with OpenAI or similar LLM
  
  const lowerMessage = message.toLowerCase();
  
  // Analyze question type
  if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
    return {
      answer: generateCareerResponse(chartContext),
      usedData: ['10th house analysis', 'Current Dasha period', 'Transit influences'],
      confidence: 'high'
    };
  } else if (lowerMessage.includes('relationship') || lowerMessage.includes('marriage') || lowerMessage.includes('love')) {
    return {
      answer: generateRelationshipResponse(chartContext),
      usedData: ['7th house analysis', 'Venus position', 'Current transits'],
      confidence: 'high'
    };
  } else if (lowerMessage.includes('finance') || lowerMessage.includes('money') || lowerMessage.includes('wealth')) {
    return {
      answer: generateFinanceResponse(chartContext),
      usedData: ['2nd house analysis', '11th house analysis', 'Jupiter position'],
      confidence: 'high'
    };
  } else if (lowerMessage.includes('health')) {
    return {
      answer: generateHealthResponse(chartContext),
      usedData: ['6th house analysis', 'Saturn and Mars positions'],
      confidence: 'medium'
    };
  } else if (lowerMessage.includes('when') || lowerMessage.includes('timing')) {
    return {
      answer: generateTimingResponse(chartContext),
      usedData: ['Current Dasha', 'Upcoming transits'],
      confidence: 'medium'
    };
  } else {
    return {
      answer: generateGeneralResponse(chartContext),
      usedData: ['Overall chart analysis'],
      confidence: 'medium'
    };
  }
}

function generateCareerResponse(chart) {
  return `Based on your birth chart analysis, your 10th house (career) shows promising indications. ${
    chart ? 'Your current Dasha period supports career growth.' : 'The planets suggest focusing on your natural talents.'
  } This is a favorable time for professional advancement. Consider opportunities that align with your skills and passions. Stay committed to your goals and maintain a positive attitude.`;
}

function generateRelationshipResponse(chart) {
  return `Your 7th house and Venus placement indicate good relationship prospects. ${
    chart ? 'The current planetary transits are supportive of meaningful connections.' : 'Focus on building emotional bonds.'
  } Communication and understanding are key. Be patient and allow relationships to develop naturally. The timing appears favorable for deepening existing bonds or meeting new people.`;
}

function generateFinanceResponse(chart) {
  return `Looking at your financial houses (2nd and 11th), there are opportunities for growth. ${
    chart ? 'Jupiter\'s current position suggests gains through wise investments.' : 'Focus on building multiple income streams.'
  } Avoid impulsive spending and focus on long-term financial planning. This period favors steady accumulation rather than risky ventures. Consider seeking advice from financial experts.`;
}

function generateHealthResponse(chart) {
  return `Your health indicators suggest maintaining a balanced lifestyle. ${
    chart ? 'Current planetary positions emphasize the importance of preventive care.' : 'Focus on holistic wellness.'
  } Regular exercise, proper diet, and stress management are crucial. Pay attention to your body's signals and don't ignore minor issues. Consider incorporating yoga or meditation into your routine.`;
}

function generateTimingResponse(chart) {
  return `Timing is influenced by both your Dasha periods and current transits. ${
    chart ? 'Your current Mahadasha and Antardasha periods play a significant role.' : 'Planetary movements affect timing.'
  } Generally, the upcoming months show positive energy. Watch for opportunities around favorable transit periods. Patience and preparation are key - when the right time comes, you'll be ready.`;
}

function generateGeneralResponse(chart) {
  return `Based on your chart, you have unique strengths and opportunities. ${
    chart ? 'The planetary positions indicate a period of growth and learning.' : 'Focus on self-development and understanding.'
  } Stay focused on your goals, maintain positivity, and trust in the cosmic timing. Each challenge is an opportunity for growth. Feel free to ask more specific questions about career, relationships, or other life areas.`;
}

/**
 * Get AI Tutor Response (for learning center)
 * POST /api/chat/learn
 */
router.post('/learn', async (req, res) => {
  try {
    const { topic, question } = req.body;
    
    if (!topic && !question) {
      return res.status(400).json({ 
        error: 'Topic or question is required' 
      });
    }
    
    const response = generateLearningResponse(topic, question);
    
    res.json({
      success: true,
      response: response
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to generate learning response',
      message: error.message 
    });
  }
});

function generateLearningResponse(topic, question) {
  const learningContent = {
    'planets': 'In Vedic astrology, we study 9 planets (Navagraha): Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu. Each planet represents different aspects of life and personality.',
    'houses': 'The birth chart is divided into 12 houses, each representing different life areas. The 1st house is your personality, 2nd is wealth, 3rd is siblings, and so on.',
    'signs': 'There are 12 zodiac signs (Rashis): Aries through Pisces. Each sign has unique characteristics and is ruled by a specific planet.',
    'dasha': 'Dasha is a planetary period system unique to Vedic astrology. The Vimshottari Dasha system divides a 120-year cycle among the 9 planets.',
    'default': 'Astrology is the study of how celestial bodies influence human life. Feel free to ask about specific topics like planets, houses, signs, or dashas.'
  };
  
  const content = learningContent[topic] || learningContent['default'];
  
  return {
    topic: topic || 'general',
    explanation: content,
    examples: ['Example 1: Planetary influences', 'Example 2: House interpretations'],
    nextSteps: ['Learn about planetary aspects', 'Understand house lordships', 'Study Nakshatra system']
  };
}

module.exports = router;
