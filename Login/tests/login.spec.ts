import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Feature", () => {
  test("User berhasil login dengan valid credential", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login("standard_user", "secret_sauce");

    await loginPage.verifyLoginSuccess();
  });

  test("User gagal login dengan invalid credential", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login("locked_out_user", "salah_password");

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
