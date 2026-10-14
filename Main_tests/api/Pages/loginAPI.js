export class loginAPI {

    constructor(request) {
        this.request = request;
        this.endpoint = '/api/verifyLogin';

    }

    async postVerifyLogin(EMAIL, PASSWORD) {
        const Emailid = EMAIL;
        const Passwordid = PASSWORD;
        return await this.request.post(this.endpoint, {
            form: {
                email: Emailid, //'Testqa@gmail.com'
                password: Passwordid     //'Test@123'
            }
        });
    }

    async deleteLogin(EMAIL, PASSWORD) {
        const Emailid = EMAIL;
        const Passwordid = PASSWORD;
        return await this.request.delete(this.endpoint, {
            form: {
                email: Emailid, //'Testqa@gmail.com'
                password: Passwordid     //'Test@123'
            }
        });
    }



}