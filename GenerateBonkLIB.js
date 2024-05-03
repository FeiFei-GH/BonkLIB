const fs = require('fs');
const packageJson = require('./package.json');

// File paths
const BonkAPI = fs.readFileSync('./BonkAPI/BonkAPI.js', {encoding: 'utf-8'});
const BonkHUD = fs.readFileSync('./BonkHUD/BonkHUD.js', {encoding: 'utf-8'});

const content = `// ==UserScript==
// @name         BonkLIB
// @version      ${packageJson.version}
// @author       FeiFei + Clarifi + BoZhi
// @namespace    https://github.com/XyaoFeiFei/BonkLIB
// @description  BonkAPI + BonkHUD
// @license      MIT
// @match        https://*.bonk.io/gameframe-release.html
// @run-at       document-start
// @grant        none
// ==/UserScript==
/*
  Usable with:
  https://greasyfork.org/en/scripts/433861-code-injector-bonk-io
*/

// ! Compitable with Bonk Version 49

${BonkAPI}\n${BonkHUD}`;

fs.writeFileSync(`./UserScripts/BonkLIB.js`, content);