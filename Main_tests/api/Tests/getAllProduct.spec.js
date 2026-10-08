// 
// import { ProductsAPI } from "../Pages/ProductsApi";
import { test, expect, request } from "../../Utils/fixtures";


test("Get All Product list api", async ({ request, ProductApi }) => {
  const response = await ProductApi.getAllProducts();

  // validate http status 
  expect(response.status()).toBe(200);

  // parse  body  safely
  // const responsebody = await response.text();
  const body = await response.json();


  // const body = JSON.parse(responsebody);

  //validate response schema /key 
  expect(body.products).not.toBeNull();
  expect(body.responseCode).toBe(200);
  expect(body.products).toBeDefined();
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);

  if (body.products.length > 0) {
    console.log(body.products[0]);
  }

  const sampleProduct = body.products[0];

  expect(sampleProduct).toHaveProperty("id");
  expect(sampleProduct).toHaveProperty("name");
  expect(sampleProduct).toHaveProperty("price");
  expect(sampleProduct).toHaveProperty("brand");

  expect(sampleProduct).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String)
    })

  );




})

test("POST - should return 405 Method Not Allowed", async ({ request, ProductApi }) => {
  const response = await ProductApi.getAllProductsPost(); // Sending POST instead of GET
  const body = JSON.parse(await response.text());

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});