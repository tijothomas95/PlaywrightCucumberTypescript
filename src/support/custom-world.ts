import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { TodoPage } from "../page-objects/todo-page";
import { DependencyContainer } from "tsyringe";
import { GooglePage } from "../page-objects/google-page";

export interface CucumberWorldContructorParams{
    parameters: {[key: string]: string}
}

export interface ICustomWorld extends World {
    debug?: boolean;
    page?: Page;
    browser?: Browser;
    context?: BrowserContext;
    container?: DependencyContainer;
    todoPage?: TodoPage;
    googlePage?: GooglePage;
};

export class CustomWorld extends World implements ICustomWorld{
    constructor(options: IWorldOptions){
        super(options);
    }
}

setWorldConstructor(CustomWorld);