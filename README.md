# SkillMint AI

SkillMint AI is a premium, lightweight portfolio of free AI career tools. The first live tool is an AI Resume Bullet Generator powered by a secure server-side Groq API route. The app does not include authentication, payments, or a database.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React icons
- ESLint
- Vercel-ready static generation

## Features

- Modern SaaS-style landing page
- Config-driven multi-tool architecture
- Tools listing generated from centralized configuration
- Dynamic tool routes at `/tools/[slug]`
- Live AI Resume Bullet Generator
- Coming-soon pages for planned tools
- Copy generated output to clipboard
- Download generated output as `.txt`
- SEO metadata for home, tools, and tool detail pages
- Responsive, mobile-first UI

## Routes

- `/` - Home page
- `/tools` - Tools listing
- `/tools/resume-bullet-generator` - Live Resume Bullet Generator
- `/tools/cover-letter-generator` - Coming soon
- `/tools/linkedin-headline-generator` - Coming soon
- `/tools/interview-answer-coach` - Coming soon
- `/tools/email-reply-assistant` - Coming soon

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your Groq key to `.env.local`:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

Run both commands before deploying.

## Vercel Deployment

1. Push the project to a GitHub repository.
2. Go to Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the default framework preset as **Next.js**.
5. Use the default settings:
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave empty
6. Add the required environment variable:
   - `GROQ_API_KEY`
7. Click **Deploy**.
8. After deployment, test every route listed above.

## Roadmap

- Improve prompt quality and add optional user guidance for better resume inputs
- Add more live tools from the existing configuration using secure server routes
- Add saved history and user accounts when needed
- Add usage limits or billing only if the product needs it
- Add analytics and conversion tracking
- Add stronger SEO content for each tool page
