/*
백준 1600 말이 되고픈 원숭이
https://www.acmicpc.net/problem/1600
*/

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const K = input.shift()[0];
const [W, H] = input.shift();
const table = input;

const solution = (K, W, H, table) => {
  const jumpDx = [2, 2, 1, 1, -1, -1, -2, -2];
  const jumpDy = [1, -1, 2, -2, 2, -2, 1, -1];
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];

  const queue = [{ x: 0, y: 0, count: 0, jumpCount: 0 }];
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => 0)
  );
  visited[0][0] = 1;

  if (table[H - 1][W - 1] === 1) {
    console.log(-1);
    return;
  }
  if (H === 1 && W === 1) {
    console.log(0);
    return;
  }

  while (queue.length) {
    let { x, y, count, jumpCount } = queue.shift();
    if (x === W - 1 && y === H - 1) {
      console.log(count);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const [newX, newY] = [x + dx[i], y + dy[i]];

      if (newX < 0 || newX >= W || newY < 0 || newY >= H) continue;
      if (table[newY][newX]) continue;
      if (visited[newY][newX] & (1 << jumpCount)) continue;
      if (visited[newY][newX] && 1 << jumpCount > visited[newY][newX]) continue;

      visited[newY][newX] = visited[newY][newX] | (1 << jumpCount);
      queue.push({ x: newX, y: newY, count: count + 1, jumpCount });
    }

    if (jumpCount < K) {
      for (let i = 0; i < 8; i++) {
        const [newX, newY] = [x + jumpDx[i], y + jumpDy[i]];
        if (newX < 0 || newX >= W || newY < 0 || newY >= H) continue;
        if (table[newY][newX]) continue;
        if (visited[newY][newX] & (1 << (jumpCount + 1))) continue;
        if (visited[newY][newX] && 1 << (jumpCount + 1) > visited[newY][newX])
          continue;

        visited[newY][newX] = visited[newY][newX] | (1 << (jumpCount + 1));
        queue.push({
          x: newX,
          y: newY,
          count: count + 1,
          jumpCount: jumpCount + 1,
        });
      }
    }
  }

  console.log(-1);
};

solution(K, W, H, table);
