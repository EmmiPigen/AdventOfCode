import Denque from 'denque';
import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

// const lines = readLines('2025/dec11/inputTest.txt'); // Example input for testing
const lines = readLines('2025/input/dec11.txt'); // Uncomment for real input

console.log(lines)

const devicesList: string[] = [];
const connsList: string[][] = [];


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

for (const device of devicesList) {
  g.addVertex(device)
}

lines.forEach(line => {
  let splitIndex = line.indexOf(":")
  let d = line.slice(0, splitIndex);
  g.addVertex(d);
  let conns: string[] = line.slice(splitIndex + 1).trimStart().split(" ")
  g.addEdge(d, conns)
})

// g.printGraph()


const memo = new Map<string, number>();

function dfsUtil(node: string, goal: string) {
  // console.log("Visiting node: ", node);
  const key = node;

  // 1. Check if we already know how many paths stem from here
  if (memo.has(key)) return memo.get(key)!

  // 2. Check if we've reached the goal
  if (node == goal) {
    return 1;
  }

  // 3. Explore neighbors
  let neighbors = g.adjList.get(node)
  // console.log(neighbors);
  let paths = 0;

  for(const n of neighbors!) {
    paths += dfsUtil(n, goal)
  }

  memo.set(key, paths)
  return paths;
}


function depthFirstSearch(g: directedGraph) {
  let uniquePaths = 0;
  let goal = 'out';

  const queue = new Denque();

  //Nodes can be visited multiple times, but only once per path. So just adding each node is not enough, It needs to be tracked per path
  const visited = new Set<string>();

  let start = 'you';
  queue.push(start);

  uniquePaths = dfsUtil(start, goal)

  return uniquePaths
}


let countPaths = depthFirstSearch(g)
console.log(countPaths)
