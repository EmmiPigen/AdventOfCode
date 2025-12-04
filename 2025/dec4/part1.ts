import * as fs from 'fs';

const file: string = fs.readFileSync("2025/dec4/inputTest.txt", 'utf-8');
const lines: string[] = file.split("\n");

for (let i = 0; i < lines.length; i++){
  lines[i] = lines[i]?.replace(/[\r\n]+$/, '') ?? '';
}

console.log(lines);