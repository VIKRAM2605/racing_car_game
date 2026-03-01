import { player, playerSprite } from "./character.js";
import { canvas, carrotSpriteSheet, cherrySpriteSheet, ctx, fullSpriteSheet, lemonSpriteSheet, playerIndicatorSpriteSheet, randomInt, slimeSpriteSheet } from "./main.js";
import { playerIcons, ui } from "./SpriteCoordinates.js";

export let currentPlayerIcon = "lemon";

let animationSpeed = 0.2;
let totalFrames = 3;
let currentFrame = 0;

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
        player.x + (playerSprite[player.currentFacing].sw / 2) - (sprite.sw / 2) - 1, player.y - 30, sprite.sw, sprite.sh
    );
};

export function drawPlayerIcon(delta) {
    const sprite = playerIcons[currentPlayerIcon];
    console.log(sprite);
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