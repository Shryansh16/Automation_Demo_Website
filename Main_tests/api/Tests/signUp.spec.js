import { test, expect } from "../../Utils/fixtures";
import { genrateuser } from '../../Utils/testData';
test('signup api test', async ({ signUpPageApi }) => {
    const user = genrateuser();
    const response = await signUpPageApi.createUser(user);
    await expect(response.status()).toBe(200);
    // expect(response.headers()["content-type"]).toContain("application/json");
    const body = JSON.parse(await response.text());
    console.log(body);
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe("User created!");

    // delete user
    // const deleteresponse = await signUpPageApi.deleteUser();
    // await expect(deleteresponse.status()).toBe(200);
    // const deletebody = JSON.parse(await deleteresponse.text());
    // console.log(deletebody);
    // expect(deletebody.responseCode).toBe(200);
    // expect(deletebody.message).toBe("Account deleted!");
});

test('delete user api', async ({ signUpPageApi }) => {
    const user = genrateuser();
    const { email, password } = user
    // const useremail = user.email;
    // const userpassword = user.password;
    const response = await signUpPageApi.createUser(user);
    await expect(response.status()).toBe(200);
    const deleteresponse = await signUpPageApi.deleteUser({ EMAIL: email, PASSWORD: password });
    await expect(deleteresponse.status()).toBe(200);
    const deletebody = JSON.parse(await deleteresponse.text());
    console.log(deletebody);
    expect(deletebody.responseCode).toBe(200);
    expect(deletebody.message).toBe("Account deleted!");
})
