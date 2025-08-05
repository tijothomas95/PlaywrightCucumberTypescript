import { Given, When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";

Given("I open the todo web application", async function(this: ICustomWorld){
    await this.homePage.openHome();
    await this.toDoPage.openTodoPage()
});

When("I add new todo {string} to field", async function(this: ICustomWorld){

});

Then("I can validate {string} item is injected", function(this: ICustomWorld){

});