/*
백준 / 1753 / 최단경로
https://www.acmicpc.net/problem/1753
*/

const [VandEStr, startPositionStr, ...graphStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [V, E] = VandEStr.split(" ").map(Number);
const startPosition = Number(startPositionStr);
const roads = graphStr.map((element) => element.split(" ").map(Number));

class Heap {
  constructor(compareFn) {
    this.heap = [];
    this.compareFn = (a, b) => {
      const fn = compareFn || ((a, b) => a - b);
      return fn(a, b) > 0;
    };
  }

  getLeftChildIndex(parentIndex) {
    if (parentIndex * 2 + 1 > this.heap.length - 1) return;
    return parentIndex * 2 + 1;
  }
  getRightChildIndex(parentIndex) {
    if (parentIndex * 2 + 2 > this.heap.length - 1) return;
    return parentIndex * 2 + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.compareFn(this.heap[parentIndex], lastInsertedNode)) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  }

  heapifyDown() {
    let index = 0;
    const count = this.heap.length;
    const root = this.peek();

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const childIndex =
        rightChildIndex &&
        this.compareFn(this.heap[leftChildIndex], this.heap[rightChildIndex])
          ? rightChildIndex
          : leftChildIndex;

      if (this.compareFn(root, this.heap[childIndex])) {
        this.heap[index] = this.heap[childIndex];
        index = childIndex;
      } else break;
    }
    this.heap[index] = root;
  }

  peek() {
    return this.heap[0];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  remove() {
    const count = this.heap.length;
    const root = this.peek();
    if (count <= 0) return;
    if (count === 1) {
      this.heap = [];
    } else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }
    return root;
  }

  size() {
    return this.heap.length;
  }
}

const solution = (V, E, startPosition, roads) => {
  const roadsMap = new Map();
  roads.forEach(([start, end, cost]) => {
    let roadMap = roadsMap.get(start);
    if (!roadsMap.has(start)) {
      roadsMap.set(start, new Map());
      roadMap = roadsMap.get(start);
    }
    if (!roadMap.get(end) || roadMap.get(end) > cost) {
      roadMap.set(end, cost);
    }
  });
  const distance = new Array(V + 1).fill(Infinity);
  const visited = new Array(V + 1).fill(0);
  const minHeap = new Heap((a, b) => a.distance - b.distance);
  distance[startPosition] = 0;
  minHeap.insert({ position: startPosition, distance: 0 });
  while (minHeap.size()) {
    const { position: currPosition } = minHeap.remove();
    if (visited[currPosition]) continue;
    visited[currPosition] = 1;

    if (!roadsMap.get(currPosition)) continue;
    [...roadsMap.get(currPosition)].forEach(([targetPosition, cost]) => {
      if (visited[targetPosition]) return;
      if (distance[targetPosition] > cost + distance[currPosition]) {
        distance[targetPosition] = cost + distance[currPosition];
        minHeap.insert({
          position: targetPosition,
          distance: distance[targetPosition],
        });
      }
    });
  }
  return distance
    .slice(1)
    .map((element) => (element === Infinity ? "INF" : element))
    .join("\n");
};

console.log(solution(V, E, startPosition, roads));
