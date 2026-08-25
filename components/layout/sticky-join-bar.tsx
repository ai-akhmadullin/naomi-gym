"use client";

import { useEffect, useRef, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  CONTACT_PHONE_RAW,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_WHATSAPP_URL,
  SOCIAL_ZALO_URL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/marketing";

type ChatCopy = {
  chatLabel: string;
  closeLabel: string;
  zaloLabel: string;
  whatsappLabel: string;
  messengerLabel: string;
};

type StickyJoinBarProps = {
  joinHref: string;
  joinLabel: string;
  callLabel: string;
  chat: ChatCopy;
};

/**
 * The phone's one fixed surface. Call, Join and the chat apps all live here.
 * Nothing floats over the page at any width: on a 390px screen a fixed bubble
 * is always sitting on top of some card's text, and on a desktop it was always
 * sitting on top of a photograph — so the desktop's copy of these actions is in
 * the header (see HeaderChatMenu), not in the corner.
 *
 * The bar never hides. It used to slide away while the contact section was on
 * screen ("redundant next to the form"), but from the phone the effect was two
 * buttons vanishing for no visible reason.
 */
export function StickyJoinBar({ joinHref, joinLabel, callLabel, chat }: StickyJoinBarProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-direction chrome, same contract as Safari's own bars: reading
  // (scrolling down) hides it, any intent to act (scrolling up) brings it
  // back. The 6px dead zone filters out iOS momentum jitter, and near the top
  // of the page the bar is always shown so it never pops in over the hero.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        if (y < 120) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const actions: { label: string; href: string; icon: IconName; bg: string }[] = [
    { label: chat.zaloLabel, href: SOCIAL_ZALO_URL, icon: "zalo", bg: "bg-[#0068FF]" },
    { label: chat.whatsappLabel, href: SOCIAL_WHATSAPP_URL, icon: "whatsapp", bg: "bg-[#25D366]" },
    { label: chat.messengerLabel, href: SOCIAL_FACEBOOK_URL, icon: "facebook", bg: "bg-[#1877F2]" },
  ];

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ease-out lg:hidden",
        // An open chat menu pins the bar: hiding it would take the menu along.
        hidden && !open ? "translate-y-full" : "translate-y-0",
      )}
    >
      {/* Chat menu, popping up from the bar's chat button. */}
      <div
        className={cn(
          "absolute bottom-full right-4 mb-3 flex flex-col items-end gap-2.5 transition-all duration-200",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-2.5"
            style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-foreground shadow-(--shadow-soft)">
              {action.label}
            </span>
            <span
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg",
                action.bg,
              )}
            >
              <Icon name={action.icon} className="h-5.5 w-5.5" />
            </span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2.5 border-t border-(--color-border) bg-white/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgba(8,30,19,0.35)] backdrop-blur-md">
        {/* elevation="flat" on both: this bar is already a floating surface
            with its own upward shadow and a hairline, so a shadow on a child
            inside it is a second elevation with nowhere to fall. The green one
            was the visible offender — the bar is 12px taller than the button
            and the brand shadow reaches 32px, so it painted a haze across the
            white strip underneath rather than lifting anything. */}
        <a
          href={`tel:${CONTACT_PHONE_RAW}`}
          className={buttonStyles({
            variant: "secondary",
            size: "md",
            elevation: "flat",
            className: "flex-1",
          })}
        >
          <Icon name="phone" className="h-5 w-5" />
          {callLabel}
        </a>
        <a
          href={joinHref}
          className={buttonStyles({
            variant: "primary",
            size: "md",
            elevation: "flat",
            className: "flex-[1.6]",
          })}
        >
          {joinLabel}
          <Icon name="arrow-right" className="h-5 w-5" />
        </a>
        {/* Hand-rolled rather than buttonStyles: it needs px-0 and a fixed
            width, and cn has no tailwind-merge to reliably override the size
            preset's padding. */}
        <button
          type="button"
          aria-label={open ? chat.closeLabel : chat.chatLabel}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:h-12 sm:w-12",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2",
            open
              ? "bg-(--color-brand) text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
              : "border border-(--color-border-strong) bg-white text-(--color-brand)",
          )}
        >
          <Icon name={open ? "close" : "message-circle"} className="h-5.5 w-5.5" />
        </button>
      </div>
    </div>
  );
}
