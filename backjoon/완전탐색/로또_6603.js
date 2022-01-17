const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const getCombinations = (set, num) => {
  const result = [];
  //  재귀 탈출
  if (num === 1) {
    return set.map((element) => [element]);
  }
  set.forEach((chosen, index, original) => {
    const rest = original.slice(index + 1);
    const combinations = getCombinations(rest, num - 1);
    const combined = combinations.map((combination) => [
      chosen,
      ...combination,
    ]);
    result.push(...combined);
  });

  return result;
};

const solution = (S) => {
  const combs = getCombinations(S, 6);

  combs.forEach((comb) => {
    console.log(comb.join(" "));
  });
  console.log("");
};

inputs.forEach((input) => {
  const [k, ...S] = input.split(" ");
  k !== "0" && solution(S);
});
