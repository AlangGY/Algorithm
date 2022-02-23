/*
백준 5635 생일
https://www.acmicpc.net/problem/5635
*/

const [studentCount, ...students] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const studentsArray = students.map((student) => student.split(" ").map(Number));

const solution = (students) => {
  students.sort(([_, dayA, monthA, yearA], [__, dayB, monthB, yearB]) => {
    if (yearA !== yearB) return yearA - yearB;
    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
  });

  console.log(students[students.length - 1][0]);
  console.log(students[0][0]);
};

solution(studentsArray);
