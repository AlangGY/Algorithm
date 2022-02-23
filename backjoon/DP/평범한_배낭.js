const [NAndK, ...packagesStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = NAndK.split(" ").map(Number);
const packages = packagesStr.map((packageStr) =>
  packageStr.split(" ").map(Number)
);

/*
12
5 8
3 9
4 7
6 5
4 5
*/

const solution = (N, K, packages) => {
  let dpMatrix = Array.from({ length: N }, () =>
    Array.from({ length: K + 1 }, () => 0)
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < K + 1; j++) {
      if (i === 0 && j < packages[i][0]) {
        dpMatrix[i][j] = 0;
        continue;
      }
      if (j >= packages[i][0]) {
        dpMatrix[i][j] =
          i !== 0
            ? Math.max(
                dpMatrix[i - 1][j - packages[i][0]] + packages[i][1],
                dpMatrix[i - 1][j]
              )
            : packages[i][1];
        continue;
      }
      dpMatrix[i][j] = dpMatrix[i - 1][j];
    }
  }
  console.log(dpMatrix[N - 1][K]);
};

solution(N, K, packages);
