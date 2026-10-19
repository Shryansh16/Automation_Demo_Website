import { test, expect } from "../../Utils/fixtures"
import { genrateuser } from "../../Utils/testData"




test("put update user api", async ({ putUserApi, signUpPageApi }) => {
    // dynamic data from test data facker library
    let user = genrateuser();

    // create new user 
    const CreateUser = await signUpPageApi.createUser(user);
    await expect(CreateUser.status()).toBe(200);
    // console.log("Before update:", user.fullName);

    const creatbody = await CreateUser.json();
    expect(creatbody.responseCode).toBe(201);
    expect(creatbody.message).toBe("User created!");
    console.log(creatbody);


    // creating dyamic data for update
    const updateduser = genrateuser();

    user = {
        ...updateduser,
        email: user.email,
        password: user.password
    };
    // Modify the existing user's name
    // user.fullName = "Updated Test User";

    // update same user by passing  user in putUser
    const response = await putUserApi.putUser(user);
    // console.log("After update:", user.fullName);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User updated!");
    console.log(body);




})