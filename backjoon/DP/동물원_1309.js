const N = parseInt(
  require("fs").readFileSync("example.txt").toString().trim(),
  10
);

const solution = (N) => {
  const lionPositionCasesCount = [1, 1, 1]; // 첫칸에 사자 인 경우, 둘째칸에 사자인 경우, 사자 배치를 안하는경우

  for (let i = 1; i < N; i++) {
    const [lionInFirstCount, lionInSecondCount, noLionCount] =
      lionPositionCasesCount;
    lionPositionCasesCount[0] = (lionInSecondCount + noLionCount) % 9901;
    lionPositionCasesCount[1] = (lionInFirstCount + noLionCount) % 9901;
    lionPositionCasesCount[2] =
      (lionInFirstCount + lionInSecondCount + noLionCount) % 9901;
  }
  const totalCases = lionPositionCasesCount.reduce(
    (acc, caseCount) => acc + caseCount,
    0
  );
  console.log(totalCases % 9901);
};

solution(N);
