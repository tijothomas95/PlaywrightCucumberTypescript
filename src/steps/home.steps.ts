import { Given, When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";
import { expect } from "@playwright/test";

Given("I open the todo web application", async function(this: ICustomWorld){
    await this.homePage.openHome();
    await this.toDoPage.openTodoPage()
});

When("I add new todo {string} to field", async function(this: ICustomWorld, item: string){
    await this.homePage.addTodoItem(item);
});

When("I remove the {string} from todo list", async function (this: ICustomWorld, item:string) {
    await this.homePage.removeTodoItem(item);
});

Then("I can validate {string} item is injected", async function(this: ICustomWorld, item: string){
    expect(await this.homePage.isTodoItemListDisplayed()).toBeTruthy();
    await expect(this.homePage.todoListItems).toHaveText(item);
});

Then("I can validate todo item list is not displayed", async function(this: ICustomWorld){
    expect(await this.homePage.isTodoItemListDisplayed()).toBeFalsy();
});