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