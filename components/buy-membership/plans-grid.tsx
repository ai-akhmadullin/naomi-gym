import { CheckoutStubButton } from "@/components/buy-membership/checkout-stub-button";
import { PricingPlanCard } from "@/components/ui/pricing-plan-card";
import type { PricingPlan } from "@/types/marketing";

type PlansGridProps = {
  plans: PricingPlan[];
  highlightLabel: string;
  checkoutCopy: {
    startCheckoutAriaLabelTemplate: string;
    loadingLabel: string;
    unavailableMessage: string;
    planRequiredMessage: string;
    previewMessage: string;
  };
};

export function PlansGrid({ plans, highlightLabel, checkoutCopy }: PlansGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {plans.map((plan) => (
        <PricingPlanCard
          key={plan.id}
          plan={plan}
          highlightLabel={highlightLabel}
          headingTag="h2"
          cta={
            <CheckoutStubButton
              planId={plan.id}
              planName={plan.name}
              ctaLabel={plan.ctaLabel}
              copy={checkoutCopy}
              highlight={plan.highlight}
            />
          }
        />
      ))}
    </div>
  );
}
