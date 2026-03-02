import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlansGrid } from "@/components/buy-membership/plans-grid";
import { ScrollToTopOnMount } from "@/components/ui/scroll-to-top-on-mount";
import { PRICING_PLANS } from "@/content/membership";
import { POLICY_LINKS, SECTION_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function BuyMembershipPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <SiteHeader currentPath="/buy-membership" />
      <main className="bg-(--color-bg-muted) py-14 sm:py-20">
        <div className={cn(SECTION_CONTAINER_CLASS, "space-y-8 sm:space-y-10")}>
          <header className="space-y-4 text-center">
            <h1 className="text-balance text-4xl font-bold text-foreground sm:text-6xl lg:text-7xl">
              Choose Your Membership
            </h1>
            <p className="mx-auto max-w-3xl text-pretty text-lg text-(--color-text-muted) sm:text-2xl">
              Choose a plan that fits your routine
            </p>
          </header>

          <PlansGrid plans={PRICING_PLANS} />
        </div>
      </main>
      <SiteFooter policyLinks={POLICY_LINKS} />
    </>
  );
}
