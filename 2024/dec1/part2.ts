import * as fs from 'fs';

const file: string = fs.readFileSync("2024/inputTest.txt", 'utf-8');
const lines: string[] = file.split("\n");

lines.forEach((line, index) => {
  lines[index] = line.replace(/\r/g, '');
})

console.log(lines);