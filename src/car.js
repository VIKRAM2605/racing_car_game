import { player } from "./character.js";
import { canvas, ctx, npcSpriteSheet, randomInt, scale } from "./main.js";
import { posX } from "./scene.js";
import { npc1Sprite, npc2Sprite, npc3Sprite, npc4Sprite, summer } from "./SpriteCoordinates.js";

export let cars = [];
let spawnDelay = 4;
let currentSpawn = 0;
let elapsedTime = 0;
let lanes = [0, 0];

const roadOffset = 0.75;

const facing = ["up", "down"];
const spriteMap = {
    "1": npc1Sprite,
    "2": npc2Sprite,
    "3": npc3Sprite,
    "4": npc4Sprite,
}

export function initLanes() {
    const lane1 = posX;
    const lane2 = posX + (summer["road"].w * scale / 2)

    lanes[0] = lane1;
    lanes[1] = lane2;
}

export function resetCars() {
    cars = [];
    spawnDelay = 4;
    elapsedTime = 0;
    currentSpawn = 0;
}

export function increaseTraffic(delta) {
    elapsedTime += delta;

    spawnDelay = Math.max(0.8, 4 - Math.floor(elapsedTime / 20) * 0.4)
}

export function wouldCollide(x, y, w, h, facing) {
    const buffer = scale * 10;
    for (const car of cars) {
        if (car.facing !== facing) continue;
        const overlapX = x < car.x + car.w && x + w > car.x;
        const overlapY = y < car.y + car.h + buffer && y + h + buffer > car.y;
        if (overlapX && overlapY) return true;
    }
    return false;
}

export function spawnCars(delta) {
    increaseTraffic(delta);
    currentSpawn += delta;

    if (currentSpawn < spawnDelay) return;

    currentSpawn = 0;

    const fullRoadW = summer["road"].w * scale;
    const laneW = fullRoadW / 2;

    const usableRoadW = fullRoadW * roadOffset;
    const dirtPerSide = (fullRoadW - usableRoadW) / 2;

    let attempts = 0;
    while (attempts < 10) {
        attempts++;
        const laneIndex = randomInt(0, lanes.length - 1);
        const lane = lanes[laneIndex];
        const spriteNumber = randomInt(1, Object.keys(spriteMap).length).toString();

        const facing = laneIndex === 0 ? "up" : "down";
        const sprite = spriteMap[spriteNumber][facing];

        const sw = sprite.w * scale;
        const sh = sprite.h * scale;

        let roadCenterX;
        if (laneIndex === 0) {
            const roadStart = lane + dirtPerSide;
            const roadWidth = laneW - dirtPerSide;
            roadCenterX = roadStart + (roadWidth) / 2;
        } else {
            const roadStart = lane;
            const roadWidth = laneW - dirtPerSide;
            roadCenterX = roadStart + (roadWidth) / 2;
        }

        const x = roadCenterX - sw / 2;
        let y;
        let carSpeed;

        const spawnAboveScreen = -(sh + 50);
        const spawnBelowScreen = (canvas.height / window.devicePixelRatio) + 50

        if (facing === "up") {
            carSpeed = randomInt(150, 380);

            if (carSpeed > player.speed) {
                y = spawnBelowScreen;
            } else {
                y = spawnAboveScreen;
            }
        } else {
            carSpeed = randomInt(150, 300);
            y = spawnAboveScreen;
        }

        if (wouldCollide(x, y, sw, sh, facing)) continue;

        cars.push({
            x: x,
            y: y,
            sprite: sprite,
            facing: facing,
            w: sw,
            h: sh,
            speed: carSpeed
        });
        break;
    }

}

export function updateCars(delta) {

    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];

        const carSpeed = car.speed || 150;

        if (car.facing === "up") {
            car.y += (player.speed - carSpeed) * scale * delta;
        } else {
            car.y += (player.speed + carSpeed) * scale * delta;
        }
    }

    cars = cars.filter(car => car.y < canvas.height / window.devicePixelRatio + 1000 && car.y > -1000);

};

export function drawCars() {
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        ctx.drawImage(
            npcSpriteSheet,
            car.sprite.x, car.sprite.y, car.sprite.w, car.sprite.h,
            car.x, car.y, car.sprite.w * scale, car.sprite.h * scale
        );
    }
}