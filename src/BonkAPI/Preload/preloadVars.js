#Variables{Preload}
window.bonkAPI = {};

/**
 * Contains data of a single player
 *
 * @typedef {object} Player
 * @property {string} peerID - Peer ID of player
 * @property {string} userName - Username of player
 * @property {number} level - Level of player
 * @property {boolean} guest - Is guest
 * @property {number} team - Integer of what team from 0 to 5
 * @property {boolean} ready - Is ready
 * @property {boolean} tabbed - Is tabbed
 * @property {JSON} avatar - Skin data
 */

/**
 * Contains data of a single friend
 *
 * @typedef {object} Friend
 * @property {string} userName - Username of friend
 * @property {string} roomID - Room ID of the lobby that the friend is in
 */

// *Global Variables
bonkAPI.currentPlayers = []; //List of user IDs of players in the lobby
bonkAPI.playerList = []; // History list of players in the room
bonkAPI.myID = -1; // Client's ID
bonkAPI.myToken = -1; // Client's token
bonkAPI.hostID = -1; // Host's ID

bonkAPI.isLoggingIn = false;

// MGF vars
bonkAPI.bonkWSS = 0;
bonkAPI.originalSend = window.WebSocket.prototype.send;
bonkAPI.originalRequestAnimationFrame = window.requestAnimationFrame;
bonkAPI.originalDrawShape = 0;
bonkAPI.pixiCtx = 0;
bonkAPI.pixiStage = 0;
bonkAPI.parentDraw = 0;
bonkAPI.originalXMLOpen = window.XMLHttpRequest.prototype.open;
bonkAPI.originalXMLSend = window.XMLHttpRequest.prototype.send;
