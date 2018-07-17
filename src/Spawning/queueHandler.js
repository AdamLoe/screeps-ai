let spawnCreep = require("./spawnCreep");

let defaultSpawnMemory = {
	spawnQueue: []
	// Example spawnQueue: [{
	//    body: ["WORK", "CARRY"],
	//    memory: {
	//		currentRole: "Harvester", room: "W8N7", ogRole: "Harvester"
	//    }
	// }]
};

module.exports = () => {
	for (let spawn in Game.spawns) {
		let room = Game.spawns[spawn].room;
		let maxEnergy = room.energyCapacityAvailable;
		let currEnergy = room.energyAvailable;
		console.log("Spawn:", spawn, "  |  ", "max:", maxEnergy, "|", "curr:", currEnergy);

		Game.spawns[spawn].memory =  Game.spawns[spawn].memory || defaultSpawnMemory;
		let { spawnQueue } = Game.spawns[spawn].memory;

		if ( spawnQueue.length > 0) {
			spawnCreep(spawn, maxEnergy, "harvester");
		}
	}
};



