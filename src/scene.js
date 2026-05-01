import { player } from "./character.js";
import { canvas, ctx, desertDetails1SpriteSheet, desertDetails2SpriteSheet, desertDetails3SpriteSheet, desertDetails4SpriteSheet, desertDetailsSpriteSheet, desertGasStationSpriteSheet, desertRoadSpriteSheet, obstaclesSpriteSheet, randomInt, scale, stationMarkingSpriteSheet, summerDetails1SpriteSheet, summerDetails2SpriteSheet, summerDetails3SpriteSheet, summerDetails4SpriteSheet, summerDetailsSpriteSheet, summerGasStationSpriteSheet, summerRoadSpriteSheet, winterDetails1SpriteSheet, winterDetails2SpriteSheet, winterDetails3SpriteSheet, winterDetails4SpriteSheet, winterDetailsSpriteSheet, winterGasStationSpriteSheet, winterRoadSpriteSheet } from "./main.js";
import { playRefillSound } from "./sound.js";
import { desertDetails, roadObstackleSprites, stationMarking, summer, summerDetails, winterDetails } from "./SpriteCoordinates.js";
import { activeScenes } from "./startpage.js";

let currentScene = "summer";
let nextSceneSpawnTime = 20;
let currentTime = 0;

let roadsSinceLastBunk = 0;
let roadsUntilNextBunk = 20;
let bunkSpacingIncrease = 10;
let totalRoadH = 0;
let screenW = 0;
let screenH = 0;

const obstacleKeys = Object.keys(roadObstackleSprites);

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
    },
    "winter": {
        "details1": winterDetails["details1"],
        "details2": winterDetails["details2"],
        "details3": winterDetails["details3"],
        "details4": winterDetails["details4"],
        "details5": winterDetails["details5"],
    },
    "desert": {
        "details1": desertDetails["details1"],
        "details2": desertDetails["details2"],
        "details3": desertDetails["details3"],
        "details4": desertDetails["details4"],
        "details5": desertDetails["details5"],
    }
};

export let sceneSpriteSheetMap;
export let posX, posY, detailsPosY = 0;
export let sceneNeedY, sceneNeedX;

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
export let gasStationMarking = [];

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
        },
        "winter": {
            "road": winterRoadSpriteSheet,
            "gasStation": winterGasStationSpriteSheet,
            "details1": winterDetailsSpriteSheet,
            "details2": winterDetails1SpriteSheet,
            "details3": winterDetails2SpriteSheet,
            "details4": winterDetails3SpriteSheet,
            "details5": winterDetails4SpriteSheet,
        },
        "desert": {
            "road": desertRoadSpriteSheet,
            "gasStation": desertGasStationSpriteSheet,
            "details1": desertDetailsSpriteSheet,
            "details2": desertDetails1SpriteSheet,
            "details3": desertDetails2SpriteSheet,
            "details4": desertDetails3SpriteSheet,
            "details5": desertDetails4SpriteSheet,
        }
    };
};

export function initRoadPos() {
    const road = summer["road"];
    screenW = canvas.width / window.devicePixelRatio;
    screenH = canvas.height / window.devicePixelRatio;
    posX = screenW / 2 - (road.w * scale / 2);
    posY = screenH;

    refillRoads();

    sceneNeedY = Math.ceil((screenH * 3) / (detailsMap[currentScene]["details1"].h * scale)) + 2;
    sceneNeedX = Math.ceil(((screenW / 2 - (road.w * scale) / 2) * 3) / (detailsMap[currentScene]["details1"].w * scale)) + 2;

    for (let i = 0; i < sceneNeedY; i++) {
        detailsForLeft.push(generateDetailRowLeft(currentScene));
        detailsForRight.push(generateDetailRowRight(currentScene));
    }

    const rightLaneCenter = posX + road.w * 0.67 * scale;
    const arrow = stationMarking["arrowRight"];
    const pump = stationMarking["pump"];
    const gap = scale * 5;
    const totalW = pump.w * scale + gap + arrow.w * scale;
    const startX = rightLaneCenter - totalW / 2;

    gasStationMarking[0] = { x: startX, y: null, sprite: pump, key: "pump" };
    gasStationMarking[1] = { x: startX + pump.w * scale + gap, y: null, sprite: arrow, key: "arrowRight" };
    gasStationMarking[2] = { x: rightLaneCenter - (stationMarking["60"].w * scale) / 2, y: null, sprite: stationMarking["60"], key: "60" };
    gasStationMarking[3] = { x: rightLaneCenter - (stationMarking["30"].w * scale) / 2, y: null, sprite: stationMarking["30"], key: "30" };

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
    gasStationMarking = [];
    totalRoadH = 0;
    screenH = canvas.height / window.devicePixelRatio;
    screenW = canvas.width / window.devicePixelRatio;
};

export function randomSceneGeneration(delta) {
    currentTime += delta;
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
};

export function randomDetailsGeneration() {
    return "details" + randomInt(1, 5).toString();
};

export function generateDetailRowLeft(scene) {
    const tiles = [];
    let currentX = 0;
    const overlap = scale * 0.36;
    const sceneDetails = detailsMap[scene];

    let safe = 0;
    while (currentX < posX && safe < 50) {
        safe++;
        let key = randomDetailsGeneration();
        let detail = sceneDetails[key];

        if (currentX + detail.w * scale - overlap > posX) {
            key = "details3";
            detail = sceneDetails[key];
        }

        tiles.push({ key, x: currentX });
        currentX += detail.w * scale - overlap;
    }

    return { scene, tiles };

}

export function generateDetailRowRight(scene) {
    const tiles = [];
    const rightEdge = posX + summer["road"].w * scale;
    let currentX = rightEdge;
    const overlap = scale * 0.36;
    const sceneDetails = detailsMap[scene];

    let safe = 0;
    while (currentX < screenW + (200 * scale) && safe < 50) {
        safe++;
        let key = randomDetailsGeneration();
        let detail = sceneDetails[key];

        tiles.push({ key, x: currentX });
        currentX += detail.w * scale - overlap;
    }
    return { scene, tiles };
}

export function updateRoad(delta) {
    if (!roads.length) return;
    posY += delta * (player.speed + 200);

    const road = summer[roads[0].id];
    if (posY >= screenH + road.h * scale) {

        const poppedRoads = roads.shift();
        const poppedHeight = summer[poppedRoads.id];

        totalRoadH -= poppedHeight.stackHeight * scale;
        posY -= poppedHeight.stackHeight * scale;
    }
    refillRoads();
};

export function updateDetails(delta) {
    detailsPosY += delta * (player.speed + 200);
    const detailH = detailsMap[currentScene]["details1"].h * scale;

    if (detailsPosY >= detailH) {
        detailsPosY -= detailH;

        detailsForLeft.pop();
        detailsForRight.pop();

        detailsForLeft.unshift(generateDetailRowLeft(currentScene));
        detailsForRight.unshift(generateDetailRowRight(currentScene));
    }
};

export function updateObstacles(delta) {

    const roadSpeed = player.speed + 200;

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += delta * roadSpeed;
        if (obstacles[i].y >= 3000) obstacles.splice(i, 1);
    }

    for (let i = gasStationObstacles.length - 1; i >= 0; i--) {
        gasStationObstacles[i].y += delta * roadSpeed;
    }

    for (let i = refillZones.length - 1; i >= 0; i--) {
        refillZones[i].y += delta * roadSpeed;
    }
};

export function refillRoads() {
    while (totalRoadH < screenH * 3) {
        roadsSinceLastBunk++;
        if (roadsSinceLastBunk > roadsUntilNextBunk) {
            roadsSinceLastBunk = 0;
            roadsUntilNextBunk = Math.min(roadsUntilNextBunk + bunkSpacingIncrease, 60);
            bunkSpacingIncrease += 5;

            roads.push({ id: "gasStation", scene: currentScene, obstacleSpawned: false });
            totalRoadH += summer["gasStation"].stackHeight * scale;
        } else {
            roads.push({ id: "road", scene: currentScene });
            totalRoadH += summer["road"].stackHeight * scale;
        }
    }
};

export function drawScene() {
    drawDetails();
    drawRoad();
    drawObstacles();
    drawStationObtacles();
};

export function drawRoad() {
    const positions = [];
    let currentY = posY;

    for (let i = 0; i < roads.length; i++) {
        positions.push(currentY);
        currentY -= summer[roads[i].id].stackHeight * scale;
    }

    for (let i = roads.length - 1; i >= 0; i--) {

        const roadObj = roads[i];
        const roadCoords = summer[roadObj.id];
        const sheet = sceneSpriteSheetMap[roadObj.scene][roadObj.id];

        const drawY = positions[i] - (roadCoords.h * scale - roadCoords.stackHeight * scale);

        ctx.drawImage(
            sheet,
            roadCoords.x, roadCoords.y, roadCoords.w, roadCoords.h,
            Math.floor(posX), Math.floor(drawY), Math.ceil(roadCoords.w * scale), Math.ceil(roadCoords.h * scale)
        );

        if (roads[i + 1]?.id === "gasStation") {
            drawArrowToStation(drawY);
            if (!roads[i + 1].obstacleSpawned) {
                spawnGasStationObstacles(drawY);
                roads[i + 1].obstacleSpawned = true;
            }

            drawStationObtacles();
        }
        if (roads[i + 3]?.id === "gasStation") drawPetrolPumpMarking("30", drawY);
        if (roads[i + 6]?.id === "gasStation") drawPetrolPumpMarking("60", drawY);
    }
};

export function drawDetails() {
    const tileH = detailsMap["summer"]["details1"].h * scale - scale * 0.36;

    let currentH = 0;
    for (let i = 0; i < detailsForLeft.length; i++) {
        const row = detailsForLeft[i];
        const sceneDetails = detailsMap[row.scene];
        const sceneSheets = sceneSpriteSheetMap[row.scene];

        for (let j = 0; j < row.tiles.length; j++) {
            const tile = row.tiles[j];
            const detail = sceneDetails[tile.key];
            const sheet = sceneSheets[tile.key];
            const drawY = detailsPosY + currentH - detail.h * scale;

            ctx.drawImage(
                sheet,
                detail.x, detail.y, detail.w, detail.h,
                tile.x, drawY, detail.w * scale, detail.h * scale
            );
        }

        currentH += tileH;
    }

    currentH = 0;
    for (let i = 0; i < detailsForRight.length; i++) {
        const row = detailsForRight[i];
        const sceneDetails = detailsMap[row.scene];
        const sceneSheets = sceneSpriteSheetMap[row.scene];

        for (let j = 0; j < row.tiles.length; j++) {
            const tile = row.tiles[j];
            const detail = sceneDetails[tile.key];
            const sheet = sceneSheets[tile.key];
            const drawY = detailsPosY + currentH - detail.h * scale;

            ctx.drawImage(
                sheet,
                detail.x, detail.y, detail.w, detail.h,
                tile.x, drawY, detail.w * scale, detail.h * scale
            );

        }
        currentH += tileH;
    }

};

export function getRoadBelowPlayer() {
    let currentY = posY;
    for (let i = 0; i < roads.length; i++) {

        const roadObj = roads[i];
        const road = summer[roadObj.id];
        const visualOffset = road.h * scale - road.stackHeight * scale;
        const roadTop = currentY - road.stackHeight * scale - visualOffset;
        const roadBottom = currentY;

        if (player.y >= roadTop && player.y <= roadBottom) return road;
        currentY -= road.stackHeight * scale;
    }
    return summer["road"];
};

export function spawnGasStationObstacles(y) {
    gasStationObstacles.push({
        x: posX + summer["road"].w * scale - roadObstackleSprites["cone"].w * scale - scale * 4,
        y: y - roadObstackleSprites["cone"].h * scale * 18,
        sprite: "cone", isDeadly: true,
        w: roadObstackleSprites["cone"].w * scale, h: roadObstackleSprites["cone"].h * scale, currentFacing: "up"
    });
    gasStationObstacles.push({
        x: posX + summer["road"].w * scale + roadObstackleSprites["cone"].w * scale - scale * 3,
        y: y - roadObstackleSprites["cone"].h * scale * 18,
        sprite: "cone", isDeadly: true,
        w: roadObstackleSprites["cone"].w * scale, h: roadObstackleSprites["cone"].h * scale, currentFacing: "up"
    });
    gasStationObstacles.push({
        x: posX + summer["road"].w * scale - roadObstackleSprites["barricade"].w * scale + scale * 2,
        y: y - roadObstackleSprites["barricade"].h * scale * 18,
        sprite: "barricade", isDeadly: true,
        w: roadObstackleSprites["barricade"].w * scale, h: roadObstackleSprites["barricade"].h * scale, currentFacing: "up"
    });

    refillZones.push({
        x: posX + summer["road"].w * scale + scale * 10,
        y: y - scale * 190,
        w: scale * 50,
        h: scale * 50
    });
};

export function spawnObstacles(delta) {
    currentSpawnObstacleTime += delta;
    if (currentSpawnObstacleTime >= spawnObstacleTime) {
        currentSpawnObstacleTime -= spawnObstacleTime;
        const spriteKey = obstacleKeys[randomInt(0, obstacleKeys.length - 1)];
        let x;
        let isDeadly;
        if (spriteKey === "crack" || spriteKey === "waterSpill" || spriteKey === "oilSpill") {
            isDeadly = false;
            x = randomInt(posX, posX + summer["road"].w * scale - roadObstackleSprites[spriteKey].w * scale);
        } else if (spriteKey === "arrow") {
            isDeadly = false;
            x = posX + (roadObstackleSprites[spriteKey].w * scale * 3);
        } else if (spriteKey === "potHole") {
            isDeadly = true;
            x = randomInt(posX, posX + summer["road"].w * scale);
        } else {
            isDeadly = true;
            x = randomInt(posX, posX + summer["road"].w * scale);
        }
        obstacles.push({
            x, y: -500, isDeadly, sprite: spriteKey,
            w: roadObstackleSprites[spriteKey].w * scale,
            h: roadObstackleSprites[spriteKey].h * scale,
            currentFacing: "up",
        });
    }
};

export function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        const sprite = roadObstackleSprites[obs.sprite];
        ctx.drawImage(
            obstaclesSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            obs.x, obs.y, sprite.w * scale, sprite.h * scale
        );
    }
};

export function drawStationObtacles() {
    for (let i = 0; i < gasStationObstacles.length; i++) {
        const obs = gasStationObstacles[i];
        const sprite = roadObstackleSprites[obs.sprite];

        ctx.drawImage(
            obstaclesSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            obs.x, obs.y, sprite.w * scale, sprite.h * scale
        );

    }
};

export function drawPetrolPumpMarking(distance, y) {
    const arrowObj = gasStationMarking[0];
    const pumpObj = gasStationMarking[1];

    ctx.drawImage(
        stationMarkingSpriteSheet,
        pumpObj.sprite.x, pumpObj.sprite.y, pumpObj.sprite.w, pumpObj.sprite.h,
        pumpObj.x, y, pumpObj.sprite.w * scale, pumpObj.sprite.h * scale
    );
    ctx.drawImage(
        stationMarkingSpriteSheet,
        arrowObj.sprite.x, arrowObj.sprite.y, arrowObj.sprite.w, arrowObj.sprite.h,
        arrowObj.x, y, arrowObj.sprite.w * scale, arrowObj.sprite.h * scale
    );

    const distanceY = y + Math.max(pumpObj.sprite.h * scale, arrowObj.sprite.h * scale) + scale * 5;
    for (let i = 2; i < 4; i++) {
        const obj = gasStationMarking[i];
        if (distance === obj.key) {
            ctx.drawImage(
                stationMarkingSpriteSheet,
                obj.sprite.x, obj.sprite.y, obj.sprite.w, obj.sprite.h,
                obj.x, distanceY, obj.sprite.w * scale, obj.sprite.h * scale
            );
        }
    }
};

export function drawArrowToStation(y) {
    const sprite = stationMarking["arrowRight"];
    const rightLaneCenter = posX + summer["road"].w * scale * 0.75;
    ctx.drawImage(
        stationMarkingSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        rightLaneCenter + (sprite.w * scale) / 2, y - sprite.h * scale * 7, sprite.w * scale, sprite.h * scale
    );
};

export function fuelStationMapForRefill() {

    for (let i = refillZones.length - 1; i >= 0; i--) {
        if (refillZones[i].y !== null && refillZones[i].y >= 3000) refillZones.splice(i, 1);
    }

    for (let i = gasStationObstacles.length - 1; i >= 0; i--) {
        if (gasStationObstacles[i].y !== null && gasStationObstacles[i].y >= 3000) gasStationObstacles.splice(i, 1);
    }
};

export function isPlayerOnTopOfRefillBox() {
    for (const zone of refillZones) {
        if (zone.y === null) continue;
        if (player.x < zone.x + zone.w &&
            player.x + player.w > zone.x &&
            player.y < zone.y + zone.h &&
            player.y + player.h > zone.y) {
            playRefillSound();
            return true;
        }
    }
    return false;
};