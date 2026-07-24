import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  Layers3,
  LockKeyhole,
  Search,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { JsonLd } from "@/components/json-ld";
import { ProductWindow } from "@/components/product-window";
import { ToolGrid } from "@/components/tool-grid";
import { TrackedLink } from "@/components/tracked-link";
import { seoLandingPages } from "@/data/seo-landing-pages";
import { featuredTools } from "@/data/tool-config";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/structured-data";

const trustPills = ["No signup", "Browser-only history", "Truth-first rewrites", "ATS-friendly outputs"];

const workflowSteps = [
  ["Resume bullets", "Turn notes into proof."],
  ["Resume roast", "Find weak wording."],
  ["JD match", "Spot keyword gaps."],
  ["Project to resume", "Package projects."],
  ["LinkedIn", "Reuse positioning."],
  ["Cover letter", "Draft faster."],
];

const features: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Score weak bullets",
    description: "Get clarity, impact, specificity, metric, keyword, and action-verb signals.",
    icon: BarChart3,
  },
  {
    title: "Rewrite with context",
    description: "Improve wording while keeping claims grounded in your actual experience.",
    icon: Wand2,
  },
  {
    title: "Match job descriptions",
    description: "Compare your resume language against a target posting and find truthful gaps.",
    icon: Search,
  },
  {
    title: "Export clean copy",
    description: "Copy or download resume-ready output for docs, editors, LinkedIn, and TXT.",
    icon: Download,
  },
  {
    title: "Reuse across assets",
    description: "Carry the strongest proof into LinkedIn headlines, cover letters, and applications.",
    icon: Layers3,
  },
  {
    title: "Private by default",
    description: "Saved drafts stay in your browser. No account is required to start.",
    icon: LockKeyhole,
  },
];

const featuredSeoLandingPages = seoLandingPages.slice(0, 6);

export const metadata: Metadata = {
  title: "SkillMint AI | Recruiter-Ready Career Tools",
  description:
    "Turn real student, project, and work experience into recruiter-ready resume bullets, job match insights, cover letters, and LinkedIn assets.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SkillMint AI | Recruiter-Ready Career Tools",
    description: "Create recruiter-ready resume bullets and career assets with free AI tools.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkillMint AI career tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint AI | Free AI Career Tools",
    description: "Create recruiter-ready resume bullets and career assets with free AI tools.",
    images: ["/opengraph-image"],
  },
};

function PreviewPanel() {
  return <ProductWindow />;
}

export default function Home() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), breadcrumbSchema([{ name: "Home", path: "/" }])]} />

      <section className="premium-hero py-10 sm:py-12 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#ffffff,rgba(255,255,255,0))]" />
        <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="fade-in-up">
            <div className="hero-badge mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Free AI career workspace
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-[3.55rem] xl:text-[4.25rem]">
              Turn rough experience into job-ready career assets.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Generate resume bullets, match job descriptions, improve LinkedIn copy, and draft
              cover letters from the same real experience.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href="/tools/resume-bullet-generator" className="button-primary" eventName="homepage_cta_click" eventPayload={{ cta: "start_resume_bullets" }}>
                Start with resume bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink href="/tools" className="button-secondary" eventName="homepage_cta_click" eventPayload={{ cta: "explore_tools" }}>
                Explore tools
              </TrackedLink>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustPills.map((pill) => (
                <span key={pill} className="trust-pill inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <PreviewPanel />
        </div>
      </section>

      <section className="surface-band py-11 sm:py-14">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Build the application kit in the right order.
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {workflowSteps.map(([title, text], index) => (
              <div key={title} className="workflow-card rounded-3xl p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">{index + 1}</span>
                <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="soft-stage py-12 sm:py-16">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Features</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Everything you need to sharpen a draft.
              </h2>
            </div>
            <Link href="/tools" className="button-secondary self-start">
              View tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="feature-card rounded-3xl p-6">
                  <div className="feature-icon flex h-11 w-11 items-center justify-center rounded-2xl text-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="surface-band py-12 sm:py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Example transformation</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              From plain task to application-ready proof.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              SkillMint improves structure, action verbs, keywords, and impact without pushing you
              to overclaim.
            </p>
          </div>
          <div className="transformation-panel rounded-[2rem] border border-slate-200 p-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Before</p>
              <p className="mt-2 text-lg text-slate-700">Made dashboard for sales data.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">After</p>
              <p className="mt-2 text-lg leading-8 text-slate-800">
                Built an interactive sales dashboard using SQL and Excel to track weekly pipeline
                trends and identify underperforming regions faster.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["action verb", "SQL + Excel", "clear impact", "ATS keywords"].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="soft-stage py-12 sm:py-16">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Featured tools</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Start your application kit.
              </h2>
            </div>
            <Link href="/resources" className="button-secondary self-start">
              Browse resources
            </Link>
          </div>
          <ToolGrid tools={featuredTools} />
        </div>
      </section>

      <section className="surface-band py-12 sm:py-16">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Resume examples</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Learn from role-specific guides.
              </h2>
            </div>
            <Link href="/resources" className="button-secondary self-start">
              View all resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSeoLandingPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}`} className="interactive-card group rounded-3xl p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">{page.audience}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-950">{page.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{page.metaDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Open guide
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />

      <section className="soft-stage py-12 sm:py-16">
        <div className="container-shell">
          <div className="cta-panel-premium rounded-[2rem] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-200">Start now</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                Build your first application kit.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Start with one honest note and turn it into resume-ready proof.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link href="/tools/resume-bullet-generator" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-emerald-50">
                Generate resume bullets
              </Link>
              <Link href="/resources" className="button-ghost">
                Browse resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
