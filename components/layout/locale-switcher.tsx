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

/**
 * Short codes, not flag emoji.
 *
 * Two reasons, one of each kind. Practically, a flag is a country and the thing
 * being switched is a language — 🇬🇧 for English is wrong for most of the people
 * who read it, and the glyph itself renders as a different picture on every
 * operating system, so it is the one element on the page whose appearance can't
 * be designed. Visually, a full-colour emoji sitting in a row of set type is the
 * loudest thing in the header for no reason.
 */
const LOCALE_CODES: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
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
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.08em] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2",
          isOpen
            ? "border-(--color-brand)/40 bg-(--color-brand-tint) text-(--color-brand)"
            : "border-(--color-border-strong) text-(--color-text-muted) hover:border-(--color-brand)/40 hover:text-(--color-brand)",
        )}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {LOCALE_CODES[locale]}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={cn("h-1.5 w-2.5 transition-transform duration-200", isOpen && "rotate-180")}
        >
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={cn(
            "absolute left-1/2 top-[calc(100%+0.85rem)] z-50 min-w-40 -translate-x-1/2 overflow-hidden rounded-[var(--radius-md)]",
            "border border-(--color-border) bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(9,34,22,0.22)]",
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
                  "flex items-center gap-3 rounded-[var(--radius-xs)] px-3 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-(--color-brand-tint) text-(--color-brand)"
                    : "text-foreground hover:bg-(--color-paper)",
                )}
                onClick={() => setIsOpen(false)}
              >
                <span className="font-mono text-[0.7rem] tracking-[0.08em] text-(--color-text-faint)">
                  {LOCALE_CODES[targetLocale]}
                </span>
                <span className="whitespace-nowrap">{localeNames[targetLocale]}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
