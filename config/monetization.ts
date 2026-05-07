export const monetizationConfig = {
  showAdSlots: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
  showAffiliatePlaceholders: true,
};

export const recommendedResources = [
  {
    title: "Resume templates",
    description: "Clean resume layouts that keep bullets readable and recruiter-friendly.",
    href: "#resume-templates",
    category: "templates",
  },
  {
    title: "Portfolio website builders",
    description: "Simple ways to turn projects, case studies, and resume wins into a public portfolio.",
    href: "#portfolio-website-builders",
    category: "portfolio",
  },
  {
    title: "Interview prep resources",
    description: "Turn resume bullets into concise stories for behavioral and role-specific interviews.",
    href: "#interview-prep-resources",
    category: "interview",
  },
  {
    title: "Job search tools",
    description: "Track applications, tailor resumes, and stay organized through the search.",
    href: "#job-search-tools",
    category: "job-search",
  },
  {
    title: "LinkedIn profile tools",
    description: "Use your strongest bullets to improve headlines, summaries, and profile positioning.",
    href: "#linkedin-profile-tools",
    category: "linkedin",
  },
];
