//@Main{Preload}

window.XMLHttpRequest.prototype.open = function (_, url) {
    if (url.includes("scripts/login_legacy")) {
        bonkAPI.isLoggingIn = true;
    }
    if (url.includes("scripts/login_auto") || url.includes("scripts/login_legacy")) {
        bonkAPI._isBonkLogin = true;
    }

    bonkAPI.originalXMLOpen.call(this, ...arguments);
};
window.XMLHttpRequest.prototype.send = function (data) {
    if (bonkAPI.isLoggingIn) {
        this.onreadystatechange = function () {
            if (this.readyState == 4) {
                try {
                    bonkAPI.myToken = JSON.parse(this.response)["token"];
                } catch {}
            }
        };
        bonkAPI.isLoggingIn = false;
    }
    if (bonkAPI._isBonkLogin) {
        var originalOnReady = this.onreadystatechange;
        this.onreadystatechange = function () {
            if (this.readyState == 4) {
                try {
                    var resp = JSON.parse(this.response);
                    if (resp.r === "success" && resp.token) {
                        // Decode JWT payload and strip sensitive fields (uip = IP)
                        try {
                            var parts = resp.token.split(".");
                            var payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
                            delete payload.uip;
                            bonkAPI.bonkToken = payload;
                        } catch (e) {
                            bonkAPI.bonkToken = null;
                        }
                    }
                } catch {}
            }
            if (originalOnReady) originalOnReady.call(this);
        };
        bonkAPI._isBonkLogin = false;
    }
    bonkAPI.originalXMLSend.call(this, ...arguments);
};