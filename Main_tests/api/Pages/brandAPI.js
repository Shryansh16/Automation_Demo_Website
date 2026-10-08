export class brandAPI {

    constructor(request) {
        this.request = request;
        this.endpoint = '/api/brandsList';
    }

    async getBrandApi() {
        return await this.request.get(this.endpoint);
    }

    async getbrandApiPost() {
        return await this.request.put(this.endpoint);
    }

}