function solution(array, commands) {
  var answer = [];
  commands.forEach((e) => {
    let [i, j, k] = e;
    let a = array.slice(i - 1, j);
    a.sort((a, b) => a - b);
    answer.push(a[k - 1]);
  });
  return answer;
}

console.log(
  solution(
    [1, 5, 2, 6, 3, 7, 4],
    [
      [2, 5, 3],
      [4, 4, 1],
      [1, 7, 3],
    ]
  )
);
