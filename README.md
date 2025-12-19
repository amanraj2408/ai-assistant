# AI Chat Assistant - Complete Setup Guide

A full-stack AI chat application built with Next.js, TypeScript, Tailwind CSS, NextAuth, Drizzle ORM, and Google Gemini AI. Features real-time weather, stock prices, and F1 racing information through AI tool calling.

## ✨ Features

- **AI-Powered Chat**: Real-time conversations with Google Gemini AI
- **Tool Integration**: 
  - 🌤️ Weather Information (OpenWeatherMap)
  - 📈 Stock Prices (Alpha Vantage)
  - 🏎️ F1 Racing Data (Ergast API)
- **Authentication**: GitHub & Google OAuth via NextAuth
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time Streaming**: Seamless AI response streaming
- **Chat History**: Persistent session management
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (with npm)
- PostgreSQL database (Neon recommended for cloud)
- GitHub OAuth App credentials
- Google OAuth credentials
- Gemini API key
- OpenWeatherMap API key
- Alpha Vantage API key

### 1. Clone and Install

```bash
git clone <your-github-repo-url>
cd ai-assistant
npm install --legacy-peer-deps
```

### 2. Setup Environment Variables

Create `.env.local` in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers - Get from respective developer consoles
GITHUB_ID=your-github-oauth-app-id
GITHUB_SECRET=your-github-oauth-app-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Database - Create at https://neon.tech (free tier available)
DATABASE_URL=postgresql://user:password@db.neon.tech/dbname?sslmode=require

# AI Provider
GEMINI_API_KEY=your-gemini-api-key

# External APIs
OPENWEATHERMAP_API_KEY=your-openweathermap-api-key
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-api-key
```

### 3. Setup OAuth Credentials

#### GitHub OAuth
1. Go to [GitHub Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: AI Chat Assistant
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Copy Client ID and Client Secret to `.env.local`

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs: http://localhost:3000/api/auth/callback/google
6. Copy Client ID and Client Secret to `.env.local`

### 4. Get API Keys

- **Gemini API**: [Get at Google AI Studio](https://makersuite.google.com/app/apikey)
- **OpenWeatherMap**: [Sign up at openweathermap.org](https://openweathermap.org/api)
- **Alpha Vantage**: [Get API key at alphavantage.co](https://www.alphavantage.co/api/)

### 5. Setup Database

```bash
# Generate migrations
npx drizzle-kit generate:pg

# Push schema to database
npx drizzle-kit push:pg
```

### 6. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

## 📦 Deployment Options

### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Add environment variables from `.env.local`
6. Deploy!

```bash
# Or deploy via CLI
npm install -g vercel
vercel
```

### Option B: Docker & Cloud Run

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and deploy:

```bash
# Google Cloud Run
docker build -t ai-chat-assistant .
docker tag ai-chat-assistant gcr.io/PROJECT_ID/ai-chat-assistant
docker push gcr.io/PROJECT_ID/ai-chat-assistant
# Then deploy via Cloud Run console

# Or AWS ECS/EKS
docker build -t ai-chat-assistant .
# Push to ECR and deploy via ECS
```

### Option C: Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project > Deploy from GitHub
4. Select repository
5. Add environment variables
6. Deploy!

### Option D: Self-Hosted (VPS)

```bash
# SSH into your VPS
ssh user@your-vps

# Install Node.js and PostgreSQL
# Then:
git clone <your-repo>
cd ai-assistant
npm install --legacy-peer-deps

# Setup environment variables
nano .env.local

# Build and run
npm run build
npm start

# Keep running with PM2
npm install -g pm2
pm2 start npm --name "ai-chat" -- start
pm2 save
```

## 🗂️ Project Structure

```
ai-assistant/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth].ts      # NextAuth handler
│   │   │   └── chat/route.ts              # AI chat endpoint
│   │   ├── auth/signin/page.tsx           # Login page
│   │   ├── chat/
│   │   │   ├── layout.tsx                 # Chat layout with sidebar
│   │   │   ├── page.tsx                   # New chat creation
│   │   │   └── [id]/page.tsx              # Chat interface
│   │   ├── layout.tsx                     # Root layout
│   │   ├── page.tsx                       # Home page
│   │   ├── providers.tsx                  # NextAuth provider
│   │   └── globals.css                    # Global styles
│   ├── components/
│   │   ├── ui/                            # UI components
│   │   ├── ChatInterface.tsx              # Main chat UI
│   │   ├── ChatMessage.tsx                # Message display
│   │   ├── WeatherCard.tsx                # Weather display
│   │   ├── RaceCard.tsx                   # F1 race display
│   │   ├── PriceCard.tsx                  # Stock price display
│   │   ├── Navbar.tsx                     # Navigation bar
│   │   ├── LoginButton.tsx                # OAuth buttons
│   │   └── LogoutButton.tsx               # Sign out
│   ├── db/
│   │   ├── schema.ts                      # Drizzle schema
│   │   ├── db.ts                          # Database client
│   │   └── migrations/                    # Auto-generated migrations
│   ├── lib/
│   │   ├── auth.ts                        # NextAuth config
│   │   ├── tools.ts                       # AI tools (weather, stock, F1)
│   │   └── utils.ts                       # Utility functions
│   ├── server/
│   │   └── actions.ts                     # Server actions
│   └── types/
│       └── index.ts                       # TypeScript types
├── public/                                # Static files
├── .env.local                             # Environment variables (local)
├── .env.example                           # Environment template
├── drizzle.config.ts                      # Drizzle configuration
├── tsconfig.json                          # TypeScript config
├── tailwind.config.ts                     # Tailwind config
├── next.config.js                         # Next.js config
├── package.json                           # Dependencies
└── README.md                              # This file
```

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run db:push    # Push schema to database
npm run db:generate # Generate migrations
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js with GitHub & Google
- **Database**: PostgreSQL + Drizzle ORM
- **AI**: Google Gemini 1.5 Flash via Vercel AI SDK
- **APIs**: OpenWeatherMap, Alpha Vantage, Ergast
- **UI**: Lucide React Icons
- **Forms**: React Hook Form + Zod

## 📚 API Endpoints

### Chat
- `POST /api/chat` - Send message and get AI response (streaming)

### Auth
- `GET /api/auth/signin` - OAuth sign in
- `GET /api/auth/signout` - Sign out
- `GET /api/auth/callback/github` - GitHub callback
- `GET /api/auth/callback/google` - Google callback

## 🔒 Security Best Practices

- All sensitive keys in environment variables
- Server actions for database operations
- NextAuth session validation
- CSRF protection enabled
- SQL injection prevention with Drizzle ORM
- HTTPS enforced in production

## 🐛 Troubleshooting

### Database Connection Failed
- Verify `DATABASE_URL` is correct
- Check PostgreSQL service is running
- Test connection with: `psql <DATABASE_URL>`

### OAuth not working
- Verify redirect URLs match exactly
- Check credentials in `.env.local`
- Clear browser cookies and try again

### AI responses not streaming
- Check Gemini API key is valid
- Verify `NEXTAUTH_SECRET` is set
- Check browser console for errors

### Build fails
- Delete `.next` folder
- Run `npm install --legacy-peer-deps`
- Check for TypeScript errors: `npm run lint`

## 📝 Environment Variables Reference

| Variable | Purpose | Where to Get |
|----------|---------|-------------|
| `NEXTAUTH_SECRET` | Session encryption | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` for dev |
| `GITHUB_ID` | GitHub OAuth | GitHub Developer Settings |
| `GITHUB_SECRET` | GitHub OAuth | GitHub Developer Settings |
| `GOOGLE_CLIENT_ID` | Google OAuth | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth | Google Cloud Console |
| `DATABASE_URL` | PostgreSQL connection | Neon.tech or your DB provider |
| `GEMINI_API_KEY` | Google Gemini AI | Google AI Studio |
| `OPENWEATHERMAP_API_KEY` | Weather data | OpenWeatherMap.org |
| `ALPHA_VANTAGE_API_KEY` | Stock data | AlphaVantage.co |

## 📞 Support

For issues, check:
1. `.env.local` variables are set correctly
2. Database is accessible
3. APIs are responding (test with curl)
4. Browser console for client-side errors
5. Server logs for backend errors

## 📄 License

MIT

## 🎉 Next Steps

1. Customize branding and colors
2. Add more tools/integrations
3. Implement user preferences
4. Add rate limiting
5. Setup monitoring & logging
6. Create mobile app wrapper

---

**Ready to deploy? Follow one of the deployment options above!**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
