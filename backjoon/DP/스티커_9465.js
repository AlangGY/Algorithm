/*
백준 9465번 스티커
https://www.acmicpc.net/problem/9465
*/

const [T, ...rest] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (columnSize, stickerMatrix) => {
  const row1 = stickerMatrix[0];
  const row2 = stickerMatrix[1];
  let [firstMaxValue, secondMaxValue] = [0, 0];
  let [firstMaxIndex, secondMaxIndex] = [-1, -1];
  for (let i = 0; i < columnSize; i++) {
    [
      [row1[i], i],
      [row2[i], columnSize + i],
    ]
      .map(([value, index]) =>
        index === 0 || index - 1 !== firstMaxIndex
          ? [firstMaxValue + value, index]
          : [secondMaxValue + value, index]
      )
      .forEach(([maxValue, index]) => {
        if (maxValue > firstMaxValue) {
          secondMaxValue = firstMaxValue;
          secondMaxIndex = firstMaxIndex;
          firstMaxValue = maxValue;
          firstMaxIndex = index;
        } else if (maxValue > secondMaxValue) {
          secondMaxValue = maxValue;
          secondMaxIndex = index;
        }
      });
  }
  console.log(firstMaxValue);
};

for (let i = 0; i < T; i++) {
  const start = i * 3;
  let [n, ...stickerMatrix] = rest.slice(start, start + 3);
  n = Number(n);
  stickerMatrix = stickerMatrix.map((row) => row.split(" ").map(Number));
  solution(n, stickerMatrix);
}
