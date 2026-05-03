"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { monetizationConfig } from "@/config/monetization";

type AffiliateRecommendationCardProps = {
  title: string;
  description: string;
  href: string;
  label?: string;
  onClick?: () => void;
};

export function AffiliateRecommendationCard({
  title,
  description,
  href,
  label = "Resource",
  onClick,
}: AffiliateRecommendationCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group rounded-lg border border-slate-200 bg-white p-4 shadow-line transition hover:-translate-y-0.5 hover:border-mint-100 hover:shadow-soft"
    >
      <p className="text-xs font-semibold uppercase text-mint-700">
        {monetizationConfig.showAffiliatePlaceholders ? "Partner placeholder" : label}
      </p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <h4 className="font-semibold text-ink">{title}</h4>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-mint-700" />
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}
