import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-brand)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-brand-lift)] focus-visible:ring-[var(--color-brand)]",
  secondary:
    "border border-[var(--color-border)] bg-white text-[var(--color-text)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-brand)_45%,transparent)] hover:text-[var(--color-brand)] focus-visible:ring-[var(--color-brand)]",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] focus-visible:ring-[var(--color-brand)]",
  outline:
    "border border-white/70 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base",
  lg: "h-13 px-6 text-base sm:h-15 sm:px-9 sm:text-lg",
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
    "group inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
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
