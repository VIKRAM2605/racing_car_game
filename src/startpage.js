// need to add a cool retro looking start page with player color choosing and ability to lock a single level or random while playing
import { drawCars, spawnCars, updateCars } from "./car.js";
import { changeDefaultPlayer } from "./character.js";
import { buttonsSpriteSheet, canvas, ctx, desertDetailsSpriteSheet, desertRoadSpriteSheet, guiSpriteSheet, nativeHeight, nativeWidth, npcSpriteSheet, playerSpriteSheet1, playerSpriteSheet2, playerSpriteSheet3, playerSpriteSheet4, scale, summerDetailsSpriteSheet, summerRoadSpriteSheet, winterDetailsSpriteSheet, winterRoadSpriteSheet } from "./main.js";
import { addScene, drawObstacles, drawScene, posX, posY, randomSceneGeneration, removeScene, scene, spawnObstacles, updateDetails, updateObstacles, updateRoad } from "./scene.js";
import { bestScore } from "./score.js";
import { closeButtonSprite, desert, desertDetails, guiSprites, npc1Sprite, npc2Sprite, npc3Sprite, player1Sprite, player2Sprite, player3Sprite, player4Sprite, selectedButtonSprite, summer, summerDetails, winter, winterDetails } from "./SpriteCoordinates.js";

let animationId = null;
let lastTime = 0;

export let pos = {};
export let closePos = {};
export let carPos = {};
export let activeCar = "player1Sprite";
export let isActiveButton = [];
export let activeScenes = ["summer"];
export let scenesPos = {};

const buttons = ["Start", "Scene", "Cars", "Guide"];

export function startPage() {
    animationId = requestAnimationFrame(startPageLoop);
};

export function startPageLoop(currentTime) {

    ctx.clearRect(0, 0, nativeWidth * scale, nativeHeight * scale);
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
    drawCars();

    drawPanel();
    drawButtons();
    drawPageForActiveButton();

    animationId = requestAnimationFrame(startPageLoop);
};

export function stopStartPageLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = 0;

}

export function drawPanel() {
    const panel = guiSprites["panel"];
    const x = (nativeWidth * scale) / 2 - (panel.w * scale) / 2;
    const y = (nativeHeight * scale) / 2 - (panel.h * scale) / 2;

    ctx.drawImage(
        guiSpriteSheet,
        panel.x, panel.y, panel.w, panel.h,
        x, y, panel.w * scale, panel.h * scale
    );

    const panelOutline = guiSprites["panelOutline"];
    const ox = x + (panel.w * scale) / 2 - (panelOutline.w * scale) / 2;
    const oy = y + (panel.h * scale) / 2 - (panelOutline.h * scale) / 2;

    ctx.drawImage(
        guiSpriteSheet,
        panelOutline.x, panelOutline.y, panelOutline.w, panelOutline.h,
        ox, oy, panelOutline.w * scale, panelOutline.h * scale
    );

    const cx = ox + (panelOutline.w * scale) / 2 + scale * 5;


    ctx.font = `${Math.round(15 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = "#7B3F00";
    ctx.lineWidth = 1 * scale;
    ctx.strokeText("REDLINE ", cx, oy + scale * 4);

    ctx.fillStyle = "#E8420A";
    ctx.fillText("REDLINE ", cx, oy + scale * 4);

    ctx.font = `${Math.round(14 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillText(`BEST: ${bestScore}`, cx + 1 - scale * 5, oy + scale * 40 + 1);

    ctx.fillStyle = "#FFE500";
    ctx.fillText(`BEST: ${bestScore}`, cx - scale * 5, oy + scale * 40);
}

export function drawButtons() {
    const panel = guiSprites['panel'];
    const x = (nativeWidth * scale) / 2 - (panel.w * scale) / 2;
    const y = (nativeHeight * scale) / 2 - (panel.h * scale) / 2;

    const panelOutline = guiSprites['panelOutline'];
    const ox = x + (panel.w * scale) / 2 - (panelOutline.w * scale) / 2;
    const oy = y + (panel.h * scale) / 2 - (panelOutline.h * scale) / 2;

    const button = guiSprites["button5"];
    const bx = ox + (panelOutline.w * scale) / 2 - (button.w * scale) / 2;
    const totalH = buttons.length * button.h * scale + (buttons.length - 1) * scale * 5;
    let by = oy + (panelOutline.h * scale) / 2 - totalH / 2;

    for (let i = 0; i < buttons.length; i++) {
        ctx.drawImage(
            guiSpriteSheet,
            button.x, button.y, button.w, button.h,
            bx, by, button.w * scale, button.h * scale
        );

        ctx.font = `${Math.round(10 * scale)}px PixelFont`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText(buttons[i], bx + (button.w * scale) / 2, by + (button.h * scale) / 2);

        pos[buttons[i]] = {
            x: bx,
            y: by,
            w: button.w * scale,
            h: button.h * scale
        }

        by += button.h * scale + scale * 5;
    }
}

export function drawPanelForMenuButtons() {

    const menuPanel = guiSprites["menuPanel"];
    const mx = (nativeWidth * scale) / 2 - (menuPanel.w * scale) / 2;
    const my = (nativeHeight * scale) / 2 - (menuPanel.h * scale) / 2;

    ctx.drawImage(
        guiSpriteSheet,
        menuPanel.x, menuPanel.y, menuPanel.w, menuPanel.h,
        mx, my, menuPanel.w * scale, menuPanel.h * scale
    );

    const panelOutline = guiSprites["menuPanelOutline"];
    const ox = mx + (menuPanel.w * scale) / 2 - (panelOutline.w * scale) / 2;
    const oy = my + (menuPanel.h * scale) / 2 - (panelOutline.h * scale) / 2;

    ctx.drawImage(
        guiSpriteSheet,
        panelOutline.x, panelOutline.y, panelOutline.w, panelOutline.h,
        ox, oy, panelOutline.w * scale, panelOutline.h * scale
    );

    const cancelBtn = guiSprites["button5"];
    const bx = ox + (panelOutline.w * scale) / 2 - (cancelBtn.w * scale) / 2;
    const by = oy + panelOutline.h * scale - cancelBtn.h * scale - scale * 5;

    ctx.drawImage(
        guiSpriteSheet,
        cancelBtn.x, cancelBtn.y, cancelBtn.w, cancelBtn.h,
        bx, by, cancelBtn.w * scale, cancelBtn.h * scale
    );

    drawTitle(isActiveButton[0], ox, oy, panelOutline);

    ctx.font = `${Math.round(10 * scale)}px PixelFont`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Close", bx + (cancelBtn.w * scale) / 2, by + (cancelBtn.h * scale) / 2);

    closePos["cancel"] = {
        x: bx,
        y: by,
        w: cancelBtn.w * scale,
        h: cancelBtn.h * scale
    }

    if (isActiveButton[0] === "Scene") {
        drawSceneOnStartPage(ox, oy, panelOutline);
    }
    else if (isActiveButton[0] === "Cars") {
        showAvailableCars(ox, oy, panelOutline);
    }
    else if (isActiveButton[0] === "Guide") {
        howToPlay(ox, oy, panelOutline);
    }

}

export function drawTitle(title, ox, oy, panelOutline) {
    ctx.font = `${Math.round(18 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = "#d8b4fd";
    ctx.lineWidth = 1 * scale;
    ctx.strokeText(title, ox + (panelOutline.w * scale) / 2, oy + scale * 4);

    ctx.fillStyle = "black";
    ctx.fillText(title, ox + (panelOutline.w * scale) / 2, oy + scale * 4);
}

export function isClickOnStartButton(x, y) {
    if (isActiveButton[0]) return false;
    return (
        x >= pos["Start"].x &&
        x <= pos["Start"].x + pos["Start"].w &&
        y >= pos["Start"].y &&
        y <= pos["Start"].y + pos["Start"].h
    )
};

export function isClickOnSceneButton(x, y) {
    if (isActiveButton[0]) return false;
    return (
        x >= pos["Scene"].x &&
        x <= pos["Scene"].x + pos["Scene"].w &&
        y >= pos["Scene"].y &&
        y <= pos["Scene"].y + pos["Scene"].h
    )
};

export function isClickOnColorButton(x, y) {
    if (isActiveButton[0]) return;
    return (
        x >= pos["Cars"].x &&
        x <= pos["Cars"].x + pos["Cars"].w &&
        y >= pos["Cars"].y &&
        y <= pos["Cars"].y + pos["Cars"].h
    )
};

export function isClickOnGuideButton(x, y) {
    if (isActiveButton[0]) return false;
    return (
        x >= pos["Guide"].x &&
        x <= pos["Guide"].x + pos["Guide"].w &&
        y >= pos["Guide"].y &&
        y <= pos["Guide"].y + pos["Guide"].h
    )
};

export function clearIsActiveButton() {
    isActiveButton[0] = null;
};

export function drawPageForActiveButton() {
    if (isActiveButton.length === 0 || isActiveButton[0] === "" || isActiveButton[0] === null) return;

    drawPanelForMenuButtons();

};

export function showAvailableCars(ox, oy, panelOutline) {
    const cars = ["Blue", "Red", "Yellow", "Green"];
    const key = ["1", "2", "3", "4"];
    const sheets = [playerSpriteSheet1, playerSpriteSheet2, playerSpriteSheet3, playerSpriteSheet4];
    const sprites = [player1Sprite, player2Sprite, player3Sprite, player4Sprite];

    const frame = guiSprites["frame"];
    const fw = frame.w;
    const fh = frame.h;

    const rows = 2;
    const cols = 2;
    const gapX = scale * 6;
    const gapY = scale * 12;
    const margin = scale * 8;

    const totalW = cols * fw + (cols - 1) * gapX;
    const totalH = rows * (fh + scale * 10) + (rows - 1) * gapY;

    const startX = ox + (panelOutline.w * scale) / 2 - (totalW) / 2;
    const startY = oy + (panelOutline.h * scale) / 2 - (totalH) / 2;

    const cx = ox + (panelOutline.w * scale) / 2;

    ctx.font = `${Math.round(7 * scale)}px PixelFont`;
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Click On the Desired Car Frame To Select It.", cx, oy + scale * 20);
    ctx.fillText("The Selected Car Type Will be Available to Play.", cx, oy + scale * 30);
    ctx.fillText("Default Is Blue Colored Car.", cx, oy + scale * 40);

    for (let i = 0; i < cars.length; i++) {

        const col = i % cols;
        const row = Math.floor(i / cols);

        const fx = startX + col * (fw + gapX);
        const currentY = startY + row * (fh + scale * 10 + gapY);

        const sprite = sprites[i]["up"];

        ctx.drawImage(
            guiSpriteSheet,
            frame.x, frame.y, frame.w, frame.h,
            fx, currentY, fw, fh
        );

        const dw = fw - margin * 3;
        const dh = fh - margin * 3;

        const dx = fx + (fw) / 2 - (dw) / 2;
        const dy = currentY + (fh) / 2 - (dh) / 2;

        ctx.drawImage(
            sheets[i],
            sprite.x, sprite.y, sprite.w, sprite.h,
            dx, dy, dw, dh
        );

        if (activeCar.includes(key[i])) {
            ctx.strokeStyle = "#FFD700";
            ctx.lineWidth = 2;
            ctx.strokeRect(fx, currentY, fw, fh);
        }

        ctx.font = `${Math.round(8 * scale)}px PixelFont`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cars[i], fx + fw / 2, currentY + fh + scale * 8);

        carPos[key[i]] = {
            x: fx,
            y: currentY,
            w: fw,
            h: fh
        }
    }
}

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
    if (closePos["cancel"] === null || Object.keys(closePos).length === 0) return false;
    return (
        x >= closePos["cancel"].x &&
        x <= closePos["cancel"].x + closePos["cancel"].w &&
        y >= closePos["cancel"].y &&
        y <= closePos["cancel"].y + closePos["cancel"].h
    );
};

export function drawSceneOnStartPage(ox, oy, panelOutline) {

    const scenes = ["summer", "winter", "desert"];
    const sheets = [summerDetailsSpriteSheet, winterDetailsSpriteSheet, desertDetailsSpriteSheet];
    const sprites = [summerDetails["details1"], winterDetails["details1"], desertDetails["details1"]];

    const gap = scale * 8;
    const frame = guiSprites["frame"];

    const itemH = frame.h + scale * 10;
    const totalH = scenes.length * itemH + (scenes.length - 1) * gap;
    let currentY = oy + (panelOutline.h * scale) / 2 - (totalH) / 2;
    const cx = ox + (panelOutline.w * scale) / 2;

    const margin = scale * 2;


    ctx.fillStyle = "red";
    ctx.font = `${Math.round(6.5 * scale)}px PixelFont`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Click On Displayed Frames To Enable Them During The GamePlay!", cx, oy + scale * 20);
    ctx.fillText("Selected Frames Take Time To Be Actually Seen.", cx, oy + scale * 28);
    ctx.fillText("Can Select Mutiple Scenes At A Single Go!", cx, oy + scale * 36);

    for (let i = 0; i < scenes.length; i++) {
        const sprite = sprites[i];
        const fw = frame.w;
        const fh = frame.h;

        const fx = cx - fw / 2;

        ctx.drawImage(
            guiSpriteSheet,
            frame.x, frame.y, frame.w, frame.h,
            fx, currentY, fw, fh
        );

        const dw = fw - margin * 2;
        const dh = fh - margin * 2;

        ctx.drawImage(
            sheets[i],
            sprite.x, sprite.y, sprite.w, sprite.h,
            fx + margin, currentY + margin, dw, dh
        );

        if (activeScenes.includes(scenes[i])) {
            ctx.strokeStyle = "#FFD700";
            ctx.lineWidth = 2;
            ctx.strokeRect(fx, currentY, fw, fh);
        }

        ctx.font = `${Math.round(8 * scale)}px PixelFont`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(scenes[i], cx, currentY + fh + scale * 8);

        scenesPos[scenes[i]] = {
            x: fx,
            y: currentY,
            w: fw,
            h: fh
        }

        currentY += fh + scale * 10 + gap;
    }
}

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

export function howToPlay(ox, oy, panelOutline) {
    const cx = ox + (panelOutline.w * scale) / 2;
    const pw = panelOutline.w * scale;
    const ph = panelOutline.h * scale;

    const sections = [
        {
            title: "Controls",
            color: "#FFE500",
            items: [
                "↑ / W      Accelerate",
                "↓ / S      Brake",
                "← / A      Steer Left",
                "→ / D      Steer Right",
                "Space      Brake"
            ]
        },
        {
            title: "Obstacles",
            color: "#FF2A2A",
            items: [
                "Dodge Cones, Barricades & Potholes",
                "Each hit costs you a Heart"
            ]
        },
        {
            title: "Fuel",
            color: "#00FF5E",
            items: [
                "Pull into Gas Station to refuel",
                "Going Offroad drains fuel faster",
                "Run out of fuel — Game Over"
            ]
        },
        {
            title: "Health",
            color: "#FF6A00",
            items: [
                "You have 3 Hearts",
                "Offroad too long loses a Heart",
                "Lose all Hearts — Game Over"
            ]
        }
    ]

    const titleSize = Math.round(18 * scale);
    const itemSize = Math.round(8 * scale);
    const titleGap = scale * 14;
    const itemGap = scale * 10;
    const sectionGap = scale * 6;

    let totalH = 0;
    for (const s of sections) {
        totalH += titleGap + s.items.length * itemGap + sectionGap;
    }

    let currentY = oy + ph / 2 - totalH / 2;
    const leftPadding = ox + scale * 12;

    for (const section of sections) {
        ctx.font = `${titleSize}px PixelFont`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1 * scale;
        ctx.strokeText(`${section.title}`, leftPadding, currentY);

        ctx.fillStyle = section.color;
        ctx.fillText(`${section.title}`, leftPadding, currentY);
        currentY += titleGap;

        ctx.font = `${itemSize}px PixelFont`;
        ctx.fillStyle = "black";
        for (const item of section.items) {
            ctx.fillText(item, leftPadding, currentY);
            currentY += itemGap;
        }

        currentY += sectionGap;

    }
}