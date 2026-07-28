export type PurposeToolSlug =
  | "resume-roast"
  | "job-description-match"
  | "project-to-resume"
  | "cover-letter-generator"
  | "linkedin-headline-generator";

export type PurposeFieldGroup = {
  title: string;
  description: string;
  fields: string[];
  optional?: boolean;
};

export type PurposePreviewMetric = {
  label: string;
  value: string;
};

export type PurposeToolPresentation = {
  workspaceTitle: string;
  workspaceDescription: string;
  composerLabel: string;
  composerTitle: string;
  composerDescription: string;
  submitLabel: string;
  loadingLabel: string;
  loadingDescription: string;
  loadingSteps: string[];
  studioLabel: string;
  studioTitle: string;
  studioDescription: string;
  scoreLabel: string;
  warningLabel: string;
  fieldGroups: PurposeFieldGroup[];
  optionalFields: string[];
  previewMetrics: PurposePreviewMetric[];
  outputSignals: string[];
};

const presentations: Record<PurposeToolSlug, PurposeToolPresentation> = {
  "resume-roast": {
    workspaceTitle: "Resume critique workspace",
    workspaceDescription:
      "Paste a real resume section, then review recruiter-level scores, weak phrases, and stronger alternatives.",
    composerLabel: "Resume review input",
    composerTitle: "Give the reviewer enough context",
    composerDescription:
      "Use the section you would actually send. The critique is most useful when the wording is real.",
    submitLabel: "Roast this resume",
    loadingLabel: "Recruiter review in progress",
    loadingDescription:
      "Checking the section for clarity, proof, and avoidable weak language.",
    loadingSteps: [
      "Reading your resume section",
      "Finding weak phrases",
      "Scoring recruiter clarity",
      "Rewriting stronger bullets",
    ],
    studioLabel: "Recruiter critique",
    studioTitle: "Resume critique report",
    studioDescription:
      "See what is weakening the section, why it matters, and how to improve it without overstating your work.",
    scoreLabel: "Resume strength",
    warningLabel: "Claims to review",
    fieldGroups: [
      {
        title: "Resume text",
        description: "Paste the bullets or section you want reviewed.",
        fields: ["resumeText"],
      },
      {
        title: "Review context",
        description:
          "Add the role and experience level so the critique matches your situation.",
        fields: ["targetRole", "experienceLevel"],
      },
      {
        title: "Target posting",
        description: "Optional context for a more role-specific review.",
        fields: ["jobDescription"],
        optional: true,
      },
    ],
    optionalFields: ["jobDescription"],
    previewMetrics: [
      { label: "Clarity", value: "Needs focus" },
      { label: "Impact", value: "Too passive" },
      { label: "Metrics", value: "Missing" },
      { label: "Weak phrases", value: "2 found" },
      { label: "ATS readiness", value: "Review" },
    ],
    outputSignals: [
      "Recruiter-style critique",
      "Weak phrase detection",
      "Improved bullet options",
    ],
  },
  "job-description-match": {
    workspaceTitle: "JD match workspace",
    workspaceDescription:
      "Compare a real job posting with your current experience and identify truthful ways to close the language gap.",
    composerLabel: "Role comparison input",
    composerTitle: "Compare the posting with your proof",
    composerDescription:
      "Paste both sides of the comparison. SkillMint will surface matches, gaps, and claims you should avoid.",
    submitLabel: "Check job match",
    loadingLabel: "Comparing role language",
    loadingDescription:
      "Mapping the job requirements against the experience you already have.",
    loadingSteps: [
      "Reading job description",
      "Extracting required keywords",
      "Comparing resume language",
      "Finding truthful gaps",
    ],
    studioLabel: "Role alignment",
    studioTitle: "Job match report",
    studioDescription:
      "Review matched evidence, missing keywords, tailored rewrites, and overclaiming warnings.",
    scoreLabel: "Match score",
    warningLabel: "Overclaiming checks",
    fieldGroups: [
      {
        title: "Target role",
        description: "Name the role you are preparing for.",
        fields: ["targetRole"],
        optional: true,
      },
      {
        title: "Job description",
        description: "Paste the responsibilities, requirements, and skills.",
        fields: ["jobDescription"],
      },
      {
        title: "Resume evidence",
        description:
          "Add the bullets or experience text you want compared with the posting.",
        fields: ["resumeText"],
      },
    ],
    optionalFields: ["targetRole"],
    previewMetrics: [
      { label: "Match score", value: "78%" },
      { label: "Missing keywords", value: "4 gaps" },
      { label: "Matched skills", value: "6 found" },
      { label: "Overclaiming risk", value: "Low" },
    ],
    outputSignals: [
      "Matched and missing keywords",
      "Truthful tailoring guidance",
      "Role-specific rewrites",
    ],
  },
  "project-to-resume": {
    workspaceTitle: "Project packaging workspace",
    workspaceDescription:
      "Turn one real project into resume proof, a LinkedIn description, and reusable portfolio language.",
    composerLabel: "Project evidence input",
    composerTitle: "Package the work you actually owned",
    composerDescription:
      "Separate what the project did from what you personally built, analyzed, designed, or improved.",
    submitLabel: "Package this project",
    loadingLabel: "Packaging project evidence",
    loadingDescription:
      "Separating the project context, your ownership, and the strongest proof.",
    loadingSteps: [
      "Reading project details",
      "Identifying ownership",
      "Extracting tech stack",
      "Packaging project impact",
    ],
    studioLabel: "Project asset kit",
    studioTitle: "Project career assets",
    studioDescription:
      "Review resume bullets, profile copy, README wording, and role-relevant keywords from the same project.",
    scoreLabel: "Project strength",
    warningLabel: "Ownership checks",
    fieldGroups: [
      {
        title: "Project basics",
        description: "Name the project and the role it should support.",
        fields: ["projectName", "targetRole"],
      },
      {
        title: "Project context",
        description:
          "Explain what the project did and the tools or technologies involved.",
        fields: ["projectDescription", "techStack"],
      },
      {
        title: "Your ownership and proof",
        description:
          "Describe your personal contribution and any truthful result or scope.",
        fields: ["contribution", "metrics"],
      },
    ],
    optionalFields: ["techStack", "metrics"],
    previewMetrics: [
      { label: "Technical clarity", value: "Strong" },
      { label: "Ownership", value: "Clear" },
      { label: "Tools", value: "4 found" },
      { label: "Impact", value: "Needs proof" },
      { label: "ATS keywords", value: "7 found" },
    ],
    outputSignals: [
      "Five resume bullets",
      "LinkedIn project copy",
      "GitHub README summary",
    ],
  },
  "cover-letter-generator": {
    workspaceTitle: "Cover letter workspace",
    workspaceDescription:
      "Connect your strongest proof to a specific role and company in a concise, editable letter.",
    composerLabel: "Letter brief",
    composerTitle: "Build a focused writing brief",
    composerDescription:
      "Give the draft a clear role, company, and honest proof point instead of generic enthusiasm.",
    submitLabel: "Draft cover letter",
    loadingLabel: "Drafting your letter",
    loadingDescription:
      "Connecting the role context with the strongest evidence from your background.",
    loadingSteps: [
      "Reading role context",
      "Matching proof to company",
      "Drafting concise opening",
      "Preparing editable versions",
    ],
    studioLabel: "Application letter",
    studioTitle: "Cover letter draft",
    studioDescription:
      "Review a concise opening, proof-led body, and practical customization checklist.",
    scoreLabel: "Letter strength",
    warningLabel: "Details to verify",
    fieldGroups: [
      {
        title: "Role and company",
        description: "Set the target for the letter.",
        fields: ["targetRole", "company"],
      },
      {
        title: "Role context",
        description: "Optional posting context for a more specific draft.",
        fields: ["jobDescription"],
        optional: true,
      },
      {
        title: "Background and proof",
        description:
          "Add the experience and one strongest example that demonstrate fit.",
        fields: ["background", "strongestProof"],
      },
      {
        title: "Tone",
        description: "Choose how the final draft should sound.",
        fields: ["tone"],
      },
    ],
    optionalFields: ["jobDescription", "strongestProof"],
    previewMetrics: [
      { label: "Role fit", value: "Strong" },
      { label: "Company relevance", value: "Specific" },
      { label: "Proof strength", value: "Credible" },
      { label: "Tone", value: "Professional" },
    ],
    outputSignals: [
      "Concise editable draft",
      "Proof-led opening",
      "Customization checklist",
    ],
  },
  "linkedin-headline-generator": {
    workspaceTitle: "LinkedIn positioning workspace",
    workspaceDescription:
      "Turn your direction, skills, and strongest evidence into credible headline options recruiters can scan quickly.",
    composerLabel: "Profile positioning input",
    composerTitle: "Define the signal your profile should send",
    composerDescription:
      "Use a clear target role and real skills. Add projects or achievements when they strengthen your positioning.",
    submitLabel: "Create headlines",
    loadingLabel: "Building profile positioning",
    loadingDescription:
      "Combining your target role, keywords, and credible proof into concise options.",
    loadingSteps: [
      "Reading career direction",
      "Extracting keywords",
      "Creating headline options",
      "Polishing profile tone",
    ],
    studioLabel: "Profile positioning",
    studioTitle: "LinkedIn headline options",
    studioDescription:
      "Compare headline directions, choose the clearest option, and reuse the suggested profile keywords.",
    scoreLabel: "Positioning strength",
    warningLabel: "Credibility checks",
    fieldGroups: [
      {
        title: "Career direction",
        description: "Show where you are now and the role you want next.",
        fields: ["currentRole", "targetRole"],
      },
      {
        title: "Skills and proof",
        description:
          "Add the keywords, projects, or achievements that support that direction.",
        fields: ["specialty", "achievements"],
      },
      {
        title: "Tone",
        description: "Choose the professional voice for the headline options.",
        fields: ["tone"],
      },
    ],
    optionalFields: ["currentRole", "achievements"],
    previewMetrics: [
      { label: "Keyword strength", value: "High" },
      { label: "Recruiter clarity", value: "Clear" },
      { label: "Professional tone", value: "Balanced" },
    ],
    outputSignals: [
      "Three headline directions",
      "Best-option recommendation",
      "Profile keyword guidance",
    ],
  },
};

export function isPurposeToolSlug(slug: string): slug is PurposeToolSlug {
  return slug in presentations;
}

export function getPurposeToolPresentation(slug: string) {
  if (!isPurposeToolSlug(slug)) {
    throw new Error(`Missing workspace presentation for ${slug}`);
  }

  return presentations[slug];
}
