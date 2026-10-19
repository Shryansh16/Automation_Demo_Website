export class putUpdateUser {
    constructor(request) {
        this.request = request;
        this.endpoint = '/api/updateAccount';
    }
    async putUser(user) {
        console.log(user);
        return await this.request.put(this.endpoint, {
            form: {
                name: user.fullName,
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
}

