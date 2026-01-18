//@Main{Load}

bonkAPI.ISdecode = function (rawdata) {
    rawdata_caseflipped = "";
    for (i = 0; i < rawdata.length; i++) {
        if (i <= 100 && rawdata.charAt(i) === rawdata.charAt(i).toLowerCase()) {
            rawdata_caseflipped += rawdata.charAt(i).toUpperCase();
        } else if (i <= 100 && rawdata.charAt(i) === rawdata.charAt(i).toUpperCase()) {
            rawdata_caseflipped += rawdata.charAt(i).toLowerCase();
        } else {
            rawdata_caseflipped += rawdata.charAt(i);
        }
    }

    data_deLZd = bonkAPI.LZString.decompressFromEncodedURIComponent(rawdata_caseflipped);
    databuffer = bonkAPI.bytebuffer.fromBase64(data_deLZd);
    data = bonkAPI.ISpsonpair.decode(databuffer.buffer);
    return data;
};

bonkAPI.ISencode = function (obj) {
    data = bonkAPI.ISpsonpair.encode(obj);
    b64 = data.toBase64();
    lzd = bonkAPI.LZString.compressToEncodedURIComponent(b64);

    caseflipped = "";
    for (i = 0; i < lzd.length; i++) {
        if (i <= 100 && lzd.charAt(i) === lzd.charAt(i).toLowerCase()) {
            caseflipped += lzd.charAt(i).toUpperCase();
        } else if (i <= 100 && lzd.charAt(i) === lzd.charAt(i).toUpperCase()) {
            caseflipped += lzd.charAt(i).toLowerCase();
        } else {
            caseflipped += lzd.charAt(i);
        }
    }

    return caseflipped;
};

bonkAPI.decodeIS = function (x) {
    return bonkAPI.ISdecode(x);
};
bonkAPI.encodeIS = function (x) {
    return bonkAPI.ISencode(x);
};

bonkAPI.encodeMap = function (W2A) {
    var M3n = [arguments];
    M3n[1] = new bonkAPI_bytebuffer();
    M3n[9] = M3n[0][0].physics;
    M3n[0][0].v = 15;
    M3n[1].writeShort(M3n[0][0].v);
    M3n[1].writeBoolean(M3n[0][0].s.re);
    M3n[1].writeBoolean(M3n[0][0].s.nc);
    M3n[1].writeShort(M3n[0][0].s.pq);
    M3n[1].writeFloat(M3n[0][0].s.gd);
    M3n[1].writeBoolean(M3n[0][0].s.fl);
    M3n[1].writeUTF(M3n[0][0].m.rxn);
    M3n[1].writeUTF(M3n[0][0].m.rxa);
    M3n[1].writeUint(M3n[0][0].m.rxid);
    M3n[1].writeShort(M3n[0][0].m.rxdb);
    M3n[1].writeUTF(M3n[0][0].m.n);
    M3n[1].writeUTF(M3n[0][0].m.a);
    M3n[1].writeUint(M3n[0][0].m.vu);
    M3n[1].writeUint(M3n[0][0].m.vd);
    M3n[1].writeShort(M3n[0][0].m.cr.length);
    for (M3n[84] = 0; M3n[84] < M3n[0][0].m.cr.length; M3n[84]++) {
        M3n[1].writeUTF(M3n[0][0].m.cr[M3n[84]]);
    }
    M3n[1].writeUTF(M3n[0][0].m.mo);
    M3n[1].writeInt(M3n[0][0].m.dbid);
    M3n[1].writeBoolean(M3n[0][0].m.pub);
    M3n[1].writeInt(M3n[0][0].m.dbv);
    M3n[1].writeShort(M3n[9].ppm);
    M3n[1].writeShort(M3n[9].bro.length);
    for (M3n[17] = 0; M3n[17] < M3n[9].bro.length; M3n[17]++) {
        M3n[1].writeShort(M3n[9].bro[M3n[17]]);
    }
    M3n[1].writeShort(M3n[9].shapes.length);
    for (M3n[80] = 0; M3n[80] < M3n[9].shapes.length; M3n[80]++) {
        M3n[2] = M3n[9].shapes[M3n[80]];
        if (M3n[2].type == "bx") {
            M3n[1].writeShort(1);
            M3n[1].writeDouble(M3n[2].w);
            M3n[1].writeDouble(M3n[2].h);
            M3n[1].writeDouble(M3n[2].c[0]);
            M3n[1].writeDouble(M3n[2].c[1]);
            M3n[1].writeDouble(M3n[2].a);
            M3n[1].writeBoolean(M3n[2].sk);
        }
        if (M3n[2].type == "ci") {
            M3n[1].writeShort(2);
            M3n[1].writeDouble(M3n[2].r);
            M3n[1].writeDouble(M3n[2].c[0]);
            M3n[1].writeDouble(M3n[2].c[1]);
            M3n[1].writeBoolean(M3n[2].sk);
        }
        if (M3n[2].type == "po") {
            M3n[1].writeShort(3);
            M3n[1].writeDouble(M3n[2].s);
            M3n[1].writeDouble(M3n[2].a);
            M3n[1].writeDouble(M3n[2].c[0]);
            M3n[1].writeDouble(M3n[2].c[1]);
            M3n[1].writeShort(M3n[2].v.length);
            for (M3n[61] = 0; M3n[61] < M3n[2].v.length; M3n[61]++) {
                M3n[1].writeDouble(M3n[2].v[M3n[61]][0]);
                M3n[1].writeDouble(M3n[2].v[M3n[61]][1]);
            }
        }
    }
    M3n[1].writeShort(M3n[9].fixtures.length);
    for (M3n[20] = 0; M3n[20] < M3n[9].fixtures.length; M3n[20]++) {
        M3n[7] = M3n[9].fixtures[M3n[20]];
        M3n[1].writeShort(M3n[7].sh);
        M3n[1].writeUTF(M3n[7].n);
        if (M3n[7].fr === null) {
            M3n[1].writeDouble(Number.MAX_VALUE);
        } else {
            M3n[1].writeDouble(M3n[7].fr);
        }
        if (M3n[7].fp === null) {
            M3n[1].writeShort(0);
        }
        if (M3n[7].fp === false) {
            M3n[1].writeShort(1);
        }
        if (M3n[7].fp === true) {
            M3n[1].writeShort(2);
        }
        if (M3n[7].re === null) {
            M3n[1].writeDouble(Number.MAX_VALUE);
        } else {
            M3n[1].writeDouble(M3n[7].re);
        }
        if (M3n[7].de === null) {
            M3n[1].writeDouble(Number.MAX_VALUE);
        } else {
            M3n[1].writeDouble(M3n[7].de);
        }
        M3n[1].writeUint(M3n[7].f);
        M3n[1].writeBoolean(M3n[7].d);
        M3n[1].writeBoolean(M3n[7].np);
        M3n[1].writeBoolean(M3n[7].ng);
        M3n[1].writeBoolean(M3n[7].ig);
    }
    M3n[1].writeShort(M3n[9].bodies.length);
    for (M3n[37] = 0; M3n[37] < M3n[9].bodies.length; M3n[37]++) {
        M3n[4] = M3n[9].bodies[M3n[37]];
        M3n[1].writeUTF(M3n[4].type);
        M3n[1].writeUTF(M3n[4].n);
        M3n[1].writeDouble(M3n[4].p[0]);
        M3n[1].writeDouble(M3n[4].p[1]);
        M3n[1].writeDouble(M3n[4].a);
        M3n[1].writeDouble(M3n[4].fric);
        M3n[1].writeBoolean(M3n[4].fricp);
        M3n[1].writeDouble(M3n[4].re);
        M3n[1].writeDouble(M3n[4].de);
        M3n[1].writeDouble(M3n[4].lv[0]);
        M3n[1].writeDouble(M3n[4].lv[1]);
        M3n[1].writeDouble(M3n[4].av);
        M3n[1].writeDouble(M3n[4].ld);
        M3n[1].writeDouble(M3n[4].ad);
        M3n[1].writeBoolean(M3n[4].fr);
        M3n[1].writeBoolean(M3n[4].bu);
        M3n[1].writeDouble(M3n[4].cf.x);
        M3n[1].writeDouble(M3n[4].cf.y);
        M3n[1].writeDouble(M3n[4].cf.ct);
        M3n[1].writeBoolean(M3n[4].cf.w);
        M3n[1].writeShort(M3n[4].f_c);
        M3n[1].writeBoolean(M3n[4].f_1);
        M3n[1].writeBoolean(M3n[4].f_2);
        M3n[1].writeBoolean(M3n[4].f_3);
        M3n[1].writeBoolean(M3n[4].f_4);
        M3n[1].writeBoolean(M3n[4].f_p);
        M3n[1].writeBoolean(M3n[4].fz.on);
        if (M3n[4].fz.on) {
            M3n[1].writeDouble(M3n[4].fz.x);
            M3n[1].writeDouble(M3n[4].fz.y);
            M3n[1].writeBoolean(M3n[4].fz.d);
            M3n[1].writeBoolean(M3n[4].fz.p);
            M3n[1].writeBoolean(M3n[4].fz.a);
            M3n[1].writeShort(M3n[4].fz.t);
            +M3n[1].writeDouble(M3n[4].fz.cf);
        }
        M3n[1].writeShort(M3n[4].fx.length);
        for (M3n[28] = 0; M3n[28] < M3n[4].fx.length; M3n[28]++) {
            M3n[1].writeShort(M3n[4].fx[M3n[28]]);
        }
    }
    M3n[1].writeShort(M3n[0][0].spawns.length);
    for (M3n[30] = 0; M3n[30] < M3n[0][0].spawns.length; M3n[30]++) {
        M3n[6] = M3n[0][0].spawns[M3n[30]];
        M3n[1].writeDouble(M3n[6].x);
        M3n[1].writeDouble(M3n[6].y);
        M3n[1].writeDouble(M3n[6].xv);
        M3n[1].writeDouble(M3n[6].yv);
        M3n[1].writeShort(M3n[6].priority);
        M3n[1].writeBoolean(M3n[6].r);
        M3n[1].writeBoolean(M3n[6].f);
        M3n[1].writeBoolean(M3n[6].b);
        M3n[1].writeBoolean(M3n[6].gr);
        M3n[1].writeBoolean(M3n[6].ye);
        M3n[1].writeUTF(M3n[6].n);
    }
    M3n[1].writeShort(M3n[0][0].capZones.length);
    for (M3n[74] = 0; M3n[74] < M3n[0][0].capZones.length; M3n[74]++) {
        M3n[3] = M3n[0][0].capZones[M3n[74]];
        M3n[1].writeUTF(M3n[3].n);
        M3n[1].writeDouble(M3n[3].l);
        M3n[1].writeShort(M3n[3].i);
        M3n[1].writeShort(M3n[3].ty);
    }
    M3n[1].writeShort(M3n[9].joints.length);
    for (M3n[89] = 0; M3n[89] < M3n[9].joints.length; M3n[89]++) {
        M3n[5] = M3n[9].joints[M3n[89]];
        if (M3n[5].type == "rv") {
            M3n[1].writeShort(1);
            M3n[1].writeDouble(M3n[5].d.la);
            M3n[1].writeDouble(M3n[5].d.ua);
            M3n[1].writeDouble(M3n[5].d.mmt);
            M3n[1].writeDouble(M3n[5].d.ms);
            M3n[1].writeBoolean(M3n[5].d.el);
            M3n[1].writeBoolean(M3n[5].d.em);
            M3n[1].writeDouble(M3n[5].aa[0]);
            M3n[1].writeDouble(M3n[5].aa[1]);
        }
        if (M3n[5].type == "d") {
            M3n[1].writeShort(2);
            M3n[1].writeDouble(M3n[5].d.fh);
            M3n[1].writeDouble(M3n[5].d.dr);
            M3n[1].writeDouble(M3n[5].aa[0]);
            M3n[1].writeDouble(M3n[5].aa[1]);
            M3n[1].writeDouble(M3n[5].ab[0]);
            M3n[1].writeDouble(M3n[5].ab[1]);
        }
        if (M3n[5].type == "lpj") {
            M3n[1].writeShort(3);
            M3n[1].writeDouble(M3n[5].pax);
            M3n[1].writeDouble(M3n[5].pay);
            M3n[1].writeDouble(M3n[5].pa);
            M3n[1].writeDouble(M3n[5].pf);
            M3n[1].writeDouble(M3n[5].pl);
            M3n[1].writeDouble(M3n[5].pu);
            M3n[1].writeDouble(M3n[5].plen);
            M3n[1].writeDouble(M3n[5].pms);
        }
        if (M3n[5].type == "lsj") {
            M3n[1].writeShort(4);
            M3n[1].writeDouble(M3n[5].sax);
            M3n[1].writeDouble(M3n[5].say);
            M3n[1].writeDouble(M3n[5].sf);
            M3n[1].writeDouble(M3n[5].slen);
        }
        if (M3n[5].type == "g") {
            M3n[1].writeShort(5);
            M3n[1].writeUTF(M3n[5].n);
            M3n[1].writeShort(M3n[5].ja);
            M3n[1].writeShort(M3n[5].jb);
            M3n[1].writeDouble(M3n[5].r);
        }
        if (M3n[5].type != "g") {
            M3n[1].writeShort(M3n[5].ba);
            M3n[1].writeShort(M3n[5].bb);
            M3n[1].writeBoolean(M3n[5].d.cc);
            M3n[1].writeDouble(M3n[5].d.bf);
            M3n[1].writeBoolean(M3n[5].d.dl);
        }
    }
    M3n[32] = M3n[1].toBase64();
    M3n[77] = LZString.compressToEncodedURIComponent(M3n[32]);
    return M3n[77];
};

bonkAPI.encodeMap = function (map) {
    let bytebuffer = new bonkAPI_bytebuffer();
    map.v = 15;
    bytebuffer.writeShort(map.v);
    bytebuffer.writeBoolean(map.s.re);
    bytebuffer.writeBoolean(map.s.nc);
    bytebuffer.writeShort(map.s.pq);
    bytebuffer.writeFloat(map.s.gd);
    bytebuffer.writeBoolean(map.s.fl);
    bytebuffer.writeUTF(map.m.rxn);
    bytebuffer.writeUTF(map.m.rxa);
    bytebuffer.writeUint(map.m.rxid);
    bytebuffer.writeShort(map.m.rxdb);
    bytebuffer.writeUTF(map.m.n);
    bytebuffer.writeUTF(map.m.a);
    bytebuffer.writeUint(map.m.vu);
    bytebuffer.writeUint(map.m.vd);
    bytebuffer.writeShort(map.m.cr.length);
    for (contributorId = 0; contributorId < map.m.cr.length; contributorId++) {
        bytebuffer.writeUTF(map.m.cr[contributorId]);
    }
    bytebuffer.writeUTF(map.m.mo);
    bytebuffer.writeInt(map.m.dbid);
    bytebuffer.writeBoolean(map.m.pub);
    bytebuffer.writeInt(map.m.dbv);
    bytebuffer.writeShort(map.physics.ppm);
    bytebuffer.writeShort(map.physics.bro.length);
    for (broId = 0; broId < map.physics.bro.length; broId++) {
        bytebuffer.writeShort(map.physics.bro[broId]);
    }
    bytebuffer.writeShort(map.physics.shapes.length);
    for (let shapeId = 0; shapeId < map.physics.shapes.length; shapeId++) {
        let shape = map.physics.shapes[shapeId];
        if (shape.type == "bx") {
            bytebuffer.writeShort(1);
            bytebuffer.writeDouble(shape.w);
            bytebuffer.writeDouble(shape.h);
            bytebuffer.writeDouble(shape.c[0]);
            bytebuffer.writeDouble(shape.c[1]);
            bytebuffer.writeDouble(shape.a);
            bytebuffer.writeBoolean(shape.sk);
        }
        if (shape.type == "ci") {
            bytebuffer.writeShort(2);
            bytebuffer.writeDouble(shape.r);
            bytebuffer.writeDouble(shape.c[0]);
            bytebuffer.writeDouble(shape.c[1]);
            bytebuffer.writeBoolean(shape.sk);
        }
        if (shape.type == "po") {
            bytebuffer.writeShort(3);
            bytebuffer.writeDouble(shape.s);
            bytebuffer.writeDouble(shape.a);
            bytebuffer.writeDouble(shape.c[0]);
            bytebuffer.writeDouble(shape.c[1]);
            bytebuffer.writeShort(shape.v.length);
            for (let verticeId = 0; verticeId < shape.v.length; verticeId++) {
                bytebuffer.writeDouble(shape.v[verticeId][0]);
                bytebuffer.writeDouble(shape.v[verticeId][1]);
            }
        }
    }
    bytebuffer.writeShort(map.physics.fixtures.length);
    for (let fixtureId = 0; fixtureId < map.physics.fixtures.length; fixtureId++) {
        let fixture = map.physics.fixtures[fixtureId];
        bytebuffer.writeShort(fixture.sh);
        bytebuffer.writeUTF(fixture.n);
        if (fixture.fr === null) {
            bytebuffer.writeDouble(Number.MAX_VALUE);
        } else {
            bytebuffer.writeDouble(fixture.fr);
        }
        if (fixture.fp === null) {
            bytebuffer.writeShort(0);
        }
        if (fixture.fp === false) {
            bytebuffer.writeShort(1);
        }
        if (fixture.fp === true) {
            bytebuffer.writeShort(2);
        }
        if (fixture.re === null) {
            bytebuffer.writeDouble(Number.MAX_VALUE);
        } else {
            bytebuffer.writeDouble(fixture.re);
        }
        if (fixture.de === null) {
            bytebuffer.writeDouble(Number.MAX_VALUE);
        } else {
            bytebuffer.writeDouble(fixture.de);
        }
        bytebuffer.writeUint(fixture.f);
        bytebuffer.writeBoolean(fixture.d);
        bytebuffer.writeBoolean(fixture.np);
        bytebuffer.writeBoolean(fixture.ng);
        bytebuffer.writeBoolean(fixture.ig);
    }
    bytebuffer.writeShort(map.physics.bodies.length);
    for (let bodyId = 0; bodyId < map.physics.bodies.length; bodyId++) {
        let body = map.physics.bodies[bodyId];
        bytebuffer.writeUTF(body.s.type);
        bytebuffer.writeUTF(body.s.n);
        bytebuffer.writeDouble(body.p[0]);
        bytebuffer.writeDouble(body.p[1]);
        bytebuffer.writeDouble(body.a);
        bytebuffer.writeDouble(body.s.fric);
        bytebuffer.writeBoolean(body.s.fricp);
        bytebuffer.writeDouble(body.s.re);
        bytebuffer.writeDouble(body.s.de);
        bytebuffer.writeDouble(body.lv[0]);
        bytebuffer.writeDouble(body.lv[1]);
        bytebuffer.writeDouble(body.av);
        bytebuffer.writeDouble(body.s.ld);
        bytebuffer.writeDouble(body.s.ad);
        bytebuffer.writeBoolean(body.s.fr);
        bytebuffer.writeBoolean(body.s.bu);
        bytebuffer.writeDouble(body.cf.x);
        bytebuffer.writeDouble(body.cf.y);
        bytebuffer.writeDouble(body.cf.ct);
        bytebuffer.writeBoolean(body.cf.w);
        bytebuffer.writeShort(body.s.f_c);
        bytebuffer.writeBoolean(body.s.f_1);
        bytebuffer.writeBoolean(body.s.f_2);
        bytebuffer.writeBoolean(body.s.f_3);
        bytebuffer.writeBoolean(body.s.f_4);
        bytebuffer.writeBoolean(body.s.f_p);
        bytebuffer.writeBoolean(body.fz.on);
        if (body.fz.on) {
            bytebuffer.writeDouble(body.fz.x);
            bytebuffer.writeDouble(body.fz.y);
            bytebuffer.writeBoolean(body.fz.d);
            bytebuffer.writeBoolean(body.fz.p);
            bytebuffer.writeBoolean(body.fz.a);
            bytebuffer.writeShort(body.fz.t);
            bytebuffer.writeDouble(body.fz.cf);
        }
        bytebuffer.writeShort(body.fx.length);
        for (fixtureId = 0; fixtureId < body.fx.length; fixtureId++) {
            bytebuffer.writeShort(body.fx[fixtureId]);
        }
    }
    bytebuffer.writeShort(map.spawns.length);
    for (let spawnId = 0; spawnId < map.spawns.length; spawnId++) {
        let spawn = map.spawns[spawnId];
        bytebuffer.writeDouble(spawn.x);
        bytebuffer.writeDouble(spawn.y);
        bytebuffer.writeDouble(spawn.xv);
        bytebuffer.writeDouble(spawn.yv);
        bytebuffer.writeShort(spawn.priority);
        bytebuffer.writeBoolean(spawn.r);
        bytebuffer.writeBoolean(spawn.f);
        bytebuffer.writeBoolean(spawn.b);
        bytebuffer.writeBoolean(spawn.gr);
        bytebuffer.writeBoolean(spawn.ye);
        bytebuffer.writeUTF(spawn.n);
    }
    bytebuffer.writeShort(map.capZones.length);
    for (let capZoneId = 0; capZoneId < map.capZones.length; capZoneId++) {
        let capZone = map.capZones[capZoneId];
        bytebuffer.writeUTF(capZone.n);
        bytebuffer.writeDouble(capZone.l);
        bytebuffer.writeShort(capZone.i);
        bytebuffer.writeShort(capZone.ty);
    }
    bytebuffer.writeShort(map.physics.joints.length);
    for (let jointId = 0; jointId < map.physics.joints.length; jointId++) {
        let joint = map.physics.joints[jointId];
        if (joint.type == "rv") {
            bytebuffer.writeShort(1);
            bytebuffer.writeDouble(joint.d.la);
            bytebuffer.writeDouble(joint.d.ua);
            bytebuffer.writeDouble(joint.d.mmt);
            bytebuffer.writeDouble(joint.d.ms);
            bytebuffer.writeBoolean(joint.d.el);
            bytebuffer.writeBoolean(joint.d.em);
            bytebuffer.writeDouble(joint.aa[0]);
            bytebuffer.writeDouble(joint.aa[1]);
        }
        if (joint.type == "d") {
            bytebuffer.writeShort(2);
            bytebuffer.writeDouble(joint.d.fh);
            bytebuffer.writeDouble(joint.d.dr);
            bytebuffer.writeDouble(joint.aa[0]);
            bytebuffer.writeDouble(joint.aa[1]);
            bytebuffer.writeDouble(joint.ab[0]);
            bytebuffer.writeDouble(joint.ab[1]);
        }
        if (joint.type == "lpj") {
            bytebuffer.writeShort(3);
            bytebuffer.writeDouble(joint.pax);
            bytebuffer.writeDouble(joint.pay);
            bytebuffer.writeDouble(joint.pa);
            bytebuffer.writeDouble(joint.pf);
            bytebuffer.writeDouble(joint.pl);
            bytebuffer.writeDouble(joint.pu);
            bytebuffer.writeDouble(joint.plen);
            bytebuffer.writeDouble(joint.pms);
        }
        if (joint.type == "lsj") {
            bytebuffer.writeShort(4);
            bytebuffer.writeDouble(joint.sax);
            bytebuffer.writeDouble(joint.say);
            bytebuffer.writeDouble(joint.sf);
            bytebuffer.writeDouble(joint.slen);
        }
        if (joint.type == "g") {
            bytebuffer.writeShort(5);
            bytebuffer.writeUTF(joint.n);
            bytebuffer.writeShort(joint.ja);
            bytebuffer.writeShort(joint.jb);
            bytebuffer.writeDouble(joint.r);
        }
        if (joint.type != "g") {
            bytebuffer.writeShort(joint.ba);
            bytebuffer.writeShort(joint.bb);
            bytebuffer.writeBoolean(joint.d.cc);
            bytebuffer.writeDouble(joint.d.bf);
            bytebuffer.writeBoolean(joint.d.dl);
        }
    }
    let base64 = bytebuffer.toBase64();
    let compressed = LZString.compressToEncodedURIComponent(base64);
    return compressed;
};

bonkAPI.blankMap = {
    v: 1,
    s: { re: false, nc: false, pq: 1, gd: 25, fl: false },
    physics: { shapes: [], fixtures: [], bodies: [], bro: [], joints: [], ppm: 12 },
    spawns: [],
    capZones: [],
    m: {
        a: "noauthor",
        n: "noname",
        dbv: 2,
        dbid: -1,
        authid: -1,
        date: "",
        rxid: 0,
        rxn: "",
        rxa: "",
        rxdb: 1,
        cr: [],
        pub: false,
        mo: "",
    },
};

bonkAPI.decodeMap = function (map) {
    b64mapdata = LZString.decompressFromEncodedURIComponent(map);
    binaryReader = new bonkAPI_bytebuffer();
    binaryReader.fromBase64(b64mapdata, false);
    map = bonkAPI.blankMap;
    map.v = binaryReader.readShort();
    if (map.v > 15) {
        throw new Error("Future map version, please refresh page");
    }
    map.s.re = binaryReader.readBoolean();
    map.s.nc = binaryReader.readBoolean();
    if (map.v >= 3) {
        map.s.pq = binaryReader.readShort();
    }
    if (map.v >= 4 && map.v <= 12) {
        map.s.gd = binaryReader.readShort();
    } else if (map.v >= 13) {
        map.s.gd = binaryReader.readFloat();
    }
    if (map.v >= 9) {
        map.s.fl = binaryReader.readBoolean();
    }
    map.m.rxn = binaryReader.readUTF();
    map.m.rxa = binaryReader.readUTF();
    map.m.rxid = binaryReader.readUint();
    map.m.rxdb = binaryReader.readShort();
    map.m.n = binaryReader.readUTF();
    map.m.a = binaryReader.readUTF();
    if (map.v >= 10) {
        map.m.vu = binaryReader.readUint();
        map.m.vd = binaryReader.readUint();
    }
    if (map.v >= 4) {
        let crLength = binaryReader.readShort();
        for (let contributorId = 0; contributorId < crLength; contributorId++)
            map.m.cr.push(binaryReader.readUTF());
    }
    if (map.v >= 5) {
        map.m.mo = binaryReader.readUTF();
        map.m.dbid = binaryReader.readInt();
    }
    if (map.v >= 7) {
        map.m.pub = binaryReader.readBoolean();
    }
    if (map.v >= 8) {
        map.m.dbv = binaryReader.readInt();
    }
    map.physics.ppm = binaryReader.readShort();
    let broLength = binaryReader.readShort();
    for (let bodyId = 0; bodyId < broLength; bodyId++)
        map.physics.bro[bodyId] = binaryReader.readShort();

    let shapesLength = binaryReader.readShort();
    for (let shapeId = 0; shapeId < shapesLength; shapeId++) {
        let shapeType = binaryReader.readShort();
        if (shapeType == 1) {
            map.physics.shapes[shapeId] = { type: "bx", w: 10, h: 40, c: [0, 0], a: 0.0, sk: false };
            map.physics.shapes[shapeId].w = binaryReader.readDouble();
            map.physics.shapes[shapeId].h = binaryReader.readDouble();
            map.physics.shapes[shapeId].c = [binaryReader.readDouble(), binaryReader.readDouble()];
            map.physics.shapes[shapeId].a = binaryReader.readDouble();
            map.physics.shapes[shapeId].sk = binaryReader.readBoolean();
        }
        if (shapeType == 2) {
            map.physics.shapes[shapeId] = { type: "ci", r: 25, c: [0, 0], sk: false };
            map.physics.shapes[shapeId].r = binaryReader.readDouble();
            map.physics.shapes[shapeId].c = [binaryReader.readDouble(), binaryReader.readDouble()];
            map.physics.shapes[shapeId].sk = binaryReader.readBoolean();
        }
        if (shapeType == 3) {
            map.physics.shapes[shapeId] = { type: "po", v: [], s: 1, a: 0, c: [0, 0] };
            map.physics.shapes[shapeId].s = binaryReader.readDouble();
            map.physics.shapes[shapeId].a = binaryReader.readDouble();
            map.physics.shapes[shapeId].c = [binaryReader.readDouble(), binaryReader.readDouble()];
            let verticesLength = binaryReader.readShort();
            map.physics.shapes[shapeId].v = [];
            for (vertice = 0; vertice < verticesLength; vertice++) {
                map.physics.shapes[shapeId].v.push([binaryReader.readDouble(), binaryReader.readDouble()]);
            }
        }
    }
    let fixturesLength = binaryReader.readShort();
    for (let fixtureId = 0; fixtureId < fixturesLength; fixtureId++) {
        map.physics.fixtures[fixtureId] = {
            sh: 0,
            n: "Def Fix",
            fr: 0.3,
            fp: null,
            re: 0.8,
            de: 0.3,
            f: 0x4f7cac,
            d: false,
            np: false,
            ng: false,
        };
        map.physics.fixtures[fixtureId].sh = binaryReader.readShort();
        map.physics.fixtures[fixtureId].n = binaryReader.readUTF();
        map.physics.fixtures[fixtureId].fr = binaryReader.readDouble();
        if (map.physics.fixtures[fixtureId].fr == Number.MAX_VALUE) {
            map.physics.fixtures[fixtureId].fr = null;
        }
        let fricPlayers = binaryReader.readShort();
        if (fricPlayers == 0) {
            map.physics.fixtures[fixtureId].fp = null;
        }
        if (fricPlayers == 1) {
            map.physics.fixtures[fixtureId].fp = false;
        }
        if (fricPlayers == 2) {
            map.physics.fixtures[fixtureId].fp = true;
        }
        map.physics.fixtures[fixtureId].re = binaryReader.readDouble();
        if (map.physics.fixtures[fixtureId].re == Number.MAX_VALUE) {
            map.physics.fixtures[fixtureId].re = null;
        }
        map.physics.fixtures[fixtureId].de = binaryReader.readDouble();
        if (map.physics.fixtures[fixtureId].de == Number.MAX_VALUE) {
            map.physics.fixtures[fixtureId].de = null;
        }
        map.physics.fixtures[fixtureId].f = binaryReader.readUint();
        map.physics.fixtures[fixtureId].d = binaryReader.readBoolean();
        map.physics.fixtures[fixtureId].np = binaryReader.readBoolean();
        if (map.v >= 11) {
            map.physics.fixtures[fixtureId].ng = binaryReader.readBoolean();
        }
        if (map.v >= 12) {
            map.physics.fixtures[fixtureId].ig = binaryReader.readBoolean();
        }
    }
    let bodiesLength = binaryReader.readShort();
    for (let bodyId = 0; bodyId < bodiesLength; bodyId++) {
        map.physics.bodies[bodyId] = {
            p: [0, 0],
            a: 0,
            lv: [0, 0],
            av: 0,
            cf: {
                x: 0,
                y: 0,
                w: true,
                ct: 0
            },
            fx: [],
            fz: {
                on: false,
                x: 0,
                y: 0,
                d: true,
                p: true,
                a: true,
                t: 0,
                cf: 0
            },
            s: {
                type: "s",
                n: "Unnamed",
                fric: 0.3,
                fricp: false,
                re: 0.8,
                de: 0.3,
                ld: 0,
                ad: 0,
                fr: false,
                bu: false,
                f_c: 1,
                f_p: true,
                f_1: true,
                f_2: true,
                f_3: true,
                f_4: true
            }
        };
        map.physics.bodies[bodyId].s.type = binaryReader.readUTF();
        map.physics.bodies[bodyId].s.n = binaryReader.readUTF();
        map.physics.bodies[bodyId].p = [binaryReader.readDouble(), binaryReader.readDouble()];
        map.physics.bodies[bodyId].a = binaryReader.readDouble();
        map.physics.bodies[bodyId].s.fric = binaryReader.readDouble();
        map.physics.bodies[bodyId].s.fricp = binaryReader.readBoolean();
        map.physics.bodies[bodyId].s.re = binaryReader.readDouble();
        map.physics.bodies[bodyId].s.de = binaryReader.readDouble();
        map.physics.bodies[bodyId].lv = [binaryReader.readDouble(), binaryReader.readDouble()];
        map.physics.bodies[bodyId].av = binaryReader.readDouble();
        map.physics.bodies[bodyId].s.ld = binaryReader.readDouble();
        map.physics.bodies[bodyId].s.ad = binaryReader.readDouble();
        map.physics.bodies[bodyId].s.fr = binaryReader.readBoolean();
        map.physics.bodies[bodyId].s.bu = binaryReader.readBoolean();
        map.physics.bodies[bodyId].cf.x = binaryReader.readDouble();
        map.physics.bodies[bodyId].cf.y = binaryReader.readDouble();
        map.physics.bodies[bodyId].cf.ct = binaryReader.readDouble();
        map.physics.bodies[bodyId].cf.w = binaryReader.readBoolean();
        map.physics.bodies[bodyId].s.f_c = binaryReader.readShort();
        map.physics.bodies[bodyId].s.f_1 = binaryReader.readBoolean();
        map.physics.bodies[bodyId].s.f_2 = binaryReader.readBoolean();
        map.physics.bodies[bodyId].s.f_3 = binaryReader.readBoolean();
        map.physics.bodies[bodyId].s.f_4 = binaryReader.readBoolean();
        if (map.v >= 2) {
            map.physics.bodies[bodyId].s.f_p = binaryReader.readBoolean();
        }
        if (map.v >= 14) {
            map.physics.bodies[bodyId].fz.on = binaryReader.readBoolean();
            if (map.physics.bodies[bodyId].fz.on) {
                map.physics.bodies[bodyId].fz.x = binaryReader.readDouble();
                map.physics.bodies[bodyId].fz.y = binaryReader.readDouble();
                map.physics.bodies[bodyId].fz.d = binaryReader.readBoolean();
                map.physics.bodies[bodyId].fz.p = binaryReader.readBoolean();
                map.physics.bodies[bodyId].fz.a = binaryReader.readBoolean();
                if (map.v >= 15) {
                    map.physics.bodies[bodyId].fz.t = binaryReader.readShort();
                    map.physics.bodies[bodyId].fz.cf = binaryReader.readDouble();
                }
            }
        }
        let fixturesLength = binaryReader.readShort();
        for (let fixtureId = 0; fixtureId < fixturesLength; fixtureId++) {
            map.physics.bodies[bodyId].fx.push(binaryReader.readShort());
        }
    }
    let spawnsLength = binaryReader.readShort();
    for (spawnId = 0; spawnId < spawnsLength; spawnId++) {
        map.spawns[spawnId] = {
            x: 400,
            y: 300,
            xv: 0,
            yv: 0,
            priority: 5,
            r: true,
            f: true,
            b: true,
            gr: false,
            ye: false,
            n: "Spawn",
        };
        spawn = map.spawns[spawnId];
        spawn.x = binaryReader.readDouble();
        spawn.y = binaryReader.readDouble();
        spawn.xv = binaryReader.readDouble();
        spawn.yv = binaryReader.readDouble();
        spawn.priority = binaryReader.readShort();
        spawn.r = binaryReader.readBoolean();
        spawn.f = binaryReader.readBoolean();
        spawn.b = binaryReader.readBoolean();
        spawn.gr = binaryReader.readBoolean();
        spawn.ye = binaryReader.readBoolean();
        spawn.n = binaryReader.readUTF();
    }
    let capZonesLength = binaryReader.readShort();
    for (capZoneId = 0; capZoneId < capZonesLength; capZoneId++) {
        map.capZones[capZoneId] = { n: "Cap Zone", ty: 1, l: 10, i: -1 };
        map.capZones[capZoneId].n = binaryReader.readUTF();
        map.capZones[capZoneId].l = binaryReader.readDouble();
        map.capZones[capZoneId].i = binaryReader.readShort();
        if (map.v >= 6) {
            map.capZones[capZoneId].ty = binaryReader.readShort();
        }
    }
    let jointsLength = binaryReader.readShort();
    for (jointId = 0; jointId < jointsLength; jointId++) {
        let jointType = binaryReader.readShort();
        if (jointType == 1) {
            map.physics.joints[jointId] = {
                type: "rv",
                d: { la: 0, ua: 0, mmt: 0, ms: 0, el: false, em: false, cc: false, bf: 0, dl: true },
                aa: [0, 0],
            };
            joint = map.physics.joints[jointId];
            joint.d.la = binaryReader.readDouble();
            joint.d.ua = binaryReader.readDouble();
            joint.d.mmt = binaryReader.readDouble();
            joint.d.ms = binaryReader.readDouble();
            joint.d.el = binaryReader.readBoolean();
            joint.d.em = binaryReader.readBoolean();
            joint.aa = [binaryReader.readDouble(), binaryReader.readDouble()];
        }
        if (jointType == 2) {
            map.physics.joints[jointId] = {
                type: "d",
                d: { fh: 0, dr: 0, cc: false, bf: 0, dl: true },
                aa: [0, 0],
                ab: [0, 0],
            };
            joint = map.physics.joints[jointId];
            joint.d.fh = binaryReader.readDouble();
            joint.d.dr = binaryReader.readDouble();
            joint.aa = [binaryReader.readDouble(), binaryReader.readDouble()];
            joint.ab = [binaryReader.readDouble(), binaryReader.readDouble()];
        }
        if (jointType == 3) {
            map.physics.joints[jointId] = {
                type: "lpj",
                d: { cc: false, bf: 0, dl: true },
                pax: 0,
                pay: 0,
                pa: 0,
                pf: 0,
                pl: 0,
                pu: 0,
                plen: 0,
                pms: 0,
            };
            joint = map.physics.joints[jointId];
            joint.pax = binaryReader.readDouble();
            joint.pay = binaryReader.readDouble();
            joint.pa = binaryReader.readDouble();
            joint.pf = binaryReader.readDouble();
            joint.pl = binaryReader.readDouble();
            joint.pu = binaryReader.readDouble();
            joint.plen = binaryReader.readDouble();
            joint.pms = binaryReader.readDouble();
        }
        if (jointType == 4) {
            map.physics.joints[jointId] = {
                type: "lsj",
                d: { cc: false, bf: 0, dl: true },
                sax: 0,
                say: 0,
                sf: 0,
                slen: 0,
            };
            joint = map.physics.joints[jointId];
            joint.sax = binaryReader.readDouble();
            joint.say = binaryReader.readDouble();
            joint.sf = binaryReader.readDouble();
            joint.slen = binaryReader.readDouble();
        }
        if (jointType == 5) {
            map.physics.joints[jointId] = { type: "g", n: "", ja: -1, jb: -1, r: 1 };
            joint = map.physics.joints[jointId];
            joint.n = binaryReader.readUTF();
            joint.ja = binaryReader.readShort();
            joint.jb = binaryReader.readShort();
            joint.r = binaryReader.readDouble();
        }
        if (jointType != 5) {
            map.physics.joints[jointId].ba = binaryReader.readShort();
            map.physics.joints[jointId].bb = binaryReader.readShort();
            map.physics.joints[jointId].d.cc = binaryReader.readBoolean();
            map.physics.joints[jointId].d.bf = binaryReader.readDouble();
            map.physics.joints[jointId].d.dl = binaryReader.readBoolean();
        }
    }
    return map;
};