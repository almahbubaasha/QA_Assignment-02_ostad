// import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";


class Register extends BasePage{
    constructor(page){
        super(page);
        this.page = page;

    //locators
    this.registerLink = page.locator('a[href="/register"]');
    this.gender = page.locator('#gender-female');
    this.fName = page.locator('#FirstName');
    this.lName = page.locator('#LastName');
    this.mail = page.locator('#Email');
    this.password = page.locator('#Password');
    this.cPassword = page.locator('#ConfirmPassword');
    this.rButton = page.locator('#register-button');
    this.logoutLink = page.locator('a[href="/logout"]');
    }

    // //page open
    // async pageOpen(url){
    //     await this.page.goto(url);
    // }
    
    //registerlink
    async clickRegisterLink(){
        await this.registerLink.click();
    }
    //gender
    async genderSelection(){
        await this.gender.click();
    }
    //first name
    async firstName(name){
        await this.fName.fill(name);
    }
    //last name
    async lastName(name){
    await this.lName.fill(name);
    }
    //email
    async email(mail){
    await this.mail.fill(mail);
    }
    //password
    async registationPassword(pass){
        await this.password.fill(pass);
    }
    //confirm pass
    async confirmPassword(cpass){
        await  this.cPassword.fill(cpass);
    }
    //register button
    async registerButton(){
        await this.rButton.click();
    }
    //logout (register korle auto login hoye jay, tai logout kore abar explicit login korbo)
    async logout(){
        await this.logoutLink.click();
    }

}

export{Register};