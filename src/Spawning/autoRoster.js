let addToQueue = require("./spawnQueue").add;

exports.get = (spawn) => {

};
exports.run = (spawn) => {

	spawn.memory.aliveCreeps.map( (creep, index) => {
		if (!creep) {
			spawn.memory.aliveCreeps.splice(index);
		} else {

			let { name, alreadyRespawning } = creep;
			let Dead = !(name in Game.creeps);
			let AboutToDie = false; //!Dead || Game.creeps[name].ticksToLive < 1400;

			if ( Dead || AboutToDie && alreadyRespawning === undefined) {
				console.log("Creep:", name, " respawn started");
				addToQueue(spawn, { ...creep});
				spawn.memory.aliveCreeps[index].alreadyRespawning = true;

				if ( Dead ) spawn.memory.aliveCreeps.splice(index);
			}

		}
	});
};

let compare = require("../Helpers/deepCompare");

exports.update = (spawn, id, creeps) => {

	if ( !compare(spawn.memory.autoList[id], creeps) ) {
		console.log("Updating Auto Creeps", id);

		if (id in spawn.memory.autoList) {
			//Remove any entries in autolist from this spawns spawnQueue
		}
		creeps.map( (creep, index) => {
			let key = id + ":" + index;
			addToQueue(spawn, { ...creep, key });
		});
		//Send all in autoList to spawnQueue
		spawn.memory.autoList[id] = creeps;
	}
};
