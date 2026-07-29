import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
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
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
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
  ctaTitle,
  ctaText,
  ctaButton,
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
          "pt-14 pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pb-[calc(2.5rem+env(safe-area-inset-bottom))]",
        )}
      >
        {/* CTA band */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[image:var(--gradient-brand)] px-6 py-10 shadow-(--shadow-card) sm:px-12 sm:py-12">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">{ctaTitle}</h2>
              <p className="mt-2 max-w-xl text-base text-white/85 sm:text-lg">{ctaText}</p>
            </div>
            <a
              href={joinHref}
              className={buttonStyles({
                variant: "secondary",
                size: "lg",
                className: "shrink-0 whitespace-nowrap !text-(--color-brand)",
              })}
            >
              {ctaButton}
              <Icon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] text-white">
                <Icon name="dumbbell" className="h-5 w-5" />
              </span>
              <p className="font-display text-2xl font-extrabold">{SITE_NAME}</p>
            </div>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-white/65">{siteTagline}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIAL_FACEBOOK_URL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={facebookLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-white/80 transition hover:bg-(--color-brand) hover:text-white"
              >
                <Icon name="facebook" />
              </a>
              <a
                href={SOCIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={instagramLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-white/80 transition hover:bg-(--color-brand) hover:text-white"
              >
                <Icon name="instagram" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase tracking-wide text-white/50">{quickLinksTitle}</h3>
            <ul className="mt-4 space-y-3 text-base text-white/80">
              {navItems
                .filter((item) => item.kind === "section")
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={resolveSectionHref(locale, isHomePage, item.href)}
                      className="transition hover:text-(--color-brand-bright)"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <a href={joinHref} className="font-semibold text-white transition hover:text-(--color-brand-bright)">
                  {joinLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold uppercase tracking-wide text-white/50">{contactTitle}</h3>
            <ul className="mt-4 space-y-4 text-base text-white/80">
              <li className="flex items-start gap-3">
                <Icon name="map-pin" className="mt-1 shrink-0 text-(--color-brand-bright)" />
                <span className="wrap-break-word">
                  {CONTACT_ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="shrink-0 text-(--color-brand-bright)" />
                <a href={`tel:${CONTACT_PHONE_RAW}`} className="transition hover:text-white">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Left-aligned so the fixed chat button (bottom-right) never covers the link. */}
        <div className="mt-12 flex flex-col gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_NAME}. {rightsLabel}
          </p>
          <Link href={getPolicyPath(locale, "privacy")} className="transition hover:text-white">
            {privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
