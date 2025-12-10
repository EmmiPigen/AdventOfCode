import * as fs from 'fs';
import { inspect } from 'util';
inspect.defaultOptions.compact = true;

type ButtonIndices = number[][];



// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

// const lines = readLines('2025/dec10/inputTest.txt'); // Example input for testing
const lines = readLines('2025/input/dec10.txt'); // Uncomment for real input

// console.log(lines)

const indicatorLights: string[][] = [];
const buttons: ButtonIndices[] = [];

function bitsToMask(bits: number[]) {
  let mask = 0;
  bits.reverse()
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === 1) {
      mask |= (1 << i)
    }
  }
  return mask
}


function MasktoBits(mask: number, L: number) {
  const bits: number[] = []
  for (let i = 0; i < L; i++) {
    bits.push((mask & (1 << i)) ? 1 : 0)
  }
  bits.reverse()
  return bits;
}

lines.forEach((line) => {
  let split = line.indexOf("]")
  let buttonsSplit = line.lastIndexOf(")") + 1
  indicatorLights.push(line.slice(1, split).split(""))

  const splitButtonStrings = line.slice(split + 2, buttonsSplit).split(" ")

  const buttonsIndices = splitButtonStrings.map(bntstr => {
    const indiceStr = bntstr.replace(/[()]/g, "");

    if (indiceStr === "") return [];

    return indiceStr.split(",").map((numStr) => parseInt(numStr.trim(), 10));
  })
  buttons.push(buttonsIndices)

})

// console.log(indicatorLights)
// console.log(buttons)

const indicatorLightBits: number[][] = []
indicatorLights.forEach(ligthRow => {
  let row = ligthRow.map(light => light === "#" ? 1 : 0)
  indicatorLightBits.push(row)
})

// console.log(indicatorLightBits)

function convertButtonsBit(buttons: ButtonIndices[], indicatorLight: number[][]): ButtonIndices[] {
  const convertedButtons: ButtonIndices[] = []
  for (let b = 0; b < buttons.length; b++) {
    let L = indicatorLight[b]!.length
    const buttonBits: ButtonIndices = []
    for (const button of buttons[b]!) {
      let bitmaskRow: number[] = new Array(L).fill(0)
      for (const b of button) {
        bitmaskRow[b] = 1
      }
      buttonBits.push(bitmaskRow)
    }
    convertedButtons.push(buttonBits)
  }
  // console.log(convertedButtons)


  return convertedButtons
}

const bitsButtons = convertButtonsBit(buttons, indicatorLightBits)

function breadthFirstSearch(indicatorLights: number[], buttons: ButtonIndices) {
  let startState = 0;
  let goalState = bitsToMask(indicatorLights);
  // console.log(`Goal State: ${goalState} for indicator lights ${indicatorLights}`)


  const buttonMasks: number[] = buttons.map(button => bitsToMask(button));
  const distance: Map<number, number> = new Map();


  // Create queue for BFS
  const queue: number[] = [];

  queue.push(startState)
  distance.set(startState, 0)

  let head = 0;
  while (head < queue.length) {
    const currentState = queue[head++] // Dequeue
    const currentDist = distance.get(currentState!);
    if (currentState === goalState) {
      // console.log(`Reached goal state in ${currentDist} button presses.`)
      return currentDist
    }
    for (const buttonMask of buttonMasks) {
      const nextState = currentState! ^ buttonMask
      if (!distance.has(nextState)) {
        distance.set(nextState, currentDist! + 1)
        queue.push(nextState)
        // console.log(`Visiting state: ${nextState} (Distance: ${currentDist! + 1})`)
      }
    }
  }

  return null; // Goal state not reachable
}


let result = 0;
for (let i = 0; i < indicatorLights.length; i++) {
  result += breadthFirstSearch(indicatorLightBits[i]!, bitsButtons[i]!)!
}
console.log(`Total button presses to light all indicators: ${result}`);