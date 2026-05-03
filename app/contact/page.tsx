import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SkillMint AI for product questions, feedback, and support.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase text-mint-700">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Contact SkillMint AI</h1>
        <div className="mt-8 card-surface p-6 sm:p-8">
          <p className="leading-7 text-slate-600">
            Have feedback, a support question, or an idea for a new career tool?
            Reach out by email and include the page or tool you were using.
          </p>
          <Link
            href="mailto:hello@skillmint.ai"
            className="button-primary mt-6"
          >
            Email hello@skillmint.ai
          </Link>
        </div>
      </div>
    </section>
  );
}
