import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { PricingPlanCard } from "@/components/ui/pricing-plan-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { BUY_MEMBERSHIP_ROUTE } from "@/lib/constants";
import type { PricingPlan } from "@/types/marketing";

type PricingSectionProps = {
  plans: PricingPlan[];
};

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <SectionShell id="pricing">
      <SectionHeading
        title="Membership Plans"
        subtitle="Choose a plan that fits your routine"
        align="center"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            headingTag="h3"
            cta={
              <Link
                href={BUY_MEMBERSHIP_ROUTE}
                className={buttonStyles({
                  variant: plan.highlight ? "primary" : "secondary",
                  size: "md",
                  className: plan.highlight
                    ? "w-full"
                    : "w-full bg-(--color-bg-muted)! hover:bg-(--color-brand)/15!",
                })}
              >
                {plan.ctaLabel}
              </Link>
            }
          />
        ))}
      </div>
    </SectionShell>
  );
}
