//@Main{Preload}

bonkHUD.createMenuHeader = function (name, settingsContent, recVersion = -1) {
    // Create container for the opacity controls with initial styles
    let sliderRow = bonkHUD.generateSection();

    // Add a title to the slider row for visual clarity
    let sliderTitle = document.createElement("div");
    if (recVersion === -1) {
        sliderTitle.textContent = name;
    } else {
        sliderTitle.textContent = name + " ("+recVersion+")";
    }
    sliderTitle.style.marginBottom = "5px";
    sliderTitle.style.fontSize = "1.2rem"; // Text size for readability
    sliderTitle.style.fontWeight = "bold"; // Make the title text bold
    sliderRow.appendChild(sliderTitle); // Insert the title into the slider container

    //open settings in
    settingsContent.prepend(sliderRow.cloneNode(true));
    settingsContent.classList.add("bonkhud-mod-setting-menu");
    settingsContent.style.display = "none";
    document.getElementById("bonkhud-settings-container").appendChild(settingsContent);

    sliderRow.addEventListener("click", (e) => {
        let menus = document.getElementsByClassName("bonkhud-mod-setting-menu");
        // Could make this without for loop but would need to store last menu
        for (let i = 0; i < menus.length; i++) {
            menus[i].style.display = "none";
        }
        settingsContent.style.display = "block";

        let titles = document.getElementById("bonkhud-window-settings-container").children;
        for (let i = 0; i < titles.length; i++) {
            titles[i].children[0].style.color = bonkHUD.styleHold.textColor.color;
        }
        sliderTitle.style.color = bonkHUD.styleHold.secondaryTextColor.color;
    });

    document.getElementById("bonkhud-window-settings-container").appendChild(sliderRow);
}

bonkHUD.createWindowControl = function (ind, element) {
    // Load per-window style settings from localStorage
    bonkHUD.loadWindowStyleSetting(ind);

    let sliderRow = bonkHUD.generateSection();

    let holdLeft = document.createElement("div");
    holdLeft.style.display = "flex";
    holdLeft.style.alignContent = "center";

    // Create a label for the opacity slider for accessibility
    let opacityLabel = document.createElement("label");
    opacityLabel.classList.add("bonkhud-settings-label");
    opacityLabel.textContent = "Opacity";
    holdLeft.appendChild(opacityLabel);

    // Create the opacity slider input
    let opacitySlider = document.createElement("input");
    opacitySlider.type = "range";
    opacitySlider.min = "0.1";
    opacitySlider.max = "1";
    opacitySlider.step = "0.05";
    opacitySlider.value = bonkHUD.windowHold[ind].opacity;
    opacitySlider.style.minWidth = "20px";
    opacitySlider.style.flexGrow = "1";
    opacitySlider.oninput = function () {
        let control = document.getElementById(bonkHUD.windowHold[ind].id + "-drag");
        control.style.opacity = this.value;
        bonkHUD.windowHold[ind].opacity = control.style.opacity;
        bonkHUD.saveUISetting(ind);
    };
    holdLeft.appendChild(opacitySlider);

    let holdRight = document.createElement("div");
    let visibilityLabel = document.createElement("label");
    visibilityLabel.classList.add("bonkhud-settings-label");
    visibilityLabel.textContent = "Visible";
    visibilityLabel.style.marginRight = "5px";
    visibilityLabel.style.display = "inline-block";
    visibilityLabel.style.verticalAlign = "middle";
    holdRight.appendChild(visibilityLabel);

    let visiblityCheck = document.createElement("input");
    visiblityCheck.id = bonkHUD.windowHold[ind].id + "-visibility-check";
    visiblityCheck.type = "checkbox";
    if (bonkHUD.windowHold[ind].display == "block") {
        visiblityCheck.checked = true;
    }
    else {
        visiblityCheck.checked = false;
    }
    visiblityCheck.style.display = "inline-block";
    visiblityCheck.style.verticalAlign = "middle";
    visiblityCheck.oninput = function () {
        let control = document.getElementById(bonkHUD.windowHold[ind].id + "-drag");
        control.style.display = this.checked ? "block" : "none";
        bonkHUD.windowHold[ind].display = control.style.display;
        bonkHUD.saveUISetting(ind);
    };
    holdRight.appendChild(visiblityCheck);

    let windowResetButton = bonkHUD.generateButton("Reset");
    windowResetButton.style.paddingLeft = "5px";
    windowResetButton.style.paddingRight = "5px";
    windowResetButton.style.display = "inline-block";
    windowResetButton.addEventListener('click', (e) => {
        bonkHUD.resetUISetting(ind);
        bonkHUD.loadUISetting(ind);
        bonkHUD.resetWindowStyleSetting(ind);
        bonkHUD.updateStyleSettings();
    });

    sliderRow.appendChild(holdLeft);
    sliderRow.appendChild(holdRight);
    sliderRow.appendChild(windowResetButton);
    element.appendChild(sliderRow);

    // --- Per-Mod Style Controls ---
    let styleRow = bonkHUD.generateSection();

    // Sync to Global toggle
    let syncDiv = document.createElement("div");
    syncDiv.style.marginBottom = "5px";

    let syncLabel = document.createElement("label");
    syncLabel.classList.add("bonkhud-settings-label");
    syncLabel.textContent = "Sync to Global Style";
    syncLabel.style.marginRight = "5px";
    syncLabel.style.display = "inline-block";
    syncLabel.style.verticalAlign = "middle";

    let syncCheck = document.createElement("input");
    syncCheck.type = "checkbox";
    syncCheck.checked = bonkHUD.windowStyleSync[ind] !== false;
    syncCheck.style.display = "inline-block";
    syncCheck.style.verticalAlign = "middle";

    syncDiv.appendChild(syncLabel);
    syncDiv.appendChild(syncCheck);
    styleRow.appendChild(syncDiv);

    // Per-mod color pickers container (hidden when synced)
    let colorPickersDiv = document.createElement("div");
    colorPickersDiv.id = "bonkhud-mod-" + ind + "-colors";
    colorPickersDiv.style.display = syncCheck.checked ? "none" : "block";

    let effectiveStyle = bonkHUD.getEffectiveWindowStyle(ind);

    for(let prop in bonkHUD.styleHold) {
        let colorDiv = document.createElement("div");
        colorDiv.style.marginTop = "3px";

        let colorLabel = document.createElement("label");
        colorLabel.classList.add("bonkhud-settings-label");
        colorLabel.style.marginRight = "10px";
        colorLabel.style.fontSize = "0.8rem";
        colorLabel.innerText = bonkHUD.styleHold[prop].class.replace("bonkhud-", "");

        let colorEdit = document.createElement("input");
        colorEdit.setAttribute('type', 'color');
        colorEdit.id = "bonkhud-mod-" + ind + "-" + prop + "-edit";
        colorEdit.value = effectiveStyle[prop] || bonkHUD.styleHold[prop].color;
        colorEdit.style.display = "inline-block";

        colorDiv.appendChild(colorLabel);
        colorDiv.appendChild(colorEdit);
        colorPickersDiv.appendChild(colorDiv);

        colorEdit.addEventListener('change', (e) => {
            if(!bonkHUD.windowStyleHold[ind]) bonkHUD.windowStyleHold[ind] = {};
            bonkHUD.windowStyleHold[ind][prop] = e.target.value;
            bonkHUD.saveWindowStyleSetting(ind);
            bonkHUD.updateStyleSettings();
        });
    }

    styleRow.appendChild(colorPickersDiv);
    element.appendChild(styleRow);

    // Toggle sync behavior
    syncCheck.oninput = function () {
        bonkHUD.windowStyleSync[ind] = this.checked;
        colorPickersDiv.style.display = this.checked ? "none" : "block";
        bonkHUD.saveWindowStyleSetting(ind);
        bonkHUD.updateStyleSettings();
    };
};

bonkHUD.focusWindow = function (focusItem) {
    let elements = document.getElementsByClassName("bonkhud-window-container");
    focusItem.style.zIndex = "9991";
    for (let i = 0; i < elements.length; i++) {
        if (focusItem.id != elements[i].id) {
            elements[i].style.zIndex = "9990";
        }
    }
};