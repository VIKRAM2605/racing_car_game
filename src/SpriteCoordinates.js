import { scale } from "./main.js";

//players
export const player1Sprite = {
    up: { x: 4, y: 2, w: 9, h: 13 },
    upRight: { x: 18, y: 2, w: 14, h: 14 },
    upLeft: { x: 113, y: 2, w: 14, h: 14 }
};

export const player2Sprite = {
    up: { x: 4, y: 2, w: 9, h: 13 },
    upRight: { x: 18, y: 2, w: 14, h: 14 },
    upLeft: { x: 113, y: 2, w: 14, h: 14 }
};

export const player3Sprite = {
    up: { x: 4, y: 2, w: 9, h: 13 },
    upRight: { x: 18, y: 2, w: 14, h: 14 },
    upLeft: { x: 113, y: 2, w: 14, h: 14 }
};

export const player4Sprite = {
    up: { x: 4, y: 2, w: 9, h: 13 },
    upRight: { x: 18, y: 2, w: 14, h: 14 },
    upLeft: { x: 113, y: 2, w: 14, h: 14 }
}

export const npc1Sprite = {
    "up": { x: 4, y: 2, w: 9, h: 13 },
    "down": { x: 36, y: 2, w: 9, h: 13 }
}

export const npc2Sprite = {
    "up": { x: 5, y: 19, w: 7, h: 11 },
    "down": { x: 37, y: 19, w: 7, h: 11 }
}

export const npc3Sprite = {
    "up": { x: 4, y: 34, w: 9, h: 13 },
    "down": { x: 36, y: 34, w: 9, h: 13 },
}

export const npc4Sprite = {
    "up": { x: 5, y: 51, w: 7, h: 11 },
    "down": { x: 37, y: 51, w: 7, h: 11 },
}

//scenes
export const summer = {
    details: { x: 0, y: 0, w: 64, h: 16 },
    road: { x: 0, y: 0, w: 64, h: 64, stackHeight: 64 },
    gasStation: { x: 0, y: 0, w: 128, h: 304, stackHeight: 64 },
};

export const summerDetails = {
    details1: { x: 0, y: 0, w: 64, h: 16 },
    details2: { x: 0, y: 0, w: 64, h: 16 },
    details3: { x: 0, y: 0, w: 64, h: 16 },
    details4: { x: 0, y: 0, w: 64, h: 16 },
    details5: { x: 0, y: 0, w: 64, h: 16 },
};

export const winterDetails = {
    details1: { x: 0, y: 0, w: 48, h: 16 },
    details2: { x: 0, y: 0, w: 48, h: 16 },
    details3: { x: 0, y: 0, w: 48, h: 16 },
    details4: { x: 0, y: 0, w: 48, h: 16 },
    details5: { x: 0, y: 0, w: 48, h: 16 }
};

export const desertDetails = {
    details1: { x: 0, y: 0, w: 64, h: 16 },
    details2: { x: 0, y: 0, w: 64, h: 16 },
    details3: { x: 0, y: 0, w: 64, h: 16 },
    details4: { x: 0, y: 0, w: 64, h: 16 },
    details5: { x: 0, y: 0, w: 64, h: 16 }
};

export const winter = {
    road: { x: 0, y: 0, w: 64, h: 64, stackHeight: 64 },
    gasStation: { x: 0, y: 0, w: 128, h: 304, stackHeight: 64 }
};

export const desert = {
    road: { x: 0, y: 0, w: 64, h: 64, stackHeight: 64 },
    gasStation: { x: 0, y: 0, w: 128, h: 304, stackHeight: 64 }
}

export const ui = {
    full: { x: 0, y: 0, w: 32, h: 176 },
    damageYes: { x: 0, y: 0, w: 8, h: 8 },
    damageNo: { x: 8, y: 0, w: 8, h: 8 },
    fuelBar: { x: 6, y: 4, w: 4, h: 48 },
    playerIndicator: { x: 0, y: -1, w: 8, h: 9 },
    numbers: { x: 0, y: 0, w: 80, h: 8 },
}

export const playerIcons = {
    carrot: [
        { x: 10, y: 14, w: 12, h: 18 },
        { x: 42, h: 13, w: 12, h: 18 },
        { x: 74, h: 13, w: 12, h: 19 }
    ],
    slime: [
        { x: 9, y: 20, w: 14, h: 12 },
        { x: 40, y: 21, w: 16, h: 11 },
        { x: 73, y: 19, w: 13, h: 13 }
    ],
    lemon: [
        { x: 9, y: 19, w: 14, h: 13 },
        { x: 41, y: 18, w: 14, h: 14 },
        { x: 73, y: 18, w: 14, h: 14 }
    ],
    cherry: [
        { x: 10, y: 15, w: 14, h: 16 },
        { x: 41, h: 18, w: 15, h: 14 },
        { x: 73, y: 19, w: 15, h: 13 }
    ]
}

export const numbers = {
    "0": { x: 0, y: 0, w: 8, h: 8 },
    "1": { x: 9, y: 0, w: 5, h: 8 },
    "2": { x: 17, y: 0, w: 7, h: 8 },
    "3": { x: 25, y: 0, w: 7, h: 8 },
    "4": { x: 33, y: 0, w: 7, h: 8 },
    "5": { x: 41, y: 0, w: 7, h: 8 },
    "6": { x: 49, y: 0, w: 7, h: 8 },
    "7": { x: 57, y: 0, w: 7, h: 8 },
    "8": { x: 65, y: 0, w: 7, h: 8 },
    "9": { x: 73, y: 0, w: 7, h: 8 }
};

export const damageSprite = {
    "0": { x: 2, y: 2, w: 4, h: 4 },
    "1": { x: 9, y: 1, w: 6, h: 6 },
}

export const roadObstackleSprites = {
    "arrow": { x: 5, y: 0, w: 6, h: 16 },
    "crack": { x: 21, y: 5, w: 7, h: 6 },
    "oilSpill": { x: 37, y: 5, w: 6, h: 6 },
    "potHole": { x: 52, y: 4, w: 8, h: 8 },
    "cone": { x: 69, y: 5, w: 6, h: 7 },
    "barricade": { x: 83, y: 6, w: 10, h: 6 },
    "waterSpill": { x: 100, y: 5, w: 8, h: 8 },
};

export const stationMarking = {
    "arrowRight": { x: 7, y: 4, w: 6, h: 9 },
    "pump": { x: 21, y: 3, w: 9, h: 10 },
    "60": { x: 33, y: 1, w: 14, h: 14 },
    "30": { x: 49, y: 1, w: 14, h: 14 }
};

// export const startPageUI = {
//     "start": { x: 0, y: 24, w: 32, h: 8 },
//     "scene": { x: 0, y: 36, w: 32, h: 8 },
//     "cars": { x: 0, y: 49, w: 32, h: 8 },
//     //"shop": { x: 0, y: 62, w: 32, h: 8, sw: 32 * (scale + 2), sh: 8 * (scale + 2) }
//     "guide": { x: 0, y: 117, w: 32, h: 8 }
// };

export const guiSprites = {
    panel: { x: 32, y: 1120, w: 183, h: 280 },
    panelOutline: { x: 268, y: 1133, w: 159, h: 251 },
    button5: { x: 491, y: 1387, w: 57, h: 22 },
    menuPanel: { x: 38, y: 1666, w: 248, h: 280 },
    menuPanelOutline: { x: 338, y: 1679, w: 224, h: 251 },
    closeButton: { x: 612, y: 340, w: 7, h: 7 },
    frame: { x: 240, y: 32, w: 81, h: 80 },
}

export const closeButtonSprite = { x: 5, y: 92, w: 11, h: 11 };

export const selectedButtonSprite = { x: 3, y: 105, w: 15, h: 11 };

export const gameOverSprite = { x: 120, y: 122, w: 340, h: 217 };