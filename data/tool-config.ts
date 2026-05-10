import {
  BriefcaseBusiness,
  FileText,
  Linkedin,
  Mail,
  MessageCircleQuestion,
  type LucideIcon,
} from "lucide-react";

export type ToolStatus = "live" | "coming-soon";

export type ToolFieldOption = {
  label: string;
  value: string;
};

export type ToolField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  options?: ToolFieldOption[];
  layout?: "half" | "full";
};

export type ToolFormValues = Record<string, string>;

export type ToolOutputConfig = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  downloadFileName: string;
};

export type ToolConfig = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  status: ToolStatus;
  icon: LucideIcon;
  inputFields: ToolField[];
  quickFacts: string[];
  output: ToolOutputConfig;
  seo: {
    title: string;
    description: string;
  };
};

const experienceOptions: ToolFieldOption[] = [
  { label: "Entry level", value: "Entry level" },
  { label: "Mid level", value: "Mid level" },
  { label: "Senior level", value: "Senior level" },
  { label: "Leadership", value: "Leadership" },
];

const toneOptions: ToolFieldOption[] = [
  { label: "Professional", value: "Professional" },
  { label: "Impactful", value: "Impactful" },
  { label: "Concise", value: "Concise" },
];

const outputModeOptions: ToolFieldOption[] = [
  { label: "Recruiter-friendly", value: "Recruiter-friendly" },
  { label: "ATS-optimized", value: "ATS-optimized" },
  { label: "Short & punchy", value: "Short & punchy" },
];

export const tools: ToolConfig[] = [
  {
    name: "Resume Bullet Generator",
    slug: "resume-bullet-generator",
    category: "Resume",
    shortDescription:
      "Turn everyday work into polished, ATS-friendly resume bullets with sharper impact.",
    longDescription:
      "Transform a task or achievement into five recruiter-ready resume bullets tailored to your role, level, industry, tools, metrics, and preferred tone.",
    status: "live",
    icon: BriefcaseBusiness,
    inputFields: [
      {
        name: "targetRole",
        label: "Target role",
        type: "text",
        placeholder: "e.g. Marketing Manager",
        layout: "half",
      },
      {
        name: "industry",
        label: "Industry/domain",
        type: "text",
        placeholder: "e.g. SaaS, healthcare, fintech",
        layout: "half",
      },
      {
        name: "experienceLevel",
        label: "Experience level",
        type: "select",
        defaultValue: "Mid level",
        options: experienceOptions,
        layout: "half",
      },
      {
        name: "outputMode",
        label: "Output mode",
        type: "select",
        defaultValue: "Recruiter-friendly",
        options: outputModeOptions,
        layout: "half",
      },
      {
        name: "achievement",
        label: "Achievement or task",
        type: "textarea",
        placeholder: "Describe what you did, improved, supported, analyzed, launched, or managed.",
        rows: 6,
      },
      {
        name: "jobDescription",
        label: "Job description / target posting",
        type: "textarea",
        placeholder: "Optional: paste the role description so SkillMint can suggest truthful missing keywords.",
        rows: 5,
      },
      {
        name: "tools",
        label: "Tools/technologies used",
        type: "text",
        placeholder: "e.g. Excel, SQL, Salesforce, React, Jira",
      },
      {
        name: "metrics",
        label: "Optional metrics/results",
        type: "text",
        placeholder: "e.g. reduced response time by 20%, supported 500 users",
      },
      {
        name: "tone",
        label: "Tone",
        type: "select",
        defaultValue: "Impactful",
        options: toneOptions,
        layout: "half",
      },
    ],
    quickFacts: ["Recruiter-ready", "ATS-friendly", "5 AI bullets"],
    output: {
      title: "Recruiter-ready output",
      description: "Review the strongest bullets, keywords, and improvement tips.",
      emptyTitle: "Your AI resume bullets will appear here.",
      emptyDescription:
        "Start with one honest work note. SkillMint will turn it into clean, recruiter-friendly bullets you can review, copy, and refine.",
      downloadFileName: "skillmint-resume-bullets.txt",
    },
    seo: {
      title: "AI Resume Bullet Generator",
      description:
        "Generate recruiter-ready ATS-friendly resume bullets from a role, experience level, industry, tools, metrics, achievement, and preferred tone.",
    },
  },
  {
    name: "Resume Roast",
    slug: "resume-roast",
    category: "Resume Review",
    shortDescription:
      "Get a recruiter-style critique, scores, weak phrases, and stronger bullet rewrites.",
    longDescription:
      "Paste resume bullets or a resume section and get a practical review focused on clarity, impact, ATS keywords, metrics, action verbs, and truthful improvement opportunities.",
    status: "live",
    icon: MessageCircleQuestion,
    inputFields: [
      {
        name: "resumeText",
        label: "Resume bullets or section",
        type: "textarea",
        placeholder: "Paste 3-8 bullets or a resume section you want reviewed.",
        rows: 8,
      },
      {
        name: "targetRole",
        label: "Target role",
        type: "text",
        placeholder: "e.g. Data Analyst",
        layout: "half",
      },
      {
        name: "jobDescription",
        label: "Optional job description",
        type: "textarea",
        placeholder: "Paste the target posting to check keyword fit.",
        rows: 5,
      },
      {
        name: "experienceLevel",
        label: "Experience level",
        type: "select",
        defaultValue: "Entry level",
        options: experienceOptions,
        layout: "half",
      },
    ],
    quickFacts: ["Recruiter critique", "Score breakdown", "Rewrite suggestions"],
    output: {
      title: "Resume roast report",
      description: "Review scores, weak phrases, missing proof, and stronger bullet options.",
      emptyTitle: "Your resume critique will appear here.",
      emptyDescription:
        "Paste a resume section to get a practical, truth-first review with clearer next steps.",
      downloadFileName: "skillmint-resume-roast.txt",
    },
    seo: {
      title: "AI Resume Roast",
      description:
        "Get a recruiter-style resume critique with scores, weak phrases, missing metrics, and improved bullet versions.",
    },
  },
  {
    name: "Job Description Match",
    slug: "job-description-match",
    category: "Resume Targeting",
    shortDescription:
      "Compare your experience against a job description and find truthful keyword gaps.",
    longDescription:
      "Paste a job description and your resume bullets to see matched keywords, missing keywords, skills to emphasize, tailored rewrites, and overclaiming warnings.",
    status: "live",
    icon: BriefcaseBusiness,
    inputFields: [
      {
        name: "jobDescription",
        label: "Job description",
        type: "textarea",
        placeholder: "Paste the target role description.",
        rows: 8,
      },
      {
        name: "resumeText",
        label: "Resume bullets or experience text",
        type: "textarea",
        placeholder: "Paste bullets, project notes, or experience summary.",
        rows: 7,
      },
      {
        name: "targetRole",
        label: "Target role",
        type: "text",
        placeholder: "e.g. Software Engineer Intern",
        layout: "half",
      },
    ],
    quickFacts: ["Match score", "Keyword gaps", "Truthful tailoring"],
    output: {
      title: "JD match report",
      description: "See matched keywords, missing gaps, tailored rewrites, and warnings.",
      emptyTitle: "Your job match report will appear here.",
      emptyDescription:
        "Paste a target posting and your current experience to find honest ways to tailor your resume.",
      downloadFileName: "skillmint-jd-match.txt",
    },
    seo: {
      title: "AI Job Description Match Tool",
      description:
        "Compare resume bullets to a job description and get a match score, keyword gaps, tailored rewrites, and truthful improvement suggestions.",
    },
  },
  {
    name: "Project to Resume",
    slug: "project-to-resume",
    category: "Projects",
    shortDescription:
      "Turn a student, portfolio, or coding project into resume bullets and profile-ready descriptions.",
    longDescription:
      "Add your project name, description, stack, contribution, and results to generate resume bullets, a short project summary, LinkedIn copy, GitHub README copy, and ATS keywords.",
    status: "live",
    icon: FileText,
    inputFields: [
      { name: "projectName", label: "Project name", type: "text", placeholder: "e.g. Campus Event Dashboard" },
      {
        name: "projectDescription",
        label: "Project description",
        type: "textarea",
        placeholder: "What did the project do, who was it for, and what problem did it solve?",
        rows: 5,
      },
      { name: "techStack", label: "Tech stack / tools", type: "text", placeholder: "React, SQL, Python, Excel, Figma" },
      {
        name: "contribution",
        label: "Your contribution",
        type: "textarea",
        placeholder: "What did you personally build, analyze, design, coordinate, or improve?",
        rows: 5,
      },
      { name: "metrics", label: "Optional metrics/results", type: "text", placeholder: "e.g. 500 records, 30% faster, 6 teammates" },
      { name: "targetRole", label: "Target role", type: "text", placeholder: "e.g. Frontend Developer", layout: "half" },
    ],
    quickFacts: ["Project bullets", "LinkedIn copy", "GitHub summary"],
    output: {
      title: "Project career assets",
      description: "Get resume bullets, profile copy, README wording, and keywords.",
      emptyTitle: "Your project resume assets will appear here.",
      emptyDescription:
        "Describe a real project and SkillMint will turn it into truthful application-ready wording.",
      downloadFileName: "skillmint-project-to-resume.txt",
    },
    seo: {
      title: "AI Project to Resume Tool",
      description:
        "Turn a student, portfolio, or coding project into resume bullets, LinkedIn copy, GitHub README wording, and ATS keywords.",
    },
  },
  {
    name: "Cover Letter Generator",
    slug: "cover-letter-generator",
    category: "Applications",
    shortDescription:
      "Draft concise cover letters tailored to roles, companies, and career transitions.",
    longDescription:
      "Create focused cover letter drafts that connect your background to a target role and company without starting from a blank page.",
    status: "live",
    icon: FileText,
    inputFields: [
      { name: "targetRole", label: "Target role", type: "text", placeholder: "e.g. Product Analyst" },
      { name: "company", label: "Company", type: "text", placeholder: "e.g. Stripe" },
      { name: "jobDescription", label: "Job description", type: "textarea", rows: 5, placeholder: "Optional: paste the posting for better alignment." },
      { name: "background", label: "Relevant background", type: "textarea", rows: 6, placeholder: "Paste 2-4 honest wins, projects, or skills you want included." },
    ],
    quickFacts: ["Role-aware", "Recruiter-ready", "Editable drafts"],
    output: {
      title: "Cover letter draft",
      description: "Review a concise, editable draft tailored to the role.",
      emptyTitle: "Your cover letter draft will appear here.",
      emptyDescription: "Add a role, company, and honest background notes to create a concise first draft.",
      downloadFileName: "skillmint-cover-letter.txt",
    },
    seo: {
      title: "AI Cover Letter Generator",
      description: "Generate a concise AI cover letter draft tailored to a role, company, and your real background.",
    },
  },
  {
    name: "LinkedIn Headline Generator",
    slug: "linkedin-headline-generator",
    category: "LinkedIn",
    shortDescription:
      "Create credible, recruiter-friendly LinkedIn headlines that signal your value quickly.",
    longDescription:
      "Generate LinkedIn headline options that combine role focus, strengths, and career direction in a polished professional voice.",
    status: "live",
    icon: Linkedin,
    inputFields: [
      { name: "targetRole", label: "Target role", type: "text", placeholder: "e.g. Data Analyst" },
      { name: "currentRole", label: "Current role or background", type: "text", placeholder: "e.g. Final-year CS student" },
      { name: "specialty", label: "Skills or specialty", type: "text", placeholder: "SQL, dashboards, customer analytics" },
      { name: "tone", label: "Tone", type: "select", options: toneOptions, defaultValue: "Professional" },
    ],
    quickFacts: ["Profile-ready", "Concise", "Professional"],
    output: {
      title: "LinkedIn headlines",
      description: "Review profile-ready headline options and short positioning copy.",
      emptyTitle: "Your LinkedIn headline options will appear here.",
      emptyDescription: "Add your target role and specialty to create credible LinkedIn headline options.",
      downloadFileName: "skillmint-linkedin-headlines.txt",
    },
    seo: {
      title: "AI LinkedIn Headline Generator",
      description: "Generate recruiter-friendly LinkedIn headline options from your role, skills, and career direction.",
    },
  },
  {
    name: "Interview Answer Coach",
    slug: "interview-answer-coach",
    category: "Interview",
    shortDescription:
      "Practice structured interview responses with stronger examples and clear takeaways.",
    longDescription:
      "Turn rough interview notes into structured, memorable answers for behavioral and role-specific questions.",
    status: "coming-soon",
    icon: MessageCircleQuestion,
    inputFields: [
      { name: "question", label: "Interview question", type: "textarea", rows: 4 },
      { name: "example", label: "Your example", type: "textarea", rows: 5 },
    ],
    quickFacts: ["STAR-friendly", "Clear structure", "Practice-ready"],
    output: {
      title: "Coached answer",
      description: "A structured interview answer will appear here.",
      emptyTitle: "Interview coaching is coming soon.",
      emptyDescription: "This tool will help shape rough examples into stronger interview responses.",
      downloadFileName: "skillmint-interview-answer.txt",
    },
    seo: {
      title: "AI Interview Answer Coach",
      description: "Prepare for SkillMint AI's upcoming interview answer coach.",
    },
  },
  {
    name: "Email Reply Assistant",
    slug: "email-reply-assistant",
    category: "Productivity",
    shortDescription:
      "Write crisp professional replies for follow-ups, introductions, and workplace updates.",
    longDescription:
      "Create polished professional email replies that match the context, tone, and next action you need.",
    status: "coming-soon",
    icon: Mail,
    inputFields: [
      { name: "incomingEmail", label: "Incoming email", type: "textarea", rows: 5 },
      { name: "replyGoal", label: "Reply goal", type: "text" },
      { name: "tone", label: "Tone", type: "select", options: toneOptions },
    ],
    quickFacts: ["Work-ready", "Polished tone", "Fast replies"],
    output: {
      title: "Email reply",
      description: "A professional reply will appear here.",
      emptyTitle: "Email replies are coming soon.",
      emptyDescription: "This tool will help turn context into crisp workplace responses.",
      downloadFileName: "skillmint-email-reply.txt",
    },
    seo: {
      title: "AI Email Reply Assistant",
      description: "Prepare for SkillMint AI's upcoming professional email reply assistant.",
    },
  },
];

export const featuredTools = tools.slice(0, 3);

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolHref(tool: Pick<ToolConfig, "slug">) {
  return `/tools/${tool.slug}`;
}

export function getInitialToolValues(tool: ToolConfig): ToolFormValues {
  return tool.inputFields.reduce<ToolFormValues>((values, field) => {
    values[field.name] = field.defaultValue || field.options?.[0]?.value || "";
    return values;
  }, {});
}
