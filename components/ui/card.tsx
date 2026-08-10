import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  /** "dark" is the card as it sits on an ink section. */
  tone?: "light" | "dark";
};

export function Card({ className, hover = false, tone = "light", ...props }: CardProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "min-w-0 rounded-[var(--radius-lg)] border",
        isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-(--color-border) bg-white shadow-(--shadow-soft)",
        hover &&
          (isDark
            ? "transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
            : // Only transform/shadow/border animate. `transition-all` used to
              // include colour and radius too, which made the hover read as a
              // soft blur rather than a lift.
              "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--color-brand)_28%,transparent)] hover:shadow-(--shadow-lift)"),
        className,
      )}
      {...props}
    />
  );
}
