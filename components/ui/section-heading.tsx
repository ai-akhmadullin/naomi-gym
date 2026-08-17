import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  /**
   * Short label above the title. Together with `index` it forms the page's
   * spine: every section announces itself the same way, so a reader scrolling
   * fast always knows where they are and how much is left.
   */
  eyebrow?: string;
  /** Two-digit section number, e.g. "01". Rendered in mono for contrast. */
  index?: string;
  className?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /**
   * Drops the default bottom margin, for callers that own their own spacing.
   *
   * This is a prop rather than a `className="mb-0"` override because `cn` is a
   * plain string joiner — it has no tailwind-merge, so both `mb-10` and `mb-0`
   * end up in the class list and the winner is decided by stylesheet order, not
   * by call site. Anything that must actually override a default here needs to
   * remove it at the source.
   */
  flush?: boolean;
};

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  index,
  className,
  align = "left",
  tone = "light",
  flush = false,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        !flush && "mb-8 sm:mb-14",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {index ? (
            <span
              className={cn(
                "font-mono text-[0.7rem] font-medium tabular-nums",
                isDark ? "text-(--color-accent)" : "text-(--color-brand)",
              )}
            >
              {index}
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              isDark ? "bg-white/25" : "bg-(--color-border-strong)",
            )}
          />
          <span
            className={cn(
              "text-[0.7rem] font-bold uppercase tracking-[0.18em]",
              isDark ? "text-white/65" : "text-(--color-text-muted)",
            )}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}

      <h2
        className={cn(
          // Leading is set for Vietnamese, not English. VI stacks marks both
          // above and below the letter (ườ, ặ, ỏ), so the tighter leading that
          // suits the EN headings puts a descender mark from one line into the
          // ascender mark of the next.
          "font-display text-balance text-[length:var(--step-4)] font-extrabold leading-[1.08]",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-pretty text-[length:var(--step-1)] leading-relaxed",
            isDark ? "text-white/65" : "text-(--color-text-muted)",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
