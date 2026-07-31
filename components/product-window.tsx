"use client";

import { useRef, useState } from "react";
import { clsx } from "clsx";
import {
  ArrowRight,
  Check,
  Clipboard,
  Download,
  PanelsTopLeft,
  RefreshCw,
} from "lucide-react";
import { ScoreMeter } from "@/components/score-meter";
import styles from "./product-window.module.css";

type ProductWindowProps = {
  className?: string;
};

const previews = [
  {
    tab: "Resume",
    label: "Resume intelligence",
    title: "Recruiter-ready bullets",
    description: "Scored for clarity, impact, keywords, and truthful proof.",
    score: 92,
    results: [
      {
        label: "Best bullet",
        text: "Built an interactive sales dashboard using SQL and Excel to track weekly pipeline trends.",
      },
      {
        label: "Improvement",
        text: "Add a truthful usage or time-saving metric when available.",
      },
    ],
    keywords: ["SQL", "Excel", "pipeline reporting"],
    actions: ["Copy", "Rewrite", "Export"],
  },
  {
    tab: "JD Match",
    label: "Role alignment",
    title: "Job description match",
    description: "Matched evidence, keyword gaps, and overclaiming checks.",
    score: 78,
    results: [
      {
        label: "Matched skills",
        text: "SQL, dashboards, stakeholder communication, reporting",
      },
      {
        label: "Truthful gap",
        text: "Forecasting appears in the posting but not in your current proof.",
      },
    ],
    keywords: ["4 matched", "2 gaps", "low claim risk"],
    actions: ["Compare", "Tailor", "Export"],
  },
  {
    tab: "LinkedIn",
    label: "Profile positioning",
    title: "Headline options",
    description: "Clear positioning that carries your strongest keywords.",
    score: 89,
    results: [
      {
        label: "Recommended",
        text: "Data Analyst | SQL, Excel and dashboard reporting",
      },
      {
        label: "Alternative",
        text: "Early-career Data Analyst turning data into clear decisions",
      },
    ],
    keywords: ["Data Analyst", "SQL", "dashboards"],
    actions: ["Copy", "Compare", "Refine"],
  },
  {
    tab: "Cover Letter",
    label: "Application draft",
    title: "Proof-led opening",
    description: "Role context connected to your most relevant evidence.",
    score: 86,
    results: [
      {
        label: "Opening",
        text: "I am applying for the Product Analyst role with hands-on experience turning product data into clear recommendations.",
      },
      {
        label: "Proof to include",
        text: "Interactive sales dashboard built with SQL and Excel.",
      },
    ],
    keywords: ["role fit", "company context", "proof strength"],
    actions: ["Copy", "Edit", "Export"],
  },
];

export function ProductWindow({ className }: ProductWindowProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activePreview = previews[activeTab];

  function selectTab(index: number) {
    const nextIndex = (index + previews.length) % previews.length;
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className={clsx(styles.window, className)}>
      <div className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>
            <PanelsTopLeft className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className={styles.brandText}>
            <strong>SkillMint workspace</strong>
            <span>Career proof intelligence</span>
          </span>
        </div>
        <span className={styles.status}>Live preview</span>
      </div>

      <div className={styles.tabbar}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Application workspace previews"
        >
          {previews.map((preview, index) => (
            <button
              type="button"
              role="tab"
              key={preview.tab}
              id={`product-preview-tab-${index}`}
              aria-controls={`product-preview-panel-${index}`}
              aria-selected={activeTab === index}
              tabIndex={activeTab === index ? 0 : -1}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectTab(activeTab + 1);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectTab(activeTab - 1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  selectTab(0);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  selectTab(previews.length - 1);
                }
              }}
              className={clsx(
                styles.tab,
                activeTab === index && styles.tabActive,
              )}
            >
              {preview.tab}
            </button>
          ))}
        </div>
      </div>

      <div
        key={activePreview.tab}
        id={`product-preview-panel-${activeTab}`}
        aria-labelledby={`product-preview-tab-${activeTab}`}
        className={styles.panel}
        role="tabpanel"
      >
        <div className={styles.summary}>
          <div className={styles.summaryCopy}>
            <p className={styles.label}>
              {activePreview.label}
            </p>
            <h2 className={styles.title}>{activePreview.title}</h2>
            <p className={styles.description}>
              {activePreview.description}
            </p>
          </div>
          <div className={styles.scoreCard}>
            <div className={styles.scoreHeading}>
              <span>Overall score</span>
              <strong>{activePreview.score}/100</strong>
            </div>
            <ScoreMeter
              value={activePreview.score}
              compact
              className="w-full"
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.results}>
            {activePreview.results.map((result, index) => (
              <article
                key={result.label}
                className={styles.result}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className={styles.resultHeader}>
                  <span className={styles.resultLabel}>
                    {result.label}
                  </span>
                  <span className={styles.resultCheck}>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p>{result.text}</p>
              </article>
            ))}
          </div>

          <aside className={styles.intelligence}>
            <p className={styles.intelligenceTitle}>Intelligence signals</p>
            <div className={styles.chips}>
              {activePreview.keywords.map((keyword, index) => (
                <span
                  key={keyword}
                  className={styles.chip}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className={styles.checks}>
              <span className={styles.check}>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Truthfulness check
              </span>
              <span className={styles.check}>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Export-ready copy
              </span>
            </div>
          </aside>
        </div>

        <div className={styles.actions}>
          {activePreview.actions.map((action, index) => {
            const Icon =
              index === 0 ? Clipboard : index === 1 ? RefreshCw : Download;

            return (
              <button
                type="button"
                key={action}
                className={styles.action}
                aria-label={`${action} ${activePreview.tab} preview`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {action}
                <ArrowRight
                  className="hidden h-3.5 w-3.5 sm:block"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
