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



    }
}
