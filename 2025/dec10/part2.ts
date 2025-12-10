import * as fs from 'fs';
import { inspect } from 'util';

inspect.defaultOptions.compact = true;

// Read file and return lines
function readLines(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
}

// const lines = readLines('2025/dec9/inputTest.txt'); // Example input for testing
const lines = readLines('2025/input/dec9.txt'); // Uncomment for real input

