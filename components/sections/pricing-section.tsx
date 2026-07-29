import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PricingPlanCard } from "@/components/ui/pricing-plan-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { PricingPlan } from "@/types/marketing";

type PricingSectionProps = {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  highlightLabel: string;
  note: string;
  joinHref: string;
};

export function PricingSection({
  title,
  subtitle,
  plans,
  highlightLabel,
  note,
  joinHref,
}: PricingSectionProps) {
  return (
    <SectionShell id="pricing" className="bg-(--color-bg-muted)">
      <Reveal>
        <SectionHeading title={title} subtitle={subtitle} align="center" />
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 110} className="h-full">
            <PricingPlanCard
              plan={plan}
              highlightLabel={highlightLabel}
              headingTag="h3"
              cta={
                <a
                  href={joinHref}
                  className={buttonStyles({
                    variant: plan.highlight ? "primary" : "secondary",
                    size: "md",
                    className: "w-full",
                  })}
                >
                  {plan.ctaLabel}
                </a>
              }
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm font-medium text-(--color-text-muted)">
          <Icon name="shield-check" className="h-4 w-4 text-(--color-brand)" />
          {note}
        </p>
      </Reveal>
    </SectionShell>
  );
}
