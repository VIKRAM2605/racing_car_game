import { drawPlayer, player, playerSprite, playerSpriteSheet } from "./character.js";

export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawPlayer();
}

playerSpriteSheet.onload = drawPlayer;

window.addEventListener("resize", () => {
    resizeCanvas();
})
resizeCanvas();