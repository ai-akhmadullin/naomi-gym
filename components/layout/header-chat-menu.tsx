"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import {
  CONTACT_PHONE_RAW,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_WHATSAPP_URL,
  SOCIAL_ZALO_URL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/marketing";

type HeaderChatMenuCopy = {
  chatLabel: string;
  callLabel: string;
  zaloLabel: string;
  whatsappLabel: string;
  messengerLabel: string;
};

type Action = {
  label: string;
  href: string;
  icon: IconName;
  /** Each channel's own brand colour, as on the phone's bottom bar. */
  bg: string;
  external: boolean;
};

/**
 * The desktop home of the chat channels.
 *
 * They used to live in a fixed bubble in the bottom-right corner, which meant
 * one green circle permanently sitting on top of whatever section the reader
 * had scrolled to — a gallery photograph, the map, a review. The bubble was
 * already gone from phones (the sticky bottom bar carries the same four
 * actions); this finishes the job by giving the desktop a place for them that
 * is not over the page. The header has the room, and a reader looking for a way
 * to get in touch looks at the header first anyway.
 *
 * Same interaction contract as LocaleSwitcher: click to open, outside click or
 * Escape to close, menu semantics for assistive tech.
 */
export function HeaderChatMenu({ label, copy }: { label: string; copy: HeaderChatMenuCopy }) {
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

  const actions: Action[] = [
    { label: copy.zaloLabel, href: SOCIAL_ZALO_URL, icon: "zalo", bg: "bg-[#0068FF]", external: true },
    { label: copy.whatsappLabel, href: SOCIAL_WHATSAPP_URL, icon: "whatsapp", bg: "bg-[#25D366]", external: true },
    { label: copy.messengerLabel, href: SOCIAL_FACEBOOK_URL, icon: "facebook", bg: "bg-[#1877F2]", external: true },
    { label: copy.callLabel, href: `tel:${CONTACT_PHONE_RAW}`, icon: "phone", bg: "bg-(--color-brand)", external: false },
  ];

  return (
    <div ref={rootRef} className="relative flex items-center">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.95rem] font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2",
          isOpen ? "bg-(--color-brand-tint) text-(--color-brand)" : "text-(--color-text) hover:text-(--color-brand)",
        )}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {/* A short trigger label, not quickActions.chatLabel: that string is
            written as an invitation ("Chat with us" / "Nhắn tin cho tụi mình")
            for the phone's bottom sheet, and at header size it crowds the nav.
            The long form still does its job as the menu's accessible name. */}
        <Icon name="message-circle" className="h-[1.05rem] w-[1.05rem]" />
        <span className="whitespace-nowrap">{label}</span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label={copy.chatLabel}
          className={cn(
            "absolute right-0 top-[calc(100%+0.85rem)] z-50 min-w-52 overflow-hidden rounded-[var(--radius-md)]",
            "border border-(--color-border) bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(9,34,22,0.22)]",
          )}
        >
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              {...(action.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              role="menuitem"
              className="flex items-center gap-3 rounded-[var(--radius-xs)] px-2.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-(--color-paper)"
              onClick={() => setIsOpen(false)}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white",
                  action.bg,
                )}
              >
                <Icon name={action.icon} className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap">{action.label}</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
