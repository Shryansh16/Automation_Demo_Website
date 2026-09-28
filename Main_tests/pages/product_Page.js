import { expect } from "@playwright/test";

export class product {
  constructor(page) {
    this.page = page;
    this.prodoctButton = page.locator('a[href="/products"]');
    // this.verifyallProduct = page.locator(
    //   ".row > .col-sm-9.padding-right > .features_items > .title.text-center",
    // );
    // this.verifyAllProduct = page.getByRole("heading", {
    //   name: "All Products",
    // });
    // this.verifyAllProduct = page.getByText("All Products", { exact: true });

    this.verifyBrand = page.locator(".brands_products");
    this.verifyproductlist = page.locator(
      ".product-image-wrapper > .single-products",
    );
    this.filterlist = page.locator(".features_items .product-image-wrapper");
    this.productdetails = page.locator(".product-information");
    this.searchbar = page.locator("#search_product");
    this.searchbutton = page.locator(".btn.btn-default.btn-lg");
    this.searchContainText = page.locator(".productinfo.text-center");
    this.HoverFirstproduct = page
      .locator("div.productinfo.text-center")
      .first();
    this.addCartSecoundProduct = page
      .locator("div.productinfo.text-center > .btn.btn-default.add-to-cart")
      .nth(1);
    this.continue_Shopping_Button = page.locator(
      ".btn.btn-success.close-modal.btn-block",
    );
    this.addCartthirdProduct = page
      .locator("div.productinfo.text-center > .btn.btn-default.add-to-cart")
      .nth(2);
    this.cartButton = page.getByRole("link", { name: " Cart" });
    this.table = page.locator(".cart_description h4 a");
    this.total_Selected_Product = page.locator(
      "#cart_info_table .cart_description",
    );
  }

  async productflow() {
    await this.prodoctButton.click();
    // await expect(this.verifyAllProduct).toContainText("All Products");
    await expect(this.verifyBrand).toBeVisible();
    await expect(this.verifyproductlist.first()).toBeVisible();
  }

  async firstProduct() {
    const firstproductname = this.filterlist.filter({
      hasText: "Blue Top",
    });

    await firstproductname.getByRole("link", { name: "View Product" }).click();
    await expect(this.productdetails).toContainText("Blue Top");
    await expect(this.productdetails).toContainText("Category: Women > Tops");
    await expect(this.productdetails).toContainText("Availability:");
    await expect(this.productdetails).toContainText("Condition:");
  }

  async searchprodcut(prodcutname) {
    await this.searchbar.fill(prodcutname);
    await this.searchbutton.click();
    await expect(this.searchContainText).toContainText(prodcutname);
  }

  async AddProduct_Cart() {
    await this.prodoctButton.click();
    await this.HoverFirstproduct.hover();
    await this.addCartSecoundProduct.hover();
    await this.addCartSecoundProduct.click();
    await this.continue_Shopping_Button.click();
    await this.addCartthirdProduct.click();
    await this.continue_Shopping_Button.click();
  }

  async VerifyInsideCard() {
    await this.cartButton.click();
    await expect(this.table).toContainText(["Men Tshirt", "Sleeveless Dress"]);
    await expect(this.total_Selected_Product).toHaveCount(2);
  }
}
