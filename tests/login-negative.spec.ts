// Negative test: user cannot log in with incorrect credentials.


import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';


test('User cannot login with invalid credentials', async({page})=>{

    const loginPage=new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAsInValidUser('invaliduser','invalidpassword');

    const errormessage=page.getByText('There is a problem with your submission');
    await expect(errormessage).toBeVisible();

    const errordetail=page.getByText('Invalid username or password. Please try again.');
    await expect(errordetail).toBeVisible();



})