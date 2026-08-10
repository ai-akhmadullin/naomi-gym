import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import type { PricingPlan } from "@/types/marketing";
import { cn } from "@/lib/utils";

type PricingPlanCardProps = {
  plan: PricingPlan;
  cta: ReactNode;
  highlightLabel: string;
  headingTag?: "h2" | "h3";
};

/**
 * The highlighted plan is a different *surface*, not the same white card scaled
 * up 2% with a hairline on top — at that strength the "most popular" cue was
 * invisible unless you were comparing the two cards side by side, which is
 * exactly what a recommendation is supposed to save the reader from doing.
 */
export function PricingPlanCard({ plan, cta, highlightLabel, headingTag = "h3" }: PricingPlanCardProps) {
  const HeadingTag = headingTag;
  const featured = plan.highlight;

  return (
    <div
      className={cn(
        "relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-xl)] p-7 sm:p-9",
        featured
          ? "grain grain-dark bg-[image:var(--gradient-ink)] text-white shadow-(--shadow-card)"
          : "border border-(--color-border) bg-white text-(--color-text) shadow-(--shadow-soft)",
      )}
    >
      {featured ? (
        <div
          aria-hidden="true"
          className="glow absolute -right-28 -top-28 h-72 w-72 [--glow-tint:color-mix(in_srgb,var(--color-brand)_65%,transparent)]"
        />
      ) : null}

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <HeadingTag
              className={cn(
                "font-display text-[length:var(--step-2)] font-bold leading-tight",
                featured ? "text-white" : "text-foreground",
              )}
            >
              {plan.name}
            </HeadingTag>
            {plan.tagline ? (
              <p className={cn("mt-1 text-sm", featured ? "text-white/55" : "text-(--color-text-muted)")}>
                {plan.tagline}
              </p>
            ) : null}
          </div>
          {featured ? (
            <span className="shrink-0 rounded-full bg-(--color-accent) px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-(--color-accent-ink)">
              {highlightLabel}
            </span>
          ) : null}
        </div>

        {/* Sized to keep "300.000 VND" and its unit on one line — at the full
            display step the price alone filled the card width and pushed
            "/month" onto a line of its own, which read as a layout accident. */}
        <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
          <span
            className={cn(
              "font-display text-[clamp(1.9rem,1.35rem+1.8vw,2.6rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums",
              featured ? "text-(--color-accent)" : "text-foreground",
            )}
          >
            {plan.priceLabel}
          </span>
          <span className={cn("text-[0.95rem] font-medium", featured ? "text-white/55" : "text-(--color-text-muted)")}>
            /{plan.billingPeriodLabel}
          </span>
        </p>

        {plan.features && plan.features.length > 0 ? (
          <ul
            className={cn(
              "mt-8 space-y-3.5 border-t pt-8",
              featured ? "border-white/12" : "border-(--color-border)",
            )}
          >
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[0.98rem] leading-relaxed">
                <Icon
                  name="check"
                  strokeWidth={3}
                  className={cn(
                    "mt-[0.3rem] h-3.5 w-3.5 shrink-0",
                    featured ? "text-(--color-accent)" : "text-(--color-brand)",
                  )}
                />
                <span className={featured ? "text-white/80" : "text-(--color-text-muted)"}>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-9">{cta}</div>
      </div>
    </div>
  );
}
