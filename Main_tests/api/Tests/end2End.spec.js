import { test, expect } from "../../Utils/fixtures";
import { genrateuser } from '../../Utils/testData';

test.describe.serial('User life cycle - End to End Regression flow', { tag: '@regressionE2EApi' }, () => {
    let user;

    test.beforeAll(() => {
        user = genrateuser();
    })

    // step 1. signup user   
    test('signup api test', async ({ signUpPageApi }) => {
        const response = await signUpPageApi.createUser(user);
        await expect(response.status()).toBe(200);
        // expect(response.headers()["content-type"]).toContain("application/json");
        const body = JSON.parse(await response.text());
        console.log(body);
        expect(body.responseCode).toBe(201);
        expect(body.message).toBe("User created!");

    });

    // step 2. login user
    test('Login user', async ({ loginPageApi }) => {
        let { email, password } = user;
        const response = await loginPageApi.postVerifyLogin(email, password);
        await expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        console.log(body);
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe("User exists!");
    });

    // step 3 . update user
    test("put update user api", async ({ putUserApi }) => {
        // dynamic data from test data facker library
        // creating dyamic data for update
        const updateduser = genrateuser();

        user = {
            ...updateduser,
            email: user.email,
            password: user.password
        }

        // update same user by passing  user in putUser
        const response = await putUserApi.putUser(user);
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe("User updated!");
        console.log(body);

    })

    // delete user 
    test('delete user', async ({ deletePageApi }) => {
        let { email, password } = user;
        const deleteresponse = await deletePageApi.deleteUser({ EMAIL: email, PASSWORD: password });
        await expect(deleteresponse.status()).toBe(200);
        const deletebody = JSON.parse(await deleteresponse.text());
        console.log(deletebody);
        expect(deletebody.responseCode).toBe(200);
        expect(deletebody.message).toBe("Account deleted!");
    });

})