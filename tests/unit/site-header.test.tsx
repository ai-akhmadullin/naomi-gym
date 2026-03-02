import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";

describe("SiteHeader", () => {
  it("renders section links with home anchors on the home route", () => {
    render(<SiteHeader currentPath="/" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "#home");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "#pricing");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /buy membership/i })).toHaveAttribute("href", "/buy-membership");
  });

  it("rewrites section links to root anchors on non-home routes", () => {
    render(<SiteHeader currentPath="/policies/privacy" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#home");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/#pricing");
  });
});
