import { request } from "@playwright/test";
import { test, expect } from "../../Utils/fixtures";

test('All Brand List', async ({ BrandApi }) => {
    const response = await BrandApi.getBrandApi();
    expect(response.status()).toBe(200);
    // expect(response.headers()["content-type"])
    //     .toContain("application/json");

    const body = await response.json();
    // console.log(body);


    expect(body.brands).not.toBeNull();
    expect(body.responseCode).toBe(200);
    expect(body.brands).toBeDefined();
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);


    for (const brand of body.brands) {
        expect(brand).toHaveProperty("id");
        expect(brand).toHaveProperty("brand");

    }


    console.log(Object.keys(body.brands[0]))

});


test('put - should return api  method not supported status response 405', async ({ BrandApi }) => {
    const response = await BrandApi.getbrandApiPost();
    const body = await response.json();

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.")
    console.log(response.status());
    expect(response.status()).toBe(200);

    //     If you want to check the HTTP status code, use: expect(response.status()).toBe(405);

    // If you want to check the JSON payload's response code, use: expect(body.responseCode).toBe(405);

    // (I have updated your code back to using body.responseCode so your test will pass again!)


})