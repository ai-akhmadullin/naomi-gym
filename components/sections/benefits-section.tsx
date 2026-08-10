import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Benefit } from "@/types/marketing";

type BenefitsSectionProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  items: Benefit[];
};

/**
 * No cards here, deliberately.
 *
 * Six benefits whose descriptions run from one line to three cannot sit in
 * equal-height boxes without leaving dead space in the short ones — and a bento
 * grid of mixed spans makes that worse, not better, because the tall cells get
 * taller. Dropping the box removes the constraint entirely: the entries are set
 * as a ruled index, so uneven lengths read as natural rag instead of as
 * half-empty containers.
 *
 * It also gives the page a section with no card in it, between the pricing and
 * trainer sections that are built from them.
 */
export function BenefitsSection({ eyebrow, index, title, subtitle, items }: BenefitsSectionProps) {
  return (
    <SectionShell id="benefits" tone="white" space="md">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} index={index} title={title} subtitle={subtitle} />
      </Reveal>

      <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-16">
        {items.map((item, position) => (
          <Reveal
            key={item.id}
            as="article"
            delay={(position % 3) * 80}
            className="group min-w-0 border-t border-(--color-border) py-8 sm:py-9"
          >
            <div className="flex items-center gap-3.5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-xs)] bg-(--color-brand-tint) text-(--color-brand) transition-colors duration-300 group-hover:bg-(--color-brand) group-hover:text-white">
                <Icon name={item.icon} className="h-4.5 w-4.5" />
              </span>
              {/* The index numeral doubles as a quiet ordering cue and adds the
                  mono voice that the section eyebrows established. */}
              <span className="font-mono text-[0.7rem] font-medium tabular-nums text-(--color-text-faint)">
                {String(position + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-5 font-display text-[length:var(--step-2)] font-bold leading-[1.2] text-foreground">
              {item.title}
            </h3>
            <p className="mt-2.5 max-w-md text-[0.98rem] leading-[1.65] text-(--color-text-muted)">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
