const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const [N, M, x, y, K] = input.shift();

const map = input.splice(0, N);

const orders = input[0];

class Dice {
  constructor() {
    this.plane = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
  }

  roll(direction) {
    let temp;
    let temp2;
    let switchOrders;
    switch (direction) {
      case "east":
        switchOrders = [1, 4, 6, 3];
        break;
      case "west":
        switchOrders = [1, 3, 6, 4];
        break;
      case "south":
        switchOrders = [1, 2, 6, 5];
        break;
      case "north":
        switchOrders = [1, 5, 6, 2];
        break;
    }
    temp = this.plane[switchOrders[0]];
    temp2 = this.plane[switchOrders[1]];
    this.plane[switchOrders[1]] = temp;
    temp = this.plane[switchOrders[2]];
    this.plane[switchOrders[2]] = temp2;
    temp2 = this.plane[switchOrders[3]];
    this.plane[switchOrders[3]] = temp;
    this.plane[switchOrders[0]] = temp2;
  }

  get top() {
    return this.plane[1];
  }

  get bottom() {
    return this.plane[6];
  }
  set bottom(value) {
    this.plane[6] = value;
  }
}

const solution = (N, M, x, y, map, orders) => {
  const answer = [];
  const directionsStrMapper = {
    1: "east",
    2: "west",
    3: "north",
    4: "south",
  };
  const directions = {
    1: { dx: 0, dy: 1 },
    2: { dx: 0, dy: -1 },
    3: { dx: -1, dy: 0 },
    4: { dx: 1, dy: 0 },
  };
  const dice = new Dice();
  let curX = x;
  let curY = y;

  orders.forEach((order) => {
    const direction = directionsStrMapper[order];
    const newX = curX + directions[order].dx;
    const newY = curY + directions[order].dy;
    if (newX < 0 || newX >= N || newY < 0 || newY >= M) return;
    dice.roll(direction);
    curX = newX;
    curY = newY;
    if (map[curX][curY]) {
      dice.bottom = map[curX][curY];
      map[curX][curY] = 0;
    } else {
      map[curX][curY] = dice.bottom;
    }
    answer.push(dice.top);
  });

  console.log(answer.join("\n"));
};

solution(N, M, x, y, map, orders);
