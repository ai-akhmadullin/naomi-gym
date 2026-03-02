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
  reviews: Review[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
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
    <SectionShell id="reviews">
      <SectionHeading
        title="What Our Members Say"
        subtitle="Honest feedback from people who train with us"
        align="center"
      />

      <HorizontalScroller ariaLabel="Member reviews" showScrollIndicator>
        {displayReviews.map((review) => (
          <Card key={review.id} className="h-full p-5 shadow-none sm:p-6">
            <div className="mb-5 flex gap-2 text-(--color-brand)" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: review.rating }).map((_, index) => (
                <Icon key={`${review.id}-${index}`} name="star" className="h-5 w-5 sm:h-6 sm:w-6" />
              ))}
            </div>
            <blockquote className="text-pretty text-lg leading-relaxed text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden sm:text-xl">
              {review.quote}
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.memberName}
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-full border border-(--color-border) object-cover sm:h-14 sm:w-14"
                  loading="lazy"
                />
              ) : (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg-muted) text-lg font-semibold text-(--color-text-muted) sm:h-14 sm:w-14 sm:text-xl">
                  {review.memberName.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-xl font-semibold text-foreground sm:text-2xl">{review.memberName}</p>
                {review.source === "google" ? (
                  <p className="text-base text-(--color-text-muted) sm:text-xl">
                    {review.sourceUrl ? (
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-2 hover:text-(--color-brand)"
                      >
                        Read on Google
                      </a>
                    ) : (
                      "Google review"
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
