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
        // A stamped plate, not a hairline rule. The old treatment — a thin
        // number, a 1px rule and letterspaced grey caps — is boutique-hotel
        // typography: every element in it was the lightest possible version of
        // itself. Here the number sits in a solid ink chip with the lime on top
        // of it, and the label carries full text colour at heavy weight, so the
        // spine of the page reads like signage bolted to a wall.
        <div
          className={cn(
            "mb-4 flex items-center gap-2.5 sm:mb-5",
            align === "center" && "justify-center",
          )}
        >
          {index ? (
            <span
              className={cn(
                // leading-none + fixed height, so the box is sized by the chip
                // and not by the mono font's line box.
                "inline-flex h-[1.35rem] items-center rounded-[var(--radius-xs)] px-1.5 font-mono text-[0.68rem] font-bold leading-none tabular-nums",
                isDark
                  ? "bg-(--color-accent) text-(--color-accent-ink)"
                  : "bg-(--color-ink) text-(--color-accent)",
              )}
            >
              {index}
            </span>
          ) : null}
          <span
            className={cn(
              "text-[0.72rem] font-extrabold uppercase tracking-[0.16em]",
              isDark ? "text-white" : "text-foreground",
            )}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}

      <h2
        className={cn(
          // Set in caps. A gym headline is signage — the word on the wall, the
          // plate on the rack — and caps at this weight is the only thing on the
          // page that sounds like the room it is describing.
          //
          // Leading is set for Vietnamese, not English. VI stacks marks both
          // above and below the letter, and caps make that worse rather than
          // better: the mark on Ộ sits above cap height while its dot still
          // hangs below the baseline, so the two lines need more room between
          // them than the same headline in sentence case.
          "font-display text-balance text-[length:var(--step-4)] font-extrabold uppercase leading-[1.14] tracking-[-0.015em]",
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
