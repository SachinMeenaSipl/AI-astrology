# Deployment Guide

## AstroSense AI - Deployment Instructions

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- (Optional) MongoDB for data persistence
- (Optional) OpenAI API key for enhanced AI features

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SachinMeenaSipl/AI-astrology.git
cd AI-astrology
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
NODE_ENV=development

# API Keys (optional for enhanced features)
OPENAI_API_KEY=your_openai_key_here
GOOGLE_MAPS_API_KEY=your_maps_key_here

# Database (optional)
DATABASE_URL=mongodb://localhost:27017/astrosense

# Security
JWT_SECRET=your_jwt_secret_here
```

### 4. Install Swiss Ephemeris (Optional for Advanced Calculations)

The Swiss Ephemeris library is used for accurate astronomical calculations. 

```bash
# Download ephemeris data files
mkdir -p ephemeris
cd ephemeris
# Download from https://www.astro.com/swisseph/
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Production Deployment

### Option 1: Deploy to Heroku

1. **Create Heroku App**
```bash
heroku create astrosense-ai
```

2. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set OPENAI_API_KEY=your_key
```

3. **Deploy**
```bash
git push heroku main
```

### Option 2: Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set Environment Variables** via Vercel Dashboard

### Option 3: Deploy to VPS (Ubuntu)

1. **SSH into your server**
```bash
ssh user@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone and Setup**
```bash
git clone https://github.com/SachinMeenaSipl/AI-astrology.git
cd AI-astrology
npm install
```

4. **Setup PM2 for Process Management**
```bash
sudo npm install -g pm2
pm2 start server.js --name astrosense
pm2 startup
pm2 save
```

5. **Configure Nginx as Reverse Proxy**
```bash
sudo nano /etc/nginx/sites-available/astrosense
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **Enable site and restart Nginx**
```bash
sudo ln -s /etc/nginx/sites-available/astrosense /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 4: Deploy to AWS

1. **Create EC2 Instance**
   - Choose Ubuntu Server
   - Configure security groups (port 80, 443, 22)

2. **Follow VPS deployment steps above**

3. **Use AWS RDS for Database** (optional)

4. **Use CloudFront for CDN** (optional)

---

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
```

### 3. Build and Run

```bash
docker-compose up -d
```

---

## Environment Configuration

### Required Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### Optional Variables

- `OPENAI_API_KEY` - For enhanced AI interpretations
- `GOOGLE_MAPS_API_KEY` - For location services
- `DATABASE_URL` - For data persistence
- `JWT_SECRET` - For authentication

---

## Performance Optimization

1. **Enable Gzip Compression**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Implement Caching**
```javascript
const cache = require('node-cache');
const myCache = new cache({ stdTTL: 600 });
```

3. **Use CDN for Static Assets**

4. **Implement Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');
```

---

## Monitoring and Logging

### Setup Logging
```bash
npm install winston
```

### Use Application Monitoring
- New Relic
- DataDog
- Sentry for error tracking

---

## Security Best Practices

1. Keep dependencies updated
2. Use HTTPS in production
3. Implement rate limiting
4. Sanitize user inputs
5. Use environment variables for secrets
6. Implement CORS properly
7. Add security headers with Helmet.js

---

## Backup and Recovery

1. Regular database backups
2. Version control for code
3. Document recovery procedures
4. Test backup restoration

---

## Support

For deployment issues:
- Check logs: `pm2 logs astrosense`
- Monitor system: `pm2 monit`
- Restart app: `pm2 restart astrosense`

For questions: support@astrosense.ai
