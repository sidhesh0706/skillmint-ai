"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type EmailCaptureProps = {
  compact?: boolean;
  location?: string;
};

export function EmailCapture({ compact = false, location = "home_email_capture" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setMessage("Enter a valid email to join the list.");
      return;
    }

    let existing: string[] = [];

    try {
      const storedEmails = JSON.parse(localStorage.getItem("skillmint_emails") || "[]") as unknown;
      existing = Array.isArray(storedEmails)
        ? storedEmails.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      existing = [];
    }
    const nextEmails = Array.from(new Set([...existing, cleanEmail]));
    localStorage.setItem("skillmint_emails", JSON.stringify(nextEmails));
    trackEvent("email_signup_click", { location });
    trackEvent("email_signup_submitted", { location });
    setEmail("");
    setMessage("You're on the list. New tools and resume tips will land here first.");
  }

  if (compact) {
    return (
      <div className="rounded-lg border border-mint-100 bg-[linear-gradient(135deg,#ffffff,#effdf8)] p-4 shadow-line">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-ink">
              Want more resume tools and templates?
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Join the free SkillMint list for resume tips and new tools.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="min-w-0 flex-1 sm:max-w-md">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-h-11 flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-mint-600 focus:ring-4 focus:ring-mint-100"
              />
              <button type="submit" className="button-primary min-h-11 px-4 py-2 text-sm">
                Join free
              </button>
            </div>
            {message ? <p className="mt-2 text-sm font-semibold text-mint-700">{message}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 sm:py-16">
      <div className="container-shell">
        <div className="card-surface grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-mint-50 text-mint-700 shadow-line">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-ink">
              Get smarter resume tips + new AI tools
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Join the early list for practical resume guidance, product updates,
              and new SkillMint AI tools as they launch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-h-12 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-mint-600 focus:ring-4 focus:ring-mint-100"
              />
              <button type="submit" className="button-primary">
                Sign up
              </button>
            </div>
            {message ? <p className="text-sm font-semibold text-mint-700">{message}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
