/*
백준 11047 동전 0
https://www.acmicpc.net/problem/11047
*/

const [coinKindsCountAndPrice, ...coinsPrice] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [coinKindsCount, totalPrice] = coinKindsCountAndPrice
  .split(" ")
  .map(Number);
const coinsPriceFiltered = coinsPrice
  .map(Number)
  .filter((coinPrice) => coinPrice <= totalPrice);

const solution = (coinsPrice, totalPrice) => {
  let totalCoinCount = 0;
  while (totalPrice > 0) {
    const coinPrice = coinsPrice.pop();
    const coinCount = Math.floor(totalPrice / coinPrice);
    totalCoinCount += coinCount;
    totalPrice -= coinCount * coinPrice;
  }
  console.log(totalCoinCount);
};

solution(coinsPriceFiltered, totalPrice);
