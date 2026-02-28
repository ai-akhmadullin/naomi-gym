import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CheckoutStubButton } from "@/components/buy-membership/checkout-stub-button";

describe("CheckoutStubButton", () => {
  it("returns stub result message after click", async () => {
    const user = userEvent.setup();

    render(
      <CheckoutStubButton
        planId="monthly"
        planName="Monthly"
        ctaLabel="Choose Monthly"
        highlight
      />,
    );

    await user.click(screen.getByRole("button", { name: "Start checkout for Monthly plan" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("Checkout is currently in preview mode.");
    });
  });
});
