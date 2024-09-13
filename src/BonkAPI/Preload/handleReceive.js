//@Main{Preload}

/**
 * Triggered when recieving ping updates.
 * @function receive_PingUpdate
 * @fires pingUpdate
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_PingUpdate = function (args) {
    let pingList = args[1];
    let ehcoTo = args[2];

    /**
     * When the user receives ping update.
     * @event pingUpdate
     * @type {object}
     * @property {object} pingList - Other players' ping
     * @property {number} echoTo - The ID of the player to echo to
     */
    if (bonkAPI.events.hasEvent["pingUpdate"]) {
        var sendObj = {
            pingList: pingList,
            ehcoTo: ehcoTo,
        };
        bonkAPI.events.fireEvent("pingUpdate", sendObj);
    }

    return args;
};

bonkAPI.receive_Unknow2 = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggered when the user joins a lobby.
 * @function receive_RoomJoin
 * @fires joinRoom
 * @fires playerChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_RoomJoin = function (args) {
    bonkAPI.playerList = [];
    bonkAPI.myID = args[1];
    bonkAPI.hostID = args[2];

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

    for (let i = 0; i < args[3].length; i++) {
        bonkAPI.playerList[i] = args[3][i];
        if (args[3][i] != null) {
            bonkAPI.currentPlayers.push(i);

            /**
             * When a player leaves or joins.
             * @event playerChange
             * @type {object}
             * @property {number} userID - ID of the player who joined or left
             * @property {object} userData - Data of the player who joined or left
             * @property {boolean} hasLeft - Whether the player joined or left 
             */
            if (bonkAPI.events.hasEvent["playerChange"]) {
                var sendObj = { userID: args[1], userData: bonkAPI.playerList[args[1]], hasLeft: false };
                bonkAPI.events.fireEvent("playerChange", sendObj);
            }
        }
    }
    /**
     * When the user joins a lobby.
     * @event joinRoom
     * @type {object}
     * @property {number} hostID - ID of the host
     * @property {Array.<Player>} userData - List of players currently in the room
     * @property {*} roomID - ID of the lobby joined
     * @property {string} bypass
     */
    if (bonkAPI.events.hasEvent["joinRoom"]) {
        var sendObj = {
            hostID: args[2],
            userData: bonkAPI.playerList, // !May or may not be immutable
            roomID: args[6],
            bypass: args[7],
        };
        bonkAPI.events.fireEvent("joinRoom", sendObj);
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
        var sendObj = { userID: args[1], userData: bonkAPI.playerList[args[1]], hasLeft: false };
        bonkAPI.events.fireEvent("playerChange", sendObj);
    }

    return args;
};

/**
 * Triggered when a player joins the lobby.
 * @function receive_PlayerJoin
 * @fires userJoin
 * @fires playerChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_PlayerJoin = function (args) {
    bonkAPI.playerList[args[1]] = {
        peerId: args[2],
        userName: args[3],
        guest: args[4],
        level: args[5],
        team: args[6],
        ready: false,
        tabbed: false,
        avatar: args[7],
    };
    bonkAPI.currentPlayers.push(args[1]);

    //? can:
    //? - send the bonkAPI.playerList as data
    //? - send the new player object as data
    //? - send nothing and let the user access bonkAPI.playerList
    /**
     * When another player joins the lobby.
     * @event userJoin
     * @type {object}
     * @property {number} userID - ID of the player joined
     * @property {Player} userData - {@linkcode Player} object data of the player that joined
     */
    if (bonkAPI.events.hasEvent["userJoin"]) {
        var sendObj = { userID: args[1], userData: bonkAPI.playerList[args[1]] };
        bonkAPI.events.fireEvent("userJoin", sendObj);
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
        var sendObj = { userID: args[1], userData: bonkAPI.playerList[args[1]], hasLeft: false };
        bonkAPI.events.fireEvent("playerChange", sendObj);
    }

    return args;
};

/**
 * Triggered when a player leaves the lobby.
 * @function receive_PlayerLeave
 * @fires userLeave
 * @fires playerChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_PlayerLeave = function (args) {
    // Remove player from current players
    bonkAPI.currentPlayers.forEach((n, i) => {
        if (n == args[1]) {
            bonkAPI.currentPlayers.splice(i, 1);
        }
    });

    /**
     * When another player leaves the lobby.
     * @event userLeave
     * @type {object}
     * @property {number} userID - ID of the player left
     * @property {Player} userData - {@linkcode Player} object data of the player that left
     */
    if (bonkAPI.events.hasEvent["userLeave"]) {
        var sendObj = { userID: args[1], userData: bonkAPI.playerList[args[1]] };
        bonkAPI.events.fireEvent("userLeave", sendObj);
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
        var sendObj = { userID: args[1], userData: bonkAPI.playerList[args[1]], hasLeft: true };
        bonkAPI.events.fireEvent("playerChange", sendObj);
    }

    return args;
};

/**
 * Triggered when the host has left.
 * @function receive_HostLeave
 * @fires hostChange
 * @fires userLeave
 * @fires playerChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_HostLeave = function (args) {
    let lastHostID = bonkAPI.hostID;
    bonkAPI.hostID = args[2];

    // Remove player from current players
    bonkAPI.currentPlayers.forEach((n, i) => {
        if (n == lastHostID) {
            bonkAPI.currentPlayers.splice(i, 1);
        }
    });

    /**
     * When the host changes.
     * @event hostChange
     * @type {object}
     * @property {number} userID - ID of the new host
     */
    //Using hostChange to use for multiple cases
    if (bonkAPI.events.hasEvent["hostChange"]) {
        var sendObj = { userID: args[1] };
        bonkAPI.events.fireEvent("hostChange", sendObj);
    }

    /**
     * When another player leaves the lobby.
     * @event userLeave
     * @type {object}
     * @property {number} userID - ID of the player left
     * @property {Player} userData - {@linkcode Player} object data of the player that left
     */
    if (bonkAPI.events.hasEvent["userLeave"]) {
        var sendObj = { userID: lastHostID, userData: bonkAPI.playerList[lastHostID] };
        bonkAPI.events.fireEvent("userLeave", sendObj);
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
        var sendObj = { userID: lastHostID, userData: bonkAPI.playerList[lastHostID], hasLeft: true };
        bonkAPI.events.fireEvent("playerChange", sendObj);
    }

    return args;
};

/**
 * Triggered when a player sends an input.
 * @function receive_Inputs
 * @fires gameInputs
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_Inputs = function (args) {
    /*
     * Maybe we could have different event names like
     * "receiveRawInput" and "receiveInput" which send
     * different data, the second could have booleans
     * representing the inputs, the other is binary
     */
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
            userID: args[1],
            rawInput: args[2]["i"],
            frame: args[2]["f"],
            sequence: args[2]["c"],
        };
        bonkAPI.events.fireEvent("gameInputs", sendObj);
    } //example
    /*if(bonkAPI.bonkAPI.events.hasEvent["receiveRawInput"]) {
        obj here
        bonkAPI.bonkAPI.events.fireEvent("receiveRawInput", sendObj);
    }
    */

    return args;
};

bonkAPI.receive_ReadyChange = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_GameEnd = function (args) {
    //  TODO: Finish implement of function

    return args;
};

//! Detects when match starts!!!
/**
 * Triggered when the game starts.
 * @function receive_GameStart
 * @fires gameStart
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_GameStart = function (args) {
    /**
     * When game has started
     * @event gameStart
     * @type {object}
     * @property {string} mapData - Encoded map data, must decode it to use
     * @property {object} startData - Extra game specific data
     */
    if (bonkAPI.events.hasEvent["gameStart"] && bonkAPI.myID != bonkAPI.hostID) {
        //! change name of mapdata since it is not map data, probably gamestate
        //! do the same in triggerstart
        var sendObj = {
            mapData: bonkAPI.ISdecode(args[2]),
            startData: args[3],
        };
        bonkAPI.events.fireEvent("gameStart", sendObj);
    }

    return args;
};

bonkAPI.receive_Error = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggered when a player changes team.
 * @function receive_TeamChange
 * @fires teamChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_TeamChange = function (args) {
    bonkAPI.playerList[parseInt(args[1])].team = args[2];

    /**
     * When a player has changed teams.
     * @event teamChange
     * @type {object}
     * @property {number} userID - Player who changed teams
     * @property {number} team - The new team, represented from 0 to 5
     */
    if (bonkAPI.events.hasEvent["teamChange"]) {
        var sendObj = { userID: args[1], team: args[2] };
        bonkAPI.events.fireEvent("teamChange", sendObj);
    }

    return args;
};

bonkAPI.receive_TeamLockToggle = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggered when received a message.
 * @function receive_ChatMessage
 * @fires chatIn
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_ChatMessage = function (args) {
    let chatUserID = args[1];
    let chatMessage = args[2];

    /**
     * When the user has received a message.
     * @event chatIn
     * @type {object}
     * @property {number} userID - Player who chatted
     * @property {string} message - The message received
     */
    if (bonkAPI.events.hasEvent["chatIn"]) {
        var sendObj = { userID: chatUserID, message: chatMessage };
        bonkAPI.events.fireEvent("chatIn", sendObj);
    }

    return args;
};

/**
 * Data given by host after join.
 * @function receive_InitialData
 * @fires modeChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_InitialData = function (args) {
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

bonkAPI.receive_PlayerKick = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggered when the mode changes.
 * @function receive_ModeChange
 * @fires modeChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_ModeChange = function (args) {
    // *Maybe change raw arguement to full mode name or numbers
    /**
     * When the mode has changed.
     * @event modeChange
     * @type {object}
     * @property {string} mode - Short string representing the new mode
     */
    if (bonkAPI.events.hasEvent["modeChange"]) {
        var sendObj = { mode: args[1] };
        bonkAPI.events.fireEvent("modeChange", sendObj);
    }

    return args;
};

bonkAPI.receive_RoundsChange = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggered when map has changed.
 * @function receive_MapSwitch
 * @fires mapSwitch
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_MapSwitch = function (args) {
    // *Using mapSwitch to stick with other bonkAPI.events using "change"
    /**
     * When the map has changed.
     * @event mapSwitch
     * @type {object}
     * @property {string} mapData - String with the data of the map
     */
    if (bonkAPI.events.hasEvent["mapSwitch"]) {
        var sendObj = { mapData: args[1] };
        bonkAPI.events.fireEvent("mapSwitch", sendObj);
    }

    return args;
};

bonkAPI.receive_Inactive = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_MapSuggest = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_MapSuggestClient = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_PlayerBalance = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_ReplaySave = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggered when there is a new host.
 * @function receive_NewHost
 * @fires hostChange
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_NewHost = function (args) {
    bonkAPI.hostID = args[1]["newHost"];

    /**
     * When the host changes.
     * @event hostChange
     * @type {object}
     * @property {number} userID - ID of the new host
     */
    if (bonkAPI.events.hasEvent["hostChange"]) {
        var sendObj = { userID: args[1]["newHost"] };
        bonkAPI.events.fireEvent("hostChange", sendObj);
    }

    return args;
};

/**
 * Triggered when the user receives a friend request.
 * @function receive_FriendReq
 * @fires receivedFriend
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_FriendRequest = function (args) {
    /**
     * When the the user has been friended.
     * @event receivedFriend
     * @type {object}
     * @property {number} userID - ID of the player who friended you
     */
    if (bonkAPI.events.hasEvent["receivedFriend"]) {
        var sendObj = { userID: args[1] };
        bonkAPI.events.fireEvent("receivedFriend", sendObj);
    }

    return args;
};

bonkAPI.receive_CountdownStart = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_CountdownAbort = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_PlayerLevelUp = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_LocalXPGain = function (args) {
    //  TODO: Finish implement of function

    return args;
};

/**
 * Triggers after joining a room and the 
 * game state is sent.
 * @function receive_gameState
 * @fires modeChange
 * @fires gameStart
 * @param {JSON} args - Packet received by websocket.
 * @returns {JSON} arguements
 */
bonkAPI.receive_gameState = function (args) {
    //! also needs to fire something to do with gamestate
    /**
     * When the mode has changed.
     * @event modeChange
     * @type {object}
     * @property {string} mode - Short string representing the new mode
     */
    if (bonkAPI.events.hasEvent["modeChange"]) {
        var sendObj = { mode: args[1]["gs"]["mo"] };
        bonkAPI.events.fireEvent("modeChange", sendObj);
    }

    /**
     * When game has started
     * @event gameStart
     * @type {object}
     * @property {string} mapData - Encoded map data, must decode it to use
     * @property {object} startData - Extra game specific data
     */
    if (bonkAPI.events.hasEvent["gameStart"]) {
        //! change name of mapdata since it is not map data, probably gamestate
        //! do the same in triggerstart
        var sendObj = {
            mapData: bonkAPI.decodeMap(args[1]["gs"]["map"]),
            startData: args[3],
        };
        bonkAPI.events.fireEvent("gameStart", sendObj);
    }
  
    return args;
};

bonkAPI.receive_RoomShareLink = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_Tabbed = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_RoomName = function (args) {
    //  TODO: Finish implement of function

    return args;
};

bonkAPI.receive_RoomPassword = function (args) {
    //  TODO: Finish implement of function

    return args;
};