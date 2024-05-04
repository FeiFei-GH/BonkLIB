#Main{Preload}

// TODO: these could be dangerous, maybe add some sanitization
// *Send a packet to server
/**
 * Sends the given packet to bonk servers.
 * @function bonkAPI.sendPacket
 * @param {string} packet - Packet to send to bonk
 */
bonkAPI.sendPacket = function (packet) {
    if (bonkAPI.bonkWSS != 0) {
        bonkAPI.bonkWSS.send(packet);
    }
};

// *Make client receive a packet
/**
 * Makes your client receive the given packet.
 * @function bonkAPI.receivePacket
 * @param {string} packet - Packet that is received
 */
bonkAPI.receivePacket = function (packet) {
    if (bonkAPI.bonkWSS != 0) {
        bonkAPI.bonkWSS.onmessage({ data: packet });
    }
};