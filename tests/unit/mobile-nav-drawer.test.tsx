import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";

describe("MobileNavDrawer", () => {
  it("opens, focuses close button, and closes on Escape", async () => {
    const user = userEvent.setup();

    render(
      <MobileNavDrawer
        links={[
          { label: "Home", href: "#home" },
          { label: "Pricing", href: "#pricing" },
        ]}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveFocus();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    expect(trigger).toHaveFocus();
  });
});
