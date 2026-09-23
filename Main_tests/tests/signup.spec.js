import {test, expect} from '@playwright/test';
import { signup_Page } from '../pages/signup_Page';


test('signup_Page', async({page})=> {
    const Signup=  new signup_Page(page);   

    await page.goto('https://automationexercise.com/login');

    await Signup.signup('Automation_User', 'Automationqa@gmail.com');
    await page.waitForTimeout(2000);

     await Signup.form('Test@123', '16','January','2017');
     await page.waitForTimeout(2000);

     await Signup.address('Automation_First','Automation_Lastname','Nop','Us_Sector_1','Galit 64','Israel','UK SP', 'Newyork','22324','3232323232');
    //  FirstName,lastName,Company,Address1,Address2,SelectOption,State,City,Zipcode,Mobilenumber
}

)     