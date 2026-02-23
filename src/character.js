import { canvas, ctx } from "./main.js";
import { drawScene, updateScene } from "./scene.js";

export const playerSpriteSheet = new Image();
playerSpriteSheet.src = "assets/bk_cars1.a.png";

export const player = {
    x: 400,
    y: 500,
    speed: 0.5,
    isDead: false,
    nitro: 0,
    maxSpeed: 3,
}

export const keys = {
    up: false,
    left: false,
    right: false,
    down: false,
}

export const playerSprite = { x: 297, y: 347, w: 39, h: 83 };

let lastTime = 0;


export function updatePlayer(delta) {
    // update this function like this constant pace for the player movement acceleration, deacceleration 
    // right and left should be a curve not a x shift alone.
    // and this function just want to calculate the sudo position of the car and not move the actual position.
    // for now testing purpose i am moving the car/player.
    let moveY = 0;
    let moveX = 0;

    if (keys.up) {
        player.speed += 0.5 * delta;
        if (player.speed > player.maxSpeed) player.speed = player.maxSpeed
    } else {
        player.speed -= 0.5 * delta;
        if (player.speed < 0.5) player.speed = 0.5;
    }

    if (keys.up) moveY -= 1;
    if (keys.down) moveY += 1;
    if (keys.left) moveX -= 1;
    if (keys.right) moveX += 1;

    if (moveX !== 0 && moveY !== 0) {
        moveX *= Math.SQRT2 / 2;
        moveY *= Math.SQRT2 / 2;
    }

    player.x += moveX * player.speed;
    player.y += moveY * player.speed;

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
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
    updateScene();
    updatePlayer(delta);
    drawScene();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}