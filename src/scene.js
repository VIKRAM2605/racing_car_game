import { player } from "./character.js";
import { canvas, ctx, desertDetails1SpriteSheet, desertDetails2SpriteSheet, desertDetails3SpriteSheet, desertDetails4SpriteSheet, desertDetailsSpriteSheet, desertGasStationSpriteSheet, desertRoadSpriteSheet, obstaclesSpriteSheet, randomInt, stationMarkingSpriteSheet, summerDetails1SpriteSheet, summerDetails2SpriteSheet, summerDetails3SpriteSheet, summerDetails4SpriteSheet, summerDetailsSpriteSheet, summerGasStationSpriteSheet, summerRoadSpriteSheet, winterDetails1SpriteSheet, winterDetails2SpriteSheet, winterDetails3SpriteSheet, winterDetails4SpriteSheet, winterDetailsSpriteSheet, winterGasStationSpriteSheet, winterRoadSpriteSheet } from "./main.js";
import { playRefillSound } from "./sound.js";
import { desertDetails, roadObstackleSprites, scale, stationMarking, summer, summerDetails, winterDetails } from "./SpriteCoordinates.js";
import { activeScenes } from "./startpage.js";

let currentScene = "summer";
let nextSceneSpawnTime = 5;
let currentTime = 0;

let roadsSinceLastBunk = 2;
let roadsUntilNextBunk = 6;
let bunkSpacingIncrease = 2;
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
    posX = screenW / 2 - road.sw / 2;
    posY = screenH;

    const roadsNeeded = Math.ceil((screenH * 3) / road.stackHeight) + 2;
    for (let i = 0; i < roadsNeeded; i++) {
        roads.push("road");
        totalRoadH += road.stackHeight;
    }

    sceneNeedY = Math.ceil((screenH * 3) / detailsMap[currentScene]["details1"].sh) + 2;
    sceneNeedX = Math.ceil(((screenW / 2 - road.sw / 2) * 3) / detailsMap[currentScene]["details1"].sw) + 2;

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

    const rightLaneCenter = posX + road.sw * 0.67;
    const arrow = stationMarking["arrowRight"];
    const pump = stationMarking["pump"];
    const gap = scale * 5;
    const totalW = pump.sw + gap + arrow.sw;
    const startX = rightLaneCenter - totalW / 2;

    gasStationMarking[0] = { x: startX, y: null, sprite: pump, key: "pump" };
    gasStationMarking[1] = { x: startX + pump.sw + gap, y: null, sprite: arrow, key: "arrowRight" };
    gasStationMarking[2] = { x: rightLaneCenter - stationMarking["60"].sw / 2, y: null, sprite: stationMarking["60"], key: "60" };
    gasStationMarking[3] = { x: rightLaneCenter - stationMarking["30"].sw / 2, y: null, sprite: stationMarking["30"], key: "30" };

    spawnGasStationObstacles();
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

export function updateRoad(delta) {
    posY += delta * (player.speed + 200);
    const road = summer[roads[0]];
    if (posY >= screenH + road.sh) {
        roads.shift();
        totalRoadH -= road.stackHeight;
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
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += delta * (player.speed + 200);
        if (obstacles[i].y >= 3000) obstacles.splice(i, 1);
    }
};

export function refillRoads() {
    while (totalRoadH < screenH * 3) {
        roadsSinceLastBunk++;
        if (roadsSinceLastBunk > roadsUntilNextBunk) {
            roadsSinceLastBunk = 0;
            if (roadsUntilNextBunk > 30) {
                roadsUntilNextBunk = 30;
            } else {
                roadsUntilNextBunk += bunkSpacingIncrease;
                bunkSpacingIncrease += 2;
            }
            roads.push("gasStation");
            totalRoadH += summer["gasStation"].stackHeight;
            while (totalRoadH < screenH * 3) {
                roads.push("road");
                totalRoadH += summer["road"].stackHeight;
            }
        } else {
            roads.push("road");
            totalRoadH += summer["road"].stackHeight;
        }
    }
};

export function drawScene() {
    drawDetails();
    drawRoad();
    drawObstacles();
};

export function drawRoad() {
    const sceneSheet = sceneSpriteSheetMap[currentScene];
    const positions = [];
    let currentY = posY;
    for (let i = 0; i < roads.length; i++) {
        positions.push(currentY);
        currentY -= summer[roads[i]].stackHeight;
    }
    for (let i = roads.length - 1; i >= 0; i--) {
        const road = summer[roads[i]];
        const sheet = sceneSheet[roads[i]];
        const drawY = positions[i] - (road.sh - road.stackHeight);
        ctx.drawImage(sheet, road.x, road.y, road.w, road.h, posX, drawY, road.sw, road.sh);
        if (roads[i + 1] === "gasStation") {
            drawArrowToStation(drawY);
            drawStationObtacles(drawY);
        }
        if (roads[i + 3] === "gasStation") drawPetrolPumpMarking("30", drawY);
        if (roads[i + 6] === "gasStation") drawPetrolPumpMarking("60", drawY);
    }
};

export function drawDetails() {
    const sceneDetails = detailsMap[currentScene];
    const sceneSheets = sceneSpriteSheetMap[currentScene];
    const leftEdge = posX;
    const rightEdge = posX + summer["road"].sw;
    const tileH = sceneDetails["details1"].sh - 1;
    let currentH = 0;

    for (let i = 0; i < detailsForLeft.length; i++) {
        let currentW = 0;
        for (let j = 0; j < detailsForLeft[0].length; j++) {
            const key = detailsForLeft[i][j];
            const sheet = sceneSheets[key];
            const detail = sceneDetails[key];
            const drawY = detailsPosY + currentH - detail.sh;
            if (currentW < leftEdge - detail.sw) {
                ctx.drawImage(sheet, detail.x, detail.y, detail.w, detail.h, currentW, drawY, detail.sw, detail.sh);
                currentW += detail.sw - 1;
            } else if (currentW < leftEdge) {
                const sprite = sceneDetails["details3"];
                ctx.drawImage(sheet, sprite.x, sprite.y, sprite.w, sprite.h, currentW, drawY, sprite.sw, sprite.sh);
                currentW += sprite.sw - 1;
            }
        }
        currentH += tileH;
    }

    currentH = 0;
    for (let i = 0; i < detailsForRight.length; i++) {
        let currentW = rightEdge;
        for (let j = 0; j < detailsForRight[0].length; j++) {
            const key = detailsForRight[i][j];
            const sheet = sceneSheets[key];
            const detail = sceneDetails[key];
            const drawY = detailsPosY + currentH - detail.sh;
            ctx.drawImage(sheet, detail.x, detail.y, detail.w, detail.h, currentW, drawY, detail.sw, detail.sh);
            currentW += detail.sw - 1;
        }
        currentH += tileH;
    }
};

export function getRoadBelowPlayer() {
    let currentY = posY;
    for (let i = 0; i < roads.length; i++) {
        const road = summer[roads[i]];
        const visualOffset = road.sh - road.stackHeight;
        const roadTop = currentY - road.stackHeight - visualOffset;
        const roadBottom = currentY;
        if (player.y >= roadTop && player.y <= roadBottom) return road;
        currentY -= road.stackHeight;
    }
    return summer["road"];
};

export function spawnGasStationObstacles() {
    gasStationObstacles.push({
        x: posX + summer["road"].sw - roadObstackleSprites["cone"].sw - scale * 4,
        sprite: "cone", isDeadly: true,
        w: roadObstackleSprites["cone"].sw, h: roadObstackleSprites["cone"].sh, currentFacing: "up"
    });
    gasStationObstacles.push({
        x: posX + summer["road"].sw + roadObstackleSprites["cone"].sw - scale * 3,
        sprite: "cone", isDeadly: true,
        w: roadObstackleSprites["cone"].sw, h: roadObstackleSprites["cone"].sh, currentFacing: "up"
    });
    gasStationObstacles.push({
        x: posX + summer["road"].sw - roadObstackleSprites["barricade"].sw + scale * 2,
        sprite: "barricade", isDeadly: true,
        w: roadObstackleSprites["barricade"].sw, h: roadObstackleSprites["barricade"].sh, currentFacing: "up"
    });
    refillZones.push({
        x: posX + summer["road"].sw + scale * 10,
        y: null, w: scale * 50, h: scale * 50
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
            x = randomInt(posX, posX + summer["road"].sw - roadObstackleSprites[spriteKey].sw);
        } else if (spriteKey === "arrow") {
            isDeadly = false;
            x = posX + (roadObstackleSprites[spriteKey].sw * 3);
        } else if (spriteKey === "potHole") {
            isDeadly = true;
            x = randomInt(posX, posX + summer["road"].sw);
        } else {
            isDeadly = true;
            x = randomInt(posX, posX + summer["road"].sw);
        }
        obstacles.push({
            x, y: -500, isDeadly, sprite: spriteKey,
            w: roadObstackleSprites[spriteKey].sw,
            h: roadObstackleSprites[spriteKey].sh,
            currentFacing: "up",
        });
    }
};

export function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        const sprite = roadObstackleSprites[obs.sprite];
        ctx.drawImage(obstaclesSpriteSheet, sprite.x, sprite.y, sprite.w, sprite.h, obs.x, obs.y, sprite.sw, sprite.sh);
    }
};

export function drawStationObtacles(y) {
    for (let i = 0; i < gasStationObstacles.length; i++) {
        const obs = gasStationObstacles[i];
        const sprite = roadObstackleSprites[obs.sprite];
        ctx.drawImage(obstaclesSpriteSheet, sprite.x, sprite.y, sprite.w, sprite.h, obs.x, y - sprite.sh * 18, sprite.sw, sprite.sh);
        obs.y = y - sprite.sh * 18;
    }
    for (let i = 0; i < refillZones.length; i++) {
        refillZones[i].y = y - scale * 190;
    }
};

export function drawPetrolPumpMarking(distance, y) {
    const arrowObj = gasStationMarking[0];
    const pumpObj = gasStationMarking[1];

    ctx.drawImage(stationMarkingSpriteSheet, pumpObj.sprite.x, pumpObj.sprite.y, pumpObj.sprite.w, pumpObj.sprite.h, pumpObj.x, y, pumpObj.sprite.sw, pumpObj.sprite.sh);
    ctx.drawImage(stationMarkingSpriteSheet, arrowObj.sprite.x, arrowObj.sprite.y, arrowObj.sprite.w, arrowObj.sprite.h, arrowObj.x, y, arrowObj.sprite.sw, arrowObj.sprite.sh);

    const distanceY = y + Math.max(pumpObj.sprite.sh, arrowObj.sprite.sh) + scale * 5;
    for (let i = 2; i < 4; i++) {
        const obj = gasStationMarking[i];
        if (distance === obj.key) {
            ctx.drawImage(stationMarkingSpriteSheet, obj.sprite.x, obj.sprite.y, obj.sprite.w, obj.sprite.h, obj.x, distanceY, obj.sprite.sw, obj.sprite.sh);
        }
    }
};

export function drawArrowToStation(y) {
    const sprite = stationMarking["arrowRight"];
    const rightLaneCenter = posX + summer["road"].sw * 0.75;
    ctx.drawImage(stationMarkingSpriteSheet, sprite.x, sprite.y, sprite.w, sprite.h, rightLaneCenter + sprite.sw / 2, y - sprite.sh * 7, sprite.sw, sprite.sh);
};

export function fuelStationMapForRefill() {
    for (let i = refillZones.length - 1; i >= 0; i--) {
        if (refillZones[i].y !== null && refillZones[i].y >= 3000) refillZones.splice(i, 1);
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
        return false;
    }
};