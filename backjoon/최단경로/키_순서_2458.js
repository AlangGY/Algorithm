/*
백준 / 2458 / 키 순서
https://www.acmicpc.net/problem/2458
*/
const [[N, M], ...compare] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const solution = (N, M, compare) => {
  const d = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

  for (const [shorterIndex, tallerIndex] of compare) {
    d[shorterIndex][tallerIndex] = 1;
    d[tallerIndex][shorterIndex] = -1;
  }

  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      for (let k = 1; k < N + 1; k++) {
        if (j === k) {
          d[j][k] === 0;
          continue;
        }
        if (d[j][i] > 0 && d[i][k] > 0) {
          d[j][k] = 1;
          d[k][j] = -1;
        }
      }
    }
  }
  let count = 0;
  d.forEach((nodeArray) => {
    if (nodeArray.filter((num) => num !== 0).length === N - 1) {
      count++;
    }
  });
  console.log(count);
};

solution(N, M, compare);
