/*
백준 12904 A와B
https://www.acmicpc.net/problem/12904
*/

const [S, T] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (S, T) => {
  let currStr = T;

  while (currStr.length > S.length) {
    const lastChar = currStr[currStr.length - 1];
    switch (lastChar) {
      case "A":
        currStr = currStr.slice(0, -1);
        break;
      case "B":
        currStr = currStr.slice(0, -1).split("").reverse().join("");
        break;
    }
  }

  return currStr === S ? 1 : 0;
};

console.log(solution(S, T));
