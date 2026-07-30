# 🩺 VitalAgent — AI Medical Voice Agent

VitalAgent is a full-stack **Next.js** application that lets a user talk to an AI-powered medical specialist over voice, in real time, and walk away with a structured, doctor-style consultation report. The user picks a specialist (General Physician, Pediatrician, Psychologist, Nutritionist, Orthopedic, Dermatologist, Cardiologist, or Neurologist), describes their concern, has a live voice conversation with the AI agent, and the platform automatically transcribes the call and turns it into a structured medical report (chief complaint, symptoms, medications mentioned, recommendations) stored against their account history.

> ⚠️ **Disclaimer:** This is an AI-assisted consultation tool for informational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Every generated report explicitly reminds users to consult a licensed physician.

---

## ✨ Core Features

- 🔐 **Authentication** — Sign-up / sign-in and route protection via Clerk.
- 🩻 **Specialist Selection** — 8 pre-configured AI doctor agents, each with its own system prompt, persona, and cloned voice.
- 🎙️ **Real-time Voice Consultation** — Live, two-way voice conversation powered by Vapi (speech-to-text, LLM response, text-to-speech) with live partial-transcript streaming in the UI.
- 🧠 **AI Report Generation** — At the end of a call, the full transcript is sent to Google Gemini, which returns a structured JSON medical report (summary, symptoms, medications, recommendations).
- 🗂️ **Consultation History** — Every session (notes, chosen doctor, transcript, and generated report) is persisted and viewable from a history dashboard.
- 💳 **Subscription / Credits Model** — Free users get limited access (General Physician only); Pro users unlock all specialists and unlimited consultations.
- 📊 **Dashboard UI** — Built with shadcn/ui + Tailwind CSS, including session creation dialogs, history tables, and a billing/upgrade page.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling / UI** | Tailwind CSS v4, shadcn/ui, Radix UI primitives, lucide-react icons |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **Voice AI** | Vapi Web SDK (`@vapi-ai/web`) for real-time voice call orchestration |
| **Generative AI** | Google Gemini (`@google/generative-ai`, model `gemini-2.5-flash`) for structured medical report generation |
| **Database** | PostgreSQL (Neon serverless — `@neondatabase/serverless`) |
| **ORM** | Drizzle ORM + drizzle-kit for schema/migrations |
| **HTTP Client** | Axios |
| **Notifications** | Sonner (toasts) |
| **Utilities** | Moment.js, UUID, clsx, tailwind-merge, class-variance-authority |
| **Tooling** | ESLint 9, TypeScript 5, React Compiler (babel-plugin-react-compiler) |

---

## 🗺️ Application Flow

### 1. Landing → Auth
```text
Visitor lands on "/"
        │
        ▼
Sign Up / Sign In (Clerk)
        │
        ▼
User record created in Postgres via /api/users
   (name, email, starting credits = 10)
```

### 2. Starting a Consultation
```text
Dashboard ("/dashboard")
        │
        ▼
User selects a Specialist (doctorAgents.ts)
        │
        ▼
"Add New Session" dialog → user enters symptom notes
        │
        ▼
POST /api/session-chart
   → creates a session_chart row (sessionId, notes, selectedDoctor)
        │
        ▼
Redirect to /dashboard/medical-agent/[sessionId]
```

### 3. Live Voice Call
```text
VoiceAgentPage mounts
        │
        ▼
GET /api/session-chart?sessionId=... → loads session + doctor persona
        │
        ▼
User clicks "Start Consultation Call"
        │
        ▼
Vapi call starts using the doctor's agentPrompt as the system prompt
   (STT → LLM → TTS, streamed in real time)
        │
        ▼
Live transcript + finalized messages rendered in the chat UI
        │
        ▼
User clicks "End Call & Generate Report"
```

### 4. AI Report Generation
```text
Call ends → full transcript + session notes sent to
        │
        ▼
POST /api/medical-report
        │
        ▼
Google Gemini (gemini-2.5-flash) analyzes the conversation
   → returns structured JSON:
     { chiefComplaint, summary, symptoms[], medicationMentioned[],
       recommendations[], disclaimer }
        │
        ▼
Report saved back onto the session_chart row
        │
        ▼
User redirected to /dashboard/history to view the report
```

### 5. Subscription Gate
```text
Free tier  → 1 consultation / General Physician only
Pro tier   → unlimited consultations, all 8 specialists,
             priority voice routing
        │
        ▼
Upgrade flow on /dashboard/billing (Clerk metadata / Stripe-style plan)
```

---

## 📂 Project Structure

```text
ai-medical-voice-agent/
├── app/
│   ├── page.tsx                      # Landing page
│   ├── layout.tsx                    # Root layout
│   ├── provider.tsx                  # App-wide providers (user context)
│   ├── globals.css                   # Tailwind + theme styles
│   ├── sign-in/                      # Clerk sign-in route
│   ├── sign-up/                      # Clerk sign-up route
│   ├── api/
│   │   ├── users/route.ts            # Create/fetch user + credits
│   │   ├── session-chart/route.ts    # Create/fetch consultation sessions
│   │   └── medical-report/route.ts   # Gemini-powered report generation
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx                  # Doctor selection + session list
│       ├── billing/page.tsx          # Pricing / upgrade page
│       ├── history/page.tsx          # Past consultations
│       ├── medical-agent/[sessionId]/page.tsx   # Live voice call UI
│       └── _components/
│           ├── AddNewSessionDialog.tsx
│           ├── AppHeader.tsx
│           ├── DoctorAgentCard.tsx
│           └── HistoryTable.tsx
├── components/
│   ├── Logo.tsx
│   └── ui/                           # shadcn/ui primitives
├── data/
│   └── doctorAgents.ts               # 8 specialist personas, prompts & voice IDs
├── utils/
│   ├── db.ts                         # Neon/Postgres connection
│   ├── schema.ts                     # Drizzle schema (users, session_chart)
│   └── subscription.ts               # Pro-plan check via Clerk metadata
├── middleware.ts                     # Clerk route protection
├── drizzle.config.ts                 # Drizzle-kit config
├── next.config.ts
├── package.json
└── README.md
```

---

## 🗄️ Data Model

```text
users
├── id            (serial, PK)
├── name           (text)
├── email          (text, unique)
└── credits        (integer, default 10)

session_chart
├── id             (serial, PK)
├── sessionId      (text, unique)
├── createdBy      (text — user email)
├── notes          (text — patient's initial complaint)
├── selectedDoctor (json — chosen specialist agent)
├── conversation   (json — full transcript)
├── report         (json — AI-generated structured report)
└── createdOn      (timestamp, default now)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- API keys for **Clerk**, **Vapi**, and **Google Gemini**

### Installation
```bash
git clone https://github.com/DevanshSingh151/ai-medical-voice-agent.git
cd ai-medical-voice-agent
npm install
```

### Environment Variables
Create a `.env.local` file in the project root:
```bash
# Database
DATABASE_URL=your_neon_postgres_connection_string

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Vapi (voice agent)
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key

# Google Gemini (report generation)
GEMINI_API_KEY=your_gemini_api_key
```

### Database Setup
```bash
npx drizzle-kit push
```

### Run the Dev Server
```bash
npm run dev
```
Visit `http://localhost:3000`.

### Other Scripts
```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

# 🌿 Git Branching Strategy

This project follows **GitHub Flow** — a lightweight, trunk-based strategy well suited to continuous integration and small teams.

## Branch Structure

```text
main
│
├── develop
│
├── feature/user-authentication
├── feature/voice-consultation
├── feature/ai-medical-report
├── feature/dashboard
├── feature/payment-system
├── feature/subscription
│
├── bugfix/login-error
├── bugfix/report-download
│
├── hotfix/security-patch
│
└── docs/readme-update
```

## Branch Purpose

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code. Only reviewed Pull Requests are merged here. |
| `develop` | Integration branch that combines completed features before they reach production. |
| `feature/*` | Implements a single, isolated feature (e.g. `feature/voice-agent`, `feature/dashboard`, `feature/report-generation`). |
| `bugfix/*` | Fixes non-critical bugs (e.g. `bugfix/payment-validation`, `bugfix/profile-update`). |
| `hotfix/*` | Critical, production-affecting fixes (e.g. `hotfix/api-crash`, `hotfix/security`). |
| `docs/*` | Documentation-only changes (e.g. `docs/readme`, `docs/api`). |

## GitHub Flow Per Feature

```text
main
 │
 ▼
Create Feature Branch
 │
 ▼
Development
 │
 ▼
Commit Changes
 │
 ▼
Push to GitHub
 │
 ▼
Open Pull Request
 │
 ▼
Code Review
 │
 ▼
Merge into develop
 │
 ▼
Testing
 │
 ▼
Merge into main
```

## Commit Message Convention (Conventional Commits)

```bash
feat: add AI medical report generation
fix: resolve login authentication issue
docs: update installation guide
refactor: optimize dashboard components
perf: improve speech recognition latency
style: update landing page layout
test: add authentication unit tests
```

## Pull Request Checklist

Every Pull Request must:
- Reference a GitHub Issue.
- Pass all checks/tests before merging.
- Be reviewed and approved.
- Have merge conflicts resolved.
- Follow the project's coding standards.

## Release Strategy (SemVer)

| Version | Description |
|---|---|
| v0.1.0 | Initial prototype |
| v0.5.0 | Authentication & AI Voice Consultation |
| v0.8.0 | Dashboard, History & Reports |
| v1.0.0 | First Stable Release |

---

## 🛠️ Development Standards

- Agile, issue-driven development with GitHub Projects (Kanban)
- GitHub Flow branching strategy
- Conventional Commits
- Pull Request–based code review
- Modular component architecture (App Router + shadcn/ui)
- Type-safe database access via Drizzle ORM
- Secure authentication and route protection via Clerk
- RESTful API routes under `app/api/*`

---

## 📄 License

This project is provided as-is for educational and demonstrational purposes. Not intended for use in real clinical decision-making.
