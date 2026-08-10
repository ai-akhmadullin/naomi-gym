import Image from "next/image";

import { Card } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Trainer } from "@/types/marketing";

type TrainersSectionProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  scrollerLabel: string;
  experienceLabel: string;
  trainers: Trainer[];
};

/** First letter of each word, capped at two — "Sarah Chen" -> "SC". */
function monogram(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function TrainersSection({
  eyebrow,
  index,
  title,
  subtitle,
  scrollerLabel,
  experienceLabel,
  trainers,
}: TrainersSectionProps) {
  return (
    <SectionShell id="trainers" tone="paper" space="md">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} index={index} title={title} subtitle={subtitle} />
      </Reveal>

      <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator>
        {trainers.map((trainer) => (
          <Card key={trainer.id} hover className="flex h-full flex-col overflow-hidden">
            <div className="grain grain-dark relative aspect-4/3 overflow-hidden bg-[image:var(--gradient-ink)]">
              {trainer.image ? (
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              ) : (
                /* No portrait: an oversized outlined monogram, cropped by the
                   panel. Reads as deliberate graphic design rather than as a
                   picture that failed to load — which is what the grey
                   silhouette bust it replaces looked like. */
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <span
                    className="font-display text-[11rem] font-extrabold leading-none tracking-[-0.06em] text-transparent"
                    style={{ WebkitTextStroke: "2px rgba(255,255,255,0.16)" }}
                  >
                    {monogram(trainer.name)}
                  </span>
                </span>
              )}

              {/* Bottom scrim: keeps the name legible over either treatment. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"
              />

              <span className="absolute left-5 top-5 z-10 inline-flex items-center rounded-full bg-(--color-accent) px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-(--color-accent-ink)">
                {trainer.specialty}
              </span>
              <h3 className="absolute inset-x-5 bottom-5 z-10 font-display text-[length:var(--step-3)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                {trainer.name}
              </h3>
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6">
              <p className="text-[0.98rem] leading-[1.65] text-(--color-text-muted)">{trainer.bio}</p>
              <p className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-(--color-brand)">
                <Icon name="shield-check" className="h-4 w-4" />
                {experienceLabel.replace("{years}", String(trainer.experienceYears))}
              </p>
            </div>
          </Card>
        ))}
      </HorizontalScroller>
    </SectionShell>
  );
}
