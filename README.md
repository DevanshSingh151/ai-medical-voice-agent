# 🚀 Development Workflow

MediVoice AI follows an **Agile Software Development Lifecycle (SDLC)** using **GitHub Flow** for version control and collaborative development. Every feature is tracked using GitHub Issues, organized using GitHub Projects (Kanban Board), and developed through dedicated feature branches before being merged into the main branch.

## Development Lifecycle

```text
Requirements Gathering
        │
        ▼
Vision Document
        │
        ▼
User Stories (GitHub Issues)
        │
        ▼
MoSCoW Prioritization
        │
        ▼
Wireframes (Figma)
        │
        ▼
System Architecture (Draw.io)
        │
        ▼
Feature Development
        │
        ▼
Testing
        │
        ▼
Code Review
        │
        ▼
Merge to Main
        │
        ▼
Docker Build
        │
        ▼
Deployment
```

---

# 📌 Agile Development Process

The project follows an iterative Agile methodology.

### Sprint Planning

- Define project goals
- Create GitHub Issues
- Prioritize using MoSCoW
- Assign milestones

### Development

- Create feature branch
- Implement functionality
- Commit changes regularly
- Push code to GitHub

### Code Review

- Review implementation
- Verify acceptance criteria
- Resolve conflicts
- Merge Pull Request

### Testing

- Functional Testing
- UI Testing
- API Testing
- Authentication Testing
- AI Workflow Testing

### Deployment

- Docker Build
- Environment Configuration
- Cloud Deployment
- Production Verification

---

# 🌿 Git Branching Strategy

MediVoice AI follows **GitHub Flow**, which is lightweight and ideal for continuous integration.

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

---

## Branch Purpose

### main

- Stable production-ready code.
- Only reviewed Pull Requests are merged here.

---

### develop

- Integration branch.
- Combines completed features before production.

---

### feature/*

Used for implementing individual features.

Examples

```
feature/authentication
feature/dashboard
feature/voice-agent
feature/report-generation
```

---

### bugfix/*

Fixes non-critical bugs.

Examples

```
bugfix/payment-validation
bugfix/profile-update
```

---

### hotfix/*

Critical fixes directly affecting production.

Examples

```
hotfix/api-crash
hotfix/security
```

---

### docs/*

Documentation improvements.

Examples

```
docs/readme
docs/api
```

---

# 🔄 GitHub Flow

Each feature follows the workflow below.

```text
main
 │
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

---

# 📋 Commit Message Convention

The project follows **Conventional Commits**.

### Features

```bash
feat: add AI medical report generation
```

### Bug Fixes

```bash
fix: resolve login authentication issue
```

### Documentation

```bash
docs: update installation guide
```

### Refactoring

```bash
refactor: optimize dashboard components
```

### Performance

```bash
perf: improve speech recognition latency
```

### Styling

```bash
style: update landing page layout
```

### Testing

```bash
test: add authentication unit tests
```

---

# 🔀 Pull Request Workflow

Every Pull Request must:

- Reference a GitHub Issue.
- Pass testing before merging.
- Be reviewed before approval.
- Resolve merge conflicts.
- Follow project coding standards.

Example:

```
Feature Branch
      │
      ▼
Push Changes
      │
      ▼
Open Pull Request
      │
      ▼
Automated Checks
      │
      ▼
Code Review
      │
      ▼
Merge to develop
      │
      ▼
Merge to main
```

---

# 📦 Release Strategy

The project follows **Semantic Versioning (SemVer)**.

| Version | Description |
|----------|-------------|
| v0.1.0 | Initial prototype |
| v0.5.0 | Authentication & AI Consultation |
| v0.8.0 | Dashboard & Reports |
| v1.0.0 | First Stable Release |

---

# 🐳 Docker Development Workflow

```text
Clone Repository
       │
       ▼
Configure .env
       │
       ▼
docker-compose up --build
       │
       ▼
Containers Running
       │
       ▼
Frontend
Backend
AI Service
Database
       │
       ▼
Application Ready
```

---

# 📊 GitHub Project Workflow

The repository follows a Kanban-based Agile board.

```text
📌 Backlog
      │
      ▼
📝 Ready
      │
      ▼
🚧 In Progress
      │
      ▼
👀 Review
      │
      ▼
✅ Done
```

Every GitHub Issue progresses through these stages until completion.

---

# 📈 Repository Structure

```text
MediVoice-AI
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── services/
│
├── ai-service/
│   ├── prompts/
│   ├── speech/
│   ├── report-generation/
│   └── llm/
│
├── database/
│   ├── schema/
│   ├── migrations/
│   └── seed/
│
├── docs/
├── wireframes/
├── architecture/
├── screenshots/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── LICENSE
```

---

# 📖 Development Standards

The project follows these engineering practices:

- Agile Software Development
- GitHub Flow Branching Strategy
- Conventional Commits
- Issue-Driven Development
- Pull Request Based Code Reviews
- Dockerized Development Environment
- Modular Component Architecture
- Clean Code Principles
- Responsive UI Design
- AI-Assisted Healthcare Workflow
- Secure Authentication using Clerk
- RESTful API Communication
