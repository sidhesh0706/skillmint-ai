const siteUrl = "https://skillmint-ai.vercel.app";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SkillMint AI",
    url: siteUrl,
    description:
      "Free AI career tools for resume bullets, cover letters, LinkedIn profiles, and job search productivity.",
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SkillMint AI Resume Bullet Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/tools/resume-bullet-generator`,
    description:
      "Generate, score, rewrite, compare, and export recruiter-ready resume bullets with AI.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI resume bullet generation",
      "Resume bullet scoring",
      "One-click bullet rewrites",
      "Missing keyword suggestions",
      "TXT and Markdown exports",
      "Browser-only recent history",
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}${path}`,
    author: {
      "@type": "Organization",
      name: "SkillMint AI",
    },
    publisher: {
      "@type": "Organization",
      name: "SkillMint AI",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand-mark.svg`,
      },
    },
    dateModified: "2026-05-07",
    datePublished: "2026-05-07",
  };
}
