import Link from "next/link";

import { DesktopNavLinks } from "@/components/layout/desktop-nav-links";
import { HeaderChatMenu } from "@/components/layout/header-chat-menu";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { StickyHeaderShell } from "@/components/layout/sticky-header-shell";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SECTION_CONTAINER_CLASS, SITE_NAME } from "@/lib/constants";
import { getLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/marketing";

type SiteHeaderProps = {
  locale: Locale;
  currentPath: string;
  navItems: NavItem[];
  joinLabel: string;
  chatLabel: string;
  primaryNavLabel: string;
  languageSwitcherLabel: string;
  localeNames: Record<Locale, string>;
  chatCopy: {
    chatLabel: string;
    callLabel: string;
    zaloLabel: string;
    whatsappLabel: string;
    messengerLabel: string;
  };
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
  joinLabel,
  chatLabel,
  primaryNavLabel,
  languageSwitcherLabel,
  localeNames,
  chatCopy,
  mobileNavCopy,
}: SiteHeaderProps) {
  const navLinks = resolveLinks(locale, currentPath, navItems);
  const homePath = getLocalePath(locale);
  const isHomeRoute = currentPath === homePath;
  const joinHref = isHomeRoute ? "#contact" : `${homePath}#contact`;

  return (
    <StickyHeaderShell>
      <div
        className={cn(
          SECTION_CONTAINER_CLASS,
          "flex h-18 items-center justify-between gap-4 sm:h-20 sm:gap-6",
          "lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center",
        )}
      >
        <Link
          href={homePath}
          className="group flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-4"
          aria-label={`${SITE_NAME} home`}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] bg-(--color-brand) text-white transition-transform duration-300 group-hover:-rotate-6">
            <Icon name="dumbbell" className="h-5 w-5" />
          </span>
          <span className="font-display whitespace-nowrap text-xl font-extrabold tracking-[-0.03em] text-foreground sm:text-[1.4rem]">
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

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {/* The chat channels, which used to be a fixed bubble floating over
              the page. See HeaderChatMenu.
              xl and up only, and that is a measurement rather than a taste: at
              lg the three columns already come to 928px of the 944 available in
              Vietnamese, so anything added here does not shrink the nav, it
              overlaps it — the centre column is justify-self-center inside a
              minmax(0,1fr) track, so an overflow spills over both neighbours
              instead of clipping. Between lg and xl the header is exactly what
              it was, and the same four channels are two clicks away in the
              contact section. */}
          <div className="hidden items-center gap-3 xl:flex">
            <HeaderChatMenu label={chatLabel} copy={chatCopy} />
            <span aria-hidden="true" className="h-5 w-px bg-(--color-border-strong)" />
          </div>
          {/* Plain anchor: in-page hash scrolling is more reliable than next/link
              for same-page anchors, and still navigates correctly from subpages.
              elevation="flat" for the same reason as the phone's bottom bar: a
              button living inside a persistent bar casts a shadow the bar then
              clips at its own bottom edge. Once scrolled, the header is glass
              over whatever is passing underneath and the green shadow read as a
              smear across it; even at the top of the page, where the header is
              paper, the shadow was being cut off 18px down. */}
          <a
            href={joinHref}
            className={buttonStyles({
              variant: "primary",
              size: "md",
              elevation: "flat",
              className: "whitespace-nowrap",
            })}
          >
            {joinLabel}
            <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <MobileNavDrawer
          locale={locale}
          currentPath={currentPath}
          links={navLinks}
          joinLabel={joinLabel}
          joinHref={joinHref}
          languageSwitcherLabel={languageSwitcherLabel}
          localeNames={localeNames}
          openLabel={mobileNavCopy.openLabel}
          closeLabel={mobileNavCopy.closeLabel}
          menuTitle={mobileNavCopy.menuTitle}
          menuDescription={mobileNavCopy.menuDescription}
          navLabel={mobileNavCopy.navLabel}
        />
      </div>
    </StickyHeaderShell>
  );
}
