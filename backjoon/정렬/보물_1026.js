const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");
const arrayLength = parseInt(input[0], 10);
const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

const solution = (A, B) => {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);
  console.log(A.reduce((acc, value, index) => acc + value * B[index], 0));
};

solution(A, B);
