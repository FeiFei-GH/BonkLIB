#Main
window.bonkLIB = {};

#Variables{Preload}
#Main{Preload}

// #region //!------------------Load Complete Detection------------------
bonkLIB.onLoaded = () => {
    #Variables{Load}
    #Main{Load}
    console.log("Document loaded complete");
};

bonkLIB.checkDocumentReady = () => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        bonkLIB.onLoaded();
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            //if (document.readyState === "complete") {
                bonkLIB.onLoaded();
            //}
        });
    }
};

// Call the function to check document readiness
bonkLIB.checkDocumentReady();
// #endregion
