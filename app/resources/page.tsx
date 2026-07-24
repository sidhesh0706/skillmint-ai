import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Gauge, Layers3, Search, Target } from "lucide-react";
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
  const filters = ["Students", "Freshers", "Software", "Data", "ATS", "Metrics", "Projects", "Internships"];

  return (
    <>
      <section className="premium-hero py-10 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#ffffff,rgba(255,255,255,0))]" />
        <div className="container-shell relative grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Resume resources
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-6xl">
              Resume resources that turn examples into application-ready proof.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Browse examples by role, experience level, metrics, ATS keywords, and project type,
              then turn the closest example into your own bullet.
            </p>
          </div>

          <div className="app-panel p-4">
            <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-600">
              <Search className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <span className="text-sm">Find guides by role, goal, project, metric, or ATS keyword</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((item) => (
                <a
                  key={item}
                  href="#resource-library"
                  className="trust-pill rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/tools/resume-bullet-generator" className="button-primary">
                Generate bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools" className="button-secondary">
                Explore tools
              </Link>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {["Pick a guide", "Borrow structure", "Generate your version"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-[#FAFAF8] px-3 py-2 shadow-line">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="surface-band py-12 sm:py-16" id="resource-library">
        <div className="container-shell">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.66fr_0.34fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Choose the guide closest to your situation.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                These are the highest-leverage guides for turning rough experience into clear
                application language.
              </p>
            </div>
            <div className="interactive-card rounded-3xl p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white shadow-line">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm leading-6 text-slate-600">
                  Best workflow: open a guide, borrow the structure, then use the generator with your real proof.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {startHerePages.map((page) => (
              <ResourceCard key={page.slug} page={page} />
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Find the role language",
                description: "Use role-specific examples to understand what recruiters expect.",
                icon: Search,
              },
              {
                title: "Add proof and metrics",
                description: "Turn tasks into impact without inventing claims.",
                icon: Gauge,
              },
              {
                title: "Build the application kit",
                description: "Move from bullets to job match, LinkedIn, and cover-letter drafts.",
                icon: Layers3,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="feature-card rounded-3xl p-5">
                  <div className="feature-icon flex h-11 w-11 items-center justify-center rounded-2xl text-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 space-y-7">
            {resourceCategories.map((category) => (
              <section key={category.title} className="resource-shelf rounded-[2rem] border border-slate-200 p-5 sm:p-7">
                <div className="mb-6 grid gap-3 lg:grid-cols-[0.35fr_0.65fr] lg:items-end">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                        {category.eyebrow}
                      </p>
                      <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-line">
                        {category.pages.length} guides
                      </span>
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
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

          <section className="cta-panel-premium mt-10 rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-200">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Turn examples into your own bullets
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">
                  Use a guide for direction, then generate bullets tailored to your real role.
                </h2>
              </div>
              <Link href="/tools/resume-bullet-generator" className="button-primary">
                Generate resume bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
