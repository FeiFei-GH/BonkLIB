//@Main{Load}

window.PIXI.Application = ApplicationWrapper;

window.requestAnimationFrame = function(...args) {
    //console.log(bonkAPI.isInGame());
    if(bonkAPI.isInGame()) {
        //! can be replaced with renderer
        let canv = 0;
        for(let i = 0; i < document.getElementById("gamerenderer").children.length; i++) {
            if(document.getElementById("gamerenderer").children[i].constructor.name == "HTMLCanvasElement"){
                canv = document.getElementById("gamerenderer").children[i];
                break;
            }
        }
        /**
         * When a new frame is rendered when in game. It is recomended
         * to not create new graphics or clear graphics every frame if
         * possible.
         * @event graphicsUpdate
         * @type {object}
         * @property {string} container - PIXI container to hold PIXI graphics.
         * @property {number} width - Width of main screen
         * @property {number} height - Height of main screen
         */
        if(bonkAPI.events.hasEvent["graphicsUpdate"]) {
            let w = parseInt(canv.style.width);
            let h = parseInt(canv.style.height);
            //bonkAPI.pixiCtx.x = w / 2;
            //bonkAPI.pixiCtx.y = h / 2;
            /*bonkAPI.pixiStage = 0;
            for(let i = 0; i < bonkAPI.parentDraw.children.length; i++){
                if(bonkAPI.parentDraw.children[i].constructor.name == "e"){
                    //console.log(bonkAPI.parentDraw);
                    bonkAPI.pixiStage = bonkAPI.parentDraw.children[i];
                    break;
                }
            }*/
            let sendObj = {
                container: bonkAPI.pixiCtx,
                width: w,
                height: h,
            };
            bonkAPI.events.fireEvent("graphicsUpdate", sendObj);
            if(bonkAPI.pixiStage != 0 && !bonkAPI.pixiStage.children.includes(bonkAPI.pixiCtx)) {
                bonkAPI.pixiStage.addChild(bonkAPI.pixiCtx);
            }
        }
    }
    return bonkAPI.originalRequestAnimationFrame.call(this,...args);
}

let intervalCount = 10;
let clearId = setInterval (() => {
    /**
     * When PIXI graphics are ready to be read from, will fire more than once
     * @event graphicsReady
     * @type {object}
     * @property {PIXI} pixi - PIXI class in order to create graphics and containers.
     * @property {string} container - PIXI container to hold PIXI graphics.
     */
    if(bonkAPI.events.hasEvent["graphicsReady"]) {
        let sendObj = {
            pixi: window.PIXI,
            container: bonkAPI.pixiCtx,
        }
        bonkAPI.events.fireEvent("graphicsReady", sendObj);
    }
    if(--intervalCount == 0) {
        clearInterval(clearId);
    }
}, 500);
