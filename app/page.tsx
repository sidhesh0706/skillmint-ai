import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Download,
  FileDown,
  Gauge,
  History,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { AdSlot } from "@/components/ad-slot";
import { EmailCapture } from "@/components/email-capture";
import { ToolGrid } from "@/components/tool-grid";
import { TrustPills } from "@/components/trust-pills";
import { seoLandingPages } from "@/data/seo-landing-pages";
import { featuredTools } from "@/data/tool-config";

const benefits = [
  {
    title: "Built for recruiter scanning",
    description:
      "Outputs are structured around clarity, action verbs, keywords, and measurable impact.",
    icon: ShieldCheck,
  },
  {
    title: "Fast enough for real job searches",
    description:
      "Create polished first drafts in minutes so you can move applications forward.",
    icon: Gauge,
  },
  {
    title: "One career toolkit",
    description:
      "Start with resume bullets, then expand into cover letters, LinkedIn, interviews, and email.",
    icon: Layers3,
  },
];

const productFeatures: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Resume score for every bullet",
    description:
      "See clarity, impact, specificity, keyword strength, metric usage, and action verb quality in one simple score.",
    icon: BarChart3,
  },
  {
    title: "One-click stronger rewrites",
    description:
      "Improve a bullet while preserving truthfulness, then compare the original against the stronger version.",
    icon: Wand2,
  },
  {
    title: "Missing keyword guidance",
    description:
      "Find useful role and industry keywords to add only when they truthfully match your background.",
    icon: Target,
  },
  {
    title: "Recent generation history",
    description:
      "Restore your latest drafts from browser storage without creating an account or losing momentum.",
    icon: History,
  },
  {
    title: "Multiple export formats",
    description:
      "Copy for resumes, LinkedIn, Google Docs, TXT, or Markdown with clean formatting for each destination.",
    icon: FileDown,
  },
  {
    title: "Private by default",
    description:
      "Generation runs through a secure server route. Saved drafts stay in your browser unless you export them.",
    icon: LockKeyhole,
  },
];

const heroFeatures: Array<[string, LucideIcon]> = [
  ["Scored", BarChart3],
  ["Rewrite", Wand2],
  ["Export", Download],
];

export const metadata: Metadata = {
  title: "Free AI Tools to Build Your Career Faster",
  description:
    "Use SkillMint AI to create stronger resume bullets and discover career tools for resumes, LinkedIn, interviews, and professional productivity.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SkillMint AI | Free AI Tools to Build Your Career Faster",
    description:
      "Create recruiter-ready resume bullets and career assets with free AI tools.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint AI | Free AI Career Tools",
    description:
      "Create recruiter-ready resume bullets and career assets with free AI tools.",
  },
};

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[36rem]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0))]" />
        <div className="container-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-18">
          <div className="fade-in-up max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/[0.78] px-4 py-2 text-sm font-semibold text-mint-700 shadow-line backdrop-blur">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Resume scoring, rewrites, and exports
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
              Free AI Tools to Build Your Career Faster
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              SkillMint AI helps you turn rough work notes into scored,
              recruiter-ready resume bullets with stronger rewrites, keyword
              guidance, and exports built for real applications.
            </p>
            <div className="mt-5">
              <TrustPills />
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools" className="button-primary">
                Explore Tools
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools/resume-bullet-generator" className="button-secondary">
                Try Resume Generator
              </Link>
            </div>
            <div className="mt-7 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3">
              {[
                ["5", "AI bullets"],
                ["100", "point score"],
                ["0", "signup steps"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/80 bg-white/75 p-3 shadow-line backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft">
                  <p className="text-2xl font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in-up-delayed card-surface overflow-hidden ring-1 ring-white/70">
            <div className="border-b border-slate-200/70 bg-[linear-gradient(120deg,#ffffff,#effdf8_52%,#fff7ed)] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">AI Resume Intelligence</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">Score, rewrite, compare, export</p>
                </div>
                <span className="rounded-full border border-mint-100 bg-white px-3 py-1 text-xs font-semibold text-mint-700">
                  Live tool
                </span>
              </div>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              {[
                ["92", "Improved onboarding workflows by documenting recurring support issues and reducing new hire ramp time by 28%."],
                ["87", "Coordinated weekly product, operations, and customer success updates to remove blockers before launch."],
                ["81", "Analyzed customer feedback trends to prioritize process improvements and improve support response quality."],
              ].map(([score, bullet]) => (
                <div
                  key={bullet}
                  className="rounded-lg border border-slate-200/80 bg-white p-4 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-mint-100" />
                      <span className="rounded-full border border-mint-100 bg-mint-50 px-2.5 py-1 text-xs font-semibold text-mint-700">
                        {score}/100
                      </span>
                    </div>
                    <Sparkles className="h-4 w-4 text-mint-700" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-6 text-slate-700">- {bullet}</p>
                </div>
              ))}
              <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Missing keywords to consider
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["stakeholder management", "process improvement", "customer insights"].map((keyword) => (
                    <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700 shadow-line">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {heroFeatures.map(([label, Icon]) => (
                  <div
                    key={label}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    <Icon className="h-4 w-4 text-mint-700" aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdSlot label="Career resource placement" />

      <section className="pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Top features"
              title="More than a resume bullet generator."
              description="SkillMint AI gives every draft a scoring layer, rewrite workflow, keyword guidance, exports, and browser-only history so you can improve faster."
            />
            <Link href="/tools/resume-bullet-generator" className="button-secondary self-start text-sm">
              Open live tool
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-lg border border-slate-200 bg-white/85 p-5 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-white hover:shadow-soft"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#effdf8,#ffffff)] text-mint-700 shadow-line transition duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Resume Bullet Examples"
              title="Explore resume bullet examples by role."
              description="Browse focused guides with ATS-friendly examples, writing tips, and action verbs, then generate your own bullets with SkillMint AI."
            />
            <Link href="/resources" className="button-secondary self-start text-sm">
              View resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seoLandingPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group rounded-lg border border-slate-200 bg-white/85 p-5 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-white hover:shadow-soft"
              >
                <p className="text-sm font-semibold uppercase text-mint-700">{page.audience}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">
                  {page.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {page.metaDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint-700">
                  Read examples
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured tools"
              title="Start with the career assets recruiters actually read."
              description="Use the first SkillMint AI tool today, with more focused generators already planned."
            />
            <Link
              href="/tools"
              className="button-secondary self-start text-sm"
            >
              View all tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ToolGrid tools={featuredTools} />
        </div>
      </section>

      <section className="page-band py-16 sm:py-20">
        <div className="container-shell">
          <SectionHeading
            centered
            eyebrow="Benefits"
            title="A focused toolkit for faster, cleaner applications."
            description="SkillMint AI keeps the experience lightweight: no accounts, no paywalls, and secure AI generation for the live resume tool."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="group rounded-lg border border-slate-200 bg-cloud p-6 transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-white hover:shadow-soft">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-mint-700 shadow-line transition duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <EmailCapture />

      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="card-surface grid gap-8 overflow-hidden bg-ink p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-100">Start now</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Turn rough work notes into stronger resume bullets.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Try the first SkillMint AI tool today. Generate sharper resume
                bullets through a secure server route powered by Groq.
              </p>
            </div>
            <Link href="/tools/resume-bullet-generator" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-mint-50">
              Generate bullets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
