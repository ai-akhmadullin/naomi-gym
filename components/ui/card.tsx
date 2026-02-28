import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-2xl border border-(--color-border) bg-white shadow-(--shadow-soft)",
        className,
      )}
      {...props}
    />
  );
}
