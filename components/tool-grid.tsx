import { ProductCard } from "@/components/product-card";
import { getToolHref, type ToolConfig } from "@/data/tool-config";

type ToolGridProps = {
  tools: ToolConfig[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ProductCard
          key={tool.name}
          title={tool.name}
          outcome={tool.category}
          description={tool.shortDescription}
          href={getToolHref(tool)}
          icon={tool.icon}
          status={tool.status === "live" ? "live" : "coming-soon"}
          cta={tool.status === "live" ? "Open tool" : "Preview tool"}
          preview={tool.quickFacts}
        />
      ))}
    </div>
  );
}
