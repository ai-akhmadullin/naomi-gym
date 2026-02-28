import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaqSection } from "@/components/sections/faq-section";

describe("FaqSection", () => {
  it("toggles expanded accordion item", async () => {
    const user = userEvent.setup();

    render(
      <FaqSection
        faqs={[
          { id: "one", question: "What are your operating hours?", answer: "Hours answer" },
          { id: "two", question: "Do you offer day passes?", answer: "Day pass answer" },
        ]}
      />,
    );

    const first = screen.getByRole("button", { name: "What are your operating hours?" });
    const second = screen.getByRole("button", { name: "Do you offer day passes?" });

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "false");

    await user.click(second);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
