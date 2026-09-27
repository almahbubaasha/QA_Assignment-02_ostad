import { BasePage } from "./BasePage";

class SearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        //locators
        this.searchBox = page.locator('#small-searchterms');
        this.searchButton = page.locator("//input[@value='Search']");
    }

    async searchProduct(keyword){
        await this.searchBox.fill(keyword);
        await this.searchButton.click();
    }
}
export { SearchPage };