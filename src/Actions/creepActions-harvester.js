module.exports = (creep) => {



    if (creep.memory.index === undefined) {
        //Assign Harvester
    }

    //Function sent from previous file
    let work = () => {

    };

    //Defined in this file
    let harvest = () => {

    };

    //Factor in Distance, Energy Left, Current Workers, Workers En Route
    let acquireTarget = () => {

    };


    /*
     if (isHarvesting) {
     if (isCreepFull) {
     work();
     } else {
     if (targetIsAcquired && targetNotEmpty) {
     harvest();
     } else {
     acquireTarget();
     }
     }
     }
     if (working) {
     if (energy empty)
     harvest
     else
     if work done
     new work
     else
     work
     }
     */


    if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {

    }
    else if (creep.memory.building && creep.carry.energy === 0) {

    }

    if (creep.memory.harvesting) {

    } else {

    }
};

/*
 let sources = creep.room.find( FIND_SOURCES );
 let structTypes = [
 STRUCTURE_EXTENSION,
 STRUCTURE_SPAWN,
 STRUCTURE_STORAGE,
 STRUCTURE_TOWER
 ];
 let targets = creep.room.find( FIND_STRUCTURES, {
 filter: struct => (
 (struct.structureType in structTypes) &&
 (struct.energy < struct.energyCapacity)
 )
 });
 */

