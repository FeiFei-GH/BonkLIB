//@Main{Preload}

bonkHUD.createWindow = function (windowName, windowContent, opts = {}) {
    //! Currently not checking for repeating ids
    let id = "bonkHUD_window_" + windowName; 
    let modVersion = "1.0.0";
    let settingElement = 0
    if(opts.hasOwnProperty("windowId")) {
        id = opts.windowId
    }
    if(opts.hasOwnProperty("modVersion")) {
        modVersion = opts.modVersion
    }
    if(opts.hasOwnProperty("bonkLIBVersion")) {
        if(opts.bonkLIBVersion != bonkLIB.version) {
            if(typeof opts.bonkLIBVersion === 'string') {
                if(opts.bonkLIBVersion.substring(0, opts.bonkLIBVersion.lastIndexOf(".")) != bonkLIB.version.substring(0, bonkLIB.version.lastIndexOf(".")))
                    alert(windowName + " may not be compatible with current version of BonkLIB ("+opts.bonkLIBVersion+" =/= "+bonkLIB.version+")");
                console.log(windowName + " may not be compatible with current version of BonkLIB ("+opts.bonkLIBVersion+" =/= "+bonkLIB.version+")");
            }
            else {
                alert("Version is incompatible, please check with mod maker to fix");
            }
        }
    }
    if(opts.hasOwnProperty("settingsContent")) {
        settingElement = opts.settingsContent
    }
    //! ignoring for now
    /*if(opts.hasOwnProperty("bonkVersion")) {
        
    }*/
    let idCounter = 0
    while(document.getElementById(id) != null) {
        id = "bonkHUD_window_" + windowName + idCounter
        idCounter++
    }

    //(name, id, recVersion, bodyHTML, settingElement = 0) {

    let ind = bonkHUD.getWindowIndexByID(id);
    if (ind == -1) {
        bonkHUD.windowHold.push(bonkHUD.getUISetting(id));
        ind = bonkHUD.windowHold.length - 1;
    }

    // Create the main container 'dragItem'
    let dragItem = document.createElement("div");
    dragItem.classList.add("bonkhud-window-container");
    dragItem.classList.add("bonkhud-background-color");
    dragItem.classList.add("windowShadow");
    dragItem.id = id + "-drag";
    dragItem.style.overflowX = "hidden";
    dragItem.style.overflowY = "hidden";
    dragItem.style.bottom = bonkHUD.windowHold[ind].bottom; //top ? top : "0";
    dragItem.style.right = bonkHUD.windowHold[ind].right; //left ? left : "0";
    dragItem.style.width = bonkHUD.windowHold[ind].width; //width ? width : "172";
    dragItem.style.height = bonkHUD.windowHold[ind].height; //height ? height : minHeight;
    //dragItem.style.minHeight = minHeight; // Minimum height to prevent deformation
    dragItem.style.display = bonkHUD.windowHold[ind].display;
    dragItem.style.visibility = "visible";
    dragItem.style.opacity = bonkHUD.windowHold[ind].opacity;

    let dragNW = document.createElement("div");
    dragNW.classList.add("bonkhud-resizer");
    dragNW.classList.add("north-west");

    let dragNE = document.createElement("div");
    dragNE.classList.add("bonkhud-resizer");
    dragNE.classList.add("north-east");

    let dragSE = document.createElement("div");
    dragSE.classList.add("bonkhud-resizer");
    dragSE.classList.add("south-east");

    let dragSW = document.createElement("div");
    dragSW.classList.add("bonkhud-resizer");
    dragSW.classList.add("south-west");

    // Create the header
    let header = document.createElement("div");
    header.classList.add("bonkhud-drag-header");
    header.classList.add("newbonklobby_boxtop");
    header.classList.add("newbonklobby_boxtop_classic");
    header.classList.add("bonkhud-header-color");
    header.style.borderRadius = "0px";
    header.style.visibility = "visible";

    // Create the title span
    let title = document.createElement("span");
    title.classList.add("bonkhud-drag-header");
    title.classList.add("bonkhud-title-color");
    title.textContent = windowName;
    title.style.flexGrow = "1";
    title.style.textAlign = "center";

    // Create the resize button
    let openCloseButton = document.createElement("div");
    openCloseButton.classList.add("bonkhud-header-button");
    openCloseButton.classList.add("bonkhud-title-color");
    openCloseButton.classList.add("bonkhud-resize");
    openCloseButton.innerText = "△"; // Use an appropriate icon or text
    openCloseButton.style.fontSize = "15px";
    openCloseButton.style.lineHeight = "25px";
    openCloseButton.style.textIndent = "5px";
    openCloseButton.style.cursor = "cell";

    let closeButton = document.createElement("div");
    closeButton.classList.add("bonkhud-header-button");
    closeButton.classList.add("bonkhud-title-color");
    closeButton.innerText = "_"; // Use an appropriate icon or text
    closeButton.style.lineHeight = "9px";
    closeButton.style.right = "3px";
    closeButton.style.cursor = "pointer";

    // Append the title and resize button to the header
    header.appendChild(title);
    header.appendChild(openCloseButton);
    header.appendChild(closeButton);

    // Append the header to the dragItem
    dragItem.appendChild(dragNW);
    dragItem.appendChild(dragNE);
    dragItem.appendChild(dragSE);
    dragItem.appendChild(dragSW);
    dragItem.appendChild(header);

    // Create the key table
    windowContent.id = id;
    windowContent.classList.add("bonkhud-text-color");
    windowContent.classList.add("bonkhud-scrollbar-kit");
    windowContent.classList.add("bonkhud-scrollbar-other");
    windowContent.style.overflowY = "scroll";
    windowContent.style.padding = "5px";
    windowContent.style.width = "calc(100% - 10px)";
    windowContent.style.height = "calc(100% - 42px)"; // Adjusted height for header

    // Append the keyTable to the dragItem
    dragItem.appendChild(windowContent);

    // Append the opacity control to the dragItem
    let opacityControl = bonkHUD.createWindowControl(windowName, modVersion, ind, settingElement);
    document.getElementById("bonkhud-window-settings-container").appendChild(opacityControl);

    // Append the dragItem to the body of the page
    document.body.appendChild(dragItem);

    closeButton.addEventListener('click', (e) => {
        dragItem.style.display = "none";
        let visCheck = document.getElementById(id + "-visibility-check");
        visCheck.checked = false;
        bonkHUD.windowHold[ind].display = dragItem.style.display;
        bonkHUD.saveUISetting(id);
    });

    // Add event listeners for dragging
    dragItem.addEventListener('mousedown', (e) => bonkHUD.dragStart(e, dragItem));

    // Add event listeners for resizing
    openCloseButton.addEventListener('mousedown', (e) => {
        if(openCloseButton.innerText == "△") {
            dragItem.style.visibility = "hidden";
            header.style.borderRadius = "8px";
            openCloseButton.innerText = "▽";
        } else {
            dragItem.style.visibility = "visible";
            header.style.borderRadius = "0px";
            openCloseButton.innerText = "△";
        }
    });
    dragNW.addEventListener('mousedown', (e) => bonkHUD.startResizing(e, dragItem, "nw"));
    dragNE.addEventListener('mousedown', (e) => bonkHUD.startResizing(e, dragItem, "ne"));
    dragSE.addEventListener('mousedown', (e) => bonkHUD.startResizing(e, dragItem, "se"));
    dragSW.addEventListener('mousedown', (e) => bonkHUD.startResizing(e, dragItem, "sw"));

    bonkHUD.updateStyleSettings(); //! probably slow but it works, its not like someone will have 100's of windows

    return windowContent
};