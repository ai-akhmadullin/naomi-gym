import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { OpenNowBadge } from "@/components/ui/open-now-badge";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_CONTAINER_CLASS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroStat = { value: string; label: string };

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
  stats: HeroStat[];
};

/**
 * One column, full width.
 *
 * The second column used to hold an "at a glance" panel — hours, both prices,
 * the address. It was cut for two reasons. Every figure in it already appeared
 * somewhere else on the page (the prices in the stat strip directly beneath it
 * and again in Pricing, the hours and address again in Location), so it was
 * restating rather than adding. And a dense box of 14px rows sitting beside an
 * 88px headline put two different scales side by side, which is what made the
 * two halves look like they belonged to different pages.
 *
 * What replaced it is nothing: the headline block now owns the full measure and
 * the stat strip runs the whole width as a spec bar. Empty space on the right of
 * a big left-aligned headline is a composition; a box of small type there is
 * filler.
 */
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
  stats,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="grain relative scroll-mt-16 overflow-hidden bg-(--color-paper) sm:scroll-mt-12 lg:scroll-mt-6"
    >
      {/* Decorative ground. Two wide, low-opacity green washes plus a dotted
          grid that is masked to fade out before it reaches any text — an
          unmasked pattern behind body copy costs legibility for no gain. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_70%_0%,black,transparent_75%)]" />
        {/* Tints run higher than the blurred circles these replace: a blur has a
            solid core and falls off at the edge, while a radial gradient ramps
            from the centre, so matching the perceived density needs more alpha
            at the middle. */}
        <div className="glow absolute -left-40 -top-40 h-[38rem] w-[38rem] [--glow-tint:color-mix(in_srgb,var(--color-brand)_30%,transparent)]" />
        <div className="glow absolute -right-32 top-16 h-[32rem] w-[32rem] [--glow-tint:color-mix(in_srgb,var(--color-brand-bright)_30%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-(--color-paper)" />
      </div>

      <div
        className={cn(
          SECTION_CONTAINER_CLASS,
          "relative z-10 pt-10 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24",
        )}
      >
        <div className="min-w-0">
          <Reveal>
              {/* Typeset, not chipped: these were two white pills, which is the
                  most template-looking element a hero can open with — and their
                  different paddings never optically aligned when stacked. As an
                  uppercase eyebrow plus a plain status line they read as part of
                  the headline's typography instead of as UI floating above it. */}
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
                <p className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-(--color-text-muted)">
                  <Icon name="map-pin" className="h-3.5 w-3.5 text-(--color-brand)" />
                  {eyebrow}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden h-3.5 w-px bg-(--color-border-strong) sm:block"
                />
                {/* Same micro-type as the location eyebrow — same size, case
                    and tracking — so the two segments share one set of font
                    metrics and sit on the same line by construction. */}
                {/* ps-1.5 exists for the stacked (mobile) state: the status
                    dot is 8px wide against the 14px map pin above it, so
                    without the inset the two text runs start 6px apart. On one
                    line (sm+) the inset would just unbalance the divider gap. */}
                <OpenNowBadge
                  locale={locale}
                  copy={openStatus}
                  variant="text"
                  className="ps-1.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] sm:ps-0"
                />
              </div>
            </Reveal>

            <Reveal delay={70}>
              {/* leading-[1.04], not the ~0.95 this size would take in English:
                  the Vietnamese headline stacks tone marks above and below, and
                  tighter leading collides them between lines. */}
              <h1 className="mt-5 sm:mt-7 max-w-5xl font-display text-[length:var(--step-5)] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance text-foreground">
                {titlePrefix}{" "}
                {/* The brand name gets a drawn underline rather than a gradient
                    fill. Gradient text was one more instance of the same green
                    ramp that already covered the page; a single lime stroke is
                    the one accent that is genuinely unique to this line. */}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">{titleHighlight}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 22"
                    preserveAspectRatio="none"
                    className="absolute bottom-[-0.1em] left-[-1.5%] h-[0.26em] w-[103%] text-(--color-accent)"
                  >
                    <path
                      d="M4 15.5C58 7.5 128 4.5 296 8.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-5 sm:mt-7 max-w-2xl text-pretty text-[length:var(--step-1)] leading-[1.65] text-(--color-text-muted)">
                {description}
              </p>
            </Reveal>

            <Reveal delay={190}>
              <div className="mt-7 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href={primaryHref}
                  className={buttonStyles({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
                >
                  {primaryCta}
                  <Icon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </a>
                {/* Secondary action is a text link, not a second button. Two
                    equally-weighted buttons make the reader choose; one button
                    and one link tells them which choice is the default. */}
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 px-2 py-2 text-[1.05rem] font-semibold text-(--color-text) transition-colors hover:text-(--color-brand) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-paper) sm:w-auto"
                >
                  <span className="link-underline">{secondaryCta}</span>
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 text-(--color-brand) transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>

          {/* Numbers, not tick marks. The three green checks this replaces
              repeated the lede almost word for word; a figure with a caption
              carries the same claim and gives the block a second typographic
              voice. Now that the hero is one column this runs the full measure
              as a spec bar, which is what makes the width to the right of the
              headline read as deliberate rather than as a gap. */}
          <Reveal delay={250}>
            <dl className="mt-10 grid grid-cols-2 border-t border-(--color-border-strong) sm:mt-16 sm:grid-cols-4">
              {stats.map((stat, position) => (
                <div
                  key={stat.label}
                  className={cn(
                    "min-w-0 py-6 pr-6 sm:py-8",
                    // Hairlines between cells, but never on the cell that starts
                    // a row: at sm the row starts every 4th cell, below sm every
                    // 2nd. A rule on those would hang off the left edge.
                    "border-(--color-border)",
                    position % 2 !== 0 && "border-l pl-6",
                    position % 4 !== 0 ? "sm:border-l sm:pl-8" : "sm:border-l-0 sm:pl-0",
                  )}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[length:var(--step-4)] font-extrabold leading-none tracking-[-0.04em] text-foreground tabular-nums">
                      {stat.value}
                    </span>
                    <span className="mt-3 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-(--color-text-faint)">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
