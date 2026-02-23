import { canvas, ctx } from "./main.js";

export const playerSpriteSheet = new Image();
playerSpriteSheet.src = "assets/bk_cars1.a.png";

export const player = {
    x: 0,
    y: 0,
    speed: 1,
    isDead: false,
    nitro: 0,
}

export const keys = {
    up: false,
    left: false,
    right: false,
    down: false,
}

export const playerSprite = { x: 297, y: 347, w: 39, h: 83 };

let lastTime = 0;


export function updatePlayer() {
    let moveY = 0;
    let moveX = 0;

    if (keys.up) {
        moveY -= 1;
    }
    if (keys.down) {
        moveY += 1;
    }
    if (keys.right) {
        moveX += 1;
    }
    if (keys.left) {
        moveX -= 1;
    }
    if (keys.right && keys.up) {
        moveX *= Math.SQRT2 / 2;
        moveY *= Math.SQRT2 / 2;
    }
    if (keys.left && keys.up) {
        moveX *= Math.SQRT2 / 2;
        moveY *= Math.SQRT2 / 2;
    }
    if (keys.right && keys.down) {
        moveX *= Math.SQRT2 / 2;
        moveY *= Math.SQRT2 / 2;
    }
    if (keys.left && keys.down) {
        moveX *= Math.SQRT2 / 2;
        moveY *= Math.SQRT2 / 2;
    }

    player.x += moveX * player.speed;
    player.y += moveY * player.speed;
};

export function drawPlayer() {
    ctx.drawImage(
        playerSpriteSheet,
        playerSprite.x, playerSprite.y, playerSprite.w, playerSprite.h,
        player.x, player.y, playerSprite.w, playerSprite.h
    )
}



export function gameLoop(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;
    updatePlayer();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}