import { error } from 'console';
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

console.log(coordinates)

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

function checkMap(m: Map<number, number[]>, key: number, entry: number[]) {
  if (!m.has(key)) {
    m.set(key, [])
  }
  m.get(key)?.push(...entry)
}

//Calculate all the possible distances
//Working from 1 combined with all other point above, then from 2 and all other point above but not with 1 as that has already been calculated
function findAllPair(arr: number[][]): [Map<number, number[]>, number[]] {
  let mapPairs = new Map<number, number[]>();
  let arrayDists: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    let p = arr[i] as number[];
    for (let j = i + 1; j < arr.length; j++) {
      let q = arr[j] as number[];
      // console.log("Calculating distance between points", p, q)
      let dist = calcArea(p, q);
      // console.log("Distance is", dist)
      checkMap(mapPairs, dist, [i, j]);
      arrayDists.push(dist);
    }
  }
  if (arrayDists.length != ((arr.length - 1) * arr.length) / 2) {
    throw new Error('Some distances were not calculated correctly');
  }
  return [mapPairs, arrayDists];
}

const [distMap, distArray] = findAllPair(coordinates);
console.log(
  'Map size: %d, so %d pairs have the same length as something already in the map',
  distMap.size,
  distArray.length - distMap.size
);

// console.log(distMap)

//Sort distance array
distArray.sort(function (a, b) {
  return b - a;
});

console.log(distArray[0])