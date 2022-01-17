function solution(brown, yellow) {
  return _getCommonFactorCombs(yellow)
    .find(([width, height]) => (width + 2) * (height + 2) === brown + yellow)
    .map((length) => length + 2);

  function _getCommonFactorCombs(num) {
    const combs = [];
    for (let i = 1; i < Math.ceil(Math.sqrt(num)) + 1; i++) {
      num % i === 0 && combs.push([num / i, i]);
    }
    return combs;
  }
}
