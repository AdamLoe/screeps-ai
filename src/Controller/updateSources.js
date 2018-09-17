let updateAutoSpawner = require("../Spawning/autoRoster").update;


let run = function() {
	this.addHarvester();
	this.handleCouriers();
	/*
		This might eventually become a core part of our early game strategy in the future
	if (this.rcl && this.freeSpots > 1) {
		this.addHarvester();
		this.handleCouriers();
	}
	*/
	this.update();
};

//At 4 Work parts we reach 8e/t , problem is an addition 1/1 would need carry parts,, but it could easily make its target up in about 100 Ticks,
	//Might not be neccesary
//If we already have a harvester, we need to give it another spot to stand1
//Any harvester past the first doesnt care about where he is dropping it,
	//If we dont give a harvester a drop position, then he just gets in range
	//If we dont give a courier a drop position, then it just searches for dropped energy near source
//
let addHarvester = function() {
	let path = this.source.pos.findPathTo(this.spawn.pos, { range: 1, ignoreCreeps: true});
	this.dropPos = {
		x: path[0].x,
		y: path[0].y,
		roomName: this.source.room.name
	};
	this.source.memory.dropPos = this.dropPos;
	this.creeps.push( genHarvester(this.source, this.dropPos) );
};

let handleCouriers = function() {
	//We need to get the distance required, this will keep constant no matter change in harvesters
	//We need to establish some things first
	//DropPos / Path needs to be made at start, im thinkin we just place the source in relation to the spawn, until further changes
	//From here, calculate our extra energy per tick and add our leftover or overage over
	//
	this.storage = this.spawn;

	let path = this.source.pos.findPathTo(this.storage.pos, { range: 1, ignoreCreeps: true});
	let distance = path.length;

	let currentWorkParts = 0;
	let currentCarryParts = 0;
	this.creeps.map( (creep) => {
		creep.body.map( (part) => {
			switch(part) {
				case WORK:
					currentWorkParts += 1;
					break;
				case CARRY:
					currentCarryParts += 1;
			}
		});
	});
	let energyPerTick = currentWorkParts * 2; //Work Parts	//Carry Parts
	let carryPartsNeeded = energyPerTick * (distance * 2)/50;
	carryPartsNeeded -= currentCarryParts;

	while ( carryPartsNeeded > .1 ) {
		this.creeps.push( genCourier(1, this.source, this.storage, this.dropPos) );
		carryPartsNeeded -= 1;
	}
};

let update = function() {
	updateAutoSpawner(this.spawn, this.source.id, this.creeps);
};

let updateSource = (source, spawn) => {
	return {
		source,
		spawn,
		storage: null,
		rcl: source.room.controller.level,
		freeSpots: source.memory.freeSpots,
		creeps: [],
		run,
		update,
		addHarvester,
		handleCouriers
	};
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
	//At lower RCLs we use less carry Parts, might not even fill it
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
		let sourceUpdater = updateSource(source, spawn);
		sourceUpdater.run();
	});
};

/*
 let energyPerCarryPart = energyPerTick / carryPartsNeeded;
 let overCarry = carryPartsNeeded % 1;
 let wastagePerTick =  overCarry*energyPerCarryPart;
 let extraCarryCost = 100;
 let wastage = wastagePerTick*1500 / extraCarryCost; // ExtraCarryPartBonus / Cost
 //console.log("Waste:", wastage);
 //If no road, then each extra carryPart costs 100 energy, but otherwise, it costs 50 to 100 depending on num parts

 */