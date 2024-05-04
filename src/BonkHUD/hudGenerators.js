#Main{Preload}

bonkHUD.generateButton = function (name) {
    let newButton = document.createElement("div");
    newButton.classList.add("bonkhud-button-color");
    newButton.classList.add("bonkhud-text-color");
    newButton.style.cursor = "pointer";
    newButton.style.borderRadius = "3px";
    newButton.style.textAlign = "center";
    newButton.style.backgroundColor = bonkHUD.styleHold.buttonColor.color;
    newButton.innerText = name;

    newButton.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = bonkHUD.styleHold.buttonColorHover.color;
    });
    newButton.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = bonkHUD.styleHold.buttonColor.color;
    });
    return newButton;
}
