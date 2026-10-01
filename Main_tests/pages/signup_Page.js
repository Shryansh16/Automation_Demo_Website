import { expect } from "@playwright/test";


export class signup_Page {
  constructor(page) {
    this.page = page;
    this.name = page.locator('[data-qa="signup-name"]');
    this.email = page.locator('[data-qa="signup-email"]');
    this.signupbutton = page.getByRole("button", {
      name: "Signup",
      exact: true,
    });
    this.title = page.locator("#id_gender1");
    this.password = page.locator('[data-qa="password"]');
    this.date = page.locator('[data-qa="days"]');
    this.month = page.locator('[data-qa="months"]');
    this.year = page.locator('[data-qa="years"]');
    this.newletter_checkbox = page.locator("#newsletter");
    this.offer_checkbox = page.locator("#optin");
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.company = page.locator('[data-qa="company"]');
    this.address1 = page.locator('[data-qa="address"]');
    this.address2 = page.locator('[data-qa="address2"]');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipcode = page.locator('[data-qa="zipcode"]');
    this.mobilNumber = page.locator('[data-qa="mobile_number"]');
    this.createAccount = page.locator('[data-qa="create-account"]');
    this.AcountCreatedText = page.locator('[data-qa="account-created"]');
    this.continue = page.locator('[data-qa="continue-button"]');
    this.confirmedName = page.locator(
      ".shop-menu.pull-right > ul > li:nth-child(10)",
    );
    this.userName = null;
    this.deleteAccount = page.locator('a[href="/delete_account"]');
    this.AccountdeleteText = page.locator('[data-qa="account-deleted"]');
    this.deletescussfully = page.locator('[data-qa="continue-button"]');
  }

  async signup(name, email) {
    this.userName = name;
    await this.name.fill(name);
    await this.email.fill(email);
    await this.signupbutton.click();
  }

  async form(password, dayoption, monthoption, yearoption) {
    await this.title.check();
    await this.password.fill(password);
    await this.date.selectOption(dayoption);
    await this.month.selectOption(monthoption);
    await this.year.selectOption(yearoption);
    await this.newletter_checkbox.click();
    await this.offer_checkbox.click();
  }
  async address(
    FirstName,
    lastName,
    Company,
    Address1,
    Address2,
    SelectOption,
    State,
    City,
    Zipcode,
    Mobilenumber,
  ) {
    await this.firstName.fill(FirstName);
    await this.lastName.fill(lastName);
    await this.company.fill(Company);
    await this.address1.fill(Address1);
    await this.address2.fill(Address2);
    await this.country.selectOption(SelectOption);
    await this.state.fill(State);
    await this.city.fill(City);
    await this.zipcode.fill(Zipcode);
    await this.mobilNumber.fill(Mobilenumber);
    await this.createAccount.click();
    await expect(this.AcountCreatedText).toHaveText("Account Created!");
    await this.continue.click();
    await expect(this.confirmedName).toContainText(this.userName);
    // console.log(this.userName);
  }

  async DeleteAccount() {
    await this.deleteAccount.click();
    await expect(this.AccountdeleteText).toContainText("Account Deleted!");
    await this.deletescussfully.click();
  }
}
