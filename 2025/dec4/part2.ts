import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

//Taken from ravic_mco on reddit, thanks
type Item = "." | "@";
type C = Array<Item>;
type Rolls = Array<C>;


// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}


function adjecentSpaces(arr: Rolls, xPos: number, yPos: number) {
  let adjecent = [
    arr[xPos - 1]?.[yPos - 1],
    arr[xPos - 1]?.[yPos],
    arr[xPos - 1]?.[yPos + 1],
    arr[xPos]?.[yPos - 1],
    arr[xPos]?.[yPos + 1],
    arr[xPos + 1]?.[yPos - 1],
    arr[xPos + 1]?.[yPos],
    arr[xPos + 1]?.[yPos + 1],
  ]
  return adjecent.filter((x): x is Item => x !== undefined); //Filter out undefined values
}

function checkMovable(adjecent: Array<Item>) {
  let counter = 0;
  adjecent.forEach((pos) => {
    if (pos == '@') counter++
  })

  return counter < 4;
}


// Convert file content to 2D array of Rolls 
const rolls = readLines("2025/input/dec4.txt").trim().split("\r\n").map((line) => line.split("")) as Rolls //Use \r\n for linebreaks

// console.log(rolls)

function removeMovable(arr: Rolls) : [Rolls, number] {
  let removed = 0;
  const g = structuredClone(arr);

  for (const [i, row] of arr.entries()) { //Iterate through rows
    for (const [j, col] of row.entries()) { //Iterate through columns

      if (col == '@') { //If current position is occupied
        let temp = adjecentSpaces(arr, i, j); //Get adjacent spaces
        // console.log(temp) 
        if (checkMovable(temp)) { //Check if movable
          if (g[i]?.[j]){
            g[i][j]= '.' 
          }  
          removed++ //Increment removed counter
        }
      }
    }
  }
  return [g, removed];
}

function recurRemoving(arr: Rolls, prev: number, removed?: number){
  if (!removed){
    return prev
  }

  const [roll, result] = removeMovable(arr)
  return recurRemoving(roll, prev + result, result)
}


let r = recurRemoving(rolls, 0, removeMovable(rolls)[1])


// console.log("\n", rolls)
console.log(r)


