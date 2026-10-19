import { test as baseTest, expect, request } from "@playwright/test";
import { signup_Page } from "../pages/signup_Page";
import { productQantity } from "../pages/productQuantitypage";
import { loginpage } from "../pages/loginpage";
import { ContactUs } from "../pages/contectUs_Page";
import { product } from "../pages/product_Page";
import { VerifySubscription } from "../pages/verifySubscription_Page";
import { ProductsAPI } from "../api/Pages/ProductsApi";
import { brandAPI } from "../api/Pages/brandAPI";
import { searchProductApi } from "../api/Pages/searchProductApi";
import { loginAPI } from "../api/Pages/loginAPI";
import { signUpApi } from "../api/Pages/signUpAPI";
import { deleteApi } from "../api/Pages/deleteApi";
import { getUserDetailsApi } from "../api/Pages/getUserDetails";
import { putUpdateUser } from "../api/Pages/putUpdateUser";


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
    },
    //9. search  product Api fixture
    SearchProductApi: async ({ request }, use) => {
        const searchProductApiInstance = new searchProductApi(request);
        await use(searchProductApiInstance);
    },

    // 10. fixture login page API
    loginPageApi: async ({ request }, use) => {
        const loginApiInstance = new loginAPI(request);
        await use(loginApiInstance);
    },
    //11. SignUp Page API
    signUpPageApi: async ({ request }, use) => {
        const signApiInstance = new signUpApi(request);
        await use(signApiInstance);
    },

    //12. Delete API
    deletePageApi: async ({ request }, use) => {
        const deleteApiInstance = new deleteApi(request);
        await use(deleteApiInstance);
    },
    // 13. get user details by email
    getUserByEmail: async ({ request }, use) => {
        const UserDetailsApiInstance = new getUserDetailsApi(request);
        await use(UserDetailsApiInstance);
    },

    //14. Put Update user
    putUserApi: async ({ request }, use) => {
        const putUpdateUserApiInstance = new putUpdateUser(request);
        await use(putUpdateUserApiInstance);
    }
});
export { expect };