import { test as baseTest, expect } from "@playwright/test";
import { signup_Page } from "../pages/signup_Page";
import { productQantity } from "../pages/productQuantitypage";
import { loginpage } from "../pages/loginpage";
import { ContactUs } from "../pages/contectUs_Page";
import { product } from "../pages/product_Page";
import { VerifySubscription } from "../pages/verifySubscription_Page";
import { ProductsAPI } from "../api/Pages/ProductsApi";
import { brandAPI } from "../api/Pages/brandAPI";


export const test = baseTest.extend({

    //1.signup page fixture 

    signupPage: async ({ page }, use) => {
        const Signup = new signup_Page(page);
        await use(Signup);
    },
    // 2. Product Quantity / Checkout fixture
    productQuantityPage: async ({ page }, use) => {
        const productQuantity = new productQantity(page);
        await use(productQuantity);
    },
    // 3. Login Page fixture
    loginPage: async ({ page }, use) => {
        const login = new loginpage(page);
        await use(login);
    },
    // 4. Contact Us fixture
    contactUsPage: async ({ page }, use) => {
        const contact = new ContactUs(page);
        await use(contact);
    },

    // 5. prodcut catalog fixture

    productpage: async ({ page }, use) => {
        const prodcut = new product(page);
        await use(prodcut)
    },
    // 6. Subscription fixture
    subscriptionPage: async ({ page }, use) => {
        const subscription = new VerifySubscription(page);
        await use(subscription);
    },

    //7. GetAllProducts api fixture

    ProductApi: async ({ request }, use) => {
        const productApiInstance = new ProductsAPI(request);
        await use(productApiInstance);

    },

    //8. Brand Api fixture
    BrandApi: async ({ request }, use) => {
        const brandApiInstance = new brandAPI(request);
        await use(brandApiInstance);
    }
});
export { expect };