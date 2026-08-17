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
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  addressLabel: string;
  hoursLabel: string;
  mapTitle: string;
  getDirectionsLabel: string;
  location: LocationInfo;
};

export function LocationSection({
  locale,
  openStatus,
  eyebrow,
  index,
  title,
  subtitle,
  addressLabel,
  hoursLabel,
  mapTitle,
  getDirectionsLabel,
  location,
}: LocationSectionProps) {
  return (
    <SectionShell id="location" tone="white" space="md">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} index={index} title={title} subtitle={subtitle} />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
        <Reveal className="h-full">
          <Card className="flex h-full flex-col p-7 sm:p-8">
            {/* Labels are set as small caps rather than as another row of
                display headings. Address and Hours are field labels, not
                section titles — giving them h3-sized display type competed with
                the section heading directly above them. */}
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-(--color-brand-tint) text-(--color-brand)">
                <Icon name="map-pin" className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-(--color-text-faint)">
                  {addressLabel}
                </h3>
                <address className="mt-2 not-italic text-[length:var(--step-1)] font-medium leading-relaxed text-foreground">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <div className="rule-fade my-7" aria-hidden="true" />

            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-(--color-brand-tint) text-(--color-brand)">
                <Icon name="clock" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-(--color-text-faint)">
                  {hoursLabel}
                </h3>
                <div className="mt-2">
                  <OpenNowBadge locale={locale} copy={openStatus} variant="text" className="text-sm font-semibold" />
                </div>
                <dl className="mt-5 space-y-3.5">
                  {location.openingHours.map((entry) => (
                    <div
                      key={entry.dayLabel}
                      className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <dt className="text-[0.95rem] text-(--color-text-muted)">{entry.dayLabel}</dt>
                      {/* Leader dots pull the eye across the gap to the time.
                          Without them the two columns read as unrelated lists. */}
                      <span
                        aria-hidden="true"
                        className="hidden flex-1 translate-y-[-0.28em] border-b border-dotted border-(--color-border-strong) sm:block"
                      />
                      <dd className="space-y-0.5 text-[0.95rem] font-semibold tabular-nums text-foreground sm:text-right">
                        {entry.ranges.map((range) => (
                          <span key={range} className="block">
                            {range}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonStyles({ variant: "secondary", size: "md", className: "mt-9 w-full sm:w-fit" })}
            >
              <Icon name="map-pin" className="h-4.5 w-4.5" />
              {getDirectionsLabel}
            </a>
          </Card>
        </Reveal>

        <Reveal delay={110} className="min-w-0">
          {/* The map fills the panel. It previously sat above a caption reading
              "Can't see the map? Open directions here." — a developer's fallback
              note rendered as permanent UI, which tells every visitor the
              feature might be broken. The same link now lives on the button in
              the card beside it, where it belongs. */}
          <div className="h-full overflow-hidden rounded-[var(--radius-lg)] border border-(--color-border) bg-white shadow-(--shadow-soft)">
            <iframe
              src={location.mapEmbedUrl}
              title={mapTitle}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full sm:h-96 lg:h-full lg:min-h-[30rem]"
            />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
