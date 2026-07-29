/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Review } from "@/types/marketing";

type ReviewsSectionProps = {
  title: string;
  subtitle: string;
  scrollerLabel: string;
  starsLabelTemplate: string;
  readOnGoogleLabel: string;
  googleReviewLabel: string;
  reviews: Review[];
};

export function ReviewsSection({
  title,
  subtitle,
  scrollerLabel,
  starsLabelTemplate,
  readOnGoogleLabel,
  googleReviewLabel,
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

  return (
    <SectionShell id="reviews" className="bg-(--color-bg-muted)">
      <SectionHeading title={title} subtitle={subtitle} align="center" />

      <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator>
        {displayReviews.map((review) => (
          <Card key={review.id} hover className="flex h-full flex-col p-6 sm:p-7">
            <Icon name="quote" className="h-9 w-9 text-(--color-brand)/25" />
            <div
              className="mt-3 mb-4 flex gap-1 text-(--color-brand)"
              aria-label={starsLabelTemplate.replace("{rating}", String(review.rating))}
            >
              {Array.from({ length: review.rating }).map((_, index) => (
                <Icon key={`${review.id}-${index}`} name="star" className="h-5 w-5" />
              ))}
            </div>
            <blockquote className="text-pretty text-base leading-relaxed text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:7] overflow-hidden sm:text-lg">
              {review.quote}
            </blockquote>
            <div className="mt-6 flex items-center gap-4 border-t border-(--color-border) pt-5">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.memberName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-(--color-border) object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-lg font-bold text-white">
                  {review.memberName.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-lg font-semibold text-foreground">{review.memberName}</p>
                {review.source === "google" ? (
                  <p className="text-sm text-(--color-text-muted)">
                    {review.sourceUrl ? (
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-2 hover:text-(--color-brand)"
                      >
                        {readOnGoogleLabel}
                      </a>
                    ) : (
                      googleReviewLabel
                    )}
                  </p>
                ) : null}
              </div>
            </div>
          </Card>
        ))}
      </HorizontalScroller>
    </SectionShell>
  );
}
