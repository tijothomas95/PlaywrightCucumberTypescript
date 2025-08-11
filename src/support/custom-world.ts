import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { TodoPage } from "../page-objects/todo-page";
import { DependencyContainer } from "tsyringe";
import { GooglePage } from "../page-objects/google-page";
import { ProjectContext } from "../context/project-context";

export interface CucumberWorldContructorParams{
    parameters: {[key: string]: string}
}

export interface ICustomWorld extends World {
    debug?: boolean;
    page?: Page;
    browser?: Browser;
    context?: BrowserContext;
    projContext?: ProjectContext;
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