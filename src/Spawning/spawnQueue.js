exports.run = (spawn) => {

	if (!spawn.spawning) {

		let room = spawn.room;
		let maxEnergy = room.energyCapacityAvailable;
		let currEnergy = room.energyAvailable;
		console.log(spawn.name, "charging",  currEnergy + "/" + maxEnergy);

		if (maxEnergy === currEnergy) {

			let { spawnQueue } = spawn.memory;


			console.log("spawnQueue: ", JSON.stringify(spawnQueue));
			if ( spawnQueue.length > 0) {
				let creep = spawnQueue.shift();
				let { body, memory } = creep;

				Memory.nameClk += 1;
				let name = memory.role + Memory.nameClk;

				console.log("Created creep:", body, "with name", name);
				let res = spawn.spawnCreep(body, name, { memory: memory });

				if (res === 0) {
					console.log("Spawning Worked!!");
					spawn.memory.aliveCreeps.push({
						...creep,
						creepName: name
					});

				} else {
					console.log("Spawning Failed: ", res);
					spawnQueue.unshift(creep);
					Memory.nameClk -= 1;
					
				}
			}

		}

	} else {
		console.log(spawn.name, "spawning creep");
	}

};

exports.add = (spawn, creep) => {
	console.log("Adding Creep to spawnQueue", spawn);

	spawn.memory.spawnQueue.push(creep);
};