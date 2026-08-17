import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  /** Kept for call-site compatibility; no longer animates anything. */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}>;

/**
 * Historical name: this used to fade children up as they scrolled into view.
 * The scroll-triggered entrance was cut — content now renders in place — but
 * the wrapper stays because call sites lean on it for layout classes and
 * semantic tags.
 */
export function Reveal({ className, as = "div", children }: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
