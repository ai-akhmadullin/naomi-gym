"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { getEquivalentLocalePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  currentPath: string;
  localeNames: Record<Locale, string>;
  label: string;
};

const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  vi: "🇻🇳",
};

export function LocaleSwitcher({
  locale,
  currentPath,
  localeNames,
  label,
}: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative flex items-center">
      <button
        type="button"
        className="inline-flex items-center justify-center text-[1.9rem] leading-none transition hover:scale-[1.04] hover:opacity-80 translate-y-[1px]"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="block text-2xl leading-none">{LOCALE_FLAGS[locale]}</span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={cn(
            "absolute left-1/2 top-[calc(100%+1.0rem)] z-50 min-w-36 -translate-x-1/2 overflow-hidden rounded-2xl",
            "border border-(--color-border) bg-white p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]",
          )}
        >
          {(Object.keys(localeNames) as Locale[]).map((targetLocale) => {
            const isActive = targetLocale === locale;

            return (
              <Link
                key={targetLocale}
                href={getEquivalentLocalePath(currentPath, targetLocale)}
                hrefLang={targetLocale}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  isActive ? "bg-(--color-bg-muted) text-(--color-brand)" : "text-foreground hover:bg-(--color-bg-muted)",
                )}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl leading-none">{LOCALE_FLAGS[targetLocale]}</span>
                <span className="whitespace-nowrap">{localeNames[targetLocale]}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
