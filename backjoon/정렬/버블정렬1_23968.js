/*
백준 23968번 버블 정렬 1
https://www.acmicpc.net/problem/23968

*/
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

const solution = (N, K, A) => {
  let changeCount = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1 - i; j++) {
      if (A[j] > A[j + 1]) {
        [A[j], A[j + 1]] = [A[j + 1], A[j]];
        if (++changeCount === K) {
          console.log(`${A[j]} ${A[j + 1]}`);
          return;
        }
      }
    }
  }
  console.log(-1);
};

solution(N, K, A);
