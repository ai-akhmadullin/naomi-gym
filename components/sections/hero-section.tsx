import Image from "next/image";

import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { OpenNowBadge } from "@/components/ui/open-now-badge";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_CONTAINER_CLASS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  locale: Locale;
  openStatus: { openNow: string; closed: string; closesAt: string; opensAt: string };
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  imageAlt: string;
  membersCount: string;
  membersLabel: string;
  highlights: string[];
};

export function HeroSection({
  locale,
  openStatus,
  eyebrow,
  titlePrefix,
  titleHighlight,
  description,
  primaryCta,
  primaryHref,
  secondaryCta,
  imageAlt,
  membersCount,
  membersLabel,
  highlights,
}: HeroSectionProps) {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden bg-(--color-bg-muted)">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-(--color-brand)/15 blur-3xl" />
        <div className="absolute -right-16 top-32 h-80 w-80 rounded-full bg-(--color-brand-bright)/15 blur-3xl" />
      </div>

      <div className={cn(SECTION_CONTAINER_CLASS, "relative py-16 sm:py-20 lg:py-28")}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-(--color-brand)/15 bg-white/70 px-4 py-1.5 text-sm font-semibold text-(--color-brand) backdrop-blur">
                  <Icon name="map-pin" className="h-4 w-4" />
                  {eyebrow}
                </span>
                <OpenNowBadge locale={locale} copy={openStatus} className="bg-white/70 backdrop-blur" />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {titlePrefix}
                <span className="mt-1 block text-gradient">{titleHighlight}</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--color-text-muted) sm:text-xl">
                {description}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href={primaryHref}
                  className={buttonStyles({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
                >
                  {primaryCta}
                  <Icon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#pricing"
                  className={buttonStyles({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}
                >
                  {secondaryCta}
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground sm:text-base">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-brand)/12 text-(--color-brand)">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative min-w-0">
            <div className="relative mx-auto max-w-xl">
              <div className="animate-float overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-(--shadow-card) ring-1 ring-black/5">
                <Image
                  src="/images/hero/hero-main.svg"
                  alt={imageAlt}
                  width={800}
                  height={600}
                  className="h-auto w-full"
                  priority
                />
              </div>

              {/* Members stat */}
              <div className="absolute -bottom-5 -left-3 z-10 rounded-2xl bg-[image:var(--gradient-brand)] p-4 text-white shadow-(--shadow-brand) sm:-left-6 sm:p-5">
                <p className="font-display text-3xl font-bold leading-none sm:text-4xl">{membersCount}</p>
                <p className="mt-1.5 text-sm font-medium text-white/90 sm:text-base">{membersLabel}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
