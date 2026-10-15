import { genrateuser } from '../../Utils/testData';
const user = genrateuser();
export class signUpApi {
    constructor(request) {
        this.request = request;
        this.endpoint = '/api/createAccount';
        this.deleteEndpoint = '/api/deleteAccount';
    }




    async createUser() {
        // console.log(user)
        return await this.request.post(this.endpoint, {
            form: {
                email: user.email,
                password: user.password,
                title: 'mr', name: user.fullName,
                //(for example: Mr, Mrs, Miss), 
                birth_date: user.day,
                birth_month: user.month,
                birth_year: user.year,
                firstname: user.firstName,
                lastname: user.lastName,
                company: user.company,
                address1: user.address1,
                address2: user.address2,
                country: "Israel",
                zipcode: user.zipcode,
                state: "Newyork",
                city: 'Tel Aviv',
                mobile_number: user.mobile_number,
            }
        });
    }


    async deleteUser() {
        return await this.request.delete(this.deleteEndpoint, {
            form: {
                email: user.email,
                password: user.password,
            }
        });
    }
}