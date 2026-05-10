import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, LockKeyhole, Sparkles, Target } from "lucide-react";

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
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[28rem]" />
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-mint-700">About</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            A practical AI career workspace for real experience.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            SkillMint AI helps students, freshers, interns, and early-career professionals turn
            honest experience into clearer resume bullets, job-match insights, LinkedIn copy, and
            application drafts.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
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
              <article key={item.title} className="card-surface p-5 sm:p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint-50 text-mint-700 shadow-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-slate-200 bg-white/85 p-6 shadow-line sm:p-8">
          <h2 className="text-2xl font-semibold text-ink">Why SkillMint exists</h2>
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
      </div>
    </section>
  );
}
