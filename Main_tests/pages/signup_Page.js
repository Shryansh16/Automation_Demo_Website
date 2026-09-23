export class signup_Page{

    constructor(page){
        this.page=page;

        this.name = page.locator('[data-qa="signup-name"]');
        this.email = page.locator('[data-qa="signup-email"]');
        this.signupbutton=page.getByRole('button', { name: 'Signup',exact:true});
        this.title =  page.locator('#id_gender1');
        this.password =page.locator('[data-qa="password"]');
        this.date = page.locator('[data-qa="days"]');
        this.month = page.locator('[data-qa="months"]');
        this.year = page.locator('[data-qa="years"]');
        // this.select_Date = page.selectOption(dayoption);

        
    }
   async signup(name,email){    
    await this.name.fill(name);
    await this.email.fill(email);
    await this.signupbutton.click();
   }    

   async form(password,dayoption,monthoption,yearoption){
    await this.title.check();
    await this.password.fill(password);
    await this.date.selectOption(dayoption);
    await this.month.selectOption(monthoption);
    await this.year.selectOption(yearoption);
    // await this.select_Date.selectOption(dayoption);


   }
}