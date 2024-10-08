//@Main{Preload}

//! Eventually change ID to Id
bonkHUD.getWindowIndexByID = function (id) {
    for (let i = 0; i < bonkHUD.windowHold.length; i++) {
        if (bonkHUD.windowHold[i].id == id) {
            return i;
        }
    }
    return -1;
};

bonkHUD.getWindowIdByIndex = function (ind) {
    return bonkHUD.windowHold[ind].id
}

bonkHUD.getElementByIndex = function (ind) {
    return document.getElementById(bonkHUD.windowHold[ind].id)
}

bonkHUD.clamp = function (val, min, max) {
    //? supposedly faster than Math.max/min
    if (val > min) {
        if (val < max) {
            return val;
        }
        else {
            return max;
        }
    }
    return min;
};

bonkHUD.pxTorem = function (px) {
    return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
};

bonkHUD.remTopx = function (rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};