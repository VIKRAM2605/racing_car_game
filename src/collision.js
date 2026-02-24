export function collisionCheck() {
    let check = isCollidingWithCars();
    if (check) return true;
    check = isCollidingWithObjects();
    if (check) return true;

    return false;
}

export function isCollidingWithObjects() {

}

export function isCollidingWithCars() {

}