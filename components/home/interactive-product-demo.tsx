"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  FileText,
  Linkedin,
  Mail,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import styles from "./hero-section.module.css";

type Preview = {
  id: string;
  tab: string;
  icon: ElementType;
  eyebrow: string;
  title: string;
  description: string;
  meterLabel: string;
  meterText: string;
  meterValue: number;
  meterAriaText: string;
  outputLabel: string;
  output: string;
  insightTitle: string;
  insightMetric: string;
  insightCopy: string;
  chips: string[];
  utilitySignals: string[];
  action: string;
  href: string;
};

const previews: Preview[] = [
  {
    id: "resume",
    tab: "Resume",
    icon: FileText,
    eyebrow: "Resume intelligence",
    title: "Recruiter-ready bullets",
    description: "Clear proof, stronger verbs, and ATS-ready structure.",
    meterLabel: "Bullet strength",
    meterText: "92/100",
    meterValue: 92,
    meterAriaText: "Bullet strength 92 out of 100",
    outputLabel: "Best bullet",
    output:
      "Built an interactive sales dashboard using SQL and Excel to track weekly pipeline trends and identify underperforming regions faster.",
    insightTitle: "Improvement insight",
    insightMetric: "+24 points",
    insightCopy: "Action, tools, scope, and impact are now easy to scan.",
    chips: ["SQL", "Excel", "pipeline reporting"],
    utilitySignals: ["Truth check passed", "Export ready"],
    action: "Open resume tool",
    href: "/tools/resume-bullet-generator",
  },
  {
    id: "jd-match",
    tab: "JD Match",
    icon: Search,
    eyebrow: "Role alignment",
    title: "Job description match",
    description: "See what matches, what is missing, and what stays truthful.",
    meterLabel: "Role match",
    meterText: "78% match",
    meterValue: 78,
    meterAriaText: "Job description match 78 percent",
    outputLabel: "Matched evidence",
    output:
      "Matched SQL dashboards, reporting, and stakeholder updates to the role without adding unsupported claims.",
    insightTitle: "Truthful keyword gap",
    insightMetric: "2 gaps",
    insightCopy: "Forecasting and cohort analysis are not supported by your notes yet.",
    chips: ["matched", "missing", "truthful gaps"],
    utilitySignals: ["Low claim risk", "Tailoring ready"],
    action: "Open JD match",
    href: "/tools/job-description-match",
  },
  {
    id: "linkedin",
    tab: "LinkedIn",
    icon: Linkedin,
    eyebrow: "Profile positioning",
    title: "LinkedIn positioning",
    description: "Carry the same proof into a clearer professional headline.",
    meterLabel: "Options ready",
    meterText: "3 headlines",
    meterValue: 100,
    meterAriaText: "Three LinkedIn headline options ready",
    outputLabel: "Recommended headline",
    output: "Data Analyst | SQL, Excel & Dashboard Reporting",
    insightTitle: "Positioning insight",
    insightMetric: "Clear fit",
    insightCopy: "Role, tools, and practical value are visible in one scan.",
    chips: ["recruiter clarity", "keywords", "tone"],
    utilitySignals: ["Profile ready", "Concise format"],
    action: "Open LinkedIn tool",
    href: "/tools/linkedin-headline-generator",
  },
  {
    id: "cover-letter",
    tab: "Cover Letter",
    icon: Mail,
    eyebrow: "Application narrative",
    title: "Cover letter draft",
    description: "Connect your strongest proof to the role in a concise opening.",
    meterLabel: "Draft status",
    meterText: "Ready draft",
    meterValue: 100,
    meterAriaText: "Cover letter draft ready",
    outputLabel: "Opening paragraph",
    output:
      "I’m excited to bring hands-on analytics experience and a practical record of turning sales data into clear reporting for your team.",
    insightTitle: "Proof connection",
    insightMetric: "Role aligned",
    insightCopy: "The opening links relevant experience to the company without overclaiming.",
    chips: ["role fit", "proof", "concise tone"],
    utilitySignals: ["Editable copy", "Truth-first draft"],
    action: "Open cover letter tool",
    href: "/tools/cover-letter-generator",
  },
];

export function InteractiveProductDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replaceAll(":", "");
  const activePreview = previews[activeIndex];
  const ActiveIcon = activePreview.icon;

  useEffect(() => {
    if (
      !isPlaying ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % previews.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  function activateTab(index: number) {
    const nextIndex = (index + previews.length) % previews.length;
    setActiveIndex(nextIndex);
    setIsPlaying(false);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className={styles.productWindow}>
      <div className={styles.productTopbar}>
        <div className={styles.windowControls} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.productIdentity}>
          <span className={styles.productMark}>
            <Sparkles aria-hidden="true" />
          </span>
          <span>
            <strong>SkillMint</strong>
            <small>Application kit</small>
          </span>
        </div>
        <span className={styles.liveStatus}>
          <span aria-hidden="true" />
          Live workspace
        </span>
        <button
          type="button"
          className={styles.playbackControl}
          aria-label={isPlaying ? "Pause preview rotation" : "Play preview rotation"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((current) => !current)}
        >
          {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      </div>

      <div
        className={styles.demoTabs}
        role="tablist"
        aria-label="Career asset previews"
      >
        {previews.map((preview, index) => {
          const Icon = preview.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={preview.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${instanceId}-${preview.id}-tab`}
              aria-controls={`${instanceId}-${preview.id}-panel`}
              aria-selected={isActive}
              className={`${styles.demoTab} ${isActive ? styles.demoTabActive : ""}`}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setIsPlaying(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  activateTab(activeIndex + 1);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  activateTab(activeIndex - 1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  activateTab(0);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  activateTab(previews.length - 1);
                }
              }}
            >
              <Icon aria-hidden="true" />
              <span>{preview.tab}</span>
              {isActive && isPlaying ? (
                <span className={styles.tabProgress} aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        key={activePreview.id}
        id={`${instanceId}-${activePreview.id}-panel`}
        aria-labelledby={`${instanceId}-${activePreview.id}-tab`}
        className={styles.demoPanel}
        role="tabpanel"
      >
        <div className={styles.demoSummary}>
          <div className={styles.demoHeading}>
            <span className={styles.demoHeadingIcon}>
              <ActiveIcon aria-hidden="true" />
            </span>
            <div>
              <p>{activePreview.eyebrow}</p>
              <h2>{activePreview.title}</h2>
              <span>{activePreview.description}</span>
            </div>
          </div>
          <div className={styles.demoScore}>
            <div className={styles.demoScoreLabel}>
              <span>{activePreview.meterLabel}</span>
              <strong>{activePreview.meterText}</strong>
            </div>
            <div
              className={styles.demoMeter}
              role="progressbar"
              aria-label={activePreview.meterLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={activePreview.meterValue}
              aria-valuetext={activePreview.meterAriaText}
            >
              <span
                style={
                  {
                    "--meter-value": `${activePreview.meterValue}%`,
                  } as CSSProperties
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.demoContent}>
          <article className={styles.outputCard}>
            <div className={styles.outputCardHeader}>
              <span>{activePreview.outputLabel}</span>
              <span className={styles.outputReady}>
                <Check aria-hidden="true" />
                Ready
              </span>
            </div>
            <p>{activePreview.output}</p>
            <div className={styles.outputMeta}>
              <ShieldCheck aria-hidden="true" />
              Based only on the experience provided
            </div>
          </article>

          <aside className={styles.insightPanel}>
            <div className={styles.insightHeader}>
              <span>{activePreview.insightTitle}</span>
              <strong>{activePreview.insightMetric}</strong>
            </div>
            <p>{activePreview.insightCopy}</p>
            <div className={styles.keywordChips}>
              {activePreview.chips.map((chip, index) => (
                <span
                  key={chip}
                  style={{ animationDelay: `${80 + index * 65}ms` }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <div className={styles.demoActions}>
          <TrackedLink
            href={activePreview.href}
            className={styles.demoPrimaryAction}
            eventName="homepage_cta_click"
            eventPayload={{ cta: `hero_preview_${activePreview.id}` }}
          >
            {activePreview.action}
            <ArrowRight aria-hidden="true" />
          </TrackedLink>
          <div className={styles.demoUtilities}>
            {activePreview.utilitySignals.map((signal, index) => (
              <span key={signal}>
                {index === 0 ? (
                  <ShieldCheck aria-hidden="true" />
                ) : (
                  <Clipboard aria-hidden="true" />
                )}
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
