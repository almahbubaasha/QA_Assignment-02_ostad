import { test, expect } from '@playwright/test';
import { Register } from "../pages/Register.js";
import { LoginPage } from "../pages/LoginPage.js";
import { SearchPage } from "../pages/SearchPage.js";
import { OrderPage } from "../pages/OrderPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

test('Q3 - Search product, checkout and confirm order', async ({page}, testInfo) => {
    
      test.setTimeout(90000);

    const pages = new Register(page);
    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const orders = new OrderPage(page);
    const checkout = new CheckoutPage(page);

    //protibar notun/unique email
    const timestamp = Date.now();
    const email = `ashatest${timestamp}@gmail.com`;
    const password = 'asha@456';

    //register (notun account)
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
    await pages.logout();

    //login
    await login.clickLoginButtonLink();
    await login.enterEmail(email);
    await login.enterPassword(password);
    await login.clickLoginButton();

    //search
    await search.searchProduct('Computing and Internet');

    //verify correct product ashse search result e
    await expect(orders.productView).toBeVisible();

    //product view (open the product)
    await orders.clickProductView();

    //quantity barano
    await orders.increaseQuantity(3);

    //cart e add kora
    await orders.addToCart();
    await page.waitForTimeout(2000);

    //cart e giye
    await orders.shCart.click();

    //product checkbox tick + terms agree
    await checkout.tickProductCheckbox();
    await checkout.agreeToTerms();
    await checkout.clickCheckout();

    //Billing Address 
    await checkout.fillBillingAddress();
    await checkout.clickContinue();

    //Shipping Address 
    await checkout.selectInStorePickup();
    await checkout.clickContinue();

    //Shipping Method -> Continue
    // await checkout.clickContinue();

    //Payment Method -> Continue
    await checkout.clickContinue();

    //Payment Information -> Continue
    await checkout.clickContinue();

    //Confirm Order -> Confirm
    await checkout.clickConfirm();

    //order completed verify
    const confirmMessage = await checkout.getOrderCompletedMessage();
    expect(confirmMessage).toContain('successfully processed');

    //order number check
    const orderNumberText = await checkout.getOrderNumberText();
    console.log('Order info:', orderNumberText);

    //check order 
    await checkout.viewOrderDetails();

    //screenshot attach
    const screenshot = await page.screenshot();
    await testInfo.attach('Order Confirmation Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

    await page.waitForTimeout(3000);
})