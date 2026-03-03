import { player, playerSprite } from "./character.js";
import { ctx } from "./main.js";
import { obstacles } from "./scene.js";

const playerCollisionBox = {
    "up": [
        { xRatio: 0.1, yRatio: 0, wRatio: 0.7, hRatio: 0.1 },
        { xRatio: 0, yRatio: 0.12, wRatio: 0.9, hRatio: 0.5 },
        { xRatio: 0, yRatio: 0.6, wRatio: 0.9, hRatio: 0.3 },
    ],
    "upRight": [
        { xRatio: 0.1, yRatio: 0.2, wRatio: 0.3, hRatio: 0.9 },
        { xRatio: 0, yRatio: 0, wRatio: 0, hRatio: 0 },
        { xRatio: 0, yRatio: 0, wRatio: 0, hRatio: 0 },
    ],
    "upLeft": [
        { xRatio: 0, yRatio: 0, wRatio: 0, hRatio: 0 },
        { xRatio: 0, yRatio: 0, wRatio: 0, hRatio: 0 },
        { xRatio: 0, yRatio: 0, wRatio: 0, hRatio: 0 },
    ]
};

function rotatePoint(px, py, cx, cy, angleRad) {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: cx + (px - cx) * cos - (py - cy) * sin,
        y: cy + (px - cx) * sin + (py - cy) * cos,
    };
}

function getPlayerPoints() {
    const sprite = playerSprite[player.currentFacing];
    const x = player.x;
    const y = player.y;
    const w = sprite.sw;
    const h = sprite.sh;

    // center of the sprite
    const cx = x + w / 2;
    const cy = y + h / 2;

    // base "up" shape points
    const basePoints = [
        { x: x + w * 0, y: y },
        { x: x + w * 0.9, y: y },
        { x: x + w * 0.9, y: y + h },
        { x: x + w * 0, y: y + h },
    ];

    let angle = 0;
    if (player.currentFacing === "upRight") angle = 35 * (Math.PI / 180);  // 35 degrees
    if (player.currentFacing === "upLeft") angle = -35 * (Math.PI / 180); // -35 degrees

    return basePoints.map(p => rotatePoint(p.x, p.y, cx, cy, angle));
}

export function drawPlayerBox() {
}
// need to add colliosn for npc cars and obstacles here use your brain bud for polygon interaction
export function checkCollision() {
    let check = checkObstacleCollision();
    if (check) {
        return true;
    }
    check = checkNPCCarCollision();
    if (check) {
        return true;
    }

};

export function checkObstacleCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
    }
};

export function ckeckGasStationObstacleCollsion() {

};

export function checkNPCCarCollision() {

}
