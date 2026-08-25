import Image from "next/image";

import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { OpenNowBadge } from "@/components/ui/open-now-badge";
import { Reveal } from "@/components/ui/reveal";
import { SECTION_CONTAINER_CLASS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/marketing";

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
  image: GalleryImage;
  stats: HeroStat[];
};

/**
 * The room runs off the right edge of the page.
 *
 * Three versions of this hero have now been built, and the two rejected ones
 * are why this one is shaped the way it is.
 *
 * A photograph in a CARD on the right had edges, a radius, a shadow and a
 * caption, so the eye read it as an object parked next to the headline rather
 * than as part of the page.
 *
 * A FULL-BLEED photograph behind everything fixed that and cost too much for
 * it: the type needs a scrim, the scrim needs to be dark, and a dark scrim
 * turns the whole opening from bone-and-green into the same dark gym hero every
 * other gym site opens with. It also showed LESS of the gym, not more — a big
 * photograph at 40% visibility reads worse than a small one at 100%.
 *
 * Bleeding it off one edge keeps what each was good at. There is no frame, so
 * nothing sits in the layout; there is no scrim, so the room is at full
 * strength; and the page stays on paper, because the type never crosses the
 * picture.
 *
 * The first version of THIS one feathered the photograph's left edge into the
 * paper and was worse than any of them: fading a dark photograph into a light
 * flat colour parks every midtone in the same milky beige, so it read as fog
 * rather than as an ending. What the panel wants is not a softer join but a
 * harder one — a clean vertical cut, and a full-height box so it is anchored
 * to the section instead of floating in the middle of the right-hand side.
 *
 * Desktop only. Below lg the text needs the full width, which leaves the photo
 * nowhere to go but stacked — and a stacked photo pushes the CTA off a phone
 * screen. Phones meet the room in the gallery, two sections down.
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
  image,
  stats,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="grain relative scroll-mt-16 overflow-hidden bg-(--color-paper) sm:scroll-mt-12 lg:scroll-mt-6"
    >
      {/* Decorative ground, now weighted to the left half only: the right half
          has a photograph in it, and a dotted grid plus a green wash competing
          with a photograph is two backgrounds in one space. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_55%_65%_at_16%_6%,black,transparent_74%)]" />
        <div className="glow absolute -left-40 -top-40 h-[38rem] w-[38rem] [--glow-tint:color-mix(in_srgb,var(--color-brand)_30%,transparent)]" />
      </div>

      <div
        className={cn(
          SECTION_CONTAINER_CLASS,
          "relative z-10 pt-10 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24",
        )}
      >
        {/* This wrapper owns the gap down to the spec bar (the pb-*), rather
            than the bar owning it as a top margin, because the photograph's
            bottom edge is pinned to this box and has to land exactly on the
            bar's rule. `cn` is a plain joiner with no tailwind-merge, so the
            spacing lives in ONE place or two margin utilities race each other
            in stylesheet order. */}
        <div className="relative pb-10 sm:pb-16 lg:pb-32">
          {/* A panel, not a fade.
              This was feathered into the paper with a paper-coloured gradient,
              and it read as fog: half-covering a dark photograph with a light
              flat colour lands every midtone in the same milky beige, so the
              picture appeared to dissolve rather than to end. It also gave one
              rectangle four different edges — crisp top, crisp bottom, bleeding
              right, dissolving left — which is what made it look like a
              mistake. It now has exactly two: a hard vertical cut on the left,
              and the window edge on the right.
              Vertically it runs the FULL height of the hero — -top-32 cancels
              the container's own top padding, bottom-0 lands on the spec bar's
              rule — which is what stops it reading as a band floating in the
              middle of the right-hand side with air above and below it. The
              wrapper's pb-32 MIRRORS that -top-32 on purpose: with 128px of
              panel above the text and 128 below it, the headline block sits
              optically centred inside the picture. Unequal (it was 128 above,
              56 below) the left column reads as sagging while the right column
              fills its band edge to edge, and the two halves stop looking like
              one layout.
              The cut is at exactly 50%, which is where the spec bar's centre
              divider falls: one vertical line runs from the header all the way
              down through the bar. At an arbitrary percentage the eye finds a
              hard edge upstairs that answers to none of the three rules
              directly beneath it, and reads the whole thing as off.
              right:(100%-100vw)/2 walks the panel out of the centred container
              to the window edge; the section's overflow-hidden clips it there. */}
          <div className="pointer-events-none absolute -top-10 bottom-0 left-1/2 right-[calc((100%-100vw)/2)] hidden overflow-hidden sm:-top-24 lg:-top-32 lg:block">
            {/* No `priority`, deliberately. It emits a <link rel="preload">,
                and a preload fires whatever the CSS says — so below lg, where
                this panel is display:none, the phone was downloading and
                high-priority-preloading a photograph it never shows. Left to
                lazy loading the panel never intersects on a phone and costs it
                nothing, while on desktop it is above the fold and starts
                loading on first layout anyway. The LCP element here is the 72px
                headline, not the photograph. */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="50vw"
              className="object-cover object-[center_45%]"
            />
          </div>

          {/* Against the panel's fixed 50% cut, this leaves a channel of paper
              between the last character and the edge — which is what a hard cut
              needs to read as deliberate rather than as a collision.
              47% between lg and xl rather than 45%, because that band is where
              the column is tightest: at 1024 it is 425px at 45%, and the
              Vietnamese headline's longest line wants 431px at the size the
              fluid scale gives it there. Six pixels short is enough to force a
              third line, and text-balance then splits it 152 / 267 / 335 — a
              two-syllable orphan on top. Two more percent buys the line back.
              Measured from the longest rendered line rather than the column's
              full width, the channel never falls below 41px between 1024 and
              1920 in either language.
              Everything below lg is full width; there is no photograph there
              to avoid. */}
          <div className="relative z-10 min-w-0 lg:max-w-[47%] xl:max-w-[45%]">
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
              {/* Only where the two runs actually share a line. The row is
                  ~560px wide and the text column is narrower than that from lg
                  up, where the photograph takes its half — there the row wraps
                  and a divider would be left hanging off the end of the first
                  line with nothing after it. */}
              <span
                aria-hidden="true"
                className="hidden h-3.5 w-px bg-(--color-border-strong) sm:block lg:hidden"
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
          </div>
        </div>

        {/* Numbers, not tick marks. The three green checks this replaces
            repeated the lede almost word for word; a figure with a caption
            carries the same claim and gives the block a second typographic
            voice.
            It runs the full measure beneath BOTH halves, on clean paper, which
            is what ties the picture to the page instead of leaving it as a
            panel bolted on the side. */}
        <Reveal delay={250}>
          <dl className="grid grid-cols-2 border-t border-(--color-border-strong) sm:grid-cols-4">
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
    </section>
  );
}
