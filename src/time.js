let time = null;

export function getTime() {
    return formatTime(Date.now());
};

export function getTimeWhenPlayerDead() {
    time = formatTime(Date.now());
    return time;
};

export function formatTime(time) {
    //will convert time based on hour, mins and sec;
};

export function bestTime() {
    if (localStorage.getItem("bestTime")) {
        let storedTime = localStorage.getItem("bestTime");
        let formatStoredTime = formatTime(time);
        let currentTime = time;

        //check both time rn i dont know will learn and update it;
    }
};