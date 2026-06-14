import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bug, Lightbulb, Mail, MessageSquare, Sparkles, Wrench } from "lucide-react";
import { GlassPanel } from "@/components/glass-panel";
import { PremiumPageShell } from "@/components/premium-page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SkillMint AI for product questions, feedback, and support.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PremiumPageShell
        eyebrow="Contact"
        title="Send feedback, tool ideas, or support notes."
        description="SkillMint is built around practical career workflows. Tell us what felt useful, confusing, or missing."
        dark
        side={
          <div className="command-panel p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">Fastest path</p>
            <p className="mt-3 leading-7 text-slate-300">
              Include the page or tool you were using so feedback is easier to act on.
            </p>
            <div className="mt-4 grid gap-2">
              {["Bug report", "Tool idea", "Content feedback"].map((item) => (
                <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-slate-200">
                  {item}
                </span>
              ))}
            </div>
            <Link href="mailto:hello@skillmint.ai" className="button-primary mt-5 bg-white text-ink hover:bg-mint-50">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email hello@skillmint.ai
            </Link>
          </div>
        }
      />
      <section className="premium-shell py-12 sm:py-16">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Product feedback",
              description: "Tell us what should feel faster, clearer, or more useful.",
              icon: MessageSquare,
            },
            {
              title: "New tool request",
              description: "Suggest the next workflow students and freshers need most.",
              icon: Lightbulb,
            },
            {
              title: "Support question",
              description: "Report confusing behavior, copy/export issues, or page problems.",
              icon: Bug,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <GlassPanel key={item.title} className="p-5">
                <div className="score-orb flex h-11 w-11 items-center justify-center rounded-xl bg-mint-50 text-mint-700 shadow-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
              </GlassPanel>
            );
          })}
        </div>
        <div className="container-shell mt-8">
          <GlassPanel className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      Keep building
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-ink">
                      Try the live resume workspace while you are here.
                    </h2>
                  </div>
                  <Link href="/tools/resume-bullet-generator" className="button-primary">
                    Open generator
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="bg-[linear-gradient(180deg,#172033,#0d1f1d)] p-6 text-white sm:p-8">
                <Wrench className="h-5 w-5 text-mint-100" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">
                  Helpful context
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Share the page URL, what you expected, and what actually happened.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>
    </>
  );
}
