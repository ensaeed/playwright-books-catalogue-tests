import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginAndWaitForBooksPage(page: Page) {
  const loginPage = new LoginPage(page);

  console.log('Navigating to login page');
  await loginPage.goto();

  console.log('Logging in as admin');
  await loginPage.loginAsadmin();

  const addBookButton = page.getByRole('button', { name: /add book/i }).first();

  console.log('Waiting for Add Book button to be visible');
  await expect(addBookButton).toBeVisible({ timeout: 45_000 });

  console.log('Books page loaded successfully');
}