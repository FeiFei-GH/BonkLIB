//@Main{Load}

window.PIXI.Graphics.prototype.drawShape = function(...args) {
    //! testing whether cap can be easily found in drawShape
    //! in drawCircle, capzone has attribute 'cap: "bet"' inside fill_outline
    //console.log([...args]);
    let draw = this;
    setTimeout(function(){
        if(draw.parent) {
            bonkAPI.parentDraw = draw.parent;
            while(bonkAPI.parentDraw.parent != null) {
                bonkAPI.parentDraw = bonkAPI.parentDraw.parent;
            }
        }
    }, 0);
    return bonkAPI.originalDrawShape.call(this, ...args);
}
window.requestAnimationFrame = function(...args) {
    //console.log(bonkAPI.isInGame());
    if(bonkAPI.isInGame()) {
        let canv = 0;
        for(let i = 0; i < document.getElementById("gamerenderer").children.length; i++) {
            if(document.getElementById("gamerenderer").children[i].constructor.name == "HTMLCanvasElement"){
                canv = document.getElementById("gamerenderer").children[i];
                break;
            }
        }
        //console.log(bonkAPI.parentDraw);
        if(canv != 0 && bonkAPI.parentDraw) {
            //! might do something might not
            while(bonkAPI.parentDraw.parent != null) {
                bonkAPI.parentDraw = bonkAPI.parentDraw.parent;
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
                bonkAPI.pixiStage = 0;
                for(let i = 0; i < bonkAPI.parentDraw.children.length; i++){
                    if(bonkAPI.parentDraw.children[i].constructor.name == "e"){
                        //console.log(bonkAPI.parentDraw);
                        bonkAPI.pixiStage = bonkAPI.parentDraw.children[i];
                        break;
                    }
                }
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
    }
    return bonkAPI.originalRequestAnimationFrame.call(this,...args);
}

/**
 * When the map has changed.
 * @event mapSwitch
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