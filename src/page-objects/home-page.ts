import { Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class HomePage{

    constructor(@inject('page') public page: Page){

    };

    async openHome() {
        let url = process.env.GOOGLE_URL;
        console.log("Lanching page url " + url);
        await this.page.goto(url);
    }
}