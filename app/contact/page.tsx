import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Sparkles } from "lucide-react";
import { CelestialPageShell } from "@/components/celestial-page-shell";
import { GlassPanel } from "@/components/glass-panel";

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
      <CelestialPageShell
        eyebrow="Contact"
        title="Send feedback, tool ideas, or support notes."
        description="SkillMint is built around practical career workflows. Tell us what felt useful, confusing, or missing."
        side={
          <GlassPanel className="p-5">
            <p className="text-sm font-semibold uppercase text-mint-700">Fastest path</p>
            <p className="mt-3 leading-7 text-slate-600">
              Include the page or tool you were using so feedback is easier to act on.
            </p>
            <Link href="mailto:hello@skillmint.ai" className="button-primary mt-5">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email hello@skillmint.ai
            </Link>
          </GlassPanel>
        }
      />
      <section className="py-12 sm:py-16">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {[
            ["Product feedback", "Tell us what should feel faster, clearer, or more useful."],
            ["New tool request", "Suggest the next workflow students and freshers need most."],
            ["Support question", "Report confusing behavior, copy/export issues, or page problems."],
          ].map(([title, description]) => (
            <GlassPanel key={title} className="p-5">
              <MessageSquare className="h-5 w-5 text-mint-700" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </GlassPanel>
          ))}
        </div>
        <div className="container-shell mt-8">
          <GlassPanel className="p-6 sm:p-8">
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
              </Link>
            </div>
          </GlassPanel>
        </div>
      </section>
    </>
  );
}
