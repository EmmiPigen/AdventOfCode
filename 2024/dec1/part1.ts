import * as fs from 'fs';

const file: string = fs.readFileSync("2024/input/dec1.txt", "utf-8").trim();

const lines: string[] = file.split("\n");
//Store both side in two list 
let lRow: number[] = [], rRow: number[] = [];

for (const line of lines){
  let l: string = line.replace(/[\r\n]+$/, '');
  
  //split lines into the two arrays
  const split: string[] = l.split("   ");
  lRow.push(parseInt(split[0] ?? ''));
  rRow.push(parseInt(split[1] ?? ''));

  
}

// console.log(lRow, rRow);

//Take the smallest number from both arrays and calculate the distance between the two them
let lSorted: number[] = lRow.toSorted();
let rSorted: number[] = rRow.toSorted();

let dist = [];

for (let i = 0; i < lSorted.length; i++){
  let lItem:number = lSorted[i] ?? 0;
  let rItem:number = rSorted[i] ?? 0;

  if (lItem >= rItem){

    dist.push(lItem - rItem)
  }
  else{
    dist.push(rItem - lItem)
  }
}
let total:number = 0;
for (const d of dist){
  total += d
}
console.log(total)