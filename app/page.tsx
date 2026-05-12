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
      <section className="cosmic-shell">
        <CelestialBackground intensity="hero" />
        <div className="container-shell grid gap-10 py-12 sm:py-16 lg:min-h-[720px] lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:py-20">
          <SectionReveal className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-mint-100 shadow-celestial backdrop-blur">
              <CheckCircle2 className="h-4 w-4 text-mint-300" aria-hidden="true" />
              AI career cockpit for early talent
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-white sm:text-5xl lg:text-7xl">
              Turn real experience into recruiter-ready career assets.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              SkillMint AI helps students, freshers, interns, and early-career professionals turn
              rough project, internship, and work notes into scored resume bullets, JD-match
              insights, LinkedIn copy, and application drafts.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Free to use", "No signup required", "ATS-friendly outputs"].map((pill, index) => (
                <span
                  key={pill}
                  className="floating-card inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-2 text-sm font-semibold text-slate-100 backdrop-blur"
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-300 shadow-[0_0_12px_rgba(31,201,153,0.85)]" />
                  {pill}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                className="button-secondary border-white/20 bg-white/[0.08] text-white hover:bg-white/20"
                eventName="homepage_cta_click"
                eventPayload={{ cta: "browse_examples" }}
              >
                Browse examples
              </TrackedLink>
            </div>
            <div className="mt-7 grid max-w-lg grid-cols-3 gap-2.5 sm:gap-3">
              {[
                ["5", "AI bullets"],
                ["100", "point score"],
                ["0", "signup steps"],
              ].map(([value, label]) => (
                <GlowCard key={label} className="p-3">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">{label}</p>
                </GlowCard>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay="sm" className="relative">
            <div className="absolute -right-10 top-6 hidden h-64 w-64 rounded-full border border-mint-200/10 lg:block" />
            <GlowCard className="scan-line p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">AI Resume Intelligence</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Scoring, rewrites, keywords, exports
                  </p>
                </div>
                <AnimatedScoreBadge score="Live" label="tool" />
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["92", "Built an interactive sales dashboard using SQL and Excel to track weekly pipeline trends and identify underperforming regions faster."],
                  ["87", "Coordinated weekly product, operations, and customer success updates to remove blockers before launch."],
                  ["81", "Analyzed customer feedback trends to prioritize process improvements and improve support response quality."],
                ].map(([score, bullet], index) => (
                  <FloatingPreviewCard key={bullet} delay={index === 1 ? "sm" : index === 2 ? "md" : "none"}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-mint-300 to-cyan-300" style={{ width: `${score}%` }} />
                      </div>
                      <AnimatedScoreBadge score={`${score}/100`} label="" />
                    </div>
                    <p className="text-sm leading-6 text-slate-200">- {bullet}</p>
                  </FloatingPreviewCard>
                ))}
                <FloatingPreviewCard className="border-amber-200/20 bg-amber-200/[0.06]" delay="md">
                  <p className="flex items-center gap-2 text-sm font-semibold text-amber-100">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    AI insight panel
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["stakeholder management", "process improvement", "customer insights"].map((keyword, index) => (
                      <KeywordChip
                        key={keyword}
                        dark
                        className="border-amber-100/20 text-amber-50"
                        style={{ animationDelay: `${index * 120}ms` }}
                      >
                        {keyword}
                      </KeywordChip>
                    ))}
                  </div>
                </FloatingPreviewCard>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroFeatures.map(([label, Icon]) => (
                  <div
                    key={label}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-center text-sm font-semibold text-slate-200"
                  >
                    <Icon className="h-4 w-4 text-mint-300" aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </div>
            </GlowCard>
          </SectionReveal>
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
              <p className="text-sm font-semibold uppercase text-mint-200">Application Kit</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Build the full set of assets recruiters actually inspect.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
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
                    className="relative rounded-xl border border-white/10 bg-white/[0.07] p-4 text-center text-sm font-semibold text-slate-100"
                  >
                    {index < applicationKit.length - 1 ? (
                      <span className="absolute left-[calc(100%-0.2rem)] top-1/2 hidden h-px w-4 bg-gradient-to-r from-mint-300/80 to-transparent sm:block" />
                    ) : null}
                    <span className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-mint-300/25 bg-mint-300/10 text-xs text-mint-100">
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
          <div className="card-surface grid gap-8 overflow-hidden bg-ink p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-100">Start now</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Turn rough work notes into stronger resume bullets.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Try the first SkillMint AI tool today. Generate sharper resume
                bullets through a secure, private AI workflow.
              </p>
            </div>
            <TrackedLink
              href="/tools/resume-bullet-generator"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-mint-50"
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

