'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class SpacersChoiceMemory {
    /**
     * Get our memory object
     */
    static get() {
        return Memory;
    }
    /**
     * Handling initializing our SpacerMemory object
     */
    static loadMemory() {
        const memory = SpacersChoiceMemory.get();
        // If our colony failed for some reason, start over
        if (this.shouldHardReset() || this.shouldInit(memory)) {
            console.log('resetting memory');
            const newMemory = {
                creeps: {},
                flags: {},
                rooms: {},
                powerCreeps: {},
                spawns: {},
                sources: {},
                townships: {},
                nameClk: 1
            };
            Object.assign(memory, newMemory);
        }
    }
    /**
     * Has our memory already been initialized.
     */
    static shouldInit(memory) {
        // Memory doesn't start out in memory, so if it is there, we must have initted memory
        return !memory.sources || !memory.townships || !memory.nameClk;
    }
    /**
     * Determines if we should hard reset our colony (something went fatally wrong)
     */
    static shouldHardReset() {
        // Must only have one room
        const onlyOneRoom = Object.keys(Game.rooms).length === 1;
        if (onlyOneRoom) {
            // Our room must be level one
            const room = Game.rooms[Object.keys(Game.rooms)[0]];
            const roomIsLevelOne = room && room.controller && room.controller.level === 1;
            if (roomIsLevelOne) {
                // We also must have no creeps
                const noCreeps = Object.keys(Game.creeps).length === 0;
                if (noCreeps) {
                    return true;
                }
            }
        }
        return false;
    }
    static getTownshipMemory(spacerId) {
        const memory = SpacersChoiceMemory.get();
        memory.townships[spacerId] = memory.townships[spacerId] || {};
        return memory.townships[spacerId];
    }
    static getSourceMemory(spacerId) {
        const memory = SpacersChoiceMemory.get();
        memory.sources[spacerId] = memory.sources[spacerId] || {};
        return memory.sources[spacerId];
    }
}

class SpacersChoiceCreep extends Creep {
    constructor(creep) {
        super(creep.id);
        this.spacerId = creep.name;
    }
    run() {
        this.say('Hello World!');
    }
}

/**
 * A Spacers Choice Room is a Room with extra Spacers Choice Approved Functionality
 */
class SpacersChoiceRoom extends Room {
    /**
     * Default Constructor. Sets all of the base room properties
     */
    constructor(room) {
        super(room.name);
        this.spacerId = room.name;
    }
    /**
     * Helper functions to get information about our room
     */
    get gcl() { return this.controller ? this.controller.level : 0; }
    get energy() { return this.energyAvailable; }
    get energyCapacity() { return this.energyCapacityAvailable; }
}

class SpacersChoiceSource extends Source {
    constructor(source) {
        super(source.id);
        this.spacerId = source.id;
        this.memory = SpacersChoiceMemory.getSourceMemory(this.spacerId);
    }
}

class SpacersChoiceSpawn extends Spawn {
    /**
     * Default Constructor. Sets all of the base spawn properties
     */
    constructor(spawn) {
        super(spawn.id);
        this.spacerId = spawn.name;
    }
}

var JobEnum;
(function (JobEnum) {
    JobEnum["HARVEST"] = "harvest";
    JobEnum["CARRY"] = "carry";
    JobEnum["UPGRADE"] = "upgrade";
    JobEnum["REPAIR"] = "repair";
})(JobEnum || (JobEnum = {}));

var PriorityEnum;
(function (PriorityEnum) {
    PriorityEnum[PriorityEnum["FIRST_HARVESTER"] = 100] = "FIRST_HARVESTER";
    PriorityEnum[PriorityEnum["FIRST_HAULER"] = 90] = "FIRST_HAULER";
    PriorityEnum[PriorityEnum["PRIMARY_ROOM_HARVESTER"] = 80] = "PRIMARY_ROOM_HARVESTER";
    PriorityEnum[PriorityEnum["PRIMARY_ROOM_HAULER"] = 75] = "PRIMARY_ROOM_HAULER";
    PriorityEnum[PriorityEnum["FIRST_BUILDER"] = 60] = "FIRST_BUILDER";
    PriorityEnum[PriorityEnum["FIRST_UPGRADER"] = 55] = "FIRST_UPGRADER";
    PriorityEnum[PriorityEnum["REMOTE_SOURCE_HARVESTER"] = 40] = "REMOTE_SOURCE_HARVESTER";
    PriorityEnum[PriorityEnum["REMOTE_SOURCE_HAULER"] = 35] = "REMOTE_SOURCE_HAULER";
})(PriorityEnum || (PriorityEnum = {}));

function buildSpawnRequestsForTownship(township) {
    const spawnRequests = [];
    // Create a hauler and carrier for each source
    township.sources
        .forEach((source, index) => {
        spawnRequests.push({
            townshipId: township.spacerId,
            job: JobEnum.HARVEST,
            bodyParts: [MOVE, WORK, WORK],
            priority: index === 0 ? PriorityEnum.FIRST_HARVESTER : PriorityEnum.PRIMARY_ROOM_HARVESTER
        });
        spawnRequests.push({
            townshipId: township.spacerId,
            job: JobEnum.HARVEST,
            bodyParts: [MOVE, CARRY, CARRY],
            priority: index === 0 ? PriorityEnum.FIRST_HAULER : PriorityEnum.PRIMARY_ROOM_HAULER
        });
    });
    return spawnRequests;
}

function buildTaskRequestsForTownship(township) {
    // Mine this shit
    // Pickup this shit from container
    // Put shit in this container/spawner/extension
    // Upgrade this
    return [];
}

/**
 * Returns a new spacer ID. Also handles incrementing our name counter
 */
function getSpacerId() {
    const memory = SpacersChoiceMemory.get();
    memory.nameClk += 1;
    return memory.nameClk.toString();
}

/**
 * Townships handle spawning citizens and delegating tasks based on objects inside of the room
 */
class Township {
    /*
    **********************************************
    *                    INIT                    *
    **********************************************
    */
    /**
     * Default Constructor. Load our data from our room/creeps
     */
    constructor(data) {
        const { spacerId, primaryRoom, rooms, creeps, sources, spawns } = data;
        this.spacerId = spacerId;
        this.primaryRoom = primaryRoom;
        this.rooms = rooms;
        this.creeps = creeps;
        this.sources = sources;
        this.spawns = spawns;
        this.memory = SpacersChoiceMemory.getTownshipMemory(this.spacerId);
        if (!this.memory.primaryRoomId) {
            this.memory.primaryRoomId = primaryRoom.spacerId;
            this.memory.rooms = rooms.map((room) => room.spacerId);
        }
        if (this.areCachedRequestsOutOfDate()) {
            this.buildAndCacheRequests();
        }
        else {
            this.spawnRequests = this.memory.cachedRequests.spawnRequests;
            this.taskRequests = this.memory.cachedRequests.taskRequests;
        }
    }
    /**
     * Are we cached task && spawn requests list out of date
     */
    areCachedRequestsOutOfDate() {
        if (this.memory.cachedRequests) {
            const gclChanged = this.primaryRoom.gcl !== this.memory.cachedRequests.gcl;
            const energyCapacityChanged = this.primaryRoom.energyCapacity !== this.memory.cachedRequests.maxEnergy;
            return gclChanged || energyCapacityChanged;
        }
        else {
            return true;
        }
    }
    /**
     * Build and cache our new task/spawn request lists
     */
    buildAndCacheRequests() {
        this.spawnRequests = buildSpawnRequestsForTownship(this);
        this.taskRequests = buildTaskRequestsForTownship();
        this.memory.cachedRequests = {
            gcl: this.primaryRoom.gcl,
            maxEnergy: this.primaryRoom.energy,
            spawnRequests: this.spawnRequests,
            taskRequests: this.taskRequests
        };
    }
    /*
    **********************************************
    *                    RUN                     *
    **********************************************
    */
    /**
     * Handle of all of the tasks/spawning our townships should be assigning on this tick
     */
    run() {
        this.runCreeps();
        this.runSpawns();
    }
    runCreeps() {
        this.creeps.forEach((creep) => {
            creep.run();
        });
    }
    runSpawns() {
        const neededSpawns = this.spawnRequests
            // Is the creep not alive
            .filter((spawnRequest) => {
            if (spawnRequest.creepSpacerId) {
                const creepIsAlive = this.creeps.some((creep) => {
                    return creep.spacerId === spawnRequest.creepSpacerId;
                });
                return !creepIsAlive;
            }
            else {
                return true;
            }
        })
            // Is the creep not being spawned right now
            .filter((spawnRequest) => {
            const spawningNow = this.spawns.some((spawn) => {
                if (spawn.spawning) {
                    return spawn.spawning.name === spawnRequest.creepSpacerId;
                }
                else {
                    return false;
                }
            });
            return !spawningNow;
        })
            // Sort by priority
            .sort((s1, s2) => s2.priority - s1.priority);
        this.spawns.forEach((spawn) => {
            const notSpawning = !spawn.spawning;
            const needToSpawn = neededSpawns[0];
            if (notSpawning && needToSpawn) {
                const spawnRequest = neededSpawns[0];
                const bodyParts = spawnRequest.bodyParts;
                const spacerId = 'Person:' + getSpacerId();
                spawnRequest.creepSpacerId = spacerId;
                spawn.spawnCreep(bodyParts, spacerId);
            }
        });
    }
}

/**
 * The spacers board simply handles each of our townships by passing them their rooms and citizen data.
 */
class SpacersBoard {
    /*
    **********************************************
    *                    INIT                    *
    **********************************************
    */
    constructor() {
        this.townships = {};
        this.creeps = Game.creeps;
        this.flags = Game.flags;
        this.rooms = Game.rooms;
        this.spawns = Game.spawns;
        this.structures = Game.structures;
        this.constructionSites = Game.constructionSites;
    }
    init() {
        const creeps = this.getCreepsList();
        const spawns = this.getSpawnList();
        // TODO: Each room should not be a township
        for (const roomId in this.rooms) {
            // TODO: We might want to generate its own ID eventually? I don't think we will ever store them together tho
            const spacerId = roomId;
            const primaryRoom = new SpacersChoiceRoom(this.rooms[roomId]);
            const rooms = [primaryRoom];
            const townshipCreeps = creeps.filter((creep) => creep.pos.roomName === primaryRoom.name);
            const townshipSources = this.getSourcesForRooms(rooms);
            const townshipSpawns = spawns.filter((spawn) => spawn.pos.roomName === primaryRoom.name);
            this.townships[spacerId] = new Township({
                spacerId,
                primaryRoom,
                rooms,
                creeps: townshipCreeps,
                sources: townshipSources,
                spawns: townshipSpawns
            });
        }
    }
    getCreepsList() {
        return Object.keys(this.creeps)
            .map((spacerId) => {
            return new SpacersChoiceCreep(this.creeps[spacerId]);
        });
    }
    getSpawnList() {
        return Object.keys(this.spawns)
            .map((spacerId) => {
            return new SpacersChoiceSpawn(this.spawns[spacerId]);
        });
    }
    getSourcesForRooms(rooms) {
        const sources = [];
        rooms.forEach((room) => {
            room.find(FIND_SOURCES)
                .forEach((source) => {
                sources.push(new SpacersChoiceSource(source));
            });
        });
        return sources;
    }
    /*
    **********************************************
    *                    RUN                     *
    **********************************************
    */
    /**
     *
     */
    run() {
        for (const townshipId in this.townships) {
            this.townships[townshipId].run();
        }
    }
}

function getGlobalObject() {
    return global;
}

function loop() {
    /**
     * Load our memory object (Only applicable on hard reset / init)
     */
    SpacersChoiceMemory.loadMemory();
    /**
     * Setup our board with our memory / game object
     */
    const global = getGlobalObject();
    global.spacerBoard = new SpacersBoard();
    global.spacerBoard.init();
    /**
     * Run our actions for this tick
     */
    global.spacerBoard.run();
}

exports.loop = loop;
