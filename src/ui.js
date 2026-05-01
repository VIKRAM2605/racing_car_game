import { player, playerSprite } from "./character.js";
import { health } from "./health.js";
import { canvas, carrotSpriteSheet, cherrySpriteSheet, ctx, damageSpriteSheet, fuelBarSpriteSheet, fullSpriteSheet, gameOverSpriteSheet, isDead, lemonSpriteSheet, numbersSpriteSheet, playerIndicatorSpriteSheet, randomInt, scale, slimeSpriteSheet } from "./main.js";
import { damageSprite, gameOverSprite, numbers, playerIcons, ui } from "./SpriteCoordinates.js";

export let currentPlayerIcon = "lemon";

let animationSpeed = 0.3;
let totalFrames = 3;
let currentFrame = 0;

let displaySpeed = 0;

const playerIconArray = ["lemon", "cherry", "slime", "carrot"];

export let playerIconSheetMap;

let uiScale;

export function initPlayerIconSheet() {
    playerIconSheetMap = {
        "lemon": lemonSpriteSheet,
        "cherry": cherrySpriteSheet,
        "slime": slimeSpriteSheet,
        "carrot": carrotSpriteSheet
    };

    uiScale = scale * 2;
}

export function randomPlayerIcon() {
    currentPlayerIcon = playerIconArray[randomInt(0, playerIconArray.length - 1)];
}

export function drawFullUI(delta) {
    mainUI();
    if (!isDead) drawPlayerIndicator();
    drawPlayerIcon(delta);
    drawSpeed();
    drawFuelBar();
    drawHealth();
};

export function mainUI() {
    const sprite = ui["full"];
    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;
    ctx.drawImage(
        fullSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        screenW - sprite.w * uiScale, 0, sprite.w * uiScale, screenH
    )
};

export function drawPlayerIndicator() {
    const sprite = ui["playerIndicator"];
    ctx.drawImage(
        playerIndicatorSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        player.x + (playerSprite[player.currentFacing].w * scale / 2) - (sprite.w * scale / 2) - scale * 0.3, player.y - scale * 11, sprite.w * scale, sprite.h * scale
    );
};

export function drawPlayerIcon(delta) {

    const sprite = playerIcons[currentPlayerIcon];
    const currentSprite = sprite[currentFrame];
    const sheet = playerIconSheetMap[currentPlayerIcon];
    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;

    const uiX = screenW - ui["full"].w * uiScale;
    const uiCx = uiX + (ui["full"].w * uiScale) / 2;

    ctx.drawImage(
        sheet,
        currentSprite.x, currentSprite.y, currentSprite.w, currentSprite.h,
        uiCx - (currentSprite.w * uiScale) / 2, screenH * 0.15, currentSprite.w * uiScale, currentSprite.h * uiScale
    );

    animationSpeed -= delta;
    if (animationSpeed <= 0) {
        animationSpeed = 0.3;
        currentFrame = (currentFrame + 1) % totalFrames;
    }
};

export function drawSpeed() {

    const screenW = (canvas.width / window.devicePixelRatio);
    const screenH = (canvas.height / window.devicePixelRatio);

    const uiX = screenW - (ui["full"].w * uiScale);
    const uiCx = uiX + (ui["full"].w * uiScale) / 2;

    displaySpeed += (player.speed - displaySpeed) * 1;
    const speedInString = Math.floor(displaySpeed).toString();

    let totalW = 0;

    for (let i = 0; i < speedInString.length; i++) {
        totalW += (numbers[speedInString[i]].w * uiScale);
    }

    const drawY = screenH * 0.5;

    ctx.fillStyle = "#141414";
    ctx.fillRect(uiX, drawY - uiScale, ui["full"].w * uiScale, numbers["0"].h * uiScale + uiScale * 3.5);

    let currentX = uiCx - totalW / 2;

    for (let i = 0; i < speedInString.length; i++) {
        const sprite = numbers[speedInString[i]];
        ctx.drawImage(
            numbersSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            currentX, drawY, sprite.w * uiScale, sprite.h * uiScale
        );
        currentX += (sprite.w * uiScale - 1);
    }
};

export function drawFuelBar() {
    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;
    const sprite = ui["fuelBar"];
    const uiX = screenW - ui["full"].w * uiScale;


    const drawnW = ui["full"].w * uiScale * 0.19;
    const drawnH = screenH * 0.289;

    const drawX = uiX + ui["full"].w * uiScale - drawnW - ui["full"].w * uiScale * 0.155;
    const drawY = screenH * 0.65;

    const srcH = sprite.h * player.fuel;
    const dstH = drawnH * player.fuel;

    ctx.drawImage(
        fuelBarSpriteSheet,
        sprite.x, sprite.y, sprite.w, srcH,
        drawX, drawY + (drawnH - dstH), drawnW, dstH
    );

};

export function drawHealth() {

    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;

    const uiX = screenW - ui["full"].w * uiScale;
    const uiCx = uiX + (ui["full"].w * uiScale) / 2;

    const totalHealthW = health.reduce((sum, h) => sum + damageSprite[h.toString()].w * uiScale + uiScale * 3, 0);
    let drawX = uiCx - totalHealthW / 2;
    const drawY = screenH * 0.38;

    ctx.fillStyle = "#141414";
    ctx.fillRect(uiX, drawY - uiScale * 4, ui["full"].w * uiScale, damageSprite["1"].h * uiScale + uiScale * 6)

    for (let i = 0; i < health.length; i++) {
        const sprite = damageSprite[health[i].toString()];
        const offset = (damageSprite["1"].h * uiScale - sprite.h * uiScale) / 2;
        ctx.drawImage(
            damageSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            drawX, drawY + offset, sprite.w * uiScale, sprite.h * uiScale
        );
        drawX += sprite.w * uiScale + uiScale * 3;
    }
};

export function drawIsDeadTitle(delta) {
    const screenW = canvas.width / window.devicePixelRatio;
    const screenH = canvas.height / window.devicePixelRatio;

    ctx.drawImage(
        gameOverSpriteSheet,
        gameOverSprite.x, gameOverSprite.y, gameOverSprite.w, gameOverSprite.h,
        screenW / 2 - (gameOverSprite.w * scale) / 2, screenH / 2 - (gameOverSprite.h * scale) / 2,
        gameOverSprite.w * scale, gameOverSprite.h * scale
    );
}