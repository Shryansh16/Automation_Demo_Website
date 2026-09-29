import { test, expect } from "@playwright/test";
import { VerifySubscription } from "../pages/verifySubscription_Page";

// test case 9 verify email subscription on home page
test(
  "verify home page subscription",
  { tag: "@VerifyHomeSubscrition" },
  async ({ page }) => {
    const Verify_Home_Page = new VerifySubscription(page);
    await page.goto("/");

    await Verify_Home_Page.Verify_HomePage_Subscription("Testqa@gmail.com");
    // await page.waitForTimeout(5000);

    console.log("Test case - 9 verify subscription on Home page.");
  },
);

// case - 10 verify subscription on cart    page

test("Verify cart subscription", async ({ page }) => {
  const Verify_cart_Page = new VerifySubscription(page);
  await page.goto("/");

  await Verify_cart_Page.Verify_Cart_Subscription("Testqa@gmail.com");
  console.log("Test case - 10 verify subscription on cart page.");
});
