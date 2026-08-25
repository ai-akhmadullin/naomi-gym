import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "outline" | "inverse";
type ButtonSize = "sm" | "md" | "lg";
/**
 * How far off its background the button is meant to sit.
 *
 * "raised" is the default and is correct on a page: a coloured drop shadow plus
 * a hover lift. "flat" is for a button INSIDE a surface that is already floating
 * — the sticky bottom bar, the sticky header. Those surfaces carry their own
 * elevation, and stacking a second shadow on a child produces a shadow with
 * nowhere to fall: in a bar only 12px taller than its button, the brand shadow's
 * outer layer (12px down, 20px blur, 40% green) spills past the bar's padding
 * and lands on white as a green smear rather than as lift.
 *
 * Flat keeps the fill, the inset top highlight and the colour change on hover.
 * It drops only the drop shadow and the translate.
 */
type ButtonElevation = "raised" | "flat";

/**
 * `primary` is a flat green, not a gradient. The gradient was previously on the
 * logo, every icon tile, every badge, the FAQ chevron and every button at once,
 * so it had stopped signalling anything. It now appears only on large decorative
 * surfaces; buttons get their weight from colour and shadow instead.
 *
 * The inset top highlight on the filled variants is a 1px light line along the
 * upper edge — it reads as a lit surface and stops a flat fill from looking
 * like a coloured rectangle. It survives into the flat elevation, because it is
 * the part that models the button's own material rather than its height off the
 * page.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-(--color-brand) text-white",
    "hover:bg-(--color-brand-strong)",
    "focus-visible:ring-(--color-brand)",
  ),
  accent: cn(
    "bg-(--color-accent) text-(--color-accent-ink)",
    "hover:bg-(--color-accent-deep)",
    "focus-visible:ring-(--color-accent-deep)",
  ),
  secondary: cn(
    "border border-(--color-border-strong) bg-white text-(--color-text)",
    "hover:border-[color-mix(in_srgb,var(--color-brand)_45%,transparent)] hover:text-(--color-brand)",
    "focus-visible:ring-(--color-brand)",
  ),
  ghost: "bg-transparent text-(--color-text) hover:bg-(--color-paper-deep) focus-visible:ring-(--color-brand)",
  outline: "border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/10 focus-visible:ring-white",
  inverse: cn(
    "bg-white text-(--color-brand-strong)",
    "hover:bg-(--color-accent) hover:text-(--color-accent-ink)",
    "focus-visible:ring-white",
  ),
};

/**
 * Split out of VARIANT_CLASSES rather than overridden at the call site: `cn` is
 * a plain string joiner with no tailwind-merge, so a `shadow-none` passed in
 * through className would not beat `shadow-[…]` — both would land in the class
 * list and stylesheet order would pick the winner.
 */
const ELEVATION_CLASSES: Record<ButtonVariant, Record<ButtonElevation, string>> = {
  primary: {
    raised: cn(
      "shadow-[var(--shadow-brand),inset_0_1px_0_rgba(255,255,255,0.18)]",
      "hover:-translate-y-0.5 hover:shadow-[var(--shadow-brand-lift),inset_0_1px_0_rgba(255,255,255,0.18)]",
    ),
    flat: "shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
  },
  accent: {
    raised: cn(
      "shadow-[0_10px_20px_-10px_rgba(120,160,20,0.7),inset_0_1px_0_rgba(255,255,255,0.4)]",
      "hover:-translate-y-0.5",
    ),
    flat: "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
  },
  secondary: {
    raised: "shadow-(--shadow-soft) hover:-translate-y-0.5",
    flat: "",
  },
  ghost: { raised: "", flat: "" },
  outline: { raised: "", flat: "" },
  inverse: {
    raised: "shadow-[0_12px_24px_-14px_rgba(0,0,0,0.6)] hover:-translate-y-0.5",
    flat: "",
  },
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem] sm:h-12 sm:px-6",
  lg: "h-13 px-7 text-base sm:h-14 sm:px-9 sm:text-[1.05rem]",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  elevation?: ButtonElevation;
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  elevation = "raised",
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold tracking-[-0.01em]",
    "transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)",
    "active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
    VARIANT_CLASSES[variant],
    ELEVATION_CLASSES[variant][elevation],
    SIZE_CLASSES[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  elevation?: ButtonElevation;
};

export function Button({
  className,
  variant,
  size,
  elevation,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, elevation, className })}
      {...props}
    />
  );
}
