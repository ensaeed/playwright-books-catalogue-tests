import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginAndWaitForBooksPage(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAsadmin();
  await page.getByRole('button', { name: /add book/i }).first().waitFor({
    state: 'visible',
    timeout: 30000
  });
}