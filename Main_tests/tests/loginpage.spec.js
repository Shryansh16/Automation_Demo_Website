import {test, expect} from '@playwright/test'
import { loginpage } from '../pages/loginpage'
// import { TIMEOUT } from 'node:dns';
// import path from 'node:path';

test('login_page',async({page}) =>{
const Loginpage = new loginpage(page);

await page.goto('https://automationexercise.com/login');

await Loginpage.login('Testqa@gmail.com', 'Test@123');
await page.waitForTimeout(2000);
await page.screenshot({path:'screenshot.png'})
})