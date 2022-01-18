const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

// const input = [3, 3, 4, 8];
const [testCount, ...testCases] = input.map((e) => parseInt(e, 10));

const coupleTwoNumbers = (a, b) => parseInt(a.toString() + b.toString(), 10);

const getNumbers = (array) => {
  const results = [];
  const stack = [];
  // initialValue
  stack.push([[array[0]], 0]); // [value, index]
  while (stack.length) {
    const [values, index] = stack.pop();
    const prevValues = values.slice(0, -1);
    const lastValue = values[values.length - 1];
    if (index === array.length - 1) {
      results.push(values);
      continue;
    }
    const caseOneValues = [
      ...prevValues,
      coupleTwoNumbers(lastValue, array[index + 1]),
    ];
    const caseTwoValues = [...values, array[index + 1]];
    stack.push([caseOneValues, index + 1]);
    stack.push([caseTwoValues, index + 1]);
  }

  return results;
};

const findBalance = (numbers) => {
  const result = [];
  const [firstNumber, ...restNumbers] = numbers;
  const array1 = [[firstNumber], firstNumber];
  const array2 = [[], 0];

  const stack = [[array1, array2, 1]];

  if (!restNumbers.length) return [];

  while (stack.length) {
    const [array1, array2, index] = stack.pop();
    const [array1Numbers, array1Sum] = array1;
    const [array2Numbers, array2Sum] = array2;
    if (index === restNumbers.length + 1) {
      array1Sum === array2Sum && result.push([array1Numbers, array2Numbers]);
      continue;
    }
    const newNumber = restNumbers[index - 1];
    const newArray1 = [[...array1Numbers, newNumber], array1Sum + newNumber];
    const newArray2 = [[...array2Numbers, newNumber], array2Sum + newNumber];

    stack.push([newArray1, array2, index + 1]);
    stack.push([array1, newArray2, index + 1]);
  }

  return result;
};

const parseToString = (num) => {
  const string = Math.abs(num).toString().split("").join(" ");
  return num > 0 ? `+${string}` : `-${string}`;
};

const solution = (N) => {
  const range = Array.from({ length: N }, (_, i) => i + 1);

  const availableNumbers = getNumbers(range)
    .filter((numbers) => numbers.reduce((acc, num) => acc + num) % 2 === 0)
    .reduce((acc, numbers) => {
      const newNumbers = findBalance(numbers);
      return newNumbers.length ? [...acc, ...newNumbers] : acc;
    }, []);

  availableNumbers
    .map(([plusNumbers, minusNumbers]) => {
      const availableEquation = [
        ...plusNumbers,
        ...minusNumbers.map((number) => -number),
      ];
      availableEquation.sort((a, b) => {
        return (
          Math.abs(a).toString().charCodeAt(0) -
          Math.abs(b).toString().charCodeAt(0)
        );
      });
      const [firstNumber, ...restNumbers] = availableEquation;
      const equation = `${parseToString(firstNumber).slice(1)}${restNumbers
        .map((number) => parseToString(number))
        .join("")}`;

      return equation;
    })
    .sort()
    .forEach((equation) => console.log(equation));
};
testCases.forEach((number, index) => {
  solution(number);
  index < testCount - 1 && console.log("");
});
