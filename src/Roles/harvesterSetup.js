let updateAutoSpawner = require("../Spawning/spawnAutoList").update;

module.exports = (source) => {


	let rcl = source.room.controller.level;
	let freeSpots = source.memory.freeSpots;

	let creeps = [ genHarvester(source)];
	if (freeSpots > 1) {
		creeps += [ genHarvester(source)];
	}

	let spawnName = source.room.memory.spawns[0];

	updateAutoSpawner(spawnName, source.id, creeps);
};


let genHarvester = (source) => {
	return {
		priority: 1 + source.memory.spawnPriority,
		memory: {
			role: "harvester",
			room: source.room.name,
			target: source.id
		},
		body: [WORK, WORK, MOVE]
	};
};