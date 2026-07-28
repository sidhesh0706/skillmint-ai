import type { Metadata } from "next";
import { ResourceLibrary } from "@/components/resource-library";
import type { ResourceCardPage } from "@/components/resource-card";
import {
  seoLandingPages,
  type SeoLandingPage,
} from "@/data/seo-landing-pages";

export const metadata: Metadata = {
  title: "Resume Bullet Resources",
  description:
    "Browse SkillMint AI resume bullet guides with ATS-friendly examples, writing tips, and action verbs for freshers, engineers, analysts, product managers, and marketers.",
  keywords: [
    "resume bullet examples",
    "resume bullet resources",
    "ATS resume bullets",
    "resume writing guides",
    "AI resume bullet generator",
  ],
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resume Bullet Resources | SkillMint AI",
    description:
      "Explore role-specific resume bullet examples and writing guides, then generate your own bullets with AI.",
    url: "/resources",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkillMint AI resume bullet resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Bullet Resources | SkillMint AI",
    description:
      "Explore role-specific resume bullet examples and writing guides from SkillMint AI.",
    images: ["/opengraph-image"],
  },
};

function toPreview(page: SeoLandingPage): ResourceCardPage {
  return {
    slug: page.slug,
    category: page.category,
    audience: page.audience,
    title: page.title,
    metaDescription: page.metaDescription,
    actionVerbs: page.actionVerbs,
  };
}

const resourcePages = seoLandingPages.map(toPreview);
const pageBySlug = new Map(resourcePages.map((page) => [page.slug, page]));

function selectPages(slugs: string[]) {
  return slugs
    .map((slug) => pageBySlug.get(slug))
    .filter((page): page is ResourceCardPage => Boolean(page));
}

const resourceShelves = [
  {
    id: "students-and-freshers",
    eyebrow: "Experience level",
    title: "Students and freshers",
    description:
      "Turn coursework, internships, and early responsibilities into credible proof.",
    pages: selectPages([
      "resume-bullet-generator-for-students",
      "resume-bullets-for-freshers",
      "resume-bullet-generator-for-freshers",
      "entry-level-resume-bullets",
    ]),
  },
  {
    id: "software-and-data",
    eyebrow: "Technical roles",
    title: "Software and data",
    description:
      "Show technical ownership, tools, delivery, and measurable outcomes clearly.",
    pages: selectPages([
      "software-engineer-resume-bullets",
      "data-analyst-resume-bullets",
      "resume-bullet-generator-for-software-engineers",
      "resume-bullet-generator-for-data-analysts",
    ]),
  },
  {
    id: "ats-and-metrics",
    eyebrow: "Resume quality",
    title: "ATS and metrics",
    description:
      "Strengthen keyword fit, measurable impact, and recruiter readability.",
    pages: selectPages([
      "ats-resume-bullet-checker",
      "ats-resume-bullet-generator",
      "resume-bullet-keyword-optimizer",
      "resume-bullet-examples-with-metrics",
      "resume-achievement-rewriter",
    ]),
  },
  {
    id: "projects-and-internships",
    eyebrow: "Practical experience",
    title: "Projects and internships",
    description:
      "Translate project work and internship tasks into role-relevant achievements.",
    pages: selectPages([
      "resume-bullet-examples-for-projects",
      "resume-bullet-examples-for-internships",
      "resume-bullet-examples",
      "project-manager-resume-bullets",
    ]),
  },
];

const featuredGuide =
  pageBySlug.get("resume-achievement-rewriter") ?? resourcePages[0];

const startHerePages = selectPages([
  "resume-bullet-generator-for-students",
  "software-engineer-resume-bullets",
  "resume-bullet-examples-with-metrics",
]);

export default function ResourcesPage() {
  if (!featuredGuide) {
    return null;
  }

  return (
    <ResourceLibrary
      pages={resourcePages}
      shelves={resourceShelves}
      featured={featuredGuide}
      startHere={startHerePages}
    />
  );
}
