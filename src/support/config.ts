import path from 'path';
import dotenv from 'dotenv';

const env = 'dev'
dotenv.config({ path: path.resolve(__dirname, '../../envs', `${env}.env`) });
console.log("Inside: " + process.env.GOOGLE_URL)

export const config = {
    browser: "chromium",
    browserOptions: {
        headless: false, // or true
  }
}

/* //If we need to save the ursl in json and access those values:
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