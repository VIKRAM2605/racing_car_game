import { player, playerSpriteSheet } from "./character.js"
import { canvas, ctx } from "./main.js";

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

export const roadSprites = {

}

export function drawScene() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        playerSpriteSheet,
        sceneSprites.barricade.x, sceneSprites.barricade.y, sceneSprites.barricade.w, sceneSprites.barricade.h,
        10, 20, sceneSprites.barricade.sw, sceneSprites.barricade.sh
    );
}

export function updateScene() {

}