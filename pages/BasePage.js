import { TIMEOUT } from "node:dns";

class BasePage{
    constructor(page){
        this.page = page ;
    }

//page open
async pageOpen(){
   await this.page.goto('https://demowebshop.tricentis.com/',{
    waitUntil : 'domcontentloaded',
    timeout : 60000
   });
     }

//page close
async pageClose(){
    await this.page.close();
    }
}
export{BasePage};