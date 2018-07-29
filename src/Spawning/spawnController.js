let runSpawnQueue = require("./spawnQueue").run;
let runAutoList = require("./spawnAutoList").run;

module.exports = () => {
	for (let name in Game.spawns) {
		let spawn = Game.spawns[name];

		runAutoList( spawn );
		runSpawnQueue( Game.spawns[name] );
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