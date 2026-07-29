import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Benefit } from "@/types/marketing";

type BenefitsSectionProps = {
  title: string;
  subtitle: string;
  items: Benefit[];
};

export function BenefitsSection({ title, subtitle, items }: BenefitsSectionProps) {
  return (
    <SectionShell id="benefits">
      <Reveal>
        <SectionHeading title={title} subtitle={subtitle} align="center" />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} as="article" delay={(index % 3) * 90}>
            <Card hover className="h-full p-6 sm:p-7">
              <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-(--shadow-brand)">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground sm:text-2xl">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-(--color-text-muted)">{item.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
