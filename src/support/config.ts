import path from 'path';
import dotenv from 'dotenv';


const env = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, '../../envs', `${env}.env`) });
console.log("Inside: " + env);

export const config = {
    browser: process.env.BROWSER || 'chromium',
    browserOptions: {
        headless: process.env.CI ? true : false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 30000,
        timeout: 30000,
        expect: {timeout: 30000}
  }
}

/* //If we need to save the urls in json and access those values:
const env = process.env.TEST_ENV || 'dev';
let filePath
if (env == 'dev')
{
  filePath = 'src/support/envConfig.json';
}
else{
  throw new Error(`Unsupported env`);
}

const envConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8')); */