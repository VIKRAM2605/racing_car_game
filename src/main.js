import { initLanes } from "./car.js";
import { gameLoop, initPlayer } from "./character.js";
import { initRoadPos, initSheet } from "./scene.js";

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

export let isGameRunning = true;

export const playerSpriteSheet1 = new Image();
playerSpriteSheet1.src = "assets/Cars/Player_blue.png";

export const playerSpriteSheet2 = new Image();
playerSpriteSheet2.src = "assets/Cars/Player_red.png";

export const playerSpriteSheet3 = new Image();
playerSpriteSheet3.src = "assets/Cars/Player_yellow.png";

export const summerRoadSpriteSheet = new Image();
summerRoadSpriteSheet.src = "assets/Levels/Summer_road.png";

export const summerGasStationSpriteSheet = new Image();
summerGasStationSpriteSheet.src = "assets/Levels/Summer_gas_station.png";

export const summerDetailsSpriteSheet = new Image();
summerDetailsSpriteSheet.src = "assets/Levels/Summer_details.png";

export const npcSpriteSheet = new Image();
npcSpriteSheet.src = "assets/Cars/NPC_cars.png"

export const keys = {
    up: false,
    right: false,
    left: false,
    down: false,
    shift: false,
}

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
};

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener("resize", () => {
    resizeCanvas();
});

let loadedCount = 0;
const imageCount = 7;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        console.log("success");
        requestAnimationFrame(gameLoop);
    }
};

document.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup': keys.up = true; return;
        case 's':
        case ' ':
        case 'arrowdown': keys.down = true; return;
        case 'a':
        case 'arrowleft': keys.left = true; return;
        case 'd':
        case 'arrowright': keys.right = true; return;
        case 'shift': keys.shift = true; return;
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup': keys.up = false; return;
        case 's':
        case ' ':
        case 'arrowdown': keys.down = false; return;
        case 'a':
        case 'arrowleft': keys.left = false; return;
        case 'd':
        case 'arrowright': keys.right = false; return;
        case 'shift': keys.shift = false; return;
    }
});


resizeCanvas();
initPlayer();
initSheet();
initRoadPos();
initLanes();

playerSpriteSheet1.onload = onImageLoad;
playerSpriteSheet2.onload = onImageLoad;
playerSpriteSheet3.onload = onImageLoad;
summerDetailsSpriteSheet.onload = onImageLoad;
summerRoadSpriteSheet.onload = onImageLoad;
summerGasStationSpriteSheet.onload = onImageLoad;
npcSpriteSheet.onload = onImageLoad;