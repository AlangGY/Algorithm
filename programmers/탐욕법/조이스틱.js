function solution(name) {
  let [longestA, aCount, upDown, leftRight] = [0, 0, 0, name.length - 1];
  var answer = 0;
  // 위아래 조작갯수 및 A개수 카운트
  name.split("").forEach((c, idx) => {
    if (c == "A") {
      aCount += 1;
      idx == name.length - 1 ? (longestA = Math.max(longestA, aCount)) : null;
    } else {
      longestA = Math.max(longestA, aCount);
      aCount = 0;
    }
    upDown += Math.min(
      c.charCodeAt() - "A".charCodeAt(),
      "Z".charCodeAt() - c.charCodeAt() + 1
    );
  });

  // 좌우 최소 이동
  let [left, right] = [name.length, 0];
  if (longestA > 0) {
    let aIdx = name.indexOf("A".repeat(longestA));
    [left, right] = [
      name.slice(0, aIdx).length,
      name.slice(aIdx + longestA).length,
    ];
  }
  leftRight = Math.min(leftRight, (left - 1) * 2 + right, left + right * 2 - 1);
  return upDown + leftRight;
}
