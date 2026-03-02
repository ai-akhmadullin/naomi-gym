"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import type { FaqItem } from "@/types/marketing";

type FaqSectionProps = {
  faqs: FaqItem[];
};

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionShell id="faq" className="bg-(--color-bg-muted)">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before joining"
        align="center"
      />

      <div className="mx-auto max-w-5xl space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const buttonId = `${faq.id}-button`;
          const panelId = `${faq.id}-panel`;

          return (
            <Card key={faq.id} className="overflow-hidden">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-foreground sm:px-6 sm:py-5 sm:text-2xl"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  {faq.question}
                  <Icon
                    name="chevron-down"
                    className={`h-6 w-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-base leading-relaxed text-(--color-text-muted) sm:px-6 sm:pb-6 sm:text-xl">{faq.answer}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
