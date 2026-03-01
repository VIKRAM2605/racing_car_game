const BASE_WIDTH = 1536;
const BASE_HEIGHT = 776;
const BASE_SCALE = 3;

export const scale = Math.max(1, Math.round((window.innerHeight / BASE_HEIGHT) * BASE_SCALE));

//players
export const player1Sprite = {
    up: { x: 4, y: 2, w: 9, h: 13, sw: 9 * scale, sh: 13 * scale },
    upRight: { x: 18, y: 2, w: 14, h: 14, sw: 14 * scale, sh: 14 * scale },
    upLeft: { x: 113, y: 2, w: 14, h: 14, sw: 14 * scale, sh: 14 * scale }
};

export const player2Sprite = {

};

export const player3Sprite = {

};

export const npc1Sprite = {
    "up": { x: 4, y: 2, w: 9, h: 13, sw: 9 * scale, sh: 13 * scale },
    "down": { x: 36, y: 2, w: 9, h: 13, sw: 9 * scale, sh: 13 * scale }
}

export const npc2Sprite = {
    "up": { x: 5, y: 19, w: 7, h: 11, sw: 7 * scale, sh: 11 * scale },
    "down": { x: 37, y: 19, w: 7, h: 11, sw: 7 * scale, sh: 11 * scale }
}

export const npc3Sprite = {
    "up": { x: 4, y: 34, w: 9, h: 13, sw: 9 * scale, sh: 13 * scale },
    "down": { x: 36, y: 34, w: 9, h: 13, sw: 9 * scale, sh: 13 * scale },
}

export const npc4Sprite = {
    "up": { x: 5, y: 51, w: 7, h: 11, sw: 7 * scale, sh: 11 * scale },
    "down": { x: 37, y: 51, w: 7, h: 11, sw: 7 * scale, sh: 11 * scale },
}

//scenes
export const summer = {
    details: { x: 0, y: 0, w: 64, h: 16, sw: 64 * scale, sh: 16 * scale },
    road: { x: 0, y: 0, w: 64, h: 64, sw: 64 * scale, sh: 64 * scale, stackHeight: 190 },
    gasStation: { x: 0, y: 0, w: 128, h: 304, sw: 128 * scale, sh: 304 * scale, stackHeight: 190 },
};

export const summerDetails = {
    details1: { x: 0, y: 0, w: 64, h: 16, sw: 64 * scale, sh: 16 * scale },
    details2: { x: 0, y: 0, w: 64, h: 16, sw: 64 * scale, sh: 16 * scale },
    details3: { x: 0, y: 0, w: 64, h: 16, sw: 64 * scale, sh: 16 * scale },
    details4: { x: 0, y: 0, w: 64, h: 16, sw: 64 * scale, sh: 16 * scale },
    details5: { x: 0, y: 0, w: 64, h: 16, sw: 64 * scale, sh: 16 * scale },
}

export const ui = {
    full: { x: 0, y: 0, w: 32, h: 176, sw: 32 * (scale + 2), sh: 176 * scale },
    damageYes: { x: 0, y: 0, w: 8, h: 8, sw: 8 * scale, sh: 8 * scale },
    damageNo: { x: 8, y: 0, w: 8, h: 8, sw: 8 * scale, sh: 8 * scale },
    fuelBar: { x: 6, y: 4, w: 4, h: 48, sw: 4 * scale, sh: 48 * scale },
    playerIndicator: { x: 0, y: -1, w: 8, h: 9, sw: 8 * scale, sh: 9 * scale },
    numbers: { x: 0, y: 0, w: 80, h: 8, sw: 80 * scale, sh: 8 * scale },
}

export const playerIcons = {
    carrot: [
        { x: 10, y: 14, w: 12, h: 18, sw: 12 * scale, sh: 18 * scale },
        { x: 42, h: 13, w: 12, h: 18, sw: 12 * scale, sh: 18 * scale },
        { x: 74, h: 13, w: 12, h: 19, sw: 12 * scale, sh: 19 * scale }
    ],
    slime: [
        { x: 9, y: 20, w: 14, h: 12, sw: 14 * scale, h: 12 * scale },
        { x: 40, y: 21, w: 16, h: 11, sw: 16 * scale, sh: 11 * scale },
        { x: 73, y: 19, w: 13, h: 13, sw: 13 * scale, sh: 13 * scale }
    ],
    lemon: [
        { x: 9, y: 19, w: 14, h: 13, sw: 14 * scale, sh: 13 * scale },
        { x: 41, y: 18, w: 14, h: 14, sw: 14 * scale, sh: 14 * scale },
        { x: 73, y: 18, w: 14, h: 14, sw: 14 * scale, sh: 14 * scale }
    ],
    cherry: [
        { x: 10, y: 15, w: 14, h: 16, sw: 14 * scale, sh: 16 * scale },
        { x: 41, h: 18, w: 15, h: 14, sw: 15 * scale, sh: 14 * scale },
        { x: 73, y: 19, w: 15, h: 13, sw: 15 * scale, sh: 13 * scale }
    ]
}

export const numbers = {
    "0": { x: 0, y: 0, w: 8, h: 8, sw: 8 * (scale + 2), sh: 8 * (scale + 2) },
    "1": { x: 9, y: 0, w: 5, h: 8, sw: 5 * (scale + 2), sh: 8 * (scale + 2) },
    "2": { x: 17, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "3": { x: 25, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "4": { x: 33, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "5": { x: 41, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "6": { x: 49, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "7": { x: 57, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "8": { x: 65, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) },
    "9": { x: 73, y: 0, w: 7, h: 8, sw: 7 * (scale + 2), sh: 8 * (scale + 2) }
};

export const damageSprite = {
    "0": { x: 2, y: 2, w: 4, h: 4, sw: 4 * (scale + 2), sh: 4 * (scale + 2) },
    "1": { x: 9, y: 1, w: 6, h: 6, sw: 6 * (scale + 2), sh: 6 * (scale + 2) },
}

export const roadObstackleSprites = {
    "arrow": { x: 5, y: 0, w: 6, h: 16, sw: 6 * scale, sh: 6 * scale },
    "crack": { x: 21, y: 5, w: 7, h: 6, sw: 7 * scale, sh: 6 * scale },
    "oilSpill": { x: 37, y: 5, w: 6, h: 6, sw: 6 * scale, sh: 6 * scale },
    "potHole": { x: 52, y: 4, w: 8, h: 8, sw: 8 * scale, sh: 8 * scale },
    "cone": { x: 69, y: 5, w: 6, h: 7, sw: 6 * scale, sh: 7 * scale },
    "barricade": { x: 83, y: 6, w: 10, h: 6, sw: 10 * scale, sh: 6 * scale },
    "waterSpill": { x: 100, y: 5, w: 8, h: 8, sw: 8 * scale, sh: 8 * scale },
};

export const stationMarking = {
    "arrowRight": { x: 7, y: 4, w: 6, h: 9, sw: 6 * scale, sh: 9 * scale },
    "pump": { x: 21, y: 3, w: 9, h: 10, sw: 9 * scale, sh: 10 * scale },
    "60": { x: 33, y: 1, w: 14, h: 14, sw: 14 * scale, sh: 14 * scale },
    "30": { x: 49, y: 1, w: 14, h: 14, sw: 14 * scale, sh: 14 * scale }
}