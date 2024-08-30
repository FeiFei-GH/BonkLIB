//@Main
//@Variables{Preload}
//@Main{Preload}

//!------------------Load Complete Detection------------------
bonkLIB.onLoaded = () => {
    //@Variables{Load}
    //@Main{Load}
};

bonkLIB.checkDocumentReady = () => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        bonkLIB.onLoaded();
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            bonkLIB.onLoaded();
        });
    }
};

// Call the function to check document readiness
bonkLIB.checkDocumentReady();
