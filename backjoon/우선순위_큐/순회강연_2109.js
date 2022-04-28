/*
백준 / 2109 / 순회강연
https://www.acmicpc.net/problem/2109
*/

const [[n], ...proposals] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

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

const solution = (n, proposals) => {
  if (n === 0) {
    console.log(0);
    return;
  }
  const minHeap = new Heap((a, b) => b - a);
  proposals.sort((a, b) => a[1] - b[1]);
  let dayLeft = proposals[proposals.length - 1][1];
  let pay = 0;
  while (dayLeft > 0) {
    while (proposals.length && proposals[proposals.length - 1][1] >= dayLeft) {
      const [p] = proposals.pop();
      minHeap.insert(p);
    }

    if (minHeap.size()) {
      pay += minHeap.remove();
      dayLeft--;
    } else if (proposals.length) {
      dayLeft = proposals[proposals.length - 1][1];
    }
  }

  console.log(pay);
};

solution(n, proposals);
