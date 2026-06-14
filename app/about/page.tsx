import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, LockKeyhole, Sparkles, Target } from "lucide-react";
import { GlassPanel } from "@/components/glass-panel";
import { PremiumPageShell } from "@/components/premium-page-shell";

export const metadata: Metadata = {
  title: "About SkillMint AI",
  description:
    "Learn what SkillMint AI is, who it is for, and how it helps students and early-career professionals create stronger career assets.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PremiumPageShell
        eyebrow="About"
        title="A practical AI career workspace for real experience."
        description="SkillMint AI helps students, freshers, interns, and early-career professionals turn honest experience into clearer resume bullets, job-match insights, LinkedIn copy, and application drafts."
        dark
        side={
          <div className="command-panel p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">
              Product promise
            </p>
            <div className="mt-4 grid gap-3">
              {["No signup to start", "Truth-first rewrites", "Browser-only history"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
            <Link href="/tools/resume-bullet-generator" className="button-primary mt-5 bg-white text-ink hover:bg-mint-50">
              Try the workspace
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        }
      />
      <section className="premium-shell relative overflow-hidden py-12 sm:py-16">
        <div className="container-shell">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Built for momentum",
              description:
                "The goal is to help you move from rough notes to usable career assets faster.",
              icon: Sparkles,
            },
            {
              title: "Truth-first outputs",
              description:
                "SkillMint improves wording and structure while reminding users not to overclaim.",
              icon: Target,
            },
            {
              title: "No signup required",
              description:
                "Core tools stay free to try, and saved drafts use browser storage by default.",
              icon: LockKeyhole,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <GlassPanel key={item.title} as="article" className="p-5 sm:p-6">
                <div className="score-orb flex h-11 w-11 items-center justify-center rounded-lg bg-mint-50 text-mint-700 shadow-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </GlassPanel>
            );
          })}
        </div>

        <GlassPanel className="mx-auto mt-10 max-w-4xl overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.7fr_0.3fr]">
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-700">
                Why SkillMint exists
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">
                Early-career experience is often stronger than it sounds at first.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Most early-career applicants have useful experience, but it often lives in messy notes,
                class projects, internship tasks, or part-time work that does not sound strong on a
                resume yet. SkillMint is designed to bridge that gap with focused tools instead of a
                generic blank chat box.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/tools" className="button-primary">
                  Explore tools
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="button-secondary">
                  Contact
                </Link>
              </div>
            </div>
            <div className="bg-[linear-gradient(180deg,#172033,#0d1f1d)] p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">
                Built for
              </p>
              <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-200">
                {["Students", "Freshers", "Interns", "Career switchers"].map((item) => (
                  <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
        </div>
      </section>
    </>
  );
}
