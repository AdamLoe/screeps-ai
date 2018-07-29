"use strict";

require("./Prototypes/index");

let modules = [
    //Initialize memory variables on server restnpm
	require("./Helpers/Memory"),

	//Initialize Room and Source Roles / Structures
	require("./Controller/roomController"),
	require("./Controller/sourceController"),

	//Handle Spawning
	require("./Spawning/spawnController"),

	require("./Actions/runCreeps"),
	require("./Structures/towerActions"),

	require("./Helpers/cleanup")
];

console.log("[][][] Cache Reset [][][]");

module.exports.loop = function() {

	console.log("===== LOOP START ======");
	modules.map(module => module() );
};
