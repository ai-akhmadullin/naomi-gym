import type { CheckoutIntent, CheckoutResult } from "@/types/marketing";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export async function createCheckoutSessionStub(
  intent: CheckoutIntent,
): Promise<CheckoutResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 450);
  });

  if (!intent.planId) {
    return {
      status: "stub",
      message: "Plan is required before checkout can begin.",
    };
  }

  return {
    status: "stub",
    message:
      "Checkout is currently in preview mode.",
  };
}
