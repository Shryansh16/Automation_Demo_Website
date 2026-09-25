import {test, expect} from '@playwright/test'
import { ContactUs } from '../pages/contectUs_Page'

// test case-6 successful contect us form fill
test('Contect us form', async({page})=>{
   const Contactus_FORM = new ContactUs(page);
   
   await page.goto('https://automationexercise.com');
   await Contactus_FORM.ContactUs_Form('Automation_User', 'Automation@gmail.com', 'Compalain for test failure'    );
   await Contactus_FORM.message('Test execution failed due to an issue encountered during the test run. The failure is being investigated, and I’ll share the findings once identified.');
   await Contactus_FORM.uploadFile();
   await page.waitForTimeout(2000);

await Contactus_FORM.submit();
await page.waitForTimeout(5000);
await Contactus_FORM.verifySuccessMessage();
 //verify its reached on home page so we are verify featured item
await expect(page.locator('.features_items>.title.text-center')).toHaveText('Features Items');
console.log('test case - 6 successful contect us form')
})