import { Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class GooglePage{

    constructor(@inject('page') public page: Page){

    };

    async openGooglePage(){
        let url = process.env.GOOGLE_URL;
        console.log("Lanching google page url " + url);
        await this.page.goto(url);
    }

}