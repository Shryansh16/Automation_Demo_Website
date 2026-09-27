import { expect } from "@playwright/test";

export class VerifySubscription{
    constructor(page){
        this.page =page;
        // this.verifytextOnHome = page.locator('.carousel-inner > .item > .col-sm-6');
        this.verifytextOnHome = page.getByText('Full-Fledged practice website for Automation Engineers').first();
        this.fillSubscriptionEmail = page.locator('#susbscribe_email');
        this.clickHomeSUBbtton = page.locator('#subscribe');
    
        // verify cart subscription
        // this.cartButton =  page.getByRole('link',{name: 'Cart', exact: true});
        // this.cartButton =  page.locator('.shop-menu.pull-right > .nav.navbar-nav > a[href="/view_cart"]');
        this.cartButton =  page.getByRole('link', { name: ' Cart' });
    }

    async Verify_HomePage_Subscription(email){
        await expect(this.page).toHaveURL('https://automationexercise.com/');
        await expect(this.verifytextOnHome).toBeVisible();
        await this.fillSubscriptionEmail.scrollIntoViewIfNeeded();
        await this.fillSubscriptionEmail.fill(email);
        await this.clickHomeSUBbtton.click();
        // await this.page.pause();
        await expect(
       this.page.getByText('You have been successfully subscribed!', { exact: true })
       ).toBeVisible();



    }


    async Verify_Cart_Subscription(email){
    await this.cartButton.click();
    await expect(this.page).toHaveURL('https://automationexercise.com/view_cart');
    await this.fillSubscriptionEmail.scrollIntoViewIfNeeded();
    await this.fillSubscriptionEmail.fill(email);
    await this.clickHomeSUBbtton.click();
        // await this.page.pause();
    await expect(
    this.page.getByText('You have been successfully subscribed!', { exact: true })
       ).toBeVisible();

    }
}