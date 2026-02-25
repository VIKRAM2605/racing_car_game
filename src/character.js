import { drawCar, spawnCar, updateCars } from "./car.js";
import { collisionCheck } from "./collision.js";
import { canvas, ctx } from "./main.js";
import { drawRoad, drawScene, roadSprite, updateRoad, updateScene } from "./scene.js";

export const playerSpriteSheet = new Image();
playerSpriteSheet.src = "assets/bk_cars1.a.png";

export const player = {
    x: 0,
    y: 0,
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

export const pseudoPos = {
    x: 0,
    y: 0,
}

export function initPlayer() {
    player.x = canvas.width / window.devicePixelRatio / 2 - roadSprite.w * 0.7 + playerSprite.w * 2;
    player.y = canvas.height / window.devicePixelRatio - playerSprite.h * 2 - 40;
    pseudoPos.x = canvas.width / window.devicePixelRatio / 2 - roadSprite.w * 0.7 + playerSprite.w * 2;
    pseudoPos.y = canvas.height / window.devicePixelRatio - playerSprite.h * 2 - 40;
}

export const playerSprite = { x: 297, y: 347, w: 39, h: 83 };

let lastTime = 0;
let angle = 0;

export function updatePlayer(delta) {
    // this function like this constant pace for the player movement acceleration 
    // right and left should be a curve not a x shift alone.
    // and this function just want to calculate the sudo position of the car and not move the actual position.
    // for now testing purpose i am moving the car/player.
    // no brake/deacceleration in this game.
    // learned maths hahah
    const turnRate = 20 * delta;
    const returnRate = 25 * delta;
    const maxAngle = 25;

    if (keys.up) {
        player.speed += 0.5 * delta;
        if (player.speed > player.maxSpeed) player.speed = player.maxSpeed
    } else {
        player.speed -= 0.5 * delta;
        if (player.speed < 0.5) player.speed = 0.5;
    }
    if (keys.down) {
        player.speed -= 0.5 * delta;
        if (player.speed < 0.5) player.speed = 0.5;
    }

    if (keys.left) {
        angle -= turnRate;
        if (angle < -maxAngle) angle = -maxAngle;
    }
    else if (keys.right) {
        angle += turnRate;
        if (angle > maxAngle) angle = maxAngle;
    } else {
        if (angle > 0) {
            angle -= returnRate;
            if (angle < 0) angle = 0
        } else if (angle < 0) {
            angle += returnRate;
            if (angle > 0) angle = 0;
        }
    }

    let rad = angle * Math.PI / 180;

    let moveX = Math.sin(rad);
    let moveY = -Math.cos(rad);

    let pseudoX = player.x + (moveX * player.speed);
    let pseudoY = player.y + (moveY * player.speed);

    player.x = pseudoX;
    //player.y = pseudoY;

    // if (player.y < 0) player.y = 0
    // if (player.y > canvas.height - playerSprite.w) player.y = canvas.height - playerSprite.w;

    // if first road is roadX then the second road is roadX + road width + road width - offset to check whether the car is hitting it or not

    let roadXLeft = canvas.width / window.devicePixelRatio / 2 - roadSprite.w * 0.7;
    let roadXRight = canvas.width / window.devicePixelRatio / 2 + roadSprite.w * 0.7;

    if (player.x <= roadXLeft + playerSprite.w * 2) player.x = roadXLeft + playerSprite.w * 2;
    if (player.x >= roadXRight - playerSprite.w * 4) player.x = roadXRight - playerSprite.w * 4;
};

export function drawPlayer() {
    ctx.imageSmoothingEnabled = false;
    ctx.save();
    ctx.translate(player.x + playerSprite.w / 2, player.y + playerSprite.h / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(
        playerSpriteSheet,
        playerSprite.x, playerSprite.y, playerSprite.w, playerSprite.h,
        -playerSprite.w / 2, -playerSprite.h / 2, playerSprite.w * 2, playerSprite.h * 2
    );
    ctx.restore();
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(player.x, player.y, playerSprite.w * 2, playerSprite.h * 2);
}

export function gameLoop(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

    drawRoad();

    spawnCar(delta);

    updateCars(delta);
    updateScene();
    updatePlayer(delta);
    updateRoad(delta);

    drawScene();
    drawCar();
    drawPlayer();

    const check = collisionCheck();
    if(check){
        console.log("hit");
    }

    requestAnimationFrame(gameLoop);
}