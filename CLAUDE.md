# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Run ESLint (extends next/core-web-vitals)
```

No test framework is configured — there is no test script and the `test/` directory is empty.

**Database (Drizzle ORM):**
```bash
npx drizzle-kit generate   # Generate migration files from schema changes
npx drizzle-kit push       # Push schema directly to Neon database
```

## Architecture

**AiCruiter** is a full-stack Next.js 15 app using the App Router. It is a single monolith — no monorepo, no separate backend service.

### Routing & Pages

All routes live in `app/` and follow App Router conventions:

| Route | Purpose |
|-------|---------|
| `/Home` | Landing page |
| `/Dashboard` | User's interview list; create interview |
| `/Dashboard/Create-Interview` | Multi-step interview creation form |
| `/interview/[interviewID]` | Interview detail/preview |
| `/interview/[interviewID]/start` | Live voice interview session |
| `/interview/[interviewID]/finish` | Post-interview feedback view |
| `/Resume` | Resume upload and ATS analysis |
| `/Billing` | Billing page |
| `/(auth)` | Clerk-managed sign-in |

`app/page.js` is a simple redirect to `/Home`. The root layout (`app/layout.js`) wraps everything in `ClerkProvider` and the custom `Provider` component (`app/provider.js`).

### Authentication

Clerk handles all auth. `middleware.js` protects every route except `/sign-in` and `/Home`. The custom `Provider` (`app/provider.js`) runs on the client, reads the Clerk user on mount, and upserts a row into the `users` table via direct DB call.

### Database

**Neon PostgreSQL** accessed via Drizzle ORM. Schema is defined in `db/schema.js`:

- `users` — email (unique), name
- `interviewtable` — UUID PK, jobRole, jobdescription, interviewtype, duration, `questionlist` (JSONB), useremail (FK), timestamps, completed flag
- `feedback` — UUID PK, interviewid, useremail, `feedback` (JSONB with ratings), `recomond` (JSONB)

DB client is initialized in `db/db.js` using `NEXT_PUBLIC_NEON_DATABASE_URL`.

### AI Services

Three Google Gemini API instances are configured in `lib/AiApi.js`, each with its own key:

| Instance | Key env var | Used by |
|----------|-------------|---------|
| `chatSession` | `NEXT_PUBLIC_GEMINI_API_KEY` | Interview question generation (`/api/GenerateQuestion`) |
| `chatSessionFeedback` | `NEXT_PUBLIC_GEMINI_FEEDBACK_API_KEY` | Interview feedback (`/api/ai-feedback`) |
| `chatSessionResume` | `NEXT_PUBLIC_GEMINI_RESUME_ANALYZE` | Resume analysis (`/api/resume/analyze`) |

All use model `gemini-2.0-flash`. Prompts and expected JSON schemas are defined in `constant/constant.js`.

**Vapi AI** drives the live voice interview in `app/interview/[interviewID]/start/`. It orchestrates speech-to-text (Deepgram Nova-2), TTS (PlayHT), and the underlying LLM (OpenAI GPT-4). After the call ends, the conversation transcript is sent to Gemini for feedback.

### API Routes

All API routes are in `app/api/`:

| Route | Method | What it does |
|-------|--------|-------------|
| `/api/interviews` | GET | Fetch interviews for a user email |
| `/api/GenerateQuestion` | POST | Gemini → generate question list for an interview |
| `/api/ai-feedback` | POST | Gemini → generate structured feedback from conversation |
| `/api/resume` | POST | Extract raw text from PDF upload |
| `/api/resume/analyze` | POST | Gemini → ATS score + resume suggestions |
| `/api/sendEmail` | POST | Resend → email feedback to candidate |

### UI Components

Shadcn/ui components (New York style) live in `components/ui/`. Feature-specific components are co-located inside their respective `app/` page folders as `_components/` subdirectories. Global layout components (Header, Footer) are in `app/_components/`.

Path alias `@/*` maps to the project root (configured in `jsconfig.json`).

### Environment Variables

All variables use the `NEXT_PUBLIC_` prefix (client-exposed):

```
NEXT_PUBLIC_DATABASE_URL          # Drizzle standard connection
NEXT_PUBLIC_NEON_DATABASE_URL     # Neon serverless client connection
NEXT_PUBLIC_GEMINI_API_KEY        # Question generation
NEXT_PUBLIC_GEMINI_FEEDBACK_API_KEY  # Feedback analysis
NEXT_PUBLIC_GEMINI_RESUME_ANALYZE # Resume analysis
NEXT_PUBLIC_VAPI_API_KEY          # Vapi voice assistant
NEXT_PUBLIC_EMAIL_API_KEY         # Resend email service
NEXT_PUBLIC_DOMAIN                # App domain (used in shareable interview links)
NEXT_PUBLIC_PDF_URL               # PDF text extraction endpoint
```
