import { randomInt } from "./car.js";
import { player, playerSprite, playerSpriteSheet } from "./character.js"
import { canvas, ctx, roadSpriteSheet, streetLightSpriteSheet } from "./main.js";

export const sceneSprites = {
    barricade: { x: 506, y: 404, w: 34, h: 31, sw: 34, sh: 31 },
    cone: { x: 514, y: 469, w: 22, h: 29, sw: 22, sh: 29 },
    redLight: { x: 297, y: 605, w: 19, h: 76, sw: 19 * 1.7, sh: 76 * 1.7 },
    orangeLight: { x: 319, y: 605, w: 19, h: 76, sw: 19 * 1.7, sh: 76 * 1.7 },
    greenLight: { x: 341, y: 605, w: 19, h: 76, sw: 19 * 1.7, sh: 76 * 1.7 },
    booth: { x: 368, y: 610, w: 31, h: 71, sw: 31 * 1.5, sh: 71 * 1.5 },
    mailPost: { x: 407, y: 637, w: 24, h: 41, sw: 24 * 1.3, sh: 41 * 1.3 },
    fireHydrant: { x: 443, y: 637, w: 24, h: 39, sw: 24 * 1.2, sh: 39 * 1.2 },
};

export const ground = { x: 575, y: 296, w: 11, h: 11 };

export const pavement = { x: 590, y: 296, w: 11, h: 11 };

export const roadSprite = { x: 0, y: 0, w: 540, h: 960 };

export const pondSprite = { x: 0, y: 56, w: 350, h: 238, sw: 350, sh: 238 };

export const puddle1Sprite = { x: 30, y: 37, w: 230, h: 106, sw: 230, sh: 106 };
export const puddle2Sprite = { x: 254, y: 161, w: 226, h: 94, sw: 226, sh: 94 };
export const puddle3Sprite = { x: 50, y: 273, w: 210, h: 110, sw: 210, sh: 110 };

export const fountain1Sprite = { x: 0, y: 29, w: 260, h: 202, sw: 260, sh: 202 };

export const fountain2Sprite = { x: 46, y: 48, w: 160, h: 156, sw: 160, sh: 156 };

export const streetLightSprite = { x: 335, y: 145, w: 310, h: 690, sw: 310 * 0.5, sh: 310 * 0.5 };

export const grasses = {
    grass1: { x: 112, y: 187, w: 416, h: 266, sw: 20, sh: 10 },
}

let startY = 0;
let drawableAreaOnLeftSide, drawableAreaOnRightSide;

let scenes = [];
const nextScene = 4;
let sceneTime = 0;

let streetLights = [];
let lampPosXLeft, lampPosXRight;

export function initGroundArea() {

    drawableAreaOnLeftSide = canvas.width / window.devicePixelRatio / 2 - roadSprite.w * 0.7 - 77;
    drawableAreaOnRightSide = canvas.width / window.devicePixelRatio / 2 + roadSprite.w * 0.7 + 77;

    lampPosXLeft = drawableAreaOnLeftSide + 77 - 25;
    lampPosXRight = drawableAreaOnRightSide - 77 + 10;

    streetLights.push({
        x: lampPosXLeft,
        y: -500,                            // the lamp faces rightside so facing is right but position is left sided
        facing: "right"
    });

    streetLights.push({
        x: lampPosXRight,
        y: -500,                             // the lamp faces leftside so facing is left but position is right sided
        facing: "left"
    });


}

export function drawScene() {
    ctx.imageSmoothingEnabled = false;

    let minX = 0, minY = 0;
    let maxX = drawableAreaOnLeftSide, maxY = canvas.height / devicePixelRatio;

    //pavement left
    drawPavement(drawableAreaOnLeftSide, drawableAreaOnLeftSide + 77, minY, maxY, pavement.w, pavement.h)

    //ground drawing for left side of the road;
    drawGround(minX, maxX, minY, maxY, ground.w, ground.h);

    minX = drawableAreaOnRightSide;
    minY = 0;
    maxX = canvas.width / window.devicePixelRatio;
    maxY = canvas.height / window.devicePixelRatio;

    //pavement right
    drawPavement(drawableAreaOnRightSide - 77, drawableAreaOnRightSide, minY, maxY, pavement.w, pavement.h);

    //ground drawing for right side of the road;
    drawGround(minX, maxX, minY, maxY, ground.w, ground.h);

    for (let i = 0; i < scenes.length; i++) {
        const sceneSprite = sceneSprites[scenes[i].scene];
        const pos = scenes[i];
        ctx.imageSmoothingEnabled = false;

        if (scenes[i] === "grass1") {

        } else {
            ctx.drawImage(
                playerSpriteSheet,
                sceneSprite.x, sceneSprite.y, sceneSprite.w, sceneSprite.h,
                Math.floor(pos.x), Math.floor(pos.y), sceneSprite.sw, sceneSprite.sh
            );
        }
    };

    //street Lights will be draw using this function;
    drawStreetLightOnPavement();

};

export function drawPavement(minX, maxX, minY, maxY, w, h) {
    for (let i = minY; i < maxY; i += h) {
        for (let j = minX; j < maxX; j += w) {
            ctx.drawImage(
                playerSpriteSheet,
                pavement.x, pavement.y, pavement.w, pavement.h,
                j, i, w, h
            );
        }
    }
};

export function drawGround(minX, maxX, minY, maxY, w, h) {
    for (let i = minY; i < maxY; i += h) {
        for (let j = minX; j < maxX; j += w) {
            ctx.drawImage(
                playerSpriteSheet,
                ground.x, ground.y, ground.w, ground.h,
                j, i, w, h
            );
        }
    }
};

export function drawStreetLightOnPavement() {
    for (let i = 0; i < streetLights.length; i++) {
        let streetLight = streetLights[i];
        if (streetLight.facing === "right") {
            ctx.drawImage(
                streetLightSpriteSheet,
                streetLightSprite.x, streetLightSprite.y, streetLightSprite.w, streetLightSprite.h,
                streetLight.x, streetLight.y, streetLightSprite.sw, streetLightSprite.sh
            );
        } else {
            ctx.save();

            ctx.translate(streetLight.x + streetLightSprite.sw / 2, streetLight.y + streetLightSprite.sh / 2);

            ctx.scale(-1, 1);
            ctx.drawImage(
                streetLightSpriteSheet,
                streetLightSprite.x, streetLightSprite.y, streetLightSprite.w, streetLightSprite.h,
                -streetLightSprite.sw / 2, -streetLightSprite.sh / 2, streetLightSprite.sw, streetLightSprite.sh
            );
            ctx.restore();
        }
    }
}

export function updateScene(delta) {
    for (let i = 0; i < scenes.length; i++) {
        scenes[i].y += player.speed * delta * 750;
    };

    scenes = scenes.filter(scene => scene.y < 3000);

    for (let i = 0; i < streetLights.length; i++) {
        streetLights[i].y += player.speed * delta * 750;
    };

    streetLights = streetLights.filter(streetLight => streetLight.y < 3000);
    console.log(streetLights);
};

export function spawnScene(delta) {
    sceneTime += delta;
    if (sceneTime > nextScene) {
        sceneTime = 0;
        const keys = Object.keys(sceneSprites);
        const randomScene = keys[randomInt(0, keys.length - 1)];
        let x;
        if (randomScene === "booth" || randomScene === "redLight" || randomScene === "orangeLight" || randomScene === "greenLight" ||
            randomScene === "mailPost" || randomScene === "fireHydrant"
        ) {
            x = canvas.width / window.devicePixelRatio / 2 - roadSprite.w * 0.7 - 77 / 2;
        } else {
            x = 20;
        }
        scenes.push({
            scene: randomScene,
            x: x,
            y: -500,
        });
    }
};

export function spawnStreetLight() {
    const streetLightLastSpawn = streetLights[streetLights.length - 1];

    if (streetLightLastSpawn.y > 300) {
        streetLights.push({
            x: lampPosXLeft,
            y: -500,
            facing: "right"
        });
        streetLights.push({
            x: lampPosXRight,
            y: -500,
            facing: "left"
        });
    }
}

export function updateRoad(delta) {
    startY += player.speed * delta * 750;
    startY = Math.floor(startY % (roadSprite.h * 0.9));
    if (startY >= roadSprite.h * 0.9) startY = 0;
};

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
    //ctx.strokeRect(-drawW / 2 + playerSprite.w * 2, -drawH / 2 - 1, drawW, drawH + 2);
    // right road top for illusionnnnnnnn
    ctx.drawImage(
        roadSpriteSheet,
        roadSprite.x, roadSprite.y, roadSprite.w, roadSprite.h,
        -drawW / 2, - drawH / 2 - drawH - 1, drawW, drawH + 2
    );
    //ctx.strokeRect(-drawW / 2 + playerSprite.w * 2, - drawH / 2 - drawH - 1, drawW, drawH + 2);
    ctx.restore();
};
