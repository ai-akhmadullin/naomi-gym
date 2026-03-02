import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ReviewsSection } from "@/components/sections/reviews-section";
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

    const { rerender } = render(<ReviewsSection reviews={FIRST_REVIEWS} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();

    rerender(<ReviewsSection reviews={SECOND_REVIEWS} />);

    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
