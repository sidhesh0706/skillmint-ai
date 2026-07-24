import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  Lightbulb,
  Mail,
  MessageSquare,
  Sparkles,
  Wrench,
} from "lucide-react";
import { PremiumPageShell } from "@/components/premium-page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SkillMint AI for product questions, feedback, and support.",
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
        side={
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
              Fastest path
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              Include the page or tool you were using so feedback is easier to
              act on.
            </p>
            <div className="mt-4 grid gap-2">
              {["Bug report", "Tool idea", "Content feedback"].map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="mailto:hello@skillmint.ai"
              className="button-primary mt-5"
            >
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
              description:
                "Tell us what should feel faster, clearer, or more useful.",
              icon: MessageSquare,
            },
            {
              title: "New tool request",
              description:
                "Suggest the next workflow students and freshers need most.",
              icon: Lightbulb,
            },
            {
              title: "Support question",
              description:
                "Report confusing behavior, copy/export issues, or page problems.",
              icon: Bug,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-line"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shadow-line">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
        <div className="container-shell mt-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
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
                  <Link
                    href="/tools/resume-bullet-generator"
                    className="button-primary"
                  >
                    Open generator
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="border-t border-slate-200 bg-[#FAFAF8] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <Wrench
                  className="h-5 w-5 text-emerald-700"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Helpful context
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Share the page URL, what you expected, and what actually
                  happened.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
