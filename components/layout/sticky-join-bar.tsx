"use client";

import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CONTACT_PHONE_RAW } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StickyJoinBarProps = {
  joinHref: string;
  joinLabel: string;
  callLabel: string;
};

export function StickyJoinBar({ joinHref, joinLabel, callLabel }: StickyJoinBarProps) {
  // Hide the bar while the contact section is on screen — it would be redundant.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => setHidden(entries[0]?.isIntersecting ?? false),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-out lg:hidden",
        hidden ? "translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex gap-3 border-t border-(--color-border) bg-white/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgba(8,30,19,0.35)] backdrop-blur-md">
        <a
          href={`tel:${CONTACT_PHONE_RAW}`}
          className={buttonStyles({ variant: "secondary", size: "md", className: "flex-1" })}
        >
          <Icon name="phone" className="h-5 w-5" />
          {callLabel}
        </a>
        <a
          href={joinHref}
          className={buttonStyles({ variant: "primary", size: "md", className: "flex-[1.6]" })}
        >
          {joinLabel}
          <Icon name="arrow-right" className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
