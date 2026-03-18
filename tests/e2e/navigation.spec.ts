import { expect, test } from "@playwright/test";

test("desktop nav section links update hash", async ({ page }) => {
  await page.goto("/en");

  await page.getByRole("link", { name: "Pricing", exact: true }).first().click();
  await expect(page).toHaveURL(/#pricing$/);

  await page.getByRole("link", { name: "Reviews", exact: true }).first().click();
  await expect(page).toHaveURL(/#reviews$/);
});

test("buy membership button routes to buy page", async ({ page }) => {
  await page.goto("/en");

  await page.getByRole("link", { name: "Buy Membership" }).first().click();
  await expect(page).toHaveURL("/en/buy-membership");
  await expect(page.getByRole("heading", { name: "Choose Your Membership" })).toBeVisible();
});

test("mobile drawer links navigate to section hash", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "Gallery", exact: true })
    .click();

  await expect(page).toHaveURL(/#gallery$/);
});
