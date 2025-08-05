import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { config } from "./config";
import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { ICustomWorld } from "./custom-world";
import { HomePage } from "../page-objects/home-page";
import { container } from "tsyringe";
import { ToDoPage } from "../page-objects/todo-page";

let browser: Browser;

BeforeAll(async function(){
    console.log(" Launching browser...");
    console.log(" Config browser inside: " + config.browser);
    switch(config.browser){
        case "chromium":
            browser = await chromium.launch(config.browserOptions);
            break;
        case "firefox":
            browser = await firefox.launch(config.browserOptions);
            break;
        case "webkit":
            browser = await webkit.launch(config.browserOptions);
            break;
        default:
            throw new Error(`Unsupported browser: ${config.browser}`);
    };
});

Before(async function(this: ICustomWorld) {
    this.context = await browser.newContext({
        viewport: { width: 1920, height: 1080  },
    });
    this.page= await this.context.newPage();
    this.container = container.register('page', { useValue: this.page });
});

/* 
In a Cucumber + TypeScript context (often using tsyringe for DI), this.container.resolve is used to:
Access shared services or objects
Manage dependencies cleanly across your step definitions
You use this.container.resolve(Class) to inject dependencies in your step files, hooks, or world.
*/
Before({ tags: '@mock'},async function (this:ICustomWorld) {
    this.homePage=this.container.resolve(HomePage);
    this.toDoPage=this.container.resolve(ToDoPage);
})

After(async function(){
    await this.page?.close();
    await this.context?.close();
});


AfterAll(async function () {
  await browser?.close();
});

// Export to access in step definitions
export { browser };