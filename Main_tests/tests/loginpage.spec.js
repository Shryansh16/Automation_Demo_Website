import { test, expect } from "../Utils/fixtures";


//Test case 2 - login successfully
test("login_page_Successfully", async ({ page, loginPage }) => {

  await page.goto("/login");

  await loginPage.login("Testqa@gmail.com", "Test@123");
  // await page.waitForTimeout(2000);
  await expect(
    page.locator(".shop-menu.pull-right > ul > li:nth-child(10)"),
  ).toContainText(" Logged in as ");
  await page.screenshot({ path: "screenshot.png" });
  console.log("Test case 2  - login successfully");
});

// Test case 3 - login with wrong credentials
test("Login_Fails", async ({ page, loginPage }) => {

  // await page.goto('https://automationexercise.com/login');
  await page.goto("/login");

  await loginPage.login("Testqa@gmail.com", "Test@1234");
  await expect(
    page.getByText("Your email or password is incorrect!"),
  ).toBeVisible();
  // await page.waitForTimeout(2000);
  console.log("Test case 3  - login fails");
});

//Test case 4 - login after that logout successfully
test("login and logout", { tag: "@login" }, async ({ page, loginPage }) => {

  // await page.goto('https://automationexercise.com/login');
  await page.goto("/login");

  await loginPage.login("Testqa@gmail.com", "Test@123");

  await loginPage.logout();
  // await page.waitForTimeout(2000);
  console.log("Test case 4  - login and logout successfully");
});
