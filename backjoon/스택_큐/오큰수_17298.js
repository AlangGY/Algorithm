/*
백준 17298 오큰수
https://www.acmicpc.net/problem/17298
*/

const [NStr, arrayStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const array = arrayStr.split(" ").map(Number);

const solution = (array) => {
  const stack = [];

  for (let i = 0; i < array.length; i++) {
    const number = array[i];

    while (stack.length && array[stack[stack.length - 1]] < number) {
      const popIndex = stack.pop();
      array[popIndex] = number;
    }
    stack.push(i);
  }

  while (stack.length) {
    const index = stack.pop();
    array[index] = -1;
  }

  return array.join(" ");
};

console.log(solution(array));
