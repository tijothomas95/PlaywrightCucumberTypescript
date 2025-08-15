import fs from 'fs'
import path from 'path';

export function readJson(filename: string): any {
  const filePath = path.join(__dirname, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
