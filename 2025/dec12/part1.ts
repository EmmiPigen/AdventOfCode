import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
}

// const lines = readLines('2025/dec12/inputTest.txt'); // Example input for testing
const lines = readLines('2025/input/dec12.txt'); // Uncomment for real input

// console.log(lines)

interface PresentShapes {
  size: number;
  shape: number[][];
}


interface RegionTestCase {
  width: number;
  height: number;
  // Array indicating each ammount of presents required for each tree
  requiredPresents: number[];
}


const presents: PresentShapes[] = []
let present: number[][] = []

let trees: RegionTestCase[] = [];

lines.forEach((line) => {
  // console.log(line)
  if (!line.includes("x")) {
    if (line.includes("#") || line.includes(".")) {
      present.push(line.split("").map(char => char === "#" ? 1 : 0))
    } else if (line.length === 0) {
      //Number of 1's in the presentShape
      let s = 0;
      present.forEach(row => {
        row.forEach(index => {
          if (index === 1) s++;
        })
      })
      presents.push({
        size: s,
        shape: present
      })
      present = []
    }
  } else {
    let problemLine = line.trim().split(": ")
    // console.log(problemLine)
    let dim: number[] = problemLine[0]?.split("x").map(n => parseInt(n, 10)) ?? []
    // console.log(dim)
    let rPresent = problemLine[1]!.split(" ").map(reqStr => parseInt(reqStr, 10)) ?? []
    trees.push({
      width: dim[0]!,
      height: dim[1]!,
      requiredPresents: rPresent
    })
  }
})

// console.log(presents)
// console.log(trees)

function createGrid(width: number, height: number) {
  let grid = [];
  for (let i = 0; i < height; i++) {
    let row = new Array(width).fill(".");
    grid.push(row)
  }
  return grid;
}

function calcSpaceRequired(reqPresents: number[]) {
  let total = 0;
  for (let i = 0; i < reqPresents.length; i++) {
    let presentSize = presents[i]?.size;
    let space = presentSize! * reqPresents[i]!
    total+= space
  }

  return total;
}

let result = 0;
for (let i = 0; i < trees.length; i++) {
  const tree = trees[i]!;
  // console.log(tree)
  let treeGrid = createGrid(tree.width, tree.height);
  let totalArea = tree.width * tree.height;

  let presentSpace = calcSpaceRequired(tree.requiredPresents)

  if (presentSpace < totalArea) {
    let diff = totalArea - presentSpace;
    console.log(`Tree Case ${i + 1}: ${diff} units of space can be left empty.`)
    result++
  }
  // console.log(treeGrid)
}

console.log(`Total Trees that can have empty space: ${result}`)