import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test('should login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.pageOpen();
    await loginPage.clickLoginButtonLink();

    await loginPage.enterEmail('ashatest1@gmail.com');
    await loginPage.enterPassword('asha@123');
    await loginPage.clickRememberMeCheckbox();
    await loginPage.clickLoginButton();

    await expect(loginPage.verifyLogin).toBeVisible();

    await page.waitForTimeout(2000);
});