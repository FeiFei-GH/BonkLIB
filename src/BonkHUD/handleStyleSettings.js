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
    for(let prop in bonkHUD.styleHold) {
        try {
            let colorEdit = document.getElementById("bonkhud-" + prop + "-edit");
            colorEdit.value = bonkHUD.styleHold[prop].color;
        } catch (er) {
            console.log("Element bonkhud-" + prop + "-edit does not exist");
        }

        if(prop == "buttonColorHover")
            continue;
        else if(prop == "headerColor") {
            let elements = document.getElementsByClassName(bonkHUD.styleHold[prop].class);
            for (let j = 0; j < elements.length; j++) {
                elements[j].style.setProperty(bonkHUD.styleHold[prop].css, bonkHUD.styleHold[prop].color, "important");
            }
            continue;
        }
        else {
            let elements = document.getElementsByClassName(bonkHUD.styleHold[prop].class);
            for (let j = 0; j < elements.length; j++) {
                elements[j].style.setProperty(bonkHUD.styleHold[prop].css, bonkHUD.styleHold[prop].color);
            }
        }
    }
};