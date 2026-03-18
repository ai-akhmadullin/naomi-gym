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
    <ul className="flex items-center justify-center gap-4 xl:gap-5 2xl:gap-7">
      {links.map((item) => {
        const isActive = isHomeRoute && activeHref === item.href;

        return (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={(event) => onNavClick(item.href, event)}
              className={cn(
                "whitespace-nowrap text-[1rem] font-semibold transition hover:text-(--color-brand) xl:text-[1.06rem] 2xl:text-lg",
                isActive ? "text-(--color-brand)" : "text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
