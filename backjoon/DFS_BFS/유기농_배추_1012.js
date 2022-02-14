const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const testCasesCount = input.shift();

const solution = (cabbageLocations) => {
  let count = 0;
  notVisited = Object.fromEntries(
    cabbageLocations.map(([x, y]) => [`${x}x${y}`, true])
  );
  for (const cabbageLocation of cabbageLocations) {
    const [x, y] = cabbageLocation;
    if (!notVisited[`${x}x${y}`]) continue;
    count++;
    _dfs(cabbageLocation);
  }

  console.log(count);

  function _dfs(startPosition) {
    const stack = [startPosition];
    const directions = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    while (stack.length) {
      const [x, y] = stack.pop();
      notVisited[`${x}x${y}`] = false;
      directions.forEach(([dx, dy]) => {
        const newPosition = [x + dx, y + dy];
        notVisited[`${newPosition[0]}x${newPosition[1]}`] &&
          stack.push(newPosition);
      });
    }
  }
};

for (let i = 0; i < testCasesCount; i++) {
  const [_, __, cabbageCount] = input.shift().split(" ").map(Number);
  const cabbageLocations = input
    .splice(0, cabbageCount)
    .map((item) => item.split(" ").map(Number));

  solution(cabbageLocations);
}
