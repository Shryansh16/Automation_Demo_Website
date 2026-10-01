import { test, expect } from "../Utils/fixtures";

test("Contect us form", async ({ page, contactUsPage }) => {
  await page.goto("/");
  await contactUsPage.ContactUs_Form(
    "Automation_User",
    "Automation@gmail.com",
    "Compalain for test failure",
  );
  await contactUsPage.message(
    "Test execution failed due to an issue encountered during the test run. The failure is being investigated, and I’ll share the findings once identified.",
  );
  await contactUsPage.uploadFile();
  await page.waitForTimeout(2000);
  await contactUsPage.submit();
  await page.waitForTimeout(5000);
  await contactUsPage.verifySuccessMessage();
  await expect(
    page.locator(".features_items>.title.text-center"),
  ).toContainText("Features Items");
});
