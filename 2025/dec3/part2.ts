import * as fs from 'fs';

const file: string = fs.readFileSync("2025/dec3/input.txt", "utf-8");
const lines: string[] = file.split("\n");

lines.forEach((line, index) => {
  lines[index] = line.replace(/\r/g, '');
})

let maxJolt: number[] = [];

for (const line of lines) {
  //First take the window from start to length - 11 for the initial max
  const init: string = line.substring(0, line.length - 11);
  let arr: number[] = init.split("").map((c) => parseInt(c)) // Convert to array of numbers
  let a = Math.max(...arr) // Get the max in the initial window
  let tempMaxJolt: string = a.toString();
  let aIndex = -1;
  for (let i = 0; i < 11; i++) {
    aIndex += arr.indexOf(a) + 1; // Get the index of the max in the initial window
    let newString = line.substring(aIndex + 1, line.length - 10 + i); // Create a new window starting from the index of the max + 1
    arr = newString.split("").map((c) => parseInt(c)) // Convert to array of numbers
    a = Math.max(...arr) // Get the max in the initial window
    tempMaxJolt += a.toString();

  }
  maxJolt.push(parseInt(tempMaxJolt))
}


//console.log(maxJolt)

let total: number = 0;
for (const n of maxJolt) {
  total += n;
}

console.log(total);
