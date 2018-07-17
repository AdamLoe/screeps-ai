
let defaultSrcMem = {
	assignedHarv: null
};

let buildHarvester = require("../Spawning/buildHarvester");



/*
 Should Cycle Between Different Spawners
 */

// Returns [ Body, Memory, TicksToBuild ]



module.exports = () => {

	for (let name in Game.rooms) {
		let room = Game.rooms[name];

		let coldStart = room.memory.coldStart;
		if (room.memory.coldStart === false) {
			room.memory.sources = room.find(FIND_SOURCES).map(src => src.id);
			room.memory.spawns  = room.find(FIND_MY_SPAWNS).map(spw => spw.name);

			let spawn = room.memory.spawns[0];
			let source = room.memory.sources[0];

			Game.spawns[spawn].memory.spawnQueue = [
                buildHarvester(name, source, 300, 5)
            ]


			room.memory.coldStart = false;
		}
		if (room.memory.coldState === true) {

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
		}
	}

};

/*

 Game.spawns.Spawn1.spawnCreep([MOVE, MOVE, WORK], 1)

for (let name in Game.rooms) {

    let room =  Game.rooms[name];
    let controller = room.controller;

     let owned = controller.my;
     let parent = room.memory.parent;

     let RCL = controller.level;
     let reservation = controller.reservation;

    let sources = room.find( FIND_SOURCES );
    let numSources = source.length();

    let workers = room.memory.workers || [];
    if (workers === []) {
        RequestWorkers(room, numSources);
    }
    let harvesters = room.memory.harvesters || [];
    if (harvesters === []) {
        RequestHarvesters(room, numSources);
    }


    //Owned = Normal, Defend = Focus on Defense, Non Military Creeps only move energy internally
    //Attack = Spawn Attack Creeps, Send to Room,
    if (owned) {
        room.memory.status = "Peace";
        switch (RCL) {
            case 1:
                return RCL1(room, parent);
            case 2:
                return RCL2(room, parent);
        }
    } else if (reservation) {

    } else {
        room.memory.status = "Enemy";
    }


    console.log("----", "room:", name, "----");
    console.log("RCL: ", RCL);
    console.log("Res: ", reservation);
    console.log(owned ? "Mine" : "Not Mine");
    console.log("--------------------");
}

 */
/*




 Differentiators
 ---------------
 Room will make a request for workers, with how many spawns, and max energy to use.

 Planning harvesters, max energy and num sources
 Planning  couriers,  num sources, max energy,
 Planning builders, maybe use harvesters for now?

 Harvester Roles
 If mining, continue,
 If not in right room, Go there
 Before starting to mine, make sure you can finish container first
 Courier Roles
 Check all containers,

 RCL1 OR Reserved
 !my && owner != undefined //enemy-occupied
 !my // empty

	30+
	vs
	190+, also 37.5, 30.5,


 Any Room That has Creep or Structure In It.
 ------------------
 3 Types
 ----
 Owned
 RCL 1 - 8
 Reserved
 If Below Certain Ticks Left, Send Claimer, Otherwise RCL 1
 In Queue

 Un Reserved
 Do Nothing

 */