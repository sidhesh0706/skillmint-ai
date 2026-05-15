import { ToolCard } from "@/components/tool-card";
import type { ToolConfig } from "@/data/tool-config";

type ToolGridProps = {
  tools: ToolConfig[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}
