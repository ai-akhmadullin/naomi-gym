import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { PricingPlan } from "@/types/marketing";
import { cn } from "@/lib/utils";

type PricingPlanCardProps = {
  plan: PricingPlan;
  cta: ReactNode;
  headingTag?: "h2" | "h3";
};

export function PricingPlanCard({ plan, cta, headingTag = "h3" }: PricingPlanCardProps) {
  const HeadingTag = headingTag;

  return (
    <Card
      className={cn(
        "p-5 sm:p-8",
        plan.highlight && "border-(--color-brand) ring-2 ring-(--color-brand)/15",
      )}
    >
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <HeadingTag className="text-2xl font-bold sm:text-4xl">{plan.name}</HeadingTag>
        {plan.highlight ? <Badge className="w-fit self-start">Most Popular</Badge> : null}
      </div>

      <p className="mb-6 text-4xl font-bold text-(--color-brand) sm:mb-8 sm:text-5xl">
        {plan.priceLabel}
        <span className="text-lg font-medium text-(--color-text-muted) sm:text-xl">/{plan.billingPeriod}</span>
      </p>

      {cta}
    </Card>
  );
}
