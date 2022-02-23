/*
백준 1890번 점프
https://www.acmicpc.net/problem/1890
*/

let [size, ...matrix] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

size = parseInt(size, 10);
matrix = matrix.map((row) => row.split(" ").map(Number));

const solution = (matrix, size) => {
  const visited = Array.from({ length: size ** 2 }, () => 0n);
  visited[0] = 1n;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const jumpAmount = matrix[y][x];
      if (
        jumpAmount === 0 ||
        (y === size - 1 && x === size - 1) ||
        !visited[y * size + x]
      )
        continue;

      [
        [x + jumpAmount, y],
        [x, y + jumpAmount],
      ]
        .filter(([newX, newY]) => newX < size && newY < size)
        .forEach(([newX, newY]) => {
          visited[newY * size + newX] += visited[y * size + x];
        });
    }
  }

  console.log(visited[size ** 2 - 1].toString(10));
};

solution(matrix, size);
