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
}>;

export function HorizontalScroller({
  ariaLabel,
  className,
  viewportClassName,
  trackClassName,
  itemClassName,
  showScrollIndicator = false,
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
          "overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName,
        )}
      >
        <div
          ref={contentRef}
          className={cn(
            "grid grid-flow-col auto-cols-[100%] gap-6 snap-x snap-mandatory md:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3rem)/3)]",
            trackClassName,
          )}
        >
          {items.map((item, index) => (
            <div key={index} className={cn("min-w-0 snap-start", itemClassName)}>
              {item}
            </div>
          ))}
        </div>
      </div>
      {showScrollIndicator ? (
        <div
          ref={indicatorTrackRef}
          aria-hidden="true"
          className={cn(
            "overflow-hidden rounded-full bg-(--color-border) transition-all duration-200",
            isScrollable ? "mt-4 h-1.5 opacity-100" : "mt-0 h-0 opacity-0",
          )}
        >
          <span
            ref={indicatorThumbRef}
            className="block h-full rounded-full bg-(--color-brand) will-change-transform"
            style={{ width: "100%", transform: "translate3d(0, 0, 0)" }}
          />
        </div>
      ) : null}
    </div>
  );
}
