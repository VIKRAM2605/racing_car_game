import { cars } from "./car.js";
import { angle, player, playerSprite } from "./character.js";

export function collisionCheck() {
    let check = isCollidingWithCars();
    if (check) return true;
    check = isCollidingWithObjects();
    if (check) return true;

    return false;
}

export function isCollidingWithObjects() {
    return false;
}

export function isCollidingWithCars() {
    const shrinkY = 8, shrinkX = 2;
    const hitBoxH = playerSprite.h * 2 - (shrinkY * 2);
    const hitBoxW = playerSprite.w * 2 - (shrinkX * 2);
    for (let i = 0; i < cars.length; i++) {
        const playerCorners = getRotatedCorners(player.x + playerSprite.w, player.y + playerSprite.h, hitBoxW, hitBoxH, angle)
        const car = cars[i];
        const carCorners = getRotatedCorners(car.x + playerSprite.w, car.y + playerSprite.h, hitBoxW, hitBoxH, 0)
        if (
            doPolygonsIntersect(playerCorners, carCorners)
        ) return true
    }
    return false;
};

export function getRotatedCorners(cx, cy, width, heigth, angleInDegrees) {

    const angle = angleInDegrees * Math.PI / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const hw = width / 2;
    const hh = heigth / 2;

    return [
        { x: cx + (-hw) * cos - (-hh) * sin, y: cy + (-hw) * sin - (-hh) * cos },
        { x: cx + (hw) * cos - (-hh) * sin, y: cy + (hw) * sin - (-hh) * cos },
        { x: cx + (hw) * cos - (hh) * sin, y: cy + (hw) * sin - (hh) * cos },
        { x: cx + (-hw) * cos - (hh) * sin, y: cy + (-hw) * sin - (hh) * cos }
    ]
};

export function doPolygonsIntersect(a, b) {
    const polygons = [a, b];
    for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i];
        for (let j = 0; j < polygon.length; j++) {
            const p1 = polygon[j];
            const p2 = polygon[(j + 1) % polygons.length];

            const normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            let minA = Infinity, maxA = -Infinity;
            for (const p of a) {
                const projected = normal.x * p.x + normal.y * p.y;
                minA = Math.min(minA, projected);
                maxA = Math.max(maxA, projected);
            }

            let minB = Infinity, maxB = -Infinity;
            for (const p of b) {
                const projected = normal.x * p.x + normal.y * p.y;
                minB = Math.min(minB, projected);
                maxB = Math.max(maxB, projected);
            }
            if (maxA < minB || minA > maxB) return false;
        }
    }
    return true;
};