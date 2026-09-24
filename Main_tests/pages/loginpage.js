export class loginpage{

    constructor(page){
        this.page=page;

        this.emailInput = page.locator('[data-qa="login-email"]');
        this.password = page.locator('[data-qa="login-password"]');
        this.loginbutton=page.getByRole('button', { name: 'Login',exact:true});
        
        // logout 
        this.logoutLink = page.locator('a[href="/logout"]');
        

    }
     
    async login(Email,password){
        await this.emailInput.fill(Email);
        await this.password.fill(password);
        await this.loginbutton.click();
    }

    async logout(){
    await this.logoutLink.click();
    }
}