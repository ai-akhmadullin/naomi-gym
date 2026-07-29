import Image from "next/image";

import { Card } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Trainer } from "@/types/marketing";

type TrainersSectionProps = {
  title: string;
  subtitle: string;
  scrollerLabel: string;
  experienceLabel: string;
  trainers: Trainer[];
};

export function TrainersSection({
  title,
  subtitle,
  scrollerLabel,
  experienceLabel,
  trainers,
}: TrainersSectionProps) {
  return (
    <SectionShell id="trainers">
      <Reveal>
        <SectionHeading title={title} subtitle={subtitle} />
      </Reveal>

      <HorizontalScroller ariaLabel={scrollerLabel} showScrollIndicator>
        {trainers.map((trainer) => (
          <Card key={trainer.id} hover className="flex h-full flex-col overflow-hidden">
            <div className="relative">
              <Image
                src={trainer.image}
                alt={trainer.name}
                width={1200}
                height={900}
                className="aspect-4/3 h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-(--color-brand) backdrop-blur">
                {trainer.specialty}
              </span>
              <h3 className="absolute inset-x-4 bottom-4 font-display text-2xl font-bold text-white drop-shadow sm:text-3xl">
                {trainer.name}
              </h3>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
              <p className="text-base leading-relaxed text-(--color-text-muted)">{trainer.bio}</p>
              <p className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-(--color-brand)/10 px-3 py-1 text-sm font-semibold text-(--color-brand)">
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
