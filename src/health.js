export const health = [1, 1, 0];

export function deductHealth() {
    const lastIndexOfOne = health.lastIndexOf(1);
    if (lastIndexOfOne !== -1) {
        health[lastIndexOfOne] = 0;
    }
    if(checkLife() === -1){
        console.log("player is dead");
    }
};

export function checkLife() {
    return health.lastIndexOf(1);
}