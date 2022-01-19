const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
// const input = ["9", "> < < < > > > < <"];
const signCount = parseInt(input[0]);
const signs = input[1].split(" ");

const solution = (signCount, signs) => {
  let minNumberArray = Array.from(
    { length: signCount + 1 },
    (_, index) => index
  );
  let maxNumberArray = Array.from(
    { length: signCount + 1 },
    (_, index) => 9 - index
  );

  console.log(_findCorrectNumberArray(maxNumberArray, signs).join(""));
  console.log(_findCorrectNumberArray(minNumberArray, signs).join(""));

  function _findCorrectNumberArray(numberArray, signs) {
    const newNumberArray = [...numberArray];
    while (true) {
      let notFound = false;
      for (let index = 0; index < newNumberArray.length - 1; index++) {
        switch (signs[index]) {
          case "<":
            if (newNumberArray[index] > newNumberArray[index + 1]) {
              [newNumberArray[index], newNumberArray[index + 1]] = [
                newNumberArray[index + 1],
                newNumberArray[index],
              ];
              notFound = true;
            }
            break;
          case ">":
            if (newNumberArray[index] < newNumberArray[index + 1]) {
              [newNumberArray[index], newNumberArray[index + 1]] = [
                newNumberArray[index + 1],
                newNumberArray[index],
              ];
              notFound = true;
            }
            break;
          default:
            throw new Error(`예상치 않은 입력값입니다! sign: ${sign[index]}`);
        }
      }
      if (!notFound) {
        break;
      }
    }
    return newNumberArray;
  }
};

solution(signCount, signs);
