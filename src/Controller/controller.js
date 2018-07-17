let handleHarvesters = (room, numSources, spawns) => {

};

/*
	Should Cycle Between Different Spawners
 */
module.exports = () => {

	let name = "W8N7";
	let room = Game.rooms[name];

	let sources = room.find(FIND_SOURCES);
	sources.map(source => console.log(source.id));
	console.log(sources);
	let numSources = sources.length;

};
/*

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