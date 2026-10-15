export class deleteApi {
    constructor(request) {
        this.request = request;
        this.endpoint = '/api/deleteAccount';
    }

    async deleteUser(Email, Password) {
        return await this.request.delete(this.endpoint, {
            form: {
                email: Email,
                password: Password,
            }
        });
    }
}