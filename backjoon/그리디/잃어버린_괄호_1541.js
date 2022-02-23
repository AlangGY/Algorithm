/*
백준 1541 잃어버린 괄호
https://www.acmicpc.net/problem/1541
*/

const statement = require("fs").readFileSync("/dev/stdin").toString().trim();

const sumOnlyNumber = (array) => {
  return array.reduce(
    (acc, element) => (Number.isNaN(+element) ? acc : acc + Number(element)),
    0
  );
};
const solution = (statement) => {
  const regex = /\d+|[+-]/g;
  const statementSplitted = statement.match(regex);
  const firstMinusIndex = statementSplitted.findIndex(
    (element) => element === "-"
  );

  if (firstMinusIndex === -1) {
    console.log(sumOnlyNumber(statementSplitted));
    return;
  }

  const leastSum =
    sumOnlyNumber(statementSplitted.slice(0, firstMinusIndex)) -
    sumOnlyNumber(statementSplitted.slice(firstMinusIndex + 1));

  console.log(leastSum);
};

solution(statement);
