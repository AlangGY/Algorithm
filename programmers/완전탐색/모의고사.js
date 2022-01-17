function solution(answers) {
  let result = [];
  let p = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  let s = Array.from({ length: 3 }, () => 0);
  let mx = 0;
  p.forEach((e, i) => {
    answers.forEach((answer, idx) => {
      answer == e[idx % e.length] ? (s[i] += 1) : null;
    });
    mx = Math.max(mx, s[i]);
  });
  s.forEach((e, i) => (e == mx ? result.push(i + 1) : null));
  return result;
}

console.log(solution([1, 2, 3, 4, 5]));
console.log(solution([1, 3, 2, 4, 2]));
