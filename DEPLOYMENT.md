# Deployment Guide - GitHub to Production

This guide covers deploying your AI Chat Assistant to GitHub and then to various hosting platforms.

## 📱 Step 1: Push to GitHub

### Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ai-assistant`
3. Description: `AI-powered chat assistant with real-time weather, stocks, and F1 data`
4. Choose: Public or Private
5. Do NOT initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

### Push Your Code

```bash
cd d:\FSD-AI\ai-assistant

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ai-assistant.git

# Rename branch if needed (default might be 'master')
git branch -M main

# Push code
git push -u origin main

# Push subsequent changes
git push
```

### Verify on GitHub

- Visit `https://github.com/YOUR_USERNAME/ai-assistant`
- Confirm all files are there
- Check .env.local is NOT uploaded (should be in .gitignore)

---

## 🚀 Step 2: Choose Your Deployment Platform

### 🟦 Option A: Vercel (BEST FOR NEXT.JS)

Vercel is built by the creators of Next.js and offers the smoothest deployment experience.

#### Setup

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (authorize the connection)
3. Click "New Project"
4. Select your `ai-assistant` repository
5. Vercel will auto-detect Next.js

#### Configure Environment

1. Under "Environment Variables", add all your secrets from `.env.local`:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → set to your Vercel domain (e.g., `https://ai-assistant-abc123.vercel.app`)
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `DATABASE_URL`
   - `GEMINI_API_KEY`
   - `OPENWEATHERMAP_API_KEY`
   - `ALPHA_VANTAGE_API_KEY`

2. Update OAuth redirect URLs:
   - **GitHub**: `https://YOUR_VERCEL_URL/api/auth/callback/github`
   - **Google**: `https://YOUR_VERCEL_URL/api/auth/callback/google`

#### Deploy

```bash
# Deploy immediately
git push origin main

# Vercel auto-deploys on every push!

# Or manually deploy via CLI
npm install -g vercel
vercel deploy --prod
```

#### Post-Deployment

- Custom domain: Settings → Domains
- View logs: Deployments tab
- Rollback: Click "Redeploy" on any previous deployment

---

### 🐳 Option B: Docker + Cloud Run (Google)

Best for containerized deployments with auto-scaling.

#### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Set NODE_ENV
ENV NODE_ENV=production

# Start
CMD ["npm", "start"]
```

#### Setup Google Cloud

```bash
# Install Google Cloud SDK
# Download from: https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Create project
gcloud projects create ai-assistant-prod

# Set project
gcloud config set project ai-assistant-prod

# Enable services
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

#### Build and Deploy

```bash
# Build Docker image
docker build -t gcr.io/ai-assistant-prod/ai-assistant:latest .

# Push to Google Container Registry
docker push gcr.io/ai-assistant-prod/ai-assistant:latest

# Deploy to Cloud Run
gcloud run deploy ai-assistant \
  --image gcr.io/ai-assistant-prod/ai-assistant:latest \
  --platform managed \
  --region us-central1 \
  --set-env-vars="NEXTAUTH_SECRET=xxx,DATABASE_URL=xxx,..." \
  --allow-unauthenticated
```

Or use Google Cloud Console:
1. Cloud Run → Create Service
2. Select Docker image from Container Registry
3. Add environment variables
4. Deploy!

---

### 🚂 Option C: Railway

Simple and Node.js friendly. Deploy straight from GitHub.

#### Setup

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "GitHub Repo"
5. Choose your `ai-assistant` repository
6. Railway auto-detects and configures

#### Add Environment Variables

1. Go to Variables tab
2. Add all from `.env.local`
3. Railway will use them automatically

#### Deploy

```bash
# Simply push to GitHub
git push origin main

# Railway auto-deploys!
```

#### Custom Domain

Settings → Domains → Add Custom Domain

---

### 💻 Option D: Self-Hosted VPS

Best for full control and cost savings on smaller deployments.

#### Prerequisites

- VPS with Ubuntu 20.04+ (Linode, DigitalOcean, AWS EC2, etc.)
- SSH access
- Domain name

#### Setup

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Git
apt install -y git

# Clone repository
git clone https://github.com/YOUR_USERNAME/ai-assistant.git
cd ai-assistant

# Install dependencies
npm install --legacy-peer-deps

# Setup environment
nano .env.local
# Paste all environment variables
# Save: Ctrl+X, Y, Enter

# Build
npm run build

# Setup database migrations
npx drizzle-kit push:pg

# Install PM2 for process management
npm install -g pm2

# Start app with PM2
pm2 start npm --name "ai-assistant" -- start

# Make it restart on reboot
pm2 startup
pm2 save

# Install Nginx
apt install -y nginx

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/default
```

#### Nginx Configuration

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

```bash
# Test and reload Nginx
nginx -t
systemctl reload nginx

# Setup SSL with Let's Encrypt
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

#### Monitoring

```bash
# View logs
pm2 logs ai-assistant

# Monitor performance
pm2 monit

# Restart if needed
pm2 restart ai-assistant
```

---

## 🔐 Step 3: Setup Production Secrets

### Update OAuth Callbacks

After deployment, update your OAuth provider settings with actual URLs:

#### GitHub
1. Settings → Developer Settings → OAuth Apps → Your App
2. Update "Authorization callback URL": `https://YOUR_PRODUCTION_URL/api/auth/callback/github`

#### Google
1. Google Cloud Console → OAuth 2.0 Credentials
2. Edit → Update "Authorized redirect URIs": `https://YOUR_PRODUCTION_URL/api/auth/callback/google`

### Set NEXTAUTH_URL

Add to production environment variables:
```
NEXTAUTH_URL=https://your-production-url.com
```

---

## 🧪 Step 4: Test Deployment

After deployment, test these:

```bash
# Test homepage
curl https://YOUR_PRODUCTION_URL

# Test auth
curl https://YOUR_PRODUCTION_URL/api/auth/signin

# Test chat endpoint
curl -X POST https://YOUR_PRODUCTION_URL/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

---

## 📊 Step 5: Monitor & Maintain

### Vercel Monitoring
- Dashboard → Deployments → View logs
- Analytics → Performance metrics
- Alerts → Set up notifications

### Manual Monitoring
```bash
# Check logs
pm2 logs

# Monitor resources
htop

# Check database
psql $DATABASE_URL -c "SELECT version();"

# Update code
git pull
npm install
npm run build
pm2 restart ai-assistant
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci --legacy-peer-deps
      - run: npm run build
      - run: npm run lint
      
      # Deploy to Vercel
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Get Vercel Tokens
1. Vercel → Settings → Tokens
2. Copy token and add to GitHub Secrets
3. Also add ORG_ID and PROJECT_ID

---

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set in production
- [ ] Database migrations run
- [ ] OAuth redirect URLs updated
- [ ] NEXTAUTH_URL set correctly
- [ ] SSL certificate installed (if self-hosted)
- [ ] Tested sign-in with GitHub/Google
- [ ] Tested chat functionality
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Custom domain configured
- [ ] Performance optimized

---

## 🚨 Troubleshooting Deployment

### Build fails
```bash
# Check logs
npm run build

# Clear cache
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Database connection error
```bash
# Verify DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### OAuth not working
- Verify redirect URLs match exactly
- Check NEXTAUTH_SECRET is set
- Verify credentials in environment

### App crashes after deploy
```bash
# Check logs
pm2 logs

# Check Node version
node --version

# Rebuild and restart
npm run build
pm2 restart ai-assistant
```

---

## 📞 Support

- Vercel: [vercel.com/support](https://vercel.com/support)
- Railway: [docs.railway.app](https://docs.railway.app)
- Google Cloud: [cloud.google.com/docs](https://cloud.google.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

**Happy deploying! 🚀**
