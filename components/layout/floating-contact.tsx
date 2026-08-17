"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import {
  CONTACT_PHONE_RAW,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_WHATSAPP_URL,
  SOCIAL_ZALO_URL,
} from "@/lib/constants";
import type { IconName } from "@/types/marketing";
import { cn } from "@/lib/utils";

type FloatingContactCopy = {
  chatLabel: string;
  closeLabel: string;
  callLabel: string;
  zaloLabel: string;
  whatsappLabel: string;
  messengerLabel: string;
};

type Action = {
  label: string;
  href: string;
  icon: IconName;
  /** Background colour for the action's circular button. */
  bg: string;
  external: boolean;
};

export function FloatingContact({ copy }: { copy: FloatingContactCopy }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const actions: Action[] = [
    { label: copy.zaloLabel, href: SOCIAL_ZALO_URL, icon: "zalo", bg: "bg-[#0068FF]", external: true },
    { label: copy.whatsappLabel, href: SOCIAL_WHATSAPP_URL, icon: "whatsapp", bg: "bg-[#25D366]", external: true },
    { label: copy.messengerLabel, href: SOCIAL_FACEBOOK_URL, icon: "facebook", bg: "bg-[#1877F2]", external: true },
    { label: copy.callLabel, href: `tel:${CONTACT_PHONE_RAW}`, icon: "phone", bg: "bg-(--color-brand)", external: false },
  ];

  return (
    <div
      ref={rootRef}
      // Desktop-only: below lg the StickyJoinBar carries the same chat
      // actions, and a fixed bubble on a phone-width screen is always
      // covering some card's content.
      //
      // pointer-events-none on the wrapper is load-bearing: the closed action
      // list still occupies layout (it is only faded out), so this box is an
      // invisible rectangle over the bottom-right of the screen. As a plain
      // hit-testable div it swallowed every click in that area. Only the
      // button and the open action list opt back in to receiving input.
      className="pointer-events-none fixed right-6 bottom-6 z-30 hidden flex-col items-end gap-3 lg:flex"
    >
      <div
        className={cn(
          "flex flex-col items-end gap-2.5 transition-all duration-200",
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            {...(action.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
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
                "inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform group-hover:scale-105",
                action.bg,
              )}
            >
              <Icon name={action.icon} className="h-6 w-6" />
            </span>
          </a>
        ))}
      </div>

      <button
        type="button"
        aria-label={open ? copy.closeLabel : copy.chatLabel}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-(--color-brand) text-white shadow-(--shadow-brand) transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2"
      >
        <Icon name={open ? "close" : "message-circle"} className="h-7 w-7" />
      </button>
    </div>
  );
}
