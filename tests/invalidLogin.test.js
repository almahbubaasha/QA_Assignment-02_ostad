import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test('Q1 - Invalid Login', async ({ page }, testInfo) => {

    const loginPage = new LoginPage(page);

    await loginPage.pageOpen();
    await loginPage.clickLoginButtonLink();

    await loginPage.enterEmail('wrongemail@gmail.com');
    await loginPage.enterPassword('wrongpass123');
    await loginPage.clickLoginButton();

    // error message check
    await expect(loginPage.errorMessage).toBeVisible();

    //login verification check
    await expect(loginPage.verifyLogin).not.toBeVisible();

    // screenshot attachment to allure report
    const screenshot = await page.screenshot();
    await testInfo.attach('Invalid Login Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

    await loginPage.pageClose();
});