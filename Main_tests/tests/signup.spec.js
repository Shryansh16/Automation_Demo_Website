import { test, expect } from "@playwright/test";
import { signup_Page } from "../pages/signup_Page";
import { genrateuser } from '../Utils/testData';



// test case 1 - register user and delete it successfully

test("signup_Page", { tag: "@signup" }, async ({ page }) => {
  const Signup = new signup_Page(page);
  const user = genrateuser();
  // await page.goto('https://automationexercise.com/login');
  await page.goto("/login");

  await Signup.signup(user.fullName, user.email);
  await page.waitForTimeout(2000);

  await Signup.form(user.password, "16", "January", "2017");
  await page.waitForTimeout(2000);

  await Signup.address(
    user.firstName,
    user.lastName,
    user.company,
    user.address1,
    user.address2,
    "Israel",
    "UK SP",
    "Newyork",
    "22324",
    "3232323232",
  );
  await page.waitForTimeout(2000);
  await Signup.DeleteAccount();
  //  FirstName,lastName,Company,Address1,Address2,SelectOption,State,City,Zipcode,Mobilenumber
  console.log("Test case 1  - Signup sucessfully and then delete account");
});

// test case 5 - user already exists
test("signup with already existing user", async ({ page }) => {
  const Signup = new signup_Page(page);
  //  await page.goto('https://automationexercise.com/login');
  await page.goto("/login");

  await Signup.signup("Automation_User", "Testqa@gmail.com");

  await expect(page.getByText("Email Address already exist!")).toBeVisible();
  console.log("Test 5 - user already exists test successful");
});
