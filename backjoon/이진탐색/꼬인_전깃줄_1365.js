const [NStr, polesStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(NStr);
const poles = polesStr.split(" ").map(Number);

const solution = (N, poles) => {
  const longestIncreaseSubset = _getLIS(poles, N);
  const answer = N - longestIncreaseSubset;

  console.log(answer);

  function _getLIS(array, N) {
    const memo = [array[0]];

    for (let i = 1; i < N; i++) {
      const curr = array[i];
      if (curr > memo[memo.length - 1]) memo.push(curr);
      else {
        const leastIncrease = _lowerBound(memo, curr);
        memo[leastIncrease] = curr;
      }
    }

    return memo.length;
  }

  function _lowerBound(array, key) {
    let left = 0;
    let right = array.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (array[mid] < key) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }
};

solution(N, poles);
