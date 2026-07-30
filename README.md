# SkillMint AI

A free AI career workspace that turns rough experience into resume bullets, JD-match insights, LinkedIn positioning, and cover-letter drafts.

## Live Links

- [Live demo](https://skillmint-ai.vercel.app/)
- [Tools](https://skillmint-ai.vercel.app/tools)
- [Resume Bullet Generator](https://skillmint-ai.vercel.app/tools/resume-bullet-generator)
- [GitHub repository](https://github.com/sidhesh0706/skillmint-ai)

## Product Overview

SkillMint AI helps students, freshers, interns, and early-career professionals turn real work, projects, and internship experience into application-ready career assets. The product combines focused AI workflows with a no-signup experience, browser-only history, and reminders to review every generated claim before using it.

## Why This Project Matters

Students often understand what they built or contributed but struggle to describe it in professional, recruiter-readable language. SkillMint helps close that gap without inventing experience or overstating results.

One truthful piece of experience can move through several connected workflows: resume bullets, recruiter critique, job-description matching, project packaging, LinkedIn positioning, and cover-letter drafting.

## Features

### Six Live AI Tools

- **Resume Bullet Generator** - Turns rough work notes into scored, recruiter-ready resume bullets.
- **Resume Roast** - Critiques weak phrasing and suggests clearer, stronger rewrites.
- **Job Description Match** - Compares resume evidence with a job description and surfaces truthful keyword gaps.
- **Project to Resume** - Packages projects into resume bullets and LinkedIn-ready project copy.
- **LinkedIn Headline Generator** - Creates professional profile positioning and headline options.
- **Cover Letter Generator** - Drafts concise cover-letter openings from a role, company, and real proof.

### Product Capabilities

- Curated resume resources library
- Resume scoring and improvement guidance
- Copy, TXT, and Markdown export actions
- Recent generation history stored in the browser
- No-signup user experience
- Truth-first rewrite guidance
- ATS-friendly output structure
- Responsive desktop and mobile layouts
- Static SEO and resource pages
- Production route and configuration smoke checks

## Product Workflow

```text
Experience notes
  -> Resume bullets
  -> Resume roast
  -> JD match
  -> Project packaging
  -> LinkedIn headline
  -> Cover letter
```

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Groq API through a secure server-side route
- Lucide React
- Vercel
- ESLint

## Architecture Notes

- Centralized, config-driven tool definitions
- Dynamic `/tools/[slug]` pages
- Secure server-side AI API route with environment-based credentials
- Reusable input composer and output workspace components
- Tool-specific presentation configuration for live workflows
- Static SEO and resource pages with internal linking
- Browser-side persistence for form state and recent generations
- Route smoke checks for live pages, tool configuration, API support, sitemap coverage, and robots output

## Main Routes

| Route | Purpose |
|---|---|
| `/` | Product overview and application workflow |
| `/tools` | AI career toolkit dashboard |
| `/resources` | Resume examples and writing guides |
| `/tools/resume-bullet-generator` | Generate and score resume bullets |
| `/tools/resume-roast` | Review resume wording and weak phrases |
| `/tools/job-description-match` | Compare resume evidence with a job posting |
| `/tools/project-to-resume` | Convert project work into career assets |
| `/tools/linkedin-headline-generator` | Generate LinkedIn positioning options |
| `/tools/cover-letter-generator` | Draft a focused cover letter |

## Local Setup

```bash
npm install
cp .env.example .env.local
```

Add a Groq API key to `.env.local`:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

After building and starting the production server, route checks can run against it:

```bash
npm run start
npm run check:routes
```

## Deployment

The project is deployed on Vercel. Production requires:

```text
GROQ_API_KEY
```

Optional monetization UI remains disabled unless its public configuration flag is enabled.

## Roadmap

- Structured product feedback capture
- Real email capture provider integration
- Product analytics dashboard
- Contextual affiliate and resource recommendations
- Saved application kits
- Additional role-specific career tools
- Stronger AI-output evaluation and truthfulness guardrails

## Screenshots

Screenshots coming soon.

## What This Demonstrates

- Product thinking around a focused early-career problem
- Secure AI integration through server-side routes
- Full-stack implementation with a typed Next.js architecture
- Iterative UI/UX design and responsive product workflows
- Config-driven multi-tool architecture
- Production deployment, analytics, route QA, and SEO awareness
