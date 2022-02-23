const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

const solution = (N, K, A) => {
  let saveCount = 0;
  for (let i = 1; i < N; i++) {
    let loc = i - 1;
    let newItem = A[i];

    while (0 <= loc && newItem < A[loc]) {
      A[loc + 1] = A[loc];
      loc--;
      if (++saveCount === K) {
        console.log(A[loc + 1]);
        return;
      }
    }
    if (loc + 1 !== i) {
      A[loc + 1] = newItem;
      if (++saveCount === K) {
        console.log(A[loc + 1]);
        return;
      }
    }
  }

  console.log(-1);
};

solution(N, K, A);
