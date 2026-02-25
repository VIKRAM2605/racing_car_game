import { player, playerSprite, playerSpriteSheet } from "./character.js";
import { roadSprite } from "./scene.js";

let lastSpawn = 0;
let nextSpawn = 4;
let timePassed = 0;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
export let startXLeft, startXRight, cars, carSpritesUp, carSpritesDown, carLanePosition;

export function initCars() {
    cars = [];

    carSpritesUp = {
        blueCar: { x: 338, y: 347, w: 39, h: 83 },
        redStrippedCar: { x: 380, y: 347, w: 39, h: 83 },
        yellowCar: { x: 421, y: 347, w: 39, h: 83 },
        greyCar: { x: 463, y: 347, w: 39, h: 83 },
    };

    carSpritesDown = {
        blueCar: { x: 338, y: 432, w: 39, h: 84 },
        redStrippedCar: { x: 380, y: 432, w: 39, h: 84 },
        yellowCar: { x: 421, y: 432, w: 39, h: 84 },
        greyCar: { x: 463, y: 432, w: 39, h: 84 },
    };

    let roadXLeft = canvas.width / window.devicePixelRatio / 2 - roadSprite.w * 0.7;
    let roadXRight = canvas.width / window.devicePixelRatio / 2 + roadSprite.w * 0.7;

    const lane1 = roadXLeft + playerSprite.w * 2 + playerSprite.w;
    const lane2 = roadXLeft + playerSprite.w * 2 + roadSprite.w * 0.7 / 2;
    const lane3 = roadXRight - playerSprite.w * 4 - playerSprite.w + 5;
    const lane4 = roadXRight - playerSprite.w * 4 + 5 - roadSprite.w * 0.7 /2;

    carLanePosition = [
        lane1,
        lane2,
        lane3,
        lane4,
    ];

    console.log(carLanePosition);
}

//need to add car path finding if it encounter obstacle;
export function spawnCar(delta) {
    timePassed += delta;
    if (timePassed > nextSpawn) {
        lastSpawn = timePassed;
        timePassed = 0;
        let carLane = carLanePosition[randomInt(0, carLanePosition.length - 1)];
        let carSprite, facing;
        //console.log(carLane, carLanePosition[3], carLanePosition[2]);
        if (carLane === carLanePosition[3] || carLane === carLanePosition[2]) {
            const keys = Object.keys(carSpritesDown);
            carSprite = keys[randomInt(0, keys.length - 1)];
            facing = "down";
        } else {
            const keys = Object.keys(carSpritesUp);
            carSprite = keys[randomInt(0, keys.length - 1)];
            facing = "up";
        }
        cars.push({
            id: `${Date.now()}`,
            sprite: carSprite,
            x: carLane,
            y: -500,
            facing: facing,
        });
        console.log(cars);
    }
};

export function updateCars(delta) {
    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];
        car.y += player.speed * delta * 500;
    }
    cars = cars.filter(car => car.y < 3000);
};

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function drawCar() {
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        let carSprite;
        if (car.facing === "up") carSprite = carSpritesUp[car.sprite];
        else carSprite = carSpritesDown[car.sprite];
        ctx.drawImage(
            playerSpriteSheet,
            carSprite.x, carSprite.y, carSprite.w, carSprite.h,
            car.x, car.y, carSprite.w * 2, carSprite.h * 2
        );
    }
};