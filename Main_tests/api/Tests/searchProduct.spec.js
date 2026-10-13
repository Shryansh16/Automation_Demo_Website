
import { test, expect } from "../../Utils/fixtures";

test('search Product', async ({ SearchProductApi }) => {
    const categoryName = "Tshirt";
    const response = await SearchProductApi.postsearchProduct(categoryName);
    await expect(response.status()).toBe(200);
    const body = await response.json();
    // console.log(body);
    // const jsonBody = JSON.parse(body);
    // console.log(jsonBody);
    // console.log(body.products);

    //validate response schema/key
    await expect(body.products).not.toBeNull();
    await expect(body.responseCode).toBe(200);
    await expect(body.products).toBeDefined();
    await expect(Array.isArray(body.products)).toBe(true);

    const sampleProduct = body.products[0];
    expect(sampleProduct).toHaveProperty("id");
    expect(sampleProduct).toHaveProperty("name");
    expect(sampleProduct).toHaveProperty("price");
    expect(sampleProduct).toHaveProperty("brand");
    expect(sampleProduct).toHaveProperty("category");

    for (const product of body.products) {
        await expect(product.category.category).toContain(categoryName);
        // console.log(product)

    }

});

test('search without product ', async ({ SearchProductApi }) => {
    const categoryName = " ";
    const response = await SearchProductApi.postsearchProduct(categoryName);
    // const body = JSON.parse(await response.text());
    const body = await JSON.parse(await response.text());
    // expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");


})