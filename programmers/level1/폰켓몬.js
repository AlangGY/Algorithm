function solution(nums) {
  let ponmon = {};
  nums.forEach((num) => (ponmon[num] = 1));
  if (Object.keys(ponmon).length <= nums.length / 2) {
    return Object.keys(ponmon).length;
  } else {
    return nums.length / 2;
  }
}

console.log([3, 1, 2, 3]);
