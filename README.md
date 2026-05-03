# SkillMint AI

SkillMint AI is a premium, lightweight portfolio of free AI career tools. The first live tool is an AI Resume Bullet Generator that uses mock output only, making the app ready for a first static Vercel deployment without backend services, authentication, payments, or API keys.

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
- Live mock Resume Bullet Generator
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
npm run dev
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
6. Do not add environment variables for this first version.
7. Click **Deploy**.
8. After deployment, test every route listed above.

## Roadmap

- Add real AI generation with the OpenAI API
- Add more live tools from the existing configuration
- Add saved history and user accounts when needed
- Add usage limits or billing only if the product needs it
- Add analytics and conversion tracking
- Add stronger SEO content for each tool page
