import { initLanes, resetCars } from "./car.js";
import { gameLoop, initPlayer, resetPlayer } from "./character.js";
import { resetHealth } from "./health.js";
import { initRoadPos, initSheet, resetScene } from "./scene.js";
import { startBgMusic, startEngine } from "./sound.js";
import { activeCar, activeScenes, clearIsActiveButton, isActiveButton, isClickOnCar, isClickOnCloseButton, isClickOnColorButton, isClickOnGuideButton, isClickOnScene, isClickOnSceneButton, isClickOnScoreButton, isClickOnStartButton, pos, startPage, startPageLoop, stopStartPageLoop } from "./startpage.js";
import { initPlayerIconSheet } from "./ui.js";

const PixelFont = new FontFace("PixelFont", "url(assets/Text/04B_03__.TTF)");
PixelFont.load().then(f => { document.fonts.add(f); onImageLoad(); });

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

export let isGameRunning = false;
export let isDead = false;

export const playerSpriteSheet1 = new Image();
playerSpriteSheet1.src = "assets/Cars/Player_blue.png";

export const playerSpriteSheet2 = new Image();
playerSpriteSheet2.src = "assets/Cars/Player_red.png";

export const playerSpriteSheet3 = new Image();
playerSpriteSheet3.src = "assets/Cars/Player_yellow.png";

export const playerSpriteSheet4 = new Image();
playerSpriteSheet4.src = "assets/Cars/Player_green.png";

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

export const winterRoadSpriteSheet = new Image();
winterRoadSpriteSheet.src = "assets/Levels/Winter_road.png";

export const winterGasStationSpriteSheet = new Image();
winterGasStationSpriteSheet.src = "assets/Levels/Winter_gas_station.png";

export const winterDetailsSpriteSheet = new Image();
winterDetailsSpriteSheet.src = "assets/Levels/Winter_details.png";

export const winterDetails1SpriteSheet = new Image();
winterDetails1SpriteSheet.src = "assets/Levels/Winter_details1.png";

export const winterDetails2SpriteSheet = new Image();
winterDetails2SpriteSheet.src = "assets/Levels/Winter_details2.png";

export const winterDetails3SpriteSheet = new Image();
winterDetails3SpriteSheet.src = "assets/Levels/Winter_details3.png";

export const winterDetails4SpriteSheet = new Image();
winterDetails4SpriteSheet.src = "assets/Levels/Winter_details4.png";

export const desertRoadSpriteSheet = new Image();
desertRoadSpriteSheet.src = "assets/Levels/Desert_road.png";

export const desertGasStationSpriteSheet = new Image();
desertGasStationSpriteSheet.src = "assets/Levels/Desert_gas_station.png";

export const desertDetailsSpriteSheet = new Image();
desertDetailsSpriteSheet.src = "assets/Levels/Desert_details.png";

export const desertDetails1SpriteSheet = new Image();
desertDetails1SpriteSheet.src = "assets/Levels/Desert_details1.png";

export const desertDetails2SpriteSheet = new Image();
desertDetails2SpriteSheet.src = "assets/Levels/Desert_details2.png";

export const desertDetails3SpriteSheet = new Image();
desertDetails3SpriteSheet.src = "assets/Levels/Desert_details3.png";

export const desertDetails4SpriteSheet = new Image();
desertDetails4SpriteSheet.src = "assets/Levels/Desert_details4.png";

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
slimeSpriteSheet.src = "assets/Player_icons/Slime.png";

export const obstaclesSpriteSheet = new Image();
obstaclesSpriteSheet.src = "assets/Props/Misc_props.png";

export const stationMarkingSpriteSheet = new Image();
stationMarkingSpriteSheet.src = "assets/Props/Road_markings.png";

export const buttonsSpriteSheet = new Image();
buttonsSpriteSheet.src = "assets/UI/Race_progress.png";

export const gameOverSpriteSheet = new Image();
gameOverSpriteSheet.src = "assets/UI/Game_over.png";

export const guiSpriteSheet = new Image();
guiSpriteSheet.src = "assets/UI/SpriteSheet.png";

export const keys = {
    up: false,
    right: false,
    left: false,
    down: false,
    shift: false,
};

const PIXEL_SIZE = 3;
const SCALE_FACTOR = 0.5;

export let scale = PIXEL_SIZE;
export let nativeWidth = 320;
export let nativeHeight = 220;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    // const rawScale = Math.min(
    //     window.innerWidth / 320,
    //     window.innerHeight / 180
    // ) * SCALE_FACTOR;

    scale = Math.max(1, Math.round(Math.min(
        window.innerWidth / 320,
        window.innerHeight / 220
    ) * SCALE_FACTOR));

    // scale = Math.max(1, rawScale % 1 >= 0.65
    //     ? Math.ceil(rawScale)
    //     : Math.floor(rawScale)
    // );

    nativeWidth = Math.floor(window.innerWidth / scale);
    nativeHeight = Math.floor(window.innerHeight / scale);

    const cssW = nativeWidth * scale;
    const cssH = nativeHeight * scale;

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);

    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.style.position = 'absolute';
    canvas.style.left = Math.floor((window.innerWidth - cssW) / 2) + 'px';
    canvas.style.top = Math.floor((window.innerHeight - cssH) / 2) + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener("resize", () => {
    resizeCanvas();
});

let loadedCount = 0;
const imageCount = 41;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        requestAnimationFrame(startPageLoop);
    }
};

export function getCurrentMousePos(e) {

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;

    const scaleX = canvas.width / dpr / rect.width;
    const scaleY = canvas.height / dpr / rect.height;

    return {
        x: cssX * scaleX,
        y: cssY * scaleY
    }

};

export function resetIsDead() {
    isDead = false;
};

export function setIsDead() {
    isDead = true;
};

export function setIsGameRunning() {
    isGameRunning = true;
};

export function resetIsGameRunning() {
    isGameRunning = false;
}

export function resetAll() {
    resetCars();
    resetPlayer();
    resetHealth();
    resetScene();
    initRoadPos();
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

document.addEventListener("click", (e) => {
    const mousePos = getCurrentMousePos(e);

    if (isClickOnStartButton(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {

        isActiveButton[0] = "start";

        stopStartPageLoop();
        setIsGameRunning();
        resetAll();
        startEngine();
        requestAnimationFrame(gameLoop);
    }
    if (isClickOnSceneButton(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        isActiveButton[0] = "Scene";
        return;
    }
    if (isClickOnColorButton(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        isActiveButton[0] = "Cars";
        return;
    }
    if (isClickOnGuideButton(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        isActiveButton[0] = "Guide";
        return;
    }
    if (isClickOnScoreButton(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        isActiveButton[0] = "Score";
        return;
    }
    if (isClickOnCar(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        return;
    }
    if (isClickOnScene(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        return;
    }
    
    if (isClickOnCloseButton(mousePos.x, mousePos.y) && !isGameRunning && !isDead) {
        clearIsActiveButton();
        return;
    }
    startBgMusic();
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
playerSpriteSheet4.onload = onImageLoad;
summerDetailsSpriteSheet.onload = onImageLoad;
summerDetails1SpriteSheet.onload = onImageLoad;
summerDetails2SpriteSheet.onload = onImageLoad;
summerDetails3SpriteSheet.onload = onImageLoad;
summerDetails4SpriteSheet.onload = onImageLoad;
summerRoadSpriteSheet.onload = onImageLoad;
summerGasStationSpriteSheet.onload = onImageLoad;
winterRoadSpriteSheet.onload = onImageLoad;
winterGasStationSpriteSheet.onload = onImageLoad;
winterDetailsSpriteSheet.onload = onImageLoad;
winterDetails1SpriteSheet.onload = onImageLoad;
winterDetails2SpriteSheet.onload = onImageLoad;
winterDetails3SpriteSheet.onload = onImageLoad;
winterDetails4SpriteSheet.onload = onImageLoad;
desertRoadSpriteSheet.onload = onImageLoad;
desertGasStationSpriteSheet.onload = onImageLoad;
desertDetailsSpriteSheet.onload = onImageLoad;
desertDetails1SpriteSheet.onload = onImageLoad;
desertDetails2SpriteSheet.onload = onImageLoad;
desertDetails3SpriteSheet.onload = onImageLoad;
desertDetails4SpriteSheet.onload = onImageLoad;
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
buttonsSpriteSheet.onload = onImageLoad;
gameOverSpriteSheet.onload = onImageLoad;
guiSpriteSheet.onload = onImageLoad;