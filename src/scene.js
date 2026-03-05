import { player } from "./character.js";
import { canvas, ctx, obstaclesSpriteSheet, randomInt, stationMarkingSpriteSheet, summerDetails1SpriteSheet, summerDetails2SpriteSheet, summerDetails3SpriteSheet, summerDetails4SpriteSheet, summerDetailsSpriteSheet, summerGasStationSpriteSheet, summerRoadSpriteSheet } from "./main.js";
import { roadObstackleSprites, scale, stationMarking, summer, summerDetails } from "./SpriteCoordinates.js";

let currentScene = "summer";
let nextSceneSpawnTime = 5;
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

export function resetScene() {
    roads = [];
    detailsForLeft = [];
    detailsForRight = [];
    obstacles = [];
    gasStationObstacles = [];
    roadMarkings = [];
    roadsSinceLastBunk = 0;
    roadsUntilNextBunk = 6;
    bunkSpacingIncrease = 2;
    refillZones = [];
}

export const scene = ["summer"];
export let roads = [];
export let detailsForLeft = [];
export let detailsForRight = [];
export let obstacles = [];
export let gasStationObstacles = [];
export let roadMarkings = [];
export const spawnObstacleTime = 2;
export let currentSpawnObstacleTime = 0;
export let refillZones = [];

export function randomSceneGeneration(delta) {
    currentTime += delta
    if (currentTime > nextSceneSpawnTime) {
        currentTime = 0;
        currentScene = scene[randomInt(0, scene.length - 1)];
    }
};

export function addScene(key) {
    scene.push(key);
};

export function removeScene(key) {
    const isThere = scene.indexOf(key);
    if (isThere !== -1) {
        scene.splice(isThere, 1);
    }
}

export function randomDetailsGeneration() {
    return "details" + randomInt(1, 5).toString();
};

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
};

export function updateObstacles(delta) {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += delta * (player.speed + 200);
    }
    obstacles = obstacles.filter(obs => obs.y < 3000);
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
            if (roadsUntilNextBunk > 30) {
                roadsUntilNextBunk = 30;
            } else {
                roadsUntilNextBunk += bunkSpacingIncrease;
                bunkSpacingIncrease += 1;
            }
            roads.push("gasStation");
            spawnGasStationObstacles();
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
    drawObstacles();
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

        if (roads[i + 1] === "gasStation") {
            drawArrowToStation(drawY);
            drawStationObtacles(drawY);
        }
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
            if (currentW < leftEdge - detail.sw) {
                ctx.drawImage(
                    sheet,
                    detail.x, detail.y, detail.w, detail.h,
                    currentW, drawY, detail.sw, detail.sh
                );
                currentW += detail.sw;
            }
            else if (currentW < leftEdge) {
                const sprite = detailsMap[currentScene]["details2"]
                ctx.drawImage(
                    sheet,
                    sprite.x, sprite.y, sprite.w, sprite.h,
                    currentW, drawY, sprite.sw, sprite.sh
                )
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

export function getRoadBelowPlayer() {
    let currentY = posY;
    for (let i = 0; i < roads.length; i++) {
        const road = summer[roads[i]];
        const visualOffset = road.sh - road.stackHeight;
        const roadTop = currentY - road.stackHeight - visualOffset;
        const roadBottom = currentY;
        if (player.y >= roadTop && player.y <= roadBottom) {
            return road;
        }
        currentY -= road.stackHeight;
    }
    return summer["road"];
};

export function spawnGasStationObstacles() {
    gasStationObstacles.push({
        x: posX + summer["road"].sw - roadObstackleSprites["cone"].sw - scale * 4,
        sprite: "cone",
        isDeadly: true,
        w: roadObstackleSprites["cone"].sw,
        h: roadObstackleSprites["cone"].sh,
        currentFacing: "up"
    });
    gasStationObstacles.push({
        x: posX + summer["road"].sw + roadObstackleSprites["cone"].sw - scale * 3,
        sprite: "cone",
        isDeadly: true,
        w: roadObstackleSprites["cone"].sw,
        h: roadObstackleSprites["cone"].sh,
        currentFacing: "up"
    });
    gasStationObstacles.push({
        x: posX + summer["road"].sw - roadObstackleSprites["barricade"].sw + scale * 2,
        sprite: "barricade",
        isDeadly: true,
        w: roadObstackleSprites["barricade"].sw,
        h: roadObstackleSprites["barricade"].sh,
        currentFacing: "up"
    });
    refillZones.push({
        x: posX + summer["road"].sw + scale * 10,
        y: null,
        w: + scale * 50,
        h: scale * 50
    })
};

export function spawnObstacles(delta) {
    currentSpawnObstacleTime += delta;
    if (currentSpawnObstacleTime >= spawnObstacleTime) {
        currentSpawnObstacleTime -= spawnObstacleTime;
        const key = Object.keys(roadObstackleSprites)
        const spriteKey = key[randomInt(0, key.length - 1)];
        let x;
        let isDeadly;
        if (spriteKey === "crack" || spriteKey === "waterSpill" || spriteKey === "oilSpill") {
            isDeadly = false;
            x = randomInt(posX, posX + summer["road"].sw - roadObstackleSprites[spriteKey].sw);
        }
        else if (spriteKey === "arrow") {
            isDeadly = false;
            x = posX + (roadObstackleSprites[spriteKey].sw * 3);
        }
        else if (spriteKey === "potHole") {
            isDeadly = true;
            x = randomInt(posX, posX + summer["road"].sw);
        }
        else {
            isDeadly = true;
            x = randomInt(posX, posX + summer["road"].sw)
        }
        obstacles.push({
            x: x,
            y: -500,
            isDeadly: isDeadly,
            sprite: spriteKey,
            w: roadObstackleSprites[spriteKey].sw,
            h: roadObstackleSprites[spriteKey].sh,
            currentFacing: "up",
        });
        console.log(obstacles);
    }
};

export function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        const sprite = roadObstackleSprites[obs.sprite];
        ctx.drawImage(
            obstaclesSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            obs.x, obs.y, sprite.sw, sprite.sh
        );
    }
};

export function drawStationObtacles(y) {
    for (let i = 0; i < gasStationObstacles.length; i++) {
        const obs = gasStationObstacles[i];
        const sprite = roadObstackleSprites[obs.sprite];
        ctx.drawImage(
            obstaclesSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            obs.x, y - sprite.sh * 18, sprite.sw, sprite.sh
        );
        obs.y = y - sprite.sh * 18;
    }
    for (let i = 0; i < refillZones.length; i++) {
        refillZones[i].y = y - scale * 190;
    }
}

export function drawPetrolPumpMarking() {

};

export function drawArrowToStation(y) {
    const sprite = stationMarking["arrowRight"]
    ctx.drawImage(
        stationMarkingSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        posX + summer["road"].sw / 2 + sprite.sw, y - sprite.sh * 7, sprite.sw, sprite.sh
    );
};

export function fuelStationMapForRefill() {
    refillZones = refillZones.filter(zone => zone.y === null || zone.y < 3000);
};

export function isPlayerOnTopOfRefillBox() {
    for (const zone of refillZones) {
        if (zone.y === null) continue;
        // ctx.fillStyle = "red";
        // ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);
        if (player.x < zone.x + zone.w &&
            player.x + player.w > zone.x &&
            player.y < zone.y + zone.h &&
            player.y + player.h > zone.y) {
            return true;
        }



        return false;
    }
}