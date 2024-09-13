//@Main{Preload}

bonkHUD.saveUISetting = function (ind) {
    let save_id = 'bonkHUD_Setting_' + bonkHUD.windowHold[ind].id;
    localStorage.setItem(save_id, JSON.stringify(bonkHUD.windowHold[ind]));
};

bonkHUD.getUISetting = function (ind) {
    let save_id = 'bonkHUD_Setting_' + bonkHUD.windowHold[ind].id;
    let setting = JSON.parse(localStorage.getItem(save_id));
    if (!setting) {
        setting = {
            id: bonkHUD.windowHold[ind].id,
            width: "154px",
            height: "100px",
            bottom: "0rem",
            right: "0rem",
            opacity: "1",
            display: "block",
        }
    }
    return setting;
};

bonkHUD.loadUISetting = function (ind) {
    let windowElement = document.getElementById(bonkHUD.windowHold[ind].id + "-drag");
    if (windowElement) {
        Object.assign(windowElement.style, bonkHUD.getUISetting(ind));
    } else {
        console.log(`bonkHUD.loadUISetting: Window element not found for id: ${bonkHUD.windowHold[ind].id}. Please ensure the window has been created.`);
    }
};

bonkHUD.resetUISetting = function (ind) {
    let windowElement = document.getElementById(bonkHUD.windowHold[ind].id + "-drag");
    if (windowElement) {
        let save_id = 'bonkHUD_Setting_' + bonkHUD.windowHold[ind].id;
        localStorage.removeItem(save_id);
        Object.assign(windowElement.style, bonkHUD.getUISetting(ind));
    } else {
        console.log(`bonkHUD.resetUISetting: Window element not found for id: ${bonkHUD.windowHold[ind].id}. Please ensure the window has been created.`);
    }
};