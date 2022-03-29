const [N, scales] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const solution = (N, scales) => {
  scales.sort((a, b) => a - b);
  let largestNumber = 0;
  for (let i = 0; i < N; i++) {
    if (scales[i] > largestNumber + 1) break;

    largestNumber += scales[i];
  }

  console.log(largestNumber + 1);
};

solution(N, scales);
