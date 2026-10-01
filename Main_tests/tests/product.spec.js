
import { test, expect } from '../Utils/fixtures';


// test case - 7 product pade and product detial
test("verify product page", async ({ page, productpage }) => {

  await page.goto("/");
  await productpage.productflow();
  await productpage.firstProduct();
  //  await page.waitForTimeout(5000);

  console.log("Test case = 7 verify product page and product page detials");
});

//test case - 8 verify search product
test("verify search product ", async ({ page, productpage }) => {


  await page.goto("/");
  await productpage.productflow();

  await productpage.searchprodcut("Winter Top");
  // await page.waitForTimeout(5000);

  console.log("Test_case = 8 verify search product ");
});

// test case 11 add product to add cart by product page

test("add product to cart from product page", async ({ page, productpage }) => {

  await page.goto("/");
  await productpage.AddProduct_Cart();
  // await page.waitForTimeout(5000);
  await productpage.VerifyInsideCard();
  console.log("add products to cart from product page ");
});
