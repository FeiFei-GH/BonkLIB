//@Main{Preload}

bonkHUD.initialize = function () {
    //bonkHUD.stylesheet = document.createElement("style");
    let settingsMenu = document.createElement("div");
    settingsMenu.id = "bonkhud-settings";
    settingsMenu.classList.add("bonkhud-background-color");
    settingsMenu.classList.add("windowShadow");
    settingsMenu.style.position = "absolute";
    settingsMenu.style.top = "0";
    settingsMenu.style.left = "0";
    settingsMenu.style.right = "0";
    settingsMenu.style.bottom = "0";
    settingsMenu.style.width = "60%";//bonkHUD.pxTorem(450) + "rem";
    settingsMenu.style.height = "75%";//bonkHUD.pxTorem(385) + "rem";
    settingsMenu.style.fontFamily = "futurept_b1";
    settingsMenu.style.margin = "auto";
    settingsMenu.style.borderRadius = "8px";
    //settingsMenu.style.outline = "3000px solid rgba(0,0,0,0.30)";
    settingsMenu.style.pointerEvents = "auto";
    settingsMenu.style.zIndex = "9992";
    settingsMenu.style.visibility = "hidden";

    // Create the header
    let header = document.createElement("div");
    header.classList.add("newbonklobby_boxtop");
    header.classList.add("newbonklobby_boxtop_classic");
    header.classList.add("bonkhud-header-color");

    // Create the title span
    let title = document.createElement("span");
    title.classList.add("bonkhud-title-color");
    title.textContent = "BonkHUD Settings";
    title.style.flexGrow = "1";
    title.style.textAlign = "center";

    let closeButton = document.createElement("div");
    closeButton.classList.add("bonkhud-header-button");
    closeButton.classList.add("bonkhud-title-color");
    closeButton.innerText = "_"; // Use an appropriate icon or text
    closeButton.style.lineHeight = "9px";
    closeButton.style.right = "3px";
    closeButton.style.cursor = "pointer";

    let containerContainer = document.createElement("div");
    containerContainer.classList.add("bonkhud-text-color");
    containerContainer.style.overflowX = "hidden";
    containerContainer.style.overflowY = "hidden";
    containerContainer.style.display = "flex";
    containerContainer.style.width = "100%";
    containerContainer.style.height = "calc(100% - 32px)"; // Adjusted height for header

    let windowSettingsContainer = document.createElement("div");
    windowSettingsContainer.id = "bonkhud-window-settings-container";
    windowSettingsContainer.classList.add("bonkhud-border-color");
    windowSettingsContainer.classList.add("bonkhud-scrollbar-kit");
    windowSettingsContainer.classList.add("bonkhud-scrollbar-other");
    windowSettingsContainer.style.width = "35%";
    windowSettingsContainer.style.overflowY = "scroll";
    windowSettingsContainer.style.height = "100%";
    windowSettingsContainer.style.borderRight = "1px solid";

    let settingsContainer = document.createElement("div");
    settingsContainer.classList.add("bonkhud-scrollbar-kit");
    settingsContainer.classList.add("bonkhud-scrollbar-other");
    settingsContainer.id = "bonkhud-settings-container";
    settingsContainer.style.overflowY = "scroll";
    settingsContainer.style.width = "65%";
    settingsContainer.style.float = "right";
    settingsContainer.style.height = "100%";

    // Create holder for mainSettings and styleSettings
    let generalSettingsDiv = document.createElement("div");

    let mainSettingsDiv = document.createElement("div");
    mainSettingsDiv.classList.add("bonkhud-border-color")
    mainSettingsDiv.classList.add("bonkhud-settings-row");

    let mainSettingsHeading = document.createElement("div");
    mainSettingsHeading.classList.add("bonkhud-text-color");
    mainSettingsHeading.style.fontSize = "1.2rem";
    mainSettingsHeading.style.marginBottom = "5px";
    mainSettingsHeading.textContent = "Main Settings";

    let mainSettingsAdHideLabel = document.createElement("label");
    mainSettingsAdHideLabel.classList.add("bonkhud-text-color");
    mainSettingsAdHideLabel.classList.add("bonkhud-settings-label");
    mainSettingsAdHideLabel.style.marginRight = "5px";
    mainSettingsAdHideLabel.innerText = "Hide Ads";

    let mainSettingsAdHide = document.createElement("input");
    mainSettingsAdHide.type = "checkbox";
    mainSettingsAdHide.checked = false;

    let styleResetDiv = document.createElement("div");
    styleResetDiv.style.marginTop = "5px";

    let styleResetLabel = document.createElement("label");
    styleResetLabel.classList.add("bonkhud-text-color");
    styleResetLabel.classList.add("bonkhud-settings-label");
    styleResetLabel.style.marginRight = "5px";
    styleResetLabel.innerText = "Reset Style";

    let styleResetButton = bonkHUD.generateButton("Reset");
    styleResetButton.style.paddingLeft = "5px";
    styleResetButton.style.paddingRight = "5px";
    styleResetButton.style.display = "inline-block";

    let styleExportDiv = document.createElement("div");
    styleExportDiv.style.marginTop = "5px";

    let styleExportLabel = document.createElement("label");
    styleExportLabel.classList.add("bonkhud-text-color");
    styleExportLabel.classList.add("bonkhud-settings-label");
    styleExportLabel.style.marginRight = "5px";
    styleExportLabel.innerText = "Export Style";

    let styleExportButton = bonkHUD.generateButton("Export");
    styleExportButton.style.paddingLeft = "5px";
    styleExportButton.style.paddingRight = "5px";
    styleExportButton.style.display = "inline-block";

    let styleImportDiv = document.createElement("div");
    styleImportDiv.style.marginTop = "5px";

    let styleImportLabel = document.createElement("label");
    styleImportLabel.classList.add("bonkhud-text-color");
    styleImportLabel.classList.add("bonkhud-settings-label");
    styleImportLabel.style.marginRight = "5px";
    styleImportLabel.innerText = "Import Style";

    let styleImportButton = bonkHUD.generateButton("Import");
    styleImportButton.style.paddingLeft = "5px";
    styleImportButton.style.paddingRight = "5px";
    styleImportButton.style.display = "inline-block";

    let styleImportInput = document.createElement("input");
    styleImportInput.setAttribute("type", "file");
    styleImportInput.setAttribute("accept", ".style");
    styleImportInput.setAttribute("multiple", "");
    styleImportInput.setAttribute("onChange", "bonkHUD.importStyleSettings(event);this.value=null");
    styleImportInput.style.display = "none";

    let styleSettingsDiv = document.createElement("div");
    styleSettingsDiv.classList.add("bonkhud-border-color")
    styleSettingsDiv.classList.add("bonkhud-settings-row");

    let styleSettingsHeading = document.createElement("div");
    styleSettingsHeading.classList.add("bonkhud-text-color");
    styleSettingsHeading.style.fontSize = "1.2rem";
    styleSettingsHeading.style.marginBottom = "5px";
    styleSettingsHeading.textContent = "Style Settings";

    mainSettingsDiv.appendChild(mainSettingsHeading);
    mainSettingsDiv.appendChild(mainSettingsAdHideLabel);
    mainSettingsDiv.appendChild(mainSettingsAdHide);

    // Append children of style settings to rows
    styleResetDiv.appendChild(styleResetLabel);
    styleResetDiv.appendChild(styleResetButton);
    styleExportDiv.appendChild(styleExportLabel);
    styleExportDiv.appendChild(styleExportButton);
    styleImportDiv.appendChild(styleImportLabel);
    styleImportDiv.appendChild(styleImportButton);
    styleImportDiv.appendChild(styleImportInput);

    styleSettingsDiv.appendChild(styleSettingsHeading);
    styleSettingsDiv.appendChild(styleResetDiv);
    styleSettingsDiv.appendChild(styleExportDiv)
    styleSettingsDiv.appendChild(styleImportDiv);

    let holdLeft = document.createElement("div");
    holdLeft.style.display = "flex";
    holdLeft.style.alignContent = "center";

    let opacityLabel = document.createElement("label");
    opacityLabel.classList.add("bonkhud-settings-label");
    opacityLabel.textContent = "Opacity";

    let opacitySlider = document.createElement("input");
    opacitySlider.type = "range"; // Slider type for range selection
    opacitySlider.min = "0.1"; // Minimum opacity value
    opacitySlider.max = "1"; // Maximum opacity value (fully opaque)
    opacitySlider.step = "0.05"; // Incremental steps for opacity adjustment
    opacitySlider.value = "1"; // Default value set to fully opaque
    opacitySlider.style.minWidth = "20px";
    opacitySlider.style.flexGrow = "1"; // Width adjusted for the label

    holdLeft.appendChild(opacityLabel);
    holdLeft.appendChild(opacitySlider);

    styleSettingsDiv.appendChild(holdLeft);

    for (let prop in bonkHUD.styleHold) {
        let colorDiv = document.createElement("div");
        colorDiv.style.marginTop="5px";

        let colorLabel = document.createElement("label");
        colorLabel.classList.add("bonkhud-text-color");
        colorLabel.classList.add("bonkhud-settings-label");
        colorLabel.style.marginRight = "10px";
        colorLabel.innerText = bonkHUD.styleHold[prop].class;

        let colorEdit = document.createElement("input");
        colorEdit.setAttribute('type', 'color');
        colorEdit.id = "bonkhud-" + prop + "-edit";
        colorEdit.value = bonkHUD.styleHold[prop].color;
        colorEdit.style.display = "inline-block";

        colorDiv.appendChild(colorLabel);
        colorDiv.appendChild(colorEdit);

        styleSettingsDiv.appendChild(colorDiv);
        colorEdit.addEventListener('change', (e) => {
            bonkHUD.styleHold[prop].color = e.target.value;
            bonkHUD.saveStyleSettings();
            bonkHUD.updateStyleSettings();
        });
    }

    let topBarButtons = document.querySelectorAll("#pretty_top_bar > .niceborderleft");
    //Create element in top bar
    let topBarOption = document.createElement("div");
    topBarOption.style.width = "58px";
    topBarOption.style.height = "34px";
    topBarOption.style.backgroundRepeat = "no-repeat";
    topBarOption.style.backgroundPosition = "center";
    topBarOption.style.position = "absolute";
    topBarOption.style.right = topBarButtons.length * 58 + 1 + "px";
    topBarOption.style.top = "0";
    topBarOption.style.visibility = "visible";
    topBarOption.style.borderBottom = "2px solid transparent";
    topBarOption.style.lineHeight = "34px";
    topBarOption.style.textAlign = "center";
    topBarOption.style.fontFamily = "futurept_b1";
    topBarOption.style.color = "#ffffff";
    topBarOption.classList.add("niceborderleft");
    topBarOption.classList.add("pretty_top_button");

    let topBarIcon = document.createElement("span");
    topBarIcon.innerText = "HUD";

    // Append Header
    header.appendChild(title);
    header.appendChild(closeButton)

    // Append everything to main container (HUD window)
    containerContainer.appendChild(windowSettingsContainer);
    containerContainer.appendChild(settingsContainer);

    settingsMenu.appendChild(header);
    settingsMenu.appendChild(containerContainer);
    topBarOption.appendChild(topBarIcon);

    document.getElementById('prettymenu').appendChild(settingsMenu);
    //Place it before help button
    document.getElementById('pretty_top_bar').appendChild(topBarOption);

    // Add settings
    bonkHUD.createSettingsControl(mainSettingsDiv, generalSettingsDiv);
    bonkHUD.createSettingsControl(styleSettingsDiv, generalSettingsDiv);
    bonkHUD.createMenuHeader("General", generalSettingsDiv);

    let ind = bonkHUD.settingsHold.length;
    bonkHUD.settingsHold.push("bonkhud-main-mod-setting");
    let settings = { hideAds: false, opacity: "1"};
    let tempSettings = bonkHUD.getModSetting(ind);
    if (tempSettings != null) {
        settings = tempSettings;
        // Could bring into one function then call it
        mainSettingsAdHide.checked = settings.hideAds;
        let ad1 = window.top.document.getElementById('adboxverticalCurse');
        let ad2 = window.top.document.getElementById('adboxverticalleftCurse');
        if (settings.hideAds) {
            ad1.style.display = "none";
            ad2.style.display = "none";
        } else {
            ad1.style.display = "block";
            ad2.style.display = "block";
        }

        opacitySlider.value = settings.opacity;
        settingsMenu.style.opacity = settings.opacity;
    }

    opacitySlider.oninput = function () {
        settingsMenu.style.opacity = this.value;
        settings.opacity = this.value;
        bonkHUD.saveModSetting(ind, settings);
    };

    mainSettingsAdHide.oninput = function () {
        settings.hideAds = this.checked;
        let ad1 = window.top.document.getElementById('adboxverticalCurse');
        let ad2 = window.top.document.getElementById('adboxverticalleftCurse');
        if (settings.hideAds) {
            ad1.style.display = "none";
            ad2.style.display = "none";
        } else {
            ad1.style.display = "block";
            ad2.style.display = "block";
        }
        bonkHUD.saveModSetting(ind, settings);
    }

    // Make menu to control opacity + visibility visible
    closeButton.addEventListener('click', (e) => {
        settingsMenu.style.visibility = "hidden";
    })
    topBarOption.addEventListener('click', (e) => {
        if (settingsMenu.style.visibility == "hidden") {
            settingsMenu.style.visibility = "visible";
        }
        else {
            settingsMenu.style.visibility = "hidden";
        }
    });
    styleResetButton.addEventListener('click', (e) => {
        bonkHUD.resetStyleSettings();
        bonkHUD.updateStyleSettings();
    });
    styleExportButton.addEventListener('click', (e) => {
        bonkHUD.updateStyleSettings();
        bonkHUD.exportStyleSettings();
    });
    styleImportButton.addEventListener('click', (e) => {
        styleImportInput.click();
    });
};