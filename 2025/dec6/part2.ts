import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, "utf-8").split("\r\n")
}

// const lines = readLines("2025/dec6/inputTest.txt")
const lines = readLines("2025/input/dec6.txt")

console.log(lines.length)

//Seperate the numbers from the symbol of operation.
const operation = lines.pop()?.split("").filter((x) => x !== " ") ?? [];

let nums: string[][] = [];
lines.forEach((line) => {
  nums.push(line.split(""))
})


console.log(operation)
console.log(nums)
let problems: string[][] = [];

let problem = [];
for (let col = 0; col < (nums[0]?.length ?? 0); col++) {
  //flip the rows to coloumns
  let row = nums.map((r) => r[col]).join("")

  console.log("ROW:", row)
  if (row == "".padStart(nums.length, " ")) {
    problems.push(problem)
    problem = [];
    continue;
  }
  problem.push(row);
}
problems.push(problem.flat().filter((x): x is string => x !== undefined))



console.log(problems)
let result = 0;

operation.forEach((op, i) => {
  console.log(`Problem ${i + 1} with operation ${op}:`)
  let problemInputs = problems[i];
  console.log(problemInputs);

  let output: number = 0;
  if (op.includes('+')) {
    problemInputs?.forEach((inp) => {
      output += parseInt(inp);
    })

  } else if (op.includes('*')) {
    output = 1;
    problemInputs?.forEach((inp) => {
      let n: number = parseInt(inp);
      output *= n
    })
  }
  console.log(output);
  result += output
})

console.log(result)