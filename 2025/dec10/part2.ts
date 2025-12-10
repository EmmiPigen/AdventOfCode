import * as fs from 'fs';
import { inspect } from 'util';
import { init } from "z3-solver";
inspect.defaultOptions.compact = true;

type ButtonIndices = number[][];

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

const lines = readLines('2025/dec10/inputTest.txt'); // Example input for testing
// const lines = readLines('2025/input/dec10.txt'); // Uncomment for real input

console.log(lines)

const joltageReq: number[][] = [];
const buttons: ButtonIndices[] = [];


lines.forEach((line) => {
  let braceIndex = line.indexOf("{")
  joltageReq.push(line.slice(braceIndex + 1, line.length - 1).split(",").map(numStr => parseInt(numStr, 10)))


  let buttonStartIndex = line.indexOf("(")
  const splitButtonStrings = line.slice(buttonStartIndex, braceIndex - 1).split(" ")

  const buttonsIndices = splitButtonStrings.map(bntStr => {
    const indiceStr = bntStr.replace(/[()]/g, "");

    if (indiceStr === "") return [];
    return indiceStr.split(",").map((numStr) => parseInt(numStr.trim(), 10));
  })
  buttons.push(buttonsIndices)

})

console.log(joltageReq)
console.log(buttons)



