// import { genrateuser } from '../../Utils/testData';
// const user = genrateuser();
export class signUpApi {
    constructor(request) {
        this.request = request;
        this.endpoint = '/api/createAccount';
        this.deleteEndpoint = '/api/deleteAccount';
    }




    async createUser(userdata) {
        // console.log(user)
        return await this.request.post(this.endpoint, {
            form: {
                name: userdata.fullName,
                email: userdata.email,
                password: userdata.password,
                title: 'mr', name: userdata.fullName,
                //(for example: Mr, Mrs, Miss), 
                birth_date: userdata.day,
                birth_month: userdata.month,
                birth_year: userdata.year,
                firstname: userdata.firstName,
                lastname: userdata.lastName,
                company: userdata.company,
                address1: userdata.address1,
                address2: userdata.address2,
                country: "Israel",
                zipcode: userdata.zipcode,
                state: "Newyork",
                city: 'Tel Aviv',
                mobile_number: userdata.mobile_number,
            }
        });
    }


    async deleteUser({ EMAIL: email, PASSWORD: password }) {
        console.log(email, password)
        return await this.request.delete(this.deleteEndpoint, {
            form: {
                email, password
            }
        });
    }
}