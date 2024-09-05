//@Main{Preload}

bonkHUD.saveUISetting = function (ind) {
    let save_id = 'bonkHUD_Setting_' + bonkHUD.windowHold[ind].id;
    localStorage.setItem(save_id, JSON.stringify(bonkHUD.windowHold[ind]));
};

bonkHUD.getUISetting = function (id) {
    let save_id = 'bonkHUD_Setting_' + id;
    let setting = JSON.parse(localStorage.getItem(save_id));
    if (!setting) {
        setting = {
            id: id,
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

bonkHUD.loadUISetting = function (id) {
    let windowElement = document.getElementById(id + "-drag");
    if (windowElement) {
        Object.assign(windowElement.style, bonkHUD.getUISetting(id));
    } else {
        console.log(`bonkHUD.loadUISetting: Window element not found for id: ${id}. Please ensure the window has been created.`);
    }
};

bonkHUD.resetUISetting = function (id) {
    let windowElement = document.getElementById(id + "-drag");
    if (windowElement) {
        let save_id = 'bonkHUD_Setting_' + id;
        localStorage.removeItem(save_id);
        Object.assign(windowElement.style, bonkHUD.getUISetting(id));
    } else {
        console.log(`bonkHUD.resetUISetting: Window element not found for id: ${id}. Please ensure the window has been created.`);
    }
};