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
    this.checkout = page.locator(".btn.btn-default.check_out");
    this.loginRegister = page.locator('.modal-content a[href="/login"]');
    this.VerifyDeliveryAddress = page.getByText("Address Details", {
      exact: true,
    });
    this.ReviewDetails = page.getByText("Review Your Order", {
      exact: true,
    });
    this.ReviewProductName = page.locator(".cart_description");
    this.TotalAmount = page.locator(".cart_total_price").first();
    this.addComment = page.locator(".form-control");
    this.PlaceOrder = page.locator('a[href="/payment"]');
    this.NameOnCard = page.locator('[data-qa="name-on-card"]');
    this.CardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.ExpMonth = page.locator('[data-qa="expiry-month"]');
    this.ExpYear = page.locator('[data-qa="expiry-year"]');
    this.payButtom = page.locator('[data-qa="pay-button"]');
    this.OrderPlacedText = page.locator('[data-qa="order-placed"]');
    this.DownloadInvoice = page.locator(".btn.btn-default.check_out");
    this.continue_Shopping_Button2 = page.locator(
      '[data-qa="continue-button"]',
    );
    this.DelteProduct = page.locator(".cart_quantity_delete");
    this.emptyText = page.locator("#empty_cart p");
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
  async Checkout() {
    await this.checkout.click();
  }
  async loginRegisterButton() {
    await this.loginRegister.click();
  }
  async AfterCreateAccount(addComment) {
    await this.viewCartButton.click();
    await this.checkout.click();
    await expect(this.VerifyDeliveryAddress).toBeVisible();
    await expect(this.ReviewDetails).toBeVisible();
    await expect(this.ReviewProductName).toContainText("Men Tshirt");
    // await expect(this.productCategory).toBeVisible();
    await expect(this.TotalAmount).toBeVisible();
    await this.addComment.fill(addComment);
    await this.PlaceOrder.click();
  }

  async CardDetails(name, Number, CVC, Month, year) {
    await this.NameOnCard.fill(name);
    await this.CardNumber.fill(Number);
    await this.cvc.fill(CVC);
    await this.ExpMonth.fill(Month);
    await this.ExpYear.fill(year);
    await this.payButtom.click();
    await expect(this.OrderPlacedText).toHaveText("Order Placed!");

    const Path = require("path");
    const downloadPromice = this.page.waitForEvent("download");
    await this.DownloadInvoice.click();
    const download = await downloadPromice;
    const filepath = Path.join(
      process.cwd(),
      "Main_tests",
      "data",
      "Download",
      download.suggestedFilename(),
    );
    download.saveAs(filepath);
    console.log("File saved at", filepath);
    await this.continue_Shopping_Button2.click();
  }

  async RemoveProduct() {
    await this.DelteProduct.click();
    await expect(this.emptyText).toContainText("Cart is empty!");
  }
}
