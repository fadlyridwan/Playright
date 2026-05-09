import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly productTitle: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder("Username");

    this.passwordInput = page.getByPlaceholder("Password");

    this.loginButton = page.getByRole("button", { name: "Login" });

    this.productTitle = page.locator(".title");

    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigate to login page
  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  // Login action
  async login(username: string, password: string) {
    await expect(this.usernameInput).toBeVisible();

    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await expect(this.loginButton).toBeEnabled();

    await this.loginButton.click();
  }

  // Success validation
  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);

    await expect(this.productTitle).toHaveText("Products");
  }

  // Invalid login validation
  async verifyInvalidLogin() {
    await expect(this.errorMessage).toBeVisible();

    await expect(this.errorMessage).toContainText(
      "Username and password do not match",
    );
  }
}
