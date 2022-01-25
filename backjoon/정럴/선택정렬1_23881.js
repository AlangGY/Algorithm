const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

const solution = (N, K, A) => {
  let changeCount = 0;
  for (let i = N - 1; i > 0; i--) {
    let maxIndex = i;
    for (let j = 0; j < i + 1; j++) {
      if (A[maxIndex] < A[j]) maxIndex = j;
    }
    if (i !== maxIndex) {
      [A[i], A[maxIndex]] = [A[maxIndex], A[i]];
      if (++changeCount === K) {
        console.log(A[maxIndex] + " " + A[i]);
        return;
      }
    }
  }
  console.log(-1);
};

solution(N, K, A);
