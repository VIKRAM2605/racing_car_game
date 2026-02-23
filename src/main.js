import { drawPlayer, gameLoop, keys, playerSpriteSheet } from "./character.js";

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr,dpr);
}

playerSpriteSheet.onload = drawPlayer;

window.addEventListener("resize", () => {
    resizeCanvas();
})
resizeCanvas();

function imageLoaded() {
    let imageCount = 1;
    let loadedCount = 0;

    if (playerSpriteSheet.onload) {
        loadedCount += 1;
    }

    return imageCount === loadedCount;
}

function startGame() {
    const check = imageLoaded();
    if (check) {
        requestAnimationFrame(gameLoop);
    } else {
        console.log("game assets not yet loaded");
    }
}

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup': keys.up = true; return;
        case 'a':
        case 'arrowleft': keys.left = true; return;
        case 's':
        case 'arrowdown': keys.down = true; return;
        case 'd':
        case 'arrowright': keys.right = true; return;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup': keys.up = false; return;
        case 'a':
        case 'arrowleft': keys.left = false; return;
        case 's':
        case 'arrowdown': keys.down = false; return;
        case 'd':
        case 'arrowright': keys.right = false; return;
    }
});

startGame();