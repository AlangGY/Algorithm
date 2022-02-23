const [bulbCount, currentBulbs, targetBulbs] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (currentBulbs, targetBulbs, bulbCount) => {
  let switchCount;
  let currentBulbsArr;

  // case 1 ( inactive switch 0)
  currentBulbsArr = currentBulbs.split("");
  switchCount = _traverseAndSwitchBulbs(currentBulbsArr, targetBulbs, 0);

  if (switchCount !== null) return switchCount;

  // case 2 (active switch 1)
  currentBulbsArr = currentBulbs.split("");
  _switchBulb(0, currentBulbsArr);
  _switchBulb(1, currentBulbsArr);

  switchCount = _traverseAndSwitchBulbs(currentBulbsArr, targetBulbs, 1);

  if (switchCount !== null) return switchCount;

  return -1;

  function _switchBulb(bulbIndex, bulbArray) {
    bulbArray[bulbIndex] = bulbArray[bulbIndex] === "0" ? "1" : "0";
  }

  function _traverseAndSwitchBulbs(
    currentBulbsArr,
    targetBulbs,
    initialSwitchCount
  ) {
    let switchCount = initialSwitchCount;
    for (let i = 0; i < bulbCount - 1; i++) {
      if (currentBulbsArr[i] !== targetBulbs[i]) {
        _switchBulb(i, currentBulbsArr);
        _switchBulb(i + 1, currentBulbsArr);
        _switchBulb(i + 2, currentBulbsArr);
        switchCount++;
      }
    }

    return currentBulbsArr[bulbCount - 1] === targetBulbs[bulbCount - 1]
      ? switchCount
      : null;
  }
};

console.log(solution(currentBulbs, targetBulbs, bulbCount));
