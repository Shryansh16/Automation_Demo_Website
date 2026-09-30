import { test, expect } from "@playwright/test";
import { productQantity } from "../pages/productQuantitypage";
import { signup_Page } from "../pages/signup_Page";
import { loginpage } from "../pages/loginpage";

test.describe("Regression flow checkout", () => {
  test.describe.configure({ mode: "parallel" });

  // test case 12 add product from home page and verify on cart with quantity
  test("add product Quantity in cart", async ({ page }) => {
    const Product_Quantity = new productQantity(page);
    await page.goto("/");

    await Product_Quantity.addProductViewProdcuct("4");
    await Product_Quantity.Checkout();

    //   await page.waitForTimeout(5000);
    console.log("test case - 12 Add product from home page and verify on cart");
  });

  // test case 13 - after test case 12 login and then check out
  test(
    "END TO END bUY PRODUCT FLOW",
    { tag: "@regression" },
    async ({ page }) => {
      test.setTimeout(60_000);
      const Product_Quantity = new productQantity(page);
      const Signup = new signup_Page(page);
      await page.goto("/");

      await Product_Quantity.addProductViewProdcuct("4");
      await Product_Quantity.Checkout();
      await Product_Quantity.loginRegisterButton();
      await Signup.signup(
        "Automation_User",
        `Automationqa${Math.random()}@gmail.com`,
      );

      await Signup.form("Test@123", "16", "January", "2017");
      await page.waitForTimeout(2000);

      await Signup.address(
        "Automation_First",
        "Automation_Lastname",
        "Nop",
        "Us_Sector_1",
        "Galit 64",
        "Israel",
        "UK SP",
        "Newyork",
        "22324",
        "3232323232",
      );
      await Product_Quantity.AfterCreateAccount(
        "Order Should Be Deliver With in 15 Days",
      );
      await Product_Quantity.CardDetails(
        "QkIC Bank",
        "23212321",
        "2343",
        "12",
        "2026",
      );
      await page.waitForTimeout(1000);
      await Signup.DeleteAccount();

      console.log(
        "test case - 13 HomepAGE ->VIEW PRODUCT -> ADD TO CART -> CONTINUE -> SIGHUP USER -> GO TO HOME PAGE -> CART CONTINUE -> CHECK DETAILS -> PAY -> CARD DETAILS -> SUBMIT-> CHECK SUCESS -> HOME PAGE -> DELETE USER.",
      );
    },
  );

  //test case 14 register then add and check out product
  test("register then add and check out product", async ({ page }) => {
    const Signup = new signup_Page(page);
    const Product_Quantity = new productQantity(page);

    await page.goto("/login");
    await Signup.signup(
      "Automation_User",
      `Automationqa${Math.random()}@gmail.com`,
    );
    await Signup.form("Test@123", "16", "January", "2017");
    await page.waitForTimeout(2000);
    await Signup.address(
      "Automation_First",
      "Automation_Lastname",
      "Nop",
      "Us_Sector_1",
      "Galit 64",
      "Israel",
      "UK SP",
      "Newyork",
      "22324",
      "3232323232",
    );

    await Product_Quantity.addProductViewProdcuct("2");
    await Product_Quantity.Checkout();
    await Product_Quantity.AfterCreateAccount(
      "Order Should Be Deliver With in 10 days and Handle it with care",
    );
    await Product_Quantity.CardDetails(
      "QkIC Bank",
      "3456678",
      "1123",
      "11",
      "2024",
    );
    await Signup.DeleteAccount();
    // await page.waitForTimeout(2000);
    console.log("test case - 14 register user then check out product");
  });

  // test case - 15 login then add product , buy product and logout
  test(
    "test case - 15 login then add product , buy product and logout ",
    { tag: "@testcase15" },
    async ({ page }) => {
      const Product_Quantity = new productQantity(page);
      const Loginpage = new loginpage(page);
      await page.goto("/login");
      await Loginpage.login("Testqa@gmail.com", "Test@123");
      await expect(
        page.locator(".shop-menu.pull-right > ul > li:nth-child(10)"),
      ).toContainText(" Logged in as ");
      await Product_Quantity.addProductViewProdcuct("2");
      await Product_Quantity.Checkout();
      await Product_Quantity.AfterCreateAccount(
        "Order Should Be Deliver With in 10 days and Handle it with care",
      );
      await Product_Quantity.CardDetails(
        "QkIC Bank",
        "3456678",
        "1123",
        "11",
        "2024",
      );
      await Loginpage.logout();

      console.log(
        "test case - 15 login then add product , buy product and logout ",
      );
    },
  );

  // test case 16 - remove product from cart .
  test("test case 16 remove product from cart", async ({ page }) => {
    const Product_Quantity = new productQantity(page);
    await page.goto("/");
    await Product_Quantity.addProductViewProdcuct("2");
    await Product_Quantity.RemoveProduct();
    console.log("test case 16 remove product from cart");
  });
});
