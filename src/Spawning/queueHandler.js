let { bodyCost, dispObj } = require("./helper");

let defaultSpawnMemory = {
	spawnQueue: []
};

let spawnCreep = (body, memory, name) => {
	console.log("Created creep:", body, "with name", name);
	return this.spawnCreep(body, name, { memory });
};



module.exports = () => {
	for (let name in Game.spawns) {
		let spawn = Game.spawns[name];
		if (!spawn.spawning) {

			let room = spawn.room;
			let maxEnergy = room.energyCapacityAvailable;
			let currEnergy = room.energyAvailable;
			console.log("Spawn:", spawn, "  |  ", "max:", maxEnergy, "|", "curr:", currEnergy);

			if (maxEnergy === currEnergy) {

				if (spawn.memory === {}) spawn.memory = defaultSpawnMemory;
				let { spawnQueue } = spawn.memory;

				if ( spawnQueue.length > 0) {
					let { body, memory } = spawnQueue[0];

					let cost = bodyCost( body );

					let res = spawn.spawnCreep(body, memory, name);
					console.log("res: ", res);
				}

			}

		}
	}
};



