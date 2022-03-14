/*
백준 / 1446 / 지름길
https://www.acmicpc.net/problem/1446
*/

const [shortCutsCountAndLengthStr, ...shortCutsStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [shortCutsCount, highWayLength] = shortCutsCountAndLengthStr
  .split(" ")
  .map(Number);
const shortCuts = shortCutsStr.map((shortCutStr) =>
  shortCutStr.split(" ").map(Number)
);

const solution = (shortCuts, highWayLength, shortCutsCount) => {
  distance = Array.from({ length: highWayLength + 1 }, (_, index) => index);
  const shortCutMap = shortCuts.reduce(
    (shortCutMap, [startPosition, endPosition, cost]) => {
      if (endPosition > highWayLength) return shortCutMap;
      const startPositionShortCut = shortCutMap[startPosition] || {};
      shortCutMap[startPosition] = {
        ...startPositionShortCut,
        [endPosition]: Math.min(
          startPositionShortCut[endPosition] || Infinity,
          cost
        ),
      };
      return shortCutMap;
    },
    {}
  );

  for (let i = 0; i < highWayLength + 1; i++) {
    distance[i] = i === 0 ? 0 : Math.min(distance[i], distance[i - 1] + 1);
    if (shortCutMap[i]) {
      Object.entries(shortCutMap[i]).forEach(([endPosition, cost]) => {
        distance[endPosition] = Math.min(
          distance[endPosition] || Infinity,
          cost + distance[i]
        );
      });
    }
  }

  console.log(distance[highWayLength]);
};

solution(shortCuts, highWayLength, shortCutsCount);
