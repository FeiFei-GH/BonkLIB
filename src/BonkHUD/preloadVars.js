#Variables{Preload}
window.bonkHUD = {};

bonkHUD.windowHold = [];

//! not used but will be
// *Style Store
bonkHUD.styleHold = {};

//! styles added do not include color, to be added/changed by user
//! some innercss using these classes still has not been deleted(will do it)
bonkHUD.bonkHUDCSS = document.createElement("style");

bonkHUD.bonkHUDCSS.innerHTML = `
.bonkhud-settings-row {
    border-bottom: 1px solid;
    padding: 10px;
}
.bonkhud-settings-label {
    font-size: 0.9rem;
    font-weight: bold;
}
.bonkhud-window-container {
    position: fixed;
    min-width: 5rem;
    font-family: "futurept_b1";
    border-radius: 8px;
    z-index: 9990;
}
.bonkhud-header-button {
    position: absolute;
    top: 3px;
    width: 25px;
    height: 25px;
    border-radius: 3px;
}
.bonkhud-scrollbar-kit::-webkit-scrollbar {
    display: none;
}
.bonkhud-scrollbar-other {
    scrollbar-width: none;
}
.bonkhud-resizer {
    width: 10px;
    height: 10px;
    background: transparent;
    position: absolute;
}
.bonkhud-resizer.north-west {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
}
.bonkhud-resizer.north-east {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
}
.bonkhud-resizer.south-east {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
}
.bonkhud-resizer.south-west {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
}
`;

document.getElementsByTagName("head")[0].appendChild(bonkHUD.bonkHUDCSS);
