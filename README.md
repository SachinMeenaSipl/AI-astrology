# AstroSense AI — Your Personal Vedic & Modern Astrology Guide

![AstroSense AI](https://img.shields.io/badge/Astrology-Vedic%20%26%20Modern-purple)
![AI Powered](https://img.shields.io/badge/AI-Powered-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Overview

**AstroSense AI** is an end-to-end astrology platform that combines accurate Vedic chart calculations with intelligent AI interpretation to provide personalized guidance for your life journey.

### Key Features

- 🔮 **Accurate Birth Chart Generation** - D1 Rasi & D9 Navamsa charts using Swiss Ephemeris
- 🤖 **AI-Powered Interpretations** - Natural language personality, career, and relationship analysis
- 📅 **Daily Predictions** - Transit-based daily, weekly, and monthly forecasts
- ⏳ **Dasha Timeline System** - Mahadasha, Antardasha, and Pratyantar Dasha analysis
- 💑 **Matchmaking Module** - Gun Milan scoring and compatibility analysis
- 🕉️ **Muhurta Finder** - Auspicious timing for important life events
- 🔢 **Numerology Calculator** - Life path and destiny number analysis
- 🤲 **Palm & Face Reading** - AI-powered image analysis (Premium)
- 💬 **Chat with AI Astrologer** - Ask anything about your chart
- 🎓 **Learning Center** - Interactive AI tutor for astrology basics
- 🛡️ **Remedies Hub** - Personalized solutions and guidance

## 🎨 Design Theme

**Modern Spiritual + Minimalistic + Cosmic**

- **Midnight Blue** (#0B0F3B) - Main background
- **Cosmic Purple** (#6A4DF7) - Buttons & highlights
- **Sunrise Gold** (#F5C46B) - Astrology symbols
- **White Smoke** (#F5F5F7) - Text
- **Nebula Gradient** - Purple → Blue → Teal transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SachinMeenaSipl/AI-astrology.git
cd AI-astrology

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your API keys in .env
# - OPENAI_API_KEY (for AI interpretations)
# - GOOGLE_MAPS_API_KEY (for location services)

# Start development server
npm run dev
```

### Usage

```bash
# Production mode
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## 📚 API Documentation

### Core Endpoints

#### Birth Chart Generation
```javascript
POST /api/chart/generate
{
  "dateOfBirth": "1990-01-15",
  "timeOfBirth": "14:30",
  "placeOfBirth": {
    "lat": 28.6139,
    "lng": 77.2090,
    "name": "New Delhi, India"
  },
  "language": "en",
  "system": "vedic"
}
```

#### AI Interpretation
```javascript
POST /api/ai/interpret
{
  "chartId": "chart_123",
  "type": "personality|career|relationship|finance"
}
```

#### Daily Predictions
```javascript
GET /api/predictions/daily?userId=user_123
```

#### Matchmaking
```javascript
POST /api/matchmaking/analyze
{
  "person1ChartId": "chart_123",
  "person2ChartId": "chart_456"
}
```

#### Chat with AI
```javascript
POST /api/chat/message
{
  "userId": "user_123",
  "message": "Is this job change good for me?",
  "context": "chart_123"
}
```

## 🏗️ Project Structure

```
AI-astrology/
├── server.js                 # Main server entry point
├── config/                   # Configuration files
│   ├── database.js
│   └── ai.js
├── controllers/              # Route controllers
│   ├── chartController.js
│   ├── predictionController.js
│   ├── matchmakingController.js
│   └── chatController.js
├── services/                 # Business logic
│   ├── chartCalculation.js
│   ├── aiInterpretation.js
│   ├── dashaSystem.js
│   ├── transitEngine.js
│   ├── numerology.js
│   └── muhurta.js
├── models/                   # Data models
│   ├── User.js
│   ├── Chart.js
│   └── Prediction.js
├── utils/                    # Utility functions
│   ├── ephemeris.js
│   ├── panchang.js
│   └── validators.js
├── public/                   # Frontend assets
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
└── tests/                    # Test files
    ├── chart.test.js
    └── ai.test.js
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys
OPENAI_API_KEY=your_openai_key_here
GOOGLE_MAPS_API_KEY=your_maps_key_here

# Database (optional)
DATABASE_URL=your_database_url

# Security
JWT_SECRET=your_jwt_secret
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- chart.test.js

# Run with coverage
npm test -- --coverage
```

## 🌐 Multi-Language Support

Currently supported languages:
- English (en)
- Hindi (hi)
- More languages coming soon!

## 📱 Features Roadmap

### Core Features ✅
- [x] Birth chart generation
- [x] AI interpretation engine
- [x] Daily predictions
- [x] Dasha system
- [x] Matchmaking
- [x] Muhurta finder
- [x] Numerology
- [x] Remedies hub
- [x] Chat with AI

### Premium Features 🚀
- [ ] Palm reading analysis
- [ ] Face reading analysis
- [ ] Full PDF reports
- [ ] Personal consultations
- [ ] Family chart management
- [ ] Advanced transit reports

### Experience Enhancements 🎨
- [ ] Voice output
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Dark/Light theme toggle
- [ ] Custom notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Swiss Ephemeris for accurate astronomical calculations
- OpenAI for AI interpretation capabilities
- The Vedic astrology community for traditional knowledge

## 📞 Support

For support, email support@astrosense.ai or join our community forum.

## 🔮 About Vedic Astrology

Vedic Astrology (Jyotish) is an ancient Indian science that studies the influence of celestial bodies on human life. It provides insights into:
- Personality traits and behavioral patterns
- Career and professional success
- Relationships and compatibility
- Health and well-being
- Timing of important life events
- Spiritual growth and life purpose

AstroSense AI makes this ancient wisdom accessible through modern AI technology, providing accurate, personalized guidance in a user-friendly format.

---

Made with ❤️ by the AstroSense AI Team