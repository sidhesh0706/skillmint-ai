import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { PremiumPageShell } from "@/components/premium-page-shell";

type StaticPageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: ReactNode;
  }>;
  side?: ReactNode;
};

export function StaticPageFrame({
  eyebrow,
  title,
  description,
  sections,
  side,
}: StaticPageFrameProps) {
  return (
    <>
      <PremiumPageShell
        eyebrow={eyebrow}
        title={title}
        description={description}
        side={
          side || (
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Trust briefing
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shadow-line">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Quick links for scanning the policy without leaving the page.
              </p>
              <div className="mt-4 grid gap-2">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          )
        }
      />
      <section className="premium-shell relative overflow-hidden py-12 sm:py-16">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
            <div className="mb-7 rounded-[1.5rem] border border-mint-100 bg-[linear-gradient(135deg,rgba(236,253,245,0.92),rgba(255,255,255,0.74))] p-4 shadow-line">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-mint-700">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Plain-English summary
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                SkillMint is built as a free, no-login career workspace. Review generated content,
                keep claims truthful, and avoid entering sensitive personal data that is not needed
                for your application material.
              </p>
            </div>
            <div className="space-y-8">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="scroll-mt-28 rounded-[1.35rem] border border-slate-200/80 bg-white/76 p-4 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:shadow-soft sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-3 space-y-4 leading-7 text-slate-600">{section.body}</div>
                </section>
              ))}
            </div>
          </div>
          <div className="hidden rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-line lg:sticky lg:top-24 lg:block">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
              <FileText className="h-4 w-4" aria-hidden="true" />
              On this page
            </p>
            <div className="mt-4 grid gap-2">
              {sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700"
                >
                  {section.title}
                </a>
              ))}
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-ink">Need help?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Send feedback or questions about SkillMint’s policies.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-mint-700"
              >
                Contact SkillMint
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
