import Link from "next/link";

import { DesktopNavLinks } from "@/components/layout/desktop-nav-links";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { buttonStyles } from "@/components/ui/button";
import { BUY_MEMBERSHIP_ROUTE, NAV_ITEMS, SECTION_CONTAINER_CLASS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  currentPath: "/" | "/buy-membership";
};

type ResolvedLink = {
  label: string;
  href: string;
};

function resolveLinks(currentPath: SiteHeaderProps["currentPath"]): ResolvedLink[] {
  return NAV_ITEMS.map((item) => {
    if (item.kind === "route") {
      return { label: item.label, href: item.href };
    }

    const href = currentPath === "/" ? item.href : `/${item.href}`;
    return { label: item.label, href };
  });
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const navLinks = resolveLinks(currentPath);
  const isHomeRoute = currentPath === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-white/95 backdrop-blur">
      <div className={cn(SECTION_CONTAINER_CLASS, "flex h-20 items-center justify-between gap-4 sm:h-24 sm:gap-6") }>
        <Link href="/" className="min-w-0 flex items-center gap-3" aria-label="Naomi Gym home">
          <span className="truncate text-2xl font-bold leading-none tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <DesktopNavLinks links={navLinks} isHomeRoute={isHomeRoute} />
        </nav>

        <div className="hidden md:block">
          <Link href={BUY_MEMBERSHIP_ROUTE} className={buttonStyles({ variant: "primary", size: "lg", className: "whitespace-nowrap" })}>
            Buy membership
          </Link>
        </div>

        <MobileNavDrawer links={navLinks} />
      </div>
    </header>
  );
}
