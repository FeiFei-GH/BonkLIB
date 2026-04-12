//@Main{Preload}

bonkHUD.saveStyleSettings = function () {
    localStorage.setItem('bonkHUD_Style_Settings', JSON.stringify(bonkHUD.styleHold));
};

bonkHUD.exportStyleSettings = function() {
    let exportStyleHold = [];
    for(let prop in bonkHUD.styleHold) {
        exportStyleHold.push(bonkHUD.styleHold[prop].color);
    }
    let out = JSON.stringify(exportStyleHold);
    let save = new File([out], "bonkHUDStyle-" + Date.now() + ".style", {type: 'text/plain',});

    let url = URL.createObjectURL(save);
    let link = document.createElement("a");
    link.href = url;
    link.download = save.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

bonkHUD.importStyleSettings = function(event) {
    if(!event || !event.target || !event.target.files || event.target.files.length === 0) {
        return;
    }
    let fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
        let tempStyleHold = {};
        try {
            let temp = JSON.parse(e.target.result);
            let i = 0;
            for(let prop in bonkHUD.styleHold) {
                tempStyleHold[prop] = {};
                tempStyleHold[prop].class = bonkHUD.styleHold[prop].class;
                tempStyleHold[prop].css = bonkHUD.styleHold[prop].css;
                if(typeof temp[i] == "string" && temp[i].charAt(0) === "#" && !isNaN(Number("0x" + temp[i].substring(1, 7)))) {
                    tempStyleHold[prop].color = temp[i];
                } else {
                    throw new Error("Incorrect style input");
                }
                i++;
            }
            bonkHUD.loadStyleSettings(tempStyleHold);
            bonkHUD.updateStyleSettings();
            bonkHUD.saveStyleSettings();
        } catch (er) {
            alert(er);
        }
    }, false);
    //let file = event.target.files[0];
    fileReader.readAsText(event.target.files[0]);
}

bonkHUD.loadStyleSettings = function (settings) {
    if(!settings) {
        settings = JSON.parse(localStorage.getItem('bonkHUD_Style_Settings'));
    }
    if (settings) {
        bonkHUD.styleHold = {};
        for (let prop in settings) {
            bonkHUD.styleHold[prop] = settings[prop];
        }
    }
    else {
        bonkHUD.resetStyleSettings();
    }
};

bonkHUD.resetStyleSettings = function () {
    localStorage.removeItem('bonkHUD_Style_Settings');
    //Add bonkhud to key for class name
    bonkHUD.styleHold = {
        backgroundColor: {class:"bonkhud-background-color", css:"background-color", color:"#cfd8cd"},
        borderColor: {class:"bonkhud-border-color", css:"border-color", color:"#b4b8ae"},
        headerColor: {class:"bonkhud-header-color", css:"background-color", color:"#009688"},
        titleColor: {class:"bonkhud-title-color", css:"color", color:"#ffffff"},
        textColor: {class:"bonkhud-text-color", css:"color", color:"#000000"},
        secondaryTextColor: {class:"bonkhud-secondary-text-color", css:"color", color:"#505050"},
        buttonColor: {class:"bonkhud-button-color", css:"background-color", color:"#bcc4bb"},
        buttonColorHover: {class:"bonkhud-button-color-hover", css:"background-color", color:"#acb9ad"},
    };
};

bonkHUD.updateStyleSettings = function () {
    // Update global color picker values
    for(let prop in bonkHUD.styleHold) {
        try {
            let colorEdit = document.getElementById("bonkhud-" + prop + "-edit");
            colorEdit.value = bonkHUD.styleHold[prop].color;
        } catch (er) {
            console.log("Element bonkhud-" + prop + "-edit does not exist");
        }
    }

    // Apply styles per window, respecting sync toggle
    for(let ind = 0; ind < bonkHUD.settingsHold.length; ind++) {
        let windowId = bonkHUD.windowHold[ind]?.id;
        if(!windowId) continue;
        let container = document.getElementById(windowId + "-drag");
        if(!container) continue;

        let synced = bonkHUD.windowStyleSync[ind] !== false; // default true
        let styleSource = synced ? null : bonkHUD.getEffectiveWindowStyle(ind);

        for(let prop in bonkHUD.styleHold) {
            if(prop == "buttonColorHover") continue;

            let color = synced ? bonkHUD.styleHold[prop].color : (styleSource[prop] || bonkHUD.styleHold[prop].color);
            let cssClass = bonkHUD.styleHold[prop].class;
            let cssProp = bonkHUD.styleHold[prop].css;
            let important = (prop == "headerColor") ? "important" : "";

            let elements = container.getElementsByClassName(cssClass);
            for(let j = 0; j < elements.length; j++) {
                elements[j].style.setProperty(cssProp, color, important);
            }
            // Also check if container itself has the class
            if(container.classList.contains(cssClass)) {
                container.style.setProperty(cssProp, color, important);
            }
        }

        // Update per-mod color picker values if they exist
        if(!synced) {
            for(let prop in bonkHUD.styleHold) {
                try {
                    let picker = document.getElementById("bonkhud-mod-" + ind + "-" + prop + "-edit");
                    if(picker) picker.value = styleSource[prop] || bonkHUD.styleHold[prop].color;
                } catch(er) {}
            }
        }
    }

    // Apply global styles to non-window elements (settings panel, etc.)
    for(let prop in bonkHUD.styleHold) {
        if(prop == "buttonColorHover") continue;
        let settingsPanel = document.getElementById("bonkhud-settings");
        if(!settingsPanel) continue;
        let elements = settingsPanel.getElementsByClassName(bonkHUD.styleHold[prop].class);
        for(let j = 0; j < elements.length; j++) {
            let important = (prop == "headerColor") ? "important" : "";
            elements[j].style.setProperty(bonkHUD.styleHold[prop].css, bonkHUD.styleHold[prop].color, important);
        }
        if(settingsPanel.classList.contains(bonkHUD.styleHold[prop].class)) {
            settingsPanel.style.setProperty(bonkHUD.styleHold[prop].css, bonkHUD.styleHold[prop].color);
        }
    }
};

// Get effective style for a window (user overrides > mod defaults > global)
bonkHUD.getEffectiveWindowStyle = function (ind) {
    let result = {};
    let modDefaults = bonkHUD.windowStyleDefaults[ind] || {};
    let userOverrides = bonkHUD.windowStyleHold[ind] || {};
    for(let prop in bonkHUD.styleHold) {
        result[prop] = userOverrides[prop] || modDefaults[prop] || bonkHUD.styleHold[prop].color;
    }
    return result;
};

// Save per-window style settings
bonkHUD.saveWindowStyleSetting = function (ind) {
    let save_id = 'bonkHUD_WindowStyle_' + bonkHUD.windowHold[ind].id;
    localStorage.setItem(save_id, JSON.stringify({
        sync: bonkHUD.windowStyleSync[ind] !== false,
        colors: bonkHUD.windowStyleHold[ind] || {},
    }));
};

// Load per-window style settings
bonkHUD.loadWindowStyleSetting = function (ind) {
    let save_id = 'bonkHUD_WindowStyle_' + bonkHUD.windowHold[ind].id;
    let setting = JSON.parse(localStorage.getItem(save_id));
    if(setting) {
        bonkHUD.windowStyleSync[ind] = setting.sync !== false;
        bonkHUD.windowStyleHold[ind] = setting.colors || {};
    } else {
        bonkHUD.windowStyleSync[ind] = true;
        bonkHUD.windowStyleHold[ind] = {};
    }
};

// Reset per-window style settings
bonkHUD.resetWindowStyleSetting = function (ind) {
    let save_id = 'bonkHUD_WindowStyle_' + bonkHUD.windowHold[ind].id;
    localStorage.removeItem(save_id);
    bonkHUD.windowStyleSync[ind] = true;
    bonkHUD.windowStyleHold[ind] = {};
};