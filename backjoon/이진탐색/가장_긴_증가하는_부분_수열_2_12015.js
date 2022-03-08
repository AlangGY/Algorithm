const [NStr, AStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(NStr);
const array = AStr.split(" ").map(Number);

const solution = (array, N) => {
  const dp = [array[0]];
  for (let i = 1; i < N; i++) {
    array[i] > dp[dp.length - 1]
      ? dp.push(array[i])
      : (dp[_getLowerBound(dp, array[i])] = array[i]);
  }

  console.log(dp.length);

  function _getLowerBound(array, target) {
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      array[mid] < target ? (left = mid + 1) : (right = mid);
    }
    return left;
  }
};

solution(array, N);
