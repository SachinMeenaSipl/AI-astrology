# Quick Start Guide

## AstroSense AI - Getting Started in 5 Minutes

Welcome to AstroSense AI! This guide will help you get the platform up and running quickly.

---

## Prerequisites

Before you begin, make sure you have:
- ✅ Node.js 16+ installed ([Download](https://nodejs.org/))
- ✅ npm or yarn package manager
- ✅ A code editor (VS Code recommended)
- ✅ Basic terminal/command line knowledge

---

## Step 1: Clone or Download the Repository

```bash
git clone https://github.com/SachinMeenaSipl/AI-astrology.git
cd AI-astrology
```

Or download and extract the ZIP file.

---

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Express.js (web server)
- Swiss Ephemeris (astronomical calculations)
- Moment.js (date/time handling)
- And other dependencies

**Installation time:** ~2-3 minutes

---

## Step 3: Configure Environment (Optional)

For basic functionality, skip this step. For enhanced features:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=3000
NODE_ENV=development

# Optional: Add these for enhanced features
OPENAI_API_KEY=your_key_here
GOOGLE_MAPS_API_KEY=your_key_here
```

---

## Step 4: Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
🌟 AstroSense AI Server running on port 3000
🔮 Environment: development
📡 API available at http://localhost:3000/api
🌐 Frontend available at http://localhost:3000
```

---

## Step 5: Open Your Browser

Navigate to: **http://localhost:3000**

You should see the beautiful cosmic-themed dashboard!

---

## Your First Birth Chart

### 1. Click "Get Started" or Navigate to "My Chart"

### 2. Fill in Birth Details:

**Example Data:**
- Date of Birth: 1990-01-15
- Time of Birth: 14:30
- Place: New Delhi, India
- Latitude: 28.6139
- Longitude: 77.2090
- Language: English

### 3. Click "Generate Chart"

Your birth chart will be displayed with:
- Planetary positions
- Nakshatra details
- Ascendant information
- D1 Rasi chart data

### 4. Get AI Interpretation

Click "Get AI Interpretation" to receive:
- Personality profile
- Career analysis
- Relationship insights
- Financial analysis
- Strengths and weaknesses

---

## Explore Other Features

### 💬 Chat with AI Astrologer
1. Click "Ask AI" in navigation
2. Type your question: "Is this a good time for a job change?"
3. Get instant AI-powered guidance

### 📅 Daily Predictions
1. Go to "Predictions"
2. View Daily/Weekly/Monthly forecasts
3. See lucky elements and guidance

### 🔢 Numerology
1. Click "More" → "Numerology"
2. Enter your name and birth date
3. Discover your life path number

### 🕉️ Muhurta Finder
1. Click "More" → "Muhurta Finder"
2. Select activity (Marriage, Travel, Business, etc.)
3. Get auspicious dates and timings

### 💑 Matchmaking
1. Click "More" → "Matchmaking"
2. Enter two birth charts
3. Get Gun Milan compatibility score

---

## API Usage Examples

### Generate Chart via API

```javascript
fetch('http://localhost:3000/api/chart/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dateOfBirth: '1990-01-15',
    timeOfBirth: '14:30',
    placeOfBirth: {
      name: 'New Delhi',
      lat: 28.6139,
      lng: 77.2090,
      timezone: 'Asia/Kolkata'
    },
    language: 'en',
    system: 'vedic'
  })
})
.then(res => res.json())
.then(data => console.log(data.chart));
```

### Chat with AI

```javascript
fetch('http://localhost:3000/api/chat/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    message: 'What does my chart say about my career?',
    chartContext: yourChartObject
  })
})
.then(res => res.json())
.then(data => console.log(data.response.answer));
```

### Get Daily Prediction

```javascript
fetch('http://localhost:3000/api/predictions/daily', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chart: yourChartObject })
})
.then(res => res.json())
.then(data => console.log(data.prediction));
```

See [API_DOCS.md](API_DOCS.md) for complete API documentation.

---

## Project Structure Overview

```
AI-astrology/
├── server.js              # Main server file - START HERE
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
│
├── controllers/          # API route handlers
│   ├── chartController.js
│   ├── predictionController.js
│   ├── chatController.js
│   └── ...
│
├── services/            # Business logic
│   ├── chartCalculation.js
│   ├── aiInterpretation.js
│   ├── dashaSystem.js
│   └── ...
│
├── public/             # Frontend files
│   ├── index.html      # Main page
│   ├── css/styles.css  # Cosmic theme
│   └── js/app.js       # Frontend logic
│
└── utils/              # Utility functions
    ├── validators.js
    └── panchang.js
```

---

## Common Issues & Solutions

### Port 3000 Already in Use
```bash
# Change port in .env file
PORT=3001

# Or kill the process using port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Chart Generation Fails
- Verify date format: YYYY-MM-DD
- Verify time format: HH:MM (24-hour)
- Check latitude/longitude values are correct
- Ensure all required fields are filled

---

## Development Commands

```bash
# Start server
npm start

# Start with auto-reload
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check test coverage
npm test -- --coverage
```

---

## Next Steps

1. ✅ **Explore the Interface** - Try all features
2. 📚 **Read API Docs** - [API_DOCS.md](API_DOCS.md)
3. 🚀 **Deploy** - See [DEPLOYMENT.md](DEPLOYMENT.md)
4. 🤝 **Contribute** - See [CONTRIBUTING.md](CONTRIBUTING.md)
5. 🔐 **Security** - Review [SECURITY.md](SECURITY.md)

---

## Getting Help

### Documentation
- [README.md](README.md) - Complete overview
- [API_DOCS.md](API_DOCS.md) - API reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

### Support
- 📧 Email: support@astrosense.ai
- 🐛 Issues: [GitHub Issues](https://github.com/SachinMeenaSipl/AI-astrology/issues)
- 💬 Discussions: Coming soon

---

## What's Next?

### Enhance Your Installation
1. Add OpenAI API key for better AI responses
2. Add Google Maps API for location search
3. Install Swiss Ephemeris data for 100% accuracy

### Deploy to Production
1. Choose a hosting platform (Heroku, Vercel, AWS)
2. Set up environment variables
3. Configure domain and SSL
4. Monitor and scale

### Customize
1. Modify the cosmic theme colors
2. Add your own branding
3. Extend with custom features
4. Integrate with other services

---

## Tips for Best Experience

🌟 **Use a modern browser** (Chrome, Firefox, Safari, Edge)  
🌙 **Best viewed in dark mode** (already dark by default!)  
📱 **Mobile responsive** - works on phones and tablets  
⚡ **Keep Node.js updated** for better performance  
🔄 **Clear browser cache** if you see old content  

---

## Features Checklist

Try all these features:

- [ ] Generate your birth chart
- [ ] Get AI interpretation
- [ ] Chat with AI astrologer
- [ ] View daily predictions
- [ ] Check numerology report
- [ ] Find auspicious dates with Muhurta
- [ ] Calculate Dasha timeline
- [ ] Try matchmaking compatibility
- [ ] Explore all API endpoints

---

## Success!

🎉 **Congratulations!** You now have a fully functional astrology platform running locally.

Start exploring the cosmic wisdom and may the stars guide you! ✨

---

*Made with ❤️ by the AstroSense AI Team*
