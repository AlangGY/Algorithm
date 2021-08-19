function whoIsClose(dir,lCurr,rCurr,hand) {
    let l , r;
    l = Math.abs(lCurr[1]-dir[1]) + Math.abs(lCurr[0] - dir[0])
    r = Math.abs(rCurr[1] - dir[1]) + Math.abs(rCurr[0] - dir[0])
    if (l < r) {
        return "L"
    } else if (l > r) {
        return "R"
    } else {
        return hand == "left" ? "L" : "R"
    }
}

function solution(numbers, hand) {
    let result = ""
    let dir =  {1:[0,0],2:[0,1],3:[0,2],4:[1,0],5:[1,1],6:[1,2],7:[2,0],8:[2,1],9:[2,2],0:[3,1]}
    let lCurr  = [3,0];
    let rCurr  = [3,2];
    numbers.forEach(number => {
        number == 1 || number == 4 || number == 7 ? (
            result = result + "L",
            lCurr = dir[number]
        ) : (
        number == 3 || number == 6 || number == 9 ? (
            result = result + "R",
            rCurr = dir[number]
        ) : (
            result = result + whoIsClose(dir[number],lCurr,rCurr,hand),
            whoIsClose(dir[number],lCurr,rCurr,hand) == "L" ? lCurr = dir[number] : rCurr = dir[number]
            
            
        )
        )
    });
    return result
}