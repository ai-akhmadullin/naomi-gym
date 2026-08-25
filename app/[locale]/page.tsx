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
        chatLabel={dictionary.header.chat}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        chatCopy={dictionary.quickActions}
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
          image={dictionary.home.hero.image}
          stats={dictionary.home.hero.stats}
        />
        <TickerBand items={dictionary.home.ticker.items} label={dictionary.home.ticker.label} />
        {/* Show the room, then name the price.
            The hero's spec bar has already said 40k / 300k in 52px figures, so
            leading with the pricing cards spent the first section restating a
            number the visitor had just read — while the photographs were new
            information sitting behind it. Reversed, the price lands on someone
            who has seen what it buys, which is the order in which "40k" reads
            as cheap rather than as merely small. */}
        <GallerySection
          eyebrow={dictionary.home.gallery.eyebrow}
          index="01"
          title={dictionary.home.gallery.title}
          subtitle={dictionary.home.gallery.subtitle}
          scrollerLabel={dictionary.home.gallery.scrollerLabel}
          images={dictionary.home.gallery.images}
          lightbox={dictionary.home.gallery.lightbox}
        />
        <PricingSection
          eyebrow={dictionary.home.pricing.eyebrow}
          index="02"
          title={dictionary.home.pricing.title}
          subtitle={dictionary.home.pricing.subtitle}
          plans={dictionary.home.pricing.plans}
          highlightLabel={dictionary.home.pricing.highlightLabel}
          note={dictionary.home.pricing.note}
          joinHref="#contact"
        />
        {/* Trainers section temporarily removed — re-add TrainersSection here and
            restore the "#trainers" nav item in content/site.ts to bring it back. */}
        <LocationSection
          locale={locale}
          openStatus={dictionary.openStatus}
          eyebrow={dictionary.home.location.eyebrow}
          index="03"
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
          index="04"
          title={dictionary.home.reviews.title}
          subtitle={dictionary.home.reviews.subtitle}
          scrollerLabel={dictionary.home.reviews.scrollerLabel}
          starsLabelTemplate={dictionary.home.reviews.starsLabelTemplate}
          googleReviewLabel={dictionary.home.reviews.googleReview}
          allReviewsLabel={dictionary.home.reviews.allReviewsLabel}
          allReviewsUrl={dictionary.home.location.info.directionsUrl}
          reviews={dictionary.home.reviews.list}
        />
        <FaqSection
          eyebrow={dictionary.home.faq.eyebrow}
          index="05"
          title={dictionary.home.faq.title}
          subtitle={dictionary.home.faq.subtitle}
          callLabel={dictionary.quickActions.callLabel}
          faqs={dictionary.home.faq.items}
        />
        <ContactSection
          index="06"
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
    </>
  );
}
