import { ctx, scale } from "./main.js";

export let score = 0;
export let bestScore = localStorage.getItem("bestScore") || 0;

let refillBonusCoolDown = false;

export function updateScore(delta, playerSpeed) {
    score += (playerSpeed * delta) / 50;
}

export function addBonuPoints(points) {
    score += points;
}

export function saveBestScore() {
    if (Math.floor(score) > bestScore) {
        bestScore = Math.floor(score);
        localStorage.setItem("bestScore", bestScore);
    }
}

export function resetScore(value) {
    saveBestScore();
    score = 0;
}

export function triggerRefillBonus() {
    if (refillBonusCoolDown) return;
    addBonuPoints(500);
    refillBonusCoolDown = true;
}

export function resetRefillBonus() {
    refillBonusCoolDown = false;
}

export function drawScore() {
    const displayScore = Math.floor(score).toString();

    ctx.font = `${Math.round(10 * scale)}px PixelFont`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(`SCORE: ${displayScore}`, scale * 6 + 1, scale * 6 + 1);

    ctx.fillStyle = "#FFE500";
    ctx.fillText(`SCORE: ${displayScore}`, scale * 6, scale * 6);
}

