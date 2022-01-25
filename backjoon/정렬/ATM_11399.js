const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const timeArray = input[1].split(" ").map(Number);

const solution = (timeArray) => {
  timeArray.sort((a, b) => a - b);
  let lastTimeTook = 0;
  const totalTime = timeArray.reduce((acc, time, index, timeArray) => {
    lastTimeTook += time;
    return acc + lastTimeTook;
  }, 0);
  console.log(totalTime);
};

solution(timeArray);
