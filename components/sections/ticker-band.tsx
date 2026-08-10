import { Icon } from "@/components/ui/icon";

type TickerBandProps = {
  items: string[];
  label: string;
};

/**
 * A thin dark strip directly under the hero. Two jobs:
 *
 *  1. Rhythm. The page previously ran nine light sections in a row, alternating
 *     white and tinted, which reads as one long slab. A short dark band this
 *     early establishes that the page has more than one register — and makes
 *     the dark gallery and footer later on feel like a system rather than
 *     two one-offs.
 *  2. It absorbs the short proof phrases that used to sit under the hero CTAs
 *     as a row of green check marks, where they simply restated the lede.
 *
 * The track is rendered twice and translated by exactly -50%, so the second
 * copy lands where the first began and the loop has no visible seam.
 */
export function TickerBand({ items, label }: TickerBandProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="grain grain-dark relative overflow-hidden bg-(--color-ink) py-3.5 text-white"
      role="region"
      aria-label={label}
    >
      {/* Fades the strip into its own edges so phrases enter and leave instead
          of being chopped at the viewport boundary. */}
      <div className="relative z-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              // Only the first copy is exposed to assistive tech; the second is
              // a visual duplicate that exists purely to close the loop.
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex shrink-0 items-center"
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="flex shrink-0 items-center gap-4 pr-10 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white/75"
                >
                  <Icon name="dumbbell" className="h-3.5 w-3.5 shrink-0 text-(--color-accent)" />
                  <span className="whitespace-nowrap">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
