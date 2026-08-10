import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "outline" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

/**
 * `primary` is a flat green, not a gradient. The gradient was previously on the
 * logo, every icon tile, every badge, the FAQ chevron and every button at once,
 * so it had stopped signalling anything. It now appears only on large decorative
 * surfaces; buttons get their weight from colour and shadow instead.
 *
 * The inset top highlight on the filled variants is a 1px light line along the
 * upper edge — it reads as a lit surface and stops a flat fill from looking
 * like a coloured rectangle.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-(--color-brand) text-white shadow-[var(--shadow-brand),inset_0_1px_0_rgba(255,255,255,0.18)]",
    "hover:-translate-y-0.5 hover:bg-(--color-brand-strong) hover:shadow-[var(--shadow-brand-lift),inset_0_1px_0_rgba(255,255,255,0.18)]",
    "focus-visible:ring-(--color-brand)",
  ),
  accent: cn(
    "bg-(--color-accent) text-(--color-accent-ink) shadow-[0_10px_20px_-10px_rgba(120,160,20,0.7),inset_0_1px_0_rgba(255,255,255,0.4)]",
    "hover:-translate-y-0.5 hover:bg-(--color-accent-deep)",
    "focus-visible:ring-(--color-accent-deep)",
  ),
  secondary: cn(
    "border border-(--color-border-strong) bg-white text-(--color-text) shadow-(--shadow-soft)",
    "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-brand)_45%,transparent)] hover:text-(--color-brand)",
    "focus-visible:ring-(--color-brand)",
  ),
  ghost: "bg-transparent text-(--color-text) hover:bg-(--color-paper-deep) focus-visible:ring-(--color-brand)",
  outline: "border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/10 focus-visible:ring-white",
  inverse: cn(
    "bg-white text-(--color-brand-strong) shadow-[0_12px_24px_-14px_rgba(0,0,0,0.6)]",
    "hover:-translate-y-0.5 hover:bg-(--color-accent) hover:text-(--color-accent-ink)",
    "focus-visible:ring-white",
  ),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem] sm:h-12 sm:px-6",
  lg: "h-13 px-7 text-base sm:h-14 sm:px-9 sm:text-[1.05rem]",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold tracking-[-0.01em]",
    "transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)",
    "active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
