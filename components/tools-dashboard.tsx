"use client";

import { clsx } from "clsx";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Flag,
  Linkedin,
  ListChecks,
  Quote,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { getToolHref, tools, type ToolConfig } from "@/data/tool-config";

const workflowOrder = [
  "resume-bullet-generator",
  "resume-roast",
  "job-description-match",
  "project-to-resume",
  "linkedin-headline-generator",
  "cover-letter-generator",
];

const liveTools = workflowOrder
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is ToolConfig => Boolean(tool));

const comingSoonTools = tools.filter((tool) => tool.status === "coming-soon");

const workflowPurpose: Record<string, string> = {
  "resume-bullet-generator": "Turn one honest work note into strong proof.",
  "resume-roast": "Find weak phrasing before a recruiter does.",
  "job-description-match": "Compare your proof with the target role.",
  "project-to-resume": "Convert projects into application-ready evidence.",
  "linkedin-headline-generator": "Carry your positioning into your profile.",
  "cover-letter-generator": "Connect your strongest proof to the company.",
};

const nextSteps: Record<string, { label: string; href: string }> = {
  "resume-bullet-generator": {
    label: "Next: test the bullets with Resume Roast",
    href: "/tools/resume-roast",
  },
  "resume-roast": {
    label: "Next: compare them with a job description",
    href: "/tools/job-description-match",
  },
  "job-description-match": {
    label: "Next: add stronger project evidence",
    href: "/tools/project-to-resume",
  },
  "project-to-resume": {
    label: "Next: sharpen your LinkedIn headline",
    href: "/tools/linkedin-headline-generator",
  },
  "linkedin-headline-generator": {
    label: "Next: draft a focused cover letter",
    href: "/tools/cover-letter-generator",
  },
  "cover-letter-generator": {
    label: "Final check: return to your resume bullets",
    href: "/tools/resume-bullet-generator",
  },
};

function ToolPreview({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  if (slug === "resume-bullet-generator") {
    return (
      <div className="tools-preview tools-preview-bullet">
        <div className="tools-preview-meta">
          <span>Recruiter-ready bullet</span>
          <strong>92/100</strong>
        </div>
        <div className="tools-score-track">
          <span className="tools-score-fill w-[92%]" />
        </div>
        <p>
          Built an interactive sales dashboard to surface weekly pipeline trends
          and regional gaps.
        </p>
        {!compact ? (
          <div className="tools-chip-row">
            <span>SQL</span>
            <span>analysis</span>
            <span>impact</span>
          </div>
        ) : null}
      </div>
    );
  }

  if (slug === "resume-roast") {
    return (
      <div className="tools-preview tools-preview-roast">
        <div className="tools-roast-line">
          <Flag className="h-4 w-4" aria-hidden="true" />
          <span>Weak phrase detected</span>
        </div>
        <p className="tools-strike">Responsible for customer reports</p>
        <div className="tools-critique">
          <Check className="h-4 w-4" aria-hidden="true" />
          Replace passive wording with the action and outcome.
        </div>
      </div>
    );
  }

  if (slug === "job-description-match") {
    return (
      <div className="tools-preview tools-preview-match">
        <div className="tools-match-score">
          <strong>78%</strong>
          <span>role match</span>
        </div>
        <div>
          <p className="tools-mini-label">Matched</p>
          <div className="tools-chip-row">
            <span>SQL</span>
            <span>dashboards</span>
          </div>
          <p className="tools-mini-label mt-3">Missing if truthful</p>
          <div className="tools-chip-row tools-chip-row-warn">
            <span>dbt</span>
            <span>forecasting</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "project-to-resume") {
    return (
      <div className="tools-preview tools-preview-project">
        <div className="tools-project-note">
          <span>Project note</span>
          <p>Made a dashboard for campus events.</p>
        </div>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        <div className="tools-project-result">
          <span>Resume proof</span>
          <p>Built a React dashboard to track attendance across 12 events.</p>
        </div>
      </div>
    );
  }

  if (slug === "linkedin-headline-generator") {
    return (
      <div className="tools-preview tools-preview-linkedin">
        <Linkedin className="h-5 w-5" aria-hidden="true" />
        <div>
          <span>Headline option 01</span>
          <p>
            Data Analyst | SQL, Excel &amp; dashboard reporting | Turning data
            into clear decisions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tools-preview tools-preview-letter">
      <div className="tools-letter-header">
        <FileText className="h-4 w-4" aria-hidden="true" />
        <span>Draft opening</span>
      </div>
      <Quote className="h-5 w-5 text-slate-300" aria-hidden="true" />
      <p>
        I&apos;m excited to bring hands-on analytics experience and a track
        record of turning findings into practical decisions.
      </p>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: ToolConfig; index: number }) {
  const Icon = tool.icon;
  const nextStep = nextSteps[tool.slug];

  return (
    <article
      className="tools-live-card section-reveal group"
      style={{ animationDelay: `${Math.min(index * 70, 350)}ms` }}
    >
      <div className="tools-live-card-top">
        <span className="tools-tool-icon">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="tools-status-badge">
          <span />
          Live
        </span>
      </div>
      <p className="tools-card-category">{tool.category}</p>
      <h3>{tool.name}</h3>
      <p className="tools-card-outcome">{workflowPurpose[tool.slug]}</p>

      <ToolPreview slug={tool.slug} />

      <div className="tools-card-actions">
        <Link
          className="tools-primary-link group/action"
          href={getToolHref(tool)}
        >
          Open tool
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover/action:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        <Link className="tools-next-link group/next" href={nextStep.href}>
          {nextStep.label}
          <ChevronRight
            className="h-4 w-4 shrink-0 transition-transform group-hover/next:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export function ToolsDashboard() {
  const [activeStep, setActiveStep] = useState(0);
  const selectedTool = liveTools[activeStep];
  const SelectedIcon = selectedTool.icon;
  const selectedNextStep = nextSteps[selectedTool.slug];

  return (
    <main className="tools-dashboard">
      <section className="tools-dashboard-hero">
        <div className="container-command">
          <div className="tools-dashboard-hero-grid">
            <div className="section-reveal">
              <p className="tools-eyebrow">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                AI career toolkit
              </p>
              <h1>Build your application kit.</h1>
              <p className="tools-hero-copy">
                Start with real experience, strengthen the proof, match it to a
                role, and carry the same positioning into LinkedIn and your
                cover letter.
              </p>
              <div className="tools-hero-actions">
                <Link
                  className="tools-primary-link group/hero"
                  href="/tools/resume-bullet-generator"
                >
                  Start with resume bullets
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover/hero:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <span>
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />6 live
                  tools, no signup
                </span>
              </div>
            </div>

            <aside className="tools-start-panel section-reveal section-reveal-delay-sm">
              <div className="tools-start-panel-icon">
                <WandSparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="tools-mini-label">
                  If you only use one tool first
                </p>
                <h2>Start with the Resume Bullet Generator.</h2>
                <p>
                  It turns your raw experience into reusable proof for every
                  step that follows.
                </p>
                <div className="tools-start-sequence">
                  <span>Write proof</span>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Roast it</span>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Match the role</span>
                </div>
                <Link
                  className="tools-inline-link group/start"
                  href="/tools/resume-bullet-generator"
                >
                  Create your first bullets
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover/start:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="tools-dashboard-content">
        <div className="container-command">
          <div className="tools-section-heading section-reveal">
            <div>
              <p className="tools-section-kicker">Recommended path</p>
              <h2>Move from rough notes to a complete application.</h2>
            </div>
            <p>
              Select a step to see what it produces. Your experience carries
              forward, so each tool makes the next one more useful.
            </p>
          </div>

          <div className="tools-path-module section-reveal">
            <div
              className="tools-path-list"
              role="tablist"
              aria-label="Recommended tool path"
            >
              {liveTools.map((tool, index) => {
                const isActive = activeStep === index;

                return (
                  <button
                    key={tool.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="selected-tool-panel"
                    className={clsx("tools-path-step", isActive && "is-active")}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="tools-path-number">
                      {isActive ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="tools-path-step-copy">
                      <strong>{tool.name}</strong>
                      <small>{workflowPurpose[tool.slug]}</small>
                    </span>
                    <span className="tools-path-live">Live</span>
                    {index < liveTools.length - 1 ? (
                      <span
                        className="tools-path-connector"
                        aria-hidden="true"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div
              id="selected-tool-panel"
              role="tabpanel"
              className="tools-path-detail"
              key={selectedTool.slug}
            >
              <div className="tools-path-detail-head">
                <span className="tools-tool-icon">
                  <SelectedIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p>
                    Step {activeStep + 1} of {liveTools.length}
                  </p>
                  <h3>{selectedTool.name}</h3>
                </div>
                <span className="tools-status-badge">
                  <span />
                  Live
                </span>
              </div>
              <p className="tools-path-description">
                {selectedTool.shortDescription}
              </p>
              <ToolPreview slug={selectedTool.slug} compact />
              <div className="tools-path-detail-actions">
                <Link
                  className="tools-primary-link group/detail"
                  href={getToolHref(selectedTool)}
                >
                  Open this tool
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover/detail:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  className="tools-next-link group/detail-next"
                  href={selectedNextStep.href}
                >
                  {selectedNextStep.label}
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover/detail-next:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>

          <section className="tools-live-section">
            <div className="tools-section-heading section-reveal">
              <div>
                <p className="tools-section-kicker">Live workspace</p>
                <h2>Choose the output you need next.</h2>
              </div>
              <p>
                Each tool solves a different part of the application. Start
                anywhere, then follow the related next step.
              </p>
            </div>

            <div className="tools-live-grid">
              {liveTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} index={index} />
              ))}
            </div>
          </section>

          {comingSoonTools.length ? (
            <section className="tools-roadmap section-reveal">
              <div className="tools-roadmap-heading">
                <div>
                  <p className="tools-section-kicker">Coming next</p>
                  <h2>Smaller additions to complete the workflow.</h2>
                </div>
                <p>
                  Preview what is planned without losing focus on the live
                  toolkit.
                </p>
              </div>
              <div className="tools-roadmap-list">
                {comingSoonTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <article key={tool.slug} className="tools-roadmap-card">
                      <span className="tools-roadmap-icon">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p>{tool.category}</p>
                        <h3>{tool.name}</h3>
                        <span>{tool.shortDescription}</span>
                      </div>
                      <Link
                        className="tools-inline-link group/roadmap"
                        href={getToolHref(tool)}
                      >
                        Preview
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover/roadmap:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="tools-finish-panel section-reveal">
            <div className="tools-finish-icon">
              <ListChecks className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="tools-mini-label">Your strongest starting point</p>
              <h2>One honest work note can power the whole kit.</h2>
              <p>
                Generate the proof first. Then review, target, and reuse it
                without inventing experience.
              </p>
            </div>
            <Link
              className="tools-primary-link group/finish"
              href="/tools/resume-bullet-generator"
            >
              Start the workflow
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/finish:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
