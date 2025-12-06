import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

// //Taken from ravic_mco on reddit, thanks
// type Item = "." | "@";
// type C = Array<Item>;
// type Rolls = Array<C>;

let ranges: number[][] = [];
let ids: number[] = [];


// Read file and return lines
function readLines(filePath: string): [number[][], number[]] {

  const lines = fs.readFileSync(filePath, "utf-8").trim().split("\r\n").filter(Boolean);
  lines.forEach((line) => {
    if (line.includes("-")) {
      ranges.push(line.split("-").map((c) => parseInt(c)))
    } else {
      ids.push(parseInt(line))
    }
  });

  return [ranges, ids]
}

//Use \r\n for linebreaks
// [ranges, ids] = readLines("2025/dec5/inputTest.txt")
[ranges, ids] = readLines("2025/input/dec5.txt")


//Sort ranges and ids
ranges.sort((a, b) => { return a[0]! - b[0]! })

//merge overlapping ranges
const mergedRanges: number[][] = [];

ranges.forEach((range) => {
  //Compare start to the next on 
  if (mergedRanges.length === 0) {
    mergedRanges.push(range);
  } else {
    const lastRange = mergedRanges[mergedRanges.length - 1]!;
    if (range[0]! <= lastRange[1]! + 1) {
      //Overlapping ranges, merge them
      lastRange[1] = Math.max(lastRange[1]!, range[1]!);
    } else {
      //No overlap, add the new range
      mergedRanges.push(range);  
    }
  }
})

// console.log(mergedRanges)


// console.log("Length:", ranges.length)
// console.log("IDs:", ids.length)

let freshIds = 0;

function checkRanges( ranges: number[][]) {
  ranges.forEach((range) => {
    freshIds += 1 + range[1]! - range[0]!

  })

}

checkRanges(mergedRanges)

console.log("Fresh IDs:", freshIds)
