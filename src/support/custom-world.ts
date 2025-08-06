import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { HomePage } from "../page-objects/home-page";
import { DependencyContainer } from "tsyringe";
import { ToDoPage } from "../page-objects/todo-page";

export interface CucumberWorldContructorParams{
    parameters: {[key: string]: string}
}

export interface ICustomWorld extends World {
    debug?: boolean;
    page?: Page;
    browser?: Browser;
    context?: BrowserContext;
    container?: DependencyContainer;
    homePage?: HomePage;
    toDoPage?: ToDoPage;
};

export class CustomWorld extends World implements ICustomWorld{
    constructor(options: IWorldOptions){
        super(options);
    }
}

setWorldConstructor(CustomWorld);