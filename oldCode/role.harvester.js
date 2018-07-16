var roleFunctions = require('role.functions');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find( FIND_SOURCES);
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>  (
              ( (structure.structureType === STRUCTURE_EXTENSION) ||
                (structure.structureType === STRUCTURE_SPAWN)     ||
                (structure.structureType === STRUCTURE_STORAGE)   ||
                (structure.structureType === STRUCTURE_TOWER) )
              && (structure.energy < structure.energyCapacity)
            )
        });
             
        if (creep.memory.index == undefined) {
                creep.memory.harvesting = true;
	            creep.memory.index =  Math.round(Math.random());
        } else if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
                creep.memory.harvesting = false;
	            creep.memory.index = Math.round( Math.random()*(targets.length) - .5); 
	    } else if (!creep.memory.harvesting && creep.carry.energy == 0) {
	            creep.memory.harvesting = true;
	            creep.memory.index = Math.round( Math.random()+.03);
	    }
        
        
        if( creep.memory.harvesting) {
            creep.say('HHARV' + creep.memory.index);
            creep.memory.index = roleFunctions.clamp( creep.memory.index, sources.length);
	        roleFunctions.harvest( sources, creep);
        
            
        } else {
            creep.say('HSTOR' + creep.memory.index);
            creep.memory.index = roleFunctions.clamp( creep.memory.index, targets.length);
            roleFunctions.store( targets, creep);
        }
    }
};

module.exports = roleHarvester;