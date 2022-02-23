/**
 백준 숨바꼭질 1697
 https://www.acmicpc.net/problem/1697
 */

const [N, K] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const solution = (N, K) => {
  const queue = [];
  let pointer = 0;
  queue.push(N);
  queue.push(0);
  visited = Array.from({ length: 100000 }, () => 0);
  visited[N] = 1;
  let result;
  while (pointer < queue.length) {
    const currentPosition = queue[pointer++];
    const currentTime = queue[pointer++];

    if (currentPosition === K) {
      result = currentTime;
      break;
    }

    if (currentPosition + 1 <= 100000 && !visited[currentPosition + 1]) {
      queue.push(currentPosition + 1);
      queue.push(currentTime + 1);
      visited[currentPosition + 1] = 1;
    }

    if (currentPosition - 1 >= 0 && !visited[currentPosition - 1]) {
      queue.push(currentPosition - 1);
      queue.push(currentTime + 1);
      visited[currentPosition - 1] = 1;
    }
    if (currentPosition * 2 <= 100000 && !visited[currentPosition * 2]) {
      queue.push(currentPosition * 2);
      queue.push(currentTime + 1);
      visited[currentPosition * 2] = 1;
    }

    // 아래 코드로 할시 메모리와 시간소모가 엄청남.
    // [currentPosition + 1, currentPosition - 1, currentPosition * 2].forEach(
    //   (newPosition) => {
    //     if (
    //       !visited[newPosition] &&
    //       0 <= newPosition &&
    //       newPosition <= 1000000
    //     ) {
    //       queue.push([newPosition, currentTime + 1]);
    //       visited[newPosition] = 1;
    //     }
    //   }
    // );
  }
  console.log(result);
};

solution(N, K);
