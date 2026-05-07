import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { websiteSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillmint-ai.vercel.app"),
  title: {
    default: "SkillMint AI | Free AI Tools to Build Your Career Faster",
    template: "%s | SkillMint AI",
  },
  description:
    "SkillMint AI offers free AI career tools for resumes, cover letters, LinkedIn profiles, interview prep, and productivity assets.",
  keywords: [
    "AI career tools",
    "resume bullet generator",
    "cover letter generator",
    "LinkedIn headline generator",
    "career AI",
  ],
  verification: {
    google: "AFw3_keXJ1i0qgzviqw5LxSgCHdaxS2oZK9IJoaZJsE",
  },
  openGraph: {
    title: "SkillMint AI",
    description:
      "Free AI tools for resumes, cover letters, LinkedIn profiles, and career productivity.",
    url: "https://skillmint-ai.vercel.app",
    siteName: "SkillMint AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkillMint AI career tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint AI",
    description:
      "Free AI tools for resumes, cover letters, LinkedIn profiles, and career productivity.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand-mark.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <JsonLd data={websiteSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
