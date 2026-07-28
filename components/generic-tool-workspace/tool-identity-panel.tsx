import { CheckCircle2, type LucideIcon } from "lucide-react";
import { getPurposeToolPresentation } from "./presentation-config";
import styles from "./workspace.module.css";

type ToolIdentityPanelProps = {
  slug: string;
  icon: LucideIcon;
};

export function ToolIdentityPanel({
  slug,
  icon: Icon,
}: ToolIdentityPanelProps) {
  const presentation = getPurposeToolPresentation(slug);

  return (
    <aside className={styles.identityPanel}>
      <div className={styles.identityHeading}>
        <span className={styles.identityIcon}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p>Purpose-built workspace</p>
          <h2>{presentation.workspaceTitle}</h2>
        </div>
      </div>
      <div className={styles.identitySignals}>
        {presentation.outputSignals.map((signal) => (
          <span key={signal}>
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {signal}
          </span>
        ))}
      </div>
    </aside>
  );
}
