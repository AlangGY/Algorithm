const isDecimal = num => {
    for (let x= parseInt(num**0.5);x>1;x--){
        if (num % x ==0){
            return false
        }
    }
    return true
}

const combinations = (arr, n) => {
    const l = [];
    
    if (n==1) {
        return arr.map(e=>[e]);
    }
    arr.forEach((fixed,idx)=>{
        const rest = arr.slice(idx+1);
        const combination  = combinations(rest,n-1);
        const attached = combination.map((comb)=>[fixed,...comb]);
        l.push(...attached)
    })
    return l
}

function solution(nums) {
    const l = combinations(nums,3)
    let answer = 0
    l.forEach(e=>{
        e = e.reduce((a,b)=>a+b)
        isDecimal(e) ? answer++ : null;
    })
    return answer
}

// best Time : 0.40ms
// worst Time : 22.55ms