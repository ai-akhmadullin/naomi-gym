import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FaqSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LocationSection } from "@/components/sections/location-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TrainersSection } from "@/components/sections/trainers-section";
import { PRICING_PLANS } from "@/content/membership";
import {
  FAQ_ITEMS,
  GALLERY_IMAGES,
  HERO_STATS,
  LOCATION_INFO,
  POLICY_LINKS,
  REVIEWS,
  TRAINERS,
} from "@/content/home";

export default function HomePage() {
  return (
    <>
      <SiteHeader currentPath="/" />
      <main>
        <HeroSection membersCount={HERO_STATS.membersCount} membersLabel={HERO_STATS.membersLabel} />
        <PricingSection plans={PRICING_PLANS} />
        <TrainersSection trainers={TRAINERS} />
        <GallerySection images={GALLERY_IMAGES} />
        <LocationSection location={LOCATION_INFO} />
        <ReviewsSection reviews={REVIEWS} />
        <FaqSection faqs={FAQ_ITEMS} />
      </main>
      <SiteFooter isHomePage policyLinks={POLICY_LINKS} />
    </>
  );
}
