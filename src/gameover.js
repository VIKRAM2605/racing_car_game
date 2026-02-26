export let isGameOver = false;
let lastTime = 0;
let animationId = null;

export function gameOverPage(currentTime) {
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;
    drawGameOverScene();
    animationId = requestAnimationFrame(gameOverPage)
};

export function stopGameOverPage() {
    cancelAnimationFrame(animationId);
    animationId = null;
};

export function drawGameOverScene() {

};

export function setGameOver(){
    isGameOver = true;
    drawGameOverScene();
};

export function resetGameOver(){
    isGameOver = false;
    stopGameOverPage();
};