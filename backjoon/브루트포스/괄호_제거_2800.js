/*
백준 / 2800 / 괄호 제거
https://www.acmicpc.net/problem/2800
*/

const input = require("fs").readFileSync("example.txt").toString().trim();

const solution = (equation) => {
  let equations = [equation];
  let answer = new Set();
  while (true) {
    if (equations.every((equation) => !havePair(equation))) break;
    const newEquations = [];
    equations.forEach((equation) => {
      if (!havePair(equation)) {
        answer.add(equation);
        return;
      }
      const removedEquations = removeOnePair(equation);
      removedEquations.forEach((equation) => {
        newEquations.push(equation);
        answer.add(equation);
      });
    });
    equations = [...new Set(newEquations)];
  }

  return [...answer].sort().join("\n");

  function havePair(equation) {
    return new RegExp(/\(.*\)/).test(equation);
  }
  function removeOnePair(equation) {
    let stack = [];
    equation.split("").forEach((char, index) => {
      if (char === "(") {
        if (!stack.length) {
          stack = [[index]];
          return;
        }
        const plusStack = stack
          .filter((stack2) => stack2.length % 2 === 0)
          .map((stack2) => [...stack2, index]);
        stack = [...stack, ...plusStack, [index]];
      } else if (char === ")") {
        const plusStack = stack
          .filter((stack2) => stack2.length % 2)
          .map((stack2) => [...stack2, index]);
        stack = [...stack, ...plusStack];
      }
    });

    if (!stack.length) {
      return false;
    }

    const equations = stack
      .filter((stack2) => stack2.length % 2 === 0)
      .map((stack2) =>
        equation
          .split("")
          .filter((_, index) => !stack2.includes(index))
          .join("")
      );
    return [...new Set(equations)];
  }
};

console.log(solution(input));
