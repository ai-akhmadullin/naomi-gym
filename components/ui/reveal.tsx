"use client";

import { type PropsWithChildren, useEffect, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = PropsWithChildren<{
  className?: string;
  /** Animation delay in ms, useful for staggering grids. */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}>;

/**
 * Fades children up as they scroll into view. Designed to "fail open": the
 * content renders fully visible by default (SSR / no-JS / reduced-motion), and
 * we only arm the hidden-then-animate state imperatively on the client before
 * the first paint, so nothing is ever permanently hidden behind JavaScript.
 */
export function Reveal({ className, delay = 0, as = "div", children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    node.dataset.reveal = "armed";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.dataset.reveal = "shown";
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      // @ts-expect-error -- ref type narrows per tag; the union is safe here.
      ref={ref}
      className={cn("reveal", className)}
      data-reveal="idle"
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
