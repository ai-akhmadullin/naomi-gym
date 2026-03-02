import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import {
  BUY_MEMBERSHIP_ROUTE,
  CONTACT_ADDRESS_LINES,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_RAW,
  NAV_ITEMS,
  SECTION_CONTAINER_CLASS,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { PolicyLink } from "@/types/marketing";

type SiteFooterProps = {
  isHomePage?: boolean;
  policyLinks: PolicyLink[];
};

function resolveSectionHref(isHomePage: boolean, href: string) {
  return isHomePage ? href : `/${href}`;
}

export function SiteFooter({ isHomePage = false, policyLinks }: SiteFooterProps) {
  return (
    <footer className="bg-(--color-footer) py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] text-white sm:py-14 sm:pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
      <div className={cn(SECTION_CONTAINER_CLASS, "grid gap-10 md:grid-cols-2 xl:grid-cols-4") }>
        <div>
          <p className="mb-4 text-2xl font-bold sm:mb-5 sm:text-3xl">{SITE_NAME}</p>
          <p className="max-w-xs text-base leading-relaxed text-white/70 sm:text-lg">{SITE_TAGLINE}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={SOCIAL_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="rounded-lg bg-white/8 p-2.5 text-white/80 hover:text-white sm:p-3"
            >
              <Icon name="facebook" />
            </a>
            <a
              href={SOCIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="rounded-lg bg-white/8 p-2.5 text-white/80 hover:text-white sm:p-3"
            >
              <Icon name="instagram" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Quick Links</h3>
          <ul className="space-y-3 text-base text-white/80 sm:text-lg">
            {NAV_ITEMS.filter((item) => item.kind === "section").map((item) => (
              <li key={item.label}>
                <Link href={resolveSectionHref(isHomePage, item.href)} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={BUY_MEMBERSHIP_ROUTE} className="hover:text-white">
                Buy Membership
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Policies</h3>
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
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">Contact</h3>
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
