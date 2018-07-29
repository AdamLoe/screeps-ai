'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

Object.defineProperty(Source.prototype, "memory", {
	get: function() {
		return Memory.sources[this.id];
	},
	enumerable: false,
	configurable: true
});

Object.defineProperty(Source.prototype, "harvesters", {
	get: function() {
		return Memory.sources[this.id].harvesters.map( creepId => Game.creeps[creepId] );
	},
	enumerable: false,
	configurable: true
});

Object.defineProperty(Source.prototype, "couriers", {
	get: function() {
		return Memory.sources[this.id].couriers.map( creepId => Game.creeps[creepId] );
	},
	enumerable: false,
	configurable: true
});

Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (let p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

		switch (typeof (obj1[p])) {
			//Deep compare objects
			case "object":
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
				//Compare function code
			case "function":
				if (typeof (obj2[p]) === "undefined" || (p !== "compare" && obj1[p].toString() !== obj2[p].toString())) return false;
				break;
				//Compare values
			default:
				if (obj1[p] !== obj2[p]) return false;
		}
	}

	//Check object 2 for any extra properties
	for (let p in obj2) {
		if (typeof (obj1[p]) === "undefined") return false;
	}
	return true;
};

let justReset = () => {
	if (_.size(Game.rooms) === 1) {
		if (_.find(Game.rooms).controller.level === 1) {
			if (_.size(Game.creeps) === 0) {
				return true;
			}
		}
	}
	return false;
};

var Memory_1 = () => {

	Memory.sources = Memory.sources || {};
	Memory.nameClk = Memory.nameClk || 0;
    
	if ( justReset() ) {
		console.log("++++++ CLEARING OLD MEMORY ++++++++++");

		Memory.rooms = {};
		Memory.spawns = {};
		Memory.sources = {};
		Memory.creeps = {};
		Memory.nameClk = 1;
	}

	if (Game.rooms.length === 1) ;
};

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

var initializeRoomMemory = (room) => {
	if ( shouldSetup(room) ) {
		console.log("Initializing Room Memory...");
		setBasic(room);
		setSpawns(room);
		setSources(room);
	}
};

var roomController = () => {
	for (let name in Game.rooms) {
		let room = Game.rooms[name];

		initializeRoomMemory(room);

	}
};

var run = (spawn) => {

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

var add = (spawn, creep) => {
	console.log("Adding Creep to spawnQueue", spawn);

	spawn.memory.spawnQueue.push(creep);
};

var spawnQueue = {
	run: run,
	add: add
};

let addToQueue = spawnQueue.add;


var run$1 = (spawn) => {
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

		if ( Dead || AboutToDie) {
			addToQueue(spawn, { memory, body, priority, key });

			if ( Dead ) {
				spawn.memory.aliveCreeps.splice(index);
			} else {
				spawn.memory.aliveCreeps[index].alreadyRespawning = true;
			}
		}

	});
};


var update = (spawnName, id, creeps) => {
	let spawn = Game.spawns[spawnName];

	if ( JSON.stringify(spawn.memory.autoList[id]) !== JSON.stringify(creeps) ) {
		console.log("Updating Auto Creeps", id);

		if (id in spawn.memory.autoList) ;
		creeps.map( creep => addToQueue(spawn, creep) );
		//Send all in autoList to spawnQueue
		spawn.memory.autoList[id] = creeps;
	}
};

var spawnAutoList = {
	run: run$1,
	update: update
};

let updateAutoSpawner = spawnAutoList.update;

var harvesterSetup = (source) => {


	let rcl = source.room.controller.level;
	let freeSpots = source.memory.freeSpots;

	let creeps = [ genHarvester(source)];
	if (freeSpots > 1) {
		creeps += [ genHarvester(source)];
	}

	let spawnName = source.room.memory.spawns[0];

	updateAutoSpawner(spawnName, source.id, creeps);
};


let genHarvester = (source) => {
	return {
		priority: 1 + source.memory.spawnPriority,
		memory: {
			role: "harvester",
			room: source.room.name,
			target: source.id
		},
		body: [WORK, WORK, MOVE]
	};
};

let handleEnergyUsage = (source) => {
	let storage = source.room.find(FIND_MY_SPAWNS)[0];

	let numWorkParts = 0;
	source.harvesters.map( (creep) => {
		creep.body.map( (part) => {
			if (part === WORK) {
				numWorkParts += 1;
			}
		});
	});
	let numCarryParts = 0;
	source.couriers.map( (creep) => {
		creep.body.map( (part) => {
			if (part === WORK) {
				numCarryParts += 1;
			}
		});
	});

	let distance = source.pos.findPathTo(storage, { range: 1, ignoreCreeps: true}).length;

	Memory.sources[source.id].harvestEPT = numWorkParts * 2;
	Memory.sources[source.id].courierEPT = numCarryParts * 50 / (distance * 2);
	Memory.sources[source.id].sourceEPT = source.energyCapacity / 300;
};




var sourceController = () => {
	for (let sourceId in Memory.sources) {
		let { isActive } = Memory.sources[sourceId];
		if (isActive) {

			let source = Game.getObjectById(sourceId);

			handleEnergyUsage(source);
			console.log("harv:", source.memory.harvestEPT, "| cour:", source.memory.courierEPT, "| source:", source.memory.sourceEPT);
			harvesterSetup(source);
		}
	}
};

let runSpawnQueue = spawnQueue.run;
let runAutoList = spawnAutoList.run;

var spawnController = () => {
	for (let name in Game.spawns) {
		let spawn = Game.spawns[name];

		runAutoList( spawn );
		runSpawnQueue( Game.spawns[name] );
	}
};

var Courier = (creep) => {
	let droppedEnergy = room.find(FIND_DROPPED_ENERGY);
	let droppedResources = room.find(FIND_DROPPED_RESOURCES);

	let readyContainers = room.find(FIND_MY_STRUCTURES, {
		filter: (struct) => (
			struct.structureType === STRUCTURE_CONTAINER &&
            struct.store.RESOURCE_ENERGY > 1000
		)
	});


};

var Harvester = (creep) => {

	let { room,  source } = creep.memory;
	let { ogRole, currentRole, work, carry, move } = creep.memory;

	if (room === creep.room.name) {
		let { x, y } = Memory.sources[source];

		let distX = Math.abs(x - creep.pos.x)**2;
		let distY = Math.abs(y - creep.pos.y)**2;
		let inRange = (distX < 2 && distY < 2);

		source = Game.getObjectById(source);
		if (inRange) {
			creep.harvest(source);
		} else {
			creep.moveTo(source);
		}
	} else {
		creep.moveTo(room);
	}
};

var runCreeps = () => {
	for (let name in Game.creeps) {
		let creep = Game.creeps[name];

		let role = creep.memory.currentRole;

		switch ( role ) {
			case "harvester":
			    Harvester(creep);
				break;
			case "courier":
			    Courier(creep);
				break;
			case "worker":
				break;
		}
	}
};

var towerActions = () => {
	for (let name in Game.rooms) {
	    let room = Game.rooms[name];

		let towers = room.find(FIND_STRUCTURES, {
			filter: (struct) => (
				struct.structureType === STRUCTURE_TOWER
			)
		});
	}
};

var cleanup = () => {
	if (Game.time % 1 === 0) {
		for (let id in Memory.creeps){
			if ( !(id in Game.creeps)) {
				delete Memory.creeps[id];
			}
		}
	}
};

let modules = [
    //Initialize memory variables on server restnpm
	Memory_1,

	//Initialize Room and Source Roles / Structures
	roomController,
	sourceController,

	//Handle Spawning
	spawnController,

	runCreeps,
	towerActions,

	cleanup
];

console.log("[][][] Cache Reset [][][]");

var loop = function() {

	console.log("===== LOOP START ======");
	modules.map(module => module() );
};

var main = {
	loop: loop
};

exports.default = main;
exports.loop = loop;
//# sourceMappingURL=main.js.map
