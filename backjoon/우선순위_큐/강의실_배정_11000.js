/*
백준 / 11000 / 강의실 배정
https://www.acmicpc.net/problem/11000
*/

const [N, ...curriculums] = require("fs")
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

const solution = (N, curriculums) => {
  let roomCount = 0;
  const minHeap = new Heap((a, b) => a - b);
  curriculums.sort((a, b) => a[0] - b[0]);
  for (const [startTime, endTime] of curriculums) {
    if (!minHeap.size() || minHeap.peek() > startTime) {
      minHeap.insert(endTime);
    } else {
      while (minHeap.peek() <= startTime) {
        minHeap.remove();
      }
      minHeap.insert(endTime);
    }
    roomCount = Math.max(roomCount, minHeap.size());
  }

  console.log(roomCount);
};

solution(N, curriculums);
