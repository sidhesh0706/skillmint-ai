import { Check, LoaderCircle } from "lucide-react";
import type { PurposeToolPresentation } from "./presentation-config";
import styles from "./workspace.module.css";

export function PurposeLoadingState({
  presentation,
}: {
  presentation: PurposeToolPresentation;
}) {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingHeading}>
        <div>
          <span className={styles.studioLabel}>
            {presentation.loadingLabel}
          </span>
          <h3>{presentation.studioTitle}</h3>
          <p>{presentation.loadingDescription}</p>
        </div>
        <LoaderCircle className={styles.loadingSpinner} aria-hidden="true" />
      </div>

      <div className={styles.loadingTrack}>
        <span />
      </div>

      <div className={styles.loadingSteps}>
        {presentation.loadingSteps.map((step, index) => (
          <div
            key={step}
            className={styles.loadingStep}
            style={{ animationDelay: `${index * 140}ms` }}
          >
            <span className={styles.loadingStepIcon}>
              {index === 0 ? (
                <LoaderCircle
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Check className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
            <strong>{step}</strong>
            <small>{index === 0 ? "working" : "queued"}</small>
          </div>
        ))}
      </div>

      <div className={styles.loadingSkeletons}>
        {[0, 1].map((item) => (
          <div key={item}>
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}
