/*
백준 / 1238 / 파티
https://www.acmicpc.net/problem/1238
*/

const [NMXStr, ...roadsStr] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, X] = NMXStr.split(" ").map(Number);
const roads = roadsStr.map((roadStr) => roadStr.split(" ").map(Number));

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

const solution = (N, M, X, roads) => {
  // 플로이드-워셜
  /*
   const d = Array.from({ length: N + 1 }, () =>
     new Array(N + 1).fill(Infinity)
   );

   for (const [start, end, cost] of roads) {
     d[start][end] = cost;
   }
    i 거쳐가는 노드
   for (let i = 1; i < N + 1; i++) {
      j 출발 노드
     for (let j = 1; j < N + 1; j++) {
        k 도착 노드
       for (let k = 1; k < N + 1; k++) {
         if (j === k) d[j][k] = 0;
         d[j][k] = Math.min(d[j][k], d[j][i] + d[i][k]);
       }
     }
   }
   let maxTime = -Infinity;

   for (let i = 1; i < N + 1; i++) {
     maxTime = Math.max(maxTime, d[i][X] + d[X][i]);
   }
   console.log(maxTime);
   */

  const graph = Array.from({ length: N + 1 }, () => ({}));
  const graph2 = Array.from({ length: N + 1 }, () => ({}));

  for (const [start, end, cost] of roads) {
    graph[start][end] = cost;
    graph2[end][start] = cost;
  }

  let maxTime = -Infinity;
  const xDistance = dijkstra(X, graph);
  const xDistance2 = dijkstra(X, graph2);
  for (let i = 1; i < N + 1; i++) {
    if (i === X) continue;
    maxTime = Math.max(maxTime, xDistance[i] + xDistance2[i]);
  }

  console.log(maxTime);

  function dijkstra(start, graph) {
    const d = new Array(N + 1).fill(Infinity);
    d[start] = 0;
    const minHeap = new Heap((a, b) => a.distance - b.distance);
    minHeap.insert({ position: start, distance: 0 });
    while (minHeap.size()) {
      const { position, distance } = minHeap.remove();
      if (distance > d[position]) continue;
      graph[position].forEach((targetDistance, node) => {
        if (node === 0 || targetDistance === Infinity) return;
        if (d[node] > distance + targetDistance) {
          d[node] = distance + targetDistance;
          minHeap.insert({ position: node, distance: d[node] });
        }
      });
    }
    return d;
  }
};

solution(N, M, X, roads);
