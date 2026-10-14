import { test, expect } from "../../Utils/fixtures";

test('Login user', async ({ loginPageApi }) => {
    const Email = "Testqa@gmail.com";
    const Password = "Test@123";
    const response = await loginPageApi.postVerifyLogin(Email, Password);
    await expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    console.log(body);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
});


test('user not found ', async ({ loginPageApi }) => {
    const Email = "";
    const Password = "Test@123";
    const response = await loginPageApi.postVerifyLogin(Email, Password);
    await expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    console.log(body);
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
});

test('password not found ', async ({ loginPageApi }) => {
    const Email = "Testqa@gmail.com";
    const Password = "";
    const response = await loginPageApi.postVerifyLogin(Email, Password);
    await expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    console.log(body);
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
});

test('Bad request, email or password parameter is missing in POST request. ', async ({ loginPageApi }) => {
    // const Email = "Testqa@gmail.com";
    const Password = "";
    const response = await loginPageApi.postVerifyLogin(Password);
    await expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    console.log(body);
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, email or password parameter is missing in POST request.");
});


test('Delete User ', async ({ loginPageApi }) => {
    const Email = "Testqa@gmail.com";
    const Password = "Test@123";
    const response = await loginPageApi.deleteLogin(Email, Password);
    await expect(response.status()).toBe(200);
    const body = JSON.parse(await response.text());
    console.log(body);
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
});

