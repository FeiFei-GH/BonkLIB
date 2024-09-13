//@Main{Preload}

// *Injecting code into src
bonkAPI.injector = function (src) {
    let newSrc = src;

    //! Inject stepEvent fire
    // The semicolon disappeared during the April 2024 update
    /*
     * orgCode[0] is the entire match
     * orgCode[1] is the game state
     * orgCode[2] is the most top level variable in the step function
     */
    let orgCode = src.match(/if\([a-zA-Z0-9\$_]{3}\[[0-9]+\] > 10\){;?}return (([a-zA-Z0-9\$_]{3})\[[0-9]+\]);/);

    // This can be used to access step arguments in the scope of the step function
    const globalStepVariable = orgCode[2];

    let newCode = `
        bonkAPI_stepEventTry: try {
            let inputStateClone = JSON.parse(JSON.stringify(${globalStepVariable}[0][0]));
            let currentFrame = inputStateClone.rl;
            let gameStateClone = structuredClone(${orgCode[1]});
            
            let sendObj = { inputState: inputStateClone, gameState: gameStateClone, currentFrame: currentFrame };
            
            if (window.bonkAPI.events.hasEvent["stepEvent"]) {
                window.bonkAPI.events.fireEvent("stepEvent", sendObj);
            }
        } catch(err) {
            console.error("ERROR: stepEvent");
            console.error(err);
        }

        ${orgCode[0]}`;

    newSrc = newSrc.replace(orgCode[0], newCode);

    //! Inject capZoneEvent fire
    orgCode = src.match(/if[^;]+?{count:1,players:/)[0];
    newCode = `
        bonkAPI_capZoneEventTry: try {
            // Initialize
            let inputState = ${globalStepVariable}[0][0];
            let currentFrame = inputState.rl;
            let playerID = arguments[0].GetUserData().arrayID;
            let capID = arguments[1].GetUserData().capID;
            
            let sendObj = { capID: capID, playerID: playerID, currentFrame: currentFrame };
            
            if (window.bonkAPI.events.hasEvent["capZoneEvent"]) {
                window.bonkAPI.events.fireEvent("capZoneEvent", sendObj);
            }
        } catch(err) {
            console.error("ERROR: capZoneEvent");
            console.error(err);
        }

        ${orgCode}`;

    newSrc = newSrc.replace(orgCode, newCode);

    //! Inject frameIncEvent fire
    //TODO: update to bonk 49
    orgCode = `Y3z[8]++;`;
    newCode = `
        Y3z[8]++;
        
        bonkAPI_frameIncEventTry: try {
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