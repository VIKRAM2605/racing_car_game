import { initCars } from "./car.js";
import { drawPlayer, gameLoop, initPlayer, keys, playerSpriteSheet } from "./character.js";
import { loadStartPage } from "./startpage.js";
import { initWallet } from "./wallet.js";

export const roadSpriteSheet = new Image();
roadSpriteSheet.src = "assets/road.svg";

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

export let isGameRunning = false; 

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
    initPlayer();
};

playerSpriteSheet.onload = drawPlayer;

window.addEventListener("resize", () => {
    resizeCanvas();
});

resizeCanvas();
initPlayer();
initCars();
initWallet(100);
loadStartPage();

let loadedCount = 0;
const imageCount = 2;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        console.log("success");
    }
};

document.addEventListener('keydown', (e) => {
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

playerSpriteSheet.onload = onImageLoad;
roadSpriteSheet.onload = onImageLoad;
