import { test, expect } from "../../Utils/fixtures";
import { genrateuser } from "../../Utils/testData";

// test('get user by email', async ({ signUpPageApi, getUserByEmail }) => {
//     const user = genrateuser();
//     const { email } = user;
//     const signup = await signUpPageApi.createUser(user);
//     const body2 = JSON.parse(await signup.text());
//     console.log(body2)
//     // const Email = "Testqa@gmail.com";
//     const response = await getUserByEmail.getUserDetailsByEmail(email);
//     // await expect(response.status()).toBe(200);
//     const body = JSON.parse(await response.text());
//     console.log(body);
//     // expect(body.responseCode).toBe(200);
//     // expect(body.message).toBe("User exists!");
// });

test("get user details by email", async ({ getUserByEmail }) => {
    // const Email = "Testqa@gmail.com";
    const response = await getUserByEmail.getUserDetailsByEmail();
    await expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    console.log(body);

})