import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonStyles } from "@/components/ui/button";
import { getDictionary } from "@/content/site";
import { SECTION_CONTAINER_CLASS, SITE_NAME } from "@/lib/constants";
import { assertLocale, getLocalePath, getPolicyPath, LOCALES, POLICY_SLUGS, type PolicySlug } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = assertLocale(localeParam);
  const policySlug = slug as PolicySlug;
  const dictionary = getDictionary(locale);
  const policy = dictionary.policies.pages[policySlug];

  if (!policy) {
    return {};
  }

  return {
    title: policy.title,
    description: policy.summary,
    openGraph: {
      title: `${policy.title} | ${SITE_NAME}`,
      description: policy.summary,
    },
  };
}

export default async function LocalizedPolicyPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = assertLocale(localeParam);
  const dictionary = getDictionary(locale);
  const policySlug = slug as PolicySlug;
  const policy = dictionary.policies.pages[policySlug];

  if (!policy) {
    notFound();
  }

  const currentPath = getPolicyPath(locale, policySlug);
  const homePath = getLocalePath(locale);
  const buyMembershipPath = getLocalePath(locale, "/buy-membership");
  const policyLinks = dictionary.policies.links.map((item) => ({
    ...item,
    href: getPolicyPath(locale, item.id as PolicySlug),
  }));

  return (
    <>
      <SiteHeader
        locale={locale}
        currentPath={currentPath}
        navItems={dictionary.navItems}
        buyMembershipLabel={dictionary.header.buyMembership}
        primaryNavLabel={dictionary.header.primaryNavLabel}
        languageSwitcherLabel={dictionary.header.languageSwitcherLabel}
        localeNames={dictionary.localeNames}
        mobileNavCopy={dictionary.mobileNav}
      />
      <main className="min-h-[calc(100dvh-6rem)] bg-(--color-bg-muted) py-20">
        <div className={cn(SECTION_CONTAINER_CLASS, "max-w-4xl") }>
          <article className="rounded-2xl border border-(--color-border) bg-white p-8 shadow-(--shadow-soft) sm:p-10">
            <h1 className="text-5xl font-bold text-foreground">{policy.title}</h1>
            <p className="mt-4 text-2xl text-(--color-text-muted)">{policy.summary}</p>
            <p className="mt-8 text-lg leading-relaxed text-(--color-text-muted)">
              {dictionary.policies.placeholder}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={homePath} className={buttonStyles({ variant: "primary" })}>
                {dictionary.policies.backToHome}
              </Link>
              <Link href={buyMembershipPath} className={buttonStyles({ variant: "secondary" })}>
                {dictionary.policies.viewMemberships}
              </Link>
            </div>
          </article>

          <div className="mt-7 text-sm text-(--color-text-muted)">
            {dictionary.policies.availablePoliciesLabel}{" "}
            {policyLinks.map((item, index) => (
              <span key={item.id}>
                <Link href={item.href} className="font-medium text-(--color-brand) underline underline-offset-2">
                  {item.label}
                </Link>
                {index < policyLinks.length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return POLICY_SLUGS.flatMap((slug) => LOCALES.map((locale) => ({ locale, slug })));
}
