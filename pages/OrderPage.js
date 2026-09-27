import {BasePage} from "./BasePage";

class OrderPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        //locators
        this.menuBooks = page.locator('//ul[@class="top-menu"]//a[normalize-space()="Books"]');
        this.filtered = page.locator('#products-orderby');  
        // this.productView = page.locator('a[href="/computing-and-internet"]').first();
        this.productView = page.getByRole('link', { name: 'Computing and Internet', exact: true }).first(); 
        this.cart = page.locator("//input[@id='add-to-cart-button-13']");
        this.shCart = page.locator("//span[normalize-space()='Shopping cart']");
        this.check = page.locator('#termsofservice');
        this.checkBtn = page.locator("//button[@id='checkout']");

        //cart verify korar jonno notun locators
        this.productNameOnDetailPage = page.locator('.product-name h1');
        this.cartProductName = page.locator('.cart .product a');
        this.cartProductQty = page.locator('.cart .qty input');
        //quantity baranor jonno
        this.quantityInput = page.locator("//input[@id='addtocart_13_EnteredQuantity']");
        
 }
  async clickMenuBooks() {
    await this.menuBooks.click();

  }

  async clickFilterByPrice() {
    await this.filtered.selectOption('https://demowebshop.tricentis.com/books?orderby=5');
  }

  async clickProductView() {
    await this.productView.click();
  }

  async getProductName(){
    return await this.productNameOnDetailPage.textContent();
  }

  async addToCart(){
    await this.cart.click();
  }

  async shoppingCart(){
    await this.shCart.click();
    await this.check.click();
    await this.checkBtn.click();
  }

  //cart e giye product name o quantity verify korar jonno
  async getCartProductName(){
    return await this.cartProductName.first().textContent();
  }

  async getCartProductQty(){
    return await this.cartProductQty.first().inputValue();
  }

  async increaseQuantity(qty){
    await this.quantityInput.fill(qty.toString());
}



}

export { OrderPage };