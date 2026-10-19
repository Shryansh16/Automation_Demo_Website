export class deleteApi {
    constructor(request) {
        this.request = request;
        this.endpoint = '/api/deleteAccount';
    }

    async deleteUser({ EMAIL: email, PASSWORD: password }) {
        // console.log(email, password)
        return await this.request.delete(this.endpoint, {
            form: {
                email, password
            }
        });
    }
}