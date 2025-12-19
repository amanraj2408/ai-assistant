# 🚀 Quick Start Commands

## Local Development

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Create .env.local with all variables from .env.example
# Edit .env.local and add your API keys

# 3. Setup database (if not done yet)
npx drizzle-kit generate:pg
npx drizzle-kit push:pg

# 4. Start development server
npm run dev

# App runs at http://localhost:3000
```

## GitHub Push

```bash
# First time only
git remote add origin https://github.com/YOUR_USERNAME/ai-assistant.git
git branch -M main

# Push code
git push -u origin main

# Future pushes
git push
```

## Environment Setup

### Get API Keys (5 minutes)

1. **Gemini API**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Click "Get API Key" → "Create API key in new project"

2. **OpenWeatherMap**: [openweathermap.org/api](https://openweathermap.org/api)
   - Sign up → API keys → Copy Free API key

3. **Alpha Vantage**: [alphavantage.co/api](https://www.alphavantage.co/api/)
   - Sign up → Get free API key

4. **GitHub OAuth**: [github.com/settings/developers](https://github.com/settings/developers)
   - New OAuth App → Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

5. **Google OAuth**: [console.cloud.google.com](https://console.cloud.google.com)
   - New project → Enable Google+ API → OAuth 2.0 credentials → Add redirect URI: `http://localhost:3000/api/auth/callback/google`

6. **PostgreSQL**: [neon.tech](https://neon.tech) (free tier)
   - Sign up → Create database → Copy connection string

### Generate NextAuth Secret

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | Cut-c 1-32
```

### .env.local Template

```env
# Required - generate above
NEXTAUTH_SECRET=<your-generated-secret>
NEXTAUTH_URL=http://localhost:3000

# OAuth - from provider settings
GITHUB_ID=<your-github-id>
GITHUB_SECRET=<your-github-secret>
GOOGLE_CLIENT_ID=<your-google-id>
GOOGLE_CLIENT_SECRET=<your-google-secret>

# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# APIs
GEMINI_API_KEY=<your-gemini-key>
OPENWEATHERMAP_API_KEY=<your-weather-key>
ALPHA_VANTAGE_API_KEY=<your-stock-key>
```

## Deployment (Choose One)

### Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel deploy --prod

# Or connect via web:
# 1. vercel.com → New Project
# 2. Select GitHub repo
# 3. Add environment variables
# 4. Deploy
```

### Docker + Cloud Run

```bash
# Build Docker image
docker build -t ai-chat-assistant .

# Tag for Google Container Registry
docker tag ai-chat-assistant gcr.io/PROJECT_ID/ai-chat-assistant

# Push to GCR
docker push gcr.io/PROJECT_ID/ai-chat-assistant

# Deploy via Cloud Run Console
# cloud.run.google.com
```

### Railway

```bash
# Simple:
# 1. railway.app → New Project
# 2. Deploy from GitHub
# 3. Add environment variables
# 4. Deploy!
```

### Self-Hosted (VPS)

```bash
# On your VPS
git clone https://github.com/YOUR_USERNAME/ai-assistant.git
cd ai-assistant
npm install --legacy-peer-deps
nano .env.local  # Add all variables

npm run build
npm install -g pm2
pm2 start npm --name "ai-chat" -- start
pm2 save
```

## Useful Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Check code quality

# Database
npx drizzle-kit generate:pg    # Generate migrations
npx drizzle-kit push:pg        # Push to database
npx drizzle-kit studio         # Open database UI

# Git
git status            # Check changes
git add .             # Stage all
git commit -m "msg"   # Commit
git push              # Push to GitHub
git log               # View history

# Dependencies
npm list              # Show installed packages
npm update            # Update packages
npm audit             # Check security
```

## Testing Features

### Test Chat
1. Go to http://localhost:3000
2. Sign in with GitHub or Google
3. Create a new chat
4. Try messages:
   - "What's the weather in London?"
   - "What's the stock price of AAPL?"
   - "Tell me about the next F1 race"

### Test Database
```bash
# Connect to database
psql $DATABASE_URL

# List tables
\dt

# View users
SELECT * FROM users;

# View chat sessions
SELECT * FROM chat_sessions;

# Exit
\q
```

## Common Issues

### Build fails
```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Database errors
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Regenerate migrations
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

### OAuth not working
- Verify redirect URLs match exactly
- Check credentials in .env.local
- Clear browser cookies

### Port 3000 already in use
```bash
# Kill process using port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

## Documentation Files

- **README.md** - Full project documentation
- **DEPLOYMENT.md** - Detailed deployment guide
- **QUICKSTART.md** - This file

## Next Steps

1. ✅ Setup environment variables
2. ✅ Run `npm run dev` locally
3. ✅ Test features
4. ✅ Push to GitHub
5. ✅ Deploy to production (Vercel recommended)
6. ✅ Update OAuth redirect URLs for production
7. ✅ Test sign-in and chat on production

---

**Need help? Check README.md and DEPLOYMENT.md for detailed instructions!**
