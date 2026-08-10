import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PricingPlanCard } from "@/components/ui/pricing-plan-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { PricingPlan } from "@/types/marketing";

type PricingSectionProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  highlightLabel: string;
  note: string;
  joinHref: string;
};

export function PricingSection({
  eyebrow,
  index,
  title,
  subtitle,
  plans,
  highlightLabel,
  note,
  joinHref,
}: PricingSectionProps) {
  return (
    <SectionShell id="pricing" tone="paper" space="md">
      <Reveal>
        <SectionHeading
          eyebrow={eyebrow}
          index={index}
          title={title}
          subtitle={subtitle}
          align="center"
        />
      </Reveal>

      <div className="mx-auto grid max-w-4xl items-stretch gap-5 sm:grid-cols-2 sm:gap-6">
        {plans.map((plan, position) => (
          <Reveal key={plan.id} delay={position * 100} className="h-full">
            <PricingPlanCard
              plan={plan}
              highlightLabel={highlightLabel}
              headingTag="h3"
              cta={
                <a
                  href={joinHref}
                  className={buttonStyles({
                    // On the ink card a white button reads as the primary
                    // action; green-on-ink would sink into the background.
                    variant: plan.highlight ? "inverse" : "secondary",
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
        <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2.5 text-center text-sm font-medium text-(--color-text-muted)">
          <Icon name="shield-check" className="h-4 w-4 shrink-0 text-(--color-brand)" />
          {note}
        </p>
      </Reveal>
    </SectionShell>
  );
}
