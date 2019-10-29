let setupSourceRoutes = (sources, spawn) => {
	let spawnPos = spawn.pos;
	//Setup Pathways
	sources.map( (src) => {
		Memory.sources[src.id].pathToSpawn = spawnPos.findPathTo(src.pos, {
			ignoreCreeps: true,
			range: 1
		});
	});
	//Sort Based on Length to Spawn
	sources.sort( (s1, s2) =>
		Memory.sources[s1.id].pathToSpawn.length > Memory.sources[s2.id].pathToSpawn.length
	);
	//Replace old list with ordered one
	sources[0].room.memory.sources = sources.map(src => src.id);
};

let coldStart = (room) => {
	let spawns = room.find(FIND_MY_SPAWNS);
	let sources = room.find(FIND_SOURCES);

	//Setup Routes, and Order them.
	if (spawns.length > 0) {
		setupSourceRoutes(sources, spawns[0]);
		//Give source one priority
		//SpawnQueue Needs to add to a queue, as well as sign up workers,
		spawns[0].memory.spawnQueue = [
			buildHarvester(room.name, sources[0].id, 300, 5)
		];
	}

	room.memory.coldStart = undefined;
};

module.exports = {
	//setupSourceRoutes,
	coldStart
};



let coldStart2 = (room) => {
	room.memory.parentRoom = room.memory.parentRoom || null;
	let parentRoom = room.memory.parent;

	let sources = room.find(FIND_SOURCES);
	sources.map( ({ id }) => {
		console.log("id", id);
		if (Memory.sources.id === undefined) Memory.sources.id = defaultSrcMem;

		let { assignedHarv } = Memory.sources[id];

		if (assignedHarv === null || !(assignedHarv in Game.creeps)) {
			console.log("Creep Dead Or Something");
		}
	});
};