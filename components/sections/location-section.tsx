import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { OpenNowBadge } from "@/components/ui/open-now-badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { Locale } from "@/lib/i18n";
import type { LocationInfo } from "@/types/marketing";

type LocationSectionProps = {
  locale: Locale;
  openStatus: { openNow: string; closed: string; closesAt: string; opensAt: string };
  title: string;
  subtitle: string;
  addressLabel: string;
  hoursLabel: string;
  mapTitle: string;
  directionsPrefix: string;
  directionsLinkLabel: string;
  getDirectionsLabel: string;
  location: LocationInfo;
};

export function LocationSection({
  locale,
  openStatus,
  title,
  subtitle,
  addressLabel,
  hoursLabel,
  mapTitle,
  directionsPrefix,
  directionsLinkLabel,
  getDirectionsLabel,
  location,
}: LocationSectionProps) {
  return (
    <SectionShell id="location">
      <Reveal>
        <SectionHeading title={title} subtitle={subtitle} />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal className="h-full">
          <Card className="flex h-full flex-col gap-8 p-6 sm:p-8">
            <div className="flex gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-(--shadow-brand)">
                <Icon name="map-pin" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">{addressLabel}</h3>
                <p className="mt-2 text-lg leading-relaxed text-(--color-text-muted)">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand)">
                <Icon name="clock" className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">{hoursLabel}</h3>
                <div className="mt-1.5">
                  <OpenNowBadge locale={locale} copy={openStatus} variant="text" />
                </div>
                <div className="mt-4 space-y-3">
                  {location.openingHours.map((entry) => (
                    <div
                      key={entry.dayLabel}
                      className="flex flex-col gap-0.5 border-b border-(--color-border) pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <p className="font-semibold text-foreground">{entry.dayLabel}</p>
                      <div className="space-y-0.5 text-(--color-text-muted) sm:text-right">
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

            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonStyles({ variant: "secondary", size: "md", className: "mt-auto w-fit" })}
            >
              <Icon name="map-pin" className="h-5 w-5" />
              {getDirectionsLabel}
            </a>
          </Card>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-(--shadow-soft)">
            <iframe
              src={location.mapEmbedUrl}
              title={mapTitle}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full sm:h-96 lg:h-[480px]"
            />
            <p className="px-5 py-4 text-sm text-(--color-text-muted)">
              {directionsPrefix}{" "}
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-(--color-brand) underline underline-offset-2"
              >
                {directionsLinkLabel}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
