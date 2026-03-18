import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-bg-muted) px-6">
      <section className="max-w-xl rounded-2xl border border-(--color-border) bg-white p-10 text-center shadow-(--shadow-soft)">
        <p className="text-sm font-semibold uppercase tracking-wide text-(--color-brand)">404</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground">Page not found</h1>
        <p className="mt-4 text-lg text-(--color-text-muted)">
          The page you requested does not exist yet. Return home or continue to membership options.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/en/buy-membership" className={buttonStyles({ variant: "secondary", size: "md" })}>
            Buy Membership
          </Link>
          <Link href="/en" className={buttonStyles({ variant: "primary", size: "md" })}>
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
