# API Documentation

## AstroSense AI REST API

Base URL: `http://localhost:3000/api`

---

## Chart Endpoints

### Generate Birth Chart
Generate a complete Vedic birth chart with D1 Rasi and D9 Navamsa charts.

**Endpoint:** `POST /api/chart/generate`

**Request Body:**
```json
{
  "dateOfBirth": "1990-01-15",
  "timeOfBirth": "14:30",
  "placeOfBirth": {
    "name": "New Delhi, India",
    "lat": 28.6139,
    "lng": 77.2090,
    "timezone": "Asia/Kolkata"
  },
  "language": "en",
  "system": "vedic"
}
```

**Response:**
```json
{
  "success": true,
  "chart": {
    "id": "chart_1234567890",
    "birthData": { ... },
    "charts": {
      "d1": { ... },
      "d9": { ... }
    }
  }
}
```

---

### Get AI Interpretation
Get natural language interpretation of a birth chart.

**Endpoint:** `POST /api/chart/interpret`

**Request Body:**
```json
{
  "chart": { ... },
  "type": "personality|career|relationship|finance|all"
}
```

---

### Get Dasha Timeline
Calculate Vimshottari Dasha periods for a birth chart.

**Endpoint:** `POST /api/chart/dasha`

**Request Body:**
```json
{
  "chart": { ... },
  "dateOfBirth": "1990-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "dashaReport": {
    "timeline": [...],
    "current": { ... },
    "upcoming": [...]
  }
}
```

---

## Prediction Endpoints

### Daily Prediction
Get personalized daily prediction based on transits.

**Endpoint:** `GET /api/predictions/daily`

**Request Body:**
```json
{
  "chart": { ... }
}
```

---

### Weekly Prediction
**Endpoint:** `GET /api/predictions/weekly`

### Monthly Prediction
**Endpoint:** `GET /api/predictions/monthly`

### Current Transits
Get current planetary transits.

**Endpoint:** `GET /api/predictions/transits`

---

## Matchmaking Endpoints

### Analyze Compatibility
Perform Gun Milan compatibility analysis between two charts.

**Endpoint:** `POST /api/matchmaking/analyze`

**Request Body:**
```json
{
  "person1Chart": { ... },
  "person2Chart": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "compatibility": {
    "gunMilan": {
      "totalScore": 26,
      "maxScore": 36,
      "percentage": "72.2"
    },
    "psychological": { ... },
    "emotional": { ... },
    "recommendation": { ... }
  }
}
```

---

## Chat Endpoints

### Send Message to AI
Chat with the AI astrologer.

**Endpoint:** `POST /api/chat/message`

**Request Body:**
```json
{
  "userId": "user_123",
  "message": "Is this a good time for a job change?",
  "chartContext": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "answer": "Based on your chart analysis...",
    "usedData": ["10th house", "Current Dasha"],
    "confidence": "high"
  }
}
```

---

## Numerology Endpoints

### Generate Numerology Report
**Endpoint:** `POST /api/numerology/report`

**Request Body:**
```json
{
  "dateOfBirth": "1990-01-15",
  "fullName": "John Doe"
}
```

### Calculate Life Path Number
**Endpoint:** `GET /api/numerology/life-path?dateOfBirth=1990-01-15`

### Get Personal Year
**Endpoint:** `GET /api/numerology/personal-year?dateOfBirth=1990-01-15`

---

## Muhurta Endpoints

### Find Auspicious Dates
**Endpoint:** `POST /api/muhurta/find-dates`

**Request Body:**
```json
{
  "activity": "MARRIAGE|TRAVEL|BUSINESS|HOUSE|JOB",
  "startDate": "2024-01-01",
  "daysToSearch": 90
}
```

### Find Best Date
**Endpoint:** `POST /api/muhurta/best-date`

### Get Today's Panchang
**Endpoint:** `GET /api/muhurta/panchang`

### Check Date Auspiciousness
**Endpoint:** `POST /api/muhurta/check-date`

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented. In production, implement rate limiting based on your requirements.

---

## Authentication

Currently no authentication is required. In production, implement JWT-based authentication for user-specific features.
