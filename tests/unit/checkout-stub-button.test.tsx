import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CheckoutStubButton } from "@/components/buy-membership/checkout-stub-button";
import * as utils from "@/lib/utils";

describe("CheckoutStubButton", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it("shows a safe fallback message when checkout fails", async () => {
    vi.spyOn(utils, "createCheckoutSessionStub").mockRejectedValue(new Error("boom"));

    const user = userEvent.setup();

    render(
      <CheckoutStubButton
        planId="daily"
        planName="Daily"
        ctaLabel="Choose Daily"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Start checkout for Daily plan" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Checkout is temporarily unavailable. Please try again in a moment.",
      );
    });
  });
});
