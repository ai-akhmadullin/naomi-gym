import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";
import { assertLocale, LOCALES } from "@/lib/i18n";
import { getDictionary } from "@/content/site";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: dictionary.metadata.description,
    openGraph: {
      title: SITE_NAME,
      description: dictionary.metadata.description,
      type: "website",
      locale,
    },
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  assertLocale((await params).locale);

  return children;
}
