import { cars } from "./car.js";
import { player, playerSprite } from "./character.js";
import { ctx } from "./main.js";
import { gasStationObstacles, obstacles } from "./scene.js";

const directionalAngles = {
    up: -Math.PI / 2,
    upRight: -Math.PI / 4,
    upLeft: -3 * Math.PI / 4,
};

export function getCarCorners(player, paddingX = 4, paddingY = 4) {
    const angle = directionalAngles[player.currentFacing] ?? 0;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const w = player.w / 2 - paddingX;
    const h = player.h / 2 - paddingY;

    const cx = player.x + player.w / 2;
    const cy = player.y + player.h / 2;

    return [
        { x: cx + (-w * cos - -h * sin), y: cy + (-w * sin + -h * cos) },
        { x: cx + (w * cos - -h * sin), y: cy + (w * sin + -h * cos) },
        { x: cx + (w * cos - h * sin), y: cy + (w * sin + h * cos) },
        { x: cx + (-w * cos - h * sin), y: cy + (-w * sin + h * cos) }
    ]
};

export function project(corners, axis) {
    const dots = corners.map(c => c.x * axis.x + c.y * axis.y);
    return { min: Math.min(...dots), max: Math.max(...dots) };
};

export function getAxes(angle) {
    return [
        { x: Math.cos(angle), y: Math.sin(angle) },
        { x: -Math.sin(angle), y: Math.cos(angle) }
    ]
};

export function isColliding(car) {
    const cornerA = getCarCorners(player);
    const cornerB = getCarCorners(car);

    const angleA = directionalAngles[player.currentFacing] ?? 0;
    const angleB = directionalAngles[car.currentFacing] ?? 0;
    const axes = [...getAxes(angleA), ...getAxes(angleB)];

    for (const axis of axes) {
        const a = project(cornerA, axis);
        const b = project(cornerB, axis);

        if (a.max < b.min || b.max < a.min) return false;
    }

    return true;
}


// need to add colliosn for npc cars and obstacles here use your brain bud for polygon interaction
export function checkCollision() {
    let check = checkNPCCarCollision();
    if (check) {
        return true;
    }
    check = checkObstacleCollision();
    if (check) {
        return true;
    }
    check = checkGasStationObstacleCollsion();
    if (check) {
        return true;
    }

};

export function checkObstacleCollision() {
    for (const obs of obstacles) {
        if (isColliding(obs) && obs.isDeadly) {
            return true;
        }
    }
    return false;
};

export function checkGasStationObstacleCollsion() {
    for (const obs of gasStationObstacles) {
        if (obs.y === undefined || obs.y === null) continue;
        if (isColliding(obs)) {
            return true;
        }
    }
    return false;
};

export function checkNPCCarCollision() {
    for (const car of cars) {
        if (isColliding(car)) {
            return true;
        }
    }
    return false;
};
