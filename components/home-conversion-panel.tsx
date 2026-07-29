"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const suppressionKey = "skillmint_email_prompt_done:home_conversion";

export function HomeConversionPanel() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuppressed, setIsSuppressed] = useState(false);

  useEffect(() => {
    const suppressed = localStorage.getItem(suppressionKey) === "true";
    setIsSuppressed(suppressed);

    if (!suppressed) {
      trackEvent("email_capture_viewed", { location: "home_conversion" });
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setMessage("Enter a valid email to join the list.");
      return;
    }

    let existing: string[] = [];

    try {
      const stored = JSON.parse(
        localStorage.getItem("skillmint_emails") || "[]",
      ) as unknown;
      existing = Array.isArray(stored)
        ? stored.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      existing = [];
    }

    localStorage.setItem(
      "skillmint_emails",
      JSON.stringify(Array.from(new Set([...existing, cleanEmail]))),
    );
    localStorage.setItem(suppressionKey, "true");
    trackEvent("email_signup_click", { location: "home_conversion" });
    trackEvent("email_signup_submitted", { location: "home_conversion" });
    setEmail("");
    setMessage(
      "You're on the list. The checklist will be part of a future update.",
    );
    window.setTimeout(() => setIsSuppressed(true), 1800);
  }

  return (
    <div className="home-conversion-panel">
      <div className="home-conversion-copy">
        <span className="home-conversion-icon">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
          Start with one honest note
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Build your first application kit.
        </h2>
        <p className="mt-4 max-w-xl leading-7 text-slate-600">
          Generate the resume proof first, then reuse the strongest language
          across the rest of your application.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/tools/resume-bullet-generator"
            className="button-primary group"
            onClick={() =>
              trackEvent("application_kit_cta_clicked", {
                location: "home_conversion",
              })
            }
          >
            Generate resume bullets
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link href="/tools" className="button-secondary">
            Explore tools
          </Link>
          <Link href="/resources" className="home-text-link">
            Browse examples
          </Link>
        </div>
      </div>

      <div className="home-email-panel">
        <span className="home-email-icon">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
          Optional next step
        </p>
        <h3 className="mt-2 text-xl font-semibold text-slate-950">
          Get the ATS action verbs checklist.
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Join the free SkillMint list for practical resume and internship tips.
        </p>

        {isSuppressed ? (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            You are already on the list.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="home-email-input"
              />
              <button type="submit" className="button-secondary shrink-0">
                Join free
              </button>
            </div>
            {message ? (
              <p className="mt-2 text-sm font-semibold text-emerald-700">
                {message}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
