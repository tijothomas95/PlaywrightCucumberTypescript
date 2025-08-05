
Install playwright:
1. npm init playwright
- Validate package.json files
- May delete playwright.config.ts as we are using config.ts to overwrite the default config

Install @cucumber/cucumber:
2. npm install @cucumber/cucumber
- Validate package.json file for the dependency addition

Folder struture:
3. Add features folder with `sample.feature` file
4. Add src folder with steps, page-objects, support

5. `sample.feature` Add feature, Scenario, BDD, Examples
6. Create a dummy step functions

7. Create `common-hooks.ts`, `custom-world.ts` in src/support folder

common-hooks.ts - where we set browser kick off,  PO instances using container.resolve with help of tags

custom-world.ts - where we can extend world interface and add PO class properties.

8. Define export `ICustomWorld` interface inside custom-world.ts where we can add cPO properties

Install ts-node:
npm install --save-dev ts-node typescript

9. Create `config.ts` file with browserOptions and reqtrive it in common-hoos.ts

10. Create `cucumber.mjs` file with default requirements to build the feature-steps relation
npx cucumber-js features/todo1.feature

11. `tsconfig.json` is must as 📦 Tells the TypeScript compiler how to transpile .ts/.tsx files

12. `npm install tsyringe reflect-metadata` // to add dependency injection and help manage dependencies cleanly across your step definitions

13. Add `@injectable(), @inject('page')` to all class invokes and its constructors.

14. `npm run {script_from_package.json}` // to run the tests as cucumber


Key points to clarify & fix
1. Playwright Test config `playwright.config.ts` (defineConfig) is for Playwright Test runner
This config only works when you run tests with npx playwright test.
It does not affect tests run with npx cucumber-js because Cucumber doesn't use this config.

2. You must overwrite `playwright.config.ts` with a `config.ts` to create configguration for launch browsers explicitly using `common-hooks.ts` inside your Cucumber step definitions
Since you run with Cucumber (npx cucumber-js), your step code must:
Import Playwright (chromium, firefox, webkit)
Launch the browser manually
Navigate to baseURL (you can read from your env config)

🌍 What is World in Cucumber?
In Cucumber.js, the World is a shared context object that is created fresh for each scenario. You can attach anything to it — like page, browser, test data, etc. — and use it across multiple step definitions.


✅ setWorldConstructor(CustomWorld) – What It Does
The setWorldConstructor() function in Cucumber.js registers your custom World class so that each scenario gets its own fresh instance of that world.

✅ this.container.resolve?

In a Cucumber + TypeScript context (often using tsyringe for DI), this.container.resolve is used to:
Access shared services or objects
Manage dependencies cleanly across your step definitions
You use this.container.resolve(Class) to inject dependencies in your step files, hooks, or world.

