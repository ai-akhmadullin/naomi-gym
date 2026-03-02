import Image from "next/image";

import { Card } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Trainer } from "@/types/marketing";

type TrainersSectionProps = {
  trainers: Trainer[];
};

export function TrainersSection({ trainers }: TrainersSectionProps) {
  return (
    <SectionShell id="trainers" className="bg-(--color-bg-muted)">
      <SectionHeading title="Meet Our Trainers" subtitle="Expert coaches dedicated to helping you succeed" />

      <HorizontalScroller ariaLabel="Trainers" showScrollIndicator>
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="h-full overflow-hidden shadow-none">
            <Image
              src={trainer.image}
              alt={trainer.name}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground sm:text-4xl">{trainer.name}</h3>
                <p className="mt-2 text-xl font-semibold text-(--color-brand) sm:text-3xl">{trainer.specialty}</p>
              </div>
              <p className="text-lg text-(--color-text-muted)">{trainer.bio}</p>
              <p className="text-sm font-medium uppercase tracking-wide text-(--color-text-muted)">
                {trainer.experienceYears}+ years experience
              </p>
            </div>
          </Card>
        ))}
      </HorizontalScroller>
    </SectionShell>
  );
}
