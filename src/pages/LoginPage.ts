import { Page, Locator, expect } from '@playwright/test';
import { booksAppConfig } from '../config/appConfig';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[type="text"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.getByRole('button', { name: /log in|login/i });
  }

  async goto() {
    console.log('Opening login page');
    console.log(`Navigating to: ${booksAppConfig.baseURL}/login`);

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
    const username = process.env.BOOKS_ADMIN_USERNAME;
    const password = process.env.BOOKS_ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error('Missing BOOKS_ADMIN_USERNAME or BOOKS_ADMIN_PASSWORD');
    }

    console.log('Filling admin username');
    await this.usernameInput.fill(username);

    console.log('Filling admin password');
    await this.passwordInput.fill(password);

    console.log('Clicking login');
    await this.loginButton.click();
  }

  async loginAsInvalidUser(username: string, password: string) {
    await expect(this.usernameInput).toBeVisible({ timeout: 30_000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 30_000 });

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}