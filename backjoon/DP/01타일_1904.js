const [N] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

/*
N = 1 1 
N = 2 00 11
N = 3 100 001 111
N = 4 0000 1100 0011 1001 1111
N = 5 00100 00001 00111 10000 11100 10011 11001 11111
N[a] = N[a-2] + N[a-1]
*/

const solution = (N) => {
  let counts = Array.from({ length: N + 1 }, () => 0);
  counts[1] = 1;
  counts[2] = 2;
  for (let i = 3; i < N + 1; i++) {
    counts[i] = (counts[i - 2] + counts[i - 1]) % 15746;
  }
  console.log(counts[N]);
};

solution(N);
