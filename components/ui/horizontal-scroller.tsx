"use client";

import { Children, type PropsWithChildren, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type HorizontalScrollerProps = PropsWithChildren<{
  ariaLabel: string;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
  showScrollIndicator?: boolean;
  /** Tunes the progress bar for placement on an ink section. */
  indicatorTone?: "light" | "dark";
}>;

export function HorizontalScroller({
  ariaLabel,
  className,
  viewportClassName,
  trackClassName,
  itemClassName,
  showScrollIndicator = false,
  indicatorTone = "light",
  children,
}: HorizontalScrollerProps) {
  const items = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorTrackRef = useRef<HTMLDivElement>(null);
  const indicatorThumbRef = useRef<HTMLSpanElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (!showScrollIndicator) {
      return;
    }

    const viewport = viewportRef.current;
    const content = contentRef.current;
    const indicatorTrack = indicatorTrackRef.current;
    const indicatorThumb = indicatorThumbRef.current;

    if (!viewport || !content || !indicatorTrack || !indicatorThumb) {
      return;
    }

    let pendingAnimationFrameId = 0;
    let lastScrollable: boolean | null = null;

    const syncIndicator = () => {
      pendingAnimationFrameId = 0;

      const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
      const nextScrollable = maxScrollLeft > 1;

      if (nextScrollable !== lastScrollable) {
        lastScrollable = nextScrollable;
        setIsScrollable(nextScrollable);
      }

      if (!nextScrollable) {
        indicatorThumb.style.width = "100%";
        indicatorThumb.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const trackWidth = indicatorTrack.clientWidth;
      if (trackWidth <= 0) {
        return;
      }

      const thumbWidth = (viewport.clientWidth / viewport.scrollWidth) * trackWidth;
      const availableTravel = Math.max(trackWidth - thumbWidth, 0);
      const progress = Math.min(Math.max(viewport.scrollLeft / maxScrollLeft, 0), 1);

      indicatorThumb.style.width = `${thumbWidth}px`;
      indicatorThumb.style.transform = `translate3d(${availableTravel * progress}px, 0, 0)`;
    };

    const scheduleIndicatorSync = () => {
      if (pendingAnimationFrameId !== 0) {
        return;
      }

      pendingAnimationFrameId = window.requestAnimationFrame(syncIndicator);
    };

    scheduleIndicatorSync();
    viewport.addEventListener("scroll", scheduleIndicatorSync, { passive: true });

    let resizeObserver: ResizeObserver | null = null;

    // jsdom does not implement ResizeObserver, so unit tests fall back to window resize events.
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(scheduleIndicatorSync);
      resizeObserver.observe(viewport);
      resizeObserver.observe(content);
      resizeObserver.observe(indicatorTrack);
    } else {
      window.addEventListener("resize", scheduleIndicatorSync);
    }

    return () => {
      viewport.removeEventListener("scroll", scheduleIndicatorSync);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleIndicatorSync);

      if (pendingAnimationFrameId !== 0) {
        window.cancelAnimationFrame(pendingAnimationFrameId);
      }
    };
  }, [showScrollIndicator]);

  return (
    <div className={cn("min-w-0", className)}>
      <div
        ref={viewportRef}
        role="region"
        aria-label={ariaLabel}
        className={cn(
          // overflow-x:auto forces overflow-y to compute to auto as well, so this
          // viewport clips on all four sides — the padding below is the gutter that
          // keeps card shadows off those clip edges, since anything that reaches
          // past them gets sliced into a hard line. Budget per side, worst case,
          // against the MEASURED bleed of --shadow-lift (see globals.css; the
          // painted blur reaches about a full blur radius, not half of one):
          //   top     6 (hover:-translate-y-1.5) + 4 (focus ring + offset) = 10 -> pt-4
          //   bottom 28 (--shadow-lift) - 6 (hover lift) + 4 (ring)        = 26 -> pb-8
          //   left   13 (--shadow-lift) + 4 (ring)                         = 17 -> pl-5
          // The negative margin pulls the viewport back out by the horizontal
          // padding so the cards stay aligned with the rest of the section (and the
          // item width is unchanged), and scroll-px keeps snap alignment on the
          // padded edge. Revisit these if the shadow ramp in globals.css changes.
          // pr-5 is deliberately paired with the trailing spacer below: browsers
          // leave a scroll container's end padding out of the scrollable overflow
          // area, so on its own it would vanish the moment the track is scrolled
          // to the end. It only covers the non-scrollable case (all items fit).
          // snap-x/snap-mandatory belong here rather than on the track: scroll
          // snapping is a property of the scroll container, so on the track it is
          // inert. With it on the viewport, a carousel always comes to rest on a
          // card boundary — which also means no card is ever left half-clipped by
          // the viewport edge. The item widths tile the viewport exactly at every
          // breakpoint, so the last snap position lands on the trailing gutter.
          "overflow-x-auto snap-x snap-mandatory px-5 -mx-5 scroll-px-5 pt-4 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
      >
        <div ref={contentRef} className={cn("flex gap-6", trackClassName)}>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                // Below md a card takes 86% of the viewport so the next one
                // peeks in from the right — the peek is what tells a phone
                // reader the row scrolls, and it caps how tall a full-bleed
                // portrait image can get.
                // The trailing fraction is the whole point of these numbers: at
                // every breakpoint the track is sized so the NEXT card is
                // partly visible. Phones already did this (86%); md and lg were
                // set to exactly two and three across, which lands the last card
                // flush with the right edge and leaves nothing to suggest the
                // row scrolls at all — on a six-item gallery that hid half the
                // photographs behind a 3px progress bar.
                "min-w-0 shrink-0 grow-0 basis-[86%] snap-start md:basis-[calc((100%-2.25rem)/2.35)] lg:basis-[calc((100%-4.5rem)/3.35)]",
                itemClassName,
              )}
            >
              {item}
            </div>
          ))}
          {/* Trailing shadow gutter. The viewport's pr-5 is dropped from the
              scrollable overflow area, so at the end of the scroll the last card's
              shadow would be clipped into a hard vertical line. A real (if empty)
              flex item is part of the content, so its width survives. -ms-6 cancels
              the track gap in front of it, leaving exactly pl-5's worth of room. */}
          <div aria-hidden="true" className="-ms-6 w-5 shrink-0" />
        </div>
      </div>
      {showScrollIndicator ? (
        <div
          ref={indicatorTrackRef}
          aria-hidden="true"
          className={cn(
            // Capped width: stretched across the full section this read as a
            // horizontal rule closing the section rather than as a scroll
            // position for the track above it.
            "max-w-56 overflow-hidden rounded-full transition-all duration-200",
            indicatorTone === "dark" ? "bg-white/12" : "bg-(--color-border-strong)",
            isScrollable ? "mt-3 h-[3px] opacity-100" : "mt-0 h-0 opacity-0",
          )}
        >
          <span
            ref={indicatorThumbRef}
            className={cn(
              "block h-full rounded-full will-change-transform",
              indicatorTone === "dark" ? "bg-(--color-accent)" : "bg-(--color-brand)",
            )}
            style={{ width: "100%", transform: "translate3d(0, 0, 0)" }}
          />
        </div>
      ) : null}
    </div>
  );
}
