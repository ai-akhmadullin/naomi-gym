import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DesktopNavLinks } from "@/components/layout/desktop-nav-links";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Pricing", href: "#pricing" },
];

function appendSection(id: string, top: number) {
  const section = document.createElement("section");
  section.id = id;
  section.getBoundingClientRect = () =>
    ({
      top,
      bottom: top + 100,
      left: 0,
      right: 0,
      width: 100,
      height: 100,
      x: 0,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect;
  document.body.appendChild(section);
}

describe("DesktopNavLinks", () => {
  afterEach(() => {
    document.querySelectorAll("section[id]").forEach((section) => section.remove());
    window.location.hash = "";
  });

  it("highlights the hash link when the url hash changes", () => {
    appendSection("home", 0);
    appendSection("pricing", 400);
    render(<DesktopNavLinks links={LINKS} isHomeRoute />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Pricing" })).not.toHaveAttribute("aria-current");

    act(() => {
      window.location.hash = "#pricing";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("highlights section link on scroll position", () => {
    appendSection("home", -300);
    appendSection("pricing", 400);
    render(<DesktopNavLinks links={LINKS} isHomeRoute />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");

    const pricing = document.getElementById("pricing");
    if (!pricing) {
      throw new Error("pricing section not found");
    }

    pricing.getBoundingClientRect = () =>
      ({
        top: 120,
        bottom: 220,
        left: 0,
        right: 0,
        width: 100,
        height: 100,
        x: 0,
        y: 120,
        toJSON: () => ({}),
      }) as DOMRect;

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});
