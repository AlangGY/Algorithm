const input = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const unitPrices = input.splice(0, N).map(Number);
const carWeights = [0, ...input.splice(0, M).map(Number)];
const schedule = input.map(Number);

const solution = (unitPrices, carWeights, schedule) => {
  let totalPrice = 0;
  const places = new Array(unitPrices.length).fill(false);
  const queue = [];
  let pointer = 0;
  for (const nextCar of schedule) {
    if (nextCar > 0) {
      const index = places.findIndex((place) => place === false);
      if (index < 0) {
        queue.push(nextCar);
        continue;
      }
      places[index] = true;
      totalPrice += unitPrices[index] * carWeights[nextCar];
      carWeights[nextCar] = index;
    } else {
      const willEmptyIndex = carWeights[-nextCar];
      places[willEmptyIndex] = false;
      if (queue.length - pointer > 0) {
        const nextCar = queue[pointer++];
        places[willEmptyIndex] = true;
        totalPrice += unitPrices[willEmptyIndex] * carWeights[nextCar];
        carWeights[nextCar] = willEmptyIndex;
      }
    }
  }
  console.log(totalPrice);
};

solution(unitPrices, carWeights, schedule);
