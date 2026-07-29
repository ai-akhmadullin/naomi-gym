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
  copy: ContactCopy;
  directionsUrl: string;
  locale: Locale;
  openStatus: OpenStatusCopy;
  privacyHref: string;
  privacyLabel: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection({
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
  const inputClasses =
    "w-full min-h-13 rounded-xl border border-(--color-border) bg-white px-4 py-3 text-base text-foreground outline-none transition focus:border-(--color-brand) focus:ring-2 focus:ring-(--color-brand)/20 placeholder:text-(--color-text-muted)/70";
  const labelClasses = "mb-1.5 block text-sm font-semibold text-foreground";

  return (
    <SectionShell id="contact" className="bg-(--color-bg-muted)">
      <SectionHeading title={copy.title} subtitle={copy.subtitle} align="center" />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Form card */}
        <div className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-(--shadow-soft) sm:p-8">
          {status === "success" ? (
            <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-white shadow-(--shadow-brand)">
                <Icon name="check" className="h-8 w-8" strokeWidth={3} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-foreground">{copy.successTitle}</h3>
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
                <select id="contact-plan" name="plan" className={inputClasses} defaultValue={copy.planOptions[0]}>
                  {copy.planOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className={buttonStyles({ variant: "primary", size: "md", className: "w-full sm:w-auto" })}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? copy.sendingLabel : copy.submitLabel}
                  {status !== "sending" ? <Icon name="send" className="h-4 w-4" /> : null}
                </button>
                <p className="text-sm text-(--color-text-muted)">{copy.reassurance}</p>
              </div>

              <p className="min-h-5 text-sm font-medium text-red-600" role="status" aria-live="polite">
                {status === "error" ? error : ""}
              </p>

              <p className="text-xs leading-relaxed text-(--color-text-muted)">
                {copy.privacyNote}{" "}
                <a href={privacyHref} className="underline underline-offset-2 hover:text-(--color-brand)">
                  {privacyLabel}
                </a>
              </p>
            </form>
          )}
        </div>

        {/* Quick contact panel */}
        <div className="flex flex-col gap-4 rounded-3xl bg-[image:var(--gradient-ink)] p-6 text-white shadow-(--shadow-card) sm:p-8">
          <div>
            <h3 className="font-display text-2xl font-bold">{copy.sideTitle}</h3>
            <p className="mt-2 text-white/70">{copy.sideText}</p>
          </div>

          <div className="mt-1 space-y-3">
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3.5 transition hover:bg-white/15"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-white">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-white/60">{copy.callLabel}</span>
                <span className="font-semibold">{CONTACT_PHONE_DISPLAY}</span>
              </span>
            </a>

            <a
              href={SOCIAL_FACEBOOK_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3.5 transition hover:bg-white/15"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                <Icon name="message-circle" className="h-5 w-5" />
              </span>
              <span className="font-semibold">{copy.messengerLabel}</span>
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3.5 transition hover:bg-white/15"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                <Icon name="map-pin" className="h-5 w-5" />
              </span>
              <span className="font-semibold">{copy.directionsLabel}</span>
            </a>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <OpenNowBadge locale={locale} copy={openStatus} tone="dark" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
