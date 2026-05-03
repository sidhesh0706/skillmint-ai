import Link from "next/link";
import { ArrowLeft, Clock3, Sparkles } from "lucide-react";
import type { ToolConfig } from "@/data/tool-config";

type ComingSoonToolProps = {
  tool: ToolConfig;
};

export function ComingSoonTool({ tool }: ComingSoonToolProps) {
  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card-surface overflow-hidden text-center">
        <div className="border-b border-slate-200/80 bg-gradient-to-r from-white via-mint-50/80 to-white p-8 sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white text-mint-700 shadow-line">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-line">
            <Clock3 className="h-4 w-4 text-mint-700" aria-hidden="true" />
            This tool is coming soon
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {tool.longDescription}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {tool.quickFacts.map((fact) => (
              <span
                key={fact}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700"
              >
                <Sparkles className="h-4 w-4 text-mint-700" aria-hidden="true" />
                {fact}
              </span>
            ))}
          </div>
          <Link href="/tools" className="button-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to tools
          </Link>
        </div>
      </div>
    </div>
  );
}
