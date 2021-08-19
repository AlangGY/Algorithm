function solution(absolutes, signs) {
    let result = 0
    signs.forEach((e,i)=>{
        e ? result += absolutes[i] : result -= absolutes[i]
    });
    return result
}

// best Time : 0.09ms
// worst Time : 0.18ms