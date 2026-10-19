export class getUserDetailsApi {
    constructor(request) {
        this.request = request;
        this.endpoint = "/api/getUserDetailByEmail";

    }

    async getUserDetailsByEmail() {
        return await this.request.get(this.endpoint, {
            form: {
                email: "Testqa@gmail.com",
            }
        });
    }

}

