export class searchProductApi {

    constructor(request) {
        this.request = request;
        this.endpoint = '/api/searchProduct';



    }

    async postsearchProduct(category) {
        const searchValue = category;
        return await this.request.post(this.endpoint, {
            form: {
                search_product: searchValue,
            }
        });
    }

}