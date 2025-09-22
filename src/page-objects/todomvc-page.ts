import { Locator, Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class TodoMvcPage{

    readonly exampleLoc : Locator
    readonly javaScriptList: Locator
    readonly compileToJSList: Locator
    readonly labsList: Locator

    constructor(@inject('page') public page: Page){
        this.exampleLoc = this.page.locator("div#tabsContent>paper-tab");
        this.javaScriptList = this.page.locator("div[data-app-list=\"js\"]");
        this.compileToJSList = this.page.locator("div[data-app-list=\"ctojs\"]");
        this.labsList = this.page.locator("div[data-app-list=\"labs\"]");


    }

    async gotoTodoMvcPage(){
        let url = process.env.MVC_URL
        console.log("Launching MVC url")
        await this.page.goto(url);
    }

    async clickExampleTab(tabName: string){
        await this.exampleLoc.filter({ hasText: tabName }).click();
    }

    async validateExampleListDisplayed(tabName: string): Promise<boolean> {
        let exampleList;

        switch (tabName) {
            case 'Compile-to-JS':
            exampleList = this.compileToJSList;
            break;
            case 'Labs':
            exampleList = this.labsList;
            break;
            default:
            exampleList = this.labsList; // Added to false test validation TBR
        }

        const display = await exampleList.evaluate(el =>
            window.getComputedStyle(el).display
        );

        return display === 'block';
    }
}