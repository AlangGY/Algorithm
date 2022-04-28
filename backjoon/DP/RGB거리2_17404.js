const [[N], ...costs] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const solution = (N, costs) => {
  // 첫번째집 선택 강제
  // R
  let minCost = Infinity;
  for (let i = 0; i < 3; i++) {
    minCost = Math.min(..._makeDp(i), minCost);
  }

  console.log(minCost);

  function _makeDp(firstChoice) {
    const dp = Array.from({ length: N }, () =>
      Array.from({ length: 3 }, () => Infinity)
    );
    for (let i = 0; i < N; i++) {
      const [red, green, blue] = costs[i];
      if (i === 0) {
        dp[i][firstChoice] = costs[i][firstChoice];
      } else {
        dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + red;
        dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + green;
        dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + blue;
      }
      if (i === N - 1) {
        dp[i][firstChoice] = Infinity;
      }
    }

    return dp[dp.length - 1];
  }
};

solution(N, costs);
