import { expect } from "@playwright/test";

export class productQantity {
  constructor(page) {
    this.page = page;
    this.viewbutton = page.locator('a[href="/product_details/2"]');
    this.productdetails = page.locator(".product-information");
    this.productName = page.locator(".product-information h2");
    this.productCategory = page.locator(".product-information p").nth(0);
    this.productAvailability = page.locator(".product-information p").nth(1);
    this.productCondition = page.locator(".product-information p").nth(2);
    this.quantity = page.locator("#quantity");
    this.AddtoCart = page.locator(".btn.btn-default.cart");
    this.continue_Shopping_Button = page.locator(
      ".btn.btn-success.close-modal.btn-block",
    );
    this.viewCartButton = page.getByRole("link", { name: " Cart" });
    this.verifyQuantity = page.locator(".cart_quantity");
  }

  async addProductViewProdcuct(quantity) {
    await expect(this.page).toHaveURL("https://automationexercise.com");
    await this.viewbutton.click();
    await expect(this.productdetails).toBeVisible();
    await expect(this.productName).toHaveText(" Men  Tshirt");
    await expect(this.productCategory).toBeVisible();
    await expect(this.productAvailability).toContainText("Availability:");
    await expect(this.productCondition).toBeVisible();
    await this.quantity.fill(quantity);
    await this.AddtoCart.click();
    await this.continue_Shopping_Button.click();
    await this.viewCartButton.click();
    await expect(this.verifyQuantity).toContainText(quantity);
  }
}
