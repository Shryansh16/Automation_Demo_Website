import { test, expect } from "@playwright/test";
import { productQantity } from "../pages/productQuantitypage";
import { signup_Page } from "../pages/signup_Page";

// test case 12 add product from home page and verify on cart with quantity
test("add product Quantity in cart", async ({ page }) => {
  const Product_Quantity = new productQantity(page);
  await page.goto("/");

  await Product_Quantity.addProductViewProdcuct("4");

  //   await page.waitForTimeout(5000);
  console.log("test case - 12 Add product from home page and verify on cart");
});

// // test case 13 - after test case 12 login and then check out
test("END TO END bUY PRODUCT FLOW", async ({ page }) => {
  const Product_Quantity = new productQantity(page);
  const Signup = new signup_Page(page);
  await page.goto("/");

  await Product_Quantity.addProductViewProdcuct("4");
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
  await Signup.DeleteAccount();
  await page.waitForTimeout(2000);
  console.log(
    "test case - 13 HomepAGE ->VIEW PRODUCT -> ADD TO CART -> CONTINUE -> SIGHUP USER -> GO TO HOME PAGE -> CART CONTINUE -> CHECK DETAILS -> PAY -> CARD DETAILS -> SUBMIT-> CHECK SUCESS -> HOME PAGE -> DELETE USER.",
  );
});

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
