import * as fs from 'fs';

const file: string = fs.readFileSync("2024/input/dec1.txt", 'utf-8');
const lines: string[] = file.split("\n");

lines.forEach((line, index) => { //Remove \r from each line
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
for (const lItem of lRow) { //Similar to Python's: for lItem in lRow
  let count = 0;
  rRow.forEach((rItem) => { //Goes though each rItem in rRow
    if (lItem == rItem) count++; //Similar to python's: count += 1 if lItem == rItem
  })
  total += lItem * count;

}
console.log(total);