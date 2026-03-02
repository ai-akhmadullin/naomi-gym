import type { NavItem, PolicyLink } from "@/types/marketing";

export const SITE_NAME = "Naomi Gym";
export const SITE_TAGLINE = "Train stronger, live better";
export const SITE_DESCRIPTION =
  "Naomi Gym helps members build strength and confidence with elite coaching, modern equipment, and a supportive community.";

export const CONTACT_PHONE_DISPLAY = "090 5529511";
export const CONTACT_PHONE_RAW = "+84905529511";
export const CONTACT_ADDRESS_LINES = [
  "Lô 22 Đ. Lê Văn Hiến",
  "Khuê Mỹ, Ngũ Hành Sơn",
  "Đà Nẵng",
];
export const SOCIAL_FACEBOOK_URL = "https://www.facebook.com/pages/Naomi%20Ki%E1%BA%BFn%20Gym/2165857276998796/";
export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/explore/locations/2165857276998796/naomi-kin-gym/";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", kind: "section" },
  { label: "Pricing", href: "#pricing", kind: "section" },
  { label: "Trainers", href: "#trainers", kind: "section" },
  { label: "Gallery", href: "#gallery", kind: "section" },
  { label: "Location", href: "#location", kind: "section" },
  { label: "Reviews", href: "#reviews", kind: "section" },
  { label: "Contact", href: "#contact", kind: "section" },
];

export const BUY_MEMBERSHIP_ROUTE = "/buy-membership";

export const POLICY_LINKS: PolicyLink[] = [
  { id: "privacy", label: "Privacy Policy", href: "/policies/privacy" },
  { id: "terms", label: "Terms of Service", href: "/policies/terms" },
  {
    id: "cancellation",
    label: "Cancellation Policy",
    href: "/policies/cancellation",
  },
  { id: "conduct", label: "Code of Conduct", href: "/policies/conduct" },
];

export const SECTION_CONTAINER_CLASS = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10";
