import Link from "next/link";
import { ArrowRight, WandSparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { SeoLandingPage } from "@/data/seo-landing-pages";

export type ResourceCardPage = Pick<
  SeoLandingPage,
  "slug" | "category" | "audience" | "title" | "metaDescription" | "actionVerbs"
>;

type ResourceCardProps = {
  page: ResourceCardPage;
};

export function ResourceCard({ page }: ResourceCardProps) {
  return (
    <Card
      as="article"
      interactive
      className="resource-card group section-reveal"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant="success" className="uppercase tracking-[0.1em]">
          {page.category || "guide"}
        </Badge>
        <span className="resource-card-icon" aria-hidden="true">
          <WandSparkles className="h-4 w-4" />
        </span>
      </div>

      <p className="resource-audience">{page.audience}</p>
      <h3 className="resource-card-title">{page.title}</h3>
      <p className="resource-card-description">{page.metaDescription}</p>

      <div className="resource-chip-row">
        {page.actionVerbs.slice(0, 3).map((verb, index) => (
          <Badge
            key={verb}
            variant="neutral"
            className="resource-chip keyword-chip"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            {verb}
          </Badge>
        ))}
      </div>

      <div className="resource-card-actions resource-card-action-row">
        <Link href={`/${page.slug}`} className="resource-open-link">
          Open guide
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/tools/resume-bullet-generator"
          className="resource-generate-link"
        >
          Use generator
          <WandSparkles className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
