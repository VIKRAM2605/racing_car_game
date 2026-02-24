import { player, playerSpriteSheet } from "./character.js"
import { canvas, ctx, roadSpriteSheet } from "./main.js";

export const sceneSprites = {
    barricade: { x: 506, y: 404, w: 34, h: 31, sw: 34, sh: 31 },
    cone: { x: 514, y: 469, w: 22, h: 29, sw: 22, sh: 29 },
    redLight: { x: 297, y: 605, w: 19, h: 76, sw: 19, sh: 76 },
    orangeLight: { x: 319, y: 605, w: 19, h: 76, sw: 19, sh: 76 },
    greenLight: { x: 341, y: 605, w: 19, h: 76, sw: 19, sh: 76 },
    booth: { x: 368, y: 610, w: 31, h: 71, sw: 31, sh: 71 },
    mailPost: { x: 407, y: 637, w: 24, h: 41, sw: 24, sh: 41 },
    fireHydrant: { x: 443, y: 637, w: 24, h: 39, sw: 24, sh: 39 },
}

export const roadSprite = { x: 0, y: 0, w: 540, h: 960 };


let startY = 0;

export function drawScene() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        playerSpriteSheet,
        sceneSprites.barricade.x, sceneSprites.barricade.y, sceneSprites.barricade.w, sceneSprites.barricade.h,
        10, 20, sceneSprites.barricade.sw, sceneSprites.barricade.sh
    );
}

export function updateScene(delta) {

}

export function updateRoad(delta) {
    startY += player.speed * delta * 750;
    startY = Math.floor(startY % (roadSprite.h * 0.9));
    if (startY >= roadSprite.h * 0.9) startY = 0;
}

export function drawRoad() {
    ctx.imageSmoothingEnabled = false;
    const drawW = roadSprite.w * 0.7;
    const drawH = roadSprite.h * 0.9;

    const logicalW = canvas.width / window.devicePixelRatio;
    const startX = logicalW / 2 - drawW;

    //left road
    ctx.drawImage(
        roadSpriteSheet,
        roadSprite.x, roadSprite.y, roadSprite.w, roadSprite.h,
        startX, startY - 1, drawW, drawH + 2
    );
    // left road top for illusion
    ctx.drawImage(
        roadSpriteSheet,
        roadSprite.x, roadSprite.y, roadSprite.w, roadSprite.h,
        startX, startY - drawH - 1, drawW, drawH + 2
    );

    //right road
    ctx.save();
    ctx.translate(startX + drawW + drawW / 2, startY + drawH / 2);
    ctx.scale(-1, 1);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.drawImage(
        roadSpriteSheet,
        roadSprite.x, roadSprite.y, roadSprite.w, roadSprite.h,
        -drawW / 2, -drawH / 2 - 1, drawW, drawH + 2
    );
    ctx.strokeRect(-drawW / 2, -drawH / 2 - 1, drawW, drawH + 2);
    // right road top for illusion
    ctx.drawImage(
        roadSpriteSheet,
        roadSprite.x, roadSprite.y, roadSprite.w, roadSprite.h,
        -drawW / 2, - drawH / 2 - drawH - 1, drawW, drawH + 2
    );
    ctx.strokeRect(-drawW / 2, - drawH / 2 - drawH - 1, drawW, drawH + 2);
    ctx.restore();
}