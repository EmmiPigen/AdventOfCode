import * as fs from 'fs';

const file: string = fs.readFileSync("2024/input/dec1.txt", 'utf-8');
const lines: string[] = file.split("\n");

lines.forEach((line, index) => {
  lines[index] = line.replace(/\r/g, '');
})

//console.log(lines);
let lRow: number[] = [], rRow: number[] = [];
for (const line of lines){
  let l: string = line.replace(/[\r\n]+$/, '');
  
  //split lines into the two arrays
  const split: string[] = l.split("   ");
  lRow.push(parseInt(split[0] ?? ''));
  rRow.push(parseInt(split[1] ?? ''));
}
// console.log("Left Row:", lRow);
// console.log("Right Row:", rRow);

let total: number = 0;
for (const lItem of lRow) {
  let count = 0;
  rRow.forEach((rItem) => {
    if (lItem == rItem) count++;
  })
  total += lItem * count;

}
console.log(total);