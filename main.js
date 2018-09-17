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

/*

Object.defineProperty(Creep.prototype, "harvest", {
	get() {

	},
	configurable: true
});

Object.defineProperty(Creep.prototype, "transfer", {
	get() {

	},
	configurable: true
});

Object.defineProperty(Creep.prototype, "upgrade", {
	get() {

	},
	configurable: true
});

Object.defineProperty(Creep.prototype, "transfer", {
	get() {

	},
	configurable: true
});


    
*/

Structure.prototype.currEnergy = function() {
	switch(this.structureType) {
		case STRUCTURE_STORAGE:
		case STRUCTURE_CONTAINER:
			return this.store;
		case STRUCTURE_EXTENSION:
		case STRUCTURE_LINK:
		case STRUCTURE_SPAWN:
			return this.energy;
	}
};

Structure.prototype.maxEnergy = function() {
	switch(this.structureType) {
		case STRUCTURE_STORAGE:
		case STRUCTURE_CONTAINER:
			return this.storeCapacity;
		case STRUCTURE_EXTENSION:
		case STRUCTURE_LINK:
			return this.energyCapacity;
		case STRUCTURE_SPAWN:
			return this.energyCapacity;
	}
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Traveler_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
class Traveler {
	/**
     * move creep to destination
     * @param creep
     * @param destination
     * @param options
     * @returns {number}
     */
	static travelTo(creep, destination, options = {}) {
		// uncomment if you would like to register hostile rooms entered
		// this.updateRoomStatus(creep.room);
		if (!destination) {
			return ERR_INVALID_ARGS;
		}
		if (creep.fatigue > 0) {
			Traveler.circle(creep.pos, "aqua", .3);
			return ERR_TIRED;
		}
		destination = this.normalizePos(destination);
		// manage case where creep is nearby destination
		let rangeToDestination = creep.pos.getRangeTo(destination);
		if (options.range && rangeToDestination <= options.range) {
			return OK;
		}
		else if (rangeToDestination <= 1) {
			if (rangeToDestination === 1 && !options.range) {
				let direction = creep.pos.getDirectionTo(destination);
				if (options.returnData) {
					options.returnData.nextPos = destination;
					options.returnData.path = direction.toString();
				}
				return creep.move(direction);
			}
			return OK;
		}
		// initialize data object
		if (!creep.memory._trav) {
			delete creep.memory._travel;
			creep.memory._trav = {};
		}
		let travelData = creep.memory._trav;
		let state = this.deserializeState(travelData, destination);
		// uncomment to visualize destination
		// this.circle(destination.pos, "orange");
		// check if creep is stuck
		if (this.isStuck(creep, state)) {
			state.stuckCount++;
			Traveler.circle(creep.pos, "magenta", state.stuckCount * .2);
		}
		else {
			state.stuckCount = 0;
		}
		// handle case where creep is stuck
		if (!options.stuckValue) {
			options.stuckValue = DEFAULT_STUCK_VALUE;
		}
		if (state.stuckCount >= options.stuckValue && Math.random() > .5) {
			options.ignoreCreeps = false;
			options.freshMatrix = true;
			delete travelData.path;
		}
		// TODO:handle case where creep moved by some other function, but destination is still the same
		// delete path cache if destination is different
		if (!this.samePos(state.destination, destination)) {
			if (options.movingTarget && state.destination.isNearTo(destination)) {
				travelData.path += state.destination.getDirectionTo(destination);
				state.destination = destination;
			}
			else {
				delete travelData.path;
			}
		}
		if (options.repath && Math.random() < options.repath) {
			// add some chance that you will find a new path randomly
			delete travelData.path;
		}
		// pathfinding
		let newPath = false;
		if (!travelData.path) {
			newPath = true;
			if (creep.spawning) {
				return ERR_BUSY;
			}
			state.destination = destination;
			let cpu = Game.cpu.getUsed();
			let ret = this.findTravelPath(creep.pos, destination, options);
			let cpuUsed = Game.cpu.getUsed() - cpu;
			state.cpu = _.round(cpuUsed + state.cpu);
			if (state.cpu > REPORT_CPU_THRESHOLD) {
				// see note at end of file for more info on this
				console.log(`TRAVELER: heavy cpu use: ${creep.name}, cpu: ${state.cpu} origin: ${creep.pos}, dest: ${destination}`);
			}
			let color = "orange";
			if (ret.incomplete) {
				// uncommenting this is a great way to diagnose creep behavior issues
				// console.log(`TRAVELER: incomplete path for ${creep.name}`);
				color = "red";
			}
			if (options.returnData) {
				options.returnData.pathfinderReturn = ret;
			}
			travelData.path = Traveler.serializePath(creep.pos, ret.path, color);
			state.stuckCount = 0;
		}
		this.serializeState(creep, destination, state, travelData);
		if (!travelData.path || travelData.path.length === 0) {
			return ERR_NO_PATH;
		}
		// consume path
		if (state.stuckCount === 0 && !newPath) {
			travelData.path = travelData.path.substr(1);
		}
		let nextDirection = parseInt(travelData.path[0], 10);
		if (options.returnData) {
			if (nextDirection) {
				let nextPos = Traveler.positionAtDirection(creep.pos, nextDirection);
				if (nextPos) {
					options.returnData.nextPos = nextPos;
				}
			}
			options.returnData.state = state;
			options.returnData.path = travelData.path;
		}
		return creep.move(nextDirection);
	}
	/**
     * make position objects consistent so that either can be used as an argument
     * @param destination
     * @returns {any}
     */
	static normalizePos(destination) {
		if (!(destination instanceof RoomPosition)) {
			return destination.pos;
		}
		return destination;
	}
	/**
     * check if room should be avoided by findRoute algorithm
     * @param roomName
     * @returns {RoomMemory|number}
     */
	static checkAvoid(roomName) {
		return Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].avoid;
	}
	/**
     * check if a position is an exit
     * @param pos
     * @returns {boolean}
     */
	static isExit(pos) {
		return pos.x === 0 || pos.y === 0 || pos.x === 49 || pos.y === 49;
	}
	/**
     * check two coordinates match
     * @param pos1
     * @param pos2
     * @returns {boolean}
     */
	static sameCoord(pos1, pos2) {
		return pos1.x === pos2.x && pos1.y === pos2.y;
	}
	/**
     * check if two positions match
     * @param pos1
     * @param pos2
     * @returns {boolean}
     */
	static samePos(pos1, pos2) {
		return this.sameCoord(pos1, pos2) && pos1.roomName === pos2.roomName;
	}
	/**
     * draw a circle at position
     * @param pos
     * @param color
     * @param opacity
     */
	static circle(pos, color, opacity) {
		new RoomVisual(pos.roomName).circle(pos, {
			radius: .45, fill: "transparent", stroke: color, strokeWidth: .15, opacity: opacity
		});
	}
	/**
     * update memory on whether a room should be avoided based on controller owner
     * @param room
     */
	static updateRoomStatus(room) {
		if (!room) {
			return;
		}
		if (room.controller) {
			if (room.controller.owner && !room.controller.my) {
				room.memory.avoid = 1;
			}
			else {
				delete room.memory.avoid;
			}
		}
	}
	/**
     * find a path from origin to destination
     * @param origin
     * @param destination
     * @param options
     * @returns {PathfinderReturn}
     */
	static findTravelPath(origin, destination, options = {}) {
		_.defaults(options, {
			ignoreCreeps: true,
			maxOps: DEFAULT_MAXOPS,
			range: 1,
		});
		if (options.movingTarget) {
			options.range = 0;
		}
		origin = this.normalizePos(origin);
		destination = this.normalizePos(destination);
		let originRoomName = origin.roomName;
		let destRoomName = destination.roomName;
		// check to see whether findRoute should be used
		let roomDistance = Game.map.getRoomLinearDistance(origin.roomName, destination.roomName);
		let allowedRooms = options.route;
		if (!allowedRooms && (options.useFindRoute || (options.useFindRoute === undefined && roomDistance > 2))) {
			let route = this.findRoute(origin.roomName, destination.roomName, options);
			if (route) {
				allowedRooms = route;
			}
		}
		let callback = (roomName) => {
			if (allowedRooms) {
				if (!allowedRooms[roomName]) {
					return false;
				}
			}
			else if (!options.allowHostile && Traveler.checkAvoid(roomName)
                && roomName !== destRoomName && roomName !== originRoomName) {
				return false;
			}
			let matrix;
			let room = Game.rooms[roomName];
			if (room) {
				if (options.ignoreStructures) {
					matrix = new PathFinder.CostMatrix();
					if (!options.ignoreCreeps) {
						Traveler.addCreepsToMatrix(room, matrix);
					}
				}
				else if (options.ignoreCreeps || roomName !== originRoomName) {
					matrix = this.getStructureMatrix(room, options.freshMatrix);
				}
				else {
					matrix = this.getCreepMatrix(room);
				}
				if (options.obstacles) {
					matrix = matrix.clone();
					for (let obstacle of options.obstacles) {
						if (obstacle.pos.roomName !== roomName) {
							continue;
						}
						matrix.set(obstacle.pos.x, obstacle.pos.y, 0xff);
					}
				}
			}
			if (options.roomCallback) {
				if (!matrix) {
					matrix = new PathFinder.CostMatrix();
				}
				let outcome = options.roomCallback(roomName, matrix.clone());
				if (outcome !== undefined) {
					return outcome;
				}
			}
			return matrix;
		};
		let ret = PathFinder.search(origin, { pos: destination, range: options.range }, {
			maxOps: options.maxOps,
			maxRooms: options.maxRooms,
			plainCost: options.offRoad ? 1 : options.ignoreRoads ? 1 : 2,
			swampCost: options.offRoad ? 1 : options.ignoreRoads ? 5 : 10,
			roomCallback: callback,
		});
		if (ret.incomplete && options.ensurePath) {
			if (options.useFindRoute === undefined) {
				// handle case where pathfinder failed at a short distance due to not using findRoute
				// can happen for situations where the creep would have to take an uncommonly indirect path
				// options.allowedRooms and options.routeCallback can also be used to handle this situation
				if (roomDistance <= 2) {
					console.log("TRAVELER: path failed without findroute, trying with options.useFindRoute = true");
					console.log(`from: ${origin}, destination: ${destination}`);
					options.useFindRoute = true;
					ret = this.findTravelPath(origin, destination, options);
					console.log(`TRAVELER: second attempt was ${ret.incomplete ? "not " : ""}successful`);
					return ret;
				}
				// TODO: handle case where a wall or some other obstacle is blocking the exit assumed by findRoute
			}
		}
		return ret;
	}
	/**
     * find a viable sequence of rooms that can be used to narrow down pathfinder's search algorithm
     * @param origin
     * @param destination
     * @param options
     * @returns {{}}
     */
	static findRoute(origin, destination, options = {}) {
		let restrictDistance = options.restrictDistance || Game.map.getRoomLinearDistance(origin, destination) + 10;
		let allowedRooms = { [origin]: true, [destination]: true };
		let highwayBias = 1;
		if (options.preferHighway) {
			highwayBias = 2.5;
			if (options.highwayBias) {
				highwayBias = options.highwayBias;
			}
		}
		let ret = Game.map.findRoute(origin, destination, {
			routeCallback: (roomName) => {
				if (options.routeCallback) {
					let outcome = options.routeCallback(roomName);
					if (outcome !== undefined) {
						return outcome;
					}
				}
				let rangeToRoom = Game.map.getRoomLinearDistance(origin, roomName);
				if (rangeToRoom > restrictDistance) {
					// room is too far out of the way
					return Number.POSITIVE_INFINITY;
				}
				if (!options.allowHostile && Traveler.checkAvoid(roomName) &&
                    roomName !== destination && roomName !== origin) {
					// room is marked as "avoid" in room memory
					return Number.POSITIVE_INFINITY;
				}
				let parsed;
				if (options.preferHighway) {
					parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
					let isHighway = (parsed[1] % 10 === 0) || (parsed[2] % 10 === 0);
					if (isHighway) {
						return 1;
					}
				}
				// SK rooms are avoided when there is no vision in the room, harvested-from SK rooms are allowed
				if (!options.allowSK && !Game.rooms[roomName]) {
					if (!parsed) {
						parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
					}
					let fMod = parsed[1] % 10;
					let sMod = parsed[2] % 10;
					let isSK = !(fMod === 5 && sMod === 5) &&
                        ((fMod >= 4) && (fMod <= 6)) &&
                        ((sMod >= 4) && (sMod <= 6));
					if (isSK) {
						return 10 * highwayBias;
					}
				}
				return highwayBias;
			},
		});
		if (!_.isArray(ret)) {
			console.log(`couldn't findRoute to ${destination}`);
			return;
		}
		for (let value of ret) {
			allowedRooms[value.room] = true;
		}
		return allowedRooms;
	}
	/**
     * check how many rooms were included in a route returned by findRoute
     * @param origin
     * @param destination
     * @returns {number}
     */
	static routeDistance(origin, destination) {
		let linearDistance = Game.map.getRoomLinearDistance(origin, destination);
		if (linearDistance >= 32) {
			return linearDistance;
		}
		let allowedRooms = this.findRoute(origin, destination);
		if (allowedRooms) {
			return Object.keys(allowedRooms).length;
		}
	}
	/**
     * build a cost matrix based on structures in the room. Will be cached for more than one tick. Requires vision.
     * @param room
     * @param freshMatrix
     * @returns {any}
     */
	static getStructureMatrix(room, freshMatrix) {
		if (!this.structureMatrixCache[room.name] || (freshMatrix && Game.time !== this.structureMatrixTick)) {
			this.structureMatrixTick = Game.time;
			let matrix = new PathFinder.CostMatrix();
			this.structureMatrixCache[room.name] = Traveler.addStructuresToMatrix(room, matrix, 1);
		}
		return this.structureMatrixCache[room.name];
	}
	/**
     * build a cost matrix based on creeps and structures in the room. Will be cached for one tick. Requires vision.
     * @param room
     * @returns {any}
     */
	static getCreepMatrix(room) {
		if (!this.creepMatrixCache[room.name] || Game.time !== this.creepMatrixTick) {
			this.creepMatrixTick = Game.time;
			this.creepMatrixCache[room.name] = Traveler.addCreepsToMatrix(room, this.getStructureMatrix(room, true).clone());
		}
		return this.creepMatrixCache[room.name];
	}
	/**
     * add structures to matrix so that impassible structures can be avoided and roads given a lower cost
     * @param room
     * @param matrix
     * @param roadCost
     * @returns {CostMatrix}
     */
	static addStructuresToMatrix(room, matrix, roadCost) {
		let impassibleStructures = [];
		for (let structure of room.find(FIND_STRUCTURES)) {
			if (structure instanceof StructureRampart) {
				if (!structure.my && !structure.isPublic) {
					impassibleStructures.push(structure);
				}
			}
			else if (structure instanceof StructureRoad) {
				matrix.set(structure.pos.x, structure.pos.y, roadCost);
			}
			else if (structure instanceof StructureContainer) {
				matrix.set(structure.pos.x, structure.pos.y, 5);
			}
			else {
				impassibleStructures.push(structure);
			}
		}
		for (let site of room.find(FIND_MY_CONSTRUCTION_SITES)) {
			if (site.structureType === STRUCTURE_CONTAINER || site.structureType === STRUCTURE_ROAD
                || site.structureType === STRUCTURE_RAMPART) {
				continue;
			}
			matrix.set(site.pos.x, site.pos.y, 0xff);
		}
		for (let structure of impassibleStructures) {
			matrix.set(structure.pos.x, structure.pos.y, 0xff);
		}
		return matrix;
	}
	/**
     * add creeps to matrix so that they will be avoided by other creeps
     * @param room
     * @param matrix
     * @returns {CostMatrix}
     */
	static addCreepsToMatrix(room, matrix) {
		room.find(FIND_CREEPS).forEach((creep) => matrix.set(creep.pos.x, creep.pos.y, 0xff));
		return matrix;
	}
	/**
     * serialize a path, traveler style. Returns a string of directions.
     * @param startPos
     * @param path
     * @param color
     * @returns {string}
     */
	static serializePath(startPos, path, color = "orange") {
		let serializedPath = "";
		let lastPosition = startPos;
		this.circle(startPos, color);
		for (let position of path) {
			if (position.roomName === lastPosition.roomName) {
				new RoomVisual(position.roomName)
					.line(position, lastPosition, { color: color, lineStyle: "dashed" });
				serializedPath += lastPosition.getDirectionTo(position);
			}
			lastPosition = position;
		}
		return serializedPath;
	}
	/**
     * returns a position at a direction relative to origin
     * @param origin
     * @param direction
     * @returns {RoomPosition}
     */
	static positionAtDirection(origin, direction) {
		let offsetX = [0, 0, 1, 1, 1, 0, -1, -1, -1];
		let offsetY = [0, -1, -1, 0, 1, 1, 1, 0, -1];
		let x = origin.x + offsetX[direction];
		let y = origin.y + offsetY[direction];
		if (x > 49 || x < 0 || y > 49 || y < 0) {
			return;
		}
		return new RoomPosition(x, y, origin.roomName);
	}
	/**
     * convert room avoidance memory from the old pattern to the one currently used
     * @param cleanup
     */
	static patchMemory(cleanup = false) {
		if (!Memory.empire) {
			return;
		}
		if (!Memory.empire.hostileRooms) {
			return;
		}
		let count = 0;
		for (let roomName in Memory.empire.hostileRooms) {
			if (Memory.empire.hostileRooms[roomName]) {
				if (!Memory.rooms[roomName]) {
					Memory.rooms[roomName] = {};
				}
				Memory.rooms[roomName].avoid = 1;
				count++;
			}
			if (cleanup) {
				delete Memory.empire.hostileRooms[roomName];
			}
		}
		if (cleanup) {
			delete Memory.empire.hostileRooms;
		}
		console.log(`TRAVELER: room avoidance data patched for ${count} rooms`);
	}
	static deserializeState(travelData, destination) {
		let state = {};
		if (travelData.state) {
			state.lastCoord = { x: travelData.state[STATE_PREV_X], y: travelData.state[STATE_PREV_Y] };
			state.cpu = travelData.state[STATE_CPU];
			state.stuckCount = travelData.state[STATE_STUCK];
			state.destination = new RoomPosition(travelData.state[STATE_DEST_X], travelData.state[STATE_DEST_Y], travelData.state[STATE_DEST_ROOMNAME]);
		}
		else {
			state.cpu = 0;
			state.destination = destination;
		}
		return state;
	}
	static serializeState(creep, destination, state, travelData) {
		travelData.state = [creep.pos.x, creep.pos.y, state.stuckCount, state.cpu, destination.x, destination.y,
			destination.roomName];
	}
	static isStuck(creep, state) {
		let stuck = false;
		if (state.lastCoord !== undefined) {
			if (this.sameCoord(creep.pos, state.lastCoord)) {
				// didn't move
				stuck = true;
			}
			else if (this.isExit(creep.pos) && this.isExit(state.lastCoord)) {
				// moved against exit
				stuck = true;
			}
		}
		return stuck;
	}
}
Traveler.structureMatrixCache = {};
Traveler.creepMatrixCache = {};
exports.Traveler = Traveler;
// this might be higher than you wish, setting it lower is a great way to diagnose creep behavior issues. When creeps
// need to repath to often or they aren't finding valid paths, it can sometimes point to problems elsewhere in your code
const REPORT_CPU_THRESHOLD = 1000;
const DEFAULT_MAXOPS = 20000;
const DEFAULT_STUCK_VALUE = 2;
const STATE_PREV_X = 0;
const STATE_PREV_Y = 1;
const STATE_STUCK = 2;
const STATE_CPU = 3;
const STATE_DEST_X = 4;
const STATE_DEST_Y = 5;
const STATE_DEST_ROOMNAME = 6;
// assigns a function to Creep.prototype: creep.travelTo(destination)
Creep.prototype.travelTo = function (destination, options) {
	return Traveler.travelTo(this, destination, options);
};
});

unwrapExports(Traveler_1);
var Traveler_2 = Traveler_1.Traveler;

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
var run = (spawn) => {

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

var add = (spawn, creep) => {
	console.log("Adding Creep to spawnQueue", spawn);

	spawn.memory.spawnQueue.push(creep);
};


//The key is generated when
//Whenever we actually add soemthing to
//We need to make a respawn strategy

var spawnQueue = {
	run: run,
	add: add
};

let compare = (param1, param2) => {
	if (typeof param1 !== typeof param2) {
		return false;
	}
	if (typeof param1 === "object") {
		if (Array.isArray(param1)) {
			if (Array.isArray(param2)) {
			    return compareArrays(param1, param2);
			} else {
				return false;
			}
		}
		return compareObjects(param1, param2);
	}
	return param1 === param2;
};

let compareArrays = (arr1, arr2) => {
	let ret = true;
	arr1.forEach( (item1, index) => {
		let item2 = arr2[index];

		if ( !compare(item1, item2) ) {
		    ret = false;
		}
	});
	if (arr1.length !== arr2.length ) {
		return false;
	}
	return ret;
};

let compareObjects = (obj1, obj2) => {
	for (let key in obj1) {
		if (!(key in obj2)) {
			return false;
		}

		if ( !compare(obj1[key], obj2[key]) ) {
		    return false;
		}
	}
	for (let key in obj2) {
	    if (!(key in obj1)) {
	        return false;
		}
	}
	return true;
};

var deepCompare = compare;

let addToQueue = spawnQueue.add;

var get = (spawn) => {

};
var run$1 = (spawn) => {

	spawn.memory.aliveCreeps.map( (creep, index) => {
		if (!creep) {
			spawn.memory.aliveCreeps.splice(index);
		} else {

			let { name, alreadyRespawning } = creep;
			let Dead = !(name in Game.creeps);
			let AboutToDie = false; //!Dead || Game.creeps[name].ticksToLive < 1400;

			if ( Dead || AboutToDie) {
				console.log("Creep:", name, " respawn started");
				addToQueue(spawn, { ...creep});
				spawn.memory.aliveCreeps[index].alreadyRespawning = true;

				if ( Dead ) spawn.memory.aliveCreeps.splice(index);
			}

		}
	});
};



var update = (spawn, id, creeps) => {

	if ( !deepCompare(spawn.memory.autoList[id], creeps) ) {
		console.log("Updating Auto Creeps", id);

		if (id in spawn.memory.autoList) ;
		creeps.map( (creep, index) => {
			let key = id + ":" + index;
			addToQueue(spawn, { ...creep, key });
		});
		//Send all in autoList to spawnQueue
		spawn.memory.autoList[id] = creeps;
	}
};

var autoRoster = {
	get: get,
	run: run$1,
	update: update
};

let updateAutoSpawner = autoRoster.update;


let run$2 = function() {
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

let update$1 = function() {
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
		run: run$2,
		update: update$1,
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


var updateSources = (spawn) => {
	let sources = spawn.room.memory.sources;
	sources.map( (sourceId) => {

		let source = Game.getObjectById(sourceId);
		let sourceUpdater = updateSource(source, spawn);
		sourceUpdater.run();
	});
};

/*
	Only really want one spy per spawn cluster,  though we might want to creep a new spy for incubating rooms
 */

let { update: update$2 } = autoRoster;

var updateSpies = (spawn) => {
	let id = spawn.id + ":spy";
	let creeps = [ genSpy() ];
    
	update$2(spawn, id, creeps);
};

let genSpy = () => {
	return {
		priority: 4,
		memory: {
			role: "spy"
		},
		body: [MOVE]
	};
};

var updateCreepRoster = (spawn) => {
	updateSources(spawn);
	updateSpies(spawn);
};

let runSpawnQueue = spawnQueue.run;
let runAutoList = autoRoster.run;


let spawnChanged = (spawn) => {
	if (spawn.energyCapacity !== spawn.memory.energyCapacity) {
		spawn.memory.energyCapacity = spawn.energyCapacity;
		return true;
	}
	return false;
};

var spawnController = () => {
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

let checkTaskArr = {
	"harvest" (creep, target) {
		return target.energy > 0;
	},
	"pickup" (creep, target) {
		let creepNotFull = creep.carry.energy < creep.carryCapacity;
		let targetNotEmpty = target && target.amount > 0; //target.amount > 0;
		return creepNotFull && targetNotEmpty;
	},
	"transfer": (creep, target) => {
		let creepNotEmpty = creep.carry.energy > 0;
		let targetNotFull = target.currEnergy() < target.maxEnergy();
		return creepNotEmpty && targetNotFull;
	},
	"withdraw": (creep, target) => {
		return true;
	},
	"idle": (creep, target) => {
		return creep.memory.idleTicks > 0;
	}
};

var checkTask = (creep, target) => {
	let func = checkTaskArr[creep.memory.taskName];
	return func(creep, target);
};

let nextTo = (pos1, pos2) => {
	if ( pos1.room !== pos2.room ) {
		return 100;
	} else {
		let xNear = Math.abs(pos1.x - pos2.x);
		let yNear = Math.abs(pos1.y - pos2.y);
		return Math.max(xNear, yNear);
	}
};

let getPos = (obj) => {
	if ("x" in obj) {
		return obj;
	} else {
		return obj.pos;
	}
};

var nextTo_1 = (obj1, obj2) => {
	if (obj1 === null || obj2 === null) return 0;
	let pos1 = getPos(obj1);
	let pos2 = getPos(obj2);
	return nextTo(pos1, pos2);
};

var navigation = {
	nextTo: nextTo_1
};

let { nextTo: nextTo$1 } = navigation;

let getTask = {
	"build": (creep, target) => {
		creep.build(target);
	},
	"claimController": (creep, target) => {
		creep.claimController(target);
	},
	"harvest": (creep, target) => {
		creep.harvest(target);
	},
	"moveTo": (creep, target) => {
		creep.moveTo(target);
	},
	"pickup": (creep, target) => {
		creep.pickup(target);
	},
	"reserveController": (creep, target) => {
		creep.reserveController(target);
	},
	"transfer": (creep, target) => {
		creep.transfer(target, RESOURCE_ENERGY);
	},
	"withdraw": (creep, target) => {
		creep.withdraw(target);
	},
	"upgradeController": (creep, target) => {
		creep.upgradeController(target);
	},
	"idle": (creep, ticks) => {
		creep.memory.idleTicks -= 1;
	}
};

var runTask = (creep, target) => {
	let { taskName, taskOptions, taskInRange, taskPos, taskRange } = creep.memory;

	if (taskPos === null || taskPos === undefined) {
		taskPos = target;
	} else {
		taskPos = new RoomPosition(taskPos.x, taskPos.y, taskPos.roomName);
	}

	let res;
	if (nextTo$1(creep, taskPos) <= taskRange ) {
		res = getTask[taskName](creep, target, taskOptions);
	} else {
		res = creep.travelTo(taskPos, {
			range: taskRange
		});
	}
};

var setTask = (creep, task, target, options) => {
	options = {
		...defaultOptions,
		...options
	};
	creep.memory = {
		...creep.memory,
		taskName: task,
		taskTarget: target,
		taskPos: options.pos,
		taskRange: options.range,
		taskInRange: false
	};
};

let defaultOptions = {
	range: 1,
	pos: null
};

var harvesterRun = (creep) => {
	setTask(creep, "harvest", creep.memory.target, {
		pos: creep.memory.dropPos,
		range: 0
	});

};

let findEnergyStorage = (creep) => {
	return Game.spawns.Spawn1.id;
};

let withdraw = (creep) => {
	let { x, y, roomName } = creep.memory.targetWithdraw;
	let target = new RoomPosition(x, y, roomName);

	let objects = target.look();

	let container = _.find(objects, obj => obj.type === "structure");
	let energy = _.find(objects, obj => obj.type === "energy" && obj.energy.resourceType === "energy");


	if (container) {
		setTask(creep, "pickup", container.id);
	} else if (energy) {
		setTask(creep, "pickup", energy.energy.id);
	} else {
		creep.memory.idleTicks = 1;
		setTask(creep, "idle", null);
	}

};

let transfer = (creep) => {
	let target = findEnergyStorage(creep);

	if (target !== null) {
		setTask(creep, "transfer", target);
	} else {

		if (creep.carry.energy / creep.carryCapacity > .75 ) {
			setTask(creep, "idle", 1);

		} else {
			withdraw(creep);
		}
	}

};

var courierRun = (creep) => {
	let hasEnergy = creep.carry.energy > 0;

	if (hasEnergy) {
		transfer(creep);
	} else {
		withdraw(creep);
	}
};

var getNewTask = (creep) => {
	switch (creep.memory.role) {
		case "harvester":  	harvesterRun(creep); 	break;
		case "spy":			break;
		case "courier": 	courierRun(creep);		break;
	}
};

let getTarget = (creep) => {
	let target = creep.memory.taskTarget;
	if (target === null) return null;
	if (target === undefined) return null;
	else if (typeof target === "object") {
		let { x, y, roomName } = target;
		return new RoomPosition(x, y, roomName);
	} else {
		return Game.getObjectById(target);
	}
};

var creepController = () => {
	for (let id in Game.creeps) {
		let creep = Game.creeps[id];

		let hasTask =  creep.memory.taskName;

		let target;
		let taskValid;

		if (hasTask) {
			target = getTarget(creep);
			taskValid = checkTask(creep, target);
			if (!taskValid) {
				getNewTask(creep);
			}
		} else {
			getNewTask(creep);
			target = getTarget(creep);
		}

		runTask(creep, target);


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
	//Will be responsible for Adding new structures and missions based off of RCL
	roomController,

	//Handle Spawning and Creation of Rosters for Creeps
	spawnController,

	//Handles Actual Actions from Creeps
	creepController,

	//Handle all of our structures, and what actions we want them to take
	towerActions,

	//Currently useless
	cleanup
];

console.log("[][][] Cache Reset [][][]");

var loop = function() {

	//console.log("===== LOOP START ======");
	modules.map(module => module() );

};

var main = {
	loop: loop
};

exports.default = main;
exports.loop = loop;
//# sourceMappingURL=main.js.map
