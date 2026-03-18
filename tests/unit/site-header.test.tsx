import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/content/site";

describe("SiteHeader", () => {
  const dictionary = getDictionary("en");

  it("renders section links with home anchors on the home route", () => {
    render(
      <SiteHeader
        locale="en"
        currentPath="/en"
        navItems={dictionary.navItems}
        buyMembershipLabel={dictionary.header.buyMembership}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "#home");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /buy membership/i })).toHaveAttribute("href", "/en/buy-membership");
  });

  it("rewrites section links to root anchors on non-home routes", () => {
    render(
      <SiteHeader
        locale="en"
        currentPath="/en/policies/privacy"
        navItems={dictionary.navItems}
        buyMembershipLabel={dictionary.header.buyMembership}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en#home");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/en#pricing");
  });
});
