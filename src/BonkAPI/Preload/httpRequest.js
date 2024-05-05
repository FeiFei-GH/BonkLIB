//@Main{Preload}

window.XMLHttpRequest.prototype.open = function (_, url) {
    if (url.includes("scripts/login_legacy")) {
        bonkAPI.isLoggingIn = true;
    }
    //? Could check for other post requests but not necessary

    bonkAPI.originalXMLOpen.call(this, ...arguments);
};
window.XMLHttpRequest.prototype.send = function (data) {
    if (bonkAPI.isLoggingIn) {
        this.onreadystatechange = function () {
            if (this.readyState == 4) {
                bonkAPI.myToken = JSON.parse(this.response)["token"];
            }
        };
        bonkAPI.isLoggingIn = false;
    }
    bonkAPI.originalXMLSend.call(this, ...arguments);
};