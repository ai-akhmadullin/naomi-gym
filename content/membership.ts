import type { PricingPlan } from "@/types/marketing";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "daily",
    name: "Daily",
    priceLabel: "40.000 VND",
    billingPeriodLabel: "day",
    highlight: false,
    ctaLabel: "Choose Daily",
  },
  {
    id: "monthly",
    name: "Monthly",
    priceLabel: "300.000 VND",
    billingPeriodLabel: "month",
    highlight: true,
    ctaLabel: "Choose Monthly",
  },
];
