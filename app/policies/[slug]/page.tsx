import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { buttonStyles } from "@/components/ui/button";
import { POLICY_LINKS, SECTION_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLUG_MAP = {
  privacy: {
    title: "Privacy Policy",
    summary: "How we collect, use, and protect your data.",
  },
  terms: {
    title: "Terms of Service",
    summary: "Member responsibilities and gym usage terms.",
  },
  cancellation: {
    title: "Cancellation Policy",
    summary: "Rules around membership changes, pauses, and cancellation windows.",
  },
  conduct: {
    title: "Code of Conduct",
    summary: "Behavior standards that keep our gym respectful and safe.",
  },
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PolicyPage({ params }: PageProps) {
  const { slug } = await params;
  const policy = SLUG_MAP[slug as keyof typeof SLUG_MAP];

  if (!policy) {
    notFound();
  }

  return (
    <>
      <SiteHeader currentPath={`/policies/${slug}`} />
      <main className="min-h-[calc(100dvh-6rem)] bg-(--color-bg-muted) py-20">
        <div className={cn(SECTION_CONTAINER_CLASS, "max-w-4xl") }>
          <article className="rounded-2xl border border-(--color-border) bg-white p-8 shadow-(--shadow-soft) sm:p-10">
            <h1 className="text-5xl font-bold text-foreground">{policy.title}</h1>
            <p className="mt-4 text-2xl text-(--color-text-muted)">{policy.summary}</p>
            <p className="mt-8 text-lg leading-relaxed text-(--color-text-muted)">
              This is a placeholder policy page for v1. Final legal copy will be added before launch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className={buttonStyles({ variant: "primary" })}>
                Back to Home
              </Link>
              <Link href="/buy-membership" className={buttonStyles({ variant: "secondary" })}>
                View Memberships
              </Link>
            </div>
          </article>

          <div className="mt-7 text-sm text-(--color-text-muted)">
            Available policies:{" "}
            {POLICY_LINKS.map((item, index) => (
              <span key={item.id}>
                <Link href={item.href} className="font-medium text-(--color-brand) underline underline-offset-2">
                  {item.label}
                </Link>
                {index < POLICY_LINKS.length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }));
}
