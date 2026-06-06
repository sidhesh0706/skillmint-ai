import type { ReactNode } from "react";
import { GlassPanel } from "@/components/glass-panel";
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
        dark
        side={
          side || (
            <div className="command-panel p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">Quick scan</p>
              <div className="mt-4 grid gap-2">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-mint-300/40 hover:bg-white/[0.14] hover:text-white"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          )
        }
      />
      <section className="premium-shell py-12 sm:py-16">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <GlassPanel className="p-6 sm:p-8">
            <div className="space-y-8">
              {sections.map((section) => (
                <section
                  key={section.title}
                  id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-4 leading-7 text-slate-600">{section.body}</div>
                </section>
              ))}
            </div>
          </GlassPanel>
          <GlassPanel className="hidden p-5 lg:block">
            <p className="text-sm font-semibold uppercase text-mint-700">On this page</p>
            <div className="mt-4 grid gap-2">
              {sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-mint-50 hover:text-mint-700"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>
    </>
  );
}
