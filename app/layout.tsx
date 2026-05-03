import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

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
  openGraph: {
    title: "SkillMint AI",
    description:
      "Free AI tools for resumes, cover letters, LinkedIn profiles, and career productivity.",
    url: "https://skillmint-ai.vercel.app",
    siteName: "SkillMint AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMint AI",
    description:
      "Free AI tools for resumes, cover letters, LinkedIn profiles, and career productivity.",
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
      </body>
    </html>
  );
}
