import { test, expect } from "../Utils/fixtures";
import { genrateuser } from "../Utils/testData";


test.describe("Regression flow checkout", () => {
  test.describe.configure({ mode: "parallel" });

  // test case 12 add product from home page and verify on cart with quantity
  test("add product Quantity in cart", async ({ page, productQuantityPage }, use) => {
    await page.goto("/");

    await productQuantityPage.addProductViewProdcuct("4");
    await productQuantityPage.Checkout();

    //   await page.waitForTimeout(5000);
    console.log("test case - 12 Add product from home page and verify on cart");
  });

  // test case 13 - after test case 12 login and then check out
  test(
    "END TO END bUY PRODUCT FLOW",
    { tag: "@regression" },
    async ({ page, productQuantityPage, signupPage }) => {
      test.setTimeout(60_000);
      // const Product_Quantity = new productQantity(page);
      // const Signup = new signup_Page(page);
      const user = genrateuser();
      await page.goto("/");

      await productQuantityPage.addProductViewProdcuct("4");
      await productQuantityPage.Checkout();
      await productQuantityPage.loginRegisterButton();
      await signupPage.signup(
        "Automation_User",
        `Automationqa${Math.random()}@gmail.com`,
      );

      await signupPage.form(user.password, "16", "January", "2017");
      await page.waitForTimeout(2000);

      await signupPage.address(
        user.firstName,
        user.lastName,
        user.company,
        user.address1,
        user.address2,
        "Israel",
        "UK SP",
        "Newyork",
        "22324",
        "3232323232"
      );
      await productQuantityPage.AfterCreateAccount(
        "Order Should Be Deliver With in 15 Days",
      );
      await productQuantityPage.CardDetails(
        "QkIC Bank",
        "23212321",
        "2343",
        "12",
        "2026",
      );
      await page.waitForTimeout(1000);
      await signupPage.DeleteAccount();

      console.log(
        "test case - 13 HomepAGE ->VIEW PRODUCT -> ADD TO CART -> CONTINUE -> SIGHUP USER -> GO TO HOME PAGE -> CART CONTINUE -> CHECK DETAILS -> PAY -> CARD DETAILS -> SUBMIT-> CHECK SUCESS -> HOME PAGE -> DELETE USER.",
      );
    },
  );

  //test case 14 register then add and check out product
  test("register then add and check out product", { tag: "@testcase14" }, async ({ page, signupPage, productQuantityPage }) => {

    const user = genrateuser();
    await page.goto("/login");
    await signupPage.signup(user.fullName, user.email);
    await signupPage.form(user.password, "16", "January", "2017");
    await page.waitForTimeout(2000);

    await signupPage.address(
      user.firstName,
      user.lastName,
      user.company,
      user.address1,
      user.address2,
      "Israel",
      "UK SP",
      "Newyork",
      "22324",
      "3232323232"
    );

    await productQuantityPage.addProductViewProdcuct("2");
    await productQuantityPage.Checkout();
    await productQuantityPage.AfterCreateAccount(
      "Order Should Be Deliver With in 10 days and Handle it with care",
    );
    await productQuantityPage.CardDetails(
      "QkIC Bank",
      "3456678",
      "1123",
      "11",
      "2024",
    );
    await signupPage.DeleteAccount();
    // await page.waitForTimeout(2000);
    console.log("test case - 14 register user then check out product");
  });

  // test case - 15 login then add product , buy product and logout
  test(
    "test case - 15 login then add product , buy product and logout ",
    { tag: "@testcase15" },
    async ({ page, loginPage, productQuantityPage }) => {
      await page.goto("/login");
      await loginPage.login("Testqa@gmail.com", "Test@123");
      await expect(
        page.locator(".shop-menu.pull-right > ul > li:nth-child(10)"),
      ).toContainText(" Logged in as ");
      await productQuantityPage.addProductViewProdcuct("2");
      await productQuantityPage.Checkout();
      await productQuantityPage.AfterCreateAccount(
        "Order Should Be Deliver With in 10 days and Handle it with care",
      );
      await productQuantityPage.CardDetails(
        "QkIC Bank",
        "3456678",
        "1123",
        "11",
        "2024",
      );
      await loginPage.logout();

      console.log(
        "test case - 15 login then add product , buy product and logout ",
      );
    },
  );

  // test case 16 - remove product from cart .
  test("test case 16 remove product from cart", async ({ page, productQuantityPage }) => {
    await page.goto("/");
    await productQuantityPage.addProductViewProdcuct("2");
    await productQuantityPage.RemoveProduct();
    console.log("test case 16 remove product from cart");
  });
});
