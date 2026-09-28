import { test, expect } from "@playwright/test";
import { productQantity } from "../pages/productQuantitypage";

// test case 12 add product from home page and verify on cart with quantity
test("add product Quantity in cart", async ({ page }) => {
  const Product_Quantity = new productQantity(page);
  await page.goto("/");

  await Product_Quantity.addProductViewProdcuct("4");

  //   await page.waitForTimeout(5000);
  console.log("test case - 12 Add product from home page and verify on cart");
});
