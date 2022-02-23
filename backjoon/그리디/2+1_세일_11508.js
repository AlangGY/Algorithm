/*
백준 11508 2+1 세일
https://www.acmicpc.net/problem/11508
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const solution = (prices, count) => {
  prices.sort((a, b) => b - a);
  console.log(
    prices.reduce((priceSum, price, index) =>
      (index + 1) % 3 !== 0 ? priceSum + price : priceSum
    )
  );
};

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  count = parseInt(input[0], 10);
  prices = input.slice(1).map(Number);
  solution(prices, count);
  process.exit();
});
