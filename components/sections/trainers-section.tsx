import Image from "next/image";

import { Card } from "@/components/ui/card";
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <Image
              src={trainer.image}
              alt={trainer.name}
              width={640}
              height={760}
              className="w-full object-cover"
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
      </div>
    </SectionShell>
  );
}
