import { CheckoutStubButton } from "@/components/buy-membership/checkout-stub-button";
import { PricingPlanCard } from "@/components/ui/pricing-plan-card";
import type { PricingPlan } from "@/types/marketing";

type PlansGridProps = {
  plans: PricingPlan[];
};

export function PlansGrid({ plans }: PlansGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {plans.map((plan) => (
        <PricingPlanCard
          key={plan.id}
          plan={plan}
          headingTag="h2"
          cta={
            <CheckoutStubButton
              planId={plan.id}
              planName={plan.name}
              ctaLabel={plan.ctaLabel}
              highlight={plan.highlight}
            />
          }
        />
      ))}
    </div>
  );
}
