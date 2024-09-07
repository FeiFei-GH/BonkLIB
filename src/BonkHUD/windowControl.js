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
    let sliderRow = bonkHUD.generateSection();

    let holdLeft = document.createElement("div");
    holdLeft.style.display = "flex";
    holdLeft.style.alignContent = "center";

    // Create a label for the opacity slider for accessibility
    let opacityLabel = document.createElement("label");
    opacityLabel.classList.add("bonkhud-settings-label");
    opacityLabel.textContent = "Opacity";
    holdLeft.appendChild(opacityLabel); // Add the label to the slider container

    // Create the opacity slider input, configuring its range and appearance
    let opacitySlider = document.createElement("input");
    opacitySlider.type = "range"; // Slider type for range selection
    opacitySlider.min = "0.1"; // Minimum opacity value
    opacitySlider.max = "1"; // Maximum opacity value (fully opaque)
    opacitySlider.step = "0.05"; // Incremental steps for opacity adjustment
    opacitySlider.value = bonkHUD.windowHold[ind].opacity; // Default value set to fully opaque
    opacitySlider.style.minWidth = "20px";
    opacitySlider.style.flexGrow = "1"; // Width adjusted for the label
    opacitySlider.oninput = function () {
        let control = document.getElementById(bonkHUD.windowHold[ind].id + "-drag"); // Update the UI opacity in real-time;
        control.style.opacity = this.value;
        bonkHUD.windowHold[ind].opacity = control.style.opacity;
        bonkHUD.saveUISetting(ind);
    };
    holdLeft.appendChild(opacitySlider); // Place the slider into the slider container

    let holdRight = document.createElement("div");
    let visibilityLabel = document.createElement("label");
    visibilityLabel.classList.add("bonkhud-settings-label");
    visibilityLabel.textContent = "Visible";
    visibilityLabel.style.marginRight = "5px"; // Space between label and slider
    visibilityLabel.style.display = "inline-block"; // Allows margin-top adjustment
    visibilityLabel.style.verticalAlign = "middle";
    holdRight.appendChild(visibilityLabel);

    let visiblityCheck = document.createElement("input");
    visiblityCheck.id = bonkHUD.windowHold[ind].id + "-visibility-check";
    visiblityCheck.type = "checkbox"; // Slider type for range selection
    if (bonkHUD.windowHold[ind].display == "block") {
        visiblityCheck.checked = true;
    }
    else {
        visiblityCheck.checked = false;
    }
    visiblityCheck.style.display = "inline-block"; // Allows margin-top adjustment
    visiblityCheck.style.verticalAlign = "middle";
    visiblityCheck.oninput = function () {
        let control = document.getElementById(bonkHUD.windowHold[ind].id + "-drag"); // Update the UI opacity in real-time;
        control.style.display = this.checked ? "block" : "none";
        bonkHUD.windowHold[ind].display = control.style.display;
        bonkHUD.saveUISetting(ind);
    };
    holdRight.appendChild(visiblityCheck); // Place the slider into the slider container

    let windowResetButton = bonkHUD.generateButton("Reset");
    windowResetButton.style.paddingLeft = "5px";
    windowResetButton.style.paddingRight = "5px";
    windowResetButton.style.display = "inline-block";
    windowResetButton.addEventListener('click', (e) => {
        bonkHUD.resetUISetting(ind);
        bonkHUD.loadUISetting(ind);
    });

    sliderRow.appendChild(holdLeft);
    sliderRow.appendChild(holdRight);
    sliderRow.appendChild(windowResetButton);

    element.appendChild(sliderRow);
    //bonkHUD.settingsHold[ind].settings.appendChild(sliderRow);
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