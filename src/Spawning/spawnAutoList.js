let addToQueue = require("./spawnQueue").add;


exports.run = (spawn) => {
	//Should be keep a list of all current alive creeps
	//Upon creeps getting close to death or dying, spawn a new one

	/*
	let string1 = "Alive Creeps: ";
	let string2 = "Memory Creeps: ";

	for (let name in Game.creeps) string1 += name + ", ";
	spawn.memory.aliveCreeps.map( creep => string2 += creep.creepName + ", ");
	console.log(string1);
	console.log(string2);
	*/

	spawn.memory.aliveCreeps.map( ({
		memory,
		body,
		priority,
		creepName,
		key,
		alreadyRespawning
	}, index) => {

		let Dead = !(creepName in Game.creeps);
		let AboutToDie = false;//Game.creeps[creepName].ticksToLive < 100;

		if ( Dead || AboutToDie && !alreadyRespawning) {
			addToQueue(spawn, { memory, body, priority, key });

			if ( Dead ) {
				spawn.memory.aliveCreeps.splice(index);
			} else {
				spawn.memory.aliveCreeps[index].alreadyRespawning = true;
			}
		}

	});
};


exports.update = (spawnName, id, creeps) => {
	let spawn = Game.spawns[spawnName];

	if ( JSON.stringify(spawn.memory.autoList[id]) !== JSON.stringify(creeps) ) {
		console.log("Updating Auto Creeps", id);

		if (id in spawn.memory.autoList) {
			//Remove any entries in autolist from this spawns spawnQueue
		}
		creeps.map( creep => addToQueue(spawn, creep) );
		//Send all in autoList to spawnQueue
		spawn.memory.autoList[id] = creeps;
	}
};
