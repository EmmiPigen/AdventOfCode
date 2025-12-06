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


// each line is the input a problem, each problem is seperated by a full coloumn of spaces (as in when all lines at the same index are " ").

// First we need to find the indices of the full coloumns of spaces.
let separatorIndices: number[] = [];
for (let col = 0; col < (nums[0]?.length ?? 0); col++) {
  //Take the i index of each line and see if they are all " "
  let allSpaces = true;
  for (let row = 0; row < nums.length; row++) {
    if (nums[row]![col] !== " ") {
      allSpaces = false;
      break;
    }
  }
  if (allSpaces) separatorIndices.push(col)
}
separatorIndices.push(nums[0]!.length)
console.log(separatorIndices)

let problems: string[][] = [];
//Split each problem based 
// on the separator indices.
for (let sep = 0; sep < separatorIndices.length; sep++) {
  let problem = [];
  for (let num = 0; num < nums.length; num++) {
    let input = nums[num]?.slice(separatorIndices[sep - 1], separatorIndices[sep]).join("").trim()
    // console.log(input);
    problem.push(input)
  }
  //Add last problem
  problems.push(problem.flat().filter((x): x is string => x !== undefined))
}

console.log(problems)

let result = 0;

operation.forEach((op, i) => {
  console.log(`Problem ${i + 1} with operation ${op}:`)
  let problemInputs = problems[i];
  console.log(problemInputs);

  let output:number = 0;
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









