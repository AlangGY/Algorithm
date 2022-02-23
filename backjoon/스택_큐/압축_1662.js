const input = require("fs").readFileSync("example.txt").toString().trim();

const solution = (string) => {
  const stack = [0];
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char === ")") {
      const length = stack.pop();
      const multiply = stack.pop();
      stack[stack.length - 1] += multiply * length;
      continue;
    }
    if (char === "(") {
      stack[stack.length - 1]--;
      stack.push(Number(string[i - 1]));
      stack.push(0);
      continue;
    }
    stack[stack.length - 1]++;
  }
  return stack.reduce((acc, element) => acc + element, 0);
};

console.log(solution(input));
