import { player } from "./character.js";
import { canvas, ctx, npcSpriteSheet, randomInt } from "./main.js";
import { npc1Sprite, npc2Sprite, npc3Sprite, npc4Sprite, summer } from "./SpriteCoordinates.js";

let cars = [];
let spawnDelay = 2;
let currentSpawn = 0;
let lanes = [0, 0];

const facing = ["up", "down"];
const spriteMap = {
    "1": npc1Sprite,
    "2": npc2Sprite,
    "3": npc3Sprite,
    "4": npc4Sprite,
}

export function initLanes() {
    const lane1 = canvas.width / window.devicePixelRatio / 2 - (summer["road"].sw / 2);
    const lane2 = lane1 + (summer["road"].sw / 2)

    lanes[0] = lane1;
    lanes[1] = lane2;
}

export function spawnCars(delta) {
    currentSpawn += delta;
    if (currentSpawn > spawnDelay) {
        currentSpawn = 0;
        let laneIndex = randomInt(0, lanes.length - 1);
        let lane = lanes[laneIndex];
        let y;

        let currentFacing;

        let spriteNumber = randomInt(1, Object.keys(spriteMap).length).toString();

        let sprite;

        if (laneIndex === 0) {
            y = -500;

            sprite = spriteMap[spriteNumber]["up"];

            currentFacing = "up";

            if (spriteNumber === "1" || spriteNumber === "3") {
                lane += sprite.sw + 22;
            } else {
                lane += sprite.sw + 28;
            }
        } else {
            y = -500;

            sprite = spriteMap[spriteNumber]["down"];

            currentFacing = "down";

            if (spriteNumber === "1" || spriteNumber === "3") {
                lane += sprite.sw - 5;
            } else {
                lane += sprite.sw + 5;
            }
        }

        cars.push({
            x: lane,
            y: y,
            sprite: sprite,
            facing: currentFacing,
        })
    }
};

export function updateCars(delta) {
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].facing === "up") {
            cars[i].y += (player.speed - 250) * delta;
        } else {
            cars[i].y += (player.speed + 350) * delta;
        }
    }

    cars = cars.filter(car => car.y < canvas.height / window.devicePixelRatio + 1000);

};

export function drawCars() {
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        ctx.drawImage(
            npcSpriteSheet,
            car.sprite.x, car.sprite.y, car.sprite.w, car.sprite.h,
            car.x, car.y, car.sprite.sw, car.sprite.sh
        );
    }
}