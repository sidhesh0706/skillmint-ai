export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPage = {
  slug: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  audience: string;
  examplesTitle: string;
  bullets: string[];
  tips: string[];
  actionVerbs: string[];
  faqs: SeoFaq[];
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "resume-bullets-for-freshers",
    title: "Best Resume Bullet Points for Freshers (2026 Guide)",
    intro:
      "Freshers need resume bullets that show potential, project ownership, and learning speed. Use these examples to turn internships, coursework, volunteering, and academic projects into concise, ATS-friendly proof points.",
    metaTitle: "Best Resume Bullet Points for Freshers (2026 Guide)",
    metaDescription:
      "Explore fresher resume bullet examples, writing tips, action verbs, and an AI generator to create ATS-friendly resume bullets.",
    keywords: [
      "resume bullets for freshers",
      "fresher resume bullet points",
      "entry level resume examples",
      "ATS resume bullets",
    ],
    audience: "Freshers and entry-level job seekers",
    examplesTitle: "Fresher Resume Bullet Examples",
    bullets: [
      "Built a responsive project dashboard using React and Tailwind CSS, improving page load speed by 25% during final-year project testing.",
      "Analyzed 1,000+ survey responses in Excel to identify customer preference trends and present actionable insights to a faculty review panel.",
      "Coordinated a 6-member student team to deliver a campus event plan, completing vendor outreach, scheduling, and budget tracking ahead of deadline.",
      "Developed a Python automation script to clean CSV data, reducing manual formatting time by approximately 40% for a class analytics project.",
      "Created presentation decks and research summaries for 4 academic projects, translating technical findings into clear recommendations.",
      "Completed a 6-week internship supporting daily operations, documentation updates, and customer query tracking for a fast-moving team.",
      "Designed and tested a portfolio website with accessible navigation, mobile-first layouts, and reusable UI components.",
      "Improved project documentation by creating setup guides, issue logs, and version notes that helped teammates onboard faster.",
      "Conducted competitor research across 15 companies and summarized pricing, positioning, and feature gaps for a marketing assignment.",
      "Managed weekly progress updates for a capstone project, keeping deliverables, blockers, and next steps visible to stakeholders.",
      "Practiced SQL queries on sample datasets to extract, filter, and summarize business metrics for reporting exercises.",
      "Supported social media content planning for a student club, increasing post consistency and improving event registration visibility.",
    ],
    tips: [
      "Lead with the action you took, then add the tool, project, or result.",
      "Use academic projects, internships, volunteering, and club work when full-time experience is limited.",
      "Add realistic metrics such as project size, time saved, users supported, events managed, or datasets analyzed.",
      "Avoid vague phrases like helped with or worked on; show what you delivered.",
    ],
    actionVerbs: ["Built", "Analyzed", "Coordinated", "Developed", "Improved", "Designed"],
    faqs: [
      {
        question: "What should freshers write in resume bullet points?",
        answer:
          "Freshers should highlight projects, internships, academic work, certifications, volunteering, and measurable contributions that show job-ready skills.",
      },
      {
        question: "How many bullet points should a fresher resume include?",
        answer:
          "Most fresher resumes work well with 3 to 5 bullets per major project or internship and a concise one-page format.",
      },
      {
        question: "Can freshers include metrics on a resume?",
        answer:
          "Yes. Use honest metrics such as number of users, records analyzed, teammates coordinated, deadlines met, or time saved.",
      },
      {
        question: "Should fresher resume bullets be ATS-friendly?",
        answer:
          "Yes. Include role-relevant skills, tools, and keywords from the job description while keeping each bullet clear and readable.",
      },
    ],
  },
  {
    slug: "software-engineer-resume-bullets",
    title: "Software Engineer Resume Bullet Points (2026 Examples)",
    intro:
      "Strong software engineer resume bullets connect technical work to product reliability, performance, developer velocity, and user impact. Use these examples to make engineering achievements clearer and more recruiter-friendly.",
    metaTitle: "Software Engineer Resume Bullet Points (2026 Examples)",
    metaDescription:
      "Use software engineer resume bullet examples with metrics, action verbs, ATS keywords, and an AI generator for tailored resume bullets.",
    keywords: [
      "software engineer resume bullets",
      "software developer resume bullet points",
      "engineering resume examples",
      "ATS software engineer resume",
    ],
    audience: "Software engineers and developers",
    examplesTitle: "Software Engineer Resume Bullet Examples",
    bullets: [
      "Built reusable React components for a customer dashboard, reducing duplicate UI code by 30% and improving release consistency.",
      "Optimized API response times by 35% through query tuning, caching, and pagination improvements across high-traffic endpoints.",
      "Designed RESTful services in Node.js to support account workflows used by 20,000+ monthly active users.",
      "Improved production reliability by adding monitoring, structured logging, and alerting for critical payment and onboarding flows.",
      "Reduced build failures by 25% by stabilizing CI checks, improving test fixtures, and documenting release requirements.",
      "Implemented role-based access controls with secure session handling, improving permission accuracy across internal admin tools.",
      "Refactored legacy modules into typed TypeScript utilities, lowering maintenance effort and improving developer onboarding.",
      "Partnered with product and design to ship mobile-responsive features that improved task completion rates by 18%.",
      "Created unit and integration tests for core business logic, increasing coverage across checkout flows and reducing regression risk.",
      "Migrated data processing jobs to a more efficient queue workflow, cutting average processing time from 14 minutes to 8 minutes.",
      "Resolved priority production issues by tracing root causes across frontend, API, and database layers under tight release timelines.",
      "Documented architecture decisions and deployment steps, helping new engineers contribute to services within their first sprint.",
    ],
    tips: [
      "Tie technical work to outcomes such as latency, reliability, conversion, coverage, or developer speed.",
      "Name relevant tools and frameworks when they match the target role.",
      "Use metrics for performance, scale, uptime, test coverage, and user adoption where possible.",
      "Avoid listing responsibilities; describe shipped systems, fixes, and measurable improvements.",
    ],
    actionVerbs: ["Built", "Optimized", "Designed", "Implemented", "Refactored", "Migrated"],
    faqs: [
      {
        question: "What makes a software engineer resume bullet strong?",
        answer:
          "A strong software engineer bullet shows what you built or improved, the technology involved, and the measurable impact on users, systems, or teams.",
      },
      {
        question: "Should I include programming languages in resume bullets?",
        answer:
          "Yes, when relevant. Mention languages, frameworks, databases, cloud platforms, and tools naturally inside achievement-focused bullets.",
      },
      {
        question: "How long should software engineer resume bullets be?",
        answer:
          "Aim for one concise line when possible. A good bullet is usually 18 to 28 words and focused on one clear result.",
      },
      {
        question: "Can I use project work if I do not have professional experience?",
        answer:
          "Yes. Side projects, open-source work, internships, and academic projects can work well when framed around scope, technical choices, and results.",
      },
    ],
  },
  {
    slug: "data-analyst-resume-bullets",
    title: "Data Analyst Resume Bullet Points (2026 Examples)",
    intro:
      "Data analyst resume bullets should show how you turned data into decisions. These examples highlight SQL, dashboards, reporting, stakeholder communication, and measurable business impact.",
    metaTitle: "Data Analyst Resume Bullet Points (2026 Examples)",
    metaDescription:
      "Find data analyst resume bullet examples with SQL, dashboards, metrics, ATS keywords, and an AI generator for custom bullets.",
    keywords: [
      "data analyst resume bullets",
      "data analyst resume examples",
      "SQL resume bullet points",
      "ATS data analyst resume",
    ],
    audience: "Data analysts and analytics professionals",
    examplesTitle: "Data Analyst Resume Bullet Examples",
    bullets: [
      "Built Tableau dashboards tracking revenue, churn, and acquisition trends, reducing weekly reporting time by 6 hours.",
      "Analyzed 50,000+ customer records in SQL to identify retention patterns and recommend targeted lifecycle campaigns.",
      "Automated recurring Excel reports with Power Query, improving data refresh accuracy and cutting manual work by 40%.",
      "Partnered with sales leaders to define KPI dashboards that improved pipeline visibility across 4 regional teams.",
      "Cleaned and validated inconsistent CRM data, increasing report accuracy and reducing duplicate records by 22%.",
      "Created cohort analysis to evaluate onboarding behavior and identify drop-off points across the first 30 days.",
      "Presented monthly performance insights to stakeholders, translating complex data trends into clear business recommendations.",
      "Developed Python scripts to merge and standardize source files, accelerating ad hoc analysis for marketing campaigns.",
      "Tracked campaign performance across paid and organic channels, highlighting budget shifts that improved lead quality.",
      "Designed data quality checks for operational reporting, reducing recurring errors before executive dashboard reviews.",
      "Segmented customers by usage behavior and revenue potential to support prioritization for customer success outreach.",
      "Documented metric definitions and dashboard logic, improving reporting consistency across finance, sales, and operations.",
    ],
    tips: [
      "Show the business decision or process your analysis improved.",
      "Mention SQL, Excel, Python, Tableau, Power BI, Looker, or other tools when relevant.",
      "Use metrics such as records analyzed, hours saved, accuracy improved, revenue tracked, or teams supported.",
      "Make stakeholder communication visible; analysts are hired for decision support, not just data pulls.",
    ],
    actionVerbs: ["Analyzed", "Built", "Automated", "Segmented", "Presented", "Validated"],
    faqs: [
      {
        question: "What should a data analyst resume bullet include?",
        answer:
          "Include the dataset or business area, the tool or method used, and the outcome such as time saved, accuracy improved, or decisions supported.",
      },
      {
        question: "Are SQL and Excel keywords important for ATS?",
        answer:
          "Yes. Include relevant technical keywords from the job description, especially SQL, Excel, dashboards, reporting, and visualization tools.",
      },
      {
        question: "How can I quantify data analyst work?",
        answer:
          "Use the number of records analyzed, reports automated, hours saved, error reduction, stakeholders supported, or revenue monitored.",
      },
      {
        question: "Should data analyst bullets mention dashboards?",
        answer:
          "Yes, if dashboards were part of your work. Explain who used them and what decision or workflow they improved.",
      },
    ],
  },
  {
    slug: "product-manager-resume-bullets",
    title: "Product Manager Resume Bullet Points (2026 Examples)",
    intro:
      "Product manager resume bullets should make strategy, execution, customer insight, and measurable product outcomes easy to scan. Use these examples to show cross-functional leadership with substance.",
    metaTitle: "Product Manager Resume Bullet Points (2026 Examples)",
    metaDescription:
      "Explore product manager resume bullet examples with metrics, product keywords, action verbs, and an AI generator for custom PM bullets.",
    keywords: [
      "product manager resume bullets",
      "PM resume bullet points",
      "product management resume examples",
      "ATS product manager resume",
    ],
    audience: "Product managers and aspiring PMs",
    examplesTitle: "Product Manager Resume Bullet Examples",
    bullets: [
      "Led discovery for a new onboarding flow by interviewing 18 customers and prioritizing friction points that reduced activation.",
      "Launched a self-serve feature with engineering and design, increasing weekly adoption by 24% within the first quarter.",
      "Defined product requirements and success metrics for a billing workflow used by 10,000+ active accounts.",
      "Prioritized roadmap initiatives using customer impact, revenue potential, and engineering effort to align stakeholders.",
      "Reduced support ticket volume by 17% by shipping clearer in-app guidance and improving error-state messaging.",
      "Partnered with analytics to build funnel dashboards, identifying conversion drop-offs and informing experiment priorities.",
      "Coordinated sprint planning across engineering, design, and customer success to deliver high-priority releases on schedule.",
      "Synthesized user feedback from surveys, sales calls, and support tickets into roadmap themes for quarterly planning.",
      "Improved feature launch readiness by creating go-to-market briefs, enablement notes, and adoption tracking plans.",
      "Ran A/B tests on product messaging and onboarding steps, improving trial-to-activation conversion by 12%.",
      "Maintained a prioritized backlog with clear acceptance criteria, reducing ambiguity and improving engineering handoff quality.",
      "Presented product performance updates to leadership, connecting user behavior, business goals, and roadmap tradeoffs.",
    ],
    tips: [
      "Connect product decisions to customer impact, adoption, revenue, retention, or operational efficiency.",
      "Show cross-functional collaboration without losing sight of your specific ownership.",
      "Use product keywords such as roadmap, discovery, requirements, experiments, activation, retention, and adoption.",
      "Quantify outcomes from launches, tests, support reduction, user research, or funnel improvements.",
    ],
    actionVerbs: ["Led", "Launched", "Prioritized", "Defined", "Synthesized", "Presented"],
    faqs: [
      {
        question: "What should product manager resume bullets focus on?",
        answer:
          "They should focus on product outcomes, customer insight, roadmap decisions, cross-functional execution, and measurable business impact.",
      },
      {
        question: "Should PM resume bullets include metrics?",
        answer:
          "Yes. Metrics like adoption, activation, retention, revenue impact, support reduction, and experiment lift make PM bullets stronger.",
      },
      {
        question: "How do aspiring PMs write strong bullets?",
        answer:
          "Use project, operations, analytics, customer, or founder work that shows problem framing, prioritization, execution, and stakeholder alignment.",
      },
      {
        question: "What keywords help a product manager resume?",
        answer:
          "Relevant keywords include roadmap, discovery, user research, requirements, backlog, experimentation, adoption, retention, and go-to-market.",
      },
    ],
  },
  {
    slug: "marketing-resume-bullets",
    title: "Marketing Resume Bullet Points (2026 Examples)",
    intro:
      "Marketing resume bullets should show campaign ownership, channel performance, content quality, customer understanding, and measurable growth. Use these examples to turn marketing work into recruiter-ready achievements.",
    metaTitle: "Marketing Resume Bullet Points (2026 Examples)",
    metaDescription:
      "Explore marketing resume bullet examples with campaign metrics, ATS keywords, writing tips, and an AI generator for tailored bullets.",
    keywords: [
      "marketing resume bullets",
      "marketing resume examples",
      "digital marketing resume bullet points",
      "ATS marketing resume",
    ],
    audience: "Marketing professionals and digital marketers",
    examplesTitle: "Marketing Resume Bullet Examples",
    bullets: [
      "Managed paid social campaigns across Meta and LinkedIn, improving qualified lead volume by 28% over two quarters.",
      "Created SEO content briefs for 25+ articles, increasing organic impressions and improving keyword coverage for priority topics.",
      "Built email nurture sequences that increased click-through rate by 18% through sharper segmentation and subject line testing.",
      "Analyzed campaign performance across Google Analytics and CRM reports to recommend budget shifts for higher-converting channels.",
      "Coordinated product launch messaging across web, email, and social, supporting a 20% lift in landing page conversions.",
      "Developed weekly content calendars and performance reports, improving publishing consistency across 4 marketing channels.",
      "Collaborated with sales to refine lead scoring criteria, improving handoff quality and reducing unqualified follow-ups.",
      "Updated landing page copy and CTA placement, increasing demo request conversion by 14% in a controlled test.",
      "Produced customer case study assets that strengthened sales enablement and supported mid-funnel prospect education.",
      "Conducted competitor research across 12 brands to identify positioning gaps and inform campaign messaging.",
      "Improved marketing operations documentation, reducing campaign setup errors and helping new team members ramp faster.",
      "Segmented audience lists by lifecycle stage and engagement behavior to deliver more relevant email campaigns.",
    ],
    tips: [
      "Tie marketing activity to measurable results such as leads, conversion rate, CTR, impressions, pipeline, or retention.",
      "Name channels and tools when relevant, including SEO, email, paid social, CRM, Google Analytics, and lifecycle marketing.",
      "Show both creative execution and analytical decision-making.",
      "Avoid generic campaign language; clarify audience, channel, scale, and outcome.",
    ],
    actionVerbs: ["Managed", "Created", "Analyzed", "Coordinated", "Developed", "Optimized"],
    faqs: [
      {
        question: "What makes a marketing resume bullet effective?",
        answer:
          "An effective marketing bullet shows the campaign, channel, audience, tool, and measurable result in one concise achievement.",
      },
      {
        question: "Which metrics should marketers include on resumes?",
        answer:
          "Good metrics include conversion rate, leads, CTR, impressions, revenue influenced, pipeline, engagement, cost per lead, and retention.",
      },
      {
        question: "Should marketing bullets include tools?",
        answer:
          "Yes, when relevant. Include tools like Google Analytics, HubSpot, Salesforce, Meta Ads, LinkedIn Ads, Search Console, or email platforms.",
      },
      {
        question: "How many marketing bullets should I use per role?",
        answer:
          "Use 3 to 6 bullets for recent, relevant roles. Prioritize measurable wins and remove low-impact task descriptions.",
      },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
