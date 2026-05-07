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
    name: "Cover Letter Generator",
    slug: "cover-letter-generator",
    category: "Applications",
    shortDescription:
      "Draft concise cover letters tailored to roles, companies, and career transitions.",
    longDescription:
      "Create focused cover letter drafts that connect your background to a target role and company without starting from a blank page.",
    status: "coming-soon",
    icon: FileText,
    inputFields: [
      { name: "targetRole", label: "Target role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "background", label: "Relevant background", type: "textarea", rows: 5 },
    ],
    quickFacts: ["Role-aware", "Recruiter-ready", "Editable drafts"],
    output: {
      title: "Cover letter draft",
      description: "A polished cover letter draft will appear here.",
      emptyTitle: "Cover letter drafts are coming soon.",
      emptyDescription: "This tool will help turn role details into concise application letters.",
      downloadFileName: "skillmint-cover-letter.txt",
    },
    seo: {
      title: "AI Cover Letter Generator",
      description: "Prepare for SkillMint AI's upcoming cover letter generator.",
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
    status: "coming-soon",
    icon: Linkedin,
    inputFields: [
      { name: "currentRole", label: "Current role", type: "text" },
      { name: "specialty", label: "Specialty", type: "text" },
      { name: "tone", label: "Tone", type: "select", options: toneOptions },
    ],
    quickFacts: ["Profile-ready", "Concise", "Professional"],
    output: {
      title: "LinkedIn headlines",
      description: "Headline options will appear here.",
      emptyTitle: "LinkedIn headline ideas are coming soon.",
      emptyDescription: "This tool will help shape sharper first impressions on LinkedIn.",
      downloadFileName: "skillmint-linkedin-headlines.txt",
    },
    seo: {
      title: "AI LinkedIn Headline Generator",
      description: "Prepare for SkillMint AI's upcoming LinkedIn headline generator.",
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
