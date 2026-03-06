// need to add a cool retro looking start page with player color choosing and ability to lock a single level or random while playing

import { drawCars, spawnCars, updateCars } from "./car.js";
import { changeDefaultPlayer } from "./character.js";
import { buttonsSpriteSheet, canvas, ctx, desertRoadSpriteSheet, npcSpriteSheet, playerSpriteSheet1, playerSpriteSheet2, playerSpriteSheet3, playerSpriteSheet4, summerRoadSpriteSheet, winterRoadSpriteSheet } from "./main.js";
import { addScene, drawObstacles, drawScene, posX, posY, randomSceneGeneration, removeScene, scene, spawnObstacles, updateDetails, updateObstacles, updateRoad } from "./scene.js";
import { closeButtonSprite, desert, npc1Sprite, npc2Sprite, npc3Sprite, player1Sprite, player2Sprite, player3Sprite, player4Sprite, scale, selectedButtonSprite, startPageUI, summer, winter } from "./SpriteCoordinates.js";

let animationId = null;
let lastTime = 0;

export let pos = {};
export let closePos = [];
export let carPos = {};
export let activeCar = "player1Sprite";
export let isActiveButton = [];
export let activeScenes = ["summer"];
export let scenesPos = {};

export function startPage() {
    animationId = requestAnimationFrame(startPageLoop);
};

export function startPageLoop(currentTime) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

    spawnCars(delta);
    spawnObstacles(delta);

    updateRoad(delta);
    updateCars(delta);
    updateDetails(delta);
    updateObstacles(delta);

    randomSceneGeneration(delta);

    drawScene();
    drawObstacles();
    drawCars();

    drawButtons();
    drawPageForActiveButton();

    animationId = requestAnimationFrame(startPageLoop);
};

export function stopStartPageLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = 0;

}

export function drawButtons() {
    const keys = Object.keys(startPageUI);
    let currentX = posX + scale * 4;
    let currentY = canvas.height / window.devicePixelRatio / 2 - keys.length / 2 * startPageUI["start"].sh;
    for (let i = 0; i < keys.length; i++) {

        const sprite = startPageUI[keys[i]];
        ctx.drawImage(
            buttonsSpriteSheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            currentX, currentY, sprite.sw, sprite.sh
        );

        pos[keys[i]] = {
            x: currentX,
            y: currentY,
            w: sprite.sw,
            h: sprite.sh,
        }

        currentY += sprite.sh * 2;
    }
};

export function isClickOnStartButton(x, y) {
    return (
        x >= pos["start"].x &&
        x <= pos["start"].x + pos["start"].w &&
        y >= pos["start"].y &&
        y <= pos["start"].y + pos["start"].h
    )
};

export function isClickOnSceneButton(x, y) {
    return (
        x >= pos["scene"].x &&
        x <= pos["scene"].x + pos["scene"].w &&
        y >= pos["scene"].y &&
        y <= pos["scene"].y + pos["scene"].h
    )
};

export function isClickOnColorButton(x, y) {
    return (
        x >= pos["cars"].x &&
        x <= pos["cars"].x + pos["cars"].w &&
        y >= pos["cars"].y &&
        y <= pos["cars"].y + pos["cars"].h
    )
};

export function isClickOnGuideButton(x, y) {
    return (
        x >= pos["guide"].x &&
        x <= pos["guide"].x + pos["guide"].w &&
        y >= pos["guide"].y &&
        y <= pos["guide"].y + pos["guide"].h
    )
};

export function clearIsActiveButton() {
    isActiveButton[0] = null;
};

export function drawPageForActiveButton() {
    if (isActiveButton.length === 0 || isActiveButton[0] === "" || isActiveButton[0] === null) return;

    let bgWidth = Math.round(scale * 130);
    let bgHeight = Math.round(scale * 130);

    let x = posX + summer["road"].sw + scale * 3;
    let y = canvas.height / window.devicePixelRatio / 2 - bgHeight / 2 + scale * 20;

    drawBackGround(x, y, bgWidth, bgHeight);
    drawCloseButton(x + bgWidth - scale * 2, y + scale * 2);
    drawTitle(x + bgWidth / 2, y + scale * 2);
    showPlayerColorOption(x, y, bgWidth, bgHeight);
    drawSceneOnStartPage(x, y, bgWidth);
    showHowToPlay(x, y);
};

export function drawBackGround(x, y, w = scale * 20, h = scale * 20, radius = 10) {
    if (isActiveButton[0] === "start") return;
    ctx.fillStyle = "#1e1e1e";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fill();
};

export function drawCloseButton(x, y) {
    x -= closeButtonSprite.sw;
    if (isActiveButton[0] === "start") return;
    ctx.drawImage(
        buttonsSpriteSheet,
        closeButtonSprite.x, closeButtonSprite.y, closeButtonSprite.w, closeButtonSprite.h,
        x, y, closeButtonSprite.sw, closeButtonSprite.sh
    );
    closePos[0] = {
        x: x,
        y: y,
        w: closeButtonSprite.sw,
        h: closeButtonSprite.sh,
    };
};

export function drawTitle(x, y) {
    if (isActiveButton[0] === "start") return;
    const sprite = startPageUI[isActiveButton[0]];
    ctx.drawImage(
        buttonsSpriteSheet,
        sprite.x, sprite.y, sprite.w, sprite.h,
        x - sprite.sw / 2, y, sprite.sw, sprite.sh
    )
};

export function showPlayerColorOption(x, y, w, h) {
    if (isActiveButton[0] != "cars") return;
    const players = [player1Sprite, player2Sprite, player3Sprite, player4Sprite];
    const sheets = [playerSpriteSheet1, playerSpriteSheet2, playerSpriteSheet3, playerSpriteSheet4];
    const key = ["1", "2", "3", "4"];

    const maxRow = 2;
    const maxCol = 0;

    let currentX = x + scale * 10;
    let currentY = y + scale * 25;

    let row = 0;
    let col = 0;

    for (let i = 0; i < players.length; i++) {
        const sprite = players[i];
        const sheet = sheets[i];

        ctx.drawImage(
            sheet,
            sprite.up.x, sprite.up.y, sprite.up.w, sprite.up.h,
            currentX, currentY, sprite.up.sw, sprite.up.sh
        );
        if (activeCar === "player" + key[i] + "Sprite") {
            ctx.drawImage(
                buttonsSpriteSheet,
                selectedButtonSprite.x, selectedButtonSprite.y, selectedButtonSprite.w, selectedButtonSprite.h,
                currentX + selectedButtonSprite.sw + scale * 2, currentY, selectedButtonSprite.sw, selectedButtonSprite.sh
            );
        }
        carPos[key[i]] = {
            x: currentX,
            y: currentY,
            w: sprite.up.sw,
            h: sprite.up.sh
        }
        if (col < maxCol) {
            col++;
            currentX += sprite.up.sw + scale * 5;
        }
        else {
            row++;
            col = 0;
            currentX = x + scale * 10;
            currentY += sprite.up.sh + scale * 15;
        }
    }
};

export function isClickOnCar(x, y) {
    const key = Object.keys(carPos);
    for (let i = 0; i < key.length; i++) {
        const val = carPos[key[i]];
        if (x >= val.x &&
            x <= val.x + val.w &&
            y >= val.y &&
            y <= val.y + val.h) {
            activeCar = "player" + key[i] + "Sprite";

            changeDefaultPlayer(parseInt(key[i]) - 1);

            return true;
        }
    }
    return false;
};

export function isClickOnCloseButton(x, y) {
    if (closePos[0] === null || closePos.length === 0) return false;
    return (
        x >= closePos[0].x &&
        x <= closePos[0].x + closePos[0].w &&
        y >= closePos[0].y &&
        y <= closePos[0].y + closePos[0].h
    );
};

export function drawSceneOnStartPage(x, y, w) {
    if (isActiveButton[0] !== "scene") return;

    let currentX = x + scale * 5;
    let currentY = y + scale * 25;

    let scenes = [summer["road"], winter["road"], desert["road"]];
    let sheets = [summerRoadSpriteSheet, winterRoadSpriteSheet, desertRoadSpriteSheet];
    let keys = ["summer", "winter", "desert"];

    ctx.fillStyle = "#FFD700";
    ctx.font = `bold ${scale * 5}px monospace`;
    ctx.fillText("Note:", currentX + w / 2 - scale * 22, currentY + scale * 3);

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${scale * 4}px monospace`;
    ctx.fillText("  Selecting 2+ scenes", currentX + w / 2 - scale * 22, currentY + scale * 14);
    ctx.fillText("  randomly spawns them across", currentX + w / 2 - scale * 22, currentY + scale * 28);
    ctx.fillText("  the Start Page and in-game.", currentX + w / 2 - scale * 22, currentY + scale * 42);

    for (let i = 0; i < keys.length; i++) {
        const sprite = scenes[i];
        const sheet = sheets[i];
        const key = keys[i];

        ctx.drawImage(
            sheet,
            sprite.x, sprite.y, sprite.w, sprite.h,
            currentX, currentY, sprite.sw * 0.4, sprite.sh * 0.4
        );

        for (let j = 0; j < activeScenes.length; j++) {
            if (activeScenes[j] === key) {
                ctx.drawImage(
                    buttonsSpriteSheet,
                    selectedButtonSprite.x, selectedButtonSprite.y, selectedButtonSprite.w, selectedButtonSprite.h,
                    currentX + sprite.sw * 0.4 + scale * 3, currentY + sprite.sh * 0.4 / 2 - selectedButtonSprite.sh / 2, selectedButtonSprite.sw, selectedButtonSprite.sh
                );
            }
        };

        scenesPos[key] = {
            x: currentX,
            y: currentY,
            w: sprite.sw * 0.4,
            h: sprite.sh * 0.4
        }

        currentY += sprite.sw * 0.4 + scale * 5;
    }
};

export function isClickOnScene(x, y) {
    const keys = Object.keys(scenesPos);
    for (let i = 0; i < keys.length; i++) {
        const pos = scenesPos[keys[i]];
        if (x >= pos.x &&
            x <= pos.x + pos.w &&
            y >= pos.y &&
            y <= pos.y + pos.h) {
            const isThere = activeScenes.indexOf(keys[i]);
            if (isThere === -1) {
                activeScenes.push(keys[i]);
                addScene(keys[i]);
            } else if (activeScenes.length > 1) {
                activeScenes.splice(isThere, 1);
                removeScene(keys[i]);
            }
            return true;
        }
    }
    return false;
};

export function showHowToPlay(x, y) {
    if (isActiveButton[0] !== "guide") return;

    const left = x + scale * 5;
    let currentY = y + scale * 25;
    const lineH = scale * 10;

    ctx.fillStyle = "#FFD700";
    ctx.font = `bold ${scale * 5}px monospace`;
    ctx.textAlign = "left";
    ctx.fillText("CONTROLS", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${scale * 4}px monospace`;
    ctx.fillText("  ↑/W, ↓/S/Space Bar,  ←/A, →/D   Move Your Car", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#FFD700";
    ctx.font = `bold ${scale * 5}px monospace`;
    ctx.fillText("OBSTACLES", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${scale * 4}px monospace`;
    ctx.fillText("  Dodge Cones, Barricades, Potholes", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#FFD700";
    ctx.font = `bold ${scale * 5}px monospace`;
    ctx.fillText("Fuel", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${scale * 4}px monospace`;
    ctx.fillText("  Pull into Gas Stations to top up your fuel", left, currentY);
    currentY += lineH;

    // ctx.fillStyle = "#ffffff";
    // ctx.font = `bold ${scale * 4}px monospace`;
    // ctx.fillText("  to top up your fuel", left, currentY);
    // currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${scale * 4}px monospace`;
    ctx.fillText("  Don't Stay OffRoad too Long else you lose a heart and", left, currentY);
    currentY += lineH;

    // ctx.fillStyle = "#ffffff";
    // ctx.font = `bold ${scale * 4}px monospace`;
    // ctx.fillText("  else you lose a heart and", left, currentY);
    // currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${scale * 4}px monospace`;
    ctx.fillText("  fuel will be consumed more", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#FFD700";
    ctx.bold = `bold ${scale * 5}px monospace`;
    ctx.fillText("HEALTH", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.bold = `bold ${scale * 4}px monospace`;
    ctx.fillText("  You Have 3 lives —", left, currentY);
    currentY += lineH;

    ctx.fillStyle = "#ffffff";
    ctx.bold = `bold ${scale * 4}px monospace`;
    ctx.fillText("  survive as long as you can!", left, currentY);
}