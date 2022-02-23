// 백준 줄어드는 수 1174
// https://www.acmicpc.net/problem/1174

const N = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const solution = (N) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let combination = [];
  for (let i = 1; i < numbers.length + 1; i++) {
    combination = [
      ...combination,
      ...getCombinations(numbers, i)
        .map((numbers) => numbers.reverse().join(""))
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
    ];
    if (combination.length > N) break;
  }
  console.log(combination[N - 1] || -1);
};

function getCombinations(array, num) {
  const result = [];
  if (num === 1) {
    return array.map((element) => [element]);
  }

  array.forEach((chosen, index, originalArray) => {
    const rest = originalArray.slice(index + 1);
    const combinations = getCombinations(rest, num - 1);
    const combined = combinations.map((combination) => [
      chosen,
      ...combination,
    ]);
    result.push(...combined);
  });

  return result;
}

solution(N);
