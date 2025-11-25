// Test case: verifies that an user can dlogin to the site with valid credentials


import {test,expect} from '../src/fixtures/Login.fixture';
import  {LoginPage} from '../src/pages/LoginPage';

test('LoginPage  - admin can login succesfully ', async({page})=>{

    const login=new LoginPage(page);
    await login.goto();
    await login.loginAsadmin();
    await login.loginButton;
   

    
    const logoutButton=page.getByRole('button',{name:/log out/i})
    await expect(logoutButton).toBeVisible();
})