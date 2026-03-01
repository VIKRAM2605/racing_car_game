import { player, playerSprite } from "./character.js";
import { health } from "./health.js";
import { canvas, carrotSpriteSheet, cherrySpriteSheet, ctx, damageSpriteSheet, fuelBarSpriteSheet, fullSpriteSheet, lemonSpriteSheet, numbersSpriteSheet, playerIndicatorSpriteSheet, randomInt, slimeSpriteSheet } from "./main.js";
import { damageSprite, numbers, playerIcons, scale, ui } from "./SpriteCoordinates.js";

export let currentPlayerIcon = "lemon";

let animationSpeed = 0.3;
let totalFrames = 3;
let currentFrame = 0;

let displaySpeed = 0;

const playerIconArray = ["lemon", "cherry", "slime", "carrot"];

export let playerIconSheetMap;

export function initPlayerIconSheet() {
    playerIconSheetMap = {
        "lemon": lemonSpriteSheet,
        "cherry": cherrySpriteSheet,
        "slime": slimeSpriteSheet,
        "carrot": carrotSpriteSheet
    };
}

export function randomPlayerIcon() {
    currentPlayerIcon = playerIconArray[randomInt(0, playerIconArray.length - 1)];
}

export function drawFullUI(delta) {
    mainUI();
    drawPlayerIndicator();
    drawPlayerIcon(delta);
    drawSpeed();
    drawFuelBar();
    drawHealth();
};

export function mainUI() {
    const sprite = ui["full"];
    ctx.drawImage(
        fullSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        canvas.width / window.devicePixelRatio - sprite.sw, 0, sprite.sw, canvas.height / window.devicePixelRatio
    )
};

export function drawPlayerIndicator() {
    const sprite = ui["playerIndicator"];
    ctx.drawImage(
        playerIndicatorSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        player.x + (playerSprite[player.currentFacing].sw / 2) - (sprite.sw / 2) - scale * 0.3, player.y - scale * 11, sprite.sw, sprite.sh
    );
};

export function drawPlayerIcon(delta) {
    const sprite = playerIcons[currentPlayerIcon];
    const currentSprite = sprite[currentFrame];
    const sheet = playerIconSheetMap[currentPlayerIcon];
    ctx.drawImage(
        sheet,
        currentSprite.x, currentSprite.y, currentSprite.w, currentSprite.h,
        canvas.width / window.devicePixelRatio - ui["full"].sw + ui["full"].sw / 2 - currentSprite.sw / 2, (canvas.height / window.devicePixelRatio) * 0.15, currentSprite.sw, currentSprite.sh
    );
    animationSpeed -= delta;
    if (animationSpeed <= 0) {
        animationSpeed = 0.3;
        currentFrame = (currentFrame + 1) % totalFrames;
    }
};

export function drawSpeed() {
    displaySpeed += (player.speed - displaySpeed) * 1
    const speedInString = Math.floor(displaySpeed).toString();

    const uiX = canvas.width / window.devicePixelRatio - ui["full"].sw;
    const height = (canvas.height / window.devicePixelRatio) * 0.50;

    let totalW = 0;

    for (let i = 0; i < speedInString.length; i++) {
        totalW += numbers[speedInString[i]].sw
    }

    ctx.fillStyle = "#141414";
    ctx.fillRect(uiX, height - scale, ui["full"].sw, numbers["0"].sh + scale * 3.5);

    let currentX = uiX + (ui["full"].sw / 2) - (totalW) / 2;

    for (let i = 0; i < speedInString.length; i++) {
        const sprite = numbers[speedInString[i]];
        ctx.drawImage(
            numbersSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            currentX, height, sprite.sw, sprite.sh
        );
        currentX += sprite.sw - 1;
    }
};

export function drawFuelBar() {
    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;
    const sprite = ui["fuelBar"];

    const drawnW = ui["full"].sw * 0.19;
    const drawnH = sprite.sh * 1.55;

    const uiX = screenW - ui["full"].sw;

    const drawX = uiX + ui["full"].sw - drawnW - ui["full"].sw * 0.155;
    const drawY = screenH - drawnH * 1.21;

    const filledH = drawnH * player.fuel;
    const filledSrcH = sprite.h * player.fuel;

    ctx.drawImage(
        fuelBarSpriteSheet,
        sprite.x, sprite.y, sprite.w, filledSrcH,
        drawX, drawY + (drawnH - filledH), drawnW, filledH
    );

};

export function drawHealth() {

    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;

    const uiX = screenW - ui["full"].sw;

    let drawX = uiX + ui["full"].sw * 0.2;
    const drawY = screenH * 0.38;

    ctx.fillStyle = "#141414";
    ctx.fillRect(uiX, screenH * 0.36, ui["full"].sw, damageSprite["1"].sh + scale * 6)

    for (let i = 0; i < health.length; i++) {
        const sprite = damageSprite[health[i].toString()];
        const offset = (damageSprite["1"].sh - sprite.sh) / 2;
        ctx.drawImage(
            damageSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            drawX, drawY + offset, sprite.sw, sprite.sh
        );
        drawX += sprite.sw + scale * 3;
    }
};

console.log(window.innerWidth, window.innerHeight)