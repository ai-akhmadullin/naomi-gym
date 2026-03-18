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
import { getLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem, PolicyLink } from "@/types/marketing";

type SiteFooterProps = {
  locale: Locale;
  isHomePage?: boolean;
  navItems: NavItem[];
  policyLinks: PolicyLink[];
  siteTagline: string;
  quickLinksTitle: string;
  policiesTitle: string;
  contactTitle: string;
  facebookLabel: string;
  instagramLabel: string;
  buyMembershipLabel: string;
};

function resolveSectionHref(locale: Locale, isHomePage: boolean, href: string) {
  return isHomePage ? href : `${getLocalePath(locale)}${href}`;
}

export function SiteFooter({
  locale,
  isHomePage = false,
  navItems,
  policyLinks,
  siteTagline,
  quickLinksTitle,
  policiesTitle,
  contactTitle,
  facebookLabel,
  instagramLabel,
  buyMembershipLabel,
}: SiteFooterProps) {
  return (
    <footer className="bg-(--color-footer) py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] text-white sm:py-14 sm:pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
      <div className={cn(SECTION_CONTAINER_CLASS, "grid gap-10 md:grid-cols-2 xl:grid-cols-4") }>
        <div>
          <p className="mb-4 text-2xl font-bold sm:mb-5 sm:text-3xl">{SITE_NAME}</p>
          <p className="max-w-xs text-base leading-relaxed text-white/70 sm:text-lg">{siteTagline}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={SOCIAL_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={facebookLabel}
              className="rounded-lg bg-white/8 p-2.5 text-white/80 hover:text-white sm:p-3"
            >
              <Icon name="facebook" />
            </a>
            <a
              href={SOCIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={instagramLabel}
              className="rounded-lg bg-white/8 p-2.5 text-white/80 hover:text-white sm:p-3"
            >
              <Icon name="instagram" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">{quickLinksTitle}</h3>
          <ul className="space-y-3 text-base text-white/80 sm:text-lg">
            {navItems.filter((item) => item.kind === "section").map((item) => (
              <li key={item.label}>
                <Link href={resolveSectionHref(locale, isHomePage, item.href)} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={getLocalePath(locale, "/buy-membership")} className="hover:text-white">
                {buyMembershipLabel}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">{policiesTitle}</h3>
          <ul className="space-y-3 text-base text-white/80 sm:text-lg">
            {policyLinks.map((policy) => (
              <li key={policy.id}>
                <Link href={policy.href} className="hover:text-white">
                  {policy.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="contact" className="scroll-mt-28">
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">{contactTitle}</h3>
          <ul className="space-y-4 text-base text-white/80 sm:text-lg">
            <li className="flex items-start gap-3">
              <Icon name="map-pin" className="mt-1 text-(--color-brand)" />
              <span className="wrap-break-word">
                {CONTACT_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="phone" className="text-(--color-brand)" />
              <a href={`tel:${CONTACT_PHONE_RAW}`} className="hover:text-white">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
