"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/marketing";

type FaqSectionProps = {
  title: string;
  subtitle: string;
  faqs: FaqItem[];
};

export function FaqSection({ title, subtitle, faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionShell id="faq">
      <SectionHeading title={title} subtitle={subtitle} align="center" />

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const buttonId = `${faq.id}-button`;
          const panelId = `${faq.id}-panel`;

          return (
            <div
              key={faq.id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white transition-colors duration-200",
                isOpen ? "border-(--color-brand)/30 shadow-(--shadow-soft)" : "border-(--color-border)",
              )}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-foreground sm:px-6 sm:py-5 sm:text-lg"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  {faq.question}
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isOpen ? "rotate-180 bg-[image:var(--gradient-brand)] text-white" : "bg-(--color-bg-muted) text-(--color-brand)",
                    )}
                  >
                    <Icon name="chevron-down" className="h-5 w-5" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-base leading-relaxed text-(--color-text-muted) sm:px-6 sm:pb-6 sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
