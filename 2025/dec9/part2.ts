import * as fs from 'fs';
import { inspect } from 'util';

inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

// const lines = readLines('2025/dec9/inputTest.txt'); // Example input for testing
const lines = readLines('2025/input/dec9.txt'); // Uncomment for real input

// console.log(lines)

const coordinates: number[][] = [];
lines.forEach((line) => {
  coordinates.push(line.split(',').map((c) => parseInt(c)))
})

// console.log(coordinates)

function calcArea(p: number[], q: number[]): number {
  let result = 0;

  //Check that p and q are a list of the coordinates in 2d space
  if (p.length == 2 && p.length == q.length) {
    // Checking if both points are in 2D space
    let L = Math.abs(p[0]! - q[0]!) + 1; // Adding 1 to include both endpoints so the length of a line from 0 to 0 is 1 not 0
    let W = Math.abs(p[1]! - q[1]!) + 1; // Adding 1 to include both endpoints

    result = L * W; // Area is length times width
  }
  return result as number;
}

// // console.log(normCoords)
function getPointsinInterval(x1: number, x2: number) {
  let coords: number[] = [];

  let startX = Math.min(x1, x2);
  let endX = Math.max(x1, x2);
  for (let x = startX; x <= endX; x++) {
    coords.push(x);
  }
  // console.log(greenTile)
  return coords
}

function defineBoundary(coordArray: number[][]) {
  let boundaryPointList = new Set<string>() // List of all coordinates for the boundary points
  for (let i = 0; i < coordArray.length; i++) {
    let p = coordArray[i] as number[];
    let q = coordArray[i + 1] as number[];
    if (i == coordArray.length - 1) {
      q = coordArray[0] as number[];
    }

    // console.log(p, q)
    //generate the line between the two points
    if (p[0] == q[0]) { // x coords are aligned, vertical line
      let x1 = p[1] as number, x2 = q[1] as number;
      let coordList = getPointsinInterval(x1, x2)

      coordList.forEach((c) => {
        boundaryPointList.add([p[0]!, c].toString())
      })
    } else if (p[1] == q[1]) { // y coords are aligned, horizontal line
      let x1 = p[0] as number, x2 = q[0] as number;
      let coordList = getPointsinInterval(x1, x2)

      coordList.forEach((c) => {
        boundaryPointList.add([c, p[1]!].toString())
      })

    } else {
      console.error("Points are not aligned either vertically or horizontally:", p, q)
    }
  }
  return boundaryPointList;
}

const boundaryPoints = defineBoundary(coordinates);

// Length of the boundary is the number of unique boundary points
let boundaryLength = boundaryPoints.size;
console.log("Boundary length is ", boundaryLength);

const ys = coordinates.map(([_, y]) => y!)
let minY = Math.min(...ys)
let maxY = Math.max(...ys)

//Map interval for each y coord 
const verticalSegments: [number, number, number][] = [];
const N = coordinates.length;

for (let i = 0; i < N; i++) {
  const p = coordinates[i] as number[]
  const q = coordinates[(i + 1) % N] as number[]

  if (p[0] === q[0]) {
    const x = p[0] as number
    const y_min = Math.min(p[1]!, q[1]!); //
    const y_max = Math.max(p[1]!, q[1]!);

    verticalSegments.push([x, y_min, y_max])
  }
}

console.log(verticalSegments)

const yIntervalMap = new Map<number, number[][]>()

for (let y = minY; y <= maxY; y++) {
  const scanY = y
  let transxCoords: number[] = [];

  for (const [x, y_min, y_max] of verticalSegments) { // Check each vertical segment
    if (scanY >= y_min && scanY <= y_max) { // Intersection occurs
      transxCoords.push(x) // Add the x coordinate of the intersection
    }
  }
  transxCoords.sort((a, b) => a - b);

  const uniqueTrans = [...new Set(transxCoords)];
  let insideIntervals: number[][] = [];


  // for (let k = 0; k < uniqueTrans.length - 1; k += 2) { // Pair up the x coordinates
    const startX = uniqueTrans[0] as number;
    const endX = uniqueTrans[uniqueTrans.length - 1] as number;

    insideIntervals.push([startX, endX]);
  // }

  if (insideIntervals.length > 0) { // Only store if there are intervals
    yIntervalMap.set(y, insideIntervals);
  }
}


console.log(yIntervalMap)

function isValid(xStart: number, xEnd: number, yStart: number, yEnd: number) {
  for (let y = yStart; y <= yEnd; y++) {
    let establishedRow = yIntervalMap.get(y);
    if (!establishedRow || establishedRow.length === 0) {
      return false
    }
    
    establishedRow.sort(([a], [b]) => a! - b!);
    
    let coveredUntil = xStart;
    for (const [intStart, intEnd] of establishedRow) {
      // console.log("At row ", y, " checking interval ", [intStart, intEnd], " against coveredUntil ", coveredUntil)
      if (intStart! <= coveredUntil) {
        coveredUntil = Math.max(coveredUntil, intEnd!);
      }
    }
    if (coveredUntil < xEnd) {
      // console.log("Failed at row ", y, "for pointPair ", [xStart, xEnd], [yStart, yEnd])
      return false
    }
  }
  return true;
}

//Check all pairs
function CheckAllPair(arr: number[][]): [number, string] {
  let area = 0;
  let pair: string = "";
  for (let i = 0; i < arr.length; i++) {
    let p = arr[i] as number[];
    for (let j = i + 1; j < arr.length; j++) {
      let q = arr[j] as number[];

      // console.log("Checking points ", p, q)
      const xStart = Math.min(p[0]!, q[0]!);
      const xEnd = Math.max(p[0]!, q[0]!);
      const yStart = Math.min(p[1]!, q[1]!);
      const yEnd = Math.max(p[1]!, q[1]!);

      if (isValid(xStart, xEnd, yStart, yEnd)) {
        let tempArea = calcArea(p, q)
        if (tempArea > area) {
          area = tempArea;
          pair = p.join() + " and " + q.join();
          console.log("New max area found: ", tempArea, " from points ", pair)
        }
      }
    }
  }
  return [area, pair];
}

const [resultArea, resultPair] = CheckAllPair(coordinates)

console.log("Found area ", resultArea, " from points ", resultPair)