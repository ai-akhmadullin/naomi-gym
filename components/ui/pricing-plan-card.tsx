import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import type { PricingPlan } from "@/types/marketing";
import { cn } from "@/lib/utils";

type PricingPlanCardProps = {
  plan: PricingPlan;
  cta: ReactNode;
  highlightLabel: string;
  headingTag?: "h2" | "h3";
};

export function PricingPlanCard({ plan, cta, highlightLabel, headingTag = "h3" }: PricingPlanCardProps) {
  const HeadingTag = headingTag;

  return (
    <Card
      hover
      className={cn(
        "relative flex h-full flex-col overflow-hidden p-6 sm:p-8",
        plan.highlight
          ? "border-(--color-brand)/30 ring-1 ring-(--color-brand)/20 lg:scale-[1.02]"
          : "",
      )}
    >
      {plan.highlight ? (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[image:var(--gradient-brand)]" />
      ) : null}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <HeadingTag className="font-display text-2xl font-bold text-foreground sm:text-3xl">{plan.name}</HeadingTag>
          {plan.tagline ? (
            <p className="mt-1 text-sm font-medium text-(--color-text-muted)">{plan.tagline}</p>
          ) : null}
        </div>
        {plan.highlight ? <Badge variant="solid" className="shrink-0">{highlightLabel}</Badge> : null}
      </div>

      <p className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">{plan.priceLabel}</span>
        <span className="text-base font-medium text-(--color-text-muted)">/{plan.billingPeriodLabel}</span>
      </p>

      {plan.features && plan.features.length > 0 ? (
        <ul className="mt-6 space-y-3 border-t border-(--color-border) pt-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-base text-foreground">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-brand)/12 text-(--color-brand)">
                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="text-(--color-text-muted)">{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-8">{cta}</div>
    </Card>
  );
}
