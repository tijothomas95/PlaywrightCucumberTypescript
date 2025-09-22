import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/custom-world";
import { expect } from "@playwright/test";

Given("I open the todo mvc web application", async function(this: ICustomWorld) {
    await this.todoMvcPage.gotoTodoMvcPage()
})

When("I click mvc framework {string} examples", async function(this: ICustomWorld, item: string){
    await this.todoMvcPage.clickExampleTab(item)
})

Then("I can validate {string} app list items displayed", async function(this: ICustomWorld, item: string){
    expect(await this.todoMvcPage.validateExampleListDisplayed(item)).toBeTruthy()
})