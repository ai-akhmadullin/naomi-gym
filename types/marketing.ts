export type NavItemKind = "section" | "route";

export type NavItem = {
  label: string;
  href: string;
  kind: NavItemKind;
};

export type PricingPlan = {
  id: string;
  name: string;
  priceLabel: string;
  billingPeriod: "day" | "month";
  highlight: boolean;
  ctaLabel: string;
};

export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  experienceYears: number;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

export type LocationInfo = {
  addressLines: string[];
  openingHours: Array<{
    dayLabel: string;
    ranges: string[];
  }>;
  mapEmbedUrl: string;
  directionsUrl: string;
};

export type Review = {
  id: string;
  memberName: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
  source?: "local" | "google";
  sourceUrl?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type PolicyLink = {
  id: string;
  label: string;
  href: string;
};

export type CheckoutIntent = {
  planId: string;
};

export type CheckoutResult = {
  status: "stub" | "ready";
  redirectUrl?: string;
  message?: string;
};
