import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  Linkedin,
  MessageCircleQuestion,
  Target,
} from "lucide-react";
import type {
  PurposeToolPresentation,
  PurposeToolSlug,
} from "./presentation-config";
import styles from "./workspace.module.css";

type PurposePreviewProps = {
  slug: PurposeToolSlug;
  presentation: PurposeToolPresentation;
};

function PreviewMetrics({
  presentation,
}: {
  presentation: PurposeToolPresentation;
}) {
  return (
    <div className={styles.previewMetrics}>
      {presentation.previewMetrics.map((metric, index) => (
        <div
          key={metric.label}
          className={styles.previewMetric}
          style={{ animationDelay: `${index * 65}ms` }}
        >
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </div>
      ))}
    </div>
  );
}

function ResumeRoastPreview() {
  return (
    <div className={styles.roastFlow}>
      <div className={styles.previewStage}>
        <span>Weak phrase</span>
        <p className={styles.struckText}>
          Responsible for preparing weekly customer reports.
        </p>
      </div>
      <ArrowRight className={styles.flowArrow} aria-hidden="true" />
      <div className={styles.critiqueStage}>
        <span>
          <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
          Recruiter critique
        </span>
        <p>
          Passive opener, no scope, and no decision or customer outcome.
        </p>
      </div>
      <ArrowRight className={styles.flowArrow} aria-hidden="true" />
      <div className={styles.improvedStage}>
        <span>Improved bullet</span>
        <p>
          Produced weekly customer reports that surfaced adoption trends and
          helped account teams prioritize follow-ups.
        </p>
      </div>
    </div>
  );
}

function JdMatchPreview() {
  return (
    <div className={styles.matchPreview}>
      <div className={styles.keywordColumn}>
        <span className={styles.previewColumnLabel}>Job keywords</span>
        <div className={styles.keywordList}>
          <span>SQL</span>
          <span>forecasting</span>
          <span>stakeholders</span>
          <span>dashboards</span>
        </div>
      </div>
      <div className={styles.matchDivider}>
        <Target className="h-5 w-5" aria-hidden="true" />
        <strong>78%</strong>
        <span>match</span>
      </div>
      <div className={styles.keywordColumn}>
        <span className={styles.previewColumnLabel}>Resume gaps</span>
        <div className={`${styles.keywordList} ${styles.keywordListWarning}`}>
          <span>forecasting</span>
          <span>stakeholder updates</span>
        </div>
        <p>Only add these when your experience supports them.</p>
      </div>
    </div>
  );
}

function ProjectPreview() {
  return (
    <div className={styles.projectPreview}>
      <div className={styles.projectSource}>
        <span>Project note</span>
        <p>
          Built a campus events app with React and worked on the dashboard.
        </p>
      </div>
      <ArrowRight className={styles.flowArrow} aria-hidden="true" />
      <div className={styles.projectOutputs}>
        <div>
          <span>Resume bullet</span>
          <p>
            Built a React dashboard that helped organizers track attendance
            across 12 campus events.
          </p>
        </div>
        <div>
          <span>LinkedIn project description</span>
          <p>
            A campus event platform focused on clearer attendance reporting and
            organizer workflows.
          </p>
        </div>
      </div>
    </div>
  );
}

function CoverLetterPreview() {
  return (
    <div className={styles.letterPreview}>
      <div className={styles.letterInputs}>
        <span>
          <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
          Product Analyst
        </span>
        <span>Northstar Labs</span>
        <span>Dashboard project</span>
      </div>
      <div className={styles.letterPaper}>
        <div className={styles.letterPaperHeader}>
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Opening draft</span>
        </div>
        <p>
          I&apos;m applying for the Product Analyst role at Northstar Labs with
          hands-on experience turning product data into clear dashboards and
          practical recommendations.
        </p>
      </div>
    </div>
  );
}

function LinkedInPreview() {
  const headlines = [
    "Data Analyst | SQL, Excel & dashboard reporting",
    "Early-career Data Analyst turning data into clear decisions",
    "Data Analytics | SQL • dashboards • customer insights",
  ];

  return (
    <div className={styles.linkedinPreview}>
      <div className={styles.linkedinInputs}>
        <Linkedin className="h-5 w-5" aria-hidden="true" />
        <div>
          <span>Target signal</span>
          <p>Data analyst · SQL · dashboard project</p>
        </div>
      </div>
      <div className={styles.headlineOptions}>
        {headlines.map((headline, index) => (
          <div key={headline} style={{ animationDelay: `${index * 90}ms` }}>
            <span>0{index + 1}</span>
            <p>{headline}</p>
            {index === 0 ? (
              <strong>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Best fit
              </strong>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PurposePreview({
  slug,
  presentation,
}: PurposePreviewProps) {
  return (
    <div className={styles.emptyPreview}>
      <div className={styles.emptyPreviewHeading}>
        <div>
          <span className={styles.studioLabel}>Purpose-built preview</span>
          <h3>{presentation.studioTitle}</h3>
        </div>
        <span className={styles.previewReady}>
          <span />
          Ready for input
        </span>
      </div>

      <div className={styles.previewCanvas}>
        {slug === "resume-roast" ? <ResumeRoastPreview /> : null}
        {slug === "job-description-match" ? <JdMatchPreview /> : null}
        {slug === "project-to-resume" ? <ProjectPreview /> : null}
        {slug === "cover-letter-generator" ? <CoverLetterPreview /> : null}
        {slug === "linkedin-headline-generator" ? (
          <LinkedInPreview />
        ) : null}
      </div>

      <PreviewMetrics presentation={presentation} />

      <div className={styles.truthNote}>
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        Review every suggestion and keep only details that are accurate.
      </div>
    </div>
  );
}
