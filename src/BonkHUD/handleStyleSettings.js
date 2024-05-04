#Main{Preload}

bonkHUD.saveStyleSettings = function () {
    localStorage.setItem('bonkHUD_Style_Settings', JSON.stringify(bonkHUD.styleHold));
};

bonkHUD.exportStyleSettings = function() {
    let out = JSON.stringify(bonkHUD.styleHold);
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
        //! No error handling for incorrect file, only protection is that it is in .style file
        console.log(e.target.result);
        bonkHUD.loadStyleSettings(JSON.parse(e.target.result));
        bonkHUD.updateStyleSettings();
        bonkHUD.saveStyleSettings();
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
        buttonColor: {class:"bonkhud-button-color", css:"background-color", color:"#bcc4bb"},
        buttonColorHover: {class:"bonkhud-button-color", css:"background-color", color:"#acb9ad"},
    };
};

bonkHUD.updateStyleSettings = function () {
    for(let prop in bonkHUD.styleHold) {
        if(prop == "buttonColorHover")
            continue;
        else if(prop == "headerColor") {
            elements = document.getElementsByClassName(bonkHUD.styleHold[prop].class);
            for (let j = 0; j < elements.length; j++) {
                elements[j].style.setProperty(bonkHUD.styleHold[prop].css, bonkHUD.styleHold[prop].color, "important");
            }
            continue;
        }
        else {
            elements = document.getElementsByClassName(bonkHUD.styleHold[prop].class);
            for (let j = 0; j < elements.length; j++) {
                elements[j].style.setProperty(bonkHUD.styleHold[prop].css, bonkHUD.styleHold[prop].color);
            }
        }
    }
};