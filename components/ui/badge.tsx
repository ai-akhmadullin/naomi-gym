import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "soft" | "solid";
};

export function Badge({ className, variant = "soft", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em]",
        variant === "soft"
          ? "bg-(--color-brand-tint) text-(--color-brand)"
          : "bg-(--color-accent) text-(--color-accent-ink)",
        className,
      )}
      {...props}
    />
  );
}
