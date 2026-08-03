import { clsx } from "clsx";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  level?: 1 | 2 | 3;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  level = 2,
}: SectionHeaderProps) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";

  return (
    <div
      className={clsx(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-950 sm:text-3xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-3 text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
