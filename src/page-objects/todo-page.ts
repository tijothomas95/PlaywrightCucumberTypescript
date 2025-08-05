import { Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class ToDoPage{

    constructor(@inject('page') public page: Page){

    };

    async openTodoPage(){
        let url = process.env.PORTAL_URL;
        console.log("Lanching todo page url " + url);
        await this.page.goto(url);
    }

}