"use client";

import { useEffect, useState } from "react";

import { formatTime, getOpenStatus, type OpenStatus } from "@/lib/hours";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type OpenStatusCopy = {
  openNow: string;
  closed: string;
  closesAt: string;
  opensAt: string;
};

type OpenNowBadgeProps = {
  locale: Locale;
  copy: OpenStatusCopy;
  className?: string;
  /** "dark" tunes colours for placement on a dark background. */
  tone?: "light" | "dark";
  /** "badge" is a pill; "text" is inline plain text with a status dot. */
  variant?: "badge" | "text";
};

export function OpenNowBadge({
  locale,
  copy,
  className,
  tone = "light",
  variant = "badge",
}: OpenNowBadgeProps) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(new Date()));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Render nothing until the client has computed the live status (avoids any
  // SSR/timezone mismatch). This is a progressive enhancement.
  if (!status) {
    return null;
  }

  const time = formatTime(status.changeMinutes, locale);
  const detail = status.open
    ? copy.closesAt.replace("{time}", time)
    : copy.opensAt.replace("{time}", time);

  const dot = (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      {status.open ? (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-brand) opacity-75" />
      ) : null}
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          status.open ? "bg-(--color-brand)" : "bg-amber-500",
        )}
      />
    </span>
  );

  if (variant === "text") {
    const statusColor =
      tone === "dark"
        ? status.open
          ? "text-white"
          : "text-amber-200"
        : status.open
          ? "text-(--color-brand)"
          : "text-amber-600";

    return (
      <span className={cn("inline-flex items-center gap-2 text-sm font-semibold", className)}>
        {dot}
        <span className={statusColor}>{status.open ? copy.openNow : copy.closed}</span>
        <span className="font-normal text-(--color-text-muted)">· {detail}</span>
      </span>
    );
  }

  const toneClasses =
    tone === "dark"
      ? status.open
        ? "border-white/15 bg-white/10 text-white"
        : "border-white/15 bg-white/10 text-amber-200"
      : status.open
        ? "border-(--color-brand)/20 bg-(--color-brand)/8 text-(--color-brand)"
        : "border-amber-300/50 bg-amber-50 text-amber-700";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold",
        toneClasses,
        className,
      )}
    >
      {dot}
      <span>{status.open ? copy.openNow : copy.closed}</span>
      <span className="font-normal opacity-80">· {detail}</span>
    </span>
  );
}
