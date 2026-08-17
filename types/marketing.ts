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
  billingPeriodLabel: string;
  highlight: boolean;
  ctaLabel: string;
  tagline?: string;
  features?: string[];
};

export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  /**
   * Optional on purpose. With no photo the card renders a monogram panel;
   * drop a real portrait in here and it takes over. The previous placeholder —
   * a grey silhouette bust on a green gradient — was worse than no image at
   * all, because it looked like a photo that had failed to load.
   */
  image?: string;
  experienceYears: number;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

export type OpeningHoursEntry = {
  dayLabel: string;
  ranges: string[];
};

export type LocationInfo = {
  addressLines: string[];
  openingHours: OpeningHoursEntry[];
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

// Re-exported here so content/types stay decoupled from the Icon component file.
export type IconName =
  | "menu"
  | "close"
  | "star"
  | "chevron-down"
  | "map-pin"
  | "clock"
  | "phone"
  | "mail"
  | "instagram"
  | "facebook"
  | "dumbbell"
  | "layers"
  | "heart-handshake"
  | "sunrise"
  | "sparkles"
  | "users"
  | "shield-check"
  | "arrow-right"
  | "check"
  | "quote"
  | "send"
  | "message-circle"
  | "whatsapp"
  | "zalo"
  | "chevron-left"
  | "chevron-right";
