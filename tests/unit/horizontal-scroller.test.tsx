import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HorizontalScroller } from "@/components/ui/horizontal-scroller";

describe("HorizontalScroller", () => {
  it("renders items inside a labeled horizontal scroll region", () => {
    const { container } = render(
      <HorizontalScroller ariaLabel="Featured items">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </HorizontalScroller>,
    );

    expect(screen.getByRole("region", { name: "Featured items" })).toBeInTheDocument();
    expect(container.querySelectorAll(".snap-start")).toHaveLength(3);
  });
});
