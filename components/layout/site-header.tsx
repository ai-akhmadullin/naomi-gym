import Link from "next/link";

import { DesktopNavLinks } from "@/components/layout/desktop-nav-links";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { buttonStyles } from "@/components/ui/button";
import { SECTION_CONTAINER_CLASS, SITE_NAME } from "@/lib/constants";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/marketing";

type SiteHeaderProps = {
  locale: Locale;
  currentPath: string;
  navItems: NavItem[];
  buyMembershipLabel: string;
  primaryNavLabel: string;
  languageSwitcherLabel: string;
  localeNames: Record<Locale, string>;
  mobileNavCopy: {
    openLabel: string;
    closeLabel: string;
    menuTitle: string;
    menuDescription: string;
    navLabel: string;
  };
};

type ResolvedLink = {
  label: string;
  href: string;
};

function resolveLinks(locale: Locale, currentPath: string, navItems: NavItem[]): ResolvedLink[] {
  const homePath = getLocalePath(locale);

  return navItems.map((item) => {
    if (item.kind === "route") {
      return { label: item.label, href: item.href };
    }

    const href = currentPath === homePath ? item.href : `${homePath}${item.href}`;
    return { label: item.label, href };
  });
}

export function SiteHeader({
  locale,
  currentPath,
  navItems,
  buyMembershipLabel,
  primaryNavLabel,
  languageSwitcherLabel,
  localeNames,
  mobileNavCopy,
}: SiteHeaderProps) {
  const navLinks = resolveLinks(locale, currentPath, navItems);
  const homePath = getLocalePath(locale);
  const buyMembershipHref = getLocalePath(locale, "/buy-membership");
  const isHomeRoute = currentPath === homePath;

  return (
    <header className="sticky top-0 z-40 border-b border-(--color-border) bg-white/95 backdrop-blur">
      <div
        className={cn(
          SECTION_CONTAINER_CLASS,
          "flex h-20 items-center justify-between gap-4 sm:h-24 sm:gap-6",
          "lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center",
        )}
      >
        <Link href={homePath} className="flex shrink-0 items-center gap-3" aria-label={`${SITE_NAME} home`}>
          <span className="whitespace-nowrap text-[1.85rem] font-bold leading-none tracking-tight text-foreground sm:text-[2.2rem] xl:text-[2.45rem]">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden min-w-0 justify-self-center lg:block" aria-label={primaryNavLabel}>
          <div className="flex items-center gap-5 xl:gap-6">
            <DesktopNavLinks links={navLinks} isHomeRoute={isHomeRoute} />
            <LocaleSwitcher
              locale={locale}
              currentPath={currentPath}
              localeNames={localeNames}
              label={languageSwitcherLabel}
            />
          </div>
        </nav>

        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href={buyMembershipHref}
            className={buttonStyles({
              variant: "primary",
              size: "md",
              className: "whitespace-nowrap rounded-2xl px-5 text-base lg:px-6 lg:text-lg",
            })}
          >
            {buyMembershipLabel}
          </Link>
        </div>

        <MobileNavDrawer
          locale={locale}
          currentPath={currentPath}
          links={navLinks}
          buyMembershipLabel={buyMembershipLabel}
          languageSwitcherLabel={languageSwitcherLabel}
          localeNames={localeNames}
          openLabel={mobileNavCopy.openLabel}
          closeLabel={mobileNavCopy.closeLabel}
          menuTitle={mobileNavCopy.menuTitle}
          menuDescription={mobileNavCopy.menuDescription}
          navLabel={mobileNavCopy.navLabel}
        />
      </div>
    </header>
  );
}
