function solution(board, moves) {
    let newBoard = Array.from({length:board.length},()=>[])
    let popCount = 0
    let st = []
    // board를 세로위치로 재정렬
    board.forEach(e=> e.forEach((doll,idx)=>{
        doll !== 0 ? newBoard[idx].push(doll) : null
    }))
    // moves 위치의 인형이 존재할경우, 해당 array.splice(1)
    moves.forEach(idx=>{
        if (newBoard[idx-1].length > 0) {
            st[st.length-1] == newBoard[idx-1][0] ? (
                popCount += 2,
                st.pop()
            ) : (
                st.push(newBoard[idx-1][0]) 
            )
            newBoard[idx-1] = newBoard[idx-1].slice(1)
        }
        
    })
    return popCount
}

// best Time : 0.21ms
// worst Time : 0.74ms