export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

export let isGameRunning = true;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
};

window.addEventListener("resize", () => {
    resizeCanvas();
});

let loadedCount = 0;
const imageCount = 0;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === imageCount) {
        console.log("success");
    }
};
