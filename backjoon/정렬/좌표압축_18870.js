const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const XSize = parseInt(input[0], 10);
const X = input[1].split(" ").map(Number);

const solution = (X, XSize) => {
  const compressedSortedX = Array.from(new Set([...X])).sort((a, b) => a - b);
  const compressedSortedXIndexMap = Object.fromEntries(
    compressedSortedX.map((num, index) => [num, index])
  );
  const compressedX = X.map((number) => compressedSortedXIndexMap[number]);
  console.log(compressedX.join(" "));
};

solution(X, XSize);
