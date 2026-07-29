import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  FolderGit2,
  MessageCircleQuestion,
  type LucideIcon,
} from "lucide-react";

type FeaturedTool = {
  name: string;
  category: string;
  description: string;
  href: string;
  nextStep: string;
  icon: LucideIcon;
  preview: "bullet" | "roast" | "match" | "project";
};

const tools: FeaturedTool[] = [
  {
    name: "Resume Bullet Generator",
    category: "Build",
    description:
      "Turn one honest note into five scored, recruiter-ready bullets.",
    href: "/tools/resume-bullet-generator",
    nextStep: "Next: pressure-test the wording",
    icon: FileText,
    preview: "bullet",
  },
  {
    name: "Resume Roast",
    category: "Review",
    description: "Find weak phrases, missing proof, and stronger alternatives.",
    href: "/tools/resume-roast",
    nextStep: "Next: compare it with the role",
    icon: MessageCircleQuestion,
    preview: "roast",
  },
  {
    name: "Job Description Match",
    category: "Target",
    description:
      "See matched skills, keyword gaps, and truthful tailoring options.",
    href: "/tools/job-description-match",
    nextStep: "Next: carry the proof into your profile",
    icon: BriefcaseBusiness,
    preview: "match",
  },
  {
    name: "Project to Resume",
    category: "Package",
    description:
      "Convert project ownership into resume and LinkedIn-ready proof.",
    href: "/tools/project-to-resume",
    nextStep: "Next: complete the application kit",
    icon: FolderGit2,
    preview: "project",
  },
];

function MiniPreview({ type }: { type: FeaturedTool["preview"] }) {
  if (type === "roast") {
    return (
      <div className="home-tool-preview">
        <div className="flex items-center justify-between">
          <span className="home-preview-label">Weak phrase</span>
          <span className="home-preview-warning">Needs proof</span>
        </div>
        <p className="mt-2 line-through decoration-slate-400">
          Responsible for weekly reports
        </p>
        <div className="mt-3 flex items-center gap-2 text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Recruiter critique ready
        </div>
      </div>
    );
  }

  if (type === "match") {
    return (
      <div className="home-tool-preview">
        <div className="flex items-center justify-between">
          <span className="home-preview-label">Role match</span>
          <strong className="text-emerald-700">78%</strong>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <span className="score-fill block h-full w-[78%] rounded-full bg-emerald-500" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="home-preview-chip">SQL matched</span>
          <span className="home-preview-chip home-preview-chip-missing">
            Forecasting gap
          </span>
        </div>
      </div>
    );
  }

  if (type === "project") {
    return (
      <div className="home-tool-preview">
        <span className="home-preview-label">Project note to proof</span>
        <div className="mt-3 grid grid-cols-[auto_1fr] items-center gap-3">
          <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500">
            Built dashboard
          </span>
          <p className="text-xs leading-5 text-slate-700">
            Packaged as a scored resume bullet and LinkedIn description.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-tool-preview">
      <div className="flex items-center justify-between">
        <span className="home-preview-label">Recruiter-ready bullet</span>
        <strong className="text-emerald-700">92/100</strong>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <span className="score-fill block h-full w-[92%] rounded-full bg-emerald-500" />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-700">
        Built a weekly sales dashboard using SQL and Excel...
      </p>
    </div>
  );
}

export function HomeFeaturedTools() {
  return (
    <div className="mt-7 grid gap-4 md:grid-cols-2">
      {tools.map((tool, index) => {
        const Icon = tool.icon;

        return (
          <article
            key={tool.name}
            className="home-tool-card"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="home-tool-icon">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="home-live-badge">
                <span />
                Live
              </span>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.13em] text-emerald-700">
              {tool.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-slate-950">
              {tool.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {tool.description}
            </p>
            <MiniPreview type={tool.preview} />
            <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={tool.href}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
              >
                Open tool
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <span className="text-xs font-medium text-slate-500">
                {tool.nextStep}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
