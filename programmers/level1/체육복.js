function solution(n, lost, reserve) {
  var answer = 0;
  const uniform = Array.from({ length: n + 2 }, () => 1);
  // 남은 유니폼수 구하기
  lost.forEach((idx) => (uniform[idx] -= 1));
  reserve.forEach((idx) => (uniform[idx] += 1));
  // 왼쪽을 우선으로 빌려주기
  uniform.forEach((e, idx) => {
    if (e == 2 && (uniform[idx - 1] == 0 || uniform[idx + 1] == 0)) {
      uniform[idx] -= 1;
      uniform[idx - 1] == 0 ? (uniform[idx - 1] += 1) : (uniform[idx + 1] += 1);
    }
  });
  uniform
    .slice(1, uniform.length - 1)
    .forEach((e) => (e > 0 ? answer++ : null));
  return answer;
}

console.log(solution(5, [2, 4], [1, 3, 5]));
console.log(solution(5, [2, 4], [3]));
console.log(solution(3, [3], [1]));
