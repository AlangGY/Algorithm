/*
프로그래머스 / 이분탐색 / 입국심사
https://programmers.co.kr/learn/courses/30/lessons/43238
*/

function solution(n, times) {
  times.sort((a, b) => a - b);
  const worstTime = Math.ceil(n / times.length) * times[times.length - 1];
  const bestTime = Math.ceil(n / times.length) * times[0];
  let leftTime = bestTime;
  let rightTime = worstTime;
  let minTime = rightTime;
  while (leftTime < rightTime) {
    const middleTime = Math.floor((rightTime + leftTime) / 2);
    const totalJudged = times.reduce(
      (totalJudged, time) => totalJudged + Math.floor(middleTime / time),
      0
    );
    if (totalJudged < n) {
      leftTime = middleTime + 1;
      continue;
    }
    if (totalJudged >= n) {
      minTime = middleTime;
      rightTime = middleTime;
      continue;
    }
  }

  return minTime;
}
