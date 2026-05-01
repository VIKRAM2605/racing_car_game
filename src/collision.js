import { cars } from "./car.js";
import { player, playerSprite, steeringAngle } from "./character.js";
import { ctx, scale } from "./main.js";
import { gasStationObstacles, obstacles } from "./scene.js";
import { playCollisonSound } from "./sound.js";

export const invinsibleTime = 3;
export let currentInvinsibleTime = 0;
export let isInvinsible = false;

export function getCarCorners(entity, paddingX = scale * 1, paddingY = scale * 1) {
    let angle = 0;
    if (entity === player) {
        angle = steeringAngle;
    } else if (entity.facing) {
        // NPC cars — axis aligned, no rotation needed
        angle = 0;
    }
    // obstacles default to 0

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const w = entity.w / 2 - paddingX;
    const h = entity.h / 2 - paddingY;

    const cx = entity.x + entity.w / 2;
    const cy = entity.y + entity.h / 2;

    return [
        { x: cx + (-w * cos - -h * sin), y: cy + (-w * sin + -h * cos) },
        { x: cx + (w * cos - -h * sin), y: cy + (w * sin + -h * cos) },
        { x: cx + (w * cos - h * sin), y: cy + (w * sin + h * cos) },
        { x: cx + (-w * cos - h * sin), y: cy + (-w * sin + h * cos) }
    ];
}

export function project(corners, axis) {
    const dots = corners.map(c => c.x * axis.x + c.y * axis.y);
    return { min: Math.min(...dots), max: Math.max(...dots) };
}

export function getAxes(angle) {
    return [
        { x: Math.cos(angle), y: Math.sin(angle) },
        { x: -Math.sin(angle), y: Math.cos(angle) }
    ];
}

export function isColliding(entity) {

    if (entity.y < -entity.h * 2 || entity.y > 3000) return false;


    const cornerA = getCarCorners(player);
    const cornerB = getCarCorners(entity);

    // player uses steeringAngle, everything else is axis-aligned (angle 0)
    const axes = [...getAxes(steeringAngle), ...getAxes(0)];

    for (const axis of axes) {
        const a = project(cornerA, axis);
        const b = project(cornerB, axis);
        if (a.max < b.min || b.max < a.min) return false;
    }

    return true;
}

export function checkCollision(delta) {
    if (isInvinsible) {
        currentInvinsibleTime += delta;
        if (currentInvinsibleTime > invinsibleTime) {
            currentInvinsibleTime = 0;
            isInvinsible = false;
        }
        return false;
    }

    if (checkNPCCarCollision()) {
        playCollisonSound();
        isInvinsible = true;
        return true;
    }

    if (checkObstacleCollision()) {
        playCollisonSound();
        isInvinsible = true;
        return true;
    }

    if (checkGasStationObstacleCollsion()) {
        playCollisonSound();
        isInvinsible = true;
        return true;
    }

    return false;
}

export function checkObstacleCollision() {
    for (const obs of obstacles) {
        if (!obs.isDeadly) continue;
        if (isColliding(obs)) return true;
    }
    return false;
}

export function checkGasStationObstacleCollsion() {
    for (const obs of gasStationObstacles) {
        if (obs.y === undefined || obs.y === null) continue;
        if (!obs.isDeadly) continue;
        if (isColliding(obs)) return true;
    }
    return false;
}

export function checkNPCCarCollision() {
    for (const car of cars) {
        if (isColliding(car)) return true;
    }
    return false;
}