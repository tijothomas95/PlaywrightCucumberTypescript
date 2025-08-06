import { Locator, Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class HomePage{
    readonly newTodoFld: Locator;
    readonly deleteBtn: Locator;
    readonly toggleCheckBx: Locator;
    readonly todoListItems: Locator;

    constructor(@inject('page') public page: Page){
        this.newTodoFld = this.page.locator("input.new-todo");
        this.toggleCheckBx = this.page.locator("input.toggle");
        this.deleteBtn = this.page.locator("button.destroy");
        this.todoListItems = this.page.getByTestId('todo-title');
    };

    async openHome() {
        let url = process.env.GOOGLE_URL;
        console.log("Lanching page url " + url);
        await this.page.goto(url);
    }

    async addTodoItem(item: string){
        await this.newTodoFld.fill(item);
        await this.newTodoFld.press('Enter');
    }

}