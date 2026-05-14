import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";
import { CelestialBackground } from "@/components/celestial-background";
import { CosmicGrid } from "@/components/cosmic-grid";
import { KeywordChip } from "@/components/keyword-chip";
import { SectionHeading } from "@/components/section-heading";
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
    description: "Guides for students, freshers, interns, and entry-level candidates.",
    pages: pagesInCategory("experience"),
  },
  {
    title: "By job role",
    description: "Role-specific examples for common career paths and job families.",
    pages: pagesInCategory("role"),
  },
  {
    title: "By resume goal",
    description: "Improve ATS fit, rewrite achievements, add metrics, and optimize keywords.",
    pages: pagesInCategory("goal"),
  },
  {
    title: "By use case",
    description: "Focused guides for projects, internships, and practical resume scenarios.",
    pages: pagesInCategory("use-case"),
  },
].filter((category) => category.pages.length);

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
      <section className="cosmic-shell py-14 sm:py-20">
        <CelestialBackground intensity="section" />
        <CosmicGrid />
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/80 px-4 py-2 text-sm font-semibold text-mint-700 shadow-line backdrop-blur">
                <BookOpen className="h-4 w-4 text-mint-700" aria-hidden="true" />
                Resume resources
              </p>
              <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl">
                A focused career library for sharper applications.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Browse role-specific examples, action verbs, FAQs, and practical tips for
                writing stronger resume bullets. Each guide links back to the AI resume
                bullet generator when you are ready to create your own.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-3 shadow-soft backdrop-blur">
              <div className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-slate-600">
                <Search className="h-4 w-4 text-mint-700" aria-hidden="true" />
                <span className="text-sm">Search by role, goal, project, metric, or ATS keyword</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Freshers", "Software", "Metrics", "Projects"].map((item) => (
                  <KeywordChip key={item} dark>
                    {item}
                  </KeywordChip>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link href="/tools/resume-bullet-generator" className="button-primary">
                  Generate bullets
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/tools" className="button-secondary">
                  Explore tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8">
            <SectionHeading
              eyebrow="Resource library"
              title="Find the right resume guide faster"
              description="Browse by experience level, role, resume goal, or use case. Each guide links back to the free resume bullet generator."
            />
          </div>

          <div className="space-y-12">
            {resourceCategories.map((category) => (
              <section key={category.title}>
                <div className="mb-5">
                  <h2 className="text-2xl font-semibold text-ink">{category.title}</h2>
                  <p className="mt-2 leading-7 text-slate-600">{category.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="gloss-panel hover-gloss group p-5"
                    >
                      <div className="gloss-content">
                        <p className="text-sm font-semibold uppercase text-mint-700">{page.audience}</p>
                        <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">
                          {page.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {page.metaDescription}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {page.actionVerbs.slice(0, 3).map((verb) => (
                            <span
                              key={verb}
                              className="rounded-full border border-mint-100 bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700"
                            >
                              {verb}
                            </span>
                          ))}
                        </div>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-700">
                          Open guide
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

