//@Main{Preload}

bonkHUD.saveModSetting = function (id, obj) {
    let save_id = 'bonkHUD_Mod_Setting_' + id;
    localStorage.setItem(save_id, JSON.stringify(obj));
};

bonkHUD.getModSetting = function (id) {
    let save_id = 'bonkHUD_Mod_Setting_' + id;
    let setting = JSON.parse(localStorage.getItem(save_id));
    if (!setting) {
        return null;
    }
    return setting;
};

/*bonkHUD.loadModSetting = function (id) {
    let windowElement = document.getElementById(id + "-drag");
    if (windowElement) {
        Object.assign(windowElement.style, bonkHUD.getUISetting(id));
    } else {
        console.log(`bonkHUD.loadModSetting: Window element not found for id: ${id}. Please ensure the window has been created.`);
    }
};*/

bonkHUD.resetModSetting = function (id) {
    try {
        let save_id = 'bonkHUD_Mod_Setting_' + id;
        localStorage.removeItem(save_id);
        //Object.assign(windowElement.style, bonkHUD.getUISetting(id));
    } catch(er) {
        console.log(`bonkHUD.resetModSetting: Settings for ${id} were not found.`);
    }
};