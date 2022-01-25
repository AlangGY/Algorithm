const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const timeLength = parseInt(input[0], 10);
const timeArray = input[1].split(" ").map(Number);

const solution = (timeArray, timeLength) => {
  timeArray.sort((a, b) => a - b);
  const totalTime = timeArray.reduce(
    (acc, time, index, timeArray) => acc + time * (timeLength - index),
    0
  );
  console.log(totalTime);
};

solution(timeArray, timeLength);
