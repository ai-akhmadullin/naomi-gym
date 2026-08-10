"use client";

import { type PropsWithChildren, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Gives the sticky header two states.
 *
 * At the top of the page it is transparent and borderless, so the hero reads as
 * one uninterrupted surface rather than as a band of white sitting on a band of
 * paper. Once the page has scrolled it commits: opaque, blurred, with a hairline
 * and a shadow to separate it from whatever is passing underneath.
 *
 * The measurable difference is that a header can't be both "invisible over the
 * hero" and "legible over a dark section" — it has to pick per scroll position,
 * which is the one thing static CSS can't do.
 */
export function StickyHeaderShell({ children }: PropsWithChildren) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-(--color-border) bg-white/85 shadow-[0_1px_0_rgba(8,30,19,0.03),0_10px_30px_-22px_rgba(8,30,19,0.35)] backdrop-blur-xl"
          : // Paper, not transparent. A sticky header occupies layout space, so
            // "transparent" shows the body background through it — a white strip
            // above a bone-coloured hero. Every page in the site opens on paper,
            // so matching it is what actually makes the header disappear.
            "border-b border-transparent bg-(--color-paper)",
      )}
    >
      {children}
    </header>
  );
}
