const [HandL, ...map] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [H, L] = HandL.split(" ").map(Number);

const solution = (H, L, map) => {
  let maxLength = -Infinity;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < L; x++) {
      if (map[y][x] === "L") {
        maxLength = Math.max(maxLength, _bfs([x, y]));
      }
    }
  }

  console.log(maxLength);

  function _bfs(start) {
    let pointer = 0;
    const queue = [{ position: start, length: 0 }];
    const visited = Array.from({ length: H }, () => new Array(L).fill(0));
    visited[start[1]][start[0]] = 1;
    let maxLength = -Infinity;
    const dx = [0, 0, 1, -1];
    const dy = [-1, 1, 0, 0];
    while (pointer < queue.length) {
      const { position, length } = queue[pointer++];
      maxLength = Math.max(maxLength, length);
      const [x, y] = position;
      for (let i = 0; i < 4; i++) {
        const newX = x + dx[i];
        const newY = y + dy[i];
        if (newX < 0 || L <= newX || newY < 0 || H <= newY) continue;
        if (visited[newY][newX] || map[newY][newX] !== "L") continue;
        visited[newY][newX] = 1;
        queue.push({ position: [newX, newY], length: length + 1 });
      }
    }
    return maxLength;
  }
};

solution(H, L, map);
