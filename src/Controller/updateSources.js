let updateAutoSpawner = require("../Spawning/autoRoster").update;


let updateSources = (source, spawn) => {
	let storage = spawn;

	let rcl = source.room.controller.level;
	let freeSpots = source.memory.freeSpots;

	let path = source.pos.findPathTo(storage.pos, { range: 1, ignoreCreeps: true});


	let dropPos = {
		x: path[0].x,
		y: path[0].y,
		roomName: source.room.name
	};
	source.memory.dropPos = dropPos;

	let creeps = [ genHarvester(source, dropPos) ];

	let distance = path.length;
	let energyPerTick = 3;
	let carryPartsNeeded = energyPerTick * (distance * 2)/50;
	//console.log("Dist:", distance, " EPT:", energyPerTick, " CPN:", carryPartsNeeded);

	let energyPerCarryPart = energyPerTick / carryPartsNeeded;
	let overCarry = carryPartsNeeded % 1;
	let wastagePerTick =  overCarry*energyPerCarryPart;
	let extraCarryCost = 100;
	let wastage = wastagePerTick*1500 / extraCarryCost; // ExtraCarryPartBonus / Cost
	//console.log("Waste:", wastage);
	//If no road, then each extra carryPart costs 100 energy, but otherwise, it costs 50 to 100 depending on num parts


	while ( carryPartsNeeded > .1 ) {
		creeps.push( genCourier(1, source, storage, dropPos) );
		carryPartsNeeded -= 1;
	}

	//How much energy we need to bring each round trip, divided by how

	updateAutoSpawner(spawn, source.id, creeps);

};

let genHarvester = (source, dropPos) => {
	return {
		priority: 1 + source.memory.spawnPriority,
		memory: {
			role: "harvester",
			room: source.room.name,
			target: source.id,
			dropPos: dropPos
		},
		body: [WORK, WORK, MOVE]
	};
};

let genCourier = (carryParts, source, target, dropPos, hasRoad=false) => {
	return {
		priority: 1 + source.memory.spawnPriority,
		memory: {
			role: "courier",
			room: source.room.name,
			source: source.id,
			targetWithdraw: dropPos,
			targetTransfer: target.id
		},
		body: [CARRY, MOVE]
	};
};


module.exports = (spawn) => {
	let sources = spawn.room.memory.sources;
	sources.map( (sourceId) => {

		let source = Game.getObjectById(sourceId);
		updateSources(source, spawn);
	});
};