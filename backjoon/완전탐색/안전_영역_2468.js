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
        const newLocation = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ];
        const canPass = ([x, y]) =>
          0 <= x &&
          x < matrixSize &&
          0 <= y &&
          y < matrixSize &&
          regionsMatrix[y][x] > floodLevel &&
          !visited[y][x];

        newLocation
          .filter(canPass)
          .forEach(([newX, newY]) => dfsStack.push([newX, newY]));
      }
    }
  }
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
