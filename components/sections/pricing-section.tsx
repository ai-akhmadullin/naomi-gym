import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { PricingPlanCard } from "@/components/ui/pricing-plan-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { PricingPlan } from "@/types/marketing";

type PricingSectionProps = {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  highlightLabel: string;
  buyMembershipHref: string;
};

export function PricingSection({
  title,
  subtitle,
  plans,
  highlightLabel,
  buyMembershipHref,
}: PricingSectionProps) {
  return (
    <SectionShell id="pricing">
      <SectionHeading title={title} subtitle={subtitle} align="center" />

      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            highlightLabel={highlightLabel}
            headingTag="h3"
            cta={
              <Link
                href={buyMembershipHref}
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
