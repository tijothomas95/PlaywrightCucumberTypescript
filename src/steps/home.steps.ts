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

Then("I can validate {string} item is injected", function(this: ICustomWorld, item: string){
    expect(this.homePage.todoListItems).toHaveText(item);
});