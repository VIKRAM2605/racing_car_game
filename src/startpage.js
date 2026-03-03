// need to add a cool retro looking start page with player color choosing and ability to lock a single level or random while playing

import { drawCars, spawnCars, updateCars } from "./car.js";
import { canvas, ctx } from "./main.js";
import { drawObstacles, drawScene, spawnObstacles, updateDetails, updateObstacles, updateRoad } from "./scene.js";

let animationId = null;
let lastTime = 0;

export function startPage() {
    animationId = requestAnimationFrame(startPageLoop);
};

export function startPageLoop(currentTime) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

    spawnCars(delta);
    spawnObstacles(delta);

    updateRoad(delta);
    updateCars(delta);
    updateDetails(delta);
    updateObstacles(delta);

    drawScene();
    drawObstacles();
    drawCars();

    animationId = requestAnimationFrame(startPageLoop);
};

export function stopStartPageLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = 0;

}

export function drawStartPage(delta) {

    spawnObstacles(delta);
    spawnCars(delta);

    updateDetails(delta);
    updateRoad(delta);

    drawScene(delta);
};