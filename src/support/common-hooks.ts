import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { config } from "./config";
import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { ICustomWorld } from "./custom-world";
import { TodoPage } from "../page-objects/todo-page";
import { container } from "tsyringe";
import { GooglePage } from "../page-objects/google-page";
import { ProjectContext } from "../context/project-context";

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
        viewport: { width: 1280, height: 720  },
    });
    this.page= await this.context.newPage();
    this.container = container.register('page', { useValue: this.page });
});

Before({ tags: '@debug'},async function (this:ICustomWorld) {
    this.debug=true;
})

/* 
In a Cucumber + TypeScript context (often using tsyringe for DI), this.container.resolve is used to:
Access shared services or objects
Manage dependencies cleanly across your step definitions
You use this.container.resolve(Class) to inject dependencies in your step files, hooks, or world.
*/
Before({ tags: '@todo'},async function (this:ICustomWorld) {
    this.projContext=this.container.resolve(ProjectContext);
    this.todoPage=this.container.resolve(TodoPage);
    this.googlePage=this.container.resolve(GooglePage);
})

After(async function ({ result }) {
  if (result?.status === Status.FAILED) {
    const screenshotBuffer = await this.page.screenshot({ type: 'png', fullPage: true });

    // Attach to Allure
    await this.attach(screenshotBuffer, 'image/png');
  }
  
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});

// Export to access in step definitions
export { browser };