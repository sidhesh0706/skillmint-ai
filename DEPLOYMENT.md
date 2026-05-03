# SkillMint AI Deployment Guide

This guide covers the first production deployment of SkillMint AI to Vercel.

## Pre-Deployment Checklist

Run these commands locally:

```bash
npm install
npm run lint
npm run build
```

Create `.env.local` for local AI generation:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Confirm these routes work locally:

- `http://localhost:3000/`
- `http://localhost:3000/tools`
- `http://localhost:3000/tools/resume-bullet-generator`
- `http://localhost:3000/tools/cover-letter-generator`
- `http://localhost:3000/tools/linkedin-headline-generator`
- `http://localhost:3000/tools/interview-answer-coach`
- `http://localhost:3000/tools/email-reply-assistant`

## Push to GitHub

If the repository is not connected to GitHub yet:

```bash
git status
git add .
git commit -m "Prepare SkillMint AI for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skillmint-ai.git
git push -u origin main
```

If the repository already has an `origin` remote:

```bash
git status
git add .
git commit -m "Prepare SkillMint AI for Vercel deployment"
git push origin main
```

## Deploy on Vercel

1. Open `https://vercel.com/new`.
2. Select the GitHub account that owns the repository.
3. Import the `skillmint-ai` repository.
4. Confirm the framework preset is **Next.js**.
5. Confirm these settings:
   - Root directory: repository root
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave empty
6. Add the required environment variable:
   - Name: `GROQ_API_KEY`
   - Value: your Groq API key from GroqCloud
7. Click **Deploy**.
8. Wait for the deployment build to complete.
9. Open the production URL.

## Post-Deployment Smoke Test

Test these production pages:

- `/`
- `/tools`
- `/tools/resume-bullet-generator`
- `/tools/cover-letter-generator`
- `/tools/linkedin-headline-generator`
- `/tools/interview-answer-coach`
- `/tools/email-reply-assistant`

On `/tools/resume-bullet-generator`, verify:

- Page styling loads correctly
- Form inputs are usable
- Generate creates five AI resume bullets
- Copy to clipboard works
- Download as TXT works
- Layout is usable on mobile and desktop widths

For coming-soon pages, verify:

- Tool name renders
- Description renders
- "This tool is coming soon" message renders
- Back to tools CTA works

## Notes

- AI generation uses Groq through a secure server-side API route.
- No authentication is configured yet.
- No payments are configured yet.
- `GROQ_API_KEY` is required for live generation.
