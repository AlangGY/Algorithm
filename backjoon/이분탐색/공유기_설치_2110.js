/*
백준 / 2110 / 공유기 설치
https://www.acmicpc.net/problem/2110
*/

const [NandCStr, ...housesStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [houseCount, routerCount] = NandCStr.split(" ").map(Number);
const houses = housesStr.map(Number);

const solution = (routerCount, houses) => {
  houses.sort((a, b) => a - b);
  let left = 1;
  let right = houses[houses.length - 1] - houses[0];
  let closestLength = right;
  if (routerCount === 2) {
    return closestLength;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (_isPossible(houses, routerCount, mid)) {
      closestLength = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return closestLength;

  function _isPossible(houses, routerCount, gap) {
    let prevHouseIndex = 0;
    let count = 1;
    let isPossible = false;
    for (let i = 1; i < houses.length; i++) {
      if (houses[i] - houses[prevHouseIndex] >= gap) {
        if (++count >= routerCount) {
          isPossible = true;
          break;
        }
        prevHouseIndex = i;
      }
    }
    return isPossible;
  }
};

console.log(solution(routerCount, houses));
