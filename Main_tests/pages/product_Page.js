import { expect } from "@playwright/test";

export class product{
    constructor(page){
        this.page = page;
        this.prodoctButton= page.locator('a[href="/products"]');
        this.verifyallProduct =page.locator('.col-sm-9.padding-right > .features_items > .title.text-center');
        // this.verifycategory = page.locator('.col-sm-3 > .left-sidebar ')
        this.verifyBrand = page.locator('.brands_products')
        this.verifyproductlist =page.locator('.product-image-wrapper > .single-products');

        //first product 
        this.filterlist = page.locator('.features_items .product-image-wrapper');
       

        //verify product details
        this.productdetails = page.locator('.product-information');
     



    }
    async productflow(){
    await this.prodoctButton.click();
    await expect(this.verifyallProduct).toHaveText('All Products');
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
}