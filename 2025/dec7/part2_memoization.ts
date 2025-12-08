import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;


//Taken from ravic_mco on reddit, thanks
type Item = "." | "^" | "S" | "|";
type C = Array<Item>;
type Manifolds = Array<C>;


// Read file and return lines
function readLines(filePath: string) {
  let temp = fs.readFileSync(filePath, "utf-8").trim().split("\r\n");
  let temp2: string[][] = []
  temp.forEach((line) => {
    //split each line into indiviual string chars
    temp2.push(line.split(""))
  })
  return temp2;
}

// const lines = readLines("2025/dec7/inputTest.txt") as Manifolds
const lines = readLines("2025/input/dec7.txt") as Manifolds

// console.log(lines)

//Middle of first line is the start point where the tachyon beam starts moving dowm from into the manifolds
let currentPos = new Set<number>();
if (lines.length > 0) {
  const firstLine = lines[0] as C;
  if (firstLine) currentPos.add((firstLine.indexOf("S")) as number)
}

//Copy lines to a new array
let lineCopy = structuredClone(lines) as Manifolds

for (let i = 1; i < lines.length; i++) {
  let row = lines[i]
  // console.log(row)
  if (!row) continue;
  Array.from(currentPos).forEach((xPos) => {
    if (row[xPos] == ".") {
      lineCopy[i]![xPos] = "|"
    }
    if (row[xPos] == "^") {
      //Beam stopped and split
      // console.log("Split at row ", i, " position ", xPos)
      currentPos.add(xPos - 1);
      currentPos.add(xPos + 1);

      lineCopy[i]![xPos - 1] = "|"
      lineCopy[i]![xPos + 1] = "|"

      currentPos.delete(xPos);
    }
  })
}

// console.log(lineCopy)

//Using a depth first search algorithm to traverse the manifolds and find all possible paths
let paths = 0;
function depthFirstSearch(row: number, col: number, curPath: Array<number>) {
// console.log("Visiting row ", row, " col ", col)
  if (typeof lineCopy[row] === 'undefined' || typeof lineCopy[row]![col] === 'undefined') {
    // lines does not exist, do nothing
  } else {
    //Check out of bounds
    if (row >= lineCopy.length || col >= lineCopy[0]!.length) {
      return
    }

    let space = lineCopy[row][col]
    // console.log("Space: ", space)

    let newPath = [...curPath, col]

    if (space == 'S' || space == '|') {
      depthFirstSearch(row + 1, col, newPath)
    } else if (space == '^') {
      depthFirstSearch(row + 1, col - 1, newPath)
      depthFirstSearch(row + 1, col + 1, newPath)
    }
    // console.log(newPath)

    if (row == lineCopy.length - 1) {
      paths++
      console.log("Found new path", paths)
    }
  }
}


depthFirstSearch(0, lines[0]!.indexOf("S"), [])

console.log("All paths: ", paths)