import { FloatingContact } from "@/components/layout/floating-contact";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StickyJoinBar } from "@/components/layout/sticky-join-bar";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { TickerBand } from "@/components/sections/ticker-band";
import { LocationSection } from "@/components/sections/location-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TrainersSection } from "@/components/sections/trainers-section";
import { getDictionary } from "@/content/site";
import { assertLocale, getLocalePath, getPolicyPath } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: PageProps) {
  const locale = assertLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        currentPath={getLocalePath(locale)}
        navItems={dictionary.navItems}
        joinLabel={dictionary.header.joinNow}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />
      <main>
        <HeroSection
          locale={locale}
          openStatus={dictionary.openStatus}
          eyebrow={dictionary.home.hero.eyebrow}
          titlePrefix={dictionary.home.hero.titlePrefix}
          titleHighlight={dictionary.home.hero.titleHighlight}
          description={dictionary.home.hero.description}
          primaryCta={dictionary.home.hero.primaryCta}
          primaryHref="#contact"
          secondaryCta={dictionary.home.hero.secondaryCta}
          stats={dictionary.home.hero.stats}
        />
        <TickerBand items={dictionary.home.ticker.items} label={dictionary.home.ticker.label} />
        <PricingSection
          eyebrow={dictionary.home.pricing.eyebrow}
          index="01"
          title={dictionary.home.pricing.title}
          subtitle={dictionary.home.pricing.subtitle}
          plans={dictionary.home.pricing.plans}
          highlightLabel={dictionary.home.pricing.highlightLabel}
          note={dictionary.home.pricing.note}
          joinHref="#contact"
        />
        <GallerySection
          eyebrow={dictionary.home.gallery.eyebrow}
          index="02"
          title={dictionary.home.gallery.title}
          subtitle={dictionary.home.gallery.subtitle}
          scrollerLabel={dictionary.home.gallery.scrollerLabel}
          images={dictionary.home.gallery.images}
          lightbox={dictionary.home.gallery.lightbox}
        />
        <TrainersSection
          eyebrow={dictionary.home.trainers.eyebrow}
          index="03"
          title={dictionary.home.trainers.title}
          subtitle={dictionary.home.trainers.subtitle}
          scrollerLabel={dictionary.home.trainers.scrollerLabel}
          experienceLabel={dictionary.home.trainers.experienceLabel}
          trainers={dictionary.home.trainers.list}
        />
        <LocationSection
          locale={locale}
          openStatus={dictionary.openStatus}
          eyebrow={dictionary.home.location.eyebrow}
          index="04"
          title={dictionary.home.location.title}
          subtitle={dictionary.home.location.subtitle}
          addressLabel={dictionary.home.location.addressLabel}
          hoursLabel={dictionary.home.location.hoursLabel}
          mapTitle={dictionary.home.location.mapTitle}
          getDirectionsLabel={dictionary.home.location.getDirectionsLabel}
          location={dictionary.home.location.info}
        />
        <ReviewsSection
          eyebrow={dictionary.home.reviews.eyebrow}
          index="05"
          title={dictionary.home.reviews.title}
          subtitle={dictionary.home.reviews.subtitle}
          scrollerLabel={dictionary.home.reviews.scrollerLabel}
          starsLabelTemplate={dictionary.home.reviews.starsLabelTemplate}
          readOnGoogleLabel={dictionary.home.reviews.readOnGoogle}
          googleReviewLabel={dictionary.home.reviews.googleReview}
          allReviewsLabel={dictionary.home.reviews.allReviewsLabel}
          allReviewsUrl={dictionary.home.location.info.directionsUrl}
          reviews={dictionary.home.reviews.list}
        />
        <FaqSection
          eyebrow={dictionary.home.faq.eyebrow}
          index="06"
          title={dictionary.home.faq.title}
          subtitle={dictionary.home.faq.subtitle}
          callLabel={dictionary.quickActions.callLabel}
          faqs={dictionary.home.faq.items}
        />
        <ContactSection
          index="07"
          copy={dictionary.home.contact}
          directionsUrl={dictionary.home.location.info.directionsUrl}
          locale={locale}
          openStatus={dictionary.openStatus}
          privacyHref={getPolicyPath(locale, "privacy")}
          privacyLabel={dictionary.policies.privacyLinkLabel}
        />
      </main>
      <SiteFooter
        locale={locale}
        isHomePage
        navItems={dictionary.navItems}
        siteTagline={dictionary.siteTagline}
        quickLinksTitle={dictionary.footer.quickLinksTitle}
        contactTitle={dictionary.footer.contactTitle}
        privacyLabel={dictionary.policies.privacyLinkLabel}
        facebookLabel={dictionary.footer.facebookLabel}
        instagramLabel={dictionary.footer.instagramLabel}
        joinLabel={dictionary.footer.joinNow}
        rightsLabel={dictionary.footer.rightsLabel}
      />
      <StickyJoinBar
        joinHref="#contact"
        joinLabel={dictionary.header.joinNow}
        callLabel={dictionary.quickActions.callLabel}
        chat={dictionary.quickActions}
      />
      <FloatingContact copy={dictionary.quickActions} />
    </>
  );
}
