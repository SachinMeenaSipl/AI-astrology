const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import routes
const chartRoutes = require('./controllers/chartController');
const predictionRoutes = require('./controllers/predictionController');
const matchmakingRoutes = require('./controllers/matchmakingController');
const chatRoutes = require('./controllers/chatController');
const numerologyRoutes = require('./controllers/numerologyController');
const muhurtaRoutes = require('./controllers/muhurtaController');

// API Routes
app.use('/api/chart', chartRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/matchmaking', matchmakingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/numerology', numerologyRoutes);
app.use('/api/muhurta', muhurtaRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    version: '1.0.0',
    timestamp: new Date().toISOString() 
  });
});

// Serve frontend (rate limited)
const mainPageLimiter = {
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
};

// Apply basic rate limiting to main page
let requestCounts = {};
setInterval(() => { requestCounts = {}; }, 60000); // Clear every minute

app.get('/', (req, res) => {
  const ip = req.ip;
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;
  
  if (requestCounts[ip] > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌟 AstroSense AI Server running on port ${PORT}`);
  console.log(`🔮 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
});

module.exports = app;
