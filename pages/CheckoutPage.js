import { BasePage } from "./BasePage";

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        this.productCheckbox = page.locator("//input[@name='removefromcart']");
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator("//button[@id='checkout']");

        //billing address
        this.countryDropdown = page.locator('#BillingNewAddress_CountryId');
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.address2Input = page.locator('#BillingNewAddress_Address2');
        this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
        this.faxInput = page.locator('#BillingNewAddress_FaxNumber');

        //shipping address
        this.inStorePickupCheckbox = page.locator('#PickUpInStore');

        //continue/confirm button 
        this.continueButton = page.locator('input[value="Continue"]:visible');
        this.confirmButton = page.locator('input[value="Confirm"]:visible');

        //order confirmation
        this.orderCompletedMessage = this.page.getByText('Your order has been successfully processed');
        this.orderNumberText = this.page.getByText('Order number:');
        this.orderDetailsLink = this.page.getByText('Click here for order details.');
        this.backToHomeButton = this.page.locator('.order-completed-continue-button');
    }

    async tickProductCheckbox(){
        await this.productCheckbox.check();
    }

    async agreeToTerms(){
        await this.termsCheckbox.check();
    }

    async clickCheckout(){
        await this.checkoutButton.click();
    }

    async fillBillingAddress(){
        await this.page.waitForTimeout(2000);
        await this.cityInput.fill('Dhaka');
        await this.address1Input.fill('Jatrabari');
        await this.address2Input.fill('Paterbag');
        await this.zipInput.fill('1232');
        await this.phoneInput.fill('01719596720');
        await this.faxInput.fill('4545');
        await this.countryDropdown.selectOption({ label: 'Bangladesh' });
    }

    async selectInStorePickup(){
        await this.inStorePickupCheckbox.check();
        await this.page.waitForTimeout(2000);
    }

    async clickContinue(){
        await this.page.waitForTimeout(3000);
        await this.continueButton.click();
    }

    async clickConfirm(){
        await this.page.waitForTimeout(3000);
        await this.confirmButton.click({ force: true });
    }

    async getOrderCompletedMessage(){
        await this.orderCompletedMessage.waitFor({ state: 'visible' });
        return await this.orderCompletedMessage.textContent();
    }

    async getOrderNumberText(){
        await this.orderNumberText.waitFor({ state: 'visible' });
        return await this.orderNumberText.textContent();
    }

    async viewOrderDetails(){
        await this.orderDetailsLink.click();
    }

    async clickBackToHome(){
        await this.backToHomeButton.waitFor({ state: 'visible' });
        await this.backToHomeButton.click();
    }
}
export { CheckoutPage };