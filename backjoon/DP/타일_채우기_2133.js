let N = Number(require("fs").readFileSync("/dev/stdin").toString().trim());

solution = (N) => {
  if (N % 2) return 0;
  const d = new Array(N + 1).fill(0);
  d[0] = 1;
  d[2] = 3;
  for (let i = 3; i <= N; i++) {
    let uniquePatternsTotal = 0;
    for (let j = i - 4; j >= 0; j -= 2) {
      uniquePatternsTotal += 2 * d[j];
    }
    d[i] = d[i - 2] * 3 + uniquePatternsTotal;
  }
  return d[N];
};

console.log(solution(N));
