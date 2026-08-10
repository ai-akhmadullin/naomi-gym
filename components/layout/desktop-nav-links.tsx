"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
};

type DesktopNavLinksProps = {
  links: NavLink[];
  isHomeRoute: boolean;
};

export function DesktopNavLinks({ links, isHomeRoute }: DesktopNavLinksProps) {
  const sectionIds = useMemo(
    () =>
      isHomeRoute
        ? links
            .map((link) => link.href)
            .filter((href) => href.startsWith("#"))
            .map((href) => href.slice(1))
        : [],
    [isHomeRoute, links],
  );
  const [activeHref, setActiveHref] = useState<string>(isHomeRoute ? "#home" : "");

  useEffect(() => {
    if (!isHomeRoute) {
      return;
    }

    const onScroll = () => {
      const pageIsScrollable = document.documentElement.scrollHeight > window.innerHeight;
      const isNearPageBottom =
        pageIsScrollable &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (isNearPageBottom) {
        const lastSectionId = sectionIds[sectionIds.length - 1];
        if (lastSectionId) {
          setActiveHref(`#${lastSectionId}`);
          return;
        }
      }

      let current = sectionIds[0] ?? "home";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) {
          continue;
        }

        const offsetTop = section.getBoundingClientRect().top;
        if (offsetTop <= 160) {
          current = sectionId;
        }
      }

      setActiveHref(`#${current}`);
    };

    const onHashChange = () => {
      if (window.location.hash) {
        setActiveHref(window.location.hash);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [isHomeRoute, sectionIds]);

  const onNavClick = (href: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHomeRoute || !href.startsWith("#")) {
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const section = document.getElementById(href.slice(1));
    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (window.location.hash !== href) {
      window.history.replaceState(null, "", href);
    }

    setActiveHref(href);
  };

  return (
    <ul className="flex items-center justify-center gap-1 xl:gap-1.5">
      {links.map((item) => {
        const isActive = isHomeRoute && activeHref === item.href;

        return (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={(event) => onNavClick(item.href, event)}
              className={cn(
                "relative whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2",
                isActive ? "text-(--color-brand)" : "text-(--color-text-muted) hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
              {/* The marker scales from the centre rather than fading in, so
                  moving between sections reads as one indicator travelling
                  along the nav instead of separate dashes blinking on and off. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-full bg-(--color-brand) transition-transform duration-300 ease-out",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
