let addToQueue = require("./spawnQueue").add;

exports.run = (spawn) => {

	spawn.memory.aliveCreeps.map( (creep, index) => {

		let {
			memory,
			body,
			priority,
			key,
			alreadyRespawning
		} = creep.memory;

		let { name } = creep;

		let Dead = !(name in Game.creeps);
		let AboutToDie = false;//Game.creeps[creepName].ticksToLive < 100;

		if ( Dead || AboutToDie && alreadyRespawning === undefined) {
			addToQueue(spawn, { memory, body, priority, key });
			spawn.memory.aliveCreeps[index].alreadyRespawning = true;

			if ( Dead ) spawn.memory.aliveCreeps.splice(index);
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
		creeps.map( creep => addToQueue(spawn, creep) );
		//Send all in autoList to spawnQueue
		spawn.memory.autoList[id] = creeps;
	}
};
