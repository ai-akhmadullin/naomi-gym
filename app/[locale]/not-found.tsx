import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { getDictionary } from "@/content/site";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

type NotFoundProps = {
  params?: {
    locale?: Locale;
  };
};

export default function LocalizedNotFound({ params }: NotFoundProps) {
  const locale = params?.locale ?? DEFAULT_LOCALE;
  const dictionary = getDictionary(locale);

  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-bg-muted) px-6">
      <section className="max-w-xl rounded-2xl border border-(--color-border) bg-white p-10 text-center shadow-(--shadow-soft)">
        <p className="text-sm font-semibold uppercase tracking-wide text-(--color-brand)">404</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground">{dictionary.notFound.title}</h1>
        <p className="mt-4 text-lg text-(--color-text-muted)">
          {dictionary.notFound.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href={`/${locale}/buy-membership`} className={buttonStyles({ variant: "secondary", size: "md" })}>
            {dictionary.notFound.buyMembership}
          </Link>
          <Link href={`/${locale}`} className={buttonStyles({ variant: "primary", size: "md" })}>
            {dictionary.notFound.backHome}
          </Link>
        </div>
      </section>
    </main>
  );
}
