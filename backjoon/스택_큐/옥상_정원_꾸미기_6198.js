const [_, ...buildings] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const solution = (buildings) => {
  const stack = [];
  let totalCount = 0;

  for (const currentBuilding of buildings) {
    while (stack.length && stack[stack.length - 2] <= currentBuilding) {
      totalCount += _popBuilding(stack);
      console.log(stack);
    }
    _pushBuilding(stack, currentBuilding);
    console.log(stack);
  }

  while (stack.length) {
    totalCount += _popBuilding(stack);
    console.log(stack);
  }

  return totalCount;

  function _pushBuilding(stack, building) {
    stack.push(building);
    stack.push(0);
  }

  function _popBuilding(stack) {
    const count = stack.pop();
    stack.pop();
    if (stack.length) {
      stack[stack.length - 1] += count + 1;
    }
    return count;
  }
};

console.log(solution(buildings));
