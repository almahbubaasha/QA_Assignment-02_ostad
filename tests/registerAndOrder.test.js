import { test, expect } from '@playwright/test';
import { Register } from "../pages/Register.js";
import { LoginPage } from "../pages/LoginPage.js";
import { OrderPage } from '../pages/OrderPage.js';

test('Q2 - Register, login and add product to cart', async ({page}, testInfo) => {

    const pages = new Register(page);
    const login = new LoginPage(page);
    const orders = new OrderPage(page);

    // for unique email each time
    const timestamp = Date.now();
    const email = `ashatest${timestamp}@gmail.com`;
    const password = 'asha@456';

    //first register
    await pages.pageOpen();
    await pages.clickRegisterLink();
    await pages.genderSelection();
    await pages.firstName('Almahbuba');
    await pages.lastName('Asha');
    await pages.email(email);
    await pages.registationPassword(password);
    await pages.confirmPassword(password);
    await pages.registerButton();

    await page.waitForTimeout(3000);

    //first logout then login with the same credentials
    await pages.logout();

    //login
    await login.clickLoginButtonLink();
    await login.enterEmail(email);
    await login.enterPassword(password);
    await login.clickLoginButton();

    //after login click orders
    await orders.clickMenuBooks();
    await orders.clickFilterByPrice();
    await orders.clickProductView();

    const productName = await orders.getProductName();

    await orders.addToCart();
    await page.waitForTimeout(2000);

    await orders.shCart.click();

    //check product name and quantity in cart
    const cartProductName = await orders.getCartProductName();
    const cartQty = await orders.getCartProductQty();

    expect(cartProductName.trim()).toContain(productName.trim());
    expect(cartQty).toBe('1');

    // screenshot attach
    const screenshot = await page.screenshot();
    await testInfo.attach('Cart Verification Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

    await page.waitForTimeout(3000);
})