import * as fs from 'fs';
import { inspect } from 'util';

// inspect.defaultOptions.breakLength = Infinity;
// inspect.defaultOptions.maxArrayLength = null;
inspect.defaultOptions.compact = true;

const file: string = fs.readFileSync("2025/input/dec4.txt", 'utf-8');
const lines: string[] = file.split("\r\n");



// console.log(lines);

//Convert to a 2d array:
const rolls: string[][] = [];

lines.forEach((line) => {
  rolls.push(line.split(""));
})


// console.log(rolls)
//Copy array size 
let rollsMovable: number = 0;
// console.log(rollsAdjecent)

//Check how many adjecent position have a roll in it
//Pad the array with an extra space around it
rolls.splice(0, 0, ['.']);
rolls.splice(rolls.length + 1, 0, ['.']);
rolls.forEach((row) => {
  row.splice(0, 0, '.');
  row.splice(row.length + 1, 0, '.');
});
// console.log(rolls)

for (let i = 1; i < rolls.length - 1; i++) {
  // console.log(rolls[i], "row ", i)
  const row = rolls[i];
  if (!row) continue;
  for (let j = 1; j < row.length - 1; j++) {
    //                          |i-1, j-1|i-1|i-1, j+1|
    // Check adjecent positions |   j-1  |i,j|   j+1  |
    //                          |i+1, j-1|i+1|i+1, j+1|

    if (row[j] == '@') {
      let rollsAdjecent: number = 0;
      // console.log(rolls[i-1])
      let top = rolls[i - 1]?.slice(j - 1, j + 2);
      let middle = rolls[i]?.slice(j - 1, j + 2);
      let buttom = rolls[i + 1]?.slice(j - 1, j + 2);

      // console.log(top, middle, buttom)
      //count each @
      top?.forEach((item) => {
        if (item == '@') rollsAdjecent++;
      });
      middle?.forEach((item) => {
        if (item == '@') rollsAdjecent++;
      });
      rollsAdjecent--; //For own roll
      buttom?.forEach((item) => {
        if (item == '@') rollsAdjecent++;
      });
      if (rollsAdjecent < 4) rollsMovable++;
    }
  }
}

console.log("\n Final rolls movable: ", rollsMovable);