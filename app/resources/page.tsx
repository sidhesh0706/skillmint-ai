import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";
import { GlowCard } from "@/components/glow-card";
import { KeywordChip } from "@/components/keyword-chip";
import { PremiumPageShell } from "@/components/premium-page-shell";
import { ResourceCard } from "@/components/resource-card";
import { seoLandingPages } from "@/data/seo-landing-pages";

function pagesInCategory(category: "experience" | "role" | "goal" | "use-case") {
  return seoLandingPages.filter((page) => {
    if (page.category) {
      return page.category === category;
    }

    if (category === "experience") {
      return ["resume-bullets-for-freshers", "entry-level-resume-bullets"].includes(page.slug);
    }

    if (category === "role") {
      return [
        "software-engineer-resume-bullets",
        "data-analyst-resume-bullets",
        "product-manager-resume-bullets",
        "marketing-resume-bullets",
        "customer-service-resume-bullets",
        "sales-resume-bullets",
        "finance-resume-bullets",
        "hr-resume-bullets",
        "teacher-resume-bullets",
        "project-manager-resume-bullets",
      ].includes(page.slug);
    }

    if (category === "goal") {
      return ["resume-bullet-generator", "ats-resume-bullet-generator", "resume-bullet-examples"].includes(page.slug);
    }

    return false;
  });
}

const resourceCategories = [
  {
    title: "By experience level",
    eyebrow: "Students and freshers",
    description: "Guides for students, freshers, interns, and entry-level candidates.",
    pages: pagesInCategory("experience"),
  },
  {
    title: "By job role",
    eyebrow: "Role examples",
    description: "Role-specific examples for common career paths and job families.",
    pages: pagesInCategory("role"),
  },
  {
    title: "By resume goal",
    eyebrow: "Improve the draft",
    description: "Improve ATS fit, rewrite achievements, add metrics, and optimize keywords.",
    pages: pagesInCategory("goal"),
  },
  {
    title: "By use case",
    eyebrow: "Projects and internships",
    description: "Focused guides for projects, internships, and practical resume scenarios.",
    pages: pagesInCategory("use-case"),
  },
].filter((category) => category.pages.length);

const startHereSlugs = [
  "resume-bullet-generator-for-students",
  "resume-achievement-rewriter",
  "resume-bullet-examples-with-metrics",
  "ats-resume-bullet-checker",
  "software-engineer-resume-bullets",
  "data-analyst-resume-bullets",
];

const startHerePages = startHereSlugs
  .map((slug) => seoLandingPages.find((page) => page.slug === slug))
  .filter((page): page is (typeof seoLandingPages)[number] => Boolean(page));

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

export default function ResourcesPage() {
  return (
    <>
      <PremiumPageShell
        eyebrow="Resume resources"
        title="A premium career library for sharper applications."
        description="Browse role-specific examples, action verbs, FAQs, and practical resume-writing guidance before turning the examples into your own tailored bullets."
        side={
          <div className="command-panel p-5">
            <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 text-slate-200">
              <Search className="h-4 w-4 text-mint-300" aria-hidden="true" />
              <span className="text-sm">Find guides by role, goal, project, metric, or ATS keyword</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Students", "Freshers", "Software", "Data", "ATS", "Metrics", "Projects", "Internships", "Action verbs"].map((item) => (
                <a key={item} href="#resource-library">
                  <KeywordChip className="border-white/10 bg-white/[0.08] text-slate-100">{item}</KeywordChip>
                </a>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/tools/resume-bullet-generator" className="button-primary bg-white text-ink hover:bg-mint-50">
                Generate bullets
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools" className="button-ghost">
                Explore tools
              </Link>
            </div>
          </div>
        }
        dark
      >
        <div className="flex flex-wrap gap-2 text-sm text-slate-300">
          {["Guided examples", "ATS language", "Metrics", "Truth-first writing"].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 font-semibold">
              {item}
            </span>
          ))}
        </div>
      </PremiumPageShell>

      <section className="premium-shell py-14 sm:py-20" id="resource-library">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint-700">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                Choose the guide closest to your next application.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-600">
              These are the fastest paths from example bullets to your own tailored output.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {startHerePages.map((page) => (
              <ResourceCard key={page.slug} page={page} />
            ))}
          </div>

          <div className="mt-14 space-y-8">
            {resourceCategories.map((category) => (
              <section key={category.title} className="resource-shelf p-5 sm:p-7">
                <div className="mb-6 grid gap-3 lg:grid-cols-[0.35fr_0.65fr] lg:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint-700">
                      {category.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                      {category.title}
                    </h2>
                  </div>
                  <p className="leading-7 text-slate-600">{category.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.pages.map((page) => (
                    <ResourceCard key={page.slug} page={page} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <GlowCard className="mt-12 bg-ink p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-mint-100">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Turn examples into your own bullets
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em]">
                  Use a guide for direction, then generate bullets tailored to your real role.
                </h2>
              </div>
              <Link href="/tools/resume-bullet-generator" className="button-primary bg-white text-ink hover:bg-mint-50">
                Generate resume bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </GlowCard>
        </div>
      </section>
    </>
  );
}
