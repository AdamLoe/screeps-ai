let getCreepCost = (creep) => {
	let cost = 0;
	creep.body.map( part => cost += BODYPART_COST[part] );
	return cost;
};

let spawnCreep = (spawn, creep) => {

	Memory.nameClk += 1;
	let name = creep.memory.role + Memory.nameClk;

	let {body, memory} = creep;

	console.log("Created creep:", body, "with name", name);
	let res = spawn.spawnCreep(body, name, {memory});

	if (res === 0) {
		console.log("Spawning Worked!!");
		spawn.memory.spawnQueue.shift();
		spawn.memory.aliveCreeps.push({
			...creep,
			name
		});

	} else {
		console.log("Spawning Failed: ", res);
		Memory.nameClk -= 1;

	}
};
exports.run = (spawn) => {

	let isSpawning = !spawn.spawning;
	let hasCreepToSpawn = spawn.memory.spawnQueue.length > 0;

	if (isSpawning && hasCreepToSpawn) {

		let creep = spawn.memory.spawnQueue[0];

		let room = spawn.room;
		let maxEnergy = room.energyCapacityAvailable;
		let currEnergy = room.energyAvailable;
		let nextCreepCost = getCreepCost( creep );

		let canSpawnFirstCreep = nextCreepCost < currEnergy;

		if ( canSpawnFirstCreep ) {

			spawnCreep(spawn, creep);
		}
	}
};

exports.add = (spawn, creep) => {
	console.log("Adding Creep to spawnQueue", spawn);

	spawn.memory.spawnQueue.push(creep);
};