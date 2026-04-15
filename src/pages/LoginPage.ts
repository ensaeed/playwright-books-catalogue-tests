import { Page, Locator, expect } from '@playwright/test';
import { booksAppConfig } from '../config/appConfig';

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: /login/i });
  }

  async goto() {
    console.log('Opening login page');

    await this.page.goto(`${booksAppConfig.baseURL}/login`, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    await this.page.waitForLoadState('load');

    console.log('Waiting for login form elements');

    await expect(this.usernameInput).toBeVisible({ timeout: 30_000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 30_000 });
    await expect(this.loginButton).toBeVisible({ timeout: 30_000 });

    console.log('Login page loaded successfully');
  }

  async loginAsAdmin() {
    const username = process.env.BOOKS_ADMIN_USERNAME!;
    const password = process.env.BOOKS_ADMIN_PASSWORD!;

    console.log('Filling admin username');
    await this.usernameInput.fill(username);

    console.log('Filling admin password');
    await this.passwordInput.fill(password);

    console.log('Clicking login');
    await this.loginButton.click();
  }

  async loginAsInvalidUser(username: string, password: string) {
    console.log('Attempting invalid login');

    await expect(this.usernameInput).toBeVisible({ timeout: 30_000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 30_000 });

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}