/*
programmers / 힙 / 이중우선순위큐
https://programmers.co.kr/learn/courses/30/lessons/42628
*/

class MinHeap {
  constructor() {
    this.heap = [];
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
    const lastInsertedValue = this.heap[index];
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > lastInsertedValue) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedValue;
  }

  heapifyDown() {
    let index = 0;
    const count = this.heap.length;
    const root = this.peek();

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex &&
        this.heap[rightChildIndex] < this.heap[leftChildIndex]
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex] < root) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
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
    if (count <= 0) return 0;
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

function solution(operations) {
  const minHeap = new MinHeap();
  const result = [0, 0];
  operations.forEach((operation) => {
    const [command, number] = operation.split(" ");
    if (command === "I") {
      minHeap.insert(Number(number));
      return;
    } else if (command === "D") {
      if (number === "-1") minHeap.remove();
      else {
        minHeap.heap.sort((a, b) => a - b);
        minHeap.heap.pop();
      }
    }
  });
  if (minHeap.size()) {
    minHeap.heap.sort((a, b) => a - b);
    result[0] = minHeap.heap[minHeap.size() - 1];
    result[1] = minHeap.peek();
  }

  return result;
}
