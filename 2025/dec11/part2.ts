import Denque from 'denque';
import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

// const lines = readLines('2025/dec11/inputTestP2.txt'); // Example input for testing
const lines = readLines('2025/input/dec11.txt'); // Uncomment for real input

// console.log(lines)


class directedGraph {
  nVertices: number;
  adjList: Map<string, string[]>;

  constructor(nVertices: number) {
    this.nVertices = nVertices;
    this.adjList = new Map<string, string[]>();
  }


  addVertex(v: string) {
    this.adjList.set(v, [])
  }

  addEdge(src: string, dest: string[]) {
    if (!this.adjList.has(src)) {
      return;
    }
    for (let d of dest) {
      this.adjList.get(src)?.push(d);
    }
  }

  printGraph() {
    let get_key = this.adjList.keys();

    for (let i of get_key) {
      let value = this.adjList.get(i);
      let conc = ""

      for (let j of value!) {
        conc += j + " ";
      }

      console.log(i + " -> " + conc);
    }
  }
}


let g = new directedGraph(lines.length);

lines.forEach(line => {
  let splitIndex = line.indexOf(":")
  let d = line.slice(0, splitIndex);
  g.addVertex(d);
  let conns: string[] = line.slice(splitIndex + 1).trimStart().split(" ")
  g.addEdge(d, conns)
})

// g.printGraph()


// const memo = new Map();
function dfsUtil(node: string, goal: string, memo: Map<string, number>): number {
  // console.log("Visiting node: ", node);
  const key = node;

  // 1. Check if we already know how many paths stem from here
  if (memo.has(key)) return memo.get(key)!;

  // 2. If we reached the goal, or reached the out
  if (node === goal){
    return 1;
  }
  if (node === 'out'){
    return 0;
  }

  let neighbors = g.adjList.get(node);
  let localPaths = 0;

  for (const n of neighbors!) {
    localPaths += dfsUtil(n, goal, memo);
  }

  memo.set(key, localPaths)
  return localPaths
}


const badPaths: string[][] = []

function depthFirstSearch(g: directedGraph) {
  // Initialize the count of unique paths
  let uniquePaths = 1;
  // Set the starting node and goal node
  let sequenceList = ['svr', 'fft', 'dac', 'out'];
  
  // Calculate the number of unique paths from start to goal
  for (let i = 0; i < sequenceList.length - 1; i++) {
    const memo = new Map<string, number>();
    let start = sequenceList[i];
    let goal = sequenceList[i + 1];
    
    let segmentPaths = dfsUtil(start!, goal!, memo);
    console.log(`Paths from ${start} to ${goal}: `, segmentPaths);
    uniquePaths *= segmentPaths
  }

  // Return the total count of unique paths
  return uniquePaths;
}


let countPaths = depthFirstSearch(g)
console.log(countPaths)
