var roleFunctions = require('role.functions');
var roleBigHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find( FIND_SOURCES);
        var storages = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>  structure.structureType === STRUCTURE_STORAGE
        });
             
        if (creep.memory.index === undefined) {
                creep.memory.harvesting = true;
	            creep.memory.index =  0;
        } else if (creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
                creep.memory.harvesting = false;
	    } else if (!creep.memory.harvesting && creep.carry.energy === 0) {
	            creep.memory.harvesting = true;
	    }
        
        
        if( creep.memory.harvesting) {
            switch ( creep.harvest( sources[creep.memory.index]) ) {
                case ERR_NOT_IN_RANGE:
                    moveTo( sources[creep.memory.index], creep);
                    break;
                case ERR_NOT_ENOUGH_RESOURCES:
                    creep.memory.index += 1;
                    break;
            }
        } else {
            if ( creep.transfer( storages[creep.memory.index], RESOURCE_ENERGY) === ERR_FULL) {
                creep.memory.harvesting = true;   
            }
        }
    }
};

module.exports = roleBigHarvester;