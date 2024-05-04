#Main{Preload}

window.WebSocket.prototype.send = function (args) {
    if (this.url.includes("socket.io/?EIO=3&transport=websocket&sid=")) {
        if (!this.injectedAPI) {
            // initialize overriding receive listener (only run once)
            bonkAPI.bonkWSS = this;
            this.injectedAPI = true;
            var originalReceive = this.onmessage;
            // This function intercepts incoming packets
            this.onmessage = function (args) {
                // &Receiving incoming packets
                if(args.data.substring(0, 3) == "42[") {
                    newArgs = JSON.parse(args.data.substring(2));
                    // !All function names follow verb_noun[verb] format
                    switch (parseInt(newArgs[0])) {
                        case 1: //*Update other players' pings
                            newArgs = bonkAPI.receive_PingUpdate(newArgs);
                            break;
                        case 2: // *UNKNOWN, received after sending create room packet
                            newArgs = bonkAPI.receive_Unknow2(newArgs);
                            break;
                        case 3: // *Room Join
                            newArgs = bonkAPI.receive_RoomJoin(newArgs);
                            break;
                        case 4: // *Player Join
                            newArgs = bonkAPI.receive_PlayerJoin(newArgs);
                            break;
                        case 5: // *Player Leave
                            newArgs = bonkAPI.receive_PlayerLeave(newArgs);
                            break;
                        case 6: // *Host Leave
                            newArgs = bonkAPI.receive_HostLeave(newArgs);
                            break;
                        case 7: // *Receive Inputs
                            newArgs = bonkAPI.receive_Inputs(newArgs);
                            break;
                        case 8: // *Ready Change
                            newArgs = bonkAPI.receive_ReadyChange(newArgs);
                            break;
                        case 13: // *Game End
                            newArgs = bonkAPI.receive_GameEnd(newArgs);
                            break;
                        case 15: // *Game Start
                            newArgs = bonkAPI.receive_GameStart(newArgs);
                            break;
                        case 16: // *Error
                            newArgs = bonkAPI.receive_Error(newArgs);
                            break;
                        case 18: // *Team Change
                            newArgs = bonkAPI.receive_TeamChange(newArgs);
                            break;
                        case 19: // *Teamlock Toggle
                            newArgs = bonkAPI.receive_TeamLockToggle(newArgs);
                            break;
                        case 20: // *Chat Message
                            newArgs = bonkAPI.receive_ChatMessage(newArgs);
                            break;
                        case 21: // *Initial Data
                            newArgs = bonkAPI.receive_InitialData(newArgs);
                            break;
                        case 24: // *Kicked
                            newArgs = bonkAPI.receive_PlayerKick(newArgs);
                            break;
                        case 26: // *Change Mode
                            newArgs = bonkAPI.receive_ModeChange(newArgs);
                            break;
                        case 27: // *Change Rounds
                            newArgs = bonkAPI.receive_RoundsChange(newArgs);
                            break;
                        case 29: // *Map Switch
                            newArgs = bonkAPI.receive_MapSwitch(newArgs);
                            break;
                        case 32: // *inactive?
                            newArgs = bonkAPI.receive_Inactive(newArgs);
                            break;
                        case 33: // *Map Suggest
                            newArgs = bonkAPI.receive_MapSuggest(newArgs);
                            break;
                        case 34: // *Map Suggest Client
                            newArgs = bonkAPI.receive_MapSuggestClient(newArgs);
                            break;
                        case 36: // *Player Balance Change
                            newArgs = bonkAPI.receive_PlayerBalance(newArgs);
                            break;
                        case 40: // *Save Replay
                            newArgs = bonkAPI.receive_ReplaySave(newArgs);
                            break;
                        case 41: // *New Host
                            newArgs = bonkAPI.receive_NewHost(newArgs);
                            break;
                        case 42: // *Friend Req
                            newArgs = bonkAPI.receive_FriendRequest(newArgs);
                            break;
                        case 43: // *Game Starting Countdown
                            newArgs = bonkAPI.receive_CountdownStart(newArgs);
                            break;
                        case 44: // *Abort Countdown
                            newArgs = bonkAPI.receive_CountdownAbort(newArgs);
                            break;
                        case 45: // *Player Leveled Up
                            newArgs = bonkAPI.receive_PlayerLevelUp(newArgs);
                            break;
                        case 46: // *Local Gained XP
                            newArgs = bonkAPI.receive_LocalXPGain(newArgs);
                            break;
                        case 48:
                            newArgs = bonkAPI.receive_gameState(newArgs);
                            break;
                        case 49: // *Created Room Share Link
                            newArgs = bonkAPI.receive_RoomShareLink(newArgs);
                            break;
                        case 52: // *Tabbed
                            newArgs = bonkAPI.receive_Tabbed(newArgs);
                            break;
                        case 58: // *Room Name Update
                            newArgs = bonkAPI.receive_RoomName(newArgs);
                            break;
                        case 59: // *Room Password Update
                            newArgs = bonkAPI.receive_RoomPassword(newArgs);
                            break;
                    }
                    args.data = 42 + JSON.stringify(newArgs);
                }
                return originalReceive.call(this, args);
            };

            var originalClose = this.onclose;
            this.onclose = function () {
                bonkAPI.bonkWSS = 0;
                return originalClose.call(this);
            };
        } else {
            // !All function names follow verb_noun[verb] format
            if(args.substring(0, 3) == "42[") {
                args = JSON.parse(args.substring(2));
                // &Sending outgoing packets
                switch (parseInt(args[0])) {
                    case 4: // *Send Inputs
                        args = bonkAPI.send_Inputs(args);
                        break;
                    case 5: // *Trigger Start
                        args = bonkAPI.send_GameStart(args);
                        break;
                    case 6: // *Change Own Team
                        args = bonkAPI.send_TeamChange(args);
                        break;
                    case 7: // *Team Lock
                        args = bonkAPI.send_TeamLock(args);
                        break;
                    case 9: // *Kick/Ban Player
                        args = bonkAPI.send_PlayerKickBan(args);
                        break;
                    case 10: // *Chat Message
                        args = bonkAPI.send_ChatMessage(args);
                        break;
                    case 11: // *Inform In Lobby
                        args = bonkAPI.send_LobbyInform(args);
                        break;
                    case 12: // *Create Room
                        args = bonkAPI.send_RoomCreate(args);
                        break;
                    case 13: // *Room Join Information
                        args = bonkAPI.send_RoomJoin(args);
                        break;
                    case 14: // *Return To Lobby
                        args = bonkAPI.send_LobbyReturn(args);
                        break;
                    case 16: // *Set Ready
                        args = bonkAPI.send_Ready(args);
                        break;
                    case 17: // *All Ready Reset
                        args = bonkAPI.send_AllReadyReset(args);
                        break;
                    case 19: // *Send Map Reorder
                        args = bonkAPI.send_MapReorder(args);
                        break;
                    case 20: // *Send Mode
                        args = bonkAPI.send_ModeChange(args);
                        break;
                    case 21: // *Send WL (Rounds)
                        args = bonkAPI.send_RoundsChange(args);
                        break;
                    case 22: // *Send Map Delete
                        args = bonkAPI.send_MapDelete(args);
                        break;
                    case 23: // *Send Map Switch
                        args = bonkAPI.send_MapSwitch(args);
                        break;
                    case 26: // *Change Other Team
                        args = bonkAPI.send_OtherTeamChange(args);
                        break;
                    case 27: // *Send Map Suggest
                        args = bonkAPI.send_MapSuggest(args);
                        break;
                    case 29: // *Send Balance
                        args = bonkAPI.send_Balance(args);
                        break;
                    case 32: // *Send Team Settings Change
                        args = bonkAPI.send_TeamSetting(args);
                        break;
                    case 33: // *Send Arm Record
                        args = bonkAPI.send_ArmRecord(args);
                        break;
                    case 34: // *Send Host Change
                        args = bonkAPI.send_HostChange(args);
                        break;
                    case 35: // *Send Friended
                        args = bonkAPI.send_Friended(args);
                        break;
                    case 36: // *Send Start Countdown
                        args = bonkAPI.send_CountdownStart(args);
                        break;
                    case 37: // *Send Abort Countdown
                        args = bonkAPI.send_CountdownAbort(args);
                        break;
                    case 38: // *Send Req XP
                        args = bonkAPI.send_XPRequest(args);
                        break;
                    case 39: // *Send Map Vote
                        args = bonkAPI.send_MapVote(args);
                        break;
                    case 40: // *Inform In Game
                        args = bonkAPI.send_InGameInform(args);
                        break;
                    case 41: // *Get Pre Vote
                        args = bonkAPI.send_PreVoteGet(args);
                        break;
                    case 44: // *Tabbed
                        args = bonkAPI.send_Tabbed(args);
                        break;
                    case 50: // *Send No Host Swap
                        args = bonkAPI.send_NoHostSwap(args);
                        break;
                }
                args = 42 + JSON.stringify(args);
            }
        }
    }

    return bonkAPI.originalSend.call(this, args);
};