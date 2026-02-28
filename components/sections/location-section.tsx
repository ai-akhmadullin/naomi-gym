import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { LocationInfo } from "@/types/marketing";

type LocationSectionProps = {
  location: LocationInfo;
};

export function LocationSection({ location }: LocationSectionProps) {
  return (
    <SectionShell id="location" className="bg-(--color-bg-muted)">
      <SectionHeading title="Visit Us" subtitle="Find Naomi Gym near An Thuong and My Khe area" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="p-5 sm:p-8 lg:p-10">
          <div className="space-y-10 sm:space-y-14">
            <div className="space-y-3">
              <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <Icon name="map-pin" className="h-6 w-6 text-(--color-brand) sm:h-7 sm:w-7" />
                Address
              </h3>
              <p className="pl-0 text-lg leading-relaxed text-(--color-text-muted) sm:pl-10 sm:text-2xl">
                {location.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <Icon name="clock" className="h-6 w-6 text-(--color-brand) sm:h-7 sm:w-7" />
                Hours
              </h3>
              <div className="pl-0 text-lg leading-relaxed text-(--color-text-muted) sm:pl-10 sm:text-xl lg:text-2xl">
                <div className="space-y-4">
                  {location.openingHours.map((entry) => (
                    <div key={entry.dayLabel} className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
                      <p className="font-medium text-foreground">{entry.dayLabel}:</p>
                      <div className="space-y-1 sm:text-right">
                        {entry.ranges.map((range) => (
                          <span key={range} className="block">
                            {range}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="min-w-0 overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-(--shadow-soft)">
          <iframe
            src={location.mapEmbedUrl}
            title="Naomi Gym location map"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full sm:h-96 lg:h-[420px]"
          />
          <p className="px-4 py-4 text-sm text-(--color-text-muted) sm:px-5 sm:text-base">
            Can&apos;t see the map? Open directions
            {" "}
            <a href={location.directionsUrl} className="font-semibold text-(--color-brand) underline underline-offset-2">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
