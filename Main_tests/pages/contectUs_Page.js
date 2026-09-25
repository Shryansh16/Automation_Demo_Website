import { expect } from "@playwright/test";

export class ContactUs{
    constructor(page){
        this.page = page;
        this.contactusButton = page.locator('a[href="/contact_us"]');
        this.VerifyGetinTouch =page.locator('.contact-form>.title.text-center');
        this.fillname = page.locator('[data-qa="name"]');
        this.Email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.Message = page.locator('[data-qa="message"]');
        // upload file 
        this.upload = page.locator('input[type="file"]');
        // submit button
        this.submitbutton = page.locator('[data-qa="submit-button"]');
        //sucess message 
        // this.successMessage = page.locator('.status.alert.alert-success');
        this.successMessage = page.locator('.status.alert.alert-success');
        //home button
        this.homebutton = page.locator('.btn.btn-success')
       
    }

    async ContactUs_Form(Name, email,Subject){
       await this.contactusButton.click();
       await expect( this.VerifyGetinTouch).toHaveText('Get In Touch');
       await this.fillname.fill(Name);
       await this.Email.fill(email);
       await this.subject.fill(Subject);
       
    }
    async message(message){
    await this.Message.fill(message);
    }

    async uploadFile(){
        // await this.upload.setInputFiles('Main_tests/data/sample.pdf');
        await this.upload.setInputFiles('Main_tests/data/sample.pdf');
        
    }

    async submit(){
        this.page.once('dialog', dialog => dialog.accept());
    //    await this.page.once('dialog', dialog =>dialog.accept());
        await this.submitbutton.click();
    }
//     async submit() {
//     this.page.once('dialog', async dialog => {
//         console.log('DIALOG APPEARED');
//         console.log('Message:', dialog.message());

//         await dialog.accept();

//         console.log('DIALOG ACCEPTED');
//     });

//     await this.submitbutton.click();

//     console.log('SUBMIT CLICK COMPLETED');
// }

    async verifySuccessMessage(){
        await expect(this.successMessage).toHaveText('Success! Your details have been submitted successfully.');
        await this.homebutton.click();

    }

    

 
}