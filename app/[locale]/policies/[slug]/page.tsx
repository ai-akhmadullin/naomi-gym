import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonStyles } from "@/components/ui/button";
import { getDictionary } from "@/content/site";
import { SECTION_CONTAINER_CLASS, SITE_NAME } from "@/lib/constants";
import { assertLocale, getLocalePath, getPolicyPath, LOCALES, POLICY_SLUGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = assertLocale(localeParam);

  if (slug !== "privacy") {
    return {};
  }

  const { privacy } = getDictionary(locale).policies;
  return {
    title: privacy.title,
    description: privacy.intro,
    openGraph: {
      title: `${privacy.title} | ${SITE_NAME}`,
      description: privacy.intro,
    },
  };
}

export default async function LocalizedPolicyPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = assertLocale(localeParam);

  if (slug !== "privacy") {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const { privacy, backToHome } = dictionary.policies;
  const homePath = getLocalePath(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        currentPath={getPolicyPath(locale, "privacy")}
        navItems={dictionary.navItems}
        joinLabel={dictionary.header.joinNow}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />
      <main className="min-h-[calc(100dvh-6rem)] bg-(--color-bg-muted) py-16 sm:py-20">
        <div className={cn(SECTION_CONTAINER_CLASS, "max-w-3xl")}>
          <article className="rounded-3xl border border-(--color-border) bg-white p-8 shadow-(--shadow-soft) sm:p-10">
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{privacy.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-(--color-text-muted)">{privacy.intro}</p>

            <div className="mt-10 space-y-8">
              {privacy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">{section.heading}</h2>
                  <p className="mt-2 text-base leading-relaxed text-(--color-text-muted)">{section.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-10">
              <Link href={homePath} className={buttonStyles({ variant: "primary" })}>
                {backToHome}
              </Link>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return POLICY_SLUGS.flatMap((slug) => LOCALES.map((locale) => ({ locale, slug })));
}
