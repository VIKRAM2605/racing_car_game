import { player, playerSpriteSheet } from "./character";

let lastSpawn = 0;
let nextSpawn = 4;
let timePassed = 0;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

const cars = [];
const carSprite = {};
const carLanePosition = [20, 40, 60, 80];

//need to add car path finding if it encounter obstacle;

export function spawnCar(delta) {
    timePassed += delta;
    if (timePassed > nextSpawn) {
        lastSpawn = timePassed;
        timePassed = 0;
        cars.push({
            id: `${Date.now()}`,
            sprite: carSprite[randomInt(0, Object.keys(carSprite).length - 1)],
            x: 0,
            y: carLanePosition[randomInt(0, carLanePosition.length - 1)],
        });
        console.log(cars);
    }
};

export function updateCars(delta) {
    for (let i = 0; i < cars.length; i++) {
        let car = cars[i];
        car.x += player.speed * delta * 500;
    }
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export function drawCar() {
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        let facing = false;
        if (car.y === carLanePosition[2] || car.y === carLanePosition[3]) facing = true;

        // ctx.drawImage(
        //     playerSpriteSheet,
        //     car.sprite.x, car.sprite.y, car.sprite.w, car.sprite.h,
        //     car.x, car.y, car.sprite.w * 2, car.sprite.h * 2
        // );
    }
};