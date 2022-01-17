const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [matrixSize, ...regionsMatrix] = input;
matrixSize = parseInt(matrixSize, 10);
regionsMatrix = regionsMatrix.map((row) =>
  row.split(" ").map((element) => parseInt(element, 10))
);

const getAreasCount = (floodLevel, regionsMatrix, matrixSize) => {
  let count = 0;
  const visited = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => false)
  );
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (!visited[j][i] && regionsMatrix[j][i] > floodLevel) {
        _dfs([i, j]);
        count++;
      }
    }
  }
  return count;

  function _dfs(initialLocation) {
    const dfsStack = [initialLocation];
    while (dfsStack.length > 0) {
      const [x, y] = dfsStack.pop();
      if (regionsMatrix[y][x] > floodLevel) {
        visited[y][x] = true;
        getPossibleRoutes(
          floodLevel,
          [x, y],
          visited,
          regionsMatrix,
          matrixSize
        ).forEach(([newX, newY]) => dfsStack.push([newX, newY]));
      }
    }
  }
};

const getPossibleRoutes = (
  floodLevel,
  [positionX, positionY],
  visited,
  regionsMatrix,
  matrixSize
) => {
  const direction = [
    [positionX + 1, positionY],
    [positionX - 1, positionY],
    [positionX, positionY + 1],
    [positionX, positionY - 1],
  ];
  return direction.filter(
    ([x, y]) =>
      0 <= x &&
      x < matrixSize &&
      0 <= y &&
      y < matrixSize &&
      regionsMatrix[y][x] > floodLevel &&
      !visited[y][x]
  );
};

const solution = (matrixSize, regionsMatrix) => {
  const floodLevels = [...new Set(regionsMatrix.flat())];
  let maxCount = 1;
  floodLevels.forEach((floodLevel) => {
    maxCount = Math.max(
      maxCount,
      getAreasCount(floodLevel, regionsMatrix, matrixSize)
    );
  });

  // answer
  console.log(maxCount);
};
solution(matrixSize, regionsMatrix);
