/* eslint-disable @next/next/no-img-element */
"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/marketing";

type ReviewsSectionProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  scrollerLabel: string;
  starsLabelTemplate: string;
  googleReviewLabel: string;
  allReviewsLabel: string;
  allReviewsUrl: string;
  reviews: Review[];
};

/**
 * A quote that fades out ONLY when it is actually cut off.
 *
 * The excerpt is a max-height plus a fade-to-transparent mask. Applying that
 * mask unconditionally faded the last line of every review, including the
 * three-line ones that fit with room to spare — so a complete sentence looked
 * truncated and the card looked broken. CSS can't ask "did this overflow?", so
 * the answer is measured: scrollHeight exceeding clientHeight means the box is
 * clipping, and only then is the mask applied.
 *
 * Re-measured on resize because the same text wraps to a different number of
 * lines as the card width changes, so a quote can cross the threshold in both
 * directions without its content ever changing.
 */
function ClampedQuote({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const measure = () => setIsClamped(element.scrollHeight - element.clientHeight > 1);
    measure();

    // jsdom has no ResizeObserver; the initial measurement above still runs.
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [children]);

  return (
    <p
      ref={ref}
      className={cn(
        className,
        isClamped && "[mask-image:linear-gradient(to_bottom,black_74%,transparent)]",
      )}
    >
      {children}
    </p>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-(--color-brand)", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, position) => (
        <Icon
          key={position}
          name="star"
          className={cn("h-4 w-4", position >= rating && "text-(--color-border-strong)")}
        />
      ))}
    </span>
  );
}

/**
 * A quote clipped by ClampedQuote has to end somewhere a reader can go, or the
 * fade reads as a bug rather than as an excerpt. Two things do that here: a
 * rule, which turns the clip into an edge rather than a failure, and the
 * "Google review" attribution, which says the cut text is a real thing living
 * somewhere else.
 *
 * There is deliberately no link. Every review in the set carries the SAME
 * sourceUrl — the gym's Google listing — so a per-review link printed one
 * destination four or five times across a row, and keeping it on the featured
 * quote alone still put two links to one page within a screen of each other.
 * The section heading's "See all reviews on Google" is the single way out, and
 * it is the one that reads honestly: the listing is a listing, not this quote.
 */
function ReviewFooter({
  review,
  googleReviewLabel,
  size = "md",
  className,
}: {
  review: Review;
  googleReviewLabel: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-t border-(--color-border)",
        size === "lg" ? "pt-7" : "pt-5",
        className,
      )}
    >
      <Attribution review={review} googleReviewLabel={googleReviewLabel} size={size} />
    </div>
  );
}

function Attribution({
  review,
  googleReviewLabel,
  size = "md",
  subline,
}: {
  review: Review;
  googleReviewLabel: string;
  size?: "md" | "lg";
  /** Replaces the default "Google review" line beneath the name. */
  subline?: ReactNode;
}) {
  const avatarSize = size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div className="flex items-center gap-3.5">
      {review.avatar ? (
        <img
          src={review.avatar}
          alt=""
          width={48}
          height={48}
          className={cn("shrink-0 rounded-full object-cover ring-1 ring-(--color-border)", avatarSize)}
          loading="lazy"
        />
      ) : (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full bg-(--color-brand-tint) font-display font-bold text-(--color-brand)",
            avatarSize,
          )}
          aria-hidden="true"
        >
          {review.memberName.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="min-w-0">
        <p
          className={cn(
            "truncate font-semibold text-foreground",
            size === "lg" ? "text-[1.05rem]" : "text-[0.95rem]",
          )}
        >
          {review.memberName}
        </p>
        {subline ?? (
          review.source === "google" ? (
            <p className="text-[0.8rem] text-(--color-text-faint)">{googleReviewLabel}</p>
          ) : null
        )}
      </div>
    </div>
  );
}

export function ReviewsSection({
  eyebrow,
  index,
  title,
  subtitle,
  scrollerLabel,
  starsLabelTemplate,
  googleReviewLabel,
  allReviewsLabel,
  allReviewsUrl,
  reviews,
}: ReviewsSectionProps) {
  const [displayReviews, setDisplayReviews] = useState<Review[]>(reviews);

  useEffect(() => {
    setDisplayReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGoogleReviews() {
      try {
        const response = await fetch("/api/reviews", {
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { reviews?: Review[] };
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setDisplayReviews(data.reviews);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        // Keep initial local reviews as fallback when request fails.
      }
    }

    loadGoogleReviews();
    return () => {
      controller.abort();
    };
  }, []);

  const [featured, ...rest] = displayReviews;

  const renderCard = (review: Review) => (
    <Card key={review.id} hover className="flex h-full flex-col p-6">
      <Stars rating={review.rating} />
      <span className="sr-only">{starsLabelTemplate.replace("{rating}", String(review.rating))}</span>
      <blockquote className="mt-4 mb-6">
        <ClampedQuote className="max-h-[11.5em] overflow-hidden text-pretty text-[0.98rem] leading-[1.65] text-(--color-text-muted)">
          {review.quote}
        </ClampedQuote>
      </blockquote>
      {/* mt-auto only — cn is a plain joiner, so a second margin utility here
          would not override this one, it would race it in stylesheet order. The
          gap above the rule is the blockquote's mb-6. */}
      <ReviewFooter review={review} googleReviewLabel={googleReviewLabel} className="mt-auto" />
    </Card>
  );

  return (
    <SectionShell id="reviews" tone="paper" space="md">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={eyebrow}
          index={index}
          title={title}
          subtitle={subtitle}
          flush
          className="max-w-2xl"
        />

        {/* A link out, not a score.
            This slot held a computed average — "5.0" over the handful of reviews
            the page happens to display. Every stored review is genuinely
            five-star, so the figure was arithmetically true and still misleading:
            the gym's actual Google rating is lower and is visible in the map
            embed one section above, so a reader who checked would find the site
            flattering itself. Sending them to the real listing makes the same
            point and cannot go stale. */}
        <a
          href={allReviewsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex shrink-0 items-center gap-2.5 self-start text-[0.95rem] font-semibold text-(--color-brand) lg:self-auto"
        >
          {/* No stars here either. A row of five filled stars beside the label
              implies a five-star rating just as plainly as the number did. */}
          <span className="link-underline">{allReviewsLabel}</span>
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>

      {/* The full-width featured quote is a desktop composition: there it is
          visibly wider than the scroller cards beneath it, so it reads as a
          pull-quote. On a phone every card is the same width, so a "featured"
          card followed by identical-looking cards just reads as one review
          weirdly outside the carousel — below md the featured review joins the
          carousel as its first card instead. */}
      {featured ? (
        <figure className="relative mt-12 hidden overflow-hidden rounded-[var(--radius-xl)] border border-(--color-border) bg-white p-8 shadow-(--shadow-soft) sm:p-12 md:block">
          <Icon
            name="quote"
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-32 w-32 text-(--color-brand)/[0.06]"
          />
          <div className="relative z-10">
            <Stars
              rating={featured.rating}
              className="h-5"
            />
            <span className="sr-only">{starsLabelTemplate.replace("{rating}", String(featured.rating))}</span>
            {/* Long reviews are excerpted by height and faded out, NOT by
                -webkit-line-clamp. Clamping appends a "…", and an ellipsis
                landing mid-sentence inside a fade reads as a rendering fault;
                a clean fade reads as a deliberate pull-quote. The max-height is
                expressed in em so it tracks the font size across breakpoints —
                6 lines at leading 1.45. */}
            <blockquote className="relative mt-6 max-w-4xl">
              <ClampedQuote className="max-h-[8.7em] overflow-hidden text-pretty font-display text-[length:var(--step-2)] font-semibold leading-[1.45] tracking-[-0.02em] text-foreground">
                {featured.quote}
              </ClampedQuote>
            </blockquote>
            <figcaption className="mt-8">
              <ReviewFooter review={featured} googleReviewLabel={googleReviewLabel} size="lg" />
            </figcaption>
          </div>
        </figure>
      ) : null}

      {displayReviews.length > 0 ? (
        <div className="mt-6 md:hidden">
          <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator>
            {displayReviews.map(renderCard)}
          </HorizontalScroller>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-5 hidden md:block">
          <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator>
            {rest.map(renderCard)}
          </HorizontalScroller>
        </div>
      ) : null}
    </SectionShell>
  );
}
