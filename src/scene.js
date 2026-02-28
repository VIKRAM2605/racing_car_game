import { player } from "./character.js";
import { canvas, ctx, summerDetailsSpriteSheet, summerGasStationSpriteSheet, summerRoadSpriteSheet } from "./main.js";
import { summer } from "./SpriteCoordinates.js";

let currentScene = "summer";
let nextSceneSpawnTime = 100;
let currentTime = 0;

let startY = 0;
let roadsSinceLastBunk = 2;
let roadsUntilNextBunk = 6;
let bunkSpacingIncrease = 2;

let count = 2;

export const sceneArray = {
    "summer": summer,
};

export let sceneSpriteSheetArray;
export let posX, posY;

export function initSheet() {
    sceneSpriteSheetArray = {
        "summer": {
            "road": summerRoadSpriteSheet,
            "gasStation": summerGasStationSpriteSheet,
            "details": summerDetailsSpriteSheet,
        }
    };
};

export function initRoadPos() {
    const road = summer["road"];
    posX = (canvas.width / window.devicePixelRatio / 2) - (road.sw / 2);
    posY = canvas.height / window.devicePixelRatio;

    const screenH = posY;
    const roadsNeeded = Math.ceil((screenH * 3) / road.stackHeight) + 2;
    for (let i = 0; i < roadsNeeded; i++) {
        roads.push("road");
    }
};

export const scene = ["summer", "winter", "desert"];
export const roads = [];

export function randomSceneGeneration(delta) {
    currentTime += delta
    if (currentTime > nextSceneSpawnTime) {
        currentTime = 0;
    }
};

export function updateRoad(delta) {
    posY += delta * player.speed;

    const road = summer[roads[0]];

    if (posY >= canvas.height / window.devicePixelRatio + road.sh) {
        roads.shift();
        posY -= road.stackHeight;

        // roadsSinceLastBunk++;

        // if (roadsSinceLastBunk >= roadsUntilNextBunk) {
        //     roadsSinceLastBunk = 0;
        //     roadsUntilNextBunk += bunkSpacingIncrease;
        //     bunkSpacingIncrease += 2;
        //     roads.push("gasStation");
        // } else {
        //     roads.push("road");
    }

    refillRoads();
};

export function refillRoads() {
    const screenH = canvas.height / window.devicePixelRatio;
    let totalH = 0;
    for (let i = 0; i < roads.length; i++) {
        totalH += summer[roads[i]].stackHeight;
    }
    while (totalH < screenH * 3) {
        roadsSinceLastBunk++;
        if (roadsSinceLastBunk > roadsUntilNextBunk) {
            roadsSinceLastBunk = 0;
            roadsUntilNextBunk += bunkSpacingIncrease;
            bunkSpacingIncrease += 5;
            roads.push("gasStation");
            totalH += summer["gasStation"].stackHeight;
            while (totalH < screenH * 2) {
                roads.push("road");
                totalH += summer["road"].stackHeight;
            }
        } else {
            roads.push("road");
            totalH += summer["road"].stackHeight;
        }
    }
}

export function drawScene() {
    const positions = [];
    let currentY = posY;
    for (let i = 0; i < roads.length; i++) {
        positions.push(currentY);
        currentY -= summer[roads[i]].stackHeight;
    }
    for (let i = roads.length - 1; i >= 0; i--) {
        const road = summer[roads[i]];
        const sheet = sceneSpriteSheetArray[currentScene][roads[i]];
        const drawY = positions[i] - (road.sh - road.stackHeight);

        ctx.drawImage(
            sheet,
            road.x, road.y, road.w, road.h,
            posX, drawY, road.sw, road.sh
        );
    }
};