const [N, ...inputs] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [totalDistance, currentFuel] = inputs.pop().split(" ").map(Number);
const stations = inputs.map((input) => input.split(" ").map(Number));

class MaxHeap {
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
    const lastInsertedNode = this.heap[index];
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex].key < lastInsertedNode.key) {
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

      const biggerChildIndex =
        rightChildIndex &&
        this.heap[rightChildIndex].key > this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[biggerChildIndex].key > root.key) {
        this.heap[index] = this.heap[biggerChildIndex];
        index = biggerChildIndex;
      } else break;
    }
    this.heap[index] = root;
  }

  peek() {
    return this.heap[0];
  }

  insert(key, value) {
    this.heap.push({ key, value });
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

const solution = (totalDistance, fuel, stations) => {
  let count = 0;
  let currentFuel = fuel;
  const maxHeap = new MaxHeap();
  stations.sort((a, b) => b[0] - a[0]);
  while (totalDistance > currentFuel) {
    while (stations.length && stations[stations.length - 1][0] <= currentFuel) {
      const [stationDistance, stationFuel] = stations.pop();
      maxHeap.insert(stationFuel, stationDistance);
    }
    if (maxHeap.size() === 0) {
      count = -1;
      break;
    }
    currentFuel += maxHeap.remove().key;
    count++;
  }

  return count;
};

console.log(solution(totalDistance, currentFuel, stations));
