import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-strong)] focus-visible:ring-[var(--color-brand)]",
  secondary:
    "bg-white text-[var(--color-brand)] hover:bg-[var(--color-brand)]/10 focus-visible:ring-[var(--color-brand)]",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] focus-visible:ring-[var(--color-brand)]",
  outline:
    "border border-white/70 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base",
  lg: "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-xl",
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
    "inline-flex items-center justify-center rounded-xl text-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-60",
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
