/*
백준 17779 게리맨더링2
https://www.acmicpc.net/problem/17779
*/

let [[N], ...A] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const solution = (N, A) => {
  A = A.map((row) => [-1, ...row]);
  A.splice(0, 0, new Array(N + 1).fill(-1));
  // console.log(A);
  let minDifference = Infinity;
  for (let d1 = 1; d1 <= N; d1++) {
    for (let d2 = 1; d2 <= N; d2++) {
      for (let x = 1; x <= N - d1 - d2; x++) {
        for (let y = 1 + d1; y <= N - d2; y++) {
          // if (x + d1 + d2 > N)
          const peopleCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
          for (let r = 1; r <= N; r++) {
            for (let c = 1; c <= N; c++) {
              const number = _getWardNumber(r, c, x, y, d1, d2);
              peopleCount[number] += A[r][c];
            }
          }
          const values = Object.values(peopleCount).sort((a, b) => a - b);
          // console.log(values);
          minDifference = Math.min(
            minDifference,
            values[values.length - 1] - values[0]
          );
        }
      }
    }
  }

  console.log(minDifference);

  function _getWardNumber(r, c, x, y, d1, d2) {
    if (
      x <= r &&
      r <= x + d1 + d2 &&
      y - d1 + Math.abs(r - (x + d1)) <= c &&
      c <= y + d2 - Math.abs(r - (x + d2))
    )
      return 5;
    else if (1 <= r && r < x + d1 && 1 <= c && c <= y) {
      return 1;
    } else if (1 <= r && r <= x + d2 && y < c && c <= N) {
      return 2;
    } else if (x + d1 <= r && r <= N && 1 <= c && c < y - d1 + d2) {
      return 3;
    } else if (x + d2 < r && r <= N && y - d1 + d2 <= c && c <= N) {
      return 4;
    }
    return 5;
  }
};

solution(N, A);
