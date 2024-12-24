import { log, warn } from "node:console";
import * as fs from "node:fs";
import readline from "readline";

async function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt", "utf8"),
    crlfDelay: Infinity,
  });
  const leftList = [];
  const rightList = [];

  for await (const line of rl) {
    const numbers = line.split(" ").filter((f) => f);
    leftList.push(numbers[0]);
    rightList.push(numbers[1]);
  }

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);
  let rightListQuantity = {};
  let totalDistance = 0;

  for (let i = 0; i < 1000; i++) {
    const distance =
      leftList[i] > rightList[i]
        ? leftList[i] - rightList[i]
        : rightList[i] - leftList[i];
    totalDistance += distance;
    if (!rightListQuantity[rightList[i]]) rightListQuantity[rightList[i]] = 0;
    rightListQuantity[rightList[i]] += 1;
  }
  console.log("Total Distance: ", totalDistance);

  let similarityScore = 0;
  for (let i = 0; i < 1000; i++) {
    if (!rightListQuantity[leftList[i]]) continue;
    similarityScore += leftList[i] * rightListQuantity[leftList[i]];
  }
  console.log("Similarity score: ", similarityScore);
}

main();
