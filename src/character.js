import { drawCars, spawnCars, updateCars } from "./car.js";
import { checkCollision, currentInvinsibleTime, isInvinsible } from "./collision.js";
import { deductHealth } from "./health.js";
import { canvas, ctx, isDead, keys, nativeHeight, nativeWidth, playerSpriteSheet1, playerSpriteSheet2, playerSpriteSheet3, playerSpriteSheet4, resetAll, resetIsDead, resetIsGameRunning, scale, setIsDead } from "./main.js";
import { drawObstacles, drawScene, fuelStationMapForRefill, getRoadBelowPlayer, isPlayerOnTopOfRefillBox, posX, randomSceneGeneration, roads, spawnObstacles, updateDetails, updateObstacles, updateRoad } from "./scene.js";
import { addBonuPoints, drawScore, resetRefillBonus, resetScore, saveBestScore, triggerRefillBonus, updateScore } from "./score.js";
import { stopEngine, updateEngineSound } from "./sound.js";
import { player1Sprite, player2Sprite, player3Sprite, player4Sprite, summer } from "./SpriteCoordinates.js";
import { clearIsActiveButton, startPageLoop } from "./startpage.js";
import { drawFullUI, drawIsDeadTitle } from "./ui.js";

export let defaultPlayerSheet;
export let playerSprite;
export let fuelDropTime = 1;
export let fuelCurrentTime = 0;

export let maxOffRoadTime = 3;
export let currentOffRoadTime = 0;

export const isDeadTimer = 5;
export let currentIsDeadTimer = 0;

export let steeringAngle = 0;
let lateralVelocity = 0;

let offRoadIsInvinsible = false;
let offRoadInvinsibleTime = 0;
const offRoadInvinsibleDuration = 3;

const maxSteer = 0.7;
const steerSpeed = 8;
const steerReturn = 10;

const lateralMaxSpeed = 320;
const lateralFriction = 900;
const lateralAccel = 1400;

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

    player.x = (nativeWidth * scale) / 2 - (summer["road"].w * scale) / 2 + playerSprite["up"].w * scale + 10 * scale;
    player.y = (nativeHeight * scale) / 2 + 50 * scale;
    playerSheet = [playerSpriteSheet1, playerSpriteSheet2, playerSpriteSheet3, playerSpriteSheet4];

};

export const playerKey = [player1Sprite, player2Sprite, player3Sprite, player4Sprite];
export let playerSheet = [];

export function changeDefaultPlayer(key) {
    playerSprite = playerKey[key];
    defaultPlayerSheet = playerSheet[key];
};

export function resetPlayer() {
    player.speed = 100;
    player.fuel = 1;
    player.x = (nativeWidth * scale) / 2 - (summer["road"].w * scale) / 2 + playerSprite["up"].w * scale + 10 * scale;
    player.currentFacing = "up";
    currentIsDeadTimer = 0;
    player.w = playerSprite["up"].w * scale,
        player.h = playerSprite["up"].h * scale
}

let lastTime = 0;
export let angle = 0;
let animationId = null;

export function updatePlayer(delta) {
    if (isDead) return;
    let moveX = 0;
    let moveY = 0;
    if (player.fuel <= 0) {
        setIsDead();
        stopEngine();
        return;
    }

    let activeMaxSpeed = keys.shift && player.nitro > 0 ? player.maxSpeed + 75 : player.maxSpeed;

    fuelCurrentTime += delta;
    if (fuelCurrentTime >= fuelDropTime) {
        fuelCurrentTime -= fuelDropTime;
        if (player.speed > player.idleSpeed) player.fuel -= 0.03;
        else if (player.speed === player.idleSpeed) player.fuel -= 0.02;
        else player.fuel -= 0.01;
    }

    if (keys.down) {
        player.speed -= delta * 200;
        if (player.speed < player.minSpeed) player.speed = player.minSpeed;
    }
    else if (keys.up) {

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

    const len = Math.sqrt(moveX * moveX + moveY * moveY);
    if (len > 0) {
        moveX /= len;
        moveY /= len;
    }

    const speedFactor = 0.5 + (player.speed / player.maxSpeed) * 0.5

    if (moveX > 0) {
        //player.currentFacing = "upRight";
        steeringAngle = Math.min(steeringAngle + steerSpeed * delta, maxSteer);
        lateralVelocity += lateralAccel * speedFactor * delta;
    }
    else if (moveX < 0) {
        //player.currentFacing = "upLeft";
        steeringAngle = Math.max(steeringAngle - steerSpeed * delta, -maxSteer);
        lateralVelocity -= lateralAccel * speedFactor * delta;
    }
    else {
        //player.currentFacing = "up";
        if (steeringAngle > 0) steeringAngle = Math.max(steeringAngle - steerReturn * delta, 0);
        if (steeringAngle < 0) steeringAngle = Math.min(steeringAngle + steerReturn * delta, 0);
    }

    const roadW = summer["road"].w * scale;
    const roadRight = posX + roadW;
    const pWidth = playerSprite[player.currentFacing].w * scale;

    if (player.x <= posX || player.x + pWidth >= roadRight) {
        if (offRoadIsInvinsible) {
            offRoadInvinsibleTime += delta;
            if (offRoadInvinsibleTime >= offRoadInvinsibleDuration) {
                offRoadIsInvinsible = false;
                offRoadInvinsibleTime = 0;
            }
        }

        currentOffRoadTime += delta;
        if (currentOffRoadTime >= maxOffRoadTime && !offRoadIsInvinsible) {
            currentOffRoadTime = 0;
            offRoadIsInvinsible = true;
            offRoadInvinsibleTime = 0;
            deductHealth();
        }
        player.fuel -= 0.01 * delta;
    } else {
        currentOffRoadTime = 0;
        offRoadIsInvinsible = false;
        offRoadInvinsibleTime = 0;
    }

    if (moveX === 0 || (moveX < 0 && lateralVelocity > 0) || (moveX > 0 && lateralVelocity < 0)) {
        if (lateralVelocity > 0) lateralVelocity = Math.max(0, lateralVelocity - lateralFriction * delta);
        if (lateralVelocity < 0) lateralVelocity = Math.min(0, lateralVelocity + lateralFriction * delta);
    }

    lateralVelocity = Math.max(-lateralMaxSpeed, Math.min(lateralMaxSpeed, lateralVelocity));

    player.x += lateralVelocity * scale * delta;

    updateEngineSound();
};

export function drawPlayer() {
    if (isInvinsible || offRoadIsInvinsible) {
        const blinkInterval = 0.1;
        const blinkTime = isInvinsible ? currentInvinsibleTime : offRoadInvinsibleTime;
        const shouldHide = Math.floor(blinkTime / blinkInterval) % 2 === 0;
        if (shouldHide) return;
    }

    ctx.imageSmoothingEnabled = false;

    const pos = playerSprite[player.currentFacing];
    const cx = player.x + (pos.w * scale) / 2;
    const cy = player.y + (pos.h * scale) / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(steeringAngle);
    ctx.drawImage(
        defaultPlayerSheet,
        pos.x, pos.y, pos.w, pos.h,
        -(pos.w * scale) / 2, -(pos.h * scale) / 2, pos.w * scale, pos.h * scale
    );
    ctx.restore();

    player.w = pos.w * scale;
    player.h = pos.h * scale;
}

export function gameLoop(currentTime) {
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, nativeWidth * scale, nativeHeight * scale);

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

    randomSceneGeneration(delta);

    drawScene();
    drawFullUI(delta);
    drawObstacles();
    drawCars();
    drawScore();

    if (!isDead) {
        updateScore(delta, player.speed);
    }

    if (isDead) {
        currentIsDeadTimer += delta;
        if (currentIsDeadTimer > isDeadTimer) {
            saveBestScore();
            stopGameLoop();
            resetIsDead();
            resetAll();
            resetScore();
            resetIsGameRunning();
            clearIsActiveButton();
            requestAnimationFrame(startPageLoop);
            return;
        }
        drawIsDeadTitle();
    } else {
        drawPlayer();
    }

    const check = checkCollision(delta);
    if (check && !isDead) {
        deductHealth();
        console.log("collsion")
    }
    if (isPlayerOnTopOfRefillBox()) {

        if (player.fuel < 0.3) {
            triggerRefillBonus();
        }

        player.fuel = 1;
    } else {
        resetRefillBonus();
    }
    fuelStationMapForRefill();

    animationId = requestAnimationFrame(gameLoop);
};

export function stopGameLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = 0;
};