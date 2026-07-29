import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "soft" | "solid";
};

export function Badge({ className, variant = "soft", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold",
        variant === "soft"
          ? "bg-(--color-brand)/10 text-(--color-brand)"
          : "bg-[image:var(--gradient-brand)] text-white shadow-(--shadow-brand)",
        className,
      )}
      {...props}
    />
  );
}
