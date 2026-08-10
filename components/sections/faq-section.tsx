"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_RAW } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/marketing";

type FaqSectionProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  subtitle: string;
  callLabel: string;
  faqs: FaqItem[];
};

export function FaqSection({ eyebrow, index, title, subtitle, callLabel, faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionShell id="faq" tone="white" space="md">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        {/* Heading sits beside the list rather than centred above it. A centred
            heading over a narrow centred column left two large empty margins
            and made the section the emptiest part of the page. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={eyebrow}
            index={index}
            title={title}
            subtitle={subtitle}
            flush
          />
          {/* An answer the list can't give. This column is short by design, and
              an escape hatch is more use in the space than more air. */}
          <a
            href={`tel:${CONTACT_PHONE_RAW}`}
            className="group mt-8 inline-flex items-center gap-3 text-[0.95rem] font-semibold text-(--color-brand)"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-brand-tint) transition-colors group-hover:bg-(--color-brand) group-hover:text-white">
              <Icon name="phone" className="h-4 w-4" />
            </span>
            <span className="link-underline tabular-nums">
              {callLabel} · {CONTACT_PHONE_DISPLAY}
            </span>
          </a>
        </div>

        {/* A hairline-separated list, not five bordered boxes. Rows in a list
            read as one object with parts; boxes read as five unrelated objects,
            which is why the section felt heavier than the four questions in it
            deserved. */}
        <div className="border-t border-(--color-border)">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const buttonId = `${faq.id}-button`;
            const panelId = `${faq.id}-panel`;

            return (
              <div key={faq.id} className="border-b border-(--color-border)">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-4 focus-visible:ring-offset-(--color-bg) sm:py-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span
                      className={cn(
                        "text-[length:var(--step-1)] font-semibold tracking-[-0.01em] transition-colors",
                        isOpen ? "text-(--color-brand)" : "text-foreground group-hover:text-(--color-brand)",
                      )}
                    >
                      {faq.question}
                    </span>
                    {/* Plus that becomes a minus: two 1px bars, one of which
                        rotates away. A rotating chevron only ever reads as
                        "collapsed/expanded" after you notice it moved; +/− says
                        it while standing still. */}
                    <span
                      aria-hidden="true"
                      className="relative mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "absolute h-[1.5px] w-4 rounded-full transition-colors duration-200",
                          isOpen ? "bg-(--color-brand)" : "bg-(--color-text-muted)",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute h-[1.5px] w-4 rounded-full transition-[transform,background-color] duration-300 ease-out",
                          isOpen ? "rotate-0 bg-(--color-brand)" : "rotate-90 bg-(--color-text-muted)",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-10 text-[1rem] leading-[1.7] text-(--color-text-muted)">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
