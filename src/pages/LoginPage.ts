// Page Object Model for the Login Page - handling login actions and form interactions

import {Page} from '@playwright/test';
import { booksAppConfig } from '../config/appConfig';

export class LoginPage {
    readonly page:Page;

//Locators
readonly usernameInput;
readonly passwordInput;
readonly loginButton;

constructor(page:Page) {
    this.page=page;

this.usernameInput=page.getByRole('textbox',{name:/username/i});
this.passwordInput=page.getByRole('textbox',{name:/password/i});
this.loginButton=page.getByRole('button',{name:/login/i});
    
}
async goto() {
  await  this.page.goto(booksAppConfig.baseURL)
}

async loginAsadmin() {
 const username= process.env.BOOKS_ADMIN_USERNAME!;
 const password=process.env.BOOKS_ADMIN_PASSWORD!;
 await this.usernameInput.fill(username);
 await this.passwordInput.fill(password);

await this.loginButton.click();
}
async loginAsInValidUser (username:string,password:string){
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();

}}


