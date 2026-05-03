import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ToolGrid } from "@/components/tool-grid";
import { TrustPills } from "@/components/trust-pills";
import { tools } from "@/data/tool-config";

export const metadata: Metadata = {
  title: "AI Career Tools",
  description:
    "Browse SkillMint AI tools for resumes, cover letters, LinkedIn profiles, interview preparation, and professional email replies.",
};

export default function ToolsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(130deg,rgba(31,201,153,0.14),transparent_38%),linear-gradient(230deg,rgba(245,158,11,0.10),transparent_32%)]" />
        <div className="container-shell">
          <div className="mb-6">
            <TrustPills />
          </div>
          <SectionHeading
            eyebrow="Tools"
            title="Practical AI tools for every step of your career search."
            description="Use the available resume bullet generator now, and keep an eye on the next tools coming to SkillMint AI."
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <ToolGrid tools={tools} />
        </div>
      </section>
    </>
  );
}
