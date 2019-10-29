'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class SpacerMemory {
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
        const memory = SpacerMemory.get();
        console.log('got memory', memory);
        // If our colony failed for some reason, start over
        if (this.shouldHardReset()) {
            memory.rooms = {};
            memory.spawns = {};
            memory.sources = {};
            memory.creeps = {};
            memory.nameClk = 1;
        }
        else {
            if (this.shouldInit(memory)) {
                memory.sources = {};
                memory.nameClk = 0;
            }
        }
    }
    /**
     * Has our memory already been initialized
     */
    static shouldInit(memory) {
        return !memory.sources;
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
}

function getSpacerId() {
    const memory = SpacerMemory.get();
    memory.nameClk += 1;
    return memory.nameClk.toString();
}

class SpacersChoiceCreep extends Creep {
}
class Citizen {
    constructor(creep) {
        this.creep = creep;
        this.spacerId = creep.name;
    }
}
class Township {
    constructor(room, creeps) {
        // Now that we are actually using this ID in Task/Spawn Requests, we can't be generating this on each tick
        // We need to be storing these in the memory or something
        this.spacerId = getSpacerId();
        this.primaryRoom = room;
        this.buildCitizenList(creeps);
    }
    buildCitizenList(creeps) {
        this.citizens = {};
        creeps.forEach((creep) => {
            const citizen = new Citizen(creep);
            this.citizens[citizen.spacerId] = citizen;
        });
    }
}

var JobEnum;
(function (JobEnum) {
    JobEnum["HARVEST"] = "harvest";
    JobEnum["CARRY"] = "carry";
    JobEnum["UPGRADE"] = "upgrade";
    JobEnum["REPAIR"] = "repair";
})(JobEnum || (JobEnum = {}));
var TaskEnum;
(function (TaskEnum) {
    TaskEnum["build"] = "build";
    TaskEnum["harvest"] = "harvest";
    TaskEnum["heal"] = "heal";
    TaskEnum["repair"] = "repair";
    TaskEnum["upgradeController"] = "upgradeController";
})(TaskEnum || (TaskEnum = {}));
class SpacerBoard {
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
        // Build a township for each room
        // TODO: Each room should not be a township
        for (const roomId in this.rooms) {
            const room = this.rooms[roomId];
            // TODO: Pass a list of all creeps to handle for each room
            const township = new Township(room, []);
            this.townships[township.spacerId] = township;
        }
    }
    run() {
    }
    handleSpawning() {
    }
}

class SpacerGlobal {
    static getGlobalObject() {
        return global;
    }
}

function loop() {
    /**
     * Load our memory object (Only applicable on hard reset / init)
     */
    SpacerMemory.loadMemory();
    /**
     * Setup our board with our memory / game object
     */
    const global = SpacerGlobal.getGlobalObject();
    global.spacerBoard = new SpacerBoard();
    global.spacerBoard.init();
    /**
     * Run our actions for this tick
     */
    global.spacerBoard.run();
}

exports.loop = loop;
