import { drawCars, spawnCars, updateCars } from "./car.js";
import { drawPlayerBox } from "./collision.js";
import { deductHealth } from "./health.js";
import { canvas, ctx, keys, playerSpriteSheet1 } from "./main.js";
import { drawObstacles, drawScene, getRoadBelowPlayer, posX, roads, spawnObstacles, updateDetails, updateObstacles, updateRoad } from "./scene.js";
import { player1Sprite, summer } from "./SpriteCoordinates.js";
import { drawFullUI } from "./ui.js";

export let defaultPlayerSheet;
export let playerSprite;
export let fuelDropTime = 1;
export let fuelCurrentTime = 0;

export let maxOffRoadTime = 3;
export let currentOffRoadTime = 0;

export const player = {
    x: 0,
    y: 0,
    speed: 100,
    isDead: false,
    nitro: 0,
    maxSpeed: 500,
    minSpeed: 50,
    idleSpeed: 100,
    currentFacing: 'up',
    fuel: 1,
};

export const pseudoPos = {
    x: 0,
    y: 0,
};

export function initPlayer() {
    defaultPlayerSheet = playerSpriteSheet1;
    playerSprite = player1Sprite;

    player.x = canvas.width / window.devicePixelRatio / 2 - (summer["road"].sw) / 2 + player1Sprite["up"].sw + 22;
    player.y = canvas.height / window.devicePixelRatio / 2 + 100;
};

export function resetPlayer() {
    player.speed = 100;
    player.isDead = false;
    player.fuel = 1;
}

let lastTime = 0;
export let angle = 0;
let animationId = null;

export function updatePlayer(delta) {

    let moveX = 0;
    let moveY = 0;

    let activeMaxSpeed = keys.shift && player.nitro > 0 ? player.maxSpeed + 75 : player.maxSpeed;

    fuelCurrentTime += delta;
    if (fuelCurrentTime >= fuelDropTime) {
        fuelCurrentTime -= fuelDropTime;
        if (player.speed > player.idleSpeed) player.fuel -= 0.03;
        else if (player.speed === player.idleSpeed) player.fuel -= 0.02;
        else player.fuel -= 0.01;
    }

    if (keys.up) {

        if (keys.shift && player.nitro > 0) {
            player.nitro -= delta * 50;

            if (player.nitro < 0) player.nitro = 0;
        }

        if (player.speed < activeMaxSpeed) {
            let acceleration = keys.shift ? 200 : 100;
            player.speed += delta * acceleration;

            if (player.speed > activeMaxSpeed) player.speed = activeMaxSpeed;
        }
        else if (player.speed > activeMaxSpeed) {
            player.speed -= delta * 100;
            if (player.speed < activeMaxSpeed) player.speed = activeMaxSpeed;
        }
    }
    else if (keys.down) {
        player.speed -= delta * 200;
        if (player.speed < player.minSpeed) player.speed = player.minSpeed;
    }
    else {
        if (player.speed > player.idleSpeed) {
            player.speed -= delta * 100;
            if (player.speed < player.idleSpeed) player.speed = player.idleSpeed;
        }
        else if (player.speed < player.idleSpeed) {
            player.speed += delta * 100;
            if (player.speed > player.idleSpeed) player.speed = player.idleSpeed;
        }
    };

    if (keys.up) moveY -= 1;
    if (keys.down) moveY += 1;
    if (keys.left) moveX -= 1;
    if (keys.right) moveX += 1;

    if (moveX === 1) {
        player.currentFacing = "upRight";
    }
    else if (moveX === -1) {
        player.currentFacing = "upLeft";
    }
    else {
        player.currentFacing = "up";
    }
    const road = getRoadBelowPlayer();
    const roadRight = posX + road.sw;

    if (player.x <= posX || player.x + playerSprite[player.currentFacing].sw >= roadRight) {
        currentOffRoadTime += delta;
        if (currentOffRoadTime >= maxOffRoadTime) {
            currentOffRoadTime -= maxOffRoadTime;
            deductHealth();
        }
    } else {
        currentOffRoadTime = 0;
    }

    let steeringSpeed = 150;

    player.x += moveX * steeringSpeed * delta;
};

export function drawPlayer() {
    ctx.imageSmoothingEnabled = false;
    const pos = playerSprite[player.currentFacing];
    ctx.drawImage(
        defaultPlayerSheet,
        pos.x, pos.y, pos.w, pos.h,
        player.x, player.y, pos.sw, pos.sh
    );
};

export function gameLoop(currentTime) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

    spawnCars(delta);
    spawnObstacles(delta);

    updatePlayer(delta);
    updateRoad(delta);
    updateCars(delta);
    updateDetails(delta);
    updateObstacles(delta);

    drawScene();
    drawFullUI(delta);
    drawObstacles();
    drawPlayer();
    drawCars();

    drawPlayerBox(); // debugging for now will remove in future or i will make it enable through key press;

    animationId = requestAnimationFrame(gameLoop);
};

export function stopGameLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = 0;
};