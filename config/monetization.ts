export const monetizationConfig = {
  showAdSlots: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
  showAffiliatePlaceholders: true,
  affiliateId: process.env.NEXT_PUBLIC_AFFILIATE_ID || "",
};

export const recommendedResources = [
  {
    title: "Resume templates",
    description: "Clean resume layouts that keep bullets readable and recruiter-friendly.",
    whyThisHelps: "A simple template makes your strongest bullets easier to scan.",
    href: "#resume-templates",
    category: "resume-templates",
  },
  {
    title: "Portfolio website builders",
    description: "Simple ways to turn projects, case studies, and resume wins into a public portfolio.",
    whyThisHelps: "Useful when your resume mentions projects that recruiters may want to inspect.",
    href: "#portfolio-website-builders",
    category: "portfolio-builders",
  },
  {
    title: "Interview prep resources",
    description: "Turn resume bullets into concise stories for behavioral and role-specific interviews.",
    whyThisHelps: "Your best bullets can become stronger STAR interview answers.",
    href: "#interview-prep-resources",
    category: "interview",
  },
  {
    title: "Coding practice",
    description: "Focused practice for technical screens, take-home tasks, and project-based interviews.",
    whyThisHelps: "Helpful after your resume starts getting technical interview callbacks.",
    href: "#coding-practice",
    category: "coding-practice",
  },
  {
    title: "Job search tools",
    description: "Track applications, tailor resumes, and stay organized through the search.",
    whyThisHelps: "A tracker keeps tailored versions and follow-ups from getting messy.",
    href: "#job-search-tools",
    category: "job-trackers",
  },
  {
    title: "LinkedIn profile tools",
    description: "Use your strongest bullets to improve headlines, summaries, and profile positioning.",
    whyThisHelps: "LinkedIn should reinforce the same skills and proof your resume highlights.",
    href: "#linkedin-profile-tools",
    category: "linkedin-resources",
  },
];
