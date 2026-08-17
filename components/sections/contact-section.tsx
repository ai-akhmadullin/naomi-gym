"use client";

import { type FormEvent, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { OpenNowBadge } from "@/components/ui/open-now-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_RAW,
  SOCIAL_FACEBOOK_URL,
} from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ContactCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  contactLabel: string;
  contactPlaceholder: string;
  planLabel: string;
  planOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  requiredError: string;
  sideTitle: string;
  sideText: string;
  callLabel: string;
  messengerLabel: string;
  directionsLabel: string;
  reassurance: string;
  privacyNote: string;
};

type OpenStatusCopy = {
  openNow: string;
  closed: string;
  closesAt: string;
  opensAt: string;
};

type ContactSectionProps = {
  index?: string;
  copy: ContactCopy;
  directionsUrl: string;
  locale: Locale;
  openStatus: OpenStatusCopy;
  privacyHref: string;
  privacyLabel: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection({
  index,
  copy,
  directionsUrl,
  locale,
  openStatus,
  privacyHref,
  privacyLabel,
}: ContactSectionProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();

    if (!name || !contact) {
      setError(copy.requiredError);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          plan: String(data.get("plan") ?? ""),
          message: String(data.get("message") ?? "").trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setError(copy.errorMessage);
      setStatus("error");
    }
  }

  // Field height is driven by min-height, NOT padding: a native <select> ignores
  // vertical padding for its height, so padding alone grows the text inputs but
  // not the select. min-height keeps all three control types the same size —
  // change the `min-h-*` value to make the fields taller or shorter.
  //
  // The resting fill is paper, not white. White fields on a white card have to
  // be outlined to exist at all, which turns the form into a stack of boxes;
  // a tinted fill lets the border drop back and the field still reads as a
  // field. Focus then lifts the field to white, so focus is a change in
  // *surface*, not just a ring.
  const inputClasses = cn(
    "w-full min-h-12 rounded-[var(--radius-sm)] border border-(--color-border) bg-(--color-paper) px-4 py-3",
    "text-[0.98rem] text-foreground outline-none transition-[background-color,border-color,box-shadow] duration-200",
    "placeholder:text-(--color-text-faint)",
    "focus:border-(--color-brand) focus:bg-white focus:ring-4 focus:ring-(--color-brand)/10",
  );
  const labelClasses = "mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-(--color-text-faint)";

  return (
    <SectionShell id="contact" tone="paper" space="md">
      <SectionHeading
        eyebrow={copy.eyebrow}
        index={index}
        title={copy.title}
        subtitle={copy.subtitle}
        align="center"
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6">
        {/* Form card */}
        <div className="rounded-[var(--radius-xl)] border border-(--color-border) bg-white p-7 shadow-(--shadow-soft) sm:p-9">
          {status === "success" ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-(--color-brand) text-white shadow-(--shadow-brand)">
                <Icon name="check" className="h-8 w-8" strokeWidth={3} />
              </span>
              <h3 className="mt-6 font-display text-[length:var(--step-2)] font-bold text-foreground">
                {copy.successTitle}
              </h3>
              <p className="mt-2 max-w-sm text-(--color-text-muted)">{copy.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>
                    {copy.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={copy.namePlaceholder}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-info" className={labelClasses}>
                    {copy.contactLabel}
                  </label>
                  <input
                    id="contact-info"
                    name="contact"
                    type="text"
                    placeholder={copy.contactPlaceholder}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-plan" className={labelClasses}>
                  {copy.planLabel}
                </label>
                {/* appearance-none plus a drawn chevron: the native control
                    renders an OS-styled arrow that matches nothing else on the
                    page and changes shape per platform. */}
                <div className="relative">
                  <select
                    id="contact-plan"
                    name="plan"
                    className={cn(inputClasses, "cursor-pointer appearance-none pr-11")}
                    defaultValue={copy.planOptions[0]}
                  >
                    {copy.planOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevron-down"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-muted)"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClasses}>
                  {copy.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder={copy.messagePlaceholder}
                  className={cn(inputClasses, "resize-y")}
                />
              </div>

              <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className={buttonStyles({ variant: "primary", size: "md", className: "w-full sm:w-auto" })}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? copy.sendingLabel : copy.submitLabel}
                  {status !== "sending" ? <Icon name="send" className="h-4 w-4" /> : null}
                </button>
                <p className="text-[0.85rem] text-(--color-text-muted)">{copy.reassurance}</p>
              </div>

              <p className="min-h-5 text-sm font-medium text-red-600" role="status" aria-live="polite">
                {status === "error" ? error : ""}
              </p>

              <p className="text-[0.78rem] leading-relaxed text-(--color-text-faint)">
                {copy.privacyNote}{" "}
                <a href={privacyHref} className="link-underline hover:text-(--color-brand)">
                  {privacyLabel}
                </a>
              </p>
            </form>
          )}
        </div>

        {/* Quick contact panel */}
        <div className="grain grain-dark relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-[image:var(--gradient-ink)] p-7 text-white shadow-(--shadow-card) sm:p-8">
          <div
            aria-hidden="true"
            className="glow absolute -left-20 -top-20 h-60 w-60 [--glow-tint:color-mix(in_srgb,var(--color-brand)_60%,transparent)]"
          />
          <div className="relative z-10 flex h-full flex-col">
            <div>
              <h3 className="font-display text-[length:var(--step-2)] font-bold leading-tight">{copy.sideTitle}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/60">{copy.sideText}</p>
            </div>

            <div className="mt-7 space-y-2.5">
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="group flex items-center gap-4 rounded-[var(--radius-md)] bg-white/[0.06] px-4 py-3.5 transition-colors hover:bg-white/[0.12]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-accent) text-(--color-accent-ink)">
                  <Icon name="phone" className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/45">
                    {copy.callLabel}
                  </span>
                  <span className="block font-semibold tabular-nums">{CONTACT_PHONE_DISPLAY}</span>
                </span>
                {/* The two rows below carry this arrow; without it here the
                    first row read as a heading rather than as the first of
                    three identical actions. */}
                <Icon
                  name="arrow-right"
                  className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70"
                />
              </a>

              {[
                { label: copy.messengerLabel, href: SOCIAL_FACEBOOK_URL, icon: "message-circle" as const },
                { label: copy.directionsLabel, href: directionsUrl, icon: "map-pin" as const },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 rounded-[var(--radius-md)] bg-white/[0.06] px-4 py-3.5 transition-colors hover:bg-white/[0.12]"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    <Icon name={action.icon} className="h-4.5 w-4.5" />
                  </span>
                  <span className="font-semibold">{action.label}</span>
                  <Icon
                    name="arrow-right"
                    className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70"
                  />
                </a>
              ))}
            </div>

            {/* mt-auto only does something when the panel is stretched taller
                than its content — i.e. on lg, next to the taller form card.
                Stacked on mobile it computes to zero and the rule sat glued to
                the action above it, so a real margin backs it up. */}
            <div className="mt-7 border-t border-white/10 pt-5 lg:mt-auto">
              <OpenNowBadge locale={locale} copy={openStatus} tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
