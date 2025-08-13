import { expect, Locator, Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class TodoPage{
    readonly newTodoFld: Locator;
    readonly deleteBtn: Locator;
    readonly toggleCheckBx: Locator;
    readonly todoListItems: Locator;

    constructor(@inject('page') public page: Page){
        this.newTodoFld = this.page.locator("input.new-todo");
        this.toggleCheckBx = this.page.locator("input.toggle");
        this.deleteBtn = this.page.locator("button.destroy");
        this.todoListItems = this.page.getByTestId("todo-item");
    };

    async openTodoPage() {
        let url = process.env.PORTAL_URL;
        console.log("Lanching page url " + url);
        await this.page.goto(url);
    }

    async isTodoItemListDisplayed(){
        let todoItemCount = await this.todoListItems.count();
        console.log("Todo item found:" + todoItemCount);
        return todoItemCount > 0;
    }

    async addTodoItem(item: string){
        await this.newTodoFld.fill(item);
        await this.newTodoFld.press('Enter');
    }

    async removeTodoItem(item: string){
        const matchedItem = this.todoListItems.filter({ hasText: item }).first();
        console.log("Matched item found:" + await matchedItem.textContent());
        let deleteElem = matchedItem.locator("button[aria-label=\"Delete\"]");
        await matchedItem.hover();
        await expect(deleteElem).toBeVisible({ timeout: 10000 });
        await deleteElem.click();
    }

}