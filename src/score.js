let score = 0;
let localStorageScore = localStorage.getItem("bestScore") ?? 0;


export function updateScore(value){
    score += value;
}

export function resetScore(value){
    score = 0;
}


export function drawScore(){
    
}