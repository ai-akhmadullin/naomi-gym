import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlansGrid } from "@/components/buy-membership/plans-grid";
import { ScrollToTopOnMount } from "@/components/ui/scroll-to-top-on-mount";
import { getDictionary } from "@/content/site";
import { SECTION_CONTAINER_CLASS, SITE_NAME } from "@/lib/constants";
import { assertLocale, getLocalePath, getPolicyPath, type PolicySlug } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.buyMembership.title,
    description: dictionary.buyMembership.subtitle,
    openGraph: {
      title: `${dictionary.buyMembership.title} | ${SITE_NAME}`,
      description: dictionary.buyMembership.subtitle,
    },
  };
}

export default async function LocalizedBuyMembershipPage({ params }: PageProps) {
  const locale = assertLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const currentPath = getLocalePath(locale, "/buy-membership");
  const policyLinks = dictionary.policies.links.map((policy) => ({
    ...policy,
    href: getPolicyPath(locale, policy.id as PolicySlug),
  }));

  return (
    <>
      <ScrollToTopOnMount />
      <SiteHeader
        locale={locale}
        currentPath={currentPath}
        navItems={dictionary.navItems}
        buyMembershipLabel={dictionary.header.buyMembership}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />
      <main className="bg-(--color-bg-muted) py-14 sm:py-20">
        <div className={cn(SECTION_CONTAINER_CLASS, "space-y-8 sm:space-y-10")}>
          <header className="space-y-4 text-center">
            <h1 className="text-balance text-4xl font-bold text-foreground sm:text-6xl lg:text-7xl">
              {dictionary.buyMembership.title}
            </h1>
            <p className="mx-auto max-w-3xl text-pretty text-lg text-(--color-text-muted) sm:text-2xl">
              {dictionary.buyMembership.subtitle}
            </p>
          </header>

          <PlansGrid
            plans={dictionary.home.pricing.plans}
            highlightLabel={dictionary.home.pricing.highlightLabel}
            checkoutCopy={dictionary.checkout}
          />
        </div>
      </main>
      <SiteFooter
        locale={locale}
        navItems={dictionary.navItems}
        policyLinks={policyLinks}
        siteTagline={dictionary.siteTagline}
        quickLinksTitle={dictionary.footer.quickLinksTitle}
        policiesTitle={dictionary.footer.policiesTitle}
        contactTitle={dictionary.footer.contactTitle}
        facebookLabel={dictionary.footer.facebookLabel}
        instagramLabel={dictionary.footer.instagramLabel}
        buyMembershipLabel={dictionary.footer.buyMembership}
      />
    </>
  );
}
