const [nmrStr, itemsStr, ...roadsStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = nmrStr.split(" ").map(Number);
const items = itemsStr.split(" ").map(Number);
const roads = roadsStr.map((road) => road.split(" ").map(Number));

const solution = (n, searchRange, r, items, roads) => {
  const d = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(Infinity)
  );
  for (const [node1, node2, cost] of roads) {
    if (cost > searchRange) continue;
    d[node1][node2] = cost;
    d[node2][node1] = cost;
  }
  items.splice(0, 0, 0);

  // 중간 노드 i
  for (let i = 1; i < n + 1; i++) {
    // 시작 노드 j
    for (let j = 1; j < n + 1; j++) {
      // 종단 노드 k
      for (let k = 1; k < n + 1; k++) {
        if (j === k) {
          d[j][k] = 0;
          continue;
        }
        d[j][k] = Math.min(d[j][k], d[j][i] + d[i][k]);
        if (d[j][k] > searchRange) d[j][k] = Infinity;
      }
    }
  }
  let maxItem = -Infinity;
  d.forEach((nodeDistance) => {
    const itemCount = nodeDistance.reduce((itemCount, distance, nodeIndex) => {
      return distance === Infinity ? itemCount : itemCount + items[nodeIndex];
    }, 0);
    maxItem = Math.max(maxItem, itemCount);
  });
  console.log(maxItem);
};

solution(n, m, r, items, roads);
