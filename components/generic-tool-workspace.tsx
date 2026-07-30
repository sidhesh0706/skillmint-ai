"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  FileDown,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
import { AnimatedScoreBadge } from "@/components/animated-score-badge";
import { EmailCapture } from "@/components/email-capture";
import { KeywordChip } from "@/components/keyword-chip";
import { MotionButton } from "@/components/motion-button";
import { ScoreMeter } from "@/components/score-meter";
import { ComposerStep } from "@/components/tool-workspace/composer-step";
import { PurposeLoadingState } from "@/components/generic-tool-workspace/purpose-loading-state";
import { PurposePreview } from "@/components/generic-tool-workspace/purpose-preview";
import {
  getPurposeToolPresentation,
  isPurposeToolSlug,
} from "@/components/generic-tool-workspace/presentation-config";
import styles from "@/components/generic-tool-workspace/workspace.module.css";
import { recommendedResources } from "@/config/monetization";
import {
  getInitialToolValues,
  getToolBySlug,
  type ToolField,
  type ToolFormValues,
} from "@/data/tool-config";
import { trackEvent } from "@/lib/analytics";

type GenericToolWorkspaceProps = {
  slug: string;
};

type GenericToolResult = {
  title: string;
  summary: string;
  score?: number;
  scores?: Array<{ label: string; score: number }>;
  sections: Array<{ title: string; items?: string[]; text?: string }>;
  warnings?: string[];
};

const completedEvents: Record<string, Parameters<typeof trackEvent>[0]> = {
  "resume-roast": "resume_roast_completed",
  "job-description-match": "jd_match_completed",
  "project-to-resume": "project_to_resume_completed",
};

function renderField(
  field: ToolField,
  value: string,
  onChange: (name: string, value: string) => void,
  optional: boolean,
) {
  const baseClass = styles.fieldControl;
  const id = `purpose-field-${field.name}`;

  if (field.type === "textarea") {
    return (
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        rows={field.rows || 5}
        className={`${baseClass} ${styles.textarea}`}
        aria-required={!optional}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={baseClass}
        aria-required={!optional}
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={id}
      value={value}
      onChange={(event) => onChange(field.name, event.target.value)}
      placeholder={field.placeholder}
      className={baseClass}
      aria-required={!optional}
    />
  );
}

function formatResultText(result: GenericToolResult) {
  return [
    result.title,
    result.score ? `Overall score: ${result.score}/100` : "",
    result.summary,
    "",
    ...(result.scores?.length
      ? [
          "Scores",
          ...result.scores.map(
            (score) => `- ${score.label}: ${score.score}/100`,
          ),
          "",
        ]
      : []),
    ...result.sections.flatMap((section) => [
      section.title,
      section.text || "",
      ...(section.items || []).map((item) => `- ${item}`),
      "",
    ]),
    ...(result.warnings?.length
      ? [
          "Truthfulness checks",
          ...result.warnings.map((warning) => `- ${warning}`),
        ]
      : []),
  ]
    .filter((line, index, lines) => line || lines[index - 1] !== "")
    .join("\n");
}

function downloadText(fileName: string, text: string, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getScoreColor(score: number) {
  if (score >= 85) {
    return "text-mint-700 bg-mint-50 border-mint-100";
  }

  if (score >= 70) {
    return "text-amber-700 bg-amber-50 border-amber-200";
  }

  return "text-red-700 bg-red-50 border-red-200";
}

function isKeywordSection(title: string) {
  const normalized = title.toLowerCase();
  return (
    normalized.includes("keyword") ||
    normalized.includes("skill") ||
    normalized.includes("action verb")
  );
}

function isOptionSection(title: string) {
  const normalized = title.toLowerCase();
  return (
    normalized.includes("headline") ||
    normalized.includes("improved bullet") ||
    normalized.includes("resume bullet")
  );
}

export function GenericToolWorkspace({ slug }: GenericToolWorkspaceProps) {
  const configuredTool = getToolBySlug(slug);
  const purposeSlug = configuredTool?.slug;

  if (!configuredTool || !purposeSlug || !isPurposeToolSlug(purposeSlug)) {
    throw new Error(`Unsupported live tool workspace: ${slug}`);
  }

  const tool = configuredTool;
  const presentation = getPurposeToolPresentation(purposeSlug);
  const ToolIcon = tool.icon;
  const fieldsByName = new Map(
    tool.inputFields.map((field) => [field.name, field]),
  );
  const [form, setForm] = useState<ToolFormValues>(() =>
    getInitialToolValues(tool),
  );
  const [result, setResult] = useState<GenericToolResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const outputText = useMemo(
    () => (result ? formatResultText(result) : ""),
    [result],
  );

  function updateForm(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    trackEvent("tool_started", { tool: tool.slug });

    try {
      const response = await fetch(`/api/tools/${tool.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as {
        error?: string;
      } & GenericToolResult;

      if (!response.ok) {
        throw new Error(
          payload.error || "Something went wrong. Try again in a moment.",
        );
      }

      const nextResult: GenericToolResult = {
        title: payload.title || tool.output.title,
        summary: payload.summary || tool.output.description,
        score: payload.score,
        scores: Array.isArray(payload.scores) ? payload.scores : [],
        sections: Array.isArray(payload.sections) ? payload.sections : [],
        warnings: Array.isArray(payload.warnings) ? payload.warnings : [],
      };

      setResult(nextResult);
      trackEvent("tool_completed", { tool: tool.slug });
      const specificEvent = completedEvents[tool.slug];
      if (specificEvent) {
        trackEvent(specificEvent, { tool: tool.slug });
      }
      showToast("Output ready. Review before using it.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Try again.";
      setError(message);
      trackEvent("tool_generate_error", { tool: tool.slug });
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!outputText) {
      return;
    }

    await navigator.clipboard.writeText(outputText);
    trackEvent("copy_clicked", { tool: tool.slug });
    showToast("Copied.");
  }

  function exportOutput(format: "txt" | "markdown") {
    if (!outputText) {
      return;
    }

    const markdown = format === "markdown";
    const text = markdown
      ? outputText.replace(/^(.+)$/gm, (line) =>
          line.startsWith("- ") || line.endsWith("/100") || !line
            ? line
            : `## ${line}`,
        )
      : outputText;
    downloadText(
      markdown
        ? tool.output.downloadFileName.replace(".txt", ".md")
        : tool.output.downloadFileName,
      text,
      markdown ? "text/markdown" : "text/plain",
    );
    trackEvent("export_clicked", { tool: tool.slug, format });
    showToast(markdown ? "Markdown downloaded." : "TXT downloaded.");
  }

  function rerunTool() {
    const syntheticEvent = {
      preventDefault() {},
    } as FormEvent<HTMLFormElement>;
    void handleSubmit(syntheticEvent);
  }

  return (
    <div className={styles.workspace}>
      <header className={styles.workspaceToolbar}>
        <div className={styles.workspaceTitle}>
          <span className={styles.workspaceIcon}>
            <ToolIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <span className={styles.workspaceKicker}>
              {presentation.workspaceKicker || "Live AI workspace"}
            </span>
            <h2>{presentation.workspaceTitle}</h2>
            <p>{presentation.workspaceDescription}</p>
          </div>
        </div>
        <dl className={styles.workspaceStats}>
          <div>
            <dt>Report</dt>
            <dd>{result ? "Ready" : "Waiting"}</dd>
          </div>
          <div>
            <dt>{presentation.scoreLabel}</dt>
            <dd>
              {typeof result?.score === "number"
                ? `${result.score}/100`
                : "Pending"}
            </dd>
          </div>
          <div>
            <dt>Privacy</dt>
            <dd>No signup</dd>
          </div>
        </dl>
      </header>

      <div className={styles.workspaceColumns}>
        <form className={styles.composer} onSubmit={handleSubmit}>
          <div className={styles.composerHeading}>
            <span className={styles.composerIcon}>
              <ToolIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <span className={styles.workspaceLabel}>
                {presentation.composerLabel}
              </span>
              <h2>{presentation.composerTitle}</h2>
              <p>{presentation.composerDescription}</p>
            </div>
          </div>

          <div className={styles.composerGroups}>
            {presentation.fieldGroups.map((group, groupIndex) => {
              const groupFields = group.fields
                .map((fieldName) => fieldsByName.get(fieldName))
                .filter((field): field is ToolField => Boolean(field));
              const requiredGroupFields = groupFields.filter(
                (field) => !presentation.optionalFields.includes(field.name),
              );
              const complete =
                requiredGroupFields.length > 0 &&
                requiredGroupFields.every((field) =>
                  Boolean(form[field.name]?.trim()),
                );

              return (
                <ComposerStep
                  key={group.title}
                  step={groupIndex + 1}
                  title={group.title}
                  description={group.description}
                  optional={group.optional}
                  complete={complete}
                >
                  {groupFields.map((field) => {
                    const optional = presentation.optionalFields.includes(
                      field.name,
                    );
                    return (
                      <label
                        key={field.name}
                        htmlFor={`purpose-field-${field.name}`}
                        className={
                          field.layout === "half"
                            ? styles.field
                            : `${styles.field} sm:col-span-2`
                        }
                      >
                        <span className={styles.fieldLabel}>
                          {field.label}
                          {optional ? <small>Optional</small> : null}
                        </span>
                        {renderField(
                          field,
                          form[field.name] || "",
                          updateForm,
                          optional,
                        )}
                      </label>
                    );
                  })}
                </ComposerStep>
              );
            })}
          </div>

          {error ? (
            <div className={styles.errorState} role="alert">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              {error}
            </div>
          ) : null}

          <div className={styles.submitDock}>
            <MotionButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              icon={Sparkles}
              className="w-full"
            >
              {isLoading ? presentation.loadingLabel : presentation.submitLabel}
            </MotionButton>
          </div>

          <p className={styles.privacyNote}>
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            No account required. Review every generated claim before using it.
          </p>
        </form>

        <section className={styles.studio} aria-live="polite">
          <header className={styles.studioHeader}>
            <div className={styles.studioTitleRow}>
              <div>
                <span className={styles.studioLabel}>
                  {presentation.studioLabel}
                </span>
                <h2>{presentation.studioTitle}</h2>
                <p>{presentation.studioDescription}</p>
              </div>
              {result ? (
                <button
                  type="button"
                  className={styles.rerunButton}
                  onClick={rerunTool}
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Run again
                </button>
              ) : null}
            </div>

            <div className={styles.exportStrip}>
              {result ? (
                <>
                  <button type="button" onClick={copyOutput}>
                    <Clipboard className="h-4 w-4" aria-hidden="true" />
                    Copy report
                  </button>
                  <button type="button" onClick={() => exportOutput("txt")}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    TXT
                  </button>
                  <button
                    type="button"
                    onClick={() => exportOutput("markdown")}
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    Markdown
                  </button>
                </>
              ) : (
                <span>Copy and export actions appear with your report.</span>
              )}
            </div>
          </header>

          <div className={styles.studioBody}>
            {isLoading ? (
              <PurposeLoadingState presentation={presentation} />
            ) : result ? (
              <>
                <div className={styles.resultSummary}>
                  <div>
                    <span className={styles.studioLabel}>Report overview</span>
                    <h3>{result.title}</h3>
                    <p>{result.summary}</p>
                  </div>
                  {typeof result.score === "number" ? (
                    <AnimatedScoreBadge
                      score={`${result.score}/100`}
                      label={presentation.scoreLabel}
                      className={`px-4 py-3 text-sm ${getScoreColor(result.score)}`}
                    />
                  ) : null}
                  {typeof result.score === "number" ? (
                    <ScoreMeter
                      value={result.score}
                      label={presentation.scoreLabel}
                      className={styles.overallMeter}
                    />
                  ) : null}
                </div>

                {result.scores?.length ? (
                  <div className={styles.scoreGrid}>
                    {result.scores.map((score, index) => (
                      <div
                        key={score.label}
                        className={styles.scoreCard}
                        style={{ animationDelay: `${index * 70}ms` }}
                      >
                        <div>
                          <p>{score.label}</p>
                          <span className={getScoreColor(score.score)}>
                            {score.score}/100
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              width: `${Math.max(0, Math.min(100, score.score))}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className={styles.reportSections}>
                  {result.sections.map((section, sectionIndex) => {
                    const keywordSection = isKeywordSection(section.title);
                    const optionSection = isOptionSection(section.title);

                    return (
                      <article
                        key={section.title}
                        className={`${styles.reportSection} ${
                          keywordSection ? styles.keywordSection : ""
                        } ${optionSection ? styles.optionSection : ""}`}
                        style={{ animationDelay: `${sectionIndex * 80}ms` }}
                      >
                        <h3>
                          <CheckCircle2
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          {section.title}
                        </h3>
                        {section.text ? <p>{section.text}</p> : null}
                        {section.items?.length ? (
                          <div className={styles.sectionItems}>
                            {section.items.map((item, itemIndex) => (
                              <div key={`${item}-${itemIndex}`}>
                                {keywordSection ? (
                                  <KeywordChip>{item}</KeywordChip>
                                ) : (
                                  <>
                                    {optionSection ? (
                                      <span className={styles.itemNumber}>
                                        {String(itemIndex + 1).padStart(2, "0")}
                                      </span>
                                    ) : null}
                                    <span>{item}</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>

                {result.warnings?.length ? (
                  <div className={styles.warningPanel}>
                    <h3>
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                      {presentation.warningLabel}
                    </h3>
                    <ul>
                      {result.warnings.map((warning) => (
                        <li key={warning}>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <EmailCapture
                  compact
                  location={`${tool.slug}_output_capture`}
                />

                <div>
                  <h3 className={styles.recommendationTitle}>
                    Recommended next steps
                  </h3>
                  <div className={styles.recommendationGrid}>
                    {recommendedResources.slice(0, 3).map((recommendation) => (
                      <AffiliateRecommendationCard
                        key={recommendation.title}
                        title={recommendation.title}
                        description={recommendation.description}
                        href={recommendation.href}
                        whyThisHelps={recommendation.whyThisHelps}
                        label="Next step"
                        onClick={() =>
                          trackEvent("affiliate_click", {
                            tool: tool.slug,
                            resource: recommendation.title,
                          })
                        }
                      />
                    ))}
                  </div>
                </div>

                <AdSlot label={`${tool.name} resource placement`} />
              </>
            ) : (
              <PurposePreview slug={purposeSlug} presentation={presentation} />
            )}
          </div>
        </section>
      </div>

      {toast ? (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
