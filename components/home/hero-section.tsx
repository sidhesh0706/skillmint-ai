import { ArrowRight, Check, Sparkles } from "lucide-react";
import { InteractiveProductDemo } from "@/components/home/interactive-product-demo";
import { TrackedLink } from "@/components/tracked-link";
import styles from "./hero-section.module.css";

const trustSignals = [
  "No signup",
  "Browser-only history",
  "Truth-first rewrites",
  "ATS-friendly outputs",
];

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.shell}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <Sparkles aria-hidden="true" />
            Free AI career workspace
          </div>

          <h1 id="home-hero-title" className={styles.headline}>
            Turn real experience into
            <span> job-ready career assets.</span>
          </h1>

          <p className={styles.subheadline}>
            Build stronger resume bullets, match job descriptions, and carry
            the same truthful proof into LinkedIn and cover letters.
          </p>

          <div className={styles.actions}>
            <TrackedLink
              href="/tools/resume-bullet-generator"
              className={styles.primaryAction}
              eventName="homepage_cta_click"
              eventPayload={{ cta: "generate_resume_bullets" }}
            >
              Generate resume bullets
              <ArrowRight className={styles.actionArrow} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/tools"
              className={styles.secondaryAction}
              eventName="homepage_cta_click"
              eventPayload={{ cta: "explore_application_tools" }}
            >
              Explore application tools
              <ArrowRight className={styles.actionArrow} aria-hidden="true" />
            </TrackedLink>
          </div>

          <div className={styles.trustGrid} aria-label="Workspace benefits">
            {trustSignals.map((signal, index) => (
              <span
                key={signal}
                className={styles.trustSignal}
                style={{ animationDelay: `${280 + index * 55}ms` }}
              >
                <Check aria-hidden="true" />
                {signal}
              </span>
            ))}
          </div>

          <p className={styles.proofNote}>
            One honest experience in. Four polished application assets out.
          </p>
        </div>

        <div className={styles.demoStage}>
          <InteractiveProductDemo />
        </div>
      </div>
    </section>
  );
}
