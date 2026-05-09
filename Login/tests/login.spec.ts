import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login Feature", () => {
  test("User berhasil login dengan valid credential", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Open login page", async () => {
      await loginPage.goto();
    });

    await test.step("Login using valid credential", async () => {
      await loginPage.login("standard_user", "secret_sauce");
    });

    await test.step("Verify successful login", async () => {
      await loginPage.verifyLoginSuccess();
    });
  });

  test("User gagal login dengan invalid credential", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Open login page", async () => {
      await loginPage.goto();
    });

    await test.step("Login using invalid credential", async () => {
      await loginPage.login("standard_user", "wrong_password");
    });

    await test.step("Verify error message displayed", async () => {
      await loginPage.verifyInvalidLogin();
    });
  });
});
