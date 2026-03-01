import { player } from "./character.js";
import { canvas, ctx, randomInt, summerDetails1SpriteSheet, summerDetails2SpriteSheet, summerDetails3SpriteSheet, summerDetails4SpriteSheet, summerDetailsSpriteSheet, summerGasStationSpriteSheet, summerRoadSpriteSheet } from "./main.js";
import { summer, summerDetails } from "./SpriteCoordinates.js";

let currentScene = "summer";
let nextSceneSpawnTime = 100;
let currentTime = 0;

let roadsSinceLastBunk = 2;
let roadsUntilNextBunk = 6;
let bunkSpacingIncrease = 2;

export const sceneMap = {
    "summer": summer,
};

export const detailsMap = {
    "summer": {
        "details1": summerDetails["details1"],
        "details2": summerDetails["details2"],
        "details3": summerDetails["details3"],
        "details4": summerDetails["details4"],
        "details5": summerDetails["details5"],
    }
}

export let sceneSpriteSheetMap;
export let posX, posY, detailsPosY = 0;
export let sceneNeedY, sceneNeedX;

export function initSheet() {
    sceneSpriteSheetMap = {
        "summer": {
            "road": summerRoadSpriteSheet,
            "gasStation": summerGasStationSpriteSheet,
            "details1": summerDetailsSpriteSheet,
            "details2": summerDetails1SpriteSheet,
            "details3": summerDetails2SpriteSheet,
            "details4": summerDetails3SpriteSheet,
            "details5": summerDetails4SpriteSheet,
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
    sceneNeedY = Math.ceil((screenH * 3) / detailsMap[currentScene]["details1"].sh) + 2;
    sceneNeedX = Math.ceil(((canvas.width / window.devicePixelRatio / 2 - road.sw / 2) * 3) / detailsMap[currentScene]["details1"].sw) + 2;

    for (let i = 0; i < sceneNeedY; i++) {
        detailsForLeft[i] = [];
        for (let j = 0; j < sceneNeedX; j++) {
            detailsForLeft[i][j] = randomDetailsGeneration();
        }
    }

    for (let i = 0; i < sceneNeedY; i++) {
        detailsForRight[i] = [];
        for (let j = 0; j < sceneNeedX; j++) {
            detailsForRight[i][j] = randomDetailsGeneration();
        }
    }
    
};

export const scene = ["summer", "winter", "desert"];
export const roads = [];
export const detailsForLeft = [];
export const detailsForRight = [];


export function randomSceneGeneration(delta) {
    currentTime += delta
    if (currentTime > nextSceneSpawnTime) {
        currentTime = 0;
    }
};

export function randomDetailsGeneration() {
    return "details" + randomInt(1, 5).toString();
}

export function updateRoad(delta) {
    posY += delta * (player.speed + 200);

    const road = summer[roads[0]];

    if (posY >= canvas.height / window.devicePixelRatio + road.sh) {
        roads.shift();
        posY -= road.stackHeight;

    }

    refillRoads();
};

export function updateDetails(delta) {
    
    detailsPosY += delta * (player.speed + 200);
    const detailH = detailsMap[currentScene]["details1"].sh;
    if (detailsPosY >= detailH) {
        detailsPosY -= detailH;

        detailsForLeft.pop();
        detailsForRight.pop();

        const newRowLeft = [];
        const newRowRight = [];

        for (let i = 0; i < sceneNeedX; i++) {
            newRowLeft.push(randomDetailsGeneration());
            newRowRight.push(randomDetailsGeneration());
        };

        detailsForLeft.unshift(newRowLeft);
        detailsForRight.unshift(newRowRight);
    }
}

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
            while (totalH < screenH * 3) {
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
    drawDetails();
    drawRoad();
};

export function drawRoad() {
    const positions = [];
    let currentY = posY;
    for (let i = 0; i < roads.length; i++) {
        positions.push(currentY);
        currentY -= summer[roads[i]].stackHeight;
    }
    for (let i = roads.length - 1; i >= 0; i--) {

        const road = summer[roads[i]];
        const sheet = sceneSpriteSheetMap[currentScene][roads[i]];
        const drawY = positions[i] - (road.sh - road.stackHeight);

        ctx.drawImage(
            sheet,
            road.x, road.y, road.w, road.h,
            posX, drawY, road.sw, road.sh
        );
    }
};

export function drawDetails() {
    const leftEdge = posX;
    const rightEdge = posX + summer["road"].sw;
    let currentH = 0

    //left side
    for (let i = 0; i < detailsForLeft.length; i++) {
        let currentW = 0;
        for (let j = 0; j < detailsForLeft[0].length; j++) {
            const sheet = sceneSpriteSheetMap[currentScene][detailsForLeft[i][j]];
            const detail = detailsMap[currentScene][detailsForLeft[i][j]];
            const drawY = detailsPosY + currentH - detail.sh;
            if (currentW < leftEdge) {
                ctx.drawImage(
                    sheet,
                    detail.x, detail.y, detail.w, detail.h,
                    currentW, drawY, detail.sw, detail.sh
                );
                currentW += detail.sw;
            }
        }
        currentH += detailsMap[currentScene]["details1"].sh - 1;
    }

    //right side
    currentH = 0;
    for (let i = 0; i < detailsForRight.length; i++) {
        let currentW = rightEdge;
        for (let j = 0; j < detailsForRight[0].length; j++) {
            const sheet = sceneSpriteSheetMap[currentScene][detailsForRight[i][j]];
            const detail = detailsMap[currentScene][detailsForRight[i][j]];
            const drawY = detailsPosY + currentH - detail.sh;
            ctx.drawImage(
                sheet,
                detail.x, detail.y, detail.w, detail.h,
                currentW, drawY, detail.sw, detail.sh
            );
            currentW += detail.sw;
        }
        currentH += detailsMap[currentScene]["details1"].sh - 1;
    }
};