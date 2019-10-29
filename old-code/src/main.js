//setTickRate(50)
//bots.spawn('screeps-bot-tooangel', ROOMNAME)
//screeps-bot-hivemind

"use strict";

require("./Prototypes/index");
require("./Traveler");

let modules = [
	//Initialize memory variables on server restnpm
	require("./Helpers/Memory"),

	//Initialize Room and Source Roles / Structures
	//Will be responsible for Adding new structures and missions based off of RCL
	require("./Controller/roomController"),

	//Handle Spawning and Creation of Rosters for Creeps
	require("./Spawning/spawnController"),

	//Handles Actual Actions from Creeps
	require("./Creeps/creepController"),

	//Handle all of our structures, and what actions we want them to take
	require("./Structures/towerActions"),

	//Currently useless
	require("./Helpers/cleanup")
];

console.log("[][][] Cache Reset [][][]");

module.exports.loop = function() {

	//console.log("===== LOOP START ======");
	modules.map(module => module() );

};