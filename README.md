# 🩺 AI Medical Voice Agent

<div align="center">

![AI Medical Voice Agent Banner](https://img.shields.io/badge/AI%20Medical-Voice%20Agent-blue?style=for-the-badge&logo=react&logoColor=white)

**A futuristic, voice-powered virtual doctor that listens, understands, and responds in real time.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Clerk](https://img.shields.io/badge/Clerk-Auth%20%2B%20Billing-purple?style=flat-square)](https://clerk.com)
[![Vapi](https://img.shields.io/badge/Vapi-Voice%20AI-orange?style=flat-square)](https://vapi.ai)
[![AssemblyAI](https://img.shields.io/badge/AssemblyAI-Speech--to--Text-red?style=flat-square)](https://assemblyai.com)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-green?style=flat-square&logo=postgresql)](https://neon.tech)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

<br/>

> 🎙️ *Speak your symptoms. Get AI-powered medical guidance. Instantly.*

<br/>

[🚀 Live Demo](#) · [📖 Documentation](#getting-started) · [🐛 Report Bug](#) · [✨ Request Feature](#)

</div>

---

## ✨ What Makes This Special?

Imagine having a **board-certified AI doctor** available 24/7 — one that listens to you in real time, understands your symptoms, asks follow-up questions, and generates a complete medical report — all within seconds.

This is not just another chatbot. This is a **full-stack production-ready SaaS** with:

- 🎤 **Real-time voice conversations** — speak naturally, no typing required
- 🧠 **8 specialized AI doctors** — from General Physician to Cardiologist
- 📋 **Auto-generated medical reports** — structured, detailed, downloadable
- 💳 **Built-in subscription billing** — monetize your app from day one
- 🔒 **Enterprise-grade authentication** — secure, scalable, production-ready

---

## 🎬 Demo

```
User:  "I've had a sharp headache behind my eyes since this morning..."

AI:    "I'm sorry to hear that. Is the pain constant or does it come
        and go? Have you experienced any sensitivity to light or nausea?"

User:  "Yes, light hurts my eyes and I feel a bit nauseous."

AI:    "Based on your symptoms, this could be a migraine. I'd recommend
        resting in a dark room, staying hydrated, and taking ibuprofen.
        If symptoms worsen or last beyond 72 hours, please see a doctor."
```

*All of this happens in real-time voice — no typing, no waiting.*

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     USER'S BROWSER                          │
│                                                             │
│   🎤 Microphone → AssemblyAI → Text                        │
│                                    ↓                        │
│                               Vapi AI ←→ GPT-4             │
│                                    ↓                        │
│   🔊 Speaker  ← PlayHT ← AI Response Text                  │
└─────────────────────────────────────────────────────────────┘
          ↕                              ↕
┌─────────────────┐            ┌──────────────────┐
│   Clerk Auth    │            │  Neon PostgreSQL  │
│  + Billing      │            │  (Drizzle ORM)    │
└─────────────────┘            └──────────────────┘
          ↕
┌─────────────────┐
│  Vercel Deploy  │
│  (Global CDN)   │
└─────────────────┘
```

---

## 🩻 Features at a Glance

### 🎙️ Voice AI Engine
- **Real-time speech-to-text** via AssemblyAI Universal Streaming
- **300ms ultra-low latency** — feels like talking to a real person
- **91%+ transcription accuracy** — understands accents and medical terms
- **Live transcript display** — see your words as you speak them

### 👨‍⚕️ 8 AI Specialist Doctors
| Specialist | Expertise |
|---|---|
| 🩺 General Physician | Common illnesses, general health |
| 👶 Pediatrician | Children's health, infant care |
| 🧠 Psychologist | Mental health, stress, anxiety |
| 🥗 Nutritionist | Diet, meal planning, weight management |
| 🦴 Orthopedic | Bones, joints, muscles, injuries |
| 🔬 Dermatologist | Skin conditions, rashes, acne |
| ❤️ Cardiologist | Heart health, blood pressure |
| 🧬 Neurologist | Nervous system, migraines, neurological issues |

### 📋 Smart Medical Reports
Every consultation generates a structured report containing:
- Chief complaint & symptom analysis
- Conversation summary
- Symptom duration & severity
- Medication recommendations
- Rest & lifestyle recommendations
- AI disclaimer for safety

### 💳 Subscription Billing (Clerk + Stripe)
- **Free tier** — 1 consultation with General Physician
- **Pro tier** — Unlimited access to all 8 specialists
- One-line integration: just `<PricingTable />` — that's it

### 🔐 Authentication (Clerk)
- Google OAuth + Email/Password
- Protected routes via middleware
- User profile management
- Session persistence

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Full-stack web application |
| **Language** | TypeScript | Type safety & better DX |
| **Styling** | Tailwind CSS v4 + ShadCN UI | Beautiful responsive UI |
| **Auth + Billing** | Clerk | Authentication & Stripe subscriptions |
| **Database** | Neon PostgreSQL | Cloud-hosted database |
| **ORM** | Drizzle ORM | Type-safe database queries |
| **Voice Agent** | Vapi AI | Voice pipeline orchestration |
| **Speech-to-Text** | AssemblyAI | Real-time live transcription |
| **AI Model** | Google Gemini / OpenAI GPT-4 | AI intelligence & report generation |
| **Text-to-Speech** | PlayHT | Natural-sounding AI voice |
| **Deployment** | Vercel | Global CDN hosting |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
```bash
node --version   # v18 or higher
npm --version    # v9 or higher
git --version    # any recent version
```

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-medical-voice-agent.git
cd ai-medical-voice-agent
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# ================================
# CLERK - Authentication & Billing
# ================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ================================
# NEON DATABASE
# ================================
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require

# ================================
# VAPI AI - Voice Agent
# ================================
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key
NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=your_assistant_id

# ================================
# AI MODEL
# ================================
GEMINI_API_KEY=AIzaSyxxxxxxxxxx

# ================================
# ASSEMBLYAI - Speech to Text
# ================================
ASSEMBLYAI_API_KEY=your_assemblyai_key
```

### 4. Get Your API Keys

| Service | Where to Get | Free Tier |
|---|---|---|
| [Clerk](https://clerk.com) | Dashboard → API Keys | ✅ Free |
| [Neon](https://neon.tech) | Project → Connect | ✅ Free |
| [Vapi](https://vapi.ai) | Dashboard → API Keys | ✅ 1000 mins free |
| [Google AI Studio](https://aistudio.google.com) | Get API Key | ✅ Free |
| [AssemblyAI](https://assemblyai.com) | Dashboard → API Key | ✅ $50 free credit |

### 5. Set Up the Database

```bash
# Install dotenv
npm install dotenv

# Push schema to Neon
npx drizzle-kit push
```

You should see your `users` and `session_chart` tables appear in your Neon dashboard.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll see the app running! 🎉

---

## 📁 Project Structure

```
ai-medical-voice-agent/
├── 📁 app/
│   ├── 📁 (routes)/
│   │   ├── 📁 dashboard/           # Protected workspace
│   │   │   ├── 📁 _components/     # Dashboard components
│   │   │   ├── 📁 billing/         # Subscription page
│   │   │   ├── 📁 history/         # Consultation history
│   │   │   └── 📁 medical-agent/   # Voice agent conversation
│   │   │       └── 📁 [sessionId]/ # Dynamic session route
│   │   ├── 📁 sign-in/             # Clerk sign in page
│   │   └── 📁 sign-up/             # Clerk sign up page
│   ├── 📁 api/                     # Backend API routes
│   │   ├── 📁 users/               # User management
│   │   ├── 📁 session-chart/       # Session CRUD
│   │   └── 📁 medical-report/      # AI report generation
│   ├── layout.tsx                  # Root layout with providers
│   └── provider.tsx                # Global state context
├── 📁 components/
│   └── 📁 ui/                      # ShadCN components
├── 📁 config/
│   ├── db.tsx                      # Neon DB connection
│   └── schema.ts                   # Drizzle table schemas
├── 📁 data/
│   └── doctorAgents.ts             # AI doctor configurations
├── 📁 public/                      # Static assets & images
├── 📁 utils/                       # Utility functions
├── drizzle.config.ts               # Drizzle configuration
├── middleware.ts                   # Clerk route protection
└── .env.local                      # Environment variables
```

---

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  name      TEXT,
  email     TEXT UNIQUE,
  credits   INTEGER DEFAULT 10
);

-- Session Chart Table
CREATE TABLE session_chart (
  id               SERIAL PRIMARY KEY,
  session_id       TEXT UNIQUE,
  created_by       TEXT,              -- user email
  notes            TEXT,              -- symptoms entered
  selected_doctor  JSON,              -- doctor object
  conversation     JSON,              -- full message history
  report           JSON,              -- AI-generated report
  created_on       TIMESTAMP DEFAULT NOW()
);
```

---

## 🌊 User Flow

```
Landing Page → Sign In (Clerk) → Dashboard
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                  Enter Symptoms              Browse Doctors
                         │                         │
                  AI Suggests                 Select Doctor
                  Specialists                      │
                         │                         │
                         └────────────┬────────────┘
                                      │
                              Voice Conversation
                              (Vapi + AssemblyAI)
                                      │
                               End Consultation
                                      │
                            AI Generates Report
                            (Gemini / GPT-4)
                                      │
                             View Report + History
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables
4. Click Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel --prod
```

### After Deployment

- Add your Vercel URL to **Clerk Domains**
- Switch Clerk from Development → **Production mode**
- Update API keys with `pk_live_` and `sk_live_` versions

---

## 📸 Screenshots

### 🏠 Landing Page
> Beautiful animated hero section with feature highlights

### 📊 Dashboard
> Clean consultation history + AI specialist doctor grid

### 🎙️ Voice Conversation
> Real-time voice interface with live transcript display

### 📋 Medical Report
> Structured detailed report with symptoms, medications & recommendations

### 💳 Billing
> One-click subscription with Clerk's built-in pricing table

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 🔮 Roadmap

- [ ] 📱 Mobile app (React Native)
- [ ] 🌍 Multi-language support
- [ ] 📊 Health analytics dashboard
- [ ] 🔔 Appointment reminders
- [ ] 📁 Medical history PDF export
- [ ] 🏥 Integration with real healthcare APIs
- [ ] 👨‍👩‍👧 Family account management
- [ ] 🤖 Custom AI doctor creator

---

## ⚠️ Disclaimer

> This application is built for **educational and demonstration purposes only**. The AI medical responses are generated by language models and should **never replace professional medical advice**. Always consult a qualified healthcare professional for medical decisions.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [Vapi AI](https://vapi.ai) — for the incredible voice agent infrastructure
- [AssemblyAI](https://assemblyai.com) — for blazing-fast speech-to-text
- [Clerk](https://clerk.com) — for seamless auth and billing
- [Neon](https://neon.tech) — for serverless PostgreSQL
- [ShadCN UI](https://ui.shadcn.com) — for beautiful components
- [Vercel](https://vercel.com) — for effortless deployment

---

<div align="center">

**Built with ❤️ using Next.js, Vapi AI, AssemblyAI, and Clerk**

⭐ **Star this repo if you found it helpful!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/ai-medical-voice-agent?style=social)](https://github.com/YOUR_USERNAME/ai-medical-voice-agent)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/ai-medical-voice-agent?style=social)](https://github.com/YOUR_USERNAME/ai-medical-voice-agent)

</div>
