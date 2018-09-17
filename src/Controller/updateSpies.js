/*
	Only really want one spy per spawn cluster,  though we might want to creep a new spy for incubating rooms
 */

let { update } = require("../Spawning/autoRoster");

module.exports = (spawn) => {
	let id = spawn.id + ":spy";
	let creeps = [ genSpy() ];
    
	update(spawn, id, creeps);
};

let genSpy = () => {
	return {
		priority: 4,
		memory: {
			role: "spy"
		},
		body: [MOVE]
	};
};