import { cars } from "./car.js";
import { player, playerSprite } from "./character.js";

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
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        if (
            player.x < car.x + playerSprite.w * 2 &&
            player.x + playerSprite.w * 2 > car.x &&
            player.y < car.y + playerSprite.h * 2 &&
            player.y + playerSprite.h * 2 > car.y
        ) return true
    }
    return false;
}