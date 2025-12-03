import * as fs from 'fs';

const file: string = fs.readFileSync("2025/dec3/input.txt", "utf-8");
const lines: string[] = file.split("\n");

for (let i = 0; i < lines.length; i++){
  lines[i] = lines[i]?.replace(/[\r\n]+$/, '') ?? '';
}

console.log(lines);
let maxJolt:number[] = [];

for(const line of lines) {
  let biggest:number = parseInt(line.at(0) ?? '0');
  let second:number = 0;
  for (let i = 1; i < line.length - 1; i++){
    let temp:number = parseInt(line.at(i) ?? '0');
    if (temp > biggest){
      biggest = temp;
    }
  }
  let bigIndex = line.indexOf(biggest.toString())
  for (let i = bigIndex + 1; i < line.length; i++) {
    let temp:number = parseInt(line.at(i) ?? '0');
      if (temp > second){
      second = temp;
    }
  }
  let biggestJolt = biggest.toString() + second.toString();
  maxJolt.push(parseInt(biggestJolt))
}
let total: number = 0;
for (const n of maxJolt) {
  total += n;
}

console.log(total);
