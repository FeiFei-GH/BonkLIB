//@Main{Preload}

/**
 * Called when sending inputs out.
 * @function send_Inputs
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.send_Inputs = function (args) {
    /**
     * When inputs are received from other players.
     * @event gameInputs
     * @type {object}
     * @property {number} userID - ID of the player who inputted
     * @property {number} rawInput - Input of the player in the form of 6 bits
     * @property {number} frame - Frame when input happened
     * @property {number} sequence - The total amount of inputs by that player
     */
    if (bonkAPI.events.hasEvent["gameInputs"]) {
        var sendObj = {
            userID: bonkAPI.myID,
            rawInput: args[1]["i"],
            frame: args[1]["f"],
            sequence: args[1]["c"],
        };
        bonkAPI.events.fireEvent("gameInputs", sendObj);
    }

    return args;
};

/**
 * Called when started the game.
 * @function send_GameStart
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.send_GameStart = function (args) {
    /**
     * When game has started
     * @event gameStart
     * @type {object}
     * @property {string} mapData - Encoded map data, must decode it to use
     * @property {object} startData - Extra game specific data
     */
    if (bonkAPI.events.hasEvent["gameStart"]) {
        //! do something to mapData so it will encode it
        //! then assign it back to the args
        var sendObj = {
            mapData: bonkAPI.ISdecode(args[1]["is"]),
            startData: args[1]["gs"],
        };
        bonkAPI.events.fireEvent("gameStart", sendObj);

        //!possibly temporary
        //allows start packet to be edited
        args[1]["is"] = bonkAPI.ISencode(sendObj.mapData);
    }

    return args;
};

bonkAPI.send_TeamChange = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_TeamLock = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_PlayerKickBan = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_ChatMessage = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_LobbyInform = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Called when created a room.
 * @function send_RoomCreate
 * @fires createRoom
 * @fires playerChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.send_RoomCreate = function (args) {
    bonkAPI.playerList = [];

    for (let i = 0; i < bonkAPI.currentPlayers.length; i++) {
        /**
         * When a player leaves or joins.
         * @event playerChange
         * @type {object}
         * @property {number} userID - ID of the player who joined or left
         * @property {object} userData - Data of the player who joined or left
         * @property {boolean} hasLeft - Whether the player joined or left
         */
        if (bonkAPI.events.hasEvent["playerChange"]) {
            var sendObj = { userID: bonkAPI.currentPlayers[i], userData: bonkAPI.playerList[bonkAPI.currentPlayers[i]], hasLeft: true };
            bonkAPI.events.fireEvent("playerChange", sendObj);
        }
    }
    bonkAPI.currentPlayers = [];

    bonkAPI.playerList[0] = {
        peerId: args[1]["peerID"],
        userName: document.getElementById("pretty_top_name").textContent,
        level:
            document.getElementById("pretty_top_level").textContent == "Guest"
                ? 0
                : parseInt(document.getElementById("pretty_top_level").textContent.substring(3)),
        guest: typeof args[1].token == "undefined",
        team: 1,
        ready: false,
        tabbed: false,
        avatar: args[1]["avatar"],
    };
    bonkAPI.currentPlayers.push(0);

    bonkAPI.myID = 0;
    bonkAPI.hostID = 0;

    /**
     * When you create a room.
     * @event createRoom
     * @type {object}
     * @property {number} userID - ID of you
     * @property {object} userData - Your player data
     */
    if (bonkAPI.events.hasEvent["createRoom"]) {
        var sendObj = { userID: 0, userData: bonkAPI.playerList[0] };
        bonkAPI.events.fireEvent("createRoom", sendObj);
    }

    /**
     * When a player leaves or joins.
     * @event playerChange
     * @type {object}
     * @property {number} userID - ID of the player who joined or left
     * @property {object} userData - Data of the player who joined or left
     * @property {boolean} hasLeft - Whether the player joined or left
     */
    if (bonkAPI.events.hasEvent["playerChange"]) {
        var sendObj = { userID: 0, userData: bonkAPI.playerList[0], hasLeft: false };
        bonkAPI.events.fireEvent("playerChange", sendObj);
    }

    return args;
};

/**
 * Called as to send inital user data when joining a room.
 * @function send_RoomJoin
 * @fires roomJoin
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.send_RoomJoin = function (args) {
    //! DONT KNOW WHAT TO DO FOR NAMING
    //! Possibly get rid of XMLhttp thing since this gives the login token
    /**
     * When inputs are received from other players.
     * @event roomJoin
     * @type {object}
     * @property {string} password - Room password
     * @property {object} avatar - User's avatar
     * @property {string} token - Login token
     */
    if (bonkAPI.events.hasEvent["roomJoin"]) {
        var sendObj = {
            password: args[1]["roomPassword"],
            avatar: args[1]["avatar"],
            token: args[1]["token"] ? args[1]["token"] : null,
        };
        bonkAPI.events.fireEvent("roomJoin", sendObj);
    }

    return args;
};

bonkAPI.send_LobbyReturn = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_Ready = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_AllReadyReset = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_MapReorder = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * When you change modes.
 * @function send_ModeChange
 * @fires modeChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.send_ModeChange = function (args) {
    //  TODO: Finish implement of function
    /**
     * When the mode has changed.
     * @event modeChange
     * @type {object}
     * @property {string} mode - Short string representing the new mode
     */
    if (bonkAPI.events.hasEvent["modeChange"]) {
        var sendObj = { mode: args[1]["mo"] };
        bonkAPI.events.fireEvent("modeChange", sendObj);
    }

    return args;
};

bonkAPI.send_RoundsChange = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_MapDelete = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Called when user changes map.
 * @function send_MapSwitch
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.send_MapSwitch = function (args) {
    // *Using mapSwitch to stick with other bonkAPI.events using "change"
    /**
     * When the map has changed.
     * @event mapSwitch
     * @type {object}
     * @property {string} mapData - String with the data of the map
     */
    if (bonkAPI.events.hasEvent["mapSwitch"]) {
        var sendObj = { mapData: args[1]["m"] };
        bonkAPI.events.fireEvent("mapSwitch", sendObj);
    }
    return args;
};

bonkAPI.send_OtherTeamChange = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_MapSuggest = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_Balance = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_TeamSetting = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_ArmRecord = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_HostChange = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_Friended = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_CountdownStart = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_CountdownAbort = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_XPRequest = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_MapVote = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_InGameInform = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_PreVoteGet = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_Tabbed = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.send_NoHostSwap = function (args) {
    //  TODO: Finish implement of function

    return args;
};