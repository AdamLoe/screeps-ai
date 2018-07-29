let getFreeSpots = (pos) => {
	let { x, y } = pos;

	let freeSpots = 0;
	for (let xInd = x-1; xInd <= x+1; xInd++) {
		for (let yInd = y-1; yInd <= y+1; yInd++) {

			if (xInd !== x || yInd !== y+5) {

				let objs = new RoomPosition(xInd, yInd, pos.roomName).look();
				let wallFound = false;

				objs.map( (obj) => {
					if (obj.type === "terrain" && obj.terrain === "wall") {
						wallFound = true;
					}
				});

				if (!(wallFound)) {
					freeSpots += 1;
				}

			}
		}
	}

	return freeSpots;
};

let setBasic = (room) => {
	room.memory = {
		setup: true,
		level: room.controller.level,
		parentRoom: null,
		state: true,
		spawns: [],
		sources: [],
	};
};

let setSpawns = (room) => {
	let spawns = room.find(FIND_MY_SPAWNS);
	spawns.map( (spw) => {
		room.memory.spawns.push(spw.name);
		Memory.spawns[spw.name] = {
			x: spw.pos.x,
			y: spw.pos.y,
			spawnQueue: [],
			aliveCreeps: [],
			autoList: {
			},
		};
	});
};

let setSources = (room) => {
	let sources = room.find(FIND_SOURCES);
	sources.map( (src, index) => {
		room.memory.sources.push(src.id);
		Memory.sources[src.id] = {
			x: src.pos.x,
			y: src.pos.y,
			room: room.name,
			harvesters: [],
			couriers: [],
			freeSpots: getFreeSpots(src.pos),
			isActive: true,
			target: room.memory.spawns[0],
			spawnPriority: index
		};
	});
};

let shouldSetup = (room) => {

	if (!room.memory) {
		return true;
	}

	if (!room.memory.setup) {
		return true;
	}

	if (room.memory.level !== room.controller.level) {
		return true;
	}
};

module.exports = (room) => {
	if ( shouldSetup(room) ) {
		console.log("Initializing Room Memory...");
		setBasic(room);
		setSpawns(room);
		setSources(room);
	}
};
