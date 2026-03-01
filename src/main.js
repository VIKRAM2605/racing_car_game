import { initLanes } from "./car.js";
import { gameLoop, initPlayer } from "./character.js";
import { initRoadPos, initSheet } from "./scene.js";
import { initPlayerIconSheet } from "./ui.js";

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

export const summerDetails1SpriteSheet = new Image();
summerDetails1SpriteSheet.src = "assets/Levels/Summer_details1.png";

export const summerDetails2SpriteSheet = new Image();
summerDetails2SpriteSheet.src = "assets/Levels/Summer_details2.png";

export const summerDetails3SpriteSheet = new Image();
summerDetails3SpriteSheet.src = "assets/Levels/Summer_details3.png";

export const summerDetails4SpriteSheet = new Image();
summerDetails4SpriteSheet.src = "assets/Levels/Summer_details4.png";

export const npcSpriteSheet = new Image();
npcSpriteSheet.src = "assets/Cars/NPC_cars.png";

export const fullSpriteSheet = new Image();
fullSpriteSheet.src = "assets/UI/Main_UI.png";

export const damageSpriteSheet = new Image();
damageSpriteSheet.src = "assets/UI/Damage_indicator.png";

export const fuelBarSpriteSheet = new Image();
fuelBarSpriteSheet.src = "assets/UI/Fuel_bar.png";

export const playerIndicatorSpriteSheet = new Image();
playerIndicatorSpriteSheet.src = "assets/UI/Player_arrow_indicator.png";

export const numbersSpriteSheet = new Image();
numbersSpriteSheet.src = "assets/UI/Speed_indicator_numbers.png";

export const carrotSpriteSheet = new Image();
carrotSpriteSheet.src = "assets/Player_icons/Carrot.png";

export const cherrySpriteSheet = new Image();
cherrySpriteSheet.src = "assets/Player_icons/Cherry.png";

export const lemonSpriteSheet = new Image();
lemonSpriteSheet.src = "assets/Player_icons/Lemon.png";

export const slimeSpriteSheet = new Image();
slimeSpriteSheet.src = "assets/Player_icons/slime.png";

export const obstaclesSpriteSheet = new Image();
obstaclesSpriteSheet.src = "assets/Props/Misc_props.png";

export const stationMarkingSpriteSheet = new Image();
stationMarkingSpriteSheet.src = "assets/Props/Road_markings.png"
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
const imageCount = 22;

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
initPlayerIconSheet();

playerSpriteSheet1.onload = onImageLoad;
playerSpriteSheet2.onload = onImageLoad;
playerSpriteSheet3.onload = onImageLoad;
summerDetailsSpriteSheet.onload = onImageLoad;
summerDetails1SpriteSheet.onload = onImageLoad;
summerDetails2SpriteSheet.onload = onImageLoad;
summerDetails3SpriteSheet.onload = onImageLoad;
summerDetails4SpriteSheet.onload = onImageLoad;
summerRoadSpriteSheet.onload = onImageLoad;
summerGasStationSpriteSheet.onload = onImageLoad;
npcSpriteSheet.onload = onImageLoad;
damageSpriteSheet.onload = onImageLoad;
fuelBarSpriteSheet.onload = onImageLoad;
fullSpriteSheet.onload = onImageLoad;
playerIndicatorSpriteSheet.onload = onImageLoad;
numbersSpriteSheet.onload = onImageLoad;
carrotSpriteSheet.onload = onImageLoad;
lemonSpriteSheet.onload = onImageLoad;
slimeSpriteSheet.onload = onImageLoad;
cherrySpriteSheet.onload = onImageLoad;
obstaclesSpriteSheet.onload = onImageLoad;
stationMarkingSpriteSheet.onload = onImageLoad;