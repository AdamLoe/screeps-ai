let runSpawnQueue = require("./spawnQueue").run;
let runAutoList = require("./autoRoster").run;
let updateCreepRoster = require("../Controller/updateCreepRoster");

let spawnChanged = (spawn) => {
	if (spawn.energyCapacity !== spawn.memory.energyCapacity) {
		spawn.memory.energyCapacity = spawn.energyCapacity;
		return true;
	}
	return false;
};

module.exports = () => {
	for (let name in Game.spawns) {
		let spawn = Game.spawns[name];

		if (spawnChanged(spawn)) {  //We can temporarily downgrade a spawn when we are in
			console.log("Spawned Changed : Updating Creep Roster");
			updateCreepRoster(spawn);
		}

		runAutoList( spawn );
		runSpawnQueue( spawn );

	}
};

/*
    Spawn Memory
    ---------------
        spawnQueue: [{creep}],
        aliveCreeps: [{creep}],
        autoList: {
            id: [{creep}]
        }

        autoList = {
            memory,
            body,
            priority
        },
        spawnQueue = {
            ...autoList,
            key = id + role + index
        },
        aliveCreeps = {
            ...spawnQueue,
            id = creepId
        }
        //We use key to replace creeps
 */