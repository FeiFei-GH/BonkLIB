//@Main{Preload}

/**
 * Sends message in game's public chat.
 * @function chat
 * @param {string} message - The message.
 */
bonkAPI.chat = function (message) {
    bonkAPI.sendPacket('42[10,{"message":' + JSON.stringify(message) + "}]");
};

/**
 * Defaults to banning the player with the given ID.
 * @function banPlayerByID
 * @param {number} id - ID of the player to be kicked/banned
 * @param {boolean} kick - Whether player should be kicked or banned, defaults to false (banned)
 */
bonkAPI.banPlayerByID = function (id, kick = false) {
    bonkAPI.sendPacket('42[9,{"banshortid":' + id + ',"kickonly":' + kick + "}]");
};

/**
 * Gets all online friends.
 * @function getOnlineFriendList
 * @param {function} callback - Callback function
 * @returns {Array.<Friend>} Array of {@linkcode Friend} objects
 */
bonkAPI.getOnlineFriendList = function (callback) {
    let req = new window.XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            let friends = [];
            let data = JSON.parse(req.response)["friends"];
            for (let i = 0; i < data.length; i++) {
                let rid = data[i]["roomid"];
                if (rid != null) {
                    friends.push({ userName: data[i]["name"], roomID: rid });
                }
            }
            callback(friends);
        }
    };
    try {
        req.open("POST", "https://bonk2.io/scripts/friends.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        //! maybe make a function to automatically build this stuff, but not necessary and probably worse
        req.send("token=" + bonkAPI.myToken + "&task=getfriends");
    } catch (e) {
        console.log(e);
        callback([]);
    }
};

/**
 * Adds a listener to {@linkcode EventHandler} to call the method.
 * @function addEventListener
 * @param {string} event - The event that is listened for
 * @param {function(object)} method - Method that is called when event is fired
 * @param {*} [scope] - Defaults to window
 * @param {*} [context] - Defaults to nothing
 */
bonkAPI.addEventListener = function (event, method, scope, context) {
    bonkAPI.events.addEventListener(event, method, scope, context);
};

/**
 * Returns the entire list of {@linkcode Player} objects that have joined
 * since you have.
 * @function getPlayerList
 * @returns {Array.<Player>} Array of {@linkcode Player} objects
 */
bonkAPI.getPlayerList = function () {
    // *Returns a copy of bonkAPI.playerList
    return bonkAPI.playerList;
};

/**
 * Returns list of {@linkcode Player} objects in the lobby at time this
 * function was called.
 * @function getPlayerLobbyList
 * @returns {Array.<Player>} Array of {@linkcode Player} objects
 */
bonkAPI.getPlayerLobbyList = function () {
    //! i want to make more playerlobby functions but dk what to name
    //! or whether to join it with the other functions but add an arguement
    //! to specify which to use
    let list = [];
    bonkAPI.currentPlayers.forEach((index) => {
        list.push(bonkAPI.playerList[index]);
    });
    return list;
}

/**
 * Returns list of user IDs in the lobby at time this
 * function was called.
 * @function getPlayersInLobbyID
 * @returns {Array.<Player>} Array of {@linkcode Player} objects
 */
bonkAPI.getPlayersInLobbyID = function () {
    return bonkAPI.currentPlayers;
}

/**
 * Returns the amount of players that have been in the lobby.
 * @function getPlayerListLength
 * @returns {number} Length of the player list
 */
bonkAPI.getPlayerListLength = function () {
    return bonkAPI.playerList.length;
};

/**
 * Returns the {@linkcode Player} object of the ID or name given.
 * @function getPlayer
 * @param {*} ref - Either ID of the player or name of the player
 * @returns {Player} Player object
 */
bonkAPI.getPlayer = function (ref) {
    if (typeof ref === "number") {
        if (ref < 0 || ref >= bonkAPI.playerList.length) {
            return null;
        }
        return bonkAPI.playerList[ref];
    } else if (typeof ref === "string") {
        for (let i = 0; i < bonkAPI.playerList.length; i++) {
            if (bonkAPI.playerList[i] != null && ref == bonkAPI.playerList[i].userName) {
                return bonkAPI.playerList[i];
            }
        }
        return null;
    } else {
        return null;
    }
};

/**
 * Returns the {@linkcode Player} object of the ID given.
 * @function getPlayerByID
 * @param {number} id - ID of the player that is being looked for
 * @returns {Player} Player object
 */
bonkAPI.getPlayerByID = function (id) {
    if (id < 0 || id >= bonkAPI.playerList.length) {
        return null;
    }
    return bonkAPI.playerList[id];
};

/**
 * Returns the {@linkcode Player} object of the name given.
 * @function getPlayerByName
 * @param {string} name - Name of the player that is being looked for
 * @returns {Player} Player object
 */
bonkAPI.getPlayerByName = function (name) {
    for (let i = 0; i < bonkAPI.playerList.length; i++) {
        if (bonkAPI.playerList[i] != null && name == bonkAPI.playerList[i].userName) {
            return bonkAPI.playerList[i];
        }
    }
    return null;
};

/**
 * Returns the name of the player of the ID given.
 * @function getPlayerNameByID
 * @param id - ID of the player to get the name of
 * @returns {string} Name of player
 */
bonkAPI.getPlayerNameByID = function (id) {
    if (id < 0 || id >= bonkAPI.playerList.length) {
        return "";
    }
    return bonkAPI.playerList[id].userName;
};

/**
 * Returns the user ID of the player with the given name.
 * @function getPlayerIDByName
 * @param {string} name - Name of player to get ID of
 * @returns {number} ID of player
 */
bonkAPI.getPlayerIDByName = function (name) {
    for (let i = 0; i < bonkAPI.playerList.length; i++) {
        if (bonkAPI.playerList[i] != null && name == bonkAPI.playerList[i].userName) {
            return i;
        }
    }
    return -1;
};

/**
 * Returns a list of {@linkcode Player} objects that are in the specified
 * team.
 * @function getPlayersByTeam
 * @param {number} team - Team of the player, from 0 to 5
 * @returns {Array.<Player>} List of {@linkcode Player} objects
 */
bonkAPI.getPlayersByTeam = function (team) {
    var teamList = [];
    for (let i = 0; i < bonkAPI.playerList.length; i++) {
        if (team == bonkAPI.playerList[i].team) {
            teamList.push({ userID: i, userData: bonkAPI.playerList[i] });
        }
    }
    return teamList;
};

/**
 * Returns your own player ID.
 * @function getMyID
 * @returns {number} ID of the user
 */
bonkAPI.getMyID = function () {
    return bonkAPI.myID;
};

/**
 * Returns the player ID of the host.
 * @function getHostID
 * @returns {number} ID of the host
 */
bonkAPI.getHostID = function () {
    return bonkAPI.hostID;
};

/**
 * Returns whether the capzone can be capped
 * without ending game or desyncing
 * @function safeToCap
 * @returns {boolean} Whether it is safe to cap
 */
bonkAPI.safeToCap = function () {
    if(bonkAPI.currentPlayers.length == 1) {
        return true;
    }
    let t = bonkAPI.playerList[bonkAPI.currentPlayers[0]].team;
    for(let i = 1; i < bonkAPI.currentPlayers.length; i++) {
        if(t != bonkAPI.playerList[bonkAPI.currentPlayers[i]].team && 0 != bonkAPI.playerList[bonkAPI.currentPlayers[i]].team) {
            return false;
        }
    }
    return true;
}

/**
 * Returns whether the game is running after
 * you have first joined a lobby.
 * @function isInGame
 * @returns {boolean} Whether in game or not
 */
bonkAPI.isInGame = function () {
    let renderer = document.getElementById("gamerenderer");
    return renderer.style.visibility == "inherit";
}