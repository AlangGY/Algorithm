const [string, bomb] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const solution = (string, bomb) => {
  const bombLastChar = bomb[bomb.length - 1];
  const stack = [];
  for (const char of string) {
    stack.push(char);
    if (char !== bombLastChar) continue;
    if (stack.slice(stack.length - bomb.length).join("") === bomb) {
      stack.splice(stack.length - bomb.length, bomb.length);
    }
  }
  return stack.length ? stack.join("") : "FRULA";
};

console.log(solution(string, bomb));
