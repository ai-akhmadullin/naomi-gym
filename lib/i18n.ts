import { notFound } from "next/navigation";

export const LOCALES = ["en", "vi"] as const;

export type Locale = (typeof LOCALES)[number];

export type PolicySlug = "privacy" | "terms" | "cancellation" | "conduct";

export const POLICY_SLUGS: PolicySlug[] = [
  "privacy",
  "terms",
  "cancellation",
  "conduct",
];

export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (isValidLocale(value)) {
    return value;
  }

  notFound();
}

export function getLocalePath(locale: Locale, path = "") {
  return path ? `/${locale}${path}` : `/${locale}`;
}

export function getEquivalentLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}

export function getPolicyPath(locale: Locale, slug: PolicySlug) {
  return getLocalePath(locale, `/policies/${slug}`);
}
