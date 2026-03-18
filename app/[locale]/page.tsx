import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FaqSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LocationSection } from "@/components/sections/location-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TrainersSection } from "@/components/sections/trainers-section";
import { getDictionary } from "@/content/site";
import { assertLocale, getLocalePath, getPolicyPath, type PolicySlug } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: PageProps) {
  const locale = assertLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const homePath = getLocalePath(locale);
  const buyMembershipPath = getLocalePath(locale, "/buy-membership");
  const policyLinks = dictionary.policies.links.map((policy) => ({
    ...policy,
    href: getPolicyPath(locale, policy.id as PolicySlug),
  }));

  return (
    <>
      <SiteHeader
        locale={locale}
        currentPath={homePath}
        navItems={dictionary.navItems}
        buyMembershipLabel={dictionary.header.buyMembership}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />
      <main>
        <HeroSection
          titlePrefix={dictionary.home.hero.titlePrefix}
          titleHighlight={dictionary.home.hero.titleHighlight}
          description={dictionary.home.hero.description}
          primaryCta={dictionary.home.hero.primaryCta}
          primaryHref={buyMembershipPath}
          secondaryCta={dictionary.home.hero.secondaryCta}
          imageAlt={dictionary.home.hero.imageAlt}
          membersCount={dictionary.home.hero.membersCount}
          membersLabel={dictionary.home.hero.membersLabel}
        />
        <PricingSection
          title={dictionary.home.pricing.title}
          subtitle={dictionary.home.pricing.subtitle}
          plans={dictionary.home.pricing.plans}
          highlightLabel={dictionary.home.pricing.highlightLabel}
          buyMembershipHref={buyMembershipPath}
        />
        <TrainersSection
          title={dictionary.home.trainers.title}
          subtitle={dictionary.home.trainers.subtitle}
          scrollerLabel={dictionary.home.trainers.scrollerLabel}
          experienceLabel={dictionary.home.trainers.experienceLabel}
          trainers={dictionary.home.trainers.list}
        />
        <GallerySection
          title={dictionary.home.gallery.title}
          subtitle={dictionary.home.gallery.subtitle}
          scrollerLabel={dictionary.home.gallery.scrollerLabel}
          images={dictionary.home.gallery.images}
        />
        <LocationSection
          title={dictionary.home.location.title}
          subtitle={dictionary.home.location.subtitle}
          addressLabel={dictionary.home.location.addressLabel}
          hoursLabel={dictionary.home.location.hoursLabel}
          mapTitle={dictionary.home.location.mapTitle}
          directionsPrefix={dictionary.home.location.directionsPrefix}
          directionsLinkLabel={dictionary.home.location.directionsLinkLabel}
          location={dictionary.home.location.info}
        />
        <ReviewsSection
          title={dictionary.home.reviews.title}
          subtitle={dictionary.home.reviews.subtitle}
          scrollerLabel={dictionary.home.reviews.scrollerLabel}
          starsLabelTemplate={dictionary.home.reviews.starsLabelTemplate}
          readOnGoogleLabel={dictionary.home.reviews.readOnGoogle}
          googleReviewLabel={dictionary.home.reviews.googleReview}
          reviews={dictionary.home.reviews.list}
        />
        <FaqSection
          title={dictionary.home.faq.title}
          subtitle={dictionary.home.faq.subtitle}
          faqs={dictionary.home.faq.items}
        />
      </main>
      <SiteFooter
        locale={locale}
        isHomePage
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
