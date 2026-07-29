import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-3xl border border-(--color-border) bg-white shadow-(--shadow-soft)",
        hover &&
          "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] hover:shadow-(--shadow-lift)",
        className,
      )}
      {...props}
    />
  );
}
