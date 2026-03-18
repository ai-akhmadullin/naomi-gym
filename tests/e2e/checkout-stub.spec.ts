import { expect, test } from "@playwright/test";

test("checkout action shows stub status", async ({ page }) => {
  await page.goto("/en/buy-membership");

  const monthlyButton = page.getByRole("button", { name: "Start checkout for Monthly plan" });
  const checkoutStatus = monthlyButton.locator("xpath=ancestor::div[1]").getByRole("status");

  await monthlyButton.click();

  await expect(checkoutStatus).toContainText(
    "Checkout is currently in preview mode.",
  );
});
