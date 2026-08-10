import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_RAW,
  SECTION_CONTAINER_CLASS,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SITE_NAME,
} from "@/lib/constants";
import { getLocalePath, getPolicyPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/marketing";

type SiteFooterProps = {
  locale: Locale;
  isHomePage?: boolean;
  navItems: NavItem[];
  siteTagline: string;
  quickLinksTitle: string;
  contactTitle: string;
  privacyLabel: string;
  facebookLabel: string;
  instagramLabel: string;
  joinLabel: string;
  rightsLabel: string;
};

function resolveSectionHref(locale: Locale, isHomePage: boolean, href: string) {
  return isHomePage ? href : `${getLocalePath(locale)}${href}`;
}

export function SiteFooter({
  locale,
  isHomePage = false,
  navItems,
  siteTagline,
  quickLinksTitle,
  contactTitle,
  privacyLabel,
  facebookLabel,
  instagramLabel,
  joinLabel,
  rightsLabel,
}: SiteFooterProps) {
  const joinHref = resolveSectionHref(locale, isHomePage, "#contact");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[image:var(--gradient-ink)] text-white">
      <div
        className={cn(
          SECTION_CONTAINER_CLASS,
          // Extra bottom space on mobile so the sticky Join bar never covers content.
          "pt-16 pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pb-[calc(2.5rem+env(safe-area-inset-bottom))]",
        )}
      >
        {/* Columns */}
        {/* Equal thirds. Weighting the brand column at 1.3fr gave it half again
            as much width as its content (a wordmark, one line of tagline and two
            icons) could fill, opening a ~370px void before "Quick links". */}
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-xs)] bg-(--color-brand) text-white">
                <Icon name="dumbbell" className="h-5 w-5" />
              </span>
              <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">{SITE_NAME}</p>
            </div>
            <p className="mt-5 max-w-xs leading-relaxed text-white/55">{siteTagline}</p>
            <div className="mt-7 flex gap-2.5">
              {[
                { href: SOCIAL_FACEBOOK_URL, label: facebookLabel, icon: "facebook" as const },
                { href: SOCIAL_INSTAGRAM_URL, label: instagramLabel, icon: "instagram" as const },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition-colors hover:border-(--color-accent) hover:bg-(--color-accent) hover:text-(--color-accent-ink)"
                >
                  <Icon name={social.icon} className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/40">{quickLinksTitle}</h3>
            {/* Two columns: as one list this ran eight rows deep and left the
                two neighbouring columns looking unfinished beside it. */}
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem] text-white/70 sm:grid-cols-1 lg:grid-cols-2">
              {navItems
                .filter((item) => item.kind === "section")
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={resolveSectionHref(locale, isHomePage, item.href)}
                      className="link-underline transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <a href={joinHref} className="font-semibold text-(--color-accent) transition-opacity hover:opacity-80">
                  {joinLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/40">{contactTitle}</h3>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-white/70">
              <li className="flex items-start gap-3">
                <Icon name="map-pin" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-(--color-accent)" />
                <span className="wrap-break-word">
                  {CONTACT_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-4.5 w-4.5 shrink-0 text-(--color-accent)" />
                <a href={`tel:${CONTACT_PHONE_RAW}`} className="tabular-nums transition-colors hover:text-white">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Left-aligned so the fixed chat button (bottom-right) never covers the link. */}
        <div className="mt-14 flex flex-col gap-x-6 gap-y-2 border-t border-white/10 pt-7 text-[0.85rem] text-white/40 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_NAME}. {rightsLabel}
          </p>
          <Link href={getPolicyPath(locale, "privacy")} className="link-underline transition-colors hover:text-white">
            {privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
