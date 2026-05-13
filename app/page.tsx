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
  Target,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { AnimatedScoreBadge } from "@/components/animated-score-badge";
import { CelestialBackground } from "@/components/celestial-background";
import { FloatingPreviewCard } from "@/components/floating-preview-card";
import { GlowCard } from "@/components/glow-card";
import { KeywordChip } from "@/components/keyword-chip";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { AdSlot } from "@/components/ad-slot";
import { EmailCapture } from "@/components/email-capture";
import { JsonLd } from "@/components/json-ld";
import { ToolGrid } from "@/components/tool-grid";
import { TrackedLink } from "@/components/tracked-link";
import { seoLandingPages } from "@/data/seo-landing-pages";
import { featuredTools } from "@/data/tool-config";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/structured-data";

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

const applicationKit = [
  "Resume bullets",
  "JD match",
  "LinkedIn headline",
  "Cover letter",
  "Email follow-up",
];

const featuredSeoLandingPages = seoLandingPages.slice(0, 6);

const workflowSteps = [
  {
    title: "Resume bullets",
    description: "Turn rough experience notes into scored, recruiter-ready bullets.",
  },
  {
    title: "JD match",
    description: "Compare your wording against a target posting and find truthful keyword gaps.",
  },
  {
    title: "LinkedIn",
    description: "Reuse your strongest positioning for cleaner profile headlines and summaries.",
  },
  {
    title: "Cover letter",
    description: "Connect your best proof points to the company and role without starting blank.",
  },
  {
    title: "Apply",
    description: "Export clean copy for resumes, editors, LinkedIn, and job applications.",
  },
];

const audienceSegments = [
  "Students",
  "Freshers",
  "Interns",
  "Software engineers",
  "Data analysts",
  "Career switchers",
];

export const metadata: Metadata = {
  title: "SkillMint AI | Recruiter-Ready Career Tools",
  description:
    "Turn real student, project, and work experience into recruiter-ready resume bullets, job match insights, cover letters, and LinkedIn assets.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SkillMint AI | Recruiter-Ready Career Tools",
    description:
      "Create recruiter-ready resume bullets and career assets with free AI tools.",
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
    description:
      "Create recruiter-ready resume bullets and career assets with free AI tools.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <section className="hero-stage relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 hidden -translate-x-1/2 select-none text-[12rem] font-semibold leading-none tracking-[-0.08em] hero-wordmark lg:block">
          SkillMint
        </div>
        <div className="container-shell grid gap-10 py-12 sm:py-16 lg:min-h-[720px] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-20">
          <SectionReveal className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/[0.82] px-4 py-2 text-sm font-semibold text-mint-700 shadow-[0_12px_36px_rgba(31,201,153,0.10)] backdrop-blur">
              <CheckCircle2 className="h-4 w-4 text-mint-700" aria-hidden="true" />
              Free AI career workspace
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-ink sm:text-6xl lg:text-8xl">
              Turn rough experience into career assets that feel ready.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              SkillMint helps students, freshers, interns, and early-career professionals transform
              projects, internships, and work notes into scored resume bullets, JD-match insights,
              LinkedIn copy, and cover-letter drafts.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["No signup", "Browser-only history", "Truth-first rewrites"].map((pill, index) => (
                <span
                  key={pill}
                  className="floating-card inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/[0.78] px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-line backdrop-blur"
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-500 shadow-[0_0_14px_rgba(31,201,153,0.75)]" />
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/tools/resume-bullet-generator"
                className="button-primary"
                eventName="homepage_cta_click"
                eventPayload={{ cta: "generate_resume_bullets" }}
              >
                Generate resume bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/resources"
                className="button-secondary"
                eventName="homepage_cta_click"
                eventPayload={{ cta: "browse_examples" }}
              >
                Browse examples
              </TrackedLink>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["Score", "every bullet"],
                ["Rewrite", "with context"],
                ["Export", "clean formats"],
              ].map(([value, label]) => (
                <div key={label} className="metric-tile">
                  <p className="text-sm font-semibold uppercase text-mint-700">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay="sm" className="relative">
            <div className="absolute -right-8 top-8 hidden h-[34rem] w-[34rem] rounded-full border border-mint-100/80 lg:block" />
            <div className="absolute -right-16 top-24 hidden h-52 w-52 rounded-full bg-mint-300/20 blur-3xl lg:block" />
            <div className="product-shell relative overflow-hidden rounded-[2.25rem] border border-slate-200/80 p-3 shadow-[0_36px_120px_rgba(23,32,51,0.16)] backdrop-blur-xl">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white/[0.92] p-4 shadow-line">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">Resume Intelligence</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Score, rewrite, match, export
                    </p>
                  </div>
                  <AnimatedScoreBadge score="92/100" label="ready" />
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
                  <div className="rounded-2xl bg-ink p-4 text-white shadow-[0_22px_70px_rgba(23,32,51,0.22)]">
                    <p className="text-xs font-semibold uppercase text-mint-100">Career kit</p>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Resume bullets", "ready"],
                        ["JD match", "keyword gaps"],
                        ["LinkedIn", "profile copy"],
                        ["Cover letter", "draft"],
                      ].map(([title, status]) => (
                        <div key={title} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                          <p className="text-sm font-semibold">{title}</p>
                          <p className="mt-1 text-xs text-slate-300">{status}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["92", "Built an interactive sales dashboard using SQL and Excel to track weekly pipeline trends and identify underperforming regions faster."],
                      ["87", "Coordinated product, operations, and customer success updates to remove blockers before launch."],
                      ["81", "Analyzed customer feedback trends to prioritize process improvements and improve response quality."],
                    ].map(([score, bullet], index) => (
                      <FloatingPreviewCard
                        key={bullet}
                        delay={index === 1 ? "sm" : index === 2 ? "md" : "none"}
                        className="p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-mint-500 to-cyan-300"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <AnimatedScoreBadge score={`${score}`} label="" />
                        </div>
                        <p className="text-sm leading-6 text-slate-700">- {bullet}</p>
                      </FloatingPreviewCard>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/75 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Missing keyword opportunities
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["stakeholder management", "process improvement", "customer insights"].map((keyword, index) => (
                      <KeywordChip
                        key={keyword}
                        className="border-amber-200 bg-white/85 text-amber-800"
                        style={{ animationDelay: `${index * 120}ms` }}
                      >
                        {keyword}
                      </KeywordChip>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {heroFeatures.map(([label, Icon]) => (
                    <div
                      key={label}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-semibold text-slate-700"
                    >
                      <Icon className="h-4 w-4 text-mint-700" aria-hidden="true" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="-mt-4 pb-12 sm:pb-16">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[1.75rem] bg-ink px-4 py-4 text-white shadow-[0_28px_90px_rgba(23,32,51,0.18)]">
            <div className="flex min-w-max gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
              {[
                "Resume scoring",
                "JD match",
                "Bullet rewrite",
                "Keyword gaps",
                "Project to resume",
                "Cover letter draft",
                "LinkedIn headline",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <CelestialBackground intensity="subtle" />
        <div className="container-shell">
          <SectionHeading
            centered
            eyebrow="How SkillMint works"
            title="A connected workflow from rough notes to applications."
            description="Experience becomes scored output, job-match insight, profile copy, and cleaner application assets."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                className="group relative rounded-2xl border border-white/80 bg-white/85 p-5 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-white hover:shadow-soft"
              >
                {index < workflowSteps.length - 1 ? (
                  <span className="absolute left-[calc(100%-0.4rem)] top-9 hidden h-px w-5 bg-gradient-to-r from-mint-300 to-transparent md:block" />
                ) : null}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white shadow-[0_0_24px_rgba(31,201,153,0.18)]">
                  {index + 1}
                </span>
                <h2 className="mt-4 text-lg font-semibold text-ink">{step.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="card-surface grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">Who this is for</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                Built for real application momentum.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Use SkillMint when you need clearer, more specific resume bullets without creating
                an account or losing privacy.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {audienceSegments.map((segment) => (
                <div
                  key={segment}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 shadow-line"
                >
                  {segment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">
                Example transformation
              </p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                From plain task to application-ready proof.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                SkillMint pushes every output toward clearer action verbs, truthful metrics,
                role-relevant keywords, and wording that still sounds like a real person.
              </p>
            </div>
            <div className="card-surface grid gap-4 p-5 sm:p-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Before</p>
                <p className="mt-2 leading-7 text-slate-700">
                  Made dashboard for sales data.
                </p>
              </div>
              <div className="rounded-lg border border-mint-100 bg-mint-50/70 p-4">
                <p className="text-xs font-semibold uppercase text-mint-700">After</p>
                <p className="mt-2 leading-7 text-slate-700">
                  Built an interactive sales dashboard using SQL and Excel to track weekly pipeline
                  trends and identify underperforming regions faster.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["action verb", "ATS keywords", "clearer scope", "truth-first"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-16 sm:pt-6 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Top features"
              title="More than a resume bullet generator."
              description="SkillMint AI gives every draft a scoring layer, rewrite workflow, keyword guidance, exports, and browser-only history so you can improve faster."
            />
            <TrackedLink
              href="/tools/resume-bullet-generator"
              className="button-secondary self-start text-sm"
              eventName="homepage_cta_click"
              eventPayload={{ cta: "open_live_tool_features" }}
            >
              Open live tool
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
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

      <section className="relative overflow-hidden py-16 sm:py-20">
        <CelestialBackground intensity="section" />
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <SectionReveal>
              <p className="text-sm font-semibold uppercase text-mint-700">Application Kit</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Build the full set of assets recruiters actually inspect.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                SkillMint is becoming a career command center: one place to sharpen resume bullets,
                compare job descriptions, convert projects, and draft follow-up assets without
                creating an account.
              </p>
              <TrackedLink
                href="/tools"
                className="button-primary mt-6"
                eventName="application_kit_cta_clicked"
                eventPayload={{ cta: "application_kit_home" }}
              >
                Explore the kit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </SectionReveal>
            <GlowCard className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-5">
                {applicationKit.map((item, index) => (
                  <div
                    key={item}
                    className="relative rounded-xl border border-slate-200 bg-white/80 p-4 text-center text-sm font-semibold text-slate-700"
                  >
                    {index < applicationKit.length - 1 ? (
                      <span className="absolute left-[calc(100%-0.2rem)] top-1/2 hidden h-px w-4 bg-gradient-to-r from-mint-300/80 to-transparent sm:block" />
                    ) : null}
                    <span className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-mint-100 bg-mint-50 text-xs text-mint-700">
                      {index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </GlowCard>
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
            <TrackedLink
              href="/resources"
              className="button-secondary self-start text-sm"
              eventName="homepage_cta_click"
              eventPayload={{ cta: "view_resources" }}
            >
              View resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSeoLandingPages.map((page) => (
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
              title="Build your application kit."
              description="Start with resume bullets, then check job fit, convert projects, create LinkedIn positioning, and draft cover letters."
            />
            <TrackedLink
              href="/tools"
              className="button-secondary self-start text-sm"
              eventName="homepage_cta_click"
              eventPayload={{ cta: "view_all_tools" }}
            >
              View all tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
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
            description="SkillMint AI keeps the experience lightweight: no accounts, no paywalls, and privacy-first workflows for practical career writing."
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

      <div className="container-shell">
        <AdSlot label="Career growth resource placement" />
      </div>

      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="card-surface grid gap-8 overflow-hidden bg-[linear-gradient(135deg,#ffffff,#effdf8)] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">Start now</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Turn rough work notes into stronger resume bullets.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Try the first SkillMint AI tool today. Generate sharper resume
                bullets through a secure, private AI workflow.
              </p>
            </div>
            <TrackedLink
              href="/tools/resume-bullet-generator"
              className="button-primary"
              eventName="application_kit_cta_clicked"
              eventPayload={{ cta: "bottom_generate_bullets" }}
            >
              Generate bullets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}

