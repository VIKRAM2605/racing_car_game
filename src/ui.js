import { player, playerSprite } from "./character.js";
import { canvas, carrotSpriteSheet, cherrySpriteSheet, ctx, fullSpriteSheet, lemonSpriteSheet, numbersSpriteSheet, playerIndicatorSpriteSheet, randomInt, slimeSpriteSheet } from "./main.js";
import { numbers, playerIcons, ui } from "./SpriteCoordinates.js";

export let currentPlayerIcon = "lemon";

let animationSpeed = 0.2;
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
        player.x + (playerSprite[player.currentFacing].sw / 2) - (sprite.sw / 2) - 1, player.y - 35, sprite.sw, sprite.sh
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
        animationSpeed = 0.2;
        currentFrame = (currentFrame + 1) % totalFrames;
    }
};

export function drawSpeed() {
    displaySpeed +=(player.speed - displaySpeed) * 1
    const speedInString = Math.floor(displaySpeed).toString();

    const uiX = canvas.width / window.devicePixelRatio - ui["full"].sw;
    const height = (canvas.height / window.devicePixelRatio) * 0.500;

    let totalW = 0;

    for (let i = 0; i < speedInString.length; i++) {
        totalW += numbers[speedInString[i]].sw
    }

    ctx.fillStyle = "#141414";
    ctx.fillRect(uiX, height, ui["full"].sw, 8 * 4.5);

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
}