//@Main{Preload}

// !Right now only useful for mods that have a setting that **only**
// !needs to be read from 

bonkHUD.saveModSetting = function (ind, obj) {
    let save_id = 'bonkHUD_Mod_Setting_' + bonkHUD.settingsHold[ind].id;
    localStorage.setItem(save_id, JSON.stringify(obj));
};

bonkHUD.getModSetting = function (ind) {
    let save_id = 'bonkHUD_Mod_Setting_' + bonkHUD.settingsHold[ind].id;
    let setting = JSON.parse(localStorage.getItem(save_id));
    if (!setting) {
        // !let mod maker handle it
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

bonkHUD.resetModSetting = function (ind) {
    try {
        let save_id = 'bonkHUD_Mod_Setting_' + bonkHUD.settingsHold[ind].id;
        localStorage.removeItem(save_id);
        //Object.assign(windowElement.style, bonkHUD.getUISetting(id));
    } catch(er) {
        console.log(`bonkHUD.resetModSetting: Settings for ${bonkHUD.settingsHold[ind].id} were not found.`);
    }
};

bonkHUD.createSettingsControl = function (ind, settingsElement) {
    bonkHUD.settingsHold[ind].settings.appendChild(settingsElement);
};