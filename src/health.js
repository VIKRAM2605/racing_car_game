import { setIsDead } from "./main.js";
import { playCollisonSound, playGameOverSound, stopEngine } from "./sound.js";

export let health = [1, 1, 1];

export function deductHealth() {
    const lastIndexOfOne = health.lastIndexOf(1);
    if (lastIndexOfOne !== -1) {
        health[lastIndexOfOne] = 0;
        playCollisonSound();
    }
    if (checkLife() === -1) {
        stopEngine();
        playGameOverSound();
        setIsDead();
    }
};

export function checkLife() {
    return health.lastIndexOf(1);
}

export function resetHealth() {
    health = [1, 1, 1];
}