export const player = {
    x: 0,
    y: 0,
    speed: 0.5,
    isDead: false,
    nitro: 0,
    maxSpeed: 3,
};

export const keys = {
    up: false,
    left: false,
    right: false,
    down: false,
};

export const pseudoPos = {
    x: 0,
    y: 0,
};

export function initPlayer() {

};

let lastTime = 0;
export let angle = 0;
let animationId = null;

export function updatePlayer(delta) {

};

export function drawPlayer() {
    ctx.imageSmoothingEnabled = false;

};

export function gameLoop(currentTime) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

    animationId = requestAnimationFrame(gameLoop);
};

export function stopGameLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
};
