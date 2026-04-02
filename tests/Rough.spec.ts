import {test,expect, Locator} from '@playwright/test';
import { Page } from '@playwright/test';


class BankHomePage {

    readonly page:Page;
    readonly bankManagerLogin:Locator;
    readonly addCustomerBtn:Locator;
    readonly firstNameInputField: Locator;
    readonly lastNameInputField: Locator;
    readonly postCodeInputField:Locator;
    readonly addCustomerDetailBtn:Locator;


    constructor(page:Page){
        this.page=page;
        this.bankManagerLogin=page.getByRole('button',{name:/bank manager login/i});
        this.addCustomerBtn=page.getByRole('button',{name:/add customer/i});
        this.firstNameInputField=page.getByPlaceholder('First Name');
        this.lastNameInputField=page.getByPlaceholder('Last Name');
        this.postCodeInputField=page.getByPlaceholder('Post Code');
        this.addCustomerDetailBtn = page.locator('button[type="submit"]');



    }

    async goto(){
        console.log('➡️ About to navigate...');
  await this.page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
  
    
      
    }
    async clickManagerBtn(){
        await this.bankManagerLogin.click();
    }

    async addCustomerbtn(){
        await this.addCustomerBtn.click()
    }

    async addCustomerDetailbtn(){
        await this.addCustomerDetailBtn.click();
    }

    async addCustomer(firstname:string,lastname:string,postcode:string){
        await this.firstNameInputField.fill(firstname);
        await this.lastNameInputField.fill(lastname);
        await this.postCodeInputField.fill(postcode);
    }
    /*
async waitForAddCustomerDialog() {
  const dialog = await this.page.waitForEvent('dialog');
  console.log('POPUP TEXT:', dialog.message());
  await dialog.accept();
  return dialog;
}
*/

async waitForAddCustomerDialog(){
  const dialog= await this.page.waitForEvent('dialog');
  await dialog.accept();
  return dialog;
}

    
}

test('The manager can add a custer',async({page})=>{
    const bankhomePage=new BankHomePage(page);
    await bankhomePage.goto();
    await bankhomePage.clickManagerBtn();
    await bankhomePage.addCustomerbtn();
    await bankhomePage.addCustomer('John','Smith','B27 6ST');
   const dialog = bankhomePage.waitForAddCustomerDialog(); 
    await bankhomePage.addCustomerDetailbtn();

    const popup = await dialog;
   
  expect(popup.message()).toContain('Customer added successfully');
   

})
