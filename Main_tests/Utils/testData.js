import { faker } from "@faker-js/faker";


export function genrateuser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const email = faker.internet.email({ firstName, lastName })

    return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        // password:faker.internet.password()
        password: `test.${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}.${faker.string.alpha(6)}@123`,
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        zipcode: faker.location.zipCode(4),
        mobile_number: faker.string.numeric(10),
        month: faker.date.month(),
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        year: faker.number.int({ min: 1970, max: 2000 }).toString(),



    }
}
