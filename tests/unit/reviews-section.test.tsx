import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ReviewsSection } from "@/components/sections/reviews-section";
import { getDictionary } from "@/content/site";
import type { Review } from "@/types/marketing";

const FIRST_REVIEWS: Review[] = [
  {
    id: "review-a",
    memberName: "Alice",
    quote: "First quote",
    rating: 5,
    source: "local",
  },
];

const SECOND_REVIEWS: Review[] = [
  {
    id: "review-b",
    memberName: "Bob",
    quote: "Second quote",
    rating: 4,
    source: "local",
  },
];

describe("ReviewsSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("syncs visible reviews when fallback props change", () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: false } as Response);
    const dictionary = getDictionary("en");

    const { rerender } = render(
      <ReviewsSection
        title={dictionary.home.reviews.title}
        subtitle={dictionary.home.reviews.subtitle}
        scrollerLabel={dictionary.home.reviews.scrollerLabel}
        starsLabelTemplate={dictionary.home.reviews.starsLabelTemplate}
        googleReviewLabel={dictionary.home.reviews.googleReview}
        allReviewsLabel={dictionary.home.reviews.allReviewsLabel}
        allReviewsUrl={dictionary.home.location.info.directionsUrl}
        reviews={FIRST_REVIEWS}
      />,
    );

    // A review renders twice: once in the desktop featured slot, once in the
    // mobile carousel (the breakpoint chooses which is visible).
    expect(screen.getAllByText("Alice").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Bob")).toHaveLength(0);

    rerender(
      <ReviewsSection
        title={dictionary.home.reviews.title}
        subtitle={dictionary.home.reviews.subtitle}
        scrollerLabel={dictionary.home.reviews.scrollerLabel}
        starsLabelTemplate={dictionary.home.reviews.starsLabelTemplate}
        googleReviewLabel={dictionary.home.reviews.googleReview}
        allReviewsLabel={dictionary.home.reviews.allReviewsLabel}
        allReviewsUrl={dictionary.home.location.info.directionsUrl}
        reviews={SECOND_REVIEWS}
      />,
    );

    expect(screen.queryAllByText("Alice")).toHaveLength(0);
    expect(screen.getAllByText("Bob").length).toBeGreaterThan(0);
  });
});
