const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [x, y, z] = input.shift().split(" ").map(Number);

const solution = (boxes) => {
  const dx = [0, 0, 1, -1, 0, 0];
  const dy = [1, -1, 0, 0, 0, 0];
  const dz = [0, 0, 0, 0, 1, -1];
  const ripeTomatoes = _getRipeTomatoes(boxes);

  const queue = ripeTomatoes
    .map((ripeTomatoPosition) => [...ripeTomatoPosition, 0])
    .flat();
  let pointer = 0;
  let totalTime = 0;

  while (pointer < queue.length) {
    const currX = queue[pointer++];
    const currY = queue[pointer++];
    const currZ = queue[pointer++];
    const time = queue[pointer++];
    totalTime = time;
    for (let i = 0; i < 6; i++) {
      const newX = currX + dx[i];
      const newY = currY + dy[i];
      const newZ = currZ + dz[i];
      if (
        0 > newX ||
        0 > newY ||
        0 > newZ ||
        newX >= x ||
        newY >= y ||
        newZ >= z
      )
        continue;
      if (boxes[newZ][newY][newX]) continue;
      queue.push(newX);
      queue.push(newY);
      queue.push(newZ);
      queue.push(time + 1);
      boxes[newZ][newY][newX] = 1;
    }
  }
  console.log(_isAllRipe(boxes) ? totalTime : -1);

  function _getRipeTomatoes(boxes) {
    const array = [];
    for (let i = 0; i < z; i++) {
      for (let j = 0; j < y; j++) {
        for (let k = 0; k < x; k++) {
          boxes[i][j][k] === 1 && array.push([k, j, i]);
        }
      }
    }
    return array;
  }

  function _isAllRipe(boxes) {
    for (let i = 0; i < z; i++) {
      for (let j = 0; j < y; j++) {
        for (let k = 0; k < x; k++) {
          if (boxes[i][j][k] === 0) return false;
        }
      }
    }
    return true;
  }
};

const boxes = [];
for (let i = 0; i < z; i++) {
  boxes.push(input.splice(0, y).map((row) => row.split(" ").map(Number)));
}
solution(boxes);
