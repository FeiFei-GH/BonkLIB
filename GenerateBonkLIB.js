const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

function readFirstLine (filePath) {
	try {
		var data = fs.readFileSync(filePath).toString().split("\n")[0];
		return data;
	} catch(er) {
		throw new Error(er);
	}
}

function getFilePaths (dir) {
	let foundPaths = {};
	const files = fs.readdirSync(dir);
	
	for(const file of files) {
		const filePath = path.join(dir, file);
		const fileData = fs.statSync(filePath);
		
		if(fileData.isDirectory()) {
			let otherPaths = getFilePaths(filePath);
			//!problem here
			Object.keys(otherPaths).forEach((key) => {
				if(!foundPaths[key]) {
					foundPaths[key] = [];
				}
				foundPaths[key] = foundPaths[key].concat(otherPaths[key]);
			});
		} else if(file.endsWith(".js")) {
			let line = readFirstLine(filePath);
			if(line.startsWith("//@")) {
				if(!foundPaths[line]) {
					foundPaths[line] = [];
				}
				foundPaths[line].push(filePath);
			}
		}
	}
	return foundPaths;
}

let paths = getFilePaths(path.join(__dirname, "src"));
if(!paths["//@Main"])
	throw new Error("Missing //@Main in /src");

const bonkBase = fs.readFileSync(paths["//@Main"][0], {encoding: 'utf-8'});
let lines = bonkBase.toString().split("\n");
lines.shift();
for(let i = 0; i < lines.length; i++) {
	if(lines[i].trim().startsWith("//@")) {
		const pathsAdd = paths[lines[i].trim()];
		let insertCode = "";
		pathsAdd.forEach((filePath) => {
			let code = fs.readFileSync(filePath, {encoding: 'utf-8'});
			insertCode += code.substring(lines[i].trim().length + 1);
		});
		lines.splice(i, 1, insertCode);
	}
}
const bonkLIB = lines.join("\n");
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
${bonkLIB}
`;

fs.writeFileSync(`./UserScripts/BonkLIB.js`, content);