"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn, createCheckoutSessionStub } from "@/lib/utils";
import type { CheckoutResult } from "@/types/marketing";

type CheckoutStubButtonProps = {
  planId: string;
  planName: string;
  ctaLabel: string;
  highlight?: boolean;
};

export function CheckoutStubButton({
  planId,
  planName,
  ctaLabel,
  highlight = false,
}: CheckoutStubButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  async function onCheckout() {
    setIsLoading(true);
    setResult(null);

    try {
      const checkoutResult = await createCheckoutSessionStub({ planId });
      setResult(checkoutResult);
    } catch {
      setResult({
        status: "stub",
        message: "Checkout is temporarily unavailable. Please try again in a moment.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Button
        variant={highlight ? "primary" : "secondary"}
        size="md"
        className={cn(
          "w-full",
          !highlight && "bg-(--color-bg-muted)! hover:bg-(--color-brand)/15! border border-(--color-border)",
        )}
        onClick={onCheckout}
        aria-label={`Start checkout for ${planName} plan`}
        disabled={isLoading}
      >
        {isLoading ? "Preparing checkout..." : ctaLabel}
      </Button>
      <p className="mt-3 min-h-12 text-sm text-(--color-text-muted)" role="status" aria-live="polite">
        {result?.message ?? "Checkout is currently in preview mode."}
      </p>
    </div>
  );
}
