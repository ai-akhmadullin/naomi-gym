import type { PropsWithChildren } from "react";

import { SECTION_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SectionShellProps = PropsWithChildren<{
  id: string;
  className?: string;
  containerClassName?: string;
}>;

export function SectionShell({
  id,
  className,
  containerClassName,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-14 sm:py-20 lg:py-24", className)}>
      <div className={cn(SECTION_CONTAINER_CLASS, containerClassName)}>{children}</div>
    </section>
  );
}
