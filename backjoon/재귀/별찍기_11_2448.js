let N = Number(require("fs").readFileSync("example.txt").toString().trim());

const solution = (N) => {
  let k = 1;
  N /= 3;
  while (N > 1) {
    k++;
    N /= 2;
  }

  console.log(recursion(k).join("\n"));

  function recursion(depth) {
    if (depth === 1) {
      return ["  *  ", " * * ", "*****"];
    }

    const prevTriangle = recursion(depth - 1);
    const space = " ".repeat(3 * 2 ** (depth - 2));
    return [
      ...prevTriangle.map((triangle) => `${space}${triangle}${space}`),
      ...prevTriangle.map((triangle) => `${triangle} ${triangle}`),
    ];
  }
};

solution(N);
