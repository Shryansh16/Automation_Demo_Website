export class ProductsAPI {

  constructor(request) {
    this.request = request;
    this.endpoint = '/api/productsList';
  }

  async getAllProducts() {
    // console.log(this.request)
    return await this.request.get(this.endpoint);
  }

  async getAllProductsPost() {
    // console.log(this.request)
    return await this.request.post(this.endpoint);
  }
}