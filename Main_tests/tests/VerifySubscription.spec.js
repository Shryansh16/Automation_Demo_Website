import { test, expect } from "../Utils/fixtures";


// test case 9 verify email subscription on home page
test(
  "verify home page subscription",
  { tag: "@VerifyHomeSubscrition" },
  async ({ page, subscriptionPage }) => {

    await page.goto("/");

    await subscriptionPage.Verify_HomePage_Subscription("Testqa@gmail.com");
    // await page.waitForTimeout(5000);

    console.log("Test case - 9 verify subscription on Home page.");
  },
);

// case - 10 verify subscription on cart    page

test("Verify cart subscription", async ({ page, subscriptionPage }) => {

  await page.goto("/");

  await subscriptionPage.Verify_Cart_Subscription("Testqa@gmail.com");
  console.log("Test case - 10 verify subscription on cart page.");
});
