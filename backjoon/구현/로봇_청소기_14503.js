const [[N, M], [r, c, d], ...map] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const directionMapper = {
  0: { dx: -1, dy: 0 },
  1: { dx: 0, dy: 1 },
  2: { dx: 1, dy: 0 },
  3: { dx: 0, dy: -1 },
};

class RobotCleaner {
  constructor({ currentPosition, direction }) {
    this.currentPosition = currentPosition;
    this.direction = direction;
  }

  get left() {
    return this.direction === 0 ? 3 : this.direction - 1;
  }

  clean() {
    const [x, y] = this.currentPosition;
    map[x][y] = -1;
  }
  turn() {
    this.direction = this.left;
  }
  go(multiplier = 1) {
    const [curX, curY] = this.currentPosition;
    const newX = curX + directionMapper[this.direction].dx * multiplier;
    const newY = curY + directionMapper[this.direction].dy * multiplier;
    if (newX < 0 || newX >= N || newY < 0 || newY >= M) return false;
    this.currentPosition = [newX, newY];
  }
  canGo(x, y) {
    return map[x][y] <= 0;
  }
  get canClean() {
    const [curX, curY] = this.currentPosition;
    const direction = this.left;
    const newX = curX + directionMapper[direction].dx;
    const newY = curY + directionMapper[direction].dy;
    return map[newX][newY] === 0;
  }
  get canBack() {
    const multiplier = -1;
    const [x, y] = this.currentPosition;
    const newX = x + directionMapper[this.direction].dx * multiplier;
    const newY = y + directionMapper[this.direction].dy * multiplier;
    if (map[newX][newY] <= 0) {
      return true;
    }
    return false;
  }
}

const solution = (N, M, r, c, d) => {
  const robotCleaner = new RobotCleaner({
    currentPosition: [r, c],
    direction: d,
  });

  let cleanCount = 0;

  outer: while (true) {
    robotCleaner.clean();
    cleanCount++;
    let searchCount = 0;
    while (true) {
      if (robotCleaner.canClean) {
        robotCleaner.turn();
        robotCleaner.go();
        break;
      }
      if (searchCount >= 4) {
        if (robotCleaner.canBack) {
          robotCleaner.go(-1);
          searchCount = 0;
          continue;
        } else {
          break outer;
        }
      }
      robotCleaner.turn();
      searchCount++;
    }
  }
  console.log(cleanCount);
  // console.log(map.flat().filter((num) => num === -1).length);
};

solution(N, M, r, c, d);
