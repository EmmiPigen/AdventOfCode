import { error } from 'console';
import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

// const lines = readLines('2025/dec8/inputTest.txt'); // Example input for testing
const lines = readLines('2025/input/dec8.txt'); // Uncomment for real input

// console.log(lines)

function calcEucludianDist(p: number[], q: number[]): number {
  let result = 0;

  //Check that p and q are a list of the coordinates in 3d space
  if (p.length == 3 && p.length == q.length) {
    // Checking if both points are in 3D space
    let r = 0;
    for (let i = 0; i < 3; i++) {
      let a = p[i] as number,
        b = q[i] as number; // Type assertion to number
      r += (a - b) ** 2; // Sum of squares of differences
    }
    // result = Math.sqrt(r); // Square root of sum of squares
    result = r; //Since i'm comparing the distances to find the smallest don't actually need to know the square and thus also avoid both the costly square root calculation and floats
  }
  return result as number;
}

const coordinates: number[][] = [];
lines.forEach((line) => {
  // console.log(line)
  coordinates.push(line.split(',').map((c) => parseInt(c)));
});
// console.log(coordinates)

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
      let dist = calcEucludianDist(p, q);
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
  'Map size: %d',
  distMap.size,
);
//Sort distance array
distArray.sort(function (a, b) {
  return a - b;
});

// Using Disjoint set union to store the circuits
// https://cp-algorithms.com/data_structures/disjoint_set_union.html
// https://www.geeksforgeeks.org/dsa/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/
// https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Operations

class disjoint_set_union {
  parent: number[] = [];
  size: number[] = [];
  constructor(n: number) { // n is the number of elements
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(i: number): number { // find the root element for the set that i belongs to
    if (this.parent[i] !== i) {
      this.parent[i] = this.find(this.parent[i]!)
    }
    return this.parent[i];
  }

  unionBySize(x: number, y: number) {
    x = this.find(x);
    y = this.find(y);

    if (x === y) {
      return;
    }

    if (this.size[x]! < this.size[y]!) {
      [x, y] = [y, x]
    }

    this.parent[y] = x // Make x as parent of y
    this.size[x]! += this.size[y]!
  }
}


const dsu = new disjoint_set_union(coordinates.length);

//Kruskal's algorithm to find the minimum spanning tree of the points where all points are connected with each other
//https://en.wikipedia.org/wiki/Kruskal%27s_algorithm#
function KruskalAlgorithm(dist: number[], dsu: disjoint_set_union, map: Map<number, number[]>): number[] {
  let lastPair: number[] = []
  for (let i = 0; i < dist.length; i++) {
    const d = dist[i];
    if (!d) continue;
    const pairList = map.get(d);

    if (!pairList) continue;
    const a = pairList[0] as number, b = pairList[1] as number;

    if (dsu.find(a) !== dsu.find(b)) {
      dsu.unionBySize(a, b);
      lastPair = [a, b];
    }

    const largestCircuit = Math.max(...dsu.size)
    if (largestCircuit === 1000) {
      return lastPair
    }
  }
  return lastPair;
}

const last = KruskalAlgorithm(distArray, dsu, distMap);
const [aIndex, bIndex] = last as [number, number];
const aCoordinate = coordinates[aIndex] ?? [0], bCoordinate = coordinates[bIndex] ?? [0]

if (aCoordinate[0] && bCoordinate[0]) {
  const result = aCoordinate[0] * bCoordinate[0]
  console.log("%d * %d = %d", aCoordinate[0], bCoordinate[0], result)
}