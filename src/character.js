import { ctx } from "./main.js";

export const playerSpriteSheet = new Image();
playerSpriteSheet.src = "assets/bk_cars1.a.png";

export const player = {
    x: 0,
    y: 0,
    speed: 0,
    isDead: false,
    nitro: 0,
}

export const playerSprite = { x: 297, y: 347, w: 39, h: 83 };

let lastTime = 0;


export function updatePlayer() {

};

export function drawPlayer() {
    ctx.drawImage(
        playerSpriteSheet,
        playerSprite.x, playerSprite.y, playerSprite.w, playerSprite.h,
        0, 0, playerSprite.w, playerSprite.h
    )
}



export function gameLoop(currentTime) {
    const delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

}