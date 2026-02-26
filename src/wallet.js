import { getTime, getTimeWhenPlayerDead } from "./time.js";

let money = 0;

export function initWallet(money = 0) {
    if (!localStorage.getItem("money")) {
        localStorage.setItem("money", money);
    }
};

export function creditBalance(money) {
    if (localStorage.getItem("money")) {
        const balance = parseInt(localStorage.getItem("money"));
        balance += money;
        localStorage.setItem("money", balance);
    }
};

export function debitBalance(money) {
    if (localStorage.getItem("money")) {
        const balance = parseInt(localStorage.getItem("money"));
        if (balance - money >= 0) {
            localStorage.setItem("money", balance - money);
            return true;
        }
        return false;
    }
    return false;
};

export function getMoney() {
    let balance = localStorage.getItem("money") || '0';
    return parseInt(balance)
};

export function creditMoneyBasedOnTime() {
    let time = getTimeWhenPlayerDead();
    //will convert hour,mins and sec into sec to credit scarp 1 scrap == 2 sec;
};