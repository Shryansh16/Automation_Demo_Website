import { expect } from "@playwright/test";

export class product{
    constructor(page){
        this.page = page;
        this.prodoctButton= page.locator('a[href="/products"]');
        this.verifyallProduct =page.locator('.row > .col-sm-9.padding-right > .features_items > .title.text-center');
        // this.verifycategory = page.locator('.col-sm-3 > .left-sidebar ')
        this.verifyBrand = page.locator('.brands_products')
        this.verifyproductlist =page.locator('.product-image-wrapper > .single-products');

        //first product 
        this.filterlist = page.locator('.features_items .product-image-wrapper');
       

        //verify product details
        this.productdetails = page.locator('.product-information');


        //search product 
        this.searchbar = page.locator('#search_product');
        //search button
        this.searchbutton = page.locator('.btn.btn-default.btn-lg');
        //product contain text 
        this.searchContainText = page.locator('.productinfo.text-center')


        // add to cart - product page 
        this.HoverFirstproduct= page.locator('div.productinfo.text-center').first();
        this.addCartSecoundProduct= page.locator('div.productinfo.text-center > .btn.btn-default.add-to-cart').nth(1);
        this.continue_Shopping_Button = page.locator('.btn.btn-success.close-modal.btn-block');
        this.addCartthirdProduct= page.locator('div.productinfo.text-center > .btn.btn-default.add-to-cart').nth(2);
        // go to cart 
        this.cartButton =  page.getByRole('link', { name: ' Cart' });
        this.table= page.locator('.cart_description h4 a');
        this.total_Selected_Product = page.locator('#cart_info_table .cart_description');
     


    }
    async productflow(){
    await this.prodoctButton.click();
    await expect(this.verifyallProduct).toContainText('All Products')
    // await expect(this.verifycategory).toHaveText('Category');
    await expect(this.verifyBrand).toBeVisible();
    await expect(this.verifyproductlist.first()).toBeVisible();

    }

    async firstProduct(){
        const firstproductname = this.filterlist.filter({
            hasText:'Blue Top',
        })

          
    // we des not using this.locator here because firstproduct.view bitton can't work firstproductname does not have any thing isode called view button

        await firstproductname.getByRole('link', {name:'View Product'}).click();

        // product details.
        await expect(this.productdetails).toContainText('Blue Top');
        await expect(this.productdetails).toContainText('Category: Women > Tops');
        await expect(this.productdetails).toContainText('Availability:');
        await expect(this.productdetails).toContainText('Condition:');


    }

    async searchprodcut(prodcutname){
        await this.searchbar.fill(prodcutname);
        await this.searchbutton.click();
        await expect(this.searchContainText).toContainText(prodcutname);
    }

    // Add Product to Cart 
    async AddProduct_Cart(){
         await this.prodoctButton.click();
         await this.HoverFirstproduct.hover();
         await this.addCartSecoundProduct.hover();
         await this.addCartSecoundProduct.click();
        await this.continue_Shopping_Button.click();
        await this.addCartthirdProduct.click();
        await this.continue_Shopping_Button.click();
        


    }

    async VerifyInsideCard(){
   await this.cartButton.click();
   await expect(this.table).toContainText(['Men Tshirt', 'Sleeveless Dress']);
   await expect(this.total_Selected_Product).toHaveCount(2);


    }
}