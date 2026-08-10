import type { PropsWithChildren } from "react";

import { SECTION_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Surface the section paints itself on. Kept as a named set rather than a
 * className so the page can be read top to bottom as a rhythm — the order the
 * tones appear in is a composition decision, not a per-section one.
 */
export type SectionTone = "white" | "paper" | "ink";

/**
 * Vertical density. Every section used to share one padding value, which is the
 * main reason the page scanned as nine identical slabs: with the same air above
 * and below each, nothing could read as a bigger or smaller moment than its
 * neighbour.
 */
export type SectionSpace = "sm" | "md" | "lg";

const TONE_CLASSES: Record<SectionTone, string> = {
  white: "bg-(--color-bg) text-(--color-text)",
  paper: "bg-(--color-paper) text-(--color-text)",
  ink: "bg-[image:var(--gradient-ink)] text-white",
};

const SPACE_CLASSES: Record<SectionSpace, string> = {
  sm: "py-12 sm:py-14 lg:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-36",
};

type SectionShellProps = PropsWithChildren<{
  id: string;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  space?: SectionSpace;
  /** Adds the film-grain overlay. Off on plain white, where it has nothing to dither. */
  grain?: boolean;
}>;

export function SectionShell({
  id,
  className,
  containerClassName,
  tone = "white",
  space = "md",
  grain,
  children,
}: SectionShellProps) {
  const showGrain = grain ?? tone !== "white";

  return (
    <section
      id={id}
      className={cn(
        // Deliberately SMALLER than the sticky header (h-18 / sm:h-20), so the
        // section's top edge tucks under the nav and part of its own top padding
        // scrolls away with it. Landing flush with the header instead left the
        // full 96px of section padding sitting empty below the nav before any
        // content appeared, which read as an unfinished scroll.
        //
        // What matters is the gap between the header's bottom edge and the first
        // line of content: gap = scroll-mt + section padding-top - header height.
        // These three values hold that at roughly 40-48px everywhere:
        //   base  48 +  64 - 72 = 40    sm  48 + 80 - 80 = 48
        //   lg    24 +  96 - 80 = 40
        "relative scroll-mt-12 lg:scroll-mt-6",
        TONE_CLASSES[tone],
        SPACE_CLASSES[space],
        showGrain && "grain",
        tone === "ink" && showGrain && "grain-dark",
        className,
      )}
    >
      {/* z-10 lifts content above the ::after grain layer. */}
      <div className={cn(SECTION_CONTAINER_CLASS, "relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
