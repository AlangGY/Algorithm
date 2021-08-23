function solution(a, b) {
  a = a.reduce((acc, v, i) => (acc += a[i] * b[i]), 0);
  return a;
}

console.log(solution([1, 2, 3, 4], [-3, -1, 0, 2])); // 3
console.log(solution([-1, 0, 1], [1, 0, -1])); // -2
