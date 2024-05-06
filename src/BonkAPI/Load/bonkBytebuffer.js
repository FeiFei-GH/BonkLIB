//@Main{Load}

class bonkAPI_bytebuffer {
    constructor() {
        var g1d = [arguments];
        this.index = 0;
        this.buffer = new ArrayBuffer(100*1024);
        this.view = new DataView(this.buffer);
        this.implicitClassAliasArray = [];
        this.implicitStringArray = [];
        this.bodgeCaptureZoneDataIdentifierArray = [];
    }

    readByte() {
        var N0H = [arguments];
        N0H[4] = this.view.getUint8(this.index);
        this.index += 1;
        return N0H[4];
    }
    writeByte(z0w) {
        var v8$ = [arguments];
        this.view.setUint8(this.index, v8$[0][0]);
        this.index += 1;
    }
    readInt() {
        var A71 = [arguments];
        A71[6] = this.view.getInt32(this.index);
        this.index += 4;
        return A71[6];
    }
    writeInt(W6i) {
        var p5u = [arguments];
        this.view.setInt32(this.index, p5u[0][0]);
        this.index += 4;
    }
    readShort() {
        var R1R = [arguments];
        R1R[9] = this.view.getInt16(this.index);
        this.index += 2;
        return R1R[9];
    }
    writeShort(H8B) {
        var d_3 = [arguments];
        this.view.setInt16(this.index, d_3[0][0]);
        this.index += 2;
    }
    readUint() {
        var W2$ = [arguments];
        W2$[8] = this.view.getUint32(this.index);
        this.index += 4;
        return W2$[8];
    }
    writeUint(B2X) {
        var f8B = [arguments];
        this.view.setUint32(this.index, f8B[0][0]);
        this.index += 4;
    }
    readBoolean() {
        var h6P = [arguments];
        h6P[6] = this.readByte();
        return h6P[6] == 1;
    }
    writeBoolean(Y3I) {
        var l79 = [arguments];
        if (l79[0][0]) {
        this.writeByte(1);
        } else {
        this.writeByte(0);
        }
    }
    readDouble() {
        var V60 = [arguments];
        V60[4] = this.view.getFloat64(this.index);
        this.index += 8;
        return V60[4];
    }
    writeDouble(z4Z) {
        var O41 = [arguments];
        this.view.setFloat64(this.index, O41[0][0]);
        this.index += 8;
    }
    readFloat() {
        var I0l = [arguments];
        I0l[5] = this.view.getFloat32(this.index);
        this.index += 4;
        return I0l[5];
    }
    writeFloat(y4B) {
        var B0v = [arguments];
        this.view.setFloat32(this.index, B0v[0][0]);
        this.index += 4;
    }
    readUTF() {
        var d6I = [arguments];
        d6I[8] = this.readByte();
        d6I[7] = this.readByte();
        d6I[9] = d6I[8] * 256 + d6I[7];
        d6I[1] = new Uint8Array(d6I[9]);
        for (d6I[6] = 0; d6I[6] < d6I[9]; d6I[6]++) {
        d6I[1][d6I[6]] = this.readByte();
        }
        return bonkAPI.textdecoder.decode(d6I[1]);
    }
    writeUTF(L3Z) {
        var Z75 = [arguments];
        Z75[4] = bonkAPI.textencoder.encode(Z75[0][0]);
        Z75[3] = Z75[4].length;
        Z75[5] = Math.floor(Z75[3]/256);
        Z75[8] = Z75[3] % 256;
        this.writeByte(Z75[5]);
        this.writeByte(Z75[8]);
        Z75[7] = this;
        Z75[4].forEach(I_O);
        function I_O(s0Q, H4K, j$o) {
        var N0o = [arguments];
        Z75[7].writeByte(N0o[0][0]);
        }
    }
    toBase64() {
        var P4$ = [arguments];
        P4$[4] = "";
        P4$[9] = new Uint8Array(this.buffer);
        P4$[8] = this.index;
        for (P4$[7] = 0; P4$[7] < P4$[8]; P4$[7]++) {
        P4$[4] += String.fromCharCode(P4$[9][P4$[7]]);
        }
        return window.btoa(P4$[4]);
    }
    fromBase64(W69, A8Q) {
        var o0n = [arguments];
        o0n[8] = window.pako;
        o0n[6] = window.atob(o0n[0][0]);
        o0n[9] = o0n[6].length;
        o0n[4] = new Uint8Array(o0n[9]);
        for (o0n[1] = 0; o0n[1] < o0n[9]; o0n[1]++) {
        o0n[4][o0n[1]] = o0n[6].charCodeAt(o0n[1]);
        }
        if (o0n[0][1] === true) {
        o0n[5] = o0n[8].inflate(o0n[4]);
        o0n[4] = o0n[5];
        }
        this.buffer = o0n[4].buffer.slice(
        o0n[4].byteOffset,
        o0n[4].byteLength + o0n[4].byteOffset
        );
        this.view = new DataView(this.buffer);
        this.index = 0;
    }
}