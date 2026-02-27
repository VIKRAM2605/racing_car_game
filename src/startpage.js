import { carLanePosition, drawCar, spawnCar, updateCars } from "./car.js";
import { drawPlayer, updatePlayer } from "./character.js";
import { drawRoad, drawScene, spawnScene, spawnStreetLight, updateRoad, updateScene } from "./scene.js";

let animationId = null;
let lastTime = 0;

export function loadStartPage() {
    animationId = requestAnimationFrame(startPageLoop)
};

export function startPageLoop(currentTime) {
    let delta = (currentTime - lastTime) / 1000;
    if (delta > 0.1) delta = 0.1;

    lastTime = currentTime;

    updateRoad(delta);
    updatePlayer(delta);
    updateCars(delta);
    updateScene(delta);

    spawnCar(delta, [carLanePosition[1]]);
    spawnScene(delta);
    spawnStreetLight();

    drawRoad();
    drawScene();
    drawCar();
    drawPlayer();

    requestAnimationFrame(startPageLoop);
};

export function stopStartPageLoop() {
    cancelAnimationFrame(animationId);
    animationId = null;
};