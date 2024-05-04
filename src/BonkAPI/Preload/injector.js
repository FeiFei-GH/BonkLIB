#Main{Preload}

// *Injecting code into src
bonkAPI.injector = function (src) {
    let newSrc = src;

    //! Inject capZoneEvent fire
    let orgCode = `K$h[9]=K$h[0][0][K$h[2][138]]()[K$h[2][115]];`;
    let newCode = `
        K$h[9]=K$h[0][0][K$h[2][138]]()[K$h[2][115]];
        
        capZoneEventTry: try {
            // Initialize
            let inputState = z0M[0][0];
            let currentFrame = inputState.rl;
            let playerID = K$h[0][0].m_userData.arrayID;
            let capID = K$h[1];
            
            let sendObj = { capID: capID, playerID: playerID, currentFrame: currentFrame };
            
            if (window.bonkAPI.events.hasEvent["capZoneEvent"]) {
                window.bonkAPI.events.fireEvent("capZoneEvent", sendObj);
            }
        } catch(err) {
            console.error("ERROR: capZoneEvent");
            console.error(err);
        }`;

    newSrc = newSrc.replace(orgCode, newCode);

    //! Inject stepEvent fire
    orgCode = `return z0M[720];`;
    newCode = `
        stepEventTry: try {
            let inputStateClone = JSON.parse(JSON.stringify(z0M[0][0]));
            let currentFrame = inputStateClone.rl;
            let gameStateClone = JSON.parse(JSON.stringify(z0M[720]));
            
            let sendObj = { inputState: inputStateClone, gameState: gameStateClone, currentFrame: currentFrame };
            
            if (window.bonkAPI.events.hasEvent["stepEvent"]) {
                window.bonkAPI.events.fireEvent("stepEvent", sendObj);
            }
        } catch(err) {
            console.error("ERROR: stepEvent");
            console.error(err);
        }
        
        return z0M[720];`;

    newSrc = newSrc.replace(orgCode, newCode);

    //! Inject frameIncEvent fire
    //TODO: update to bonk 49
    orgCode = `Y3z[8]++;`;
    newCode = `
        Y3z[8]++;
        
        frameIncEventTry: try {
            if (window.bonkAPI.events.hasEvent["frameIncEvent"]) {
                var sendObj = { frame: Y3z[8], gameStates: o3x[7] };
                
                window.bonkAPI.events.fireEvent("frameIncEvent", sendObj);
            }
        } catch(err) {
            console.error("ERROR: frameIncEvent");
            console.error(err);
        }`;

    // newSrc = newSrc.replace(orgCode, newCode);
    return newSrc;
};

// Compatibility with Excigma's code injector userscript
if (!window.bonkCodeInjectors) window.bonkCodeInjectors = [];
window.bonkCodeInjectors.push((bonkCode) => {
    try {
        return bonkAPI.injector(bonkCode);
    } catch (error) {
        alert(`Injecting failed, BonkAPI may lose some functionality. This may be due to an update by Chaz.`);
        throw error;
    }
});