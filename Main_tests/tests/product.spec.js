import {test, expect} from '@playwright/test';
import { product } from '../pages/product_Page';


// test case - 7 product pade and product detial
test('verify product page', async({page})=>{
    const Product_page = new product(page);
    // await page.goto('https://automationexercise.com/');
        await page.goto('/');
     await Product_page.productflow();   
     await Product_page.firstProduct();
    //  await page.waitForTimeout(5000);

    console.log('Test case = 7 verify product page and product page detials')
})