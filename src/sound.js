import { player } from "./character.js";
import { randomInt } from "./main.js";

const audioCtx = new AudioContext();

let engineSource = null;
let engineGain = null;

async function loadEngineSound() {
    const res = await fetch("assets/Sounds/ENGINE_VINTAGE_01.wav");
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    engineGain = audioCtx.createGain();
    engineGain.gain.value = 0.1;
    engineGain.connect(audioCtx.destination);

    engineSource = audioCtx.createBufferSource();
    engineSource.buffer = audioBuffer;
    engineSource.loop = true;
    engineSource.connect(engineGain);
}

// need to add retro sound effects that just match with the retro vibe
const collisonSounds = [
    new Audio("assets/Sounds/MISCCAR_00.wav"),
    new Audio("assets/Sounds/MISCCAR_0E.wav"),
    new Audio("assets/Sounds/MISCCAR_02.wav"),
    new Audio("assets/Sounds/CAR2CAR_00.wav"),
    new Audio("assets/Sounds/CAR2CAR_01.wav"),
    new Audio("assets/Sounds/CAR2OBJ_06.wav"),
]

const bgMusic = new Audio("assets/Sounds/bgMusic.mp3");
bgMusic.loop = true;

const refill = new Audio("assets/Sounds/refill.mp3");

const gameOver = new Audio("assets/Sounds/gameOver.wav");

export function playCollisonSound() {
    const sound = collisonSounds[randomInt(0, collisonSounds.length - 1)];
    sound.currentTime = 0;
    sound.play();
};

export function playRefillSound() {
    refill.currentTime = 0;
    refill.play();
};

export function updateEngineSound() {
    if (!engineSource || !engineGain) return;
    const t = (player.speed - player.minSpeed) / (player.maxSpeed - player.minSpeed);
    engineSource.playbackRate.value = 0.6 + t * 1.2;
    engineGain.gain.value = 0.1 + t * 0.4;
};

export async function startEngine() {
    if (audioCtx.state === "suspended") await audioCtx.resume();
    await loadEngineSound();
    engineSource.start(0);
};

export function stopEngine() {
    if (engineSource) {
        engineSource.stop();
        engineSource = null;
    }
};

export function startBgMusic() {
    bgMusic.volume = 0.12;
    bgMusic.play();
    // bgMusic.volume = 0.3;
};

export function stopBgMusic() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
};

export function playGameOverSound() {
    gameOver.currentTime = 0;
    gameOver.play();
}