function solution(lottos, win_nums) {
    var answer = [];
    let zroCount = 0;
    let winCount = 0;
    const win_numOb = {};
    // win_num 의 해시화
    win_nums.forEach(e=>win_numOb[e]=1);
    // zero Count and win Count
    lottos.forEach(e=>{
        e == 0 ? zroCount++ : ( win_numOb[e]  ? winCount ++ : null )
    })
    // 순위 파악
    const bst = 7-(zroCount+winCount) >= 6 ? 6 : 7-(zroCount+winCount)
    const wrst = 7-winCount >= 6 ? 6 : 7-winCount
    answer = [bst,wrst]
    return answer;
}

// worstTime : 0.15ms
// bestTime : 0.08ms