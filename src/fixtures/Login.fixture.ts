import {test as base, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


//const test=base.extend({});
const test=base;

test.beforeEach(async ({page})=>{

    const loginPage =new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAsadmin()
      
})
    
 export {test,expect};


