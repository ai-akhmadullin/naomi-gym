import Image from "next/image";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { BUY_MEMBERSHIP_ROUTE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  membersCount: string;
  membersLabel: string;
};

export function HeroSection({ membersCount, membersLabel }: HeroSectionProps) {
  return (
    <SectionShell id="home" className="bg-(--color-bg-muted)">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <h1 className="max-w-xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-8xl">
            Train stronger at
            <span className="block text-(--color-brand)">Naomi Gym</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--color-text-muted) sm:mt-8 sm:text-xl lg:max-w-2xl lg:text-2xl">
            Transform your body and mind with our expert trainers and a supportive community.
            Your fitness journey starts here.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={BUY_MEMBERSHIP_ROUTE}
              className={buttonStyles({ variant: "primary", size: "lg", className: "w-full sm:w-auto" })}
            >
              Buy Membership
            </Link>
            <a
              href="#pricing"
              className={buttonStyles({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}
            >
              View Pricing
            </a>
          </div>
        </div>

        <div className="relative min-w-0 lg:pl-4">
          <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-(--color-border)">
            <Image
              src="/images/hero/hero-main.svg"
              alt="Membership card"
              width={800}
              height={560}
              className="h-auto w-full"
              priority
            />
          </div>
          <div
            className={cn(
              "absolute -bottom-5 left-6 z-10 w-fit max-w-[16rem] rounded-2xl bg-(--color-brand) p-4 text-white shadow-(--shadow-card)",
              "sm:-bottom-6 sm:left-8 sm:max-w-none sm:p-6",
            )}
          >
            <p className="text-4xl font-bold sm:text-5xl">{membersCount}</p>
            <p className="mt-2 text-2xl font-medium text-white/90 sm:text-3xl">{membersLabel}</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
