import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { getDictionary } from "@/content/site";

describe("MobileNavDrawer", () => {
  it("opens, focuses close button, and closes on Escape", async () => {
    const user = userEvent.setup();
    const dictionary = getDictionary("en");

    render(
      <MobileNavDrawer
        locale="en"
        currentPath="/en"
        links={[
          { label: "Home", href: "#home" },
          { label: "Pricing", href: "#pricing" },
        ]}
        buyMembershipLabel={dictionary.header.buyMembership}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        openLabel={dictionary.mobileNav.openLabel}
        closeLabel={dictionary.mobileNav.closeLabel}
        menuTitle={dictionary.mobileNav.menuTitle}
        menuDescription={dictionary.mobileNav.menuDescription}
        navLabel={dictionary.mobileNav.navLabel}
      />,
    );

    const trigger = screen.getByRole("button", { name: dictionary.mobileNav.openLabel });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    expect(screen.getByRole("button", { name: dictionary.mobileNav.closeLabel })).toHaveFocus();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    expect(trigger).toHaveFocus();
  });
});
