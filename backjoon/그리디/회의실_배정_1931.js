/*
백준 1931 회의실 배정
https://www.acmicpc.net/problem/1931
*/

let [, ...meetingTimes] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

meetingTimes = meetingTimes.map((meetingTime) =>
  meetingTime.split(" ").map(Number)
);

const solution = (meetingTimes) => {
  meetingTimes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let totalMeetingCount = 0,
    currStartTime = 0,
    currEndTime = 0;
  for (const [meetingStart, meetingEnd] of meetingTimes) {
    if (currEndTime <= meetingStart) {
      totalMeetingCount++;
      currStartTime = meetingStart;
      currEndTime = meetingEnd;
    } else if (meetingEnd < currEndTime) {
      currStartTime = meetingStart;
      currEndTime = meetingEnd;
    }
  }

  console.log(totalMeetingCount);
};

solution(meetingTimes);
