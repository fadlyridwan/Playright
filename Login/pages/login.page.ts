import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locator
  usernameInput = "#user-name";
  passwordInput = "#password";
  loginButton = "#login-button";
  inventoryTitle = ".title";

  // Navigate
  async gotoLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  // Login Function
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);

    await this.page.fill(this.passwordInput, password);

    await this.page.click(this.loginButton);
  }

  // Assertion
  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);

    await expect(this.page.locator(this.inventoryTitle)).toHaveText("Products");
  }
}
